DialogBoxMorph.prototype.promptCredentialsIonic = function (
    title,
    purpose,
    tosURL,
    tosLabel,
    prvURL,
    prvLabel,
    radionButtonLabel,
    world,
    pic,
    msg
) {
    var name = new InputFieldMorph(),
		type,
		row = new AlignmentMorph('row', 4),
		col1 = new AlignmentMorph('column', 1),
        col2 = new AlignmentMorph('column', 1),
		col3 = new AlignmentMorph('column', 1),
		col4 = new AlignmentMorph('column', 1),
		col5 = new AlignmentMorph('column', 1),
        inp = new AlignmentMorph('column', 2),
        bdy = new AlignmentMorph('column', this.padding),
		ishtml = false,
		htmlbutton,
		isphp = false,
		phpbutton,
		isjs = true,
		jsbutton,
		iscss = false,
		cssbutton,
		isvue = false,
		vuebutton,
        myself = this,
		selectType = 'js';

    function labelText(string) {
        return new TextMorph(
            localize(string),
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE // shadowColor
        );
    }

	type= new InputFieldMorph(
        'js', // text
        false, // numeric?
        {
            'js' : ['js'],
			'css' : ['css'],
			'vue' : ['vue'],
            'html' : ['html'],
			'php' : ['php'],
        },
        true // read-only
    );


    inp.alignment = 'left';
    inp.setColor(this.color);



    name.setWidth(230);
	type.setWidth(200)
	
	if (purpose === 'ioniccreat') {
        inp.add(labelText('File name:'));
        inp.add(name);
		//inp.add(labelText('File type:'));
        //inp.add(type);
    }

    if (msg) {
        bdy.add(labelText(msg));
    }

    bdy.add(inp);
	

	//if (radionButtonLabel) {	
        htmlbutton = new ToggleMorph(
            'radiobutton',
            this,
            () => {
				ishtml = true
				isphp = false
				isjs = false
				iscss = false
				isvue = false
				vuebutton.refresh()
				phpbutton.refresh()
				jsbutton.refresh()
				cssbutton.refresh()
				selectType = 'html'
			}, // action,
            'html',
            () => ishtml,			//query
			null,
            null
        );
        htmlbutton.edge = this.buttonEdge / 2;
        htmlbutton.outline = this.buttonOutline / 2;
        htmlbutton.outlineColor = this.buttonOutlineColor;
        htmlbutton.outlineGradient = this.buttonOutlineGradient;
        htmlbutton.contrast = this.buttonContrast;
        htmlbutton.fixLayout();
        col1.add(htmlbutton);
		
		phpbutton = new ToggleMorph(
            'radiobutton',
            this,
            () => {
				ishtml = false
				isphp = true
				isjs = false
				iscss = false
				isvue = false
				vuebutton.refresh()
				htmlbutton.refresh()
				jsbutton.refresh()
				cssbutton.refresh()
				selectType = 'php'
			}, // action,
            'php',
            () => isphp, //query
			null,
            null
        );
        phpbutton.edge = this.buttonEdge / 2;
        phpbutton.outline = this.buttonOutline / 2;
        phpbutton.outlineColor = this.buttonOutlineColor;
        phpbutton.outlineGradient = this.buttonOutlineGradient;
        phpbutton.contrast = this.buttonContrast;
        phpbutton.fixLayout();
        col2.add(phpbutton);
		
		jsbutton = new ToggleMorph(
            'radiobutton',
            this,
            () => {
				ishtml = false
				isphp = false
				isjs = true
				iscss = false
				isvue = false
				vuebutton.refresh()
				htmlbutton.refresh()
				phpbutton.refresh()
				cssbutton.refresh()
				selectType = 'js'
			}, // action,
            'js',
            () => isjs, //query
			null,
            null
        );
        jsbutton.edge = this.buttonEdge / 2;
        jsbutton.outline = this.buttonOutline / 2;
        jsbutton.outlineColor = this.buttonOutlineColor;
        jsbutton.outlineGradient = this.buttonOutlineGradient;
        jsbutton.contrast = this.buttonContrast;
        jsbutton.fixLayout();
        col3.add(jsbutton);
		
		cssbutton = new ToggleMorph(
            'radiobutton',
            this,
            () => {
				ishtml = false
				isphp = false
				isjs = false
				iscss = true
				isvue = false
				vuebutton.refresh()
				htmlbutton.refresh()
				phpbutton.refresh()
				jsbutton.refresh()
				selectType = 'css'
			}, // action,
            'css',
            () => iscss, //query
			null,
            null
        );
        cssbutton.edge = this.buttonEdge / 2;
        cssbutton.outline = this.buttonOutline / 2;
        cssbutton.outlineColor = this.buttonOutlineColor;
        cssbutton.outlineGradient = this.buttonOutlineGradient;
        cssbutton.contrast = this.buttonContrast;
        cssbutton.fixLayout();
        col4.add(cssbutton);
		
		vuebutton = new ToggleMorph(
            'radiobutton',
            this,
            () => {
				ishtml = false
				isphp = false
				isjs = false
				iscss = false
				isvue = true
				cssbutton.refresh()
				htmlbutton.refresh()
				phpbutton.refresh()
				jsbutton.refresh()
				selectType = 'vue'
			}, // action,
            'vue',
            () => isvue, //query
			null,
            null
        );
        vuebutton.edge = this.buttonEdge / 2;
        vuebutton.outline = this.buttonOutline / 2;
        vuebutton.outlineColor = this.buttonOutlineColor;
        vuebutton.outlineGradient = this.buttonOutlineGradient;
        vuebutton.contrast = this.buttonContrast;
        vuebutton.fixLayout();
        col5.add(vuebutton);
    //}
	
	row.add(col3);
	row.add(col4);
	row.add(col5);
	row.add(col1);
	row.add(col2);

    bdy.add(row);
	
	row.fixLayout();
    col1.fixLayout();
    col2.fixLayout();
	col3.fixLayout();
    col4.fixLayout();
	col5.fixLayout();
	
    inp.fixLayout();
    bdy.fixLayout();

    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }

    this.addBody(bdy);

    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');
    this.fixLayout();

    function validInputs() {
        var checklist,
            empty;

        function indicate(morph, string) {
            var bubble = new SpeechBubbleMorph(localize(string));
            bubble.isPointingRight = false;
            bubble.fixLayout();
            bubble.popUp(
                world,
                morph.leftCenter().subtract(new Point(bubble.width() + 2, 0))
            );
            if (morph.edit) {
                morph.edit();
            }
        }

        if (purpose === 'ioniccreat') {
			checklist = [name];
        } 
        empty = detect(
            checklist,
            inp => !inp.getValue()
        );
        if (empty) {
            indicate(empty, 'please fill out\nthis field');
            return false;
        }
        return true;
    }

    this.accept = function () {
        if (validInputs()) {
            DialogBoxMorph.prototype.accept.call(myself);
        }
    };


    this.getInput = function () {
        return {
            name: name.getValue(),
            //type: type.getValue(),
			type: selectType,
        };
    };


    if (!this.key) {
        this.key = 'credentials' + title + purpose;
    }

    this.popUp(world);
};


DialogBoxMorph.prototype.promptCodeUpdate = function (
    title,
    oldString,
	newString,
    world,
    pic,
    instructions
) {
    var frame = new ScrollFrameMorph(),
	    frame2 = new ScrollFrameMorph(),
        oldtext = new TextMorph(oldString || ''),
		newtext = new TextMorph(newString || ''),
        bdy = new AlignmentMorph('column', this.padding),
        size = pic ? Math.max(pic.width, 400) : 400;

    this.getInput = function () {
        return newtext.text;
    };

    function remarkText(string) {
        return new TextMorph(
            localize(string),
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE // shadowColor
        );
    }

    frame.padding = 6;
    frame.setWidth(size);
    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;

    oldtext.fontName = 'monospace';
    oldtext.fontStyle = 'monospace';
    oldtext.fontSize = 11;
    oldtext.setPosition(frame.topLeft().add(frame.padding));
    oldtext.enableSelecting();
    oldtext.isEditable = false;
	
    frame.setHeight(size / 4);
    frame.fixLayout = nop;
    frame.edge = InputFieldMorph.prototype.edge;
    frame.fontSize = InputFieldMorph.prototype.fontSize;
    frame.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    frame.contrast = InputFieldMorph.prototype.contrast;
    frame.render = InputFieldMorph.prototype.render;
    frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    frame.addContents(oldtext);
    oldtext.fixLayout();
	
	frame2.padding = 6;
    frame2.setWidth(size);
    frame2.acceptsDrops = false;
    frame2.contents.acceptsDrops = false;
	
	newtext.fontName = 'monospace';
    newtext.fontStyle = 'monospace';
    newtext.fontSize = 11;
    newtext.setPosition(frame2.topLeft().add(frame2.padding));
    newtext.enableSelecting();
    newtext.isEditable = true;
	
	frame2.setHeight(size / 4);
    frame2.fixLayout = nop;
    frame2.edge = InputFieldMorph.prototype.edge;
    frame2.fontSize = InputFieldMorph.prototype.fontSize;
    frame2.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    frame2.contrast = InputFieldMorph.prototype.contrast;
    frame2.render = InputFieldMorph.prototype.render;
    frame2.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
	
	frame2.addContents(newtext);
	newtext.fixLayout();

    if (pic) {this.setPicture(pic); }

    this.labelString = title;
    this.createLabel();

    if (!this.key) {
        this.key = 'promptCode' + title + newString;
    }

    bdy.setColor(this.color);
	bdy.add(remarkText('old'));
    bdy.add(frame);
	bdy.add(remarkText('new'));
	bdy.add(frame2);
    if (instructions) {
        bdy.add(remarkText(instructions));
    }
    bdy.fixLayout();
    this.addBody(bdy);

    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');
    this.fixLayout();
    this.popUp(world);
    newtext.edit();
};

DialogBoxMorph.prototype.promptCredentials2 = function (
    title,
    purpose,
    tosURL,
    tosLabel,
    prvURL,
    prvLabel,
    checkBoxLabel,
	checkBoxLabel2,
    world,
    pic,
    msg
) {
    var usr = new InputFieldMorph(),
        bmn,
        byr,
        emlLabel,
        eml = new InputFieldMorph(),
        pw1 = new InputFieldMorph(),
        pw2 = new InputFieldMorph(),
        opw = new InputFieldMorph(),
        agree = false,
		agree2 = true,
        chk,
		chk2,
        dof = new AlignmentMorph('row', 4),
        mCol = new AlignmentMorph('column', 2),
        yCol = new AlignmentMorph('column', 2),
        inp = new AlignmentMorph('column', 2),
        lnk = new AlignmentMorph('row', 4),
        bdy = new AlignmentMorph('column', this.padding),
        years = {},
        currentYear = new Date().getFullYear(),
        firstYear = currentYear - 20,
        myself = this;

    function labelText(string) {
        return new TextMorph(
            localize(string),
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE // shadowColor
        );
    }

    function linkButton(label, url) {
        var btn = new PushButtonMorph(
            myself,
            () => window.open(url),
            '  ' + localize(label) + '  '
        );
        btn.fontSize = 10;
        btn.corner = myself.buttonCorner;
        btn.edge = myself.buttonEdge;
        btn.outline = myself.buttonOutline;
        btn.outlineColor = myself.buttonOutlineColor;
        btn.outlineGradient = myself.buttonOutlineGradient;
        btn.padding = myself.buttonPadding;
        btn.contrast = myself.buttonContrast;
        btn.fixLayout();
        return btn;
    }

    function age() {
        var today = new Date().getFullYear() + new Date().getMonth() / 12,
            year = +byr.getValue() || 0,
            monthName = bmn.getValue(),
            month,
            birthday;
        if (monthName instanceof Array) { // translatable
            monthName = monthName[0];
        }
        if (isNaN(year)) {
            year = 0;
        }
        month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ].indexOf(monthName);
        if (isNaN(month)) {
            month = 0;
        }
        birthday = year + month / 12;
        return today - birthday;
    }

    bmn = new InputFieldMorph(
        null, // text
        false, // numeric?
        {
            'January' : ['January'],
            'February' : ['February'],
            'March' : ['March'],
            'April' : ['April'],
            'May' : ['May'],
            'June' : ['June'],
            'July' : ['July'],
            'August' : ['August'],
            'September' : ['September'],
            'October' : ['October'],
            'November' : ['November'],
            'December' : ['December']
        },
        true // read-only
    );
    for (currentYear; currentYear > firstYear; currentYear -= 1) {
        years[currentYear.toString() + ' '] = currentYear;
    }
    years[firstYear + ' ' + localize('or before')] = '< ' + currentYear;
    byr = new InputFieldMorph(
        null, // text
        false, // numeric?
        years,
        true // read-only
    );

    inp.alignment = 'left';
    inp.setColor(this.color);
    bdy.setColor(this.color);

    mCol.alignment = 'left';
    mCol.setColor(this.color);
    yCol.alignment = 'left';
    yCol.setColor(this.color);

    usr.setWidth(200);
    bmn.setWidth(100);
    byr.contents().minWidth = 80;
    byr.setWidth(80);
    eml.setWidth(200);
    pw1.setWidth(200);
    pw2.setWidth(200);
    opw.setWidth(200);
    pw1.contents().text.toggleIsPassword();
    pw2.contents().text.toggleIsPassword();
    opw.contents().text.toggleIsPassword();

    if (purpose === 'login') {
        inp.add(labelText('User name:'));
        inp.add(usr);
    }

    if (purpose === 'signup') {
        inp.add(labelText('User name:'));
        inp.add(usr);
        mCol.add(labelText('Birth date:'));
        mCol.add(bmn);
        yCol.add(labelText('year:'));
        yCol.add(byr);
        dof.add(mCol);
        dof.add(yCol);
        inp.add(dof);
        emlLabel = labelText('foo');
        inp.add(emlLabel);
        inp.add(eml);
        inp.add(labelText('Password:'));
        inp.add(pw1);
        inp.add(labelText('Repeat Password:'));
        inp.add(pw2);
    }

    if (purpose === 'login') {
        inp.add(labelText('Password:'));
        inp.add(pw1);
    }

    if (purpose === 'changePassword') {
        inp.add(labelText('Old password:'));
        inp.add(opw);
        inp.add(labelText('New password:'));
        inp.add(pw1);
        inp.add(labelText('Repeat new password:'));
        inp.add(pw2);
    }
	
	if (purpose === 'MySQLPassword') {
        inp.add(labelText('MySQL password:'));
        inp.add(pw1);
        inp.add(labelText('Repeat new password:'));
        inp.add(pw2);
    }
	if (purpose === 'resetPassword' ) {
        inp.add(labelText('User name:'));
        inp.add(usr);
		inp.add(labelText('User email:'));
        inp.add(eml);
    }
	
	if (purpose === 'newPassword') {
        inp.add(labelText('new password:'));
        inp.add(pw1);
        inp.add(labelText('Repeat new password:'));
        inp.add(pw2);
    }

    if (purpose === 'resendVerification') {
        inp.add(labelText('User name:'));
        inp.add(usr);
    }

    if (msg) {
        bdy.add(labelText(msg));
    }

    bdy.add(inp);

    if (tosURL || prvURL) {
        bdy.add(lnk);
    }
    if (tosURL) {
        lnk.add(linkButton(tosLabel, tosURL));
    }
    if (prvURL) {
        lnk.add(linkButton(prvLabel, prvURL));
    }

    if (checkBoxLabel) {
        chk = new ToggleMorph(
            'checkbox',
            this,
            () => agree = !agree, // action,
            checkBoxLabel,
            () => agree //query
        );
        chk.edge = this.buttonEdge / 2;
        chk.outline = this.buttonOutline / 2;
        chk.outlineColor = this.buttonOutlineColor;
        chk.outlineGradient = this.buttonOutlineGradient;
        chk.contrast = this.buttonContrast;
        chk.fixLayout();
        bdy.add(chk);
	}
	if (checkBoxLabel2) {
		chk2 = new ToggleMorph(
            'checkbox',
            this,
            () => agree2 = !agree2, // action,
            checkBoxLabel2,
            () => agree2 //query
        );
        chk2.edge = this.buttonEdge / 2;
        chk2.outline = this.buttonOutline / 2;
        chk2.outlineColor = this.buttonOutlineColor;
        chk2.outlineGradient = this.buttonOutlineGradient;
        chk2.contrast = this.buttonContrast;
        chk2.fixLayout();
        bdy.add(chk2);
    }

    dof.fixLayout();
    mCol.fixLayout();
    yCol.fixLayout();
    inp.fixLayout();
    lnk.fixLayout();
    bdy.fixLayout();

    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }

    this.addBody(bdy);

    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');
    this.fixLayout();

    function validInputs() {
        var checklist,
            empty,
            em = eml.getValue();

        function indicate(morph, string) {
            var bubble = new SpeechBubbleMorph(localize(string));
            bubble.isPointingRight = false;
            bubble.fixLayout();
            bubble.popUp(
                world,
                morph.leftCenter().subtract(new Point(bubble.width() + 2, 0))
            );
            if (morph.edit) {
                morph.edit();
            }
        }

        if (purpose === 'login') {
            checklist = [usr, pw1];
        } else if (purpose === 'signup') {
            checklist = [usr, bmn, byr, eml, pw1, pw2];
        } else if (purpose === 'changePassword') {
            checklist = [opw, pw1, pw2];
		} else if (purpose === 'MySQLPassword' || purpose === 'newPassword' ) {
			checklist = [pw1, pw2];
        } else if (purpose === 'resetPassword' ||
                purpose === 'resendVerification') {
            checklist = [usr];
        }

        empty = detect(
            checklist,
            inp => !inp.getValue()
        );
        if (empty) {
            indicate(empty, 'please fill out\nthis field');
            return false;
        }
        if (purpose === 'signup') {
            if (usr.getValue().length < 4) {
                indicate(usr, 'User name must be four\ncharacters or longer');
                return false;
            }
            if (em.indexOf(' ') > -1 || em.indexOf('@') === -1
                    || em.indexOf('.') === -1 || em.length < 5) {
                indicate(eml, 'please provide a valid\nemail address');
                return false;
            }
        }
        if (purpose === 'changePassword' || purpose === 'signup' || purpose === 'MySQLPassword' || purpose === 'newPassword') {
            if (pw1.getValue().length < 6) {
                indicate(pw1, 'password must be six\ncharacters or longer');
                return false;
            }
            if (pw1.getValue() !== pw2.getValue()) {
                indicate(pw2, 'passwords do\nnot match');
                return false;
            }
        }
        if (purpose === 'signup') {
            if (!agree) {
                indicate(chk, 'please agree to\nthe TOS');
                return false;
            }
        }
        return true;
    }

    this.accept = function () {
        if (validInputs()) {
            DialogBoxMorph.prototype.accept.call(myself);
        }
    };

    this.edit = function () {
        if (purpose === 'changePassword') {
            opw.edit();
        } else { // 'signup', 'login', 'resetPassword', 'resendVerification'
            usr.edit();
        }
    };

    this.getInput = function () {
        return {
            username: usr.getValue(),
            email: eml.getValue(),
            oldpassword: opw.getValue(),
            password: pw1.getValue(),
            passwordRepeat: pw2.getValue(),
            choice: agree,
			subscribe: agree2
        };
    };

    this.reactToChoice = function () {
        if (purpose === 'signup') {
            emlLabel.changed();
            emlLabel.text = age() <= 13 ?
                    'E-mail address of parent or guardian:'
                        : 'E-mail address:';
            emlLabel.text = localize(emlLabel.text);
            emlLabel.fixLayout();
            emlLabel.rerender();
        }
    };

    this.reactToChoice(); // initialize e-mail label

    if (!this.key) {
        this.key = 'credentials' + title + purpose;
    }

    this.popUp(world);
};