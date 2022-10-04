SnapSerializer.prototype.loadCodes = function (xmlString, targetStage) {
    // public - answer a new Array of custom block definitions
    // represented by the given XML String
    var stage = new StageMorph(),
        model;

    this.project = {
        stage: stage,
        sprites: {},
        targetStage: targetStage // for secondary custom block def look-up
    };
    model = this.parse(xmlString);
    return model.children;
};

SnapSerializer.prototype.loadInput = function (model, input, block, object) {
    // private
    var inp, val;
    if (isNil(input)) {
        return;
    }
    if (model.tag === 'script') {
        inp = this.loadScript(model, object);
        if (inp) {
            if (block.selector === 'reifyReporter' ||
                    block.selector === 'reifyPredicate') {
                input.replaceInput(input.children[0], inp);
                input.fixLayout();
            } else {
                input.add(inp);
                input.fixLayout();
            }
        }
    } else if (model.tag === 'autolambda' && model.children[0]) {
        inp = this.loadBlock(model.children[0], true, object);
        if (inp) {
            input.replaceInput(input.children[0], inp);
            input.fixLayout();
        }
    } else if (model.tag === 'list') {
        while (input.inputs().length > 0) {
            input.removeInput();
        }
        model.children.forEach(item => {
			try{
            input.addInput();
            this.loadInput(
                item,
                input.children[input.children.length - 2],
                input,
                object
            );
			} catch (error) {
				console.log(error);
			}
        });
        input.fixLayout();
    } else if (model.tag === 'block' || model.tag === 'custom-block') {
        if (input.slotSpec === '%rcv') {
            // special case for migrating former SEND block inputs to
            // newer BROADCAST expansion slots for receivers
            // this can be removed once all SEND blocks have been
            // converted to v7
            input.replaceInput(
                input.inputs()[0],
                this.loadBlock(model, true, object)
            );
        } else {
            block.replaceInput(input, this.loadBlock(model, true, object));
        }
    } else if (model.tag === 'color') {
        input.setColor(this.loadColor(model.contents));
    } else {
        val = this.loadValue(model);
        if (!isNil(val) && !isNil(input) && input.setContents) {
            // checking whether "input" is nil should not
            // be necessary, but apparently is after retina support
            // was added.
            input.setContents(this.loadValue(model));
        }
    }
};

SnapSerializer.prototype.loadBlock = function (model, isReporter, object) {
    // private
    var block, info, inputs, isGlobal, receiver, migration,
        migrationOffset = 0;

    if (model.tag === 'block') {
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'var'
            )) {
            block = SpriteMorph.prototype.variableBlock(
                model.attributes['var']
            );
        } else {
            block = SpriteMorph.prototype.blockForSelector(model.attributes.s);
            migration = SpriteMorph.prototype.blockMigrations[
                model.attributes.s
            ];
            if (migration) {
                migrationOffset = migration.offset || 0;
            }
        }
    } else if (model.tag === 'custom-block') {
        isGlobal = model.attributes.scope ? false : true;
        receiver = isGlobal ? this.scene.stage : object;
        if (isGlobal) {
            info = detect(
                receiver.globalBlocks,
                block => block.blockSpec() === model.attributes.s
            );
            if (!info && this.scene.targetStage) { // importing block files
                info = detect(
                    this.scene.targetStage.globalBlocks,
                    block => block.blockSpec() === model.attributes.s
                );
            }
        } else {
            // lookup in inherited methods
            info = detect(
                receiver.customBlocks,
                block => block.blockSpec() === model.attributes.s
            ) || (
            	receiver.inheritedMethodsCache ?
                	detect(
                        receiver.inheritedMethodsCache,
                        block => block.blockSpec() === model.attributes.s
                	)
          		: null
          	);
        }
        if (!info || !contains(
        		// catch other forks' blocks
        		SpriteMorph.prototype.allCategories(), info.category
        )) {
            return this.obsoleteBlock(isReporter);
        }
        block = info.type === 'command' ? new CustomCommandBlockMorph(
            info,
            false
        ) : new CustomReporterBlockMorph(
            info,
            info.type === 'predicate',
            false
        );
    }
    if (block === null) {
        block = this.obsoleteBlock(isReporter);
    }
    block.isDraggable = true;
    inputs = block.inputs();
    model.children.forEach((child, i) => {
        if (child.tag === 'variables') {
            this.loadVariables(block.variables, child, object);
        } else if (child.tag === 'comment') {
            block.comment = this.loadComment(child);
            block.comment.block = block;
        } else if (child.tag === 'receiver') {
            nop(); // ignore
        } else {
			try{
                this.loadInput(child, inputs[i + migrationOffset], block, object);
			} catch (error) {
				console.log(error);
			}
        }
    });
    block.cachedInputs = null;
    return block;
};


XML_Serializer.prototype.serializeCloud = function (object, forBlocksLibrary) {
    // public: answer an XML string representing the given object
    var xml;
    this.flush(); // in case an error occurred in an earlier attempt
    this.flushMedia();
    this.isExportingBlocksLibrary = forBlocksLibrary;
    xml = this.storeCloud(object);
    this.flush();
    return xml;
};

XML_Serializer.prototype.storeCloud = function (object, mediaID) {
    // private - mediaID is optional
    if (isNil(object) || !object.toXML) {
        // unsupported type, to be checked before calling store()
        // when debugging, be sure to throw an error at this point
        return '';
    }
    if (this.isCollectingMedia && object[this.mediaDetectionProperty]) {
        this.addMedia(object, mediaID);
        return this.format(
            '<ref mediaID="@"></ref>',
            object[this.mediaIdProperty]
        );
    }
    if (object[this.idProperty]) {
        return this.format('<ref id="@"></ref>', object[this.idProperty]);
    }
    this.add(object);
    return object.toXMLCloud(this, mediaID).replace(
        '~',
        this.format('id="@"', object[this.idProperty])
    );
};


StageMorph.prototype.toXMLCloud = function (serializer) {
   var thumbnail = normalizeCanvas(
            this.thumbnail(SnapSerializer.prototype.thumbnailSize),
            true
        ),
        thumbdata,
        costumeIdx = this.getCostumeIdx(),
        ide = this.parentThatIsA(IDE_Morph);

    // catch cross-origin tainting exception when using SVG costumes
    try {
        thumbdata = thumbnail.toDataURL('image/png');
    } catch (error) {
        thumbdata = null;
    }

    function code(key) {
        var str = '';
        Object.keys(StageMorph.prototype[key]).forEach(
            selector => {
                str += (
                    '<' + selector + '>' +
                        XML_Element.prototype.escape(
                            StageMorph.prototype[key][selector]
                        ) +
                        '</' + selector + '>'
                );
            }
        );
        return str;
    }

    this.removeAllClones();
    return serializer.format(
        '<project name="@" app="@" version="@">' +
            '<notes>$</notes>' +
            '<thumbnail>$</thumbnail>' +
            '<stage name="@" width="@" height="@" ' +
            'costume="@" color="@,@,@,@" tempo="@" threadsafe="@" ' +
            'penlog="@" ' +
            '%' +
            'volume="@" ' +
            'pan="@" ' +
            'lines="@" ' +
            'ternary="@" ' +
            'hyperops="@" ' +
            'codify="@" ' +
            'inheritance="@" ' +
            'sublistIDs="@" ' +
            'scheduled="@" ~>' +
            '<pentrails>$</pentrails>' +
            '%' + // current costume, if it's not in the wardrobe
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts><sprites>%</sprites>' +
            '</stage>' +
            '<hidden>$</hidden>' +
            '<headers>%</headers>' +
            '<code>%</code>' +
            '<blocks>%</blocks>' +
            '<variables>%</variables>' +
            '</project>',
        (ide && ide.projectName) ? ide.projectName : localize('Untitled'),
        serializer.app,
        serializer.version,
        (ide && ide.projectNotes) ? ide.projectNotes : '',
        thumbdata,
        this.name,
        StageMorph.prototype.dimensions.x,
        StageMorph.prototype.dimensions.y,
        costumeIdx,
        this.color.r,
        this.color.g,
        this.color.b,
        this.color.a,
        this.getTempo(),
        this.isThreadSafe,
        this.enablePenLogging,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        this.volume,
        this.pan,
        SpriteMorph.prototype.useFlatLineEnds ? 'flat' : 'round',
        BooleanSlotMorph.prototype.isTernary,
        Process.prototype.enableHyperOps === true,
        this.enableCodeMapping,
        this.enableInheritance,
        this.enableSublistIDs,
        StageMorph.prototype.frameRate !== 0,
        normalizeCanvas(this.trailsCanvas, true).toDataURL('image/png'),

        // current costume, if it's not in the wardrobe
        !costumeIdx && this.costume ?
            '<wear>' + serializer.store(this.costume) + '</wear>'
                : '',

        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        serializer.store(this.customBlocks),
        serializer.store(this.scripts),
        serializer.store(this.children),
        Object.keys(StageMorph.prototype.hiddenPrimitives).reduce(
                (a, b) => a + ' ' + b,
                ''
            ),
        code('codeHeaders'),
        code('codeMappings'),
        serializer.store(this.globalBlocks),
        (ide && ide.globalVariables) ?
                    serializer.store(ide.globalVariables) : ''
    );
};