BlockDialogMorph.prototype.createCategoryButtons = function () {
    SpriteMorph.prototype.categories.forEach(cat =>
    {
        if (cat === 'motion' || cat === 'control' || cat === 'looks' || cat === 'sensing' || 
                cat === 'sound' || cat === 'operators' || cat === 'pen' || cat === 'variables' ||
                cat === 'ionic' || cat === 'vue' || cat === 'html' || cat === 'JavaScript' ||
		cat === 'css'  || cat === 'server'  || cat === 'AR/VR' || cat === 'cordova') {
            this.addCategoryButton(cat);
        }
    }
    );
	
    // sort alphabetically
    Array.from(
        SpriteMorph.prototype.customCategories.keys()
    ).sort().forEach(name =>
        this.addCustomCategoryButton(
            name,
            SpriteMorph.prototype.customCategories.get(name)
        )
    );
};

BlockDialogMorph.prototype.fixCategoriesLayout = function () {
    var buttonWidth = this.categories.children[0].width(), // all the same
        buttonHeight = this.categories.children[0].height(), // all the same
        more = SpriteMorph.prototype.customCategories.size,
        xPadding = 15,
        yPadding = 2,
        border = 10, // this.categories.border,
        l = this.categories.left(),
        t = this.categories.top(),
        scroller,
        row,
        col,
        i;

    this.categories.setWidth(
        3 * xPadding + 2 * buttonWidth
    );
	
		
    this.categories.children.forEach((button, i) => {
		i += 1;
		if(i<=20){
			row = Math.ceil(i / 2) - 1;
            col = 2 - (i % 2);
		}else{
			row = 10 + (i-20)
			col = 1;
		}
		
        button.setPosition(new Point(
            l + (col * xPadding + ((col - 1) * buttonWidth)),
            t + ((row + 1) * yPadding + (row * buttonHeight) + border) +
                (i > 9 ? border / 2 : 0)
        ));
    });

    if (MorphicPreferences.isFlat) {
        this.categories.corner = 0;
        this.categories.border = 0;
        this.categories.edge = 0;
    }

    if (more > 6) {
        scroller = new ScrollFrameMorph(
            null,
            null,
            SpriteMorph.prototype.sliderColor.lighter()
        );
        scroller.setColor(this.categories.color);
        scroller.acceptsDrops = false;
        scroller.contents.acceptsDrops = false;
        scroller.setPosition(
            new Point(
                this.categories.left() + this.categories.border,
                this.categories.children[10].top()
            )
        );
        scroller.setWidth(this.categories.width() - this.categories.border * 2);
        scroller.setHeight(buttonHeight * 6 + yPadding * 5);

        for (i = 0; i < more; i += 1) {
            scroller.addContents(this.categories.children[10]);
        }
        this.categories.add(scroller);
        this.categories.setHeight(
            (9 + 1) * yPadding
                + 9 * buttonHeight
                + 6 * (yPadding + buttonHeight) + border + 2
                + 2 * border
        );
    } else {
        this.categories.setHeight(
            (9 + 1) * yPadding
                + 9 * buttonHeight
                + (more ? (more * (yPadding + buttonHeight) + border / 2) : 0)
                + 2 * border
        );
    }
};

InputSlotDialogMorph.prototype.init = function (
    fragment,
    target,
    action,
    environment,
    category
) {
    var scale = SyntaxElementMorph.prototype.scale,
        fh = fontHeight(10) / 1.2 * scale; // "raw height"

    // additional properties:
    this.fragment = fragment || new BlockLabelFragment();
    this.textfield = null;
    this.types = null;
    this.slots = null;
    this.isExpanded = false;
    this.category = category || 'other';
    this.noDelete = false;

    // initialize inherited properties:
    BlockDialogMorph.uber.init.call(
        this,
        target,
        action,
        environment
    );

    // override inherited properites:
    this.types = new AlignmentMorph('row', this.padding);
    this.types.respectHiddens = true; // prevent the arrow from flipping
    this.add(this.types);
    this.slots = new BoxMorph();
    this.slots.color = new Color(55, 55, 55); // same as palette
    this.slots.borderColor = this.slots.color.lighter(50);
    this.slots.setExtent(new Point((fh + 10) * 24, (fh + 12 * scale) * 10.4));
    this.add(this.slots);
    this.createSlotTypeButtons();
    this.fixSlotsLayout();
    this.addSlotsMenu();
    this.createTypeButtons();
    this.fixLayout();
};

InputSlotDialogMorph.prototype.createSlotTypeButtons = function () {
    // populate my 'slots' area with radio buttons, labels and input fields
    var defLabel, defInput, defSwitch, loopArrow, settingsButton;

    // slot types
    this.addSlotTypeButton('Object', '%obj');
    this.addSlotTypeButton('Text', '%txt');
    this.addSlotTypeButton('List', '%l');
    this.addSlotTypeButton('Number', '%n');
    this.addSlotTypeButton('Any type', '%s');
    this.addSlotTypeButton('Boolean (T/F)', '%b');
    this.addSlotTypeButton('Command\n(inline)', '%cmdRing'); //'%cmd');
    this.addSlotTypeButton('Reporter', '%repRing'); //'%r');
    this.addSlotTypeButton('Predicate', '%predRing'); //'%p');
    this.addSlotTypeButton('Command\n(C-shape)', ['%cs', '%ca']);
    this.addSlotTypeButton('Any\n(unevaluated)', '%anyUE');
    this.addSlotTypeButton('Boolean\n(unevaluated)', '%boolUE');

    // arity and upvars
    this.slots.radioButtonSingle = this.addSlotArityButton(
        () => this.setSlotArity('single1'),
        "Single input.",
        () => this.fragment.isSingleInput()
    );
    this.addSlotArityButton(
        () => this.setSlotArity('multiple'),
        "Multiple inputs (value is list of inputs) ",
        () => this.fragment.isMultipleInput()
    );
	this.addSlotArityButton(
        () => this.setSlotArity('multiple_blank'),
        "Multiple inputs (value is list of inputs (blank)) ",
        () => this.fragment.isMultipleInputblank()
    );
    this.addSlotArityButton(
        () => this.setSlotArity('upvar'),
        "Upvar - make internal variable visible to caller",
        () => this.fragment.isUpvar()
    );

    // default values
    defLabel = new StringMorph(localize('Default Value:'));
    defLabel.fontSize = this.slots.radioButtonSingle.fontSize;
    defLabel.setColor(WHITE);
    defLabel.refresh = () => {
        if (this.isExpanded && contains(
                [
                    '%s', '%n', '%txt', '%anyUE', '%b', '%boolUE',
                    '%mlt', '%code'
                ],
                this.fragment.type
            )) {
            defLabel.show();
        } else {
            defLabel.hide();
        }
    };
    this.slots.defaultInputLabel = defLabel;
    this.slots.add(defLabel);

    defInput = new InputFieldMorph(this.fragment.defaultValue);
    defInput.contents().fontSize = defLabel.fontSize;
    defInput.contrast = 90;
    defInput.setWidth(50);
    defInput.refresh = () => {
        if (this.isExpanded && contains(
            ['%s', '%n', '%txt', '%anyUE', '%mlt', '%code'],
            this.fragment.type
        )) {
            defInput.show();
            if (this.fragment.type === '%n') {
                defInput.setIsNumeric(true);
            } else {
                defInput.setIsNumeric(false);
            }
        } else {
            defInput.hide();
        }
    };
    this.slots.defaultInputField = defInput;
    this.slots.add(defInput);

    defSwitch = new BooleanSlotMorph(this.fragment.defaultValue);
    defSwitch.refresh = () => {
        if (this.isExpanded && contains(
            ['%b', '%boolUE'],
            this.fragment.type
        )) {
            defSwitch.show();
        } else {
            defSwitch.hide();
        }
    };
    this.slots.defaultSwitch = defSwitch;
    this.slots.add(defSwitch);

    // loop arrow checkbox //
    loopArrow = new ToggleMorph(
        'checkbox',
        this, // target
        () => { // action
            if (this.fragment.type === '%ca') {
                this.setType('%cs');
            } else {
                this.setType('%ca');
            }
        },
        null, // label string
        () => this.fragment.type === '%ca',
        null, // environment
        null, // hint
        new SymbolMorph(
            'loop',
            this.fontSize * 0.7,
            WHITE
        ).getImage(),
        null // builder method that constructs the element morph
    );
    loopArrow.refresh = () => {
        ToggleMorph.prototype.refresh.call(loopArrow);
        if (this.isExpanded && contains(
                ['%cs', '%ca'],
                this.fragment.type
            )) {
            loopArrow.show();
        } else {
            loopArrow.hide();
        }
    };
    this.slots.loopArrow = loopArrow;
    this.slots.add(loopArrow);

    // settings button
    settingsButton = new PushButtonMorph(
        this.slots,
        () => this.slots.userMenu().popUpAtHand(this.world()),
        new SymbolMorph('gearPartial', this.fontSize * 1.5)
    );
    settingsButton.padding = 0;
    settingsButton.fixLayout();
    settingsButton.refresh = nop;
    this.slots.settingsButton = settingsButton;
    this.slots.add(settingsButton);

};

InputSlotDialogMorph.prototype.setSlotArity = function (arity) {
    if (arity === 'single1') {
        this.fragment.setToSingleInput();
    } else if (arity === 'multiple') {
        this.fragment.setToMultipleInput();
	} else if (arity === 'multiple_blank') {
        this.fragment.setToMultipleInputblank();
    } else if (arity === 'upvar') {
        this.fragment.setToUpvar();
        // hide other options - under construction
    }
    this.slots.children.forEach(c => c.refresh());
    this.edit();
};

BlockLabelFragment.prototype.setToMultipleInputblank = function () {
    if (!this.type) {return null; } // not an input at all
	this.type = '%expblank';
	/*
    if (this.type === '%upvar') {
        this.type = '%s';
    } else if (this.type === '%ca') {
        this.type = '%cs';
    }
    this.type = '%mult'.concat(this.singleInputType());
	*/
};

BlockLabelFragment.prototype.isMultipleInputblank = function () {
    // answer true if the type begins with '%mult'
    if (!this.type) {
        return false; // not an input at all
    }
    return this.type === '%expblank';
};

BlockLabelFragment.prototype.isSingleInput = function () {
    return !( this.isMultipleInput() || this.isMultipleInputblank() ) &&
        (this.type !== '%upvar');
};

BlockLabelFragment.prototype.defTemplateSpecFragment = function () {
    // answer a string representing my prototype's spec
    // which also indicates my type, default value or arity
    var suff = '';
    if (!this.type) {return this.defSpecFragment(); }
    if (this.isUpvar()) {
        suff = ' \u2191';
    } else if (this.isMultipleInput()) {
        suff = '...';
	} else if (this.isMultipleInputblank()) {
        suff = '___';
    } else if (this.type === '%cs' || this.type === '%ca') {
        suff = ' \u03BB'; // ' [\u03BB'
    } else if (this.type === '%b') {
        suff = ' ?';
    } else if (this.type === '%l') {
        suff = ' \uFE19';
    } else if (this.type === '%obj') {
        suff = ' %turtleOutline';
    } else if (contains(
            ['%cmdRing', '%repRing', '%predRing', '%anyUE', '%boolUE'],
            this.type
        )) {
        suff = ' \u03BB';
    } else if (this.defaultValue) {
        if (this.type === '%n') {
            suff = ' # = ' + this.defaultValue.toString();
        } else if (contains(['%mlt', '%code'], this.type)) {
            suff = ' \u00B6 = ' + this.defaultValue.toString(); // pilcrow
        } else { // 'any' or 'text'
            suff = ' = ' + this.defaultValue.toString();
        }
    } else if (this.type === '%n') {
        suff = ' #';
    } else if (contains(['%mlt', '%code'], this.type)) {
        suff = ' \u00B6'; // pilcrow
    }
    return this.labelString + suff;
};


InputSlotDialogMorph.prototype.fixSlotsLayout = function () {
    var slots = this.slots,
        scale = SyntaxElementMorph.prototype.scale,
        xPadding = 10 * scale,
        ypadding = 14 * scale,
        bh = (fontHeight(10) / 1.2 + 15) * scale, // slot type button height
        ah = (fontHeight(10) / 1.2 + 10) * scale, // arity button height
        size = 12, // number slot type radio buttons
        cols = [
            slots.left() + xPadding,
            slots.left() + slots.width() / 3,
            slots.left() + slots.width() * 2 / 3
        ],
        rows = [
            slots.top() + ypadding,
            slots.top() + ypadding + bh,
            slots.top() + ypadding + bh * 2,
            slots.top() + ypadding + bh * 3,
            slots.top() + ypadding + bh * 4,
            slots.top() + ypadding + bh * 5,

            slots.top() + ypadding + bh * 5 + ah,
            slots.top() + ypadding + bh * 5 + ah * 2,
			slots.top() + ypadding + bh * 5 + ah * 3
        ],
        idx,
        row = -1,
        col;

    // slot types:

    for (idx = 0; idx < size; idx += 1) {
        col = idx % 3;
        if (idx % 3 === 0) {row += 1; }
        slots.children[idx].setPosition(new Point(
            cols[col],
            rows[row]
        ));
    }

    // arity:

    col = 0;
    row = 5;
    for (idx = size; idx < size + 4; idx += 1) {
        slots.children[idx].setPosition(new Point(
            cols[col],
            rows[row + idx - size]
        ));
    }

    // default input

    this.slots.defaultInputLabel.setPosition(
        this.slots.radioButtonSingle.label.topRight().add(new Point(5, 0))
    );
    this.slots.defaultInputField.setCenter(
        this.slots.defaultInputLabel.center().add(new Point(
            this.slots.defaultInputField.width() / 2
                + this.slots.defaultInputLabel.width() / 2 + 5,
            0
        ))
    );
    this.slots.defaultSwitch.setCenter(
        this.slots.defaultInputLabel.center().add(new Point(
            this.slots.defaultSwitch.width() / 2
                + this.slots.defaultInputLabel.width() / 2 + 5,
            0
        ))
    );
	

    // loop arrow

    this.slots.loopArrow.setPosition(this.slots.defaultInputLabel.position());
    this.slots.settingsButton.setPosition(
        this.slots.bottomRight().subtract(
            this.slots.settingsButton.extent().add(
                this.padding + this.slots.border
            )
        )
    );

    this.slots.changed();
};


