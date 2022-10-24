/*
 * Override setLanguage function
 */
var offline = false;
var mqttclient = null


IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();

    // the logo texture is not loaded dynamically as an image, but instead
    // hard-copied here to avoid tainting the world canvas. This lets us
    // use Snap's (and Morphic's) color pickers to sense any pixel which
    // otherwise would be compromised by annoying browser security.

    // this.logo.texture = this.logoURL; // original code, commented out
    this.logo.texture = "data:image/png;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAACwAAAAYCAYAAACBbx+6AAAKiklEQVRYR5VXe3BU5RX/" +
            "ne+7924SwiOEJJvwUCAgCZFBEtRatIlVlATLIwlFsCgdeYWICu1MfbKUabVVtBoDQlUc" +
            "FCubEIpAAEUTrGhFGIXAAjZCFdhNQiTkQbK7997vdO7SREAo9P5zZ77HOb9zzu87D8JV" +
            "fOyBwGIwEdg5XrcmKRExcoSCNQKgWwXRTYKQDAKUQi1DbASrjzgsdqdM8zc6d6o80LIB" +
            "RR6oq1B52SN0pcteL+SUKbCdcw3lCUMsof2amAs0iVRNEoIhZYKoCcTtYBARxUUZ1IMZ" +
            "CIZxWDG9oVSv1/tP8Z12ZHAVNMqBdSW9l9uPAGYGoQwicqjQUQsmZ9kLSf8FGyhzzyCB" +
            "P8X1kO7TLaoREJuIxCeSzKNhWzRbKhgyRCwJZfcA2UOY+E4QTewZK2Ob2tQhIl6cPLmu" +
            "LKLPC+n8O2X/P+CJAXLAXXzpfLD+sqRHesaKF5vbHZtil4bCA98YeO+2f19J0Yl3+wzV" +
            "DH0GMz8cE0WxHSH8DZrxhPsX3x7rBO5YUFgI1Um3y8r0sCg8WOZgBQ54YPTJGNCPgehw" +
            "qNl/zfTmJoe3Dt9OeN15LgObTUs/JNB9prvA9/mljNvblCkyh+7l6p3AxVxt2JiQalty" +
            "IYB5AL5n5qWh1vqVA2cieCWjz+07AXd8C+eZAP71SY8Q6JlzfuajDPFMSkHg7brtSd1w" +
            "Vr2hVIymxX97f2IO2nCPP2be0EDaWZuMVttoP2tGBd5/dfCpToHnKMZUvWSJzP5ZNSin" +
            "uouv9RXX/MRW9lMgHkekaqCsVZDmZnfD4JMI7LXPPUgHXATaBVEvLDrg7tBgRDbrK9wz" +
            "GHwnM0Xrmsg3bT4eC5XV2FzfYnS/fkzK9zU7aQ7MXxbvnxkk8UhYUTcGTGJyMsM/Okw5" +
            "s3rVdY2Zs/foe1MyIw8UHjA8oCosEUA1cjw/AA94M/KUMOcQBW8gsptYuXYpa8Cr/aZW" +
            "7Sss9Mrhw33swWJkV1eL6uoc6wFPVVRDo3stmDN/xOFAed95EHYps7o/Jb/hrc6QTXt0" +
            "/4QzYa1Egd7TyCq3WEgBGkggMyGhbt2bnpyrDO8PJDizAYPbbS21Tw+rXk+BjzIQvhRF" +
            "8ub6MlhiF4h6dKU1J1M4xD+xvnc/CaMKpN5LntywqHM9d77vrwCNrCxNG32x0Oxs1lzp" +
            "vmtdQVnfe0DArGvsczNskUAaareWDP/SOT+2qKa/DkrtLu14k8HrW+JrsKbf1xFZN3ES" +
            "khrbJ7tPxYYMMRpsxQi4ajaVDjnobI8vrslWLLc6186lNYBqX041hiyoDR339ovWNGs7" +
            "GA3J+XUFneDGFft+T4zfCsYDm5enrzsfdF7R12lM1jsAfcPgNmJkMqE3AfEMWqYTlVpK" +
            "vcDAbSCcEUCcIO6jSyzWSW04a8rXmGAw4yQYg5nQkxi9GHhu6/L0pbnzfbcxoZIUFXd5" +
            "2KlEOR5Yfm/cACFduxnCl5zvv70TWN68/YNYauVSi77BNjs2CmDVQKF/WFIyJPTzh48m" +
            "GVbwCwK6E+MJJtpBLKUi+1kC3wNShbaF40KDrkM7FrQ0S5PmsyCMd5xAzHMVYRgzzbCV" +
            "/jkb4Z66En/WpGuisjryFIkGsFqrWN0XAXx+NQuUpyyJ70VPnz5jfapc7RNS7mltXLly" +
            "tj5nzipzbPG+gTrrTzIwQ2guTZmhHUoXxdteGnYkd/6hfUR8cMsr6dM6jcwt+nokkbkL" +
            "JBdseWXY6+dH5a6iw3dLUiuYsQJEPwXQurU07b7OM3c9ery3DLceAdHHgvl1xVQYIvzG" +
            "AUzshXCqTsP65NtsxioQWgAVw2w/kFLQuGfPykw9a84eqzPV3D2vZgQJ7UEp9YfYDtXa" +
            "mhwvLHs5QTRvKU2b3AW4+ND1YOwQQi3cXDJ8be78QwsZGCXAUgFDCdRPET8uGGMBiqlM" +
            "WDcBHo9yMkVZ2RQ7d75vEzMGMMmFUqqO0b2H/dMBGym/zBB1Fe6PwBAgvAxgBYMWpuQH" +
            "3nLq/5KdrA42f+Y69WXIdFKNA2pcsW+iYLzDjBIQZwHUWlmaNqnTsNzimiywtoFhL2PI" +
            "YQTOZfDbAH1B4CwCTSfiJxXTHQTun5gQk/emZ2Aw3XPA8HkywuOKfZXElFJZmjYykik9" +
            "LLrSWl1F0iyXIVaFgmqa5rI+NsO680LXJufXzedIo3ZhIv/Bi75qAvwMpEChrnJ52r1d" +
            "kSg6MlqStYZBxwFKZ4XpW1ek7XTuTiiq6W+SfA/Ez4FxB0EkbylNG3fem4ljoR1hoFLY" +
            "eJ50Kdtq/AcjHG7cFN/XDOu7AWpOzg+kH/DCiJdJXzFLocX7s5wK9+CivZnfne3WM0rD" +
            "4ZYwhWO7dbjskD6VSPwOij1MmE2E+srS9LFdmWXu4dtJU2VgOgxgqFDqKc0V827YDCaC" +
            "uIgYs1hxMQTdAubbFctJ21YM2z95ti85aGA5gFGsuISIHgNwshurWyKAAxXJy7q5sLA1" +
            "qGb1za9/zVnzlyeu6h7TbdbZjmNT3flYN3XBvj+22noRA8cY6CBCFJgSFdQaM6ReMlyi" +
            "nEDHKkvTZ3R5f77vTmIuZYlXSNEoEPKZcRiMehAsJ4URsEIJSiPmOQT+EKAWJhoEcIKm" +
            "xFxbKottVICwrrI0fTY5Pa5N8iunh2i3w2MGT2lqdhTWlSWNj4kxNp0Nth8Qoe/vSCph" +
            "c2rWgYk2EE8gYZNqs1l88feSjN0RPj908AZlo3X78uG1nYBnPHYoHh0dQweh+ZCzdgjx" +
            "eU5B0Q0+2MduOtAsY+Paw3qo1daeAXFSFJnLJIm+LIi6a+Hq1ctG+bwvfBq97pueg4TR" +
            "42jZi/07KFDh9ib20gpPnbH/4J4ceHLPSuhZc2AeW31tVFT34Fp3ojE50Gi9n5zqn0oj" +
            "0HSp0nmpNY/HIzwez1VNF+OLD35gM4W3lqbn/W/5TBRYn7iISPaxFXn7Fvi/9Hgg0tNB" +
            "zpRR571mIMtgSbcokXe2PcavKLaCYR4DFBT1qvWfnFZ984IFLU4rugRVoroaqKrKsZ0e" +
            "0OmxT3qzrlOC7pZojmbWmcggWylACNh2nBYb9VG4LTy9ZuqOJY/31my9dMziF3vGvDug" +
            "pSPb0GWzBdkEwWSdbs/aOPxXZZHIXTAidTbzzj9Srwns35QSgzDfJdjKBon+DM1m5gwi" +
            "dAjhL0yahG/+VZnqSt1dazoC9yZDZs6G5dwNbEhcBIXHAdpFZCu2NQ0kmahdWZyoubQj" +
            "aLMmbc/Z9pdR6a4Qv5bzYK2ufTwmZGUoTXxnsooxGByWetPTSRPC+yN9zeVC4OBd4gF5" +
            "zhsanUY/w4PwiQ19R0plvQWmpckFdd7Lyagrd29i4Nvkgrpix/DTHaboHa1HaCKMDFLh" +
            "9/lIo0c9/dmUOKkpXj36+TOuPm+KU8ZYSggfYGHYpMKSP+nwhzrnSnLCWZYOutyYEpm/" +
            "fOCLp9268uQXQOpGZnKKTBtLinaYAgJJojZWfCsDBSTlFPfEEzVXy/3/5UCHZlecmh0B" +
            "jrfLvBAJPlC/G1PlkNza0OkP4noGW4zVhkaTTAsWsTNnkDP02XSu82oTTPOSCgJvOw85" +
            "0xE09MezY9mpQp7i87IHwOJ0IiRcSNOIAdkRmZEJ5D9/VBCtnsd7nAAAAABJRU5ErkJg" +
            "gg==";

    this.logo.render = function (ctx) {
        var gradient = ctx.createLinearGradient(
                0,
                0,
                this.width(),
                0
                );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        ctx.fillStyle = MorphicPreferences.isFlat ?
                myself.frameColor.toString() : gradient;
        ctx.fillRect(0, 0, this.width(), this.height());
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };

    this.logo.renderCachedTexture = function (ctx) {
        ctx.drawImage(
                this.cachedTexture,
                5,
                Math.round((this.height() - this.cachedTexture.height) / 2)
                );
        this.changed();
    };

    this.logo.mouseClickLeft = function () {
        myself.snapMenu();
    };

    this.logo.color = BLACK;
    this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
    this.add(this.logo);
    if (offline) {
        this.checkPath();
    }
    /*	
     this.logo.texture = this.logoURL;
     this.logo.drawNew = function () {
     this.image = newCanvas(this.extent());
     var context = this.image.getContext('2d'),
     gradient = context.createLinearGradient(
     0,
     0,
     this.width(),
     0
     );
     gradient.addColorStop(0, 'black');
     gradient.addColorStop(0.5, myself.frameColor.toString());
     context.fillStyle = MorphicPreferences.isFlat ?
     myself.frameColor.toString() : gradient;
     context.fillRect(0, 0, this.width(), this.height());
     if (this.texture) {
     this.drawTexture(this.texture);
     }
     };
     
     this.logo.drawCachedTexture = function () {
     var context = this.image.getContext('2d');
     context.drawImage(
     this.cachedTexture,
     5,
     Math.round((this.height() - this.cachedTexture.height) / 2)
     );
     this.changed();
     };
     
     this.logo.mouseClickLeft = function () {
     myself.snapMenu();
     };
     
     this.logo.color = new Color();
     this.logo.setExtent(new Point(250, 28)); // dimensions are fixed
     this.add(this.logo);
     */

//	this.mqttclient = mqtt.connect("wss://test.mosquitto.org:8081");
    this.mqttclient = mqtt.connect("wss://iot.ttu.edu.tw:9002") // you add a ws:// url here
//    this.mqttclient = mqtt.connect("ws://140.129.33.7:9001")
    this.mqttclient.on('connect', () => {
        console.log('connected.');
    });
};

IDE_Morph.prototype.checkPath = function () {
    var myself = this;
    var fs = require('fs');
    var path = require('path');
    var only_path = path.dirname(process.execPath) + path.sep;
    var ini_file = only_path + 'watchfile.ini';

    //alert("讀取"+only_path+'test.txt');


    fs.exists(ini_file, function (exists) {
        if (exists) {
            fs.readFile(ini_file, function (err, data) {
                if (err)
                    throw err;
                var watchpath = data.toString();
                //alert("正在監聽"+watchpath);
                let fsWait = false;
                fs.watch(watchpath, (event, filename) => {
                    if (fsWait) {
                        return;
                    } else {
                        fsWait = true;
                    }

                    fsWait = setTimeout(() => {
                        fsWait = false;
                    }, 100)

                    //alert("文件發生更新 "+filename);
                    //alert("world "+world);
                    //alert("testfile "+testfile);
                    //world.hand.processDrop(watchpath);
                    //alert("watchpath "+watchpath);
                    alert("更新 " + watchpath);
                    fs.readFile(watchpath, function (err, data) {
                        if (err) {
                            alert(err);
                        }
                        //alert(data.toString());
                        //alert(filename);
                        //alert(data.toString());
                        myself.droppedText(
                                data.toString(),
                                filename,
                                'text/html'
                                );

                        //world.hand.processDrop(data);
                    });

                })
            });
        } else {

        }
    });


}

IDE_Morph.prototype.createControlBar = function () {
    // assumes the logo has already been created
    var padding = 5,
            button,
            slider,
            stopButton,
            pauseButton,
            startButton,
            runButton,
            projectButton,
            //           plusButton,
            settingsButton,
            stageSizeButton,
            appModeButton,
            steppingButton,
            cloudButton,
            x,
            colors = MorphicPreferences.isFlat ? this.tabColors
            : [
                this.groupColor,
                this.frameColor.darker(50),
                this.frameColor.darker(50)
            ],
            activeColor = new Color(153, 255, 213),
            activeColors = [
                activeColor,
                activeColor.lighter(40),
                activeColor.lighter(40)
            ],
            myself = this;

    if (this.controlBar) {
        this.controlBar.destroy();
    }

    this.controlBar = new Morph();
    this.controlBar.color = this.frameColor;
    this.controlBar.setHeight(this.logo.height()); // height is fixed

    // let users manually enforce re-layout when changing orientation
    // on mobile devices
    this.controlBar.mouseClickLeft = function () {
        this.world().fillPage();
    };

    this.add(this.controlBar);

    //smallStageButton
    button = new ToggleButtonMorph(
            null, //colors,
            this, // the IDE is the target
            'toggleStageSize',
            [
                new SymbolMorph('smallStage', 14),
                new SymbolMorph('normalStage', 14)
            ],
            () => this.isSmallStage // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = MorphicPreferences.isFlat ?
            WHITE
            : this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'stage size\nsmall & normal';
    button.fixLayout();
    button.refresh();
    stageSizeButton = button;
    this.controlBar.add(stageSizeButton);
    this.controlBar.stageSizeButton = button; // for refreshing

    //appModeButton
    button = new ToggleButtonMorph(
            null, //colors,
            this, // the IDE is the target
            'toggleAppMode',
            [
                new SymbolMorph('fullScreen', 14),
                new SymbolMorph('normalScreen', 14)
            ],
            () => this.isAppMode // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'app & edit\nmodes';
    button.fixLayout();
    button.refresh();
    appModeButton = button;
    this.controlBar.add(appModeButton);
    this.controlBar.appModeButton = appModeButton; // for refreshing

    //steppingButton
    button = new ToggleButtonMorph(
            null, //colors,
            this, // the IDE is the target
            'toggleSingleStepping',
            [
                new SymbolMorph('footprints', 16),
                new SymbolMorph('footprints', 16)
            ],
            () => Process.prototype.enableSingleStepping // query
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = activeColor;
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.hint = 'Visible stepping';
    button.fixLayout();
    button.refresh();
    steppingButton = button;
    this.controlBar.add(steppingButton);
    this.controlBar.steppingButton = steppingButton; // for refreshing

    // stopButton
    button = new ToggleButtonMorph(
            null, // colors
            this, // the IDE is the target
            'stopAllScripts',
            [
                new SymbolMorph('octagon', 14),
                new SymbolMorph('square', 14)
            ],
            () => this.stage ? // query
                myself.stage.enableCustomHatBlocks &&
                myself.stage.threads.pauseCustomHatBlocks
                : true
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
            MorphicPreferences.isFlat ? 128 : 200,
            0,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'stop\nevery-\nthing';
    button.fixLayout();
    button.refresh();
    stopButton = button;
    this.controlBar.add(stopButton);
    this.controlBar.stopButton = stopButton; // for refreshing

    //pauseButton
    button = new ToggleButtonMorph(
            null, //colors,
            this, // the IDE is the target
            'togglePauseResume',
            [
                new SymbolMorph('pause', 12),
                new SymbolMorph('pointRight', 14)
            ],
            () => this.isPaused() // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = MorphicPreferences.isFlat ?
            new Color(220, 185, 0)
            : new Color(255, 220, 0);
    button.contrast = this.buttonContrast;
    // button.hint = 'pause/resume\nall scripts';
    button.fixLayout();
    button.refresh();
    pauseButton = button;
    this.controlBar.add(pauseButton);
    this.controlBar.pauseButton = pauseButton; // for refreshing

    // startButton
    button = new PushButtonMorph(
            this,
            'pressStart',
            new SymbolMorph('flag', 14)
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.fps = 4;
    button.isActive = false;

    button.step = function () {
        var isRunning;
        if (!myself.stage) {
            return;
        }
        isRunning = !!myself.stage.threads.processes.length;
        if (isRunning === this.isActive) {
            return;
        }
        this.isActive = isRunning;
        if (isRunning) {
            this.color = activeColors[0];
            this.highlightColor = activeColors[1];
            this.pressColor = activeColors[2];
        } else {
            this.color = colors[0];
            this.highlightColor = colors[1];
            this.pressColor = colors[2];
        }
        this.rerender();
    };

    button.labelColor = new Color(
            0,
            MorphicPreferences.isFlat ? 100 : 200,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    startButton = button;
    this.controlBar.add(startButton);
    this.controlBar.startButton = startButton;

    // runButton
    button = new PushButtonMorph(
            this,
            'runStart',
            'Run Ionic'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
            0,
            MorphicPreferences.isFlat ? 100 : 200,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    runButton = button;
    this.controlBar.add(runButton);
    this.controlBar.runButton = runButton;

    // runButton
    button = new PushButtonMorph(
            this,
            'runhtmlCode',
            'Run Html'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
            0,
            MorphicPreferences.isFlat ? 100 : 200,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    htmlButton = button;
    this.controlBar.add(htmlButton);
    this.controlBar.htmlButton = htmlButton;

    //htmlAutoButton
    button = new ToggleButtonMorph(
            null, //colors,
            this, // the IDE is the target
            'toggleAutoDemo',
            [
                new SymbolMorph('rectangle', 16),
                new SymbolMorph('checkedBox', 16)
            ],
            () => {
        if (autodemo == null) {
            return false;
        } else {
            return autodemo;
        }
    }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = activeColor;
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.hint = 'Visible stepping';
    button.fixLayout();
    button.refresh();
    htmlautoButton = button;
    this.controlBar.add(htmlautoButton);
    this.controlBar.htmlautoButton = htmlautoButton; // for refreshing

    // downloadButton
    button = new PushButtonMorph(
            this,
            'runCloudCode',
            'Run in Cloud'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
            0,
            MorphicPreferences.isFlat ? 100 : 200,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    downloadButton = button;
    this.controlBar.add(downloadButton);
    this.controlBar.downloadButton = downloadButton;
	
	// phpButton
    button = new PushButtonMorph(
            this,
            'runPHPCode',
            'Run PHP'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
            0,
            MorphicPreferences.isFlat ? 100 : 200,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    phpButton = button;
    this.controlBar.add(phpButton);
    this.controlBar.phpButton = phpButton;
	

    // ionicfileButton
    button = new PushButtonMorph(
            this,
            'ionicfile',
            new SymbolMorph('file', 14)
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
            0,
            MorphicPreferences.isFlat ? 100 : 200,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    ionicfileButton = button;
    this.controlBar.add(ionicfileButton);
    this.controlBar.ionicfileButton = ionicfileButton;

    // showcodeButton
    button = new PushButtonMorph(
            this,
            'showCode',
            'Code'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
            0,
            MorphicPreferences.isFlat ? 100 : 200,
            0
            );
    button.contrast = this.buttonContrast;
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    showCodeButton = button;
    this.controlBar.add(showCodeButton);
    this.controlBar.showCodeButton = showCodeButton;
	
	
    // steppingSlider
    slider = new SliderMorph(
            61,
            1,
            Process.prototype.flashTime * 100 + 1,
            6,
            'horizontal'
            );
    slider.action = (num) => {
        Process.prototype.flashTime = (num - 1) / 100;
        this.controlBar.refreshResumeSymbol();
    };
    // slider.alpha = MorphicPreferences.isFlat ? 0.1 : 0.3;
    slider.color = activeColor;
    slider.alpha = 0.3;
    slider.setExtent(new Point(50, 14));
    this.controlBar.add(slider);
    this.controlBar.steppingSlider = slider;

    // projectButton
    button = new PushButtonMorph(
            this,
            'projectMenu',
            new SymbolMorph('file', 14)
            //'\u270E'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'open, save, & annotate project';
    button.fixLayout();
    projectButton = button;
    this.controlBar.add(projectButton);
    this.controlBar.projectButton = projectButton; // for menu positioning

    // settingsButton
    button = new PushButtonMorph(
            this,
            'settingsMenu',
            new SymbolMorph('gears', 14)
            //'\u2699'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'edit settings';
    button.fixLayout();
    settingsButton = button;
    this.controlBar.add(settingsButton);
    this.controlBar.settingsButton = settingsButton; // for menu positioning

    // cloudButton
    /*
     button = new ToggleButtonMorph(
     null, //colors,
     this, // the IDE is the target
     'cloudMenu',
     [
     new SymbolMorph('cloudOutline', 11),
     new SymbolMorph('cloud', 11)
     ],
     () => !isNil(this.cloud.username) // query
     );
     */
    button = new ToggleButtonMorph(
            null, //colors,
            this, // the IDE is the target
            'cloudMenu',
            new SymbolMorph('cloud', 11)
            );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'cloud operations';
    button.fixLayout();
    button.refresh();
    cloudButton = button;
    this.controlBar.add(cloudButton);
    this.controlBar.cloudButton = cloudButton; // for menu positioning & refresh

    // plusButton
    /*    button = new PushButtonMorph(
     this,
     'pythonMenu',
     'python'
     //'\u2699'
     );*/
    button = new PushButtonMorph(
            this,
            'ionicMenu',
            'ionic'
            //'\u270E'
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    //button.drawNew();
    // button.hint = 'edit settings';
    button.fixLayout();
    plusButton = button;
    this.controlBar.add(plusButton);
    this.controlBar.plusButton = plusButton; // for menu positioning

    this.controlBar.fixLayout = function () {
        x = this.right() - padding;
		 //[stopButton, pauseButton, startButton].forEach(button => {
        [stopButton, pauseButton, startButton, runButton, htmlButton, downloadButton,phpButton].forEach(button => {
            //[ionicfileButton, stopButton, pauseButton, startButton,runButton,downloadButton,htmlButton,showCodeButton].forEach(button => {
            button.setCenter(myself.controlBar.center());
            button.setRight(x);
            x -= button.width();
            x -= padding;
        }
        );

        x = Math.min(
                phpButton.left() - (3 * padding + 2 * stageSizeButton.width()),
                myself.right() - myself.stage.dimensions.x *
                (myself.isSmallStage ? myself.stageRatio : 1)
                );
        [stageSizeButton, appModeButton].forEach(button => {
            x += padding;
            button.setCenter(myself.controlBar.center());
            button.setLeft(x);
            x += button.width();
        }
        );

        slider.setCenter(myself.controlBar.center());
        slider.setRight(stageSizeButton.left() - padding);

        steppingButton.setCenter(myself.controlBar.center());
        steppingButton.setRight(slider.left() - padding);

        settingsButton.setCenter(myself.controlBar.center());
        settingsButton.setLeft(this.left());

        cloudButton.setCenter(myself.controlBar.center());
        cloudButton.setRight(settingsButton.left() - padding);

        projectButton.setCenter(myself.controlBar.center());
        projectButton.setRight(cloudButton.left() - padding);

        plusButton.setCenter(myself.controlBar.center());
        plusButton.setRight(projectButton.left() - padding);

        this.refreshSlider();
        this.updateLabel();
    };

    this.controlBar.refreshSlider = function () {
        if (Process.prototype.enableSingleStepping && !myself.isAppMode) {
            slider.fixLayout();
            slider.rerender();
            slider.show();
        } else {
            slider.hide();
        }
        this.refreshResumeSymbol();
    };

    this.controlBar.refreshResumeSymbol = function () {
        var pauseSymbols;
        if (Process.prototype.enableSingleStepping &&
                Process.prototype.flashTime > 0.5) {
            myself.stage.threads.pauseAll(myself.stage);
            pauseSymbols = [
                new SymbolMorph('pause', 12),
                new SymbolMorph('stepForward', 14)
            ];
        } else {
            pauseSymbols = [
                new SymbolMorph('pause', 12),
                new SymbolMorph('pointRight', 14)
            ];
        }
        pauseButton.labelString = pauseSymbols;
        pauseButton.createLabel();
        pauseButton.fixLayout();
        pauseButton.refresh();
    };

    this.controlBar.updateLabel = function () {
        var prefix = myself.hasUnsavedEdits() ? '\u270E ' : '',
                suffix = myself.world().isDevMode ?
                ' - ' + localize('development mode') : '',
                name, scene, txt;

        if (this.label) {
            this.label.destroy();
        }
        if (myself.isAppMode) {
            return;
        }
        scene = myself.scenes.at(1) !== myself.scene ?
                ' (' + myself.scene.name + ')' : '';
        name = (myself.getProjectName() || localize('untitled'));
        txt = new StringMorph(
                prefix + name + scene + suffix,
                14,
                'sans-serif',
                true,
                false,
                false,
                MorphicPreferences.isFlat ? null : new Point(2, 1),
                myself.frameColor.darker(myself.buttonContrast)
                );
        txt.color = myself.buttonLabelColor;

        this.label = new FrameMorph();
        this.label.acceptsDrops = false;
        this.label.alpha = 0;
        txt.setPosition(this.label.position());
        this.label.add(txt);
        this.label.setExtent(
                new Point(
                        steppingButton.left() - settingsButton.right() - padding * 2,
                        txt.height()
                        )
                );
        this.label.setCenter(this.center());
        this.label.setLeft(this.settingsButton.right() + padding);
        this.add(this.label);
    };
};


IDE_Morph.prototype.originalSetLanguage = IDE_Morph.prototype.setLanguage;
IDE_Morph.prototype.setLanguage = function (lang, callback) {
    var myself = this;

    myself.originalSetLanguage(lang, function () {
        myself.setLanguageS4A(lang, callback);
    });
};

IDE_Morph.prototype.uploadCode= function (codetype) {
	
	for (var i = 0; i < this.sprites.contents.length; i++) {
		const key = this.sprites.contents[i].name;
		let codetext = fileListData[key];
		let type = fileListType[key];
		if(codetype=="php" && type=="html" && key=="index"){
			type = "php";
		}
		console.log('key = ' + key + '.' + type);
		console.log('codetext = ' + codetext);
		//codetext = btoa(unescape(encodeURIComponent(codetext)));
		let path = '';
		switch (type) {
			case 'js':
			    path = 'js/';
				break;
			case 'css':
			    path = 'css/';
                break;
			case 'php':
                path = 'php/';
                break;
            default:
                path = '';
        }
        if (type != "undefined" && codetext != "undefined") {
            var command = '{' +
                '"command":"savefile",' +
                '"data":"' + codetext + '",' +
                '"filename":"' + key + '.' + type + '",' +
                '"user":"' + SnapCloud.username + '",' +
                '"path":"' + path + '",' +
                '"return":' + 0 +
                '}';
            console.log(command);
            rootclient.publish(SnapCloud.username, command);
        } else {
            console.log(key + "undefined");
        }
    }
    var arr = this.sprites.asArray()[0];
    var costumes = arr.costumes.contents;
    for (var i = 0; i < costumes.length; i++) {
        var costume = costumes[i];
        var img = costume.contents.toDataURL();
        var name = costume.name;

        var command = '{' +
            '"command":"savefile",' +
            '"data":"' + img + '",' +
            '"filename":"' + name + '.png",' +
            '"user":"' + SnapCloud.username + '",' +
            '"path":"img/",' +
            '"return":' + 0 +
            '}';
        console.log(command);
        rootclient.publish(SnapCloud.username, command);
    }
	var sounds = arr.sounds.contents;
    for (var i = 0; i < sounds.length; i++) {
        var sound = sounds[i];
        var soundData = sound.toDataURL();
        var name = sound.name;
		var type="wav";
		if(soundData.startsWith("data:audio/ogg;")){
			type ="mp3";
		}
		if(soundData.startsWith("data:audio/wav;")){
			type ="wav";
		}
        var command = '{' +
            '"command":"savefile",' +
            '"data":"' + soundData + '",' +
            '"filename":"' + name + '.'+type+'",' +
            '"user":"' + SnapCloud.username + '",' +
            '"path":"audio/",' +
            '"return":' + 0 +
            '}';
        console.log(command);
        rootclient.publish(SnapCloud.username, command);
    }
}

IDE_Morph.prototype.runPHPCode= function () {
    w3_open();
    if (SnapCloud.username != null) {
		 setTimeout(() => {
			this.uploadCode("php");
            setTimeout(function () {
                var testWindow = window.open('https://iotapp.ttu.edu.tw/ionic-project/' + SnapCloud.username + '/php/index.php', "cloud", "toolbar=yes, menubar=yes");
                //var testWindow = window.open('https://iot.ttu.edu.tw:9999/demo/' + SnapCloud.username + '/root_index.html', "cloud");
                /*try {
                 testWindow.document.write(htmlText);
                 } catch (e) {
                 }
                 */
                testWindow.document.close();
            }, 1000);
        }, 500);
	}
};
IDE_Morph.prototype.runCloudCode = function () {
    w3_open();
    if (SnapCloud.username != null) {
        setTimeout(() => {
            this.uploadCode("html");
            setTimeout(function () {
				var testWindow = window.open('https://iotapp.ttu.edu.tw/ionic-project/' + SnapCloud.username + '/index.html', "cloud", "toolbar=yes, menubar=yes");
                //var testWindow = window.open('https://iot.ttu.edu.tw:9999/demo/' + SnapCloud.username + '/index.html', "cloud", "toolbar=yes, menubar=yes");
                //var testWindow = window.open('https://iot.ttu.edu.tw:9999/demo/' + SnapCloud.username + '/root_index.html', "cloud");
                /*try {
                 testWindow.document.write(htmlText);
                 } catch (e) {
                 }
                 */
                testWindow.document.close();
            }, 1000);
        }, 500);
    }
};

IDE_Morph.prototype.ionicfile = function () {
    w3_open();
};

IDE_Morph.prototype.runStart = function () {
    WatcherMorph.prototype.run(this, 'ionic');
};

IDE_Morph.prototype.showCode = function () {
    WatcherMorph.prototype.showCode();
};

IDE_Morph.prototype.runhtmlCode = function () {
    WatcherMorph.prototype.run(this, 'html');
};

IDE_Morph.prototype.setLanguageS4A = function (lang, callback) {
    // Load language script for s4a related functions
    var s4aTranslation = document.getElementById('s4a-language'),
            s4aSrc = 's4a-lang-' + lang + '.js',
            myself = this;
    if (s4aTranslation) {
        document.head.removeChild(s4aTranslation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback);
    }
    s4aTranslation = document.createElement('script');
    s4aTranslation.id = 's4a-language';
    s4aTranslation.onload = function () {
        myself.reflectLanguage(lang, callback);
    };
    document.head.appendChild(s4aTranslation);
    s4aTranslation.src = s4aSrc;
};

IDE_Morph.prototype.createCategories = function () {
    var myself = this,
            categorySelectionAction = this.scene.unifiedPalette ? scrollToCategory
            : changePalette,
            categoryQueryAction = this.scene.unifiedPalette ? queryTopCategory
            : queryCurrentCategory;

    if (this.categories) {
        this.categories.destroy();
    }
    this.categories = new Morph();
    this.categories.color = this.groupColor;
    this.categories.bounds.setWidth(this.paletteWidth);
    this.categories.buttons = [];

    this.categories.refresh = function () {
        this.buttons.forEach(cat => {
            cat.refresh();
            if (cat.state) {
                cat.scrollIntoView();
            }
        });
    };

    this.categories.refreshEmpty = function () {
        var dict = myself.currentSprite.emptyCategories();
        dict.variables = dict.variables || dict.lists || dict.other;
        this.buttons.forEach(cat => {
            if (dict[cat.category]) {
                cat.enable();
            } else {
                cat.disable();
            }
        });
    };

    function changePalette(category) {
        return () => {
            myself.currentCategory = category;
            myself.categories.buttons.forEach(each =>
                each.refresh()
            );
            myself.refreshPalette(true);
        };
    }

    function scrollToCategory(category) {
        return () => myself.scrollPaletteToCategory(category);
    }

    function queryCurrentCategory(category) {
        return () => myself.currentCategory === category;
    }

    function queryTopCategory(category) {
        return () => myself.topVisibleCategoryInPalette() === category;
    }

    function addCategoryButton(category) {
        var labelWidth = 75,
                colors = [
                    myself.frameColor,
                    myself.frameColor.darker(MorphicPreferences.isFlat ? 5 : 50),
                    SpriteMorph.prototype.blockColor[category]
                ],
                button;

        button = new ToggleButtonMorph(
                colors,
                myself, // the IDE is the target
                categorySelectionAction(category),
                category[0].toUpperCase().concat(category.slice(1)), // label
                categoryQueryAction(category), // query
                null, // env
                null, // hint
                labelWidth, // minWidth
                true // has preview
                );

        button.category = category;
        button.corner = 8;
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        if (MorphicPreferences.isFlat) {
            button.labelPressColor = WHITE;
        }
        button.fixLayout();
        button.refresh();
        myself.categories.add(button);
        myself.categories.buttons.push(button);
        return button;
    }

    function addCustomCategoryButton(category, color) {
        var labelWidth = 168,
                colors = [
                    myself.frameColor,
                    myself.frameColor.darker(MorphicPreferences.isFlat ? 5 : 50),
                    color
                ],
                button;

        button = new ToggleButtonMorph(
                colors,
                myself, // the IDE is the target
                categorySelectionAction(category),
                category, // label
                categoryQueryAction(category), // query
                null, // env
                null, // hint
                labelWidth, // minWidth
                true // has preview
                );

        button.category = category;
        button.corner = 8;
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        if (MorphicPreferences.isFlat) {
            button.labelPressColor = WHITE;
        }
        button.fixLayout();
        button.refresh();
        myself.categories.add(button);
        myself.categories.buttons.push(button);
        return button;
    }

    function fixCategoriesLayout() {
        var buttonWidth = myself.categories.children[0].width(),
                buttonHeight = myself.categories.children[0].height(),
                more = SpriteMorph.prototype.customCategories.size,
                border = 3,
                xPadding = (200 // myself.logo.width()
                        - border
                        - buttonWidth * 2) / 3,
                yPadding = 2,
                l = myself.categories.left(),
                t = myself.categories.top(),
                scroller,
                row,
                col,
                i;

        myself.categories.children.forEach((button, i) => {
            i += 1;
            if (i <= 17) {
                row = Math.ceil(i / 2);
                col = 2 - (i % 2);
            } else {
                row = 9 + (i - 17)
                col = 1;
            }
            button.setPosition(new Point(
                    l + (col * xPadding + ((col - 1) * buttonWidth)),
                    t + (row * yPadding + ((row - 1) * buttonHeight) + border)
                    ));
        });

        if (more > 6) {
            scroller = new ScrollFrameMorph(null, null, myself.sliderColor);
            scroller.setColor(myself.groupColor);
            scroller.acceptsDrops = false;
            scroller.contents.acceptsDrops = false;
            scroller.setPosition(
                    new Point(0, myself.categories.children[17].top())
                    );
            scroller.setWidth(myself.paletteWidth);
            scroller.setHeight(buttonHeight * 6 + yPadding * 5);

            for (i = 0; i < more; i += 1) {
                scroller.addContents(myself.categories.children[8]);
            }
            myself.categories.add(scroller);
            myself.categories.scroller = scroller;
            myself.categories.setHeight(
                    (9 + 1) * yPadding
                    + 9 * buttonHeight
                    + 6 * (yPadding + buttonHeight) + border + 2
                    + 2 * border
                    );
        } else {
            myself.categories.setHeight(
                    (9 + 1) * yPadding
                    + 9 * buttonHeight
                    + (more ?
                            (more * (yPadding + buttonHeight) + border + 2)
                            : 0)
                    + 2 * border
                    );
        }
    }
    let hideCategories = ['ionic-control', 'ionic-container', 'lists', 
	'properties', 'other', 'chart', 'phpMySQL', 'firebase', 'htmlhead', 
	'htmlbody', 'string', 'control2','MySQL','operatorsMySQL','axios',
	'react','MQTT'];
    SpriteMorph.prototype.categories.forEach(cat => {
        if (!contains(hideCategories, cat)) {
            addCategoryButton(cat);
        }
    });

    // sort alphabetically
    Array.from(
            SpriteMorph.prototype.customCategories.keys()
            ).sort().forEach(name =>
        addCustomCategoryButton(
                name,
                SpriteMorph.prototype.customCategories.get(name)
                )
    );

    fixCategoriesLayout();
    this.add(this.categories);
};

/*
 if (!contains(['lists', 'other', 'node', 'bit', 'file', 'perf', 'rtcfifo', 'rtcmem', 'rtctime', 'struct', 'tmr', 'http', 'net', 'encoder', 'cjson', 'crypto', 'enduser_setup', 'mdns', 'sntp', 'wifi', 'gpio', 'am2320', 'Sensors', 'Actuators', 'Zumo', 'apa102', 'dht', 'bme280', 'bmp085', 'tsl2561', 'adc', 'hx711', 'pwm', 'rotary', 'sigma_delta', 'u8g', 'ws2801', 'i2c', 'ow', 'spi', 'uart', 'math', 'string', 'control2'], cat)) {
 addCategoryButton(cat);
 }
 */



IDE_Morph.prototype.cloudMenu = function () {
    var menu,
            myself = this,
            world = this.world(),
            pos = this.controlBar.cloudButton.bottomLeft(),
            shiftClicked = (world.currentKey === 16);

    menu = new MenuMorph(this);
    if (shiftClicked) {
        menu.addItem(
                'url...',
                'setCloudURL',
                null,
                new Color(100, 0, 0)
                );
        menu.addLine();
    }
    if (!SnapCloud.username) {
        menu.addItem(
                'Login...',
                'initializeCloud'
                );
        menu.addItem(
                'Signup...',
                'createCloudAccount'
                );
        menu.addItem(
                'Reset Password...',
                'resetCloudPassword'
                );
    } else {
        menu.addItem(
                localize('Logout') + ' ' + SnapCloud.username,
                'logout'
                );
        menu.addItem(
                'Change Password...',
                'changeCloudPassword'
                );
		menu.addLine();
		if(SnapCloud.sub=="true"){
			menu.addItem(
			    'Unsubscribe to our Newsletter',
				'SubscribeNewsletter'
			);
		}else{
			menu.addItem(
			    'Subscribe to our Newsletter',
				'SubscribeNewsletter'
            );
		}
		/*
		SnapCloud.getSubscription(
                        SnapCloud.username,
                        function (res) {
							if(res){
								menu.addItem(
                                   'Unsubscribe to our Newsletter',
                                   'SubscribeNewsletter'
                                );
							}else{
								menu.addItem(
                                   'Subscribe to our Newsletter',
                                   'SubscribeNewsletter'
                                );
							}
                            console.log(res);
                        },
                        myself.cloudError()
                        );
						*/
		menu.addLine();
		menu.addItem(
                'MySQL(create user/upgrade password)',
                'createMySQLUser'
                );
		menu.addItem(
                'MySQL phpmyadmin link',
                'gotoMySQL'
                );
		menu.addLine();
		menu.addItem(
                'Open User Folder',
                function () {
                    w3_open(true)
                }
                );
    }
    if (shiftClicked) {
        menu.addLine();
        menu.addItem(
                'export project media only...',
                function () {
                    if (myself.getProjectName) {
                        myself.exportProjectMedia(myself.getProjectName);
                    } else {
                        myself.prompt('Export Project As...', function (name) {
                            myself.exportProjectMedia(name);
                        }, null, 'exportProject');
                    }
                },
                null,
                this.hasChangedMedia ? new Color(100, 0, 0) : new Color(0, 100, 0)
                );
        menu.addItem(
                'export project without media...',
                function () {
                    if (myself.getProjectName) {
                        myself.exportProjectNoMedia(myself.getProjectName);
                    } else {
                        myself.prompt('Export Project As...', function (name) {
                            myself.exportProjectNoMedia(name);
                        }, null, 'exportProject');
                    }
                },
                null,
                new Color(100, 0, 0)
                );
        menu.addItem(
                'export project as cloud data...',
                function () {
                    if (myself.getProjectName) {
                        myself.exportProjectAsCloudData(myself.getProjectName);
                    } else {
                        myself.prompt('Export Project As...', function (name) {
                            myself.exportProjectAsCloudData(name);
                        }, null, 'exportProject');
                    }
                },
                null,
                new Color(100, 0, 0)
                );
        menu.addLine();
        menu.addItem(
                'open shared project from cloud...',
                function () {
                    myself.prompt('Author name…', function (usr) {
                        myself.prompt('Project name...', function (prj) {
                            var id = 'Username=' +
                                    encodeURIComponent(usr.toLowerCase()) +
                                    '&ProjectName=' +
                                    encodeURIComponent(prj);
                            myself.showMessage(
                                    'Fetching project\nfrom the cloud...'
                                    );
                            SnapCloud.getPublicProject(
                                    id,
                                    function (projectData) {
                                        var msg;
                                        if (!Process.prototype.isCatchingErrors) {
                                            window.open(
                                                    'data:text/xml,' + projectData
                                                    );
                                        }
                                        myself.nextSteps([
                                            function () {
                                                msg = myself.showMessage(
                                                        'Opening project...'
                                                        );
                                            },
                                            function () {
                                                nop();
                                            }, // yield (Chrome)
                                            function () {
                                                myself.rawOpenCloudDataString(
                                                        projectData
                                                        );
                                            },
                                            function () {
                                                msg.destroy();
                                            }
                                        ]);
                                    },
                                    myself.cloudError()
                                    );

                        }, null, 'project');
                    }, null, 'project');
                },
                null,
                new Color(100, 0, 0)
                );
    }
    menu.popup(world, pos);
};



IDE_Morph.prototype.getFileData = function () {
    var myself = this;
    var codes,
            test = [],
            stage = this.stage,
            str = myself.getURL(myself.resourceURL('Examples/ionic.xml'));
    str = str.substring(str.indexOf('<code>'), str.indexOf('</code>') + 7);
    if (Process.prototype.isCatchingErrors) {
        try {
            codes = SnapSerializer.prototype.loadCodes(str);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        codes = SnapSerializer.prototype.loadCodes(str);
    }
    codes.forEach(xml => {
        test[xml.tag] = xml.contents;
    });
    return test;
}



var hidechart = true, hideAxios = false,
        hideioniclib = false,
        autodemo = false;

IDE_Morph.prototype.toggleAutoDemo = function () {
    autodemo = !autodemo;
    this.stage.threads.pauseCustomHatBlocks = !this.stage.threads.pauseCustomHatBlocks;
    this.controlBar.htmlautoButton.refresh();
};

IDE_Morph.prototype.hideBlocks = function (ide, categorylocal, cat) {
    var defs = SpriteMorph.prototype.blocks;
    Object.keys(defs).forEach(function (sel) {
        if (defs[sel].category === cat) {
            StageMorph.prototype.hiddenPrimitives[categorylocal + "_" + sel] = true;
        }
    });
    ide.flushBlocksCache();
    ide.refreshPalette();
    ide.categories.refreshEmpty();
    ide.recordUnsavedChanges();
}

IDE_Morph.prototype.showBlocks = function (ide, categorylocal, cat) {
    var hiddens = StageMorph.prototype.hiddenPrimitives,
            defs = SpriteMorph.prototype.blocks;
    Object.keys(hiddens).forEach(function (sel) {
        if (sel.startsWith(categorylocal + "_")) {
            sel = sel.replace(categorylocal + "_", '');
        }
        if (defs[sel] && (defs[sel].category === cat)) {
            delete StageMorph.prototype.hiddenPrimitives[categorylocal + "_" + sel];
        }
    });
    ide.flushBlocksCache();
    ide.refreshPalette();
    ide.categories.refreshEmpty();
    ide.recordUnsavedChanges();
}

IDE_Morph.prototype.ionicMenu = function () {
    var menu,
            stage = this.stage,
            world = this.world(),
            myself = this,
            pos = this.controlBar.plusButton.bottomLeft(),
            shiftClicked = (world.currentKey === 16);

    menu = new MenuMorph(this);

    menu.addItem(
            'New html Project',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('Examples/ionic.xml')),
                            'NodeMCU'
                            );
                });
            },
            'create a new Ionic project'
            );

    menu.addItem(
            'New React Ionic Project',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('Examples/ionicReact.xml')),
                            'NodeMCU'
                            );
                });
            },
            'create a new React Ionic project'
            );

    menu.addItem(
            'New Vue Ionic Project',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('Examples/ionicVue.xml')),
                            'NodeMCU'
                            );
                });
            },
            'create a new Vue Ionic project'
            );
	menu.addLine();
    menu.addItem(
            'New Vue3.2 Ionic Project',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('Examples/ionicVue3.2.xml')),
                            'NodeMCU'
                            );
                });
            },
            'create a new Vue3.2 Ionic project'
            );
			
	if(this.stage.globalBlocks.length > 0){
		let isOpenfile = false;
		
		this.stage.globalBlocks.forEach(block => 
		{
			if(block.spec == "run %'function'"){
				isOpenfile = true;
			}
		});
		if(isOpenfile){
			menu.addItem(
            'create routes.js',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('Examples/routes.xml')),
                            'NodeMCU'
                            );
                });
            },
            'create a routes.js file'
            );
			menu.addItem(
            'create vue file',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('Examples/vue.xml')),
                            'NodeMCU'
                            );
                });
            },
            'create a vue file'
            );
		}
	}
	menu.addLine();			
	menu.addItem(
            'New php Project',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('Examples/php.xml')),
                            'NodeMCU'
                            );
                });
            },
            'create a new Ionic project'
            );
	menu.addLine();
    menu.addItem(
            'Upgrade Project',
            function () {
                myself.droppedText(
                        myself.getURL(myself.resourceURL('Examples/ionic.xml')),
                        'ionic.xml',
                        'upgradecode'
                        );
            },
            'Upgrade new added blocks to your current project'
            );

	
    if(this.stage.globalBlocks.length > 0){
		let isOpenfile = false;
		
		this.stage.globalBlocks.forEach(block => 
		{
			if(block.spec == "run %'function'"){
				isOpenfile = true;
			}
		});
		if(isOpenfile){
		menu.addLine();
		menu.addItem(
            'Create a new file ...',
            'creatIonicFile',
            'Create a new file'
            );
		}
	}

    menu.addLine();

    if (hidechart) {
        menu.addItem('Show (Looks) chart library',
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph);
                    IDE_Morph.prototype.showBlocks(ide, 'looks', 'chart');
                    hidechart = false;
                },
                'show chart blocks'
                );
    } else {
        menu.addItem('hide (Looks) chart library',
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph);
                    IDE_Morph.prototype.hideBlocks(ide, 'looks', 'chart');
                    hidechart = true;
                },
                'hide chart blocks'
                );
    }
    if (hideAxios) {
        menu.addItem('Show (server) axios library',
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph);
                    IDE_Morph.prototype.showBlocks(ide, 'server', 'axios');
                    hideAxios = false;
                },
                'show axios blocks'
                );
    } else {
        menu.addItem('hide (server) axios library',
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph);
                    IDE_Morph.prototype.hideBlocks(ide, 'server', 'axios');
                    hideAxios = true;
                },
                'hide axios blocks'
                );
    }
    if (hideioniclib) {
        menu.addItem('Show (Ionic) ionic library',
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph);
                    IDE_Morph.prototype.showBlocks(ide, 'ionic', 'ionic-widgets');
                    IDE_Morph.prototype.showBlocks(ide, 'ionic', 'ionic-widgets2');
                    hideioniclib = false;
                },
                'show chart blocks'
                );
    } else {
        menu.addItem('hide(Ionic) ionic library',
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph);
                    IDE_Morph.prototype.hideBlocks(ide, 'ionic', 'ionic-widgets');
                    IDE_Morph.prototype.hideBlocks(ide, 'ionic', 'ionic-widgets2');
                    hideioniclib = true;
                },
                'hide chart blocks'
                );
    }
	menu.addItem(
            'Import(vue) Login library',
            function () {
                this.backup(() => {
                    window.labelWidth = 350;
                    myself.droppedText(
                            myself.getURL(myself.resourceURL('libBlock/LoginBlock.xml')),
                            'LoginLib'
                            );
                });
            },
            'Import Login blocks'
            );
    menu.addLine();
	menu.addItem('chage type Test',
                function () {
                    var arr = this.sprites.asArray()[0];
					costumes = arr.costumes.contents;
					for (var i = 0; i < costumes.length; i++) {
						var costume = costumes[i];
						var img = costume.contents.toDataURL();
						var name = costume.name;
						if(name=="php"){
							const html = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABFVJREFUaEPtmG1MW1UYx/99gdIWButkbcVlkQSGo8hcbWo0mtylsKkfpkMjvmyZydw0yofFZNXRqZmZ0U8uOBrUBIMsgWrIhgYGQdf4QbOW6KouUsExCp10IKUvFEpfTQ+7NxRhGbV3Kds9SZM+997z3Of3/z/39Nzy4vF4HLfB4HEgGeYi50iGGQLOEc4RlhTgWoslYVNOyzmSsnQsTeQcYUnYlNMmOeL3+3Gl+QPMu0YBelPM46WcPK0TF9WTtb4Q246cTErPgIyMjCD2chkEWBu7+ih4kLY7IJfLCRAD8muVDAWRQFpFZDuZR5iLyr6pZBAHJWL7vqzk32yevwNAis55wBcI0P+SGoqJQUZJt6gAld+OkfhydT7cRSpovvhxRaWj4RD+fnID/PwcbO2ZZK6z79wAaTzExL5n9Cg/aCDx76eOoeCbhQfZ9+zbKH/lKAbbjRA365e9zw0doU9ant8GhWsgCeSBnmsk1ul0OKHwQnu6f0WQWDiEseo8eIRSVPa5mesu7H8YSsfPTKw4Ow5RvozEf51pRlbDa+T7zAvvEpA/243I+fQwOyCDlAQiRBG7nt5yqAW1tbWIRCJwVOWCjzgSC3fiMykpxINdTgwPD6O4uBjXbD8heJgiM6dyZNh+bhyBQABSqRTjFjNCb+269SC0TK7CEmi/uoTw7Axpp8VjIv8eaM5ehs1mQ0VFBQQCAejF5Z9HX4T6eDPMZjMoioLXMQTPflV6QZxOJyZbP2JqktbUobS0lMS0IzcD4lLcB22bDb29vZDJZNBoNLi4cyNkIS/WfzkA5N+FhoYGGAwGzHvdcD2lTC/Iis2/WpAtj0Hb1IfOzk7Y7Xbo9Xp0dHSgvHEfys4H0N3dDZPJhJaWFkSCc7j6eEF6QaxWK+JNbzI8wtdPQq1Wr94RlQ7aT7rQ1taGys8PYut5P6anp2E0GlFfX49fdsnxcWE1WltbSW667W7pw34zrTVVdQDbjzbiwr6HoBy7iLu7piAUS+FwOLB50yaM6iTwCcSo+M5D0o1QIrJIZByIv/YYVIcMsOzVQuG0wbvnCO6ve58UfanpOPJMJxCEAFvMs+TYMJVD9nwZBxJ6oxElNQdgfboEcs8o6FUsUbS1pgxy9xXMQ4DS6yB2SgoxIgxI4rqxH7qSHtnYe3tI/L9/EFezamV/2AOllkL/7mJs9F1FDDzcaw6SQoYoMbIRQwh8lJjnyLGBHbmQxMNJIEsXHtq1G4Ik+jUxJNEghEu29fS5ddGFm9Ij8cM4Q+bFsS66UCQ9ZvgixHh85EXnSO8nBv2ysPhtZ2nuWV4WInzhUgYS0/e/MzaNy0qQoQf/48gfO3IhjYcztNzly/LzRVB97yMnmTfEoa8/Q7axbm2BPFcP1avvJIMkoonfLBg1nVoTMMon9qLokWqmVu5/rUyzjXOEc4QlBbjWYknYlNNyjqQsHUsTOUdYEjbltJwjKUvH0sTbxpF/AZ+W7om2OX8DAAAAAElFTkSuQmCC";		
							costume.name = "html";
							//costume.src = html;
							break;
						}
						if(name=="html"){
							const php = "data:image/png;base64,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";
							costume.name = "php";
							//costume.src = php;
							break;
						}
				
					}
                },
                'chage type Test'
                );
	menu.addLine();

    /*
     menu.addItem(
     'New html Project',
     function () {
     window.labelWidth = 350;
     myself.droppedText(
     myself.getURL(myself.resourceURL('Examples/html.xml')),
     'NodeMCU'
     );
     },
     'create a new html project'
     );
     
     
     menu.addItem(
     'Upgrade html Project',
     function () {
     myself.droppedText(
     myself.getURL(myself.resourceURL('Examples/html.xml')),
     'html.xml',
     'upgradecode'
     );
     },
     'Upgrade new added blocks to your current project'
     );	
     
     menu.addLine(); 
     */
    if (offline) {
        menu.addItem(
                'set Ionic Project Auto FileUpload',
                'testFile',
                'Ionic Project Auto FileUpload'
                );
        menu.addLine();
    }
    menu.addItem(
            'Promgram size settings...',
            'userSetIonicOptions'
            );
    menu.popup(world, pos);
}

IDE_Morph.prototype.userSetIonicOptions = function () {
    new DialogBoxMorph(
            this,
            function (num) {
                window.labelWidth = Math.max(
                        num,
                        0
                        );
            },
            this
            ).prompt(
            "Block/Scripts Width Setting",
            window.labelWidth.toString(),
            this.world(),
            null, // pic
            null, // choices
            null, // read only
            true // numeric
            );
};


IDE_Morph.prototype.testFile = function () {
    new DialogBoxMorph(
            this,
            function () {

            },
            this
            ).prompt(
            "Block/Scripts Width Setting",
            "",
            this.world(),
            null, // pic
            null, // choices
            null, // read only
            true // numeric
            );
};

IDE_Morph.prototype.creatIonicFile = function () {
    var myself = this;
    new DialogBoxMorph(
            null,
            function (test) {
                console.log(test);
                const filename = test.name;
                const filetype = test.type;
                let file = '<sprites app="Snap! 7, https://snap.berkeley.edu" version="2"><sprite name="Alonzo" idx="0" x="-1.0951654448090267" y="-35.781511042762304" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="1" color="80,80,80,1" pen="tip" id="2"><costumes>'
                const html = '<list id="3"><item><costume name="html" center-x="25" center-y="25" image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABIpJREFUaEPtWFkobW0YfmQ4ypB5SqaEMiRjhhSRRBkiLtxwIyQUKYRyobggCSlTZAy5MIcLN8iUKYSQIhxkJsPf+3X2am//v8/Rbq+/7bTem73ftdb3ft/zPu+0ltLHx8cH/gJREoAoGIsCIwpGCARGBEZ48oAQWjw5VmazAiMyu46nhQIjPDlWZrMSjNze3mJ9fR0/Ly8B0VCspCSzcbkuFDuPtpYWAgICJMxzQA4ODhATE4PV1VW8vb3J9Qx8GHNzc8Pw8DCMjY2ZeQ5IUlISWlpa+NiTN5vJyclobGyUBOLg4IDt7W3eNuXDsIWFBQ4PDyWBWFpa4ujoCKqqqtDR0WE3b25u8Pz8zJ1BW1sbP378YPr5+TnEdWkHpee0tLSgrq7OPULXxMXAwABKv3Lx7u4Oj4+P7LahoeF/nkO09rdACMTFxQUzXFlZiZycHG7P9PR0VFdXMz0oKAhxcXFITU2V6uz393fo6+sjLCwMHR0d3HOxsbEYGBjg9Lm5OXh4eDB9dnYWfn5+7P/8/Dzc3d2xsbEBFxeXf+3zRyBXV1dsUVVVFbKzsyWA1NTUMD04OBjR0dEgcNKEgJC3IyMj0dzczD3W0NCAlJQUpltZWbGQVlNTY/rOzg7s7e3Z/8XFRVBSb25uwtHRkT8gS0tLMDc3Zxvk5+cjISEBr6+v8PX1xdPTE+i7xu7uLjIyMlBeXo79/X3Y2NiwsDQyMmLrMjMzmcPu7++hoaGB09NTmJqa/r9AJicnOS9VVFSwMCQglBMERCTFxcUoKSnBysoKnJ2doaysDFtbW+zt7WF0dBShoaGYnp5GYGAgqJfp6uqyFiA3Ro6Pj5lHRWJmZgY7OzsutL4KhHItKysLY2Nj0NPTg6enJwvJvr4+Zp9CkHKvsLAQLy8vrIhQkZEbEKnB/ytHvgqkra0NiYmJGBwcxNbWFvLy8hiIpqYmDA0NscbW3d2N1tZWxgSF3eXlpfyAUNVYW1vj8Li6urIqIkr2rwLp6upCfHw8Ojs70dvbi/7+flBBqa2tRUFBAcuh6+trEGASYv7k5ER+QP5Utb4KZGpqisV/fX09cnNzGQjKE2pm1L+oSnl5eaG9vZ0BoQpFlUpuoSUvIAsLC4zJuro6pKWlsV7h7e3NDk33KGdCQkIwPj7OrpFO1xUOCOUFeb20tBRFRUUQVTE6dFlZGSvd1GBFDFMDpWomAkLPUeERFwL+8PAgfUShzv7VhvjV0KJ4NzExYSAIDOXa8vIyOxeN4zMzM/D392e/JBEREawIiAP5XHiItbOzM+lAVFRUWGKSUGmk8UEk1Mx8fHyYOjExwQyJhPoDjRFUSimpxYVGEprRqI/QuEHi5OTEfqmTU8mlZhgVFcWFG3X78PBwbu77DGRkZASamprSgXxeoMj6b2ctRT7457NZW1uzsYeEe7EiWqlhfSeh6bunp0cSCFUWGqVpePsOQq8HVNlE47/Exwd6D6Fu/h2EKh9NACIRvmspGmsCIwIjPHlACC2eHCuzWYERmV3H00KBEZ4cK7NZgRGZXcfTwr+GkX8AVUCPmB1oa2oAAAAASUVORK5CYII=" id="4"/></item></list></costumes><sounds><list struct="atomic" id="5"></list></sounds><blocks></blocks><variables></variables><scripts><script x="40.66666666666663" y="16.999999999999996"><custom-block s="run %cmdRing"><block s="reifyScript"><script></script><list></list></block></custom-block></script></scripts></sprite></sprites>'
                const css = '<list id="3"><item><costume name="css" center-x="25" center-y="25" image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABHBJREFUaEPtWFkodG8Y/82ILyZbSXJDLqShGHKBC1lS1ivcyVZKZClEZA+hiCwXaBQJV2QtSUTJLkuWCyRZsyVJzL/n/Dun4Zs5Z0zjszTP3cz7LO/v2d8jUigUCvwCEumBfLMo6iPyzQICfUT0EfkkD+hT65Mcq7Xa3xeR+fl5zMzM4Pz8XGuv/EtBU1NTxMTEwN7enjHLRKSgoABVVVV4eXn5l3fRia2SkhIUFhZCVFtbq8jKytKJ0q9S0tPTA5FMJlOsrKx81R10YtfJyQkiiUSieHh40InCr1JiZGQEEYDf8R7RFIiFhQVkMhmMjY3/cvzJyQlWV1ff/E/8Hh4e+PPnj8pAbW1t4eDg4M2ZpaUlvLy81AZ2bm4ONzc3Ks8FI0IXKioqQmxsLMiQKhoZGUFoaChzZGJiguzsbKSnp6vlJ77MzEzU19czMmSjuLgY8fHxMDMzUwvEx8cHBEYV8QIhpV1dXQgPD+dNf2UgZWVloHYuRMpABgYGEBERISQCrYGUl5cjPz9f0AALxMHBAcvLyzA3NxeUYYFER0ejt7dXkJ8YtAIiFotxdXXFhJ2IhmV1dTU2NjZU1sjU1BSTGh0dHdw5RXN0dFTlJSlFqEb6+voQFRXF8VCK7e3tqU3hD9cIFeri4iKnsLW1FcnJybyey83NRWVlJccTHByMsbExXpn+/n5ERkYyPHd3d7CxscHj46NGEVJmUlsj3t7emJ2d5XhTUlLQ3NzMayAkJATDw8NveDY3N5nfh4eHWFtbA60UT09PHE9NTQ2UN4vb21scHx+DvlLt7+9jaGgI7e3tgsB0CoTSkWrE1dVVreHLy0sEBARgfX2d4bG2tsbZ2RnvRam1U4a8vr6q5dMpELJCICYmJmBlZaXW6NHREezs7LhzPz8/TE5O8oKRy+VMDaojjYGkpqaiqalJMMQsQ05ODtO22dnj7Oz8RtbX1xfT09Pcfy4uLkhKSoKnpydoRSdSlrm/v4ejoyNOT09V3kEtEFrEtre3OaHGxkakpaVpDOQ9Y1BQEMbHx7m/aWA2NDTw6quoqEBeXh7HQyCVG5BGxU4TmlqdoaEhx19XV6dSEbVRaqdubm6QSqUqL+fv74/ExETuLC4uDp2dnaAGwbb494IJCQlMPbFEzt3Z2flYRIhb0ynNDkRaZWgOCBF1JgJNDqAuR2CEiAqedr0P1wgrsLS0BHd3d147HwVCKcNuDJoAocygXW9wcFB7ICRJKZWRkaFWiaZArq+vmTnS1tYG9g0kBGR3dxelpaXo7u7mdabg9qssHRgYCHrEvKeLiwssLCww9cF+DHjPQ12HBiJNb2WiFLO1tf1L5/PzMygFqbj55gcr+CEgQnn8lecisVis0ATxV15SyLZEIoFIKpUq6LX2k4nSUySXyxXU038ytbS0/P+BTvm19pMAGRgYgFYhaufct1+amNSn6TH1E2qGXqFhYWHcpv37PmL/pJRSdVd9RL5bBPUR0UfkkzygT61PcqzWavUR0dp1nyT4HwMcLsaWR5CgAAAAAElFTkSuQmCC" id="4"/></item></list></costumes><sounds><list struct="atomic" id="5"></list></sounds><blocks></blocks><variables></variables><scripts><script x="40.66666666666663" y="16.999999999999996"><custom-block s="run %cmdRing"><block s="reifyScript"><script></script><list></list></block></custom-block></script></scripts></sprite></sprites>'
                const php = '<list id="3"><item><costume name="php" center-x="25" center-y="25" image="data:image/png;base64,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" id="4"/></item></list></costumes><sounds><list struct="atomic" id="5"></list></sounds><blocks></blocks><variables></variables><scripts><script x="40.66666666666663" y="16.999999999999996"><custom-block s="run %cmdRing"><block s="reifyScript"><script></script><list></list></block></custom-block></script></scripts></sprite></sprites>'
                const js = '<list id="3"><item><costume name="js" center-x="25" center-y="25" image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA4pJREFUaEPtWEsotFEYfj5KzNAQKTtWNBumWMkCC02UhaZQimzspJAkt4VLhmxkaRKhIeW2l1IuuS2UhoV7bqGQDZ/e8zenGf7xXZr5Zkbfu5pvznve93nOcy7vOYIoiiL+gAk6kRBTUVckxASBroiuSIBGQJ9aARpY1WH/niIbGxtYW1vD7e2t6lHRsmNcXByqqqqQmprK0jJF2tra0NfXh4+PDy2x+CVXV1cX2tvbIdjtdrGxsdEvQYMVZGpqCoLFYhF3d3eDhcEveTMyMiAYjUbx9fXVLwGDFSQqKgoCAL/dR2jh5eTkePFxOp0/+MXHx8NisSApKckn9729PbhcLtlj41ciRGJzc5Mnf3t7g9Fo5N9EgDaW2tpa0O/fbGBgAM3NzaFHhOSfmJiAzWaTBS5kiVRXV2NsbEwWCXIKWSIrKyuwWq2cyPPzMy4vL30Sm5ycRE9Pj2zimq2Ru7s7r8VdUVGB6elp2UClHDUjcnV1hZSUFI6HTuSRkRH2TQ859/f3Ulh/bdeMCE2VyspKn2De39/hcDjQ1NSEl5cXxaQ0I5KdnY2trS1JgOfn5ygoKMDx8bGkr6eDZkQoaUNDA4aGhiQBHhwcIDMzU9IvaEQocV5eHgYHB39UAN9R0+G6vb0tm4wiRbq7u1FXV8eDLy8vo6amhn8XFxdjaWmJfz88PPgsQwRB4G2JiYmg7TktLY337ezsBG0Ick0REbrIjI+P89h0fyksLMTq6ioSEhIwNzeH/Px83r6+vo7c3FxJLDExMZifn0dRURH37e/vR0tLi2Rft4MiIlQfPT4+/ghOCzQ2NpaR8bTW1lb09vayv6gG86y7vgcxm81ef5WXl2NmZiYwRChqR0cHSHYpOzk5Ae1UT09PzJWuCgaDQaoba7+5uUF6ejro9JdrihRxB52dnUVZWZnPHKRaaWkpewNwm1wiBJ6qY5qmSkwVEUpQX1/P7vnR0dFeYOmsoALx9PTUC4ccIjs7O0ztxcVFJRyYr2oi7ky0nSYnJ+Pi4gJnZ2e4vr7+L4jfyvfPz0/QVNzf32flihoTIiIiRAoUzkabiGA2m8XDw8Nw5oGsrCwIDodDpDkdzjY6OvrvgY5qoOHh4bDjEhkZye71dAHjb79HR0dYWFgAlRXhsGZMJhNKSkp4cfn3HrHDbl59A6wrEmoK6oroigRoBPSpFaCBVR1WV0T10AWo4xelQtS3x6yAtwAAAABJRU5ErkJggg==" id="4"/></item></list></costumes><sounds><list struct="atomic" id="5"></list></sounds><blocks></blocks><variables></variables><scripts><script x="40.66666666666663" y="16.999999999999996"><custom-block s="run %cmdRing"><block s="reifyScript"><script></script><list></list></block></custom-block></script></scripts></sprite></sprites>'
                const vue = '<list id="3"><item><costume name="vue" center-x="25" center-y="25" image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAeVJREFUaEPtWN2RgjAQXmrAFrAGfZASpBGEHujAn0awBHjQGrQFbQFuNjfr7GRyB4EJcLnlxZGQ7H4/u8kkaNu2BQ+eQIAsTEVRZGGCgCgiijhiQKzliNjBy/qnSBAEg9mYcyLm3TTNd/v9qyA4gSiDH4dGATJnYRhii7UWJgj8P0VerxeEYaiEMLXr3W4HVVWp8ev1CkmSTCpab0XO5zOkaaqSy/Nc/Z5Op0+yZVnCfr9X/+M4hrqulwlEZxyz5Kw/Hg+Iogiezyes1+tJQSiX2OwjlOz7/VaJrlYr9ctBXi4XOBwOYFIoyzI4Ho9qDn2nzycGbE8bVkC4vbiF+HtKoC8QDk6X0QaMFRAMxK/BqKhNtuoLhObe73fYbrcKC72zaRrWQG63G2w2GxWQ6oHAcbv0BfLb/SAH11V01kB0e2Hy1M24FRYPRLcXFj7uLzp7HLCpAdA72p9s2DepY60ILoL2wocsRnsL31d4JzMFJiC6wvxbp8WOgbDT4EOtFFWhVswT4UniN0VRGNvvT53LOZCuwptjfJC15ki0K6YA6WJo6nFRZGrGu+L5o4gPF3R4Xvvc/dpsPl0yTzlOh07/LrGnZNFFLFHEBatj1hRFxrDnYq4o4oLVMWuKImPYczHXG0W+ANeOdcUJTAVLAAAAAElFTkSuQmCC" id="4"/></item></list></costumes><sounds><list struct="atomic" id="5"></list></sounds><blocks></blocks><variables></variables><scripts><script x="40.66666666666663" y="16.999999999999996"><custom-block s="run %cmdRing"><block s="reifyScript"><script><block s="doScriptSetupExportVueComponents"><script></script></block><block s="doVueTemplateTag"><l><option>template</option></l><l></l><script></script></block><block s="doVueTemplateTag"><l><option>script setup</option></l><l></l><script></script></block><block s="doVueTemplateTag"><l><option>style</option></l><l></l><script></script></block></script><list></list></block></custom-block></script></scripts></sprite></sprites>'

				switch (filetype) {
                    case 'html':
                        file = file + html;
                        break;
                    case 'css':
                        file = file + css;
                        break;
                    case 'php':
                        file = file + php;
                        break;
                    case 'js':
                        file = file + js;
                        break;
                    case 'vue':
                        file = file + vue;
                        break;
                }

                file = file.replace('sprite name="Alonzo"', 'sprite name="' + filename + '"');
                myself.droppedText(file.toString(), filename + '.xml');
            },
            ).withKey('ioniccreat').promptCredentialsIonic(
            'Create a file',
            'ioniccreat',
            null,
            null,
            null,
            null,
            null,
            world,
            null,
            null,
            );

};

IDE_Morph.prototype.userSetPythonOptions = function () {
    new DialogBoxMorph(
            this,
            function (num) {
                window.labelWidth = Math.max(
                        num,
                        0
                        );
            },
            this
            ).prompt(
            "Block/Scripts Width Setting",
            window.labelWidth.toString(),
            this.world(),
            null, // pic
            null, // choices
            null, // read only
            true // numeric
            );
};


IDE_Morph.prototype.getURL = function (url, callback, responseType) {
    // fetch the contents of a url and pass it into the specified callback.
    // If no callback is specified synchronously fetch and return it
    // Note: Synchronous fetching has been deprecated and should be switched
    var request = new XMLHttpRequest(),
            async = callback instanceof Function,
            myself = this,
            rsp;
    if (async) {
        request.responseType = responseType || 'text';
    }
    rsp = (!async || request.responseType === 'text') ? 'responseText'
            : 'response';
    try {
        request.open('GET', url, async);
        if (async) {
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request[rsp]) {
                        callback.call(
                                myself,
                                request[rsp]
                                );
                    } else {
                        throw new Error('unable to retrieve ' + url);
                    }
                }
            };
        }
        // cache-control, commented out for now
        // added for Snap4Arduino but has issues with local robot servers
        // request.setRequestHeader('Cache-Control', 'max-age=0');
        request.send();
        if (!async) {
            if (request.status === 200) {
                return request[rsp];
            }
            throw new Error('unable to retrieve ' + url);
        }
    } catch (err) {
        myself.showMessage(err.toString());
        if (async) {
            callback.call(this);
        } else {
            return request[rsp];
        }
    }
};

IDE_Morph.prototype.readFileCode = function (x, z, fileType) {
    try {

        var i, y, xLen, txt;
        txt = "";
        x = x[0].childNodes;
        xLen = x.length;
        if (fileType !== 'upgrade' && fileType !== 'upgradecode') {
            fileListData = {};
            fileListType = {};

            for (i = 0; i < xLen; i++) {
                y = x[i];
                let name = y.getElementsByTagName("filename")[0].textContent;
                let code = y.getElementsByTagName("filecode")[0].textContent;
                let type = name.split('.')[1];
                name = name.split('.')[0];

                fileListData[name] = code;
                fileListType[name] = type;
            }
        }
    } catch (e) {

    }
}

ProjectDialogMorph.prototype.openProject = function () {
    var proj = this.listField.selected,
            src;
    if (!proj) {
        return;
    }
    this.ide.source = this.source;
    if (this.source === 'cloud') {
        this.openCloudProject(proj);
    } else if (this.source === 'examples') {
        // Note "file" is a property of the parseResourceFile function.
        src = this.ide.getURL(this.ide.resourceURL('Examples', proj.fileName));
        this.ide.backup(() => this.ide.openProjectString(src));
        location.hash = '';
        var bString = src.substring(src.indexOf('<files>'), src.indexOf('</files>') + 8);
        var parser = new DOMParser();
        var doc = parser.parseFromString(bString, "text/xml");
        IDE_Morph.prototype.readFileCode(doc.children, '', '');
        this.destroy();

    } else { // 'local'
        this.ide.source = null;
        this.ide.backup(() => this.ide.openProjectName(proj.name));
        this.destroy();
    }
};

IDE_Morph.prototype.droppedText = function (aString, name, fileType) {
    var lbl = name ? name.split('.')[0] : '',
            ext = name ? name.slice(name.lastIndexOf('.') + 1).toLowerCase() : '';

    if (ext == 'html') {
        aString = this.convertCode(aString, name);
        ext = 'xml';
    }
    // check for Snap specific files, projects, libraries, sprites, scripts
    if (aString.indexOf('<project') === 0) {
        location.hash = '';
        var bString = aString.substring(aString.indexOf('<files>'), aString.indexOf('</files>') + 8);
        var parser = new DOMParser();
        var doc = parser.parseFromString(bString, "text/xml");
        this.readFileCode(doc.children, '', fileType);

        if (fileType === undefined) {
            return this.openProjectString(aString);
        } else if (fileType !== 'upgrade' && fileType !== 'upgradecode') {
            return this.openProjectString(aString);
        }

    }
    if (aString.indexOf('<snapdata') === 0) {
        location.hash = '';
        var bString = aString.substring(aString.indexOf('<files>'), aString.indexOf('</files>') + 8);
        var parser = new DOMParser();
        var doc = parser.parseFromString(bString, "text/xml");
        this.readFileCode(doc.children, '', fileType);

        return this.openCloudDataString(aString);
    }
    if (aString.indexOf('<blocks') === 0) {
        return this.openBlocksString(aString, lbl, true);
    }
    if (aString.indexOf('<sprites') === 0) {
        return this.openSpritesString(aString);
    }
    if (aString.indexOf('<media') === 0) {
        return this.openMediaString(aString);
    }
    if (aString.indexOf('<script') === 0) {
        return this.openScriptString(aString);
    }


    // check for encoded data-sets, CSV, JSON
    if (fileType.indexOf('upgradecode') === 0) {
        var bString = aString.substring(aString.indexOf('<code>'), aString.indexOf('</code>') + 7)
        if (bString.indexOf('<code') === 0) {
            return this.rawOpenCodesString(bString, lbl, true);
        }
    } else if (fileType.indexOf('upgrade') === 0) {
        var bString = aString.substring(aString.indexOf('</code>') + 7)
        if (bString.indexOf('<blocks') === 0) {
            return this.openBlocksString2(bString.substring(bString.indexOf('<blocks'), bString.indexOf('</blocks>') + 9), lbl, true);
        }
    }
    if (fileType.indexOf('csv') !== -1 || ext === 'csv') {
        return this.openDataString(aString, lbl, 'csv');
    }
    if (fileType.indexOf('json') !== -1 || ext === 'json') {
        return this.openDataString(aString, lbl, 'json');
    }

    // import as plain text data
    this.openDataString(aString, lbl, 'text');
};

IDE_Morph.prototype.rawOpenCodesString = function (str, name, silently) {
    // name is optional (string), so is silently (bool)
    var codes;
    if (Process.prototype.isCatchingErrors) {
        try {
            codes = this.serializer.loadCodes(str, this.stage);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        codes = this.serializer.loadCodes(str, this.stage);
    }
    if (silently) {
        codes.forEach(xml => {
            StageMorph.prototype.codeMappings[xml.tag] = xml.contents;
        });
        this.flushPaletteCache();
        this.refreshPalette();
        this.showMessage(
                'Imported Blocks Module' + (name ? ': ' + name : '') + '.',
                2
                );
    }
};

IDE_Morph.prototype.openBlocksString2 = function (str, name, silently) {
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('upgrade...'),
        () => {
            this.rawOpenBlocksString(str, name, silently);
            msg.destroy();
        }
    ]);
};


IDE_Morph.prototype.projectMenu = function () {
    var menu,
            world = this.world(),
            pos = this.controlBar.projectButton.bottomLeft(),
            graphicsName = this.currentSprite instanceof SpriteMorph ?
            'Costumes' : 'Backgrounds',
            shiftClicked = (world.currentKey === 16),
            backup = this.availableBackup(shiftClicked);

    menu = new MenuMorph(this);
    menu.addItem('Notes...', 'editNotes');
    menu.addLine();
    menu.addPair('New', 'createNewProject', '^N');
    menu.addPair('Open...', 'openProjectsBrowser', '^O');
    menu.addPair('Save', "save", '^S');
    menu.addItem('Save As...', 'saveProjectsBrowser');
    if (backup) {
        menu.addItem(
                'Restore unsaved project',
                'restore',
                backup,
                shiftClicked ? new Color(100, 0, 0) : null
                );
        if (shiftClicked) {
            menu.addItem(
                    'Clear backup',
                    'clearBackup',
                    backup,
                    new Color(100, 0, 0)
                    );
        }
    }
    menu.addLine();
    menu.addItem(
            'Import...',
            'importLocalFile',
            'file menu import hint' // looks up the actual text in the translator
            );
    menu.addItem(
            'Export project...',
            () => {
        var pn = this.getProjectName();
        if (pn) {
            this.exportProject(pn);
        } else {
            this.prompt(
                    'Export Project As...',
                    name => this.exportProject(name),
                    null,
                    'exportProject'
                    );
        }
    },
            'save project data as XML\nto your downloads folder'
            );
    menu.addItem(
            'Export summary...',
            () => this.exportProjectSummary(),
            'save a summary\nof this project'
            );
    if (shiftClicked) {
        menu.addItem(
                'Export summary with drop-shadows...',
                () => this.exportProjectSummary(true),
                'download and save' +
                '\nwith a summary of this project' +
                '\nwith drop-shadows on all pictures.' +
                '\nnot supported by all browsers',
                new Color(100, 0, 0)
                );
        menu.addItem(
                'Export all scripts as pic...',
                () => this.exportScriptsPicture(),
                'show a picture of all scripts\nand block definitions',
                new Color(100, 0, 0)
                );
    }
    menu.addLine();
    if (this.stage.globalBlocks.length) {
        menu.addItem(
                'Export blocks...',
                () => this.exportGlobalBlocks(),
                'save global custom block\ndefinitions as XML'
                );
        menu.addItem(
                'Unused blocks...',
                () => this.removeUnusedBlocks(),
                'find unused global custom blocks' +
                '\nand remove their definitions'
                );
    }
    menu.addItem(
            'Hide blocks...',
            () => new BlockVisibilityDialogMorph(this.currentSprite).popUp(world)
    );
    menu.addItem(
            'New category...',
            () => this.createNewCategory()
    );
    if (SpriteMorph.prototype.customCategories.size) {
        menu.addItem(
                'Remove a category...',
                () => this.deleteUserCategory(pos)
        );
    }
    menu.addLine();
    if (this.scenes.length() > 1) {
        menu.addItem('Scenes...', 'scenesMenu');
    }
    menu.addPair('New scene', 'createNewScene');
    menu.addPair('Add scene...', 'addScene');
    menu.addLine();
    menu.addItem(
            'Libraries...',
            () => {
        if (location.protocol === 'file:') {
            this.importLocalFile();
            return;
        }
        this.getURL(
                this.resourceURL('libraries', 'LIBRARIES'),
                txt => {
                    var libraries = this.parseResourceFile(txt);
                    new LibraryImportDialogMorph(this, libraries).popUp();
                }
        );
    },
            'Select categories of additional blocks to add to this project.'
            );
    menu.addItem(
            localize(graphicsName) + '...',
            () => {
        if (location.protocol === 'file:') {
            this.importLocalFile();
            return;
        }
        this.importMedia(graphicsName);
    },
            'Select a costume from the media library'
            );
    menu.addItem(
            localize('Sounds') + '...',
            () => {
        if (location.protocol === 'file:') {
            this.importLocalFile();
            return;
        }
        this.importMedia('Sounds');
    },
            'Select a sound from the media library'
            );

    if (this.scene.trash.length) {
        menu.addLine();
        menu.addItem(
                'Undelete sprites...',
                () => this.undeleteSprites(
                    this.controlBar.projectButton.bottomLeft()
                    ),
                'Bring back deleted sprites'
                );
    }
    menu.popup(world, pos);
};

/*
 IDE_Morph.prototype.newProject = function () {
 this.source = this.cloud.username ? 'cloud' : null;
 if (this.stage) {
 this.stage.destroy();
 }
 if (location.hash.substr(0, 6) !== '#lang:') {
 location.hash = '';
 }
 this.globalVariables = new VariableFrame();
 this.currentSprite = new SpriteMorph(this.globalVariables);
 this.sprites = new List([this.currentSprite]);
 StageMorph.prototype.dimensions = new Point(480, 360);
 StageMorph.prototype.hiddenPrimitives = {};
 StageMorph.prototype.codeMappings = {};
 StageMorph.prototype.codeHeaders = {};
 StageMorph.prototype.enableCodeMapping = false;
 StageMorph.prototype.enableInheritance = true;
 StageMorph.prototype.enableSublistIDs = false;
 StageMorph.prototype.enablePenLogging = false;
 SpriteMorph.prototype.useFlatLineEnds = false;
 Process.prototype.enableLiveCoding = false;
 Process.prototype.enableHyperOps = true;
 this.setProjectName('');
 this.projectNotes = '';
 this.createStage();
 this.add(this.stage);
 this.createCorral();
 this.selectSprite(this.stage.children[0]);
 this.fixLayout();
 };
 */
IDE_Morph.prototype.rawOpenProjectString = function (str) {
    this.toggleAppMode(false);
    this.spriteBar.tabBar.tabTo('scripts');
    if (Process.prototype.isCatchingErrors) {
        //try {
        this.openProject(
                this.serializer.load(str, this)
                );
        //} catch (err) {
        //    this.showMessage('Load failed: ' + err);
        //}
    } else {
        this.openProject(
                this.serializer.load(str, this)
                );
    }
    this.stopFastTracking();
    /*
     this.toggleAppMode(false);
     this.spriteBar.tabBar.tabTo('scripts');
     var defs = SpriteMorph.prototype.blocks;
     //    Object.keys(defs).forEach(function (sel) {
     //        if (defs[sel].category === 'node' || defs[sel].category === 'bit' || defs[sel].category === 'file') {
     //            StageMorph.prototype.hiddenPrimitives[sel] = true;
     //        }
     //    });
     //    StageMorph.prototype.hiddenPrimitives = {};
     StageMorph.prototype.codeMappings = {};
     StageMorph.prototype.codeHeaders = {};
     StageMorph.prototype.enableCodeMapping = false;
     StageMorph.prototype.enableInheritance = false;
     StageMorph.prototype.enableSublistIDs = false;
     Process.prototype.enableLiveCoding = false;
     if (Process.prototype.isCatchingErrors) {
     try {
     this.serializer.openProject(
     this.serializer.load(str, this),
     this
     );
     } catch (err) {
     this.showMessage('Load failed: ' + err);
     }
     } else {
     this.serializer.openProject(
     this.serializer.load(str, this),
     this
     );
     }
     this.stopFastTracking();
     */
};


IDE_Morph.prototype.rawOpenCloudDataString = function (str) {
    var model;
    setting = this.isAddingScenes;
    /*
     //    StageMorph.prototype.hiddenPrimitives = {};
     //    var defs = SpriteMorph.prototype.blocks;
     //    Object.keys(defs).forEach(function (sel) {
     //        if (defs[sel].category === 'node' || defs[sel].category === 'bit' || defs[sel].category === 'file') {
     //            StageMorph.prototype.hiddenPrimitives[sel] = true;
     //        }
     //    });
     StageMorph.prototype.hiddenPrimitives = {};
     StageMorph.prototype.codeMappings = {};
     StageMorph.prototype.codeHeaders = {};
     StageMorph.prototype.enableCodeMapping = false;
     StageMorph.prototype.enableInheritance = true;
     StageMorph.prototype.enableSublistIDs = false;
     StageMorph.prototype.enablePenLogging = false;
     Process.prototype.enableLiveCoding = false;
     */
    if (this.isAddingNextScene) {
        this.isAddingScenes = true;
    }
    if (Process.prototype.isCatchingErrors) {
        try {
            model = this.serializer.parse(str);
            this.serializer.loadMediaModel(model.childNamed('media'));
            this.openProject(
                    this.serializer.loadProjectModel(
                            model.childNamed('project'),
                            this,
                            model.attributes.remixID
                            )
                    );
            /*
             this.serializer.openProject(
             this.serializer.loadProjectModel(
             model.childNamed('project'),
             this,
             model.attributes.remixID
             ),
             this
             );*/
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        model = this.serializer.parse(str);
        this.serializer.loadMediaModel(model.childNamed('media'));
        this.openProject(
                this.serializer.loadProjectModel(
                        model.childNamed('project'),
                        this,
                        model.attributes.remixID
                        )
                );
        /*
         this.serializer.openProject(
         this.serializer.loadProjectModel(
         model.childNamed('project'),
         this,
         model.attributes.remixID
         ),
         this
         );
         */
    }
    this.stopFastTracking();
    this.isAddingScenes = setting;
    this.isAddingNextScene = false;
};


ProjectDialogMorph.prototype.init = function (ide, task) {
    // additional properties:
    this.ide = ide;
    this.task = task || 'open'; // String describing what do do (open, save)
    this.source = ide.source;
    this.projectList = []; // [{name: , thumb: , notes:}]

    this.handle = null;
    this.srcBar = null;
    this.nameField = null;
    this.filterField = null;
    this.magnifyingGlass = null;
    this.listField = null;
    this.preview = null;
    this.notesText = null;
    this.notesField = null;
    this.deleteButton = null;
    this.shareButton = null;
    this.unshareButton = null;
    this.publishButton = null;
    this.unpublishButton = null;
    this.recoverButton = null;

    // initialize inherited properties:
    ProjectDialogMorph.uber.init.call(
            this,
            this, // target
            null, // function
            null // environment
            );

    // override inherited properites:
    this.labelString = this.task === 'save' ? 'Save Project' : 'Open Project';
    this.createLabel();
    this.key = 'project' + task;

    // build contents
    if (task === 'open' && this.source === 'disk' && this.source === 'openNodeMCU') {
        // give the user a chance to switch to another source
        this.source = null;
        this.buildContents();
        this.projectList = [];
        this.listField.hide();
        this.source = 'disk';
    } else {
        this.buildContents();
        this.onNextStep = () => // yield to show "updating" message
            this.setSource(this.source);
    }
};

ProjectDialogMorph.prototype.buildContents = function () {
    var thumbnail, notification;

    this.addBody(new Morph());
    this.body.color = this.color;

    this.srcBar = new AlignmentMorph('column', this.padding / 2);

    if (this.ide.cloudMsg) {
        notification = new TextMorph(
                this.ide.cloudMsg,
                10,
                null, // style
                false, // bold
                null, // italic
                null, // alignment
                null, // width
                null, // font name
                new Point(1, 1), // shadow offset
                WHITE // shadowColor
                );
        notification.refresh = nop;
        this.srcBar.add(notification);
    }

    this.addSourceButton('cloud', localize('Cloud'), 'cloud');

    if (this.task === 'open' || this.task === 'add') {
        this.buildFilterField();
        this.addSourceButton('examples', localize('Examples'), 'poster');
        if (this.hasLocalProjects() || this.ide.world().currentKey === 16) {
            // shift- clicked
            this.addSourceButton('local', localize('Browser'), 'globe');
        }
    }
    this.addSourceButton('disk', localize('Computer'), 'storage');

    this.srcBar.fixLayout();
    this.body.add(this.srcBar);

    if (this.task === 'save') {
        this.nameField = new InputFieldMorph(this.ide.getProjectName());
        this.body.add(this.nameField);
    }

    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    this.preview = new Morph();
    this.preview.fixLayout = nop;
    this.preview.edge = InputFieldMorph.prototype.edge;
    this.preview.fontSize = InputFieldMorph.prototype.fontSize;
    this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.preview.contrast = InputFieldMorph.prototype.contrast;
    this.preview.render = function (ctx) {
        InputFieldMorph.prototype.render.call(this, ctx);
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };
    this.preview.renderCachedTexture = function (ctx) {
        ctx.drawImage(this.cachedTexture, this.edge, this.edge);
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    this.preview.setExtent(
            this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
            );

    this.body.add(this.preview);
    if (this.task === 'save') {
        thumbnail = this.ide.stage.thumbnail(
                SnapSerializer.prototype.thumbnailSize
                );
        this.preview.texture = null;
        this.preview.cachedTexture = thumbnail;
        this.preview.rerender();
    }

    this.notesField = new ScrollFrameMorph();
    this.notesField.fixLayout = nop;

    this.notesField.edge = InputFieldMorph.prototype.edge;
    this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
    this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.notesField.contrast = InputFieldMorph.prototype.contrast;
    this.notesField.render = InputFieldMorph.prototype.render;
    this.notesField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.notesField.acceptsDrops = false;
    this.notesField.contents.acceptsDrops = false;

    if (this.task === 'open' || this.task === 'add') {
        this.notesText = new TextMorph('');
    } else { // 'save'
        this.notesText = new TextMorph(this.ide.projectNotes);
        this.notesText.isEditable = true;
        this.notesText.enableSelecting();
    }

    this.notesField.isTextLineWrapping = true;
    this.notesField.padding = 3;
    this.notesField.setContents(this.notesText);
    this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);

    if (this.task === 'open') {
        this.addButton('openProject', 'Open');
        this.action = 'openProject';
        this.recoverButton = this.addButton('recoveryDialog', 'Recover', true);
        this.recoverButton.hide();
    } else if (this.task === 'add') {
        this.addButton('addScene', 'Add');
        this.action = 'addScene';
        this.recoverButton = this.addButton('recoveryDialog', 'Recover', true);
        this.recoverButton.hide();
    } else { // 'save'
        this.addButton('saveProject', 'Save');
        this.action = 'saveProject';
    }
    this.shareButton = this.addButton('shareProject', 'Share', true);
    this.unshareButton = this.addButton('unshareProject', 'Unshare', true);
    this.shareButton.hide();
    this.unshareButton.hide();
    this.publishButton = this.addButton('publishProject', 'Publish', true);
    this.unpublishButton = this.addButton(
            'unpublishProject',
            'Unpublish',
            true
            );
    this.publishButton.hide();
    this.unpublishButton.hide();
    this.deleteButton = this.addButton('deleteProject', 'Delete');
    this.addButton('updateProject', 'Update');
    this.addButton('cancel', 'Cancel');

    if (notification) {
        this.setExtent(new Point(500, 360).add(notification.extent()));
    } else {
        this.setExtent(new Point(500, 360));
    }
    this.fixLayout();

};

var updateMap;

IDE_Morph.prototype.setUpdateMap = function (resource) {
    var myself = this;
    var codes,
            test = [],
            stage = this.stage,
            str = resource;
    str = str.substring(str.indexOf('<code>'), str.indexOf('</code>') + 7);
    if (Process.prototype.isCatchingErrors) {
        try {
            codes = SnapSerializer.prototype.loadCodes(str);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        codes = SnapSerializer.prototype.loadCodes(str);
    }
    codes.forEach(xml => {
        test[xml.tag] = xml.contents;
    });
    updateMap = test;
}

IDE_Morph.prototype.getUpdateMap = function () {
    return updateMap;
}

ProjectDialogMorph.prototype.updateProject = function () {
    var proj = this.listField.selected,
            src;
    if (!proj) {
        return;
    }
    this.ide.source = this.source;
    if (this.source === 'cloud') {
        //this.openCloudProject(proj);
        var myself = this;
        SnapCloud.reconnect(
                function () {
                    SnapCloud.callService(
                            'getRawProject',
                            function (response) {
                                myself.ide.source = 'cloud';
                                //myself.ide.droppedText(response);
                                myself.ide.setUpdateMap(response);
                                if (proj.Public === 'true') {
                                    location.hash = '#present:Username=' +
                                            encodeURIComponent(SnapCloud.username) +
                                            '&ProjectName=' +
                                            encodeURIComponent(proj.ProjectName);
                                }
                            },
                            myself.ide.cloudError(),
                            [proj.ProjectName]
                            );
                },
                myself.ide.cloudError()
                );
        this.destroy();
    } else if (this.source === 'examples') {
        // Note "file" is a property of the parseResourceFile function.
        src = this.ide.getURL(this.ide.resourceURL('Examples', proj.fileName));
        this.ide.setUpdateMap(src);
        //this.ide.openProjectString(src);
        //this.destroy();
    } else { // 'local'
        this.ide.source = null;
        this.ide.openProject(proj.name);
        this.destroy();
    }
}

ProjectDialogMorph.prototype.deleteProject = function () {
    var myself = this,
            proj,
            idx,
            name;

    if (this.source === 'cloud') {
        proj = this.listField.selected;
        if (proj) {
            this.ide.confirm(
                    localize(
                            'Are you sure you want to delete'
                            ) + '\n"' + proj.ProjectName + '"?',
                    'Delete Project',
                    function () {
                        SnapCloud.reconnect(
                                function () {
                                    SnapCloud.callService(
                                            'deleteProject',
                                            function () {
                                                SnapCloud.disconnect();
                                                myself.ide.hasChangedMedia = true;
                                                idx = myself.projectList.indexOf(proj);
                                                myself.projectList.splice(idx, 1);
                                                myself.installCloudProjectList(
                                                        myself.projectList
                                                        ); // refresh list
                                            },
                                            myself.ide.cloudError(),
                                            [proj.ProjectName]
                                            );
                                },
                                myself.ide.cloudError()
                                );
                    }
            );
        }
    } else { // 'local, examples'
        if (this.listField.selected) {
            name = this.listField.selected.name;
            this.ide.confirm(
                    localize(
                            'Are you sure you want to delete'
                            ) + '\n"' + name + '"?',
                    'Delete Project',
                    function () {
                        delete localStorage['-snap-project-' + name];
                        myself.setSource(myself.source); // refresh list
                    }
            );
        }
    }
};

ProjectDialogMorph.prototype.setSource = function (source) {
    var myself = this,
            msg;

    this.source = source;
    this.srcBar.children.forEach(button =>
        button.refresh()
    );

    switch (this.source) {
        case 'cloud':
            msg = this.ide.showMessage('Updating\nproject list...');
            this.projectList = [];
            SnapCloud.getProjectList(
                    response => {
                        // Don't show cloud projects if user has since switched panes.
                        if (myself.source === 'cloud') {
                            myself.installCloudProjectList(response);
                        }
                        msg.destroy();
                    },
                    (err, lbl) => {
                msg.destroy();
                myself.ide.cloudError().call(null, err, lbl);
            }
            );
            return;
        case 'examples':
            this.projectList = this.getExamplesProjectList();
            break;
        case 'local':
            // deprecated, only for reading
            this.projectList = this.getLocalProjectList();
            break;
        case 'disk':
            if (this.task === 'save') {
                this.projectList = [];
            } else {
                this.destroy();
                this.ide.importLocalFile();
                return;
            }
            break;
    }

    this.listField.destroy();
    this.listField = new ListMorph(
            this.projectList,
            this.projectList.length > 0 ?
            (element) => {
        return element.name || element;
    }
    : null,
            null,
            () => this.ok()
    );
    if (this.source === 'disk') {
        this.listField.hide();
    }

    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    if (this.source === 'local') {
        this.listField.action = (item) => {
            var src, xml;
            if (item === undefined) {
                return;
            }
            if (this.nameField) {
                this.nameField.setContents(item.name || '');
            }
            if (this.task === 'open') {
                src = localStorage['-snap-project-' + item.name];
                if (src) {
                    xml = this.ide.serializer.parse(src);
                    this.notesText.text =
                            xml.childNamed('notes').contents || '';
                    this.notesText.rerender();
                    this.notesField.contents.adjustBounds();
                    this.preview.texture =
                            xml.childNamed('thumbnail').contents || null;
                    this.preview.cachedTexture = null;
                    this.preview.rerender();
                }
            }
            this.edit();
        };
    } else { // 'examples'; 'cloud' is initialized elsewhere
        this.listField.action = (item) => {
            var src, xml;
            if (item === undefined) {
                return;
            }
            if (this.nameField) {
                this.nameField.setContents(item.name || '');
            }
            src = this.ide.getURL(
                    this.ide.resourceURL('Examples', item.fileName)
                    );
            xml = this.ide.serializer.parse(src);
            this.notesText.text = xml.childNamed('notes').contents || '';
            this.notesText.rerender();
            this.notesField.contents.adjustBounds();
            this.preview.texture = xml.childNamed('thumbnail').contents || null;
            this.preview.cachedTexture = null;
            this.preview.rerender();
            this.edit();
        };
    }
    this.body.add(this.listField);
    this.shareButton.hide();
    this.unshareButton.hide();

    if (this.task === 'open') {
        this.recoverButton.hide();
    }

    this.publishButton.hide();
    this.unpublishButton.hide();
    if (this.source === 'local') {
        this.deleteButton.show();
    } else { // examples
        this.deleteButton.hide();
    }
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open') {
        this.clearDetails();
    }
};

ProjectDialogMorph.prototype.getExamplesProjectListNodeMCU = function () {
    return this.ide.getMediaList('ExamplesNodeMCU');
};
/*
 ProjectDialogMorph.prototype.openProject = function () {
 var proj = this.listField.selected,
 src;
 if (!proj) {return; }
 this.ide.source = this.source;
 if (this.source === 'cloud') {
 this.openCloudProject(proj);
 } else if (this.source === 'examples') {
 // Note "file" is a property of the parseResourceFile function.
 src = this.ide.getURL(this.ide.resourceURL('Examples', proj.fileName));
 this.ide.openProjectString(src);
 this.destroy();
 } else { // 'local'
 this.ide.source = null;
 this.ide.openProject(proj.name);
 this.destroy();
 }
 };
 */
IDE_Morph.prototype.initializeCloud = function () {
    var myself = this,
            world = this.world();
    new DialogBoxMorph(
            null,
            function (user) {
                var pwh = calcMD5(user.password),
                        str;
                SnapCloud.login(
                        user.username,
                        pwh,
                        function () {
                            if (user.choice) {
                                str = SnapCloud.encodeDict(
                                        {
											sub: SnapCloud.sub,
                                            username: user.username,
                                            password: pwh
                                        }
                                );
                                localStorage['-snap-user'] = str;
                            }
                            myself.source = 'cloud';
                            myself.showMessage('now connected.', 2);

                            myself.mqttclient.subscribe('snap/' + user.username);
                            myself.mqttclient.on("message", function (topic, payload) {
                                console.log(payload.toString());
                                console.log(topic.toString());
                                if (topic.toString() == ("snap/" + user.username)) {
                                    var filename = payload.toString().split(';data=')[0];
                                    var data = payload.toString().split(';data=')[1];
                                    new DialogBoxMorph(
                                            null,
                                            function (proname) {
                                                myself.droppedText(data.toString(), proname);
                                            },
                                            null
                                            ).prompt(
                                            "Overwrite Project",
                                            filename,
                                            myself.world(),
                                            null, // pic
                                            null, // choices
                                            null, // read only
                                            false // numeric
                                            );
                                }
                            });
                        },
                        myself.cloudError()
                        );
            }
    ).withKey('cloudlogin').promptCredentials(
            'Sign in',
            'login',
            null,
            null,
            null,
            null,
            'stay signed in on this computer\nuntil logging out',
            world,
            myself.cloudIcon(),
            myself.cloudMsg
            );
};

IDE_Morph.prototype.logout = function () {
    var myself = this;
    delete localStorage['-snap-user'];
    SnapCloud.logout(
            function () {
                SnapCloud.clear();
                myself.showMessage('disconnected.', 2);
            },
            function () {
                SnapCloud.clear();
                myself.showMessage('disconnected.', 2);
            }
    );
};

IDE_Morph.prototype.createCloudAccount = function () {
    var myself = this,
            world = this.world();
    /*
     // force-logout, commented out for now:
     delete localStorage['-snap-user'];
     SnapCloud.clear();
     */
    new DialogBoxMorph(
            null,
            function (user) {
                SnapCloud.signupTest(
                        user.username,
                        user.password,
                        user.birthdate,
                        user.birthyear,
                        user.email,
						user.subscribe,
                        function (txt, title) {
                            new DialogBoxMorph().inform(
                                    title,
                                    txt +
                                    '.\nThank you for registering\n Please check your E-mail',
                                    world,
                                    myself.cloudIcon(null, new Color(0, 180, 0))
                                    );
                        },
                        myself.cloudError()
                        );
            }
    ).withKey('cloudsignup').promptCredentials2(
            'Sign up',
            'signup',
            'http://snap.berkeley.edu/tos.html',
            'Terms of Service...',
            'http://snap.berkeley.edu/privacy.html',
            'Privacy...',
            'I have read and agree\nto the Terms of Service',
			'Subscribe to our Newsletter',
            world,
            myself.cloudIcon(),
            myself.cloudMsg
            );
};

IDE_Morph.prototype.resetCloudPassword = function () {
    var myself = this,
            world = this.world();
    /*
     // force-logout, commented out for now:
     delete localStorage['-snap-user'];
     SnapCloud.clear();
     */
    new DialogBoxMorph(
            null,
            function (user) {
                SnapCloud.resetPassword(
                        user.username,
                        user.email,
                        function (txt, title) {
                            if (txt === '1') {
                                myself.newPassword(user.username);
//                        this.newPassword();
                            } else {
                                myself.showMessage('User name or email is error', 2);
                            }
//                    this.changePassword();
//                    new DialogBoxMorph().inform(
//                        title,
//                        txt,
//                        world,
//                        myself.cloudIcon(null, new Color(0, 180, 0))
//                    );
                        },
                        myself.cloudError()
                        );
            }
    ).withKey('cloudresetpassword').promptCredentials2(
            'Reset password',
            'resetPassword',
            null,
            null,
            null,
            null,
            null,
			null,
            world,
            myself.cloudIcon(),
            myself.cloudMsg
            );
};

IDE_Morph.prototype.newPassword = function (username) {
    var myself = this,
            world = this.world();
    new DialogBoxMorph(
            null,
            function (user) {
                SnapCloud.newPassword(
                        username,
                        user.password,
                        function (response, url) {
//                    myself.logout();
                            myself.showMessage(response, 2);
                        },
                        myself.cloudError()
                        );
            }
    ).withKey('newpassword').promptCredentials2(
            'New Password',
            'newPassword',
            null,
            null,
            null,
            null,
            null,
			null,
            world,
            myself.cloudIcon(),
            myself.cloudMsg
            );
};

IDE_Morph.prototype.SubscribeNewsletter = function(){
	var myself = this,
        world = this.world();
	var sub = true;	
	if(SnapCloud.sub=="true"){
		sub = false;
	}
	SnapCloud.setSubscription(SnapCloud.username,sub,
	                    function (response) {
                            console.log(response);
							if(response){
								SnapCloud.sub = sub.toString();
								str = SnapCloud.encodeDict({
									sub: SnapCloud.sub,
									username: SnapCloud.username,
									password: SnapCloud.password
									});
								localStorage['-snap-user'] = str;
								if(sub){
									myself.showMessage('Unsubscribe');
								}else{
									myself.showMessage('Subscribe');
								}
							}
                        },
                        myself.cloudError());
	/*
	myself.mqttclient.publish(SnapCloud.username, command);	
    str = SnapCloud.encodeDict({
		sub: SnapCloud.sub,
		username: SnapCloud.username,
		password: SnapCloud.password
		});
	localStorage['-snap-user'] = str;
    */	
}


IDE_Morph.prototype.gotoMySQL = function () {
    var myself = this,
        world = this.world();
    window.open("https://iotapp.ttu.edu.tw/phpmyadmin/");
}

IDE_Morph.prototype.createMySQLUser = function () {
    var myself = this,
        world = this.world();
	const islogin = w3_open();
    if (islogin) {
	new DialogBoxMorph(
            null,
            function (user) {
                var command = '{' +
                    '"command":"createMySQLUser",' +
		            '"user":"' + SnapCloud.username + '",' +
	                '"password":"' + user.password + '"' +
                '}';
                console.log(command);
				myself.mqttclient.publish(SnapCloud.username, command);	
            }
    ).withKey('mysqlpassword').promptCredentials2(
            'Set MySQL Password',
            'MySQLPassword',
            null,
            null,
            null,
            null,
            null,
			null,
            world,
            myself.cloudIcon(),
            myself.cloudMsg
            );
	};
}

IDE_Morph.prototype.changeCloudPassword = function () {
    var myself = this,
            world = this.world();
    new DialogBoxMorph(
            null,
            function (user) {
                SnapCloud.changePassword(
                        user.oldpassword,
                        user.password,
                        function (response, url) {
//                    myself.logout();
                            myself.showMessage('password has been changed.', 2);
							var str;
							str = SnapCloud.encodeDict(
                                {
									sub: SnapCloud.sub,
                                    username: user.username,
                                    password: user.password
                                }
                            );
                            localStorage['-snap-user'] = str;
                        },
                        myself.cloudError()
                        );
            }
    ).withKey('cloudpassword').promptCredentials(
            'Change Password',
            'changePassword',
            null,
            null,
            null,
            null,
            null,
            world,
            myself.cloudIcon(),
            myself.cloudMsg
            );
};

ProjectDialogMorph.prototype.installCloudProjectList = function (pl) {
    var myself = this;
    this.projectList = pl[0] ? pl : [];
//    this.projectList.sort((x, y) =>
//        x.projectname.toLowerCase() < y.projectname.toLowerCase() ? -1 : 1
//    );

    this.listField.destroy();
    this.listField = new ListMorph(
            this.projectList,
            this.projectList.length > 0 ?
            function (element) {
                return element.ProjectName;
            } : null,
            [// format: display shared project names bold
                [
                    'bold',
                    function (proj) {
                        return proj.Public === 'true';
                    }
                ]
            ],
            function () {
                myself.ok();
            }
    );
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    //this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = function (item) {
        if (item === undefined) {
            return;
        }
        if (myself.nameField) {
            myself.nameField.setContents(item.ProjectName || '');
        }
        if (myself.task === 'open' || myself.task === 'openNodeMCU') {
            myself.notesText.text = item.Notes || '';
            myself.notesText.rerender();
            myself.notesField.contents.adjustBounds();
            myself.preview.texture = item.Thumbnail || null;
            myself.preview.cachedTexture = null;
            myself.preview.rerender();
            (new SpeechBubbleMorph(new TextMorph(
                    localize('last changed') + '\n' + item.Updated,
                    null,
                    null,
                    null,
                    null,
                    'center'
                    ))).popUp(
                    myself.world(),
                    myself.preview.rightCenter().add(new Point(2, 0))
                    );
        }
        if (item.Public === 'true') {
            myself.shareButton.hide();
            myself.unshareButton.show();
        } else {
            myself.unshareButton.hide();
            myself.shareButton.show();
        }
        myself.buttons.fixLayout();
        myself.fixLayout();
        myself.edit();
    };

    this.body.add(this.listField);
    //this.shareButton.show();
    this.unshareButton.hide();
    this.deleteButton.show();
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open') {
        this.clearDetails();
    }
};
/*
 ProjectDialogMorph.prototype.saveProject = function () {
 var name = this.nameField.contents().text.text,
 notes = this.notesText.text,
 myself = this;
 
 this.ide.projectNotes = notes || this.ide.projectNotes;
 if (name) {
 if (this.source === 'cloud') {
 if (detect(
 this.projectList,
 function (item) {
 return item.ProjectName === name;
 }
 )) {
 this.ide.confirm(
 localize(
 'Are you sure you want to replace'
 ) + '\n"' + name + '"?',
 'Replace Project',
 function () {
 myself.ide.setProjectName(name);
 myself.replacesaveCloudProject();
 }
 );
 } else {
 this.ide.setProjectName(name);
 myself.saveCloudProject();
 }
 } else { // 'local'
 if (detect(
 this.projectList,
 function (item) {
 return item.name === name;
 }
 )) {
 this.ide.confirm(
 localize(
 'Are you sure you want to replace'
 ) + '\n"' + name + '"?',
 'Replace Project',
 function () {
 myself.ide.setProjectName(name);
 myself.ide.source = 'local';
 myself.ide.saveProject(name);
 myself.destroy();
 }
 );
 } else {
 this.ide.setProjectName(name);
 myself.ide.source = 'local';
 this.ide.saveProject(name);
 this.destroy();
 }
 }
 }
 };
 */
IDE_Morph.prototype.save = function () {
    // temporary hack - only allow exporting projects to disk
    // when running Snap! locally without a web server
    /*
     if (location.protocol === 'file:') {
     if (this.getProjectName()) {
     this.exportProject(this.getProjectName(), false);
     } else {
     this.prompt(
     'Export Project As...',
     name => this.exportProject(name, false),
     null,
     'exportProject'
     );
     }
     return;
     }
     */
    if (this.source === 'examples' || this.source === 'local') {
        // cannot save to examples, deprecated localStorage
        this.source = null;
    }
    if (this.getProjectName()) {
        if (this.source === 'disk') {
            this.exportProject(this.getProjectName());
        } else if (this.source === 'cloud') {
            this.saveProjectToCloud(this.getProjectName());
        } else {
            this.saveProjectsBrowser();
        }
    } else {
        this.saveProjectsBrowser();
    }
};

ProjectDialogMorph.prototype.saveProject = function () {
    var name = this.nameField.contents().text.text,
            notes = this.notesText.text,
            myself = this.ide,
            word = myself.world();
    this.ide.projectNotes = notes || this.ide.projectNotes;
    if (name) {
        var pattern = new RegExp("[/\\?%*:|\"<>&]");
        if (pattern.test(name)) {
            new DialogBoxMorph().inform(
                    'Snap!Cloud',
                    'A file name can not contain any of the following characters:[/\\?%*:|\"<>&]',
                    word,
                    myself.cloudIcon(null, new Color(180, 0, 0))
                    );
        } else {
            if (this.source === 'cloud') {
                if (detect(
                        this.projectList,
                        function (item) {
                            return item.ProjectName === name;
                        }
                )) {
                    this.ide.confirm(
                            localize(
                                    'Are you sure you want to replace'
                                    ) + '\n"' + name + '"?',
                            'Replace Project',
                            () => {
                        this.ide.setProjectName(name);
                        this.replacesaveCloudProject();
                    }
                    );
                } else {
                    this.ide.setProjectName(name);
                    this.saveCloudProject();
                }
            } else if (this.source === 'disk') {
                this.ide.exportProject(name, false);
                this.ide.source = 'disk';
                this.destroy();
            }
        }
    }
};

ProjectDialogMorph.prototype.replacesaveCloudProject = function () {
    var myself = this;
    this.ide.showMessage('Saving project\nto the cloud...');
    SnapCloud.saveProject(
            myself.ide,
            function () {
                myself.ide.source = 'cloud';
                myself.ide.showMessage('saved.', 2);
            },
            this.ide.cloudError(),
            "replacesave"
            );
    this.destroy();
};

ProjectDialogMorph.prototype.saveCloudProject = function () {
    var myself = this;
    this.ide.showMessage('Saving project\nto the cloud...');
    SnapCloud.saveProject(
            myself.ide,
            function () {
                myself.ide.source = 'cloud';
                myself.ide.showMessage('saved.', 2);
            },
            this.ide.cloudError(),
            "save"
            );
    this.destroy();
};

IDE_Morph.prototype.saveProjectToCloud = function (name) {
    var myself = this;
    if (name) {
        this.showMessage('Saving project\nto the cloud...');
        this.setProjectName(name);
        SnapCloud.saveProject(
                this,
                function () {
                    myself.showMessage('saved.', 2);
                },
                this.cloudError(),
                "replacesave"
                );
    }
};

ProjectDialogMorph.prototype.openCloudProject = function (project, delta) {
    this.ide.nextSteps([
        () => this.ide.showMessage('Fetching project\nfrom the cloud...'),
        () => this.rawOpenCloudProject(project, delta)
    ]);
};

ProjectDialogMorph.prototype.rawOpenCloudProject = function (proj, delta) {
    var myself = this;
    SnapCloud.reconnect(
            function () {
                SnapCloud.callService(
                        'getRawProject',
                        function (response) {
                            SnapCloud.disconnect();
                            /*
                             if (myself.world().currentKey === 16) {
                             myself.ide.download(response);
                             return;
                             }
                             */
                            myself.ide.source = 'cloud';
                            myself.ide.droppedText(response);
                            if (proj.Public === 'true') {
                                location.hash = '#present:Username=' +
                                        encodeURIComponent(SnapCloud.username) +
                                        '&ProjectName=' +
                                        encodeURIComponent(proj.ProjectName);
                            }
                        },
                        myself.ide.cloudError(),
                        [proj.ProjectName]
                        );
            },
            myself.ide.cloudError()
            );
    this.destroy();
};


IDE_Morph.prototype.openIn = function (world) {
    var hash, usr, myself = this, urlLanguage = null;

    // get persistent user data, if any
    if (localStorage) {
        usr = localStorage['-snap-user'];
        if (usr) {
            usr = SnapCloud.parseResponse(usr)[0];
            if (usr) {
                SnapCloud.username = usr.username || null;
                SnapCloud.password = usr.password || null;
				SnapCloud.sub = usr.sub || null;
                if (SnapCloud.username) {
                    this.source = 'cloud';
                }
            }
        }
    }

    this.buildPanes();
    world.add(this);
    world.userMenu = this.userMenu;

    // override SnapCloud's user message with Morphic
    SnapCloud.message = function (string) {
        var m = new MenuMorph(null, string),
                intervalHandle;
        m.popUpCenteredInWorld(world);
        intervalHandle = setInterval(function () {
            m.destroy();
            clearInterval(intervalHandle);
        }, 2000);
    };

    // prevent non-DialogBoxMorphs from being dropped
    // onto the World in user-mode
    world.reactToDropOf = (morph) => {
        if (!(morph instanceof DialogBoxMorph ||
                (morph instanceof MenuMorph))) {
            if (world.hand.grabOrigin) {
                morph.slideBackTo(world.hand.grabOrigin);
            } else {
                world.hand.grab(morph);
            }
        }
    };

    this.reactToWorldResize(world.bounds);

    function applyFlags(dict) {
        if (dict.noCloud) {
            myself.cloud.disable();
        }
        if (dict.embedMode) {
            myself.setEmbedMode();
        }
        if (dict.editMode) {
            myself.toggleAppMode(false);
        } else {
            myself.toggleAppMode(true);
        }
        if (!dict.noRun) {
            autoRun();
        }
        if (dict.hideControls) {
            myself.controlBar.hide();
            window.onbeforeunload = nop;
        }
        if (dict.noExitWarning) {
            window.onbeforeunload = nop;
        }
        if (dict.blocksZoom) {
            myself.savingPreferences = false;
            myself.setBlocksScale(Math.max(1, Math.min(dict.blocksZoom, 12)));
            myself.savingPreferences = true;
        }

        // only force my world to get focus if I'm not in embed mode
        // to prevent the iFrame from involuntarily scrolling into view
        if (!myself.isEmbedMode) {
            world.worldCanvas.focus();
        }
    }

    function autoRun() {
        // wait until all costumes and sounds are loaded
        if (isLoadingAssets()) {
            myself.world().animations.push(
                    new Animation(nop, nop, 0, 200, nop, autoRun)
                    );
        } else {
            myself.runScripts();
        }
    }

    function isLoadingAssets() {
        return myself.sprites.asArray().concat([myself.stage]).some(any =>
            (any.costume ? any.costume.loaded !== true : false) ||
                    any.costumes.asArray().some(each => each.loaded !== true) ||
                    any.sounds.asArray().some(each => each.loaded !== true)
        );
    }

    // dynamic notifications from non-source text files
    // has some issues, commented out for now
    /*
     this.cloudMsg = getURL('https://snap.berkeley.edu/cloudmsg.txt');
     motd = getURL('https://snap.berkeley.edu/motd.txt');
     if (motd) {
     this.inform('Snap!', motd);
     }
     */

    function interpretUrlAnchors() {
        var dict, idx;

        if (location.hash.substr(0, 6) === '#open:') {
            hash = location.hash.substr(6);
            if (hash.charAt(0) === '%'
                    || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            if (contains(
                    ['project', 'blocks', 'sprites', 'snapdata'].map(each =>
                hash.substr(0, 8).indexOf(each)
            ),
                    1
                    )) {
                this.droppedText(hash);
            } else {
                idx = hash.indexOf("&");
                if (idx > 0) {
                    dict = myself.cloud.parseDict(hash.substr(idx));
                    dict.editMode = true;
                    hash = hash.slice(0, idx);
                    applyFlags(dict);
                }
                this.shield = new Morph();
                this.shield.alpha = 0;
                this.shield.setExtent(this.parent.extent());
                this.parent.add(this.shield);
                this.showMessage('Fetching project...');

                this.getURL(
                        hash,
                        projectData => {
                            var msg;
                            this.nextSteps([
                                () => msg = this.showMessage('Opening project...'),
                                () => {
                                    if (projectData.indexOf('<snapdata') === 0) {
                                        this.rawOpenCloudDataString(projectData);
                                    } else if (
                                            projectData.indexOf('<project') === 0
                                            ) {
                                        this.rawOpenProjectString(projectData);
                                    }
                                    this.hasChangedMedia = true;
                                },
                                () => {
                                    this.shield.destroy();
                                    this.shield = null;
                                    msg.destroy();
                                    this.toggleAppMode(false);
                                }
                            ]);
                        }
                );
            }
        } else if (location.hash.substr(0, 5) === '#run:') {
            dict = '';
            hash = location.hash.substr(5);

            //decoding if hash is an encoded URI
            if (hash.charAt(0) === '%'
                    || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            idx = hash.indexOf("&");

            // supporting three URL cases

            // xml project
            if (hash.substr(0, 8) === '<project') {
                this.rawOpenProjectString(
                        hash.slice(0, hash.indexOf('</project>') + 10)
                        );
                applyFlags(
                        myself.cloud.parseDict(
                                hash.substr(hash.indexOf('</project>') + 10)
                                )
                        );
                // no project, only flags
            } else if (idx == 0) {
                applyFlags(myself.cloud.parseDict(hash));
                // xml file path
                // three path types allowed:
                //  (1) absolute (http...),
                //  (2) relative to site ("/path") or
                //  (3) relative to folder ("path")
            } else {
                this.shield = new Morph();
                this.shield.alpha = 0;
                this.shield.setExtent(this.parent.extent());
                this.parent.add(this.shield);
                this.showMessage('Fetching project...');
                if (idx > 0) {
                    dict = myself.cloud.parseDict(hash.substr(idx));
                    hash = hash.slice(0, idx);
                }
                this.getURL(
                        hash,
                        projectData => {
                            var msg;
                            this.nextSteps([
                                () => msg = this.showMessage('Opening project...'),
                                () => {
                                    if (projectData.indexOf('<snapdata') === 0) {
                                        this.rawOpenCloudDataString(projectData);
                                    } else if (
                                            projectData.indexOf('<project') === 0
                                            ) {
                                        this.rawOpenProjectString(projectData);
                                    }
                                    this.hasChangedMedia = true;
                                },
                                () => {
                                    this.shield.destroy();
                                    this.shield = null;
                                    msg.destroy();
                                    // this.toggleAppMode(true);
                                    applyFlags(dict);
                                }
                            ]);
                        }
                );
            }
        } else if (location.hash.substr(0, 9) === '#present:') {
            this.shield = new Morph();
            this.shield.color = this.color;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(9));
            dict.Username = dict.Username.toLowerCase();

            myself.cloud.getPublicProject(
                    dict.ProjectName,
                    dict.Username,
                    projectData => {
                        var msg;
                        myself.nextSteps([
                            () => msg = myself.showMessage('Opening project...'),
                            () => {
                                if (projectData.indexOf('<snapdata') === 0) {
                                    myself.rawOpenCloudDataString(projectData);
                                } else if (
                                        projectData.indexOf('<project') === 0
                                        ) {
                                    myself.rawOpenProjectString(projectData);
                                }
                                myself.hasChangedMedia = true;
                            },
                            () => {
                                myself.shield.destroy();
                                myself.shield = null;
                                msg.destroy();
                                applyFlags(dict);
                            }
                        ]);
                    },
                    this.cloudError()
                    );
        } else if (location.hash.substr(0, 7) === '#cloud:') {
            this.shield = new Morph();
            this.shield.alpha = 0;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(7));

            myself.cloud.getPublicProject(
                    dict.ProjectName,
                    dict.Username,
                    projectData => {
                        var msg;
                        myself.nextSteps([
                            () => msg = myself.showMessage('Opening project...'),
                            () => {
                                if (projectData.indexOf('<snapdata') === 0) {
                                    myself.rawOpenCloudDataString(projectData);
                                } else if (
                                        projectData.indexOf('<project') === 0
                                        ) {
                                    myself.rawOpenProjectString(projectData);
                                }
                                myself.hasChangedMedia = true;
                            },
                            () => {
                                myself.shield.destroy();
                                myself.shield = null;
                                msg.destroy();
                                myself.toggleAppMode(false);
                            }
                        ]);
                    },
                    this.cloudError()
                    );
        } else if (location.hash.substr(0, 4) === '#dl:') {
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(4));
            dict.Username = dict.Username.toLowerCase();

            myself.cloud.getPublicProject(
                    dict.ProjectName,
                    dict.Username,
                    projectData => {
                        myself.saveXMLAs(projectData, dict.ProjectName);
                        myself.showMessage(
                                'Saved project\n' + dict.ProjectName,
                                2
                                );
                    },
                    this.cloudError()
                    );
        } else if (location.hash.substr(0, 6) === '#lang:') {
            dict = myself.cloud.parseDict(location.hash.substr(6));
            applyFlags(dict);
        } else if (location.hash.substr(0, 7) === '#signup') {
            this.createCloudAccount();
        }
        this.loadNewProject = false;
    }

    function launcherLangSetting() {
        var langSetting = null;
        if (location.hash.substr(0, 6) === '#lang:') {
            if (location.hash.charAt(8) === '_') {
                langSetting = location.hash.slice(6, 11);
            } else {
                langSetting = location.hash.slice(6, 8);
            }
        }
        // lang-flag wins lang-anchor setting
        langSetting = myself.cloud.parseDict(location.hash).lang || langSetting;
        return langSetting;
    }

    if (launcherLangSetting()) {
        // launch with this non-persisten lang setting
        this.loadNewProject = true;
        this.setLanguage(launcherLangSetting(), interpretUrlAnchors, true);
    } else if (this.userLanguage) {
        this.loadNewProject = true;
        this.setLanguage(this.userLanguage, interpretUrlAnchors);
    } else {
        interpretUrlAnchors.call(this);
    }


    world.keyboardFocus = this.stage;
    this.warnAboutIE();
};

IDE_Morph.prototype.convertCode = function (htmlcode, projectName) {
    //var codeStar ='<project name="ionic" app="Snap! 6, https://snap.berkeley.edu" version="1"><notes>This project features a FizzBuzz script and a recursive factorial block that you can run and debug inside Snap! and also compile into various text-based programming languages:&#xD;&#xD;   * JavaScript&#xD;   * Smalltalk&#xD;   * Python&#xD;   * C&#xD;&#xD;Enjoy!&#xD;-Jens</notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAH3UlEQVR4Xu2dTUwVVxiG38uPQa2JRWNQUbB0QaKLlnRB7MZojYvaoLZUE6nWFGrTtG7cuKhd1K5M3LnqxgUQWwIuDE1MiqZpkAWaVo0Lo9YmgGDBIn+K8jfNmXvnOnPv/B05woHzTmK84X5z5nzP99yZc87MhYRlWRa4kcA8EUhQwHkiz8PaBCggRZhXAoECzszMoKOjA8+fP8f09PScdDInJwcFBQWorKxEfn7+nByTB5lfAr4C9vb2oq+vDytXrpx175Y8+QdXm3/CzJOewLY++vxbPC6qhJBebKOjoygsLMTGjRtnfXw2oDeBLAGFBNevX1ci35o1a3DjWDneW7skksKL4534b2gkHSck3Lx5s31G5LZ4CWQJ2Nraik2bNkllfOTIEZw/f96+XHu2qQkUN1QhNye6uWfH2jEwNOoJFGfinTt3Ru/MiAVLIEvAixcvoqSkxJOQOCPW1tbakj19+tR+febMGZSVlWHPnj0oKipCZ2cnKioqUF5ejrNnzyZnONOTKPl5H3IT0XzGvvkD/w4OewLv3LmD/fv3R+/MiAVLIEvAlpYWlJaWehI6cOAArly5gkQige3bt6OtrQ27du2yx2j19fXYu3cvjh49isOHD9v73b17FyMjI8jDNEp/+SSWgCNf/46+x088x+3p6UFVVdWChcuORxPIErC5uRkbNmzw7Hn69GmsXr0aQ0NDGB4etsW7f/8+qqurce3aNTQ1NaG9vR0nTpzAzZs3bUHHxsawJBd4q6k6loBDX13Gw/5Bz3Fv3bqFurq66CwYsWAJZAl46dIlrFixIiuh9evXY3JyEv39/RCvJyYmMDAwgHXr1tnLNOPj48jLy8Py5cvR3d1t7780PxdlzZ/GEnDwy9/Q/eix57jieNu2bVuwcNnxaAK+yzCNjY0oLi6O3jsiYlXhmyht2B2rnf66y+h+2JuOvXfvnj3W5La4CfgKODU1hXPnzknPhv1QvV1SjDdmxjD1YjyQ5HjBKvzd9VK+Bw8e4NChQ1yCWdzu2dmF3orr6urC7du35+xOiJjkbNmyJWsSZEAdjE2R94KNLb0eiVNAPepgbC8ooLGl1yNxCqhHHYztBQU0tvR6JE4B9aiDsb2ggMaWXo/EKaAedTC2FxTQ2NLrkTgF1KMOxvaCAhpbej0Sp4B61MHYXlBAY0uvR+IUUI86GNsLCmhs6fVInALqUQdje0EBjS29HolTQD3qYGwvKKCxpdcjcQqoRx2M7QUFNLb0eiROAfWog7G9oIDGll6PxCmgHnUwthcU0NjS65E4BdSjDsb2ggIaW3o9EqeAetTB2F5QQGNLr0fiFFCPOhjbCwpobOn1SJwC6lEHY3tBAY0tvR6JU0A96mBsLyigsaXXI3EKqEcdjO0FBTS29HokTgH1qIOxvaCAxpZej8QpoB51MLYXFDCk9Ac/3IHGXy8bK8dcJE4BfSjb4v348k+LHfxuKUV8TTZSQD+wf20F3u2w33FkpISvx0AKGMG1ZvcHaDj1LCkjz4TKLaSAIUjd8jlhlFCtgxQwhKf151YkEoD1zlUIGZ1xISVUJyEFDGDpjP2EfOLPyIqtZvcONJxKTk5qTi5DQ2ubukoY2hIFlCh85uw4U0Jxlqz/4RkSFckJDLdoAhQwhJEQTmyetUAxQ05tlgWPbGlBUzPoaPyMoIChk5DkJdc95gtbI+SSjfwHigJGnAEzJx6ZAordxZnws++XcblG3j9QQB9o9vJLaxssy0LixvveS25yPhK6ZV6ao+JNfp8C+lQ/PQMWY7wYwvkKxHFgrM8VBfTBlHnmi0UyI4hrhfGoUcAATn5jvXhIk1EUMB4tChjGybXkEg+nN4oSRlOjgDGWYaIx+kdQwGhyFDCEkXMvOBpjcAQlDKdHAV/TGNBptubkUjS08qnqIA0pYBCZWY7/PM1ySSbwNEgBQ9YBxVviDCY25ykY8frR2hYAYoHQQlHfx1ktPFp7wf5ZUd8++3/3EzWzuZwvxn0pYICAjnRiIdq+jKYew0oKeAHHvzho7+n+7kjQexwHBn90KGAGG7+noO1ba647IrICJu8VcyzopyEFdFEJetDA/3ZcDoCZgI+2eM9K/XsZwodYs3FRwBSTOGe+VxmDuS/fvBRTwECHfJ/zc303+FXkE/vY0qXa4ZIMBQz0yP19j8wvIcWRLz3Oc01WnDOe3/dL4rRpQgwvwakqO0/AuC+TbillZeDlNh4xChjBSVZCIZ54mNX5Jl28MpgbRQEjau8eG9pynRq3l2TE68yN4sl/kChgBDPngYT0JTV1iy5rnMjbbfL2iftJlhj8cAudnAhCzlcz00/IZPzyIueXGRGlHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHAEKKMeL0YoJUEDFQNmcHIH/AS3OEtU+gNUmAAAAAElFTkSuQmCC</thumbnail><stage name="Stage" width="480" height="360" costume="0" color="255,255,255,1" tempo="60" threadsafe="false" penlog="false" volume="100" pan="0" lines="round" ternary="true" hyperops="true" codify="true" inheritance="true" sublistIDs="false" scheduled="false" id="1"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAOhUlEQVR4Xu3VwQkAAAjEMN1/abewn7jAQRC64wgQIECAAIF3gX1fNEiAAAECBAiMAHsCAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQIHLFxAWmhEwHPAAAAAElFTkSuQmCC</pentrails><costumes><list struct="atomic" id="2"></list></costumes><sounds><list struct="atomic" id="3"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites><sprite name="Alonzo" idx="1" x="-3.0015726185699805" y="-31.00402209995275" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="1" color="80,80,80,1" pen="tip" id="8"><costumes><list id="9"><item><costume name="alonzo" center-x="48" center-y="48" image="data:image/png;base64,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" id="10"/></item></list></costumes><sounds><list struct="atomic" id="11"></list></sounds><blocks></blocks><variables></variables><scripts><script x="35" y="10"><custom-block s="run %cmdRing"><block s="reifyScript"><script>';
    var codeStar = '<sprites app="Snap! 6, https://snap.berkeley.edu" version="1"><sprite name="Alonzo" idx="1" x="73.22195807156754" y="-49.870286718346634" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="1" color="80,80,80,1" pen="tip" id="2"><costumes><list id="3"><item><costume name="html" center-x="128" center-y="128" image="data:image/png;base64,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" id="4"/></item></list></costumes><sounds><list struct="atomic" id="5"></list></sounds><blocks></blocks><variables></variables><scripts><script x="15.763675875000018" y="10"><custom-block s="run %cmdRing"><block s="reifyScript"><script>';
    codeStar = codeStar.replace('<sprite name="Alonzo"', '<sprite name="' + projectName + '"');
    //var codeEnd ='</script><list></list></block></custom-block></script></scripts></sprite><watcher var="script" style="normal" x="5.3660187404602766e-11" y="3.576516860448464e-11" color="243,118,29" hidden="true"/><watcher var="code" style="normal" x="23.086012563196164" y="20.40865065224476" color="243,118,29"/></sprites></stage><hidden> forward turn turnLeft setHeading doFaceTowards gotoXY doGotoObject doGlide changeXPosition setXPosition changeYPosition setYPosition bounceOffEdge xPosition yPosition direction doSwitchToCostume doWearNextCostume getCostumeIdx doThinkFor doThink changeEffect setEffect clearEffects changeScale setScale getScale show hide comeToFront goBack playSound doPlaySoundUntilDone doStopAllSounds doRest doPlayNote doChangeTempo doSetTempo getTempo clear down up setColor changeHue setHue changeBrightness setBrightness changeSize setSize doStamp reportTouchingObject reportTouchingColor reportColorIsTouchingColor colorFiltered reportStackSize reportFrameCount doAsk reportLastAnswer getLastAnswer reportMouseX reportMouseY reportMouseDown reportKeyPressed reportDistanceTo doResetTimer reportTimer getTimer reportAttributeOf reportURL reportIsFastTracking doSetFastTracking reportCONS reportCDR reportListContainsItem doDeleteFromList doInsertInList doReplaceInList reifyScript reifyReporter reifyPredicate reportRound reportMonadic reportRandom reportLetter reportStringSize reportUnicode reportIsA reportIsIdentical reportJoinWords receiveGo receiveKey receiveClick receiveMessage doBroadcast doBroadcastAndWait getLastMessage doWarp doWait doWaitUntil doForever doRepeat doUntil doStopBlock doStop doStopAll fork evaluate doCallCC reportCallCC receiveOnClone createClone removeClone reportPower receiveInteraction receiveCondition doIf doIfElse reportIfElse doReport doStopThis doSend doFor doRun doTellTo reportAskFor newClone doPauseAll reportRelationTo reportAspect reportGet reportObject reportAudio reportVideo doSetVideoTransparency reportGlobalFlag doSetGlobalFlag reportDate doDeclareVariables doDeleteAttr reportMappedCode doMapListCode doMapValueCode doMapCodeOrHeader doPlaySoundAtRate reportGetSoundAttribute reportNewSoundFromSamples doSetInstrument changeVolume setVolume getVolume changePan setPan getPan playFreq stopFreq getPenDown changePenHSVA setPenHSVA getPenAttribute floodFill write reportPenTrailsAsCostume doPasteOn doCutFrom doSayFor bubble reportGetImageAttribute reportNewCostumeStretched reportNewCostume getEffect reportShown goToLayer reportUnicodeAsLetter reportTextSplit</hidden><headers></headers><code><string>&lt;#1&gt;</string><tempvars_delim> </tempvars_delim><delim>,</delim><doTypeSciptIf>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptIf><doTypeSciptIfElse>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;} else {&#xD;    &lt;#3&gt;&#xD;}</doTypeSciptIfElse><doTypeSciptSwitch>switch (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptSwitch><doTypeSciptSwitchCase>case &lt;#1&gt;: {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptSwitchCase><doTypeSciptFor>for (&lt;#1&gt; &lt;#2&gt;; &lt;#3&gt;; &lt;#4&gt;)  {&#xD;    &lt;#5&gt;&#xD;}</doTypeSciptFor><doTypeSciptForIn>for (&lt;#1&gt; &lt;#2&gt; in &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</doTypeSciptForIn><doTypeSciptForOf>for (&lt;#1&gt; &lt;#2&gt; of &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</doTypeSciptForOf><doTypeSciptWhile>while (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptWhile><doTypeSciptDoWhile>do {&#xD;    &lt;#1&gt;&#xD;} while (&lt;#2&gt;)</doTypeSciptDoWhile><doTypeSciptBreak>break &lt;#1&gt;;</doTypeSciptBreak><doTypeSciptContinue>break &lt;#1&gt;;</doTypeSciptContinue><reportSum>(&lt;#1&gt; + &lt;#2&gt;)</reportSum><reportDifference>(&lt;#1&gt; - &lt;#2&gt;)</reportDifference><reportProduct>(&lt;#1&gt; * &lt;#2&gt;)</reportProduct><reportQuotient>(&lt;#1&gt; / &lt;#2&gt;)</reportQuotient><reportModulus>(&lt;#1&gt; % &lt;#2&gt;)</reportModulus><reportLessThan>(&lt;#1&gt; &lt; &lt;#2&gt;)</reportLessThan><reportEquals>(&lt;#1&gt; == &lt;#2&gt;)</reportEquals><reportGreaterThan>(&lt;#1&gt; &gt; &lt;#2&gt;)</reportGreaterThan><reportAnd>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</reportAnd><reportOr>(&lt;#1&gt; || &lt;#2&gt;)</reportOr><reportNot>(!&lt;#1&gt;)</reportNot><reportBoolean>True</reportBoolean><reportUnaryOperator>(&lt;#1&gt;&lt;#2&gt;)</reportUnaryOperator><reportBinayOperator>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</reportBinayOperator><reportTernaryOperator>(&lt;#1&gt;?&lt;#2&gt;:&lt;#3&gt;)</reportTernaryOperator><reportRelationalOperator>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</reportRelationalOperator><reportJFunctionConstant>&lt;#1&gt;</reportJFunctionConstant><reportJSMathFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportJSMathFunction><reportJSDateFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportJSDateFunction><reportTypeSciptNewArray>[&lt;#1&gt;]</reportTypeSciptNewArray><reportTypeSciptNewObject>{&lt;#1&gt;}</reportTypeSciptNewObject><reportTypeSciptKeyValue>&lt;#1&gt;:&lt;#2&gt;</reportTypeSciptKeyValue><reportListWithoutComma>&lt;#1&gt;</reportListWithoutComma><reportStringBuiltInFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportStringBuiltInFunction><reportNumberBuiltInFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportNumberBuiltInFunction><reportArrayBuiltInFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportArrayBuiltInFunction><doTypeSciptImport>import {&lt;#1&gt;} from &lt;#2&gt;;</doTypeSciptImport><doTypeSciptConsoleLog>console.log(`&lt;#1&gt;`);</doTypeSciptConsoleLog><doTypeSciptConsoleFunction>console.&lt;#1&gt;(&lt;#2&gt;);</doTypeSciptConsoleFunction><doTypeSciptLet10>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;;</doTypeSciptLet10><doTypeSciptLet13>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;</doTypeSciptLet13><doTypeSciptLet15>&lt;#1&gt; &lt;#2&gt;</doTypeSciptLet15><reportTypeSciptParameter>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</reportTypeSciptParameter><reportTypeSciptParameter2>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</reportTypeSciptParameter2><reportTypeSciptParameter3>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</reportTypeSciptParameter3><reportTypeSciptParameter4>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</reportTypeSciptParameter4><reportTypeSciptStringVariable2>${&lt;#1&gt;}</reportTypeSciptStringVariable2><reportTypeSciptString>`&lt;#1&gt;`</reportTypeSciptString><reify>&lt;#1&gt;</reify><reportTypeSciptFunction3>&lt;#1&gt; (&lt;#2&gt;) =&gt; {&#xD;  &lt;#3&gt;&#xD;}</reportTypeSciptFunction3><reportTypeSciptFunction4>&lt;#1&gt; function (&lt;#2&gt;) {&#xD;  &lt;#3&gt;&#xD;}</reportTypeSciptFunction4><doTypeSciptFunction2>&lt;#1&gt; function &lt;#2&gt; (&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</doTypeSciptFunction2><reportTypeSciptNewClassObject>new &lt;#1&gt; (&lt;#2&gt;)</reportTypeSciptNewClassObject><doTypeSciptReturn>return &lt;#1&gt;;</doTypeSciptReturn><doTypeSciptExecuteFunction>&lt;#1&gt;(&lt;#2&gt;);</doTypeSciptExecuteFunction><doTypeSciptExecuteFunction2>&lt;#1&gt;(&lt;#2&gt;)</doTypeSciptExecuteFunction2><doTypeSciptClass>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; {&#xD;    &lt;#4&gt;&#xD;}</doTypeSciptClass><doTypeSciptClass2>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt; {&#xD;    &lt;#6&gt;&#xD;}</doTypeSciptClass2><doTypeSciptVariable>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt;</doTypeSciptVariable><doTypeSciptConstructor>constructor (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptConstructor><doTypeSciptClassSuper>super(&lt;#1&gt;);</doTypeSciptClassSuper><doTypeSciptClassMethod>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</doTypeSciptClassMethod><doTypeSciptClassMethod2>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt;;</doTypeSciptClassMethod2><reportObjectProperty>&lt;#1&gt;.&lt;#2&gt;</reportObjectProperty><reportTypeSciptStringGeneric>&lt;#1&gt;&lt;&lt;#2&gt;&gt;</reportTypeSciptStringGeneric><doProperties>&lt;#1&gt;</doProperties><doColor>color=&quot;&lt;#1&gt;&quot;</doColor><doPosition>position=&quot;&lt;#1&gt;&quot;</doPosition><doValue>value=&quot;&lt;#1&gt;&quot;</doValue><doPlaceholder>placeholder=&quot;&lt;#1&gt;&quot;</doPlaceholder><doAutocapitalize>autocapitalize=&quot;&lt;#1&gt;&quot;</doAutocapitalize><doInputmode>inputmode=&quot;&lt;#1&gt;&quot;</doInputmode><doRows>rows=&quot;&lt;#1&gt;&quot;</doRows><doCols>cols=&quot;&lt;#1&gt;&quot;</doCols><doShowCancelButton>showCancelButton=&quot;&lt;#1&gt;&quot;</doShowCancelButton><doCancelButtonText>cancelButtonText=&quot;&lt;#1&gt;&quot;</doCancelButtonText><doType3>type=&quot;&lt;#1&gt;&quot;</doType3><doDisabled>disabled=&quot;&lt;#1&gt;&quot;</doDisabled><doAnimated>animated=&quot;&lt;#1&gt;&quot;</doAnimated><doDebounce>debounce=&quot;&lt;#1&gt;&quot;</doDebounce><doDisplayFormat>displayFormat=&quot;&lt;#1&gt;&quot;</doDisplayFormat><doExpand>expand=&quot;&lt;#1&gt;&quot;</doExpand><doFill>fill=&quot;&lt;#1&gt;&quot;</doFill><doSize>size=&quot;&lt;#1&gt;&quot;</doSize><doMultiple>multiple=&quot;&lt;#1&gt;&quot;</doMultiple><doOkText>okText=&quot;&lt;#1&gt;&quot;</doOkText><doCancelText>cancelText=&quot;&lt;#1&gt;&quot;</doCancelText><doChecked>checked=&quot;&lt;#1&gt;&quot;</doChecked><doName>name=&quot;&lt;#1&gt;&quot;</doName><doAllowEmptySelection>name=&quot;&lt;#1&gt;&quot;</doAllowEmptySelection><doOutline>name=&quot;&lt;#1&gt;&quot;</doOutline><doSlot>slot=&quot;&lt;#1&gt;&quot;</doSlot><doForceOverscroll>forceOverscroll=&quot;&lt;#1&gt;&quot;</doForceOverscroll><doFullscreen>fullscreen=&quot;&lt;#1&gt;&quot;</doFullscreen><doScrollEvents>scrollEvents=&quot;&lt;#1&gt;&quot;</doScrollEvents><doScrollX>scrollX=&quot;&lt;#1&gt;&quot;</doScrollX><doScrollY>scrollY=&quot;&lt;#1&gt;&quot;</doScrollY><doLines>lines=&quot;&lt;#1&gt;&quot;</doLines><doClass>class=&quot;&lt;#1&gt;&quot;</doClass><doColsize>colsize=&quot;&lt;#1&gt;&quot;</doColsize><doSize2>size=&quot;&lt;#1&gt;&quot;</doSize2><doInset>inset=&quot;&lt;#1&gt;&quot;</doInset><doAlt>alt=&quot;&lt;#1&gt;&quot;</doAlt><doVertical>vertical=&quot;&lt;#1&gt;&quot;</doVertical><doHorizontal>horizontal=&quot;&lt;#1&gt;&quot;</doHorizontal><doType2>type=&quot;&lt;#1&gt;&quot;</doType2><doActivated>activated=&quot;&lt;#1&gt;&quot;</doActivated><doSide>side=&quot;&lt;#1&gt;&quot;</doSide><doCardbutton>cardbutton=&quot;&lt;#1&gt;&quot;</doCardbutton><doSide2>side=&quot;&lt;#1&gt;&quot;</doSide2><doMenuId>menuId=&quot;&lt;#1&gt;&quot;</doMenuId><doContentId>contentId=&quot;&lt;#1&gt;&quot;</doContentId><doAutoHide>autoHide=&quot;&lt;#1&gt;&quot;</doAutoHide><doMax>max=&quot;&lt;#1&gt;&quot;</doMax><doMin>min=&quot;&lt;#1&gt;&quot;</doMin><doStep>step=&quot;&lt;#1&gt;&quot;</doStep><doValueNumber>vlue=&quot;&lt;#1&gt;&quot;</doValueNumber><doReversed>reversed=&quot;&lt;#1&gt;&quot;</doReversed><doProgresstype>progresstype=&quot;&lt;#1&gt;&quot;</doProgresstype><doSpinnername>spinnerName=&quot;&lt;#1&gt;&quot;</doSpinnername><doPaused>paused=&quot;&lt;#1&gt;&quot;</doPaused><doScrollable>scrollable=&quot;&lt;#1&gt;&quot;</doScrollable><doSwipeGesture>swipeGesture=&quot;&lt;#1&gt;&quot;</doSwipeGesture><doLayout>layout=&quot;&lt;#1&gt;&quot;</doLayout><doPager>pager=&quot;&lt;#1&gt;&quot;</doPager><doTappable>tappable=&quot;&lt;#1&gt;&quot;</doTappable><doVisible>visible=&quot;&lt;#1&gt;&quot;</doVisible><doStopPropagation>stopPropagation=&quot;&lt;#1&gt;&quot;</doStopPropagation><bubble>&lt;#1&gt;</bubble><doButton>&lt;ion-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-button&gt;</doButton><doGrid>&lt;ion-grid &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-grid&gt;</doGrid><doCol>&lt;ion-col &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</doCol><doCol2>&lt;ion-col size=&quot;&lt;#1&gt;&quot; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-col&gt;</doCol2><doCol3>&lt;ion-col class=&quot;&lt;#1&gt;&quot;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</doCol3><doRow>&lt;ion-row &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</doRow><doRow2>&lt;ion-row class=&quot;&lt;#1&gt;&quot;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</doRow2><doCard>&lt;ion-card &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card&gt;</doCard><doCardHeader>&lt;ion-card-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-header&gt;</doCardHeader><doCardHeaderSubtitle>&lt;ion-card-subtitle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-subtitle&gt;</doCardHeaderSubtitle><doCardHeaderTitle>&lt;ion-card-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-title&gt;</doCardHeaderTitle><doCardContent>&lt;ion-card-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-content&gt;</doCardContent><doCheckBox>&lt;ion-checkbox &lt;#1&gt; [(ngModel)]=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-checkbox&gt;</doCheckBox><doDatetime>&lt;ion-datetime &lt;#1&gt;&gt;&lt;/ion-datetime&gt;</doDatetime><doChip>&lt;ion-chip &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-chip&gt;</doChip><doLabel>&lt;ion-label &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-label&gt;</doLabel><doContent>&lt;ion-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-content&gt;</doContent><doFab>&lt;ion-fab &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab&gt;</doFab><doFabButton>&lt;ion-fab-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-button&gt;</doFabButton><doFabList>&lt;ion-fab-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-list&gt;</doFabList><doIcon>&lt;ion-icon name=&quot;&lt;#1&gt;&quot; &lt;#2&gt;&gt;&lt;/ion-icon&gt;</doIcon><doIcon2>&lt;ion-icon name=&quot;&lt;#1&gt;&quot; &lt;#2&gt;&gt;&lt;/ion-icon&gt;</doIcon2><doInput>&lt;ion-input &lt;#1&gt;&gt;&lt;/ion-input&gt;</doInput><doTextarea>&lt;ion-textarea &lt;#1&gt;&gt;&lt;/ion-textarea&gt;</doTextarea><doList>&lt;ion-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list&gt;</doList><doListHeader>&lt;ion-list-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list-header&gt;</doListHeader><doItem>&lt;ion-item &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-item&gt;</doItem><doAvatar>&lt;ion-avatar &lt;#1&gt;&gt;&#xD;  &lt;img src=&quot;&lt;#2&gt;&quot;/&gt;&#xD;&lt;/ion-avatar&gt;</doAvatar><doThumbnail>&lt;ion-thumbnail &lt;#1&gt;&gt;&#xD;  &lt;img src=&quot;&lt;#2&gt;&quot;/&gt;&#xD;&lt;/ion-thumbnail&gt;</doThumbnail><doImg>&lt;ion-img &lt;#1&gt; src=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-img&gt;</doImg><doMenu>&lt;ion-menu &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu&gt;</doMenu><doMenuButton>&lt;ion-menu-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-button&gt;</doMenuButton><doMenuToggle>&lt;ion-menu-toggle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-toggle&gt;</doMenuToggle><doSplitPane>&lt;ion-split-pane &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-split-pane&gt;</doSplitPane><doNote>&lt;ion-note&gt;&lt;#1&gt;&lt;/ion-note&gt;</doNote><doNote2>&lt;ion-note color=&quot;&lt;#1&gt;&quot;&gt;&lt;#2&gt;&lt;/ion-note&gt;</doNote2><doSpinner>&lt;ion-spinner &lt;#1&gt;&gt;&lt;/ion-spinner&gt;</doSpinner><doRadio> &lt;ion-radio &lt;#1&gt; value=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-radio&gt;</doRadio><doRadioGroup1>&lt;ion-radio-group &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-radio-group&gt;</doRadioGroup1><doRange>&lt;ion-range &lt;#1&gt;&gt;&#xD;&lt;/ion-range&gt;</doRange><doSearchbar>&lt;ion-searchbar &lt;#1&gt;&gt;&lt;/ion-searchbar&gt;</doSearchbar><doSegment>&lt;ion-segment &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment&gt;</doSegment><doSegmentButton>&lt;ion-segment-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment-button&gt;</doSegmentButton><doSelect>&lt;ion-select &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-select&gt;</doSelect><doSelectOption>&lt;ion-select-option &lt;#1&gt;&gt;&lt;#2&gt;&lt;/ion-select-option&gt;</doSelectOption><doText>&lt;ion-text &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-text&gt;</doText><doBackdrop>&lt;ion-backdrop &lt;#1&gt;&gt;&#xD;&lt;/ion-backdrop&gt;</doBackdrop><doProgressBar>&lt;ion-progress-bar &lt;#1&gt;&gt;&lt;/ion-progress-bar&gt;</doProgressBar><doReorderGroup>&lt;ion-reorder-group &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder-group&gt;</doReorderGroup><doReorder1>&lt;ion-reorder &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder&gt;</doReorder1><doReorder2>&lt;ion-reorder&gt;&#xD;  &lt;ion-item&gt;&#xD;    &lt;ion-label&gt;&#xD;      &lt;#1&gt;&#xD;    &lt;/ion-label&gt;&#xD;  &lt;/ion-item&gt;&#xD;&lt;/ion-reorder&gt;</doReorder2><doSlides>&lt;ion-slides &lt;#1&gt; [options]=&quot;&lt;#2&gt;&quot;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-slides&gt;</doSlides><doSlide>&lt;ion-slide &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-slide&gt;</doSlide><doTabs>&lt;ion-tabs &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tabs&gt;</doTabs><doTabButton>&lt;ion-tab-button tab=&quot;&lt;#1&gt;&quot;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tab-button&gt;</doTabButton><doToggle>&lt;ion-toggle &lt;#1&gt; [(ngModel)]=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-toggle&gt;</doToggle><doToolbar>&lt;ion-toolbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-toolbar&gt;</doToolbar><doHeader>&lt;ion-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-header&gt;</doHeader><doFooter>&lt;ion-footer &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-footer&gt;</doFooter><doTitle>&lt;ion-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-title&gt;</doTitle><doButtons>&lt;ion-buttons &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-buttons&gt;</doButtons><doNavbar>&lt;ion-navbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-navbar&gt;</doNavbar><doBadge>&lt;ion-badge &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-badge&gt;</doBadge><reportNewList>&lt;#1&gt;</reportNewList><doDiv>&lt;div &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/div&gt;</doDiv><doHtmlTag>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlTag><doHtmlText>&lt;#1&gt;</doHtmlText><doHtmlH>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlH><doHtmlBlockquote>&lt;blockquote &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/blockquote&gt;</doHtmlBlockquote><doHtmlIns>&lt;ins &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ins&gt;</doHtmlIns><doHtmlP>&lt;p &lt;#1&gt;&gt;&#xD;   &lt;#2&gt;&#xD;&lt;/p&gt;</doHtmlP><doHtmlDataList>&lt;datalist &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/datalist&gt;</doHtmlDataList><doHtmlHeadTitle>&lt;title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/title&gt;</doHtmlHeadTitle><doHtmlEmptyTag>&lt;&lt;#1&gt;&gt;</doHtmlEmptyTag><reportHtmlEmptyTag>&lt;&lt;#1&gt;&gt;</reportHtmlEmptyTag><doHtmlHr>&lt;hr&gt;</doHtmlHr><doHtmlBr>&lt;br&gt;</doHtmlBr><doHtmlOption>&lt;option &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/option&gt;</doHtmlOption><reportHtmlJoin>&lt;#1&gt;</reportHtmlJoin><doHtmlHeadProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlHeadProperties><doHtmlSourceProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlSourceProperties><doHtmlFramProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlFramProperties><doHtmlTarget>&lt;#1&gt;</doHtmlTarget><doHtmlRel2>&lt;#1&gt;</doHtmlRel2><doHtmlSandbox>&lt;#1&gt;</doHtmlSandbox><doHtmlPreload>&lt;#1&gt;</doHtmlPreload><doHtmlAutoplay>&lt;#1&gt;</doHtmlAutoplay><doHtmlMuted>&lt;#1&gt;</doHtmlMuted><doHtmlControls>&lt;#1&gt;</doHtmlControls><doHtmlMethod>&lt;#1&gt;</doHtmlMethod><doHtmlAutocomplete>&lt;#1&gt;</doHtmlAutocomplete><doHtmlFormProperties1>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</doHtmlFormProperties1><doHtmlHeadProperties1>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</doHtmlHeadProperties1><doHtmlLang>lang =&quot;&lt;#1&gt;&quot;</doHtmlLang><doHtmlTable1Properties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlTable1Properties><reportHtmlMediaProperties>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</reportHtmlMediaProperties><doHtmlFormProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlFormProperties><doHtmlSvgProperties>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</doHtmlSvgProperties><reportHtmlTextProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</reportHtmlTextProperties><reportSimpleProperty>&lt;#1&gt;</reportSimpleProperty><doHtmlList1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlList1><doHtmlList>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtmlList><doHtmlSvg2>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlSvg2><doHtmlSvg>&lt;&lt;#1&gt; &lt;#2&gt; /&gt;</doHtmlSvg><doHtmlText1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlText1><doHtmlText2>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtmlText2><doMedia1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doMedia1><doMedia2>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;/&lt;#1&gt;&gt;</doMedia2><doHtmlTable1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlTable1><doHtmlTable>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtmlTable><doHtml>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#2&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</doHtml><doHtml2>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;=&quot;&lt;#2&gt;&quot;&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#4&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</doHtml2><doHtmlHeadTitle2>&lt;title&gt; &lt;#1&gt; &lt;/title&gt;</doHtmlHeadTitle2><doHtmlHeadBasic>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlHeadBasic><doHtmlHeadBasic4>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</doHtmlHeadBasic4><doHtml5Basic>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtml5Basic><doHtmlForm>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlForm><doHtmlForm1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</doHtmlForm1><doHtmlFrame>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</doHtmlFrame><doCSSBase>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</doCSSBase><doCSSBaseComma>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</doCSSBaseComma><doCSSTagSelector>&lt;#1&gt;</doCSSTagSelector><doSelectorId>#&lt;#1&gt;</doSelectorId><doSelectorClass>.&lt;#1&gt;</doSelectorClass><doSelectorTagClass>&lt;#1&gt;.&lt;#2&gt;</doSelectorTagClass><reportColorRgba>rgba(&lt;#1&gt;,&lt;#2&gt;,&lt;#3&gt;,&lt;#4&gt;)</reportColorRgba><reportBackgroundValue>&lt;#1&gt;</reportBackgroundValue><reportBorderValue>&lt;#1&gt;</reportBorderValue><doSelectorElement>&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;</doSelectorElement><doSelectorElement2>&lt;#1&gt;&lt;#2&gt;(&lt;#3&gt;)</doSelectorElement2><doCSSSelectorOperator>&lt;#1&gt;</doCSSSelectorOperator><doCSSSelectorFunction>&lt;#1&gt;(&lt;#2&gt;)</doCSSSelectorFunction><doCSSProperty>&lt;#1&gt;:&lt;#2&gt;;</doCSSProperty><doCSSBorder>&lt;#1&gt;:&lt;#2&gt;;</doCSSBorder><doCSSBackground>&lt;#1&gt;:&lt;#2&gt;;</doCSSBackground><doCSSMarginPadding>&lt;#1&gt;:&lt;#2&gt;;</doCSSMarginPadding><doCSSText>&lt;#1&gt;:&lt;#2&gt;;</doCSSText><doIonicReorder>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicReorder><doIonicContainer>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicContainer><doIonicCard>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicCard><doIonicChip>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicChip><doIonicFloatingActionButton>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicFloatingActionButton><doIonicGrid>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicGrid><doIonicInfiniteScroll>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicInfiniteScroll><doIonicList>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicList><doIonicMedia>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicMedia><doIonicMenu>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicMenu><doIonicRouter>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicRouter><doIonicSegmentButton>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicSegmentButton><doIonicSelect>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicSelect><doIonicToolbar>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicToolbar><doIonicControl>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</doIonicControl><reportIonicIconPropertyValue>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</reportIonicIconPropertyValue><reportIonicButtonPropertyValue>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</reportIonicButtonPropertyValue><doIonicItem>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicItem><errorObsolete>position=&quot;&lt;#1&gt;&quot;</errorObsolete><reportColor>color=&quot;&lt;#1&gt;&quot;</reportColor><reportPosition>position=&quot;&lt;#1&gt;&quot;</reportPosition><reportTypeSciptFunctionType>(&lt;#1&gt;) =&gt; &lt;#2&gt;</reportTypeSciptFunctionType><reportTypeSciptMultiVariables>...&lt;#1&gt;</reportTypeSciptMultiVariables><doHtml5Basic2>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtml5Basic2><reportStringInterpolation>{{&lt;#1&gt;}}</reportStringInterpolation><reportPropertyBinding>[&lt;#1&gt;]</reportPropertyBinding><reportEventBinding>(&lt;#1&gt;)</reportEventBinding><reportTwoWayBinding>[(&lt;#1&gt;)]</reportTwoWayBinding><reportAngularControlCommand>&lt;#1&gt;=&quot;&lt;#2&gt;&quot;</reportAngularControlCommand><reportAngularComponentKeyValue>&lt;#1&gt;:&quot;&lt;#2&gt;&quot;</reportAngularComponentKeyValue><doAngularComponent>@&lt;#1&gt;({&lt;#2&gt;)}</doAngularComponent><doIonicTabs>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicTabs><doIonicControl2>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</doIonicControl2></code><blocks><block-definition s="while %&apos;test&apos; %&apos;action&apos;" type="command" category="control"><header></header><code>while &lt;#1&gt;:&#xD;    &lt;#2&gt;&#xD;</code><translations></translations><inputs><input type="%boolUE"></input><input type="%cs"></input></inputs><script><block s="doIf"><block s="evaluate"><block var="test"/><list></list></block><script><block s="doRun"><block var="action"/><list></list></block><custom-block s="while %boolUE %cs"><block s="evaluate"><block var="test"/><list></list></block><block var="action"/></custom-block></script></block></script></block-definition><block-definition s="new List" type="reporter" category="lists"><header></header><code>[]</code><translations></translations><inputs></inputs><script><block s="doReport"><block s="reportNewList"><list></list></block></block></script></block-definition><block-definition s="main %&apos;script&apos;" type="command" category="control"><header></header><code>&lt;#1&gt;</code><translations></translations><inputs><input type="%cs"></input></inputs><script><block s="doRun"><block var="script"/><list></list></block></script></block-definition><block-definition s="for %&apos;i&apos; = %&apos;start&apos; to %&apos;end&apos; %&apos;action&apos;" type="command" category="control"><header></header><code>for &lt;#1&gt; in range(&lt;#2&gt;, &lt;#3&gt;):&#xD;    &lt;#4&gt;</code><translations></translations><inputs><input type="%upvar"></input><input type="%n">1</input><input type="%n">5</input><input type="%cs"></input></inputs><script><block s="doSetVar"><l>i</l><block var="start"/></block><custom-block s="while %boolUE %cs"><block s="reportLessThan"><block var="i"/><block s="reportSum"><block var="end"/><l>1</l></block></block><script><block s="doRun"><block var="action"/><list></list></block><block s="doChangeVar"><l>i</l><l>1</l></block></script></custom-block></script></block-definition><block-definition s="map to JavaScript" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>&apos;&lt;#1&gt;&apos;</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l>,</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>console.log(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>console.log(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;} else {&#xD;    &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>while (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>for (var &lt;#1&gt; = &lt;#2&gt;; &lt;#1&gt; &lt;= &lt;#3&gt;; &lt;#1&gt; += 1) {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; === &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; || &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>true</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>false</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>false</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringSize"><l>world</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.length)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><script></script><list></list></block><l><option>code</option></l><l>(typeof &lt;#1&gt; === &apos;number&apos;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.toString())</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>function fact(n) {&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fact(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>function fib(n) {&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fib(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = &lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; += 1;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doShowVar"><l></l></block></script><list></list></block><l><option>code</option></l><l>console.log(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHideVar"><l></l></block></script><list></list></block><l><option>code</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>var &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><custom-block s="new List"></custom-block></autolambda><list></list></block><l><option>code</option></l><l>[]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListAttribute"><l><option>length</option></l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.length)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListItem"><l>1</l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#2&gt;[&lt;#1&gt; - 1]</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAddToList"><l>thing</l><l/></block></script><list></list></block><l><option>code</option></l><l>&lt;#2&gt;.push(&lt;#1&gt;);</l></block></script></block-definition><block-definition s="map to Smalltalk" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>&apos;&lt;#1&gt;&apos;</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l></l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>Transcript&#xD;    show: &lt;#1&gt;;&#xD;    cr.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>Transcript&#xD;    show: &lt;#1&gt;;&#xD;    cr.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ifTrue: [&#xD;    &lt;#2&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&#xD;    ifTrue: [&#xD;        &lt;#2&gt;]&#xD;    ifFalse: [&#xD;        &lt;#3&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;] whileTrue: [&#xD;    &lt;#2&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>(&lt;#2&gt; to: &lt;#3&gt;) do: [:&lt;#1&gt; |&#xD;    &lt;#4&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;  &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; = &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; and: [&lt;#2&gt;])</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; or: [&lt;#2&gt;])</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; not)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>true</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>false</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>false</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;, &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringSize"><l>world</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; size)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; isNumber)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; printString)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>| fact |&#xD;fact := [:n| &lt;body&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(fact value: &lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>| fib |&#xD;fib := [:n | &lt;body&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(fib value: &lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; := &lt;#2&gt;.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; := &lt;#1&gt; + 1.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doShowVar"><l></l></block></script><list></list></block><l><option>code</option></l><l>Transcript&#xD;    show: &lt;#1&gt;;&#xD;    cr.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHideVar"><l></l></block></script><list></list></block><l><option>code</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>| &lt;#1&gt; |</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>#(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><custom-block s="new List"></custom-block></autolambda><list></list></block><l><option>code</option></l><l>(OrderedCollection new)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListAttribute"><l><option>length</option></l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; size)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListItem"><l>1</l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#2&gt; at: &lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAddToList"><l>thing</l><l/></block></script><list></list></block><l><option>code</option></l><l>&lt;#2&gt; add: &lt;#1&gt;.</l></block></script></block-definition><block-definition s="map to Python" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>"&lt;#1&gt;"</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l>,</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>print &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>print &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;:&#xD;    &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;:&#xD;    &lt;#2&gt;&#xD;else: &#xD;    &lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>while &lt;#1&gt;:&#xD;    &lt;#2&gt;&#xD;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>for &lt;#1&gt; in range(&lt;#2&gt;, &lt;#3&gt;):&#xD;    &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; == &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; | &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>True</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>false</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>False</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringSize"><l>world</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.length)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><script></script><list></list></block><l><option>code</option></l><l>isinstance(&lt;#1&gt;, (int, long, float, complex))</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>str(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>def fact(n):&#xD;    &lt;body&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fact(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>def fib(n):&#xD;    &lt;body&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fib(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; += 1</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doShowVar"><l></l></block></script><list></list></block><l><option>code</option></l><l>print &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHideVar"><l></l></block></script><list></list></block><l><option>code</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>#variables &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><custom-block s="new List"></custom-block></autolambda><list></list></block><l><option>code</option></l><l>[]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListAttribute"><l><option>length</option></l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>len(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListItem"><l>1</l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#2&gt;[&lt;#1&gt; - 1]</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAddToList"><l>thing</l><l/></block></script><list></list></block><l><option>code</option></l><l>&lt;#2&gt;.append(&lt;#1&gt;)</l></block></script></block-definition><block-definition s="map to C" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>"&lt;#1&gt;"</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l>,</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>printf(&lt;#1&gt;);&#xD;printf("&#xD;");</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>printf(&lt;#1&gt;);&#xD;printf("&#xD;");</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>#include &lt;stdio.h&gt;&#xD;int main()&#xD;{&#xD;    &lt;#1&gt;&#xD;    return(0);&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;&#xD;{&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;&#xD;{&#xD;    &lt;#2&gt;&#xD;}&#xD;else &#xD;{&#xD;    &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>while &lt;#1&gt;&#xD;{&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>int &lt;#1&gt;; for (&lt;#1&gt; = &lt;#2&gt;; &lt;#1&gt; &lt;= &lt;#3&gt;; &lt;#1&gt;++)&#xD;{&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; == &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; || &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>"%d", &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>int fact(int n)&#xD;{&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fact(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>int fib(int n)&#xD;{&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fib(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = &lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;++;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>int &lt;#1&gt;;</l></block></script></block-definition><block-definition s="run %&apos;function&apos;" type="command" category="other"><header></header><code></code><translations></translations><inputs><input type="%cmdRing"></input></inputs><script><block s="doSetVar"><l>script</l><block var="function"/></block><custom-block s="MapTo Ionic"></custom-block><block s="doHideVar"><l>script</l></block><block s="doShowVar"><l>code</l></block><block s="doSetVar"><l>code</l><block s="reportMappedCode"><block var="script"/></block></block></script></block-definition><block-definition s="MapTo Ionic" type="command" category="variables"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>&lt;#1&gt;</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l> </l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicContainer"><l><option>ion-content</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicCard"><l><option>ion-card</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicChip"><l><option>ion-chip</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicFloatingActionButton"><l><option>ion-fab</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicGrid"><l><option>ion-grid</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicChip"><l><option>ion-chip</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicInfiniteScroll"><l><option>ion-infinite-scroll</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicItem"><l><option>ion-item</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicList"><l><option>ion-list</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicMedia"><l><option>ion-avatar</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicMenu"><l><option>ion-menu</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicReorder"><l><option>ion-reorder</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicRouter"><l><option>ion-router</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicSegmentButton"><l><option>ion-router-outlet</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicSelect"><l><option>ion-select</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicTabs"><l><option>ion-tabs</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicToolbar"><l><option>ion-toolbar</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicControl"><l><option>ion-label</option></l><list></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicControl2"><l><option>ion-icon</option></l><list></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportIonicIconPropertyValue"><l>name</l><l>heart</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportIonicButtonPropertyValue"><l>name</l><l>heart</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;} else {&#xD;    &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptSwitch"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>switch (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptSwitchCase"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>case &lt;#1&gt;: {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptFor"><l><option>let</option></l><l>i=1</l><l>i&lt;4</l><l>i++</l><script></script></block></script><list></list></block><l><option>code</option></l><l>for (&lt;#1&gt; &lt;#2&gt;; &lt;#3&gt;; &lt;#4&gt;)  {&#xD;    &lt;#5&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptForIn"><l><option>let</option></l><l>item</l><l>items</l><script></script></block></script><list></list></block><l><option>code</option></l><l>for (&lt;#1&gt; &lt;#2&gt; in &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptForOf"><l><option>let</option></l><l>item</l><l>items</l><script></script></block></script><list></list></block><l><option>code</option></l><l>for (&lt;#1&gt; &lt;#2&gt; of &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptWhile"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>while (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptDoWhile"><script></script><l/></block></script><list></list></block><l><option>code</option></l><l>do {&#xD;    &lt;#1&gt;&#xD;} while (&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptBreak"><list></list></block></script><list></list></block><l><option>code</option></l><l>break &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptContinue"><list></list></block></script><list></list></block><l><option>code</option></l><l>break &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; == &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; || &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>True</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportUnaryOperator"><l>&#126;</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportBinayOperator"><l></l><l><option>+</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTernaryOperator"><l>cond</l><l>trueS</l><l>falseS</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;?&lt;#2&gt;:&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportRelationalOperator"><l></l><l>==</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportJFunctionConstant"><l>Math.PI</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportJSMathFunction"><l>math</l><l>abs</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportJSDateFunction"><l>Date</l><l><option>getDate</option></l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptNewArray"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptNewObject"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>{&lt;#1&gt;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptKeyValue"><l>key</l><l>value</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListWithoutComma"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringBuiltInFunction"><l>string</l><l>charAt</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNumberBuiltInFunction"><l>number</l><l>toString</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportArrayBuiltInFunction"><l>array</l><l>concat</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptImport"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>import {&lt;#1&gt;} from &lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptConsoleLog"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>console.log(`&lt;#1&gt;`);</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptStringVariable2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>${&lt;#1&gt;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptConsoleFunction"><l>log</l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>console.&lt;#1&gt;(&lt;#2&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptString"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>`&lt;#1&gt;`</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptLet10"><l><option>let</option></l><l>var</l><l>string</l><l><option>=</option></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptLet13"><l></l><l>var</l><l><option>=</option></l><l>expr</l><l><option>;</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptLet15"><l>expr</l><l><option>;</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter"><l></l><l>var</l><l>: string</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter2"><l></l><l>var</l><l>string</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter3"><l></l><l>var</l><l>string</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter4"><l></l><l>var</l><l>string</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptFunctionType"><list></list><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;) =&gt; &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reifyScript"><script></script><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptFunction3"><l></l><list></list><script></script></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; (&lt;#2&gt;) =&gt; {&#xD;  &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptFunction4"><l></l><list></list><script></script></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; function (&lt;#2&gt;) {&#xD;  &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptFunction2"><l></l><l>func</l><list><l></l></list><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; function &lt;#2&gt; (&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptMultiVariables"><l>var</l></block></autolambda><list></list></block><l><option>code</option></l><l>...&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptNewClassObject"><l></l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>new &lt;#1&gt; (&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptReturn"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptExecuteFunction"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;(&lt;#2&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doTypeSciptExecuteFunction2"><l></l><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;(&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClass"><l></l><l><option>class</option></l><l>CName</l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClass2"><l></l><l><option>class</option></l><l>CName</l><l><option>extends</option></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt; {&#xD;    &lt;#6&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptVariable"><l></l><l>var</l><l>string</l><l><option>;</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptConstructor"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>constructor (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClassSuper"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>super(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClassMethod"><l></l><l>method</l><list><l></l></list><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClassMethod2"><l></l><l>method</l><list><l></l></list><l>void</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportObjectProperty"><l>this</l><l>property</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptStringGeneric"><l>Array</l><l>string</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&lt;&lt;#2&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doProperties"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doValue"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>value="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportColor"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>color="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportPosition"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>position="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doPlaceholder"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>placeholder="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAutocapitalize"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>autocapitalize="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doInputmode"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>inputmode="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doRows"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>rows="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCols"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cols="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doShowCancelButton"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>showCancelButton="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCancelButtonText"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cancelButtonText="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doType3"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>type="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doDisabled"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>disabled="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAnimated"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>animated="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doDebounce"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>debounce="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doDisplayFormat"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>displayFormat="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doExpand"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>expand="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doFill"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>fill="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSize"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>size="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMultiple"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>multiple="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doOkText"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>okText="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCancelText"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cancelText="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doChecked"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>checked="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doName"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>name="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAllowEmptySelection"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>name="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doOutline"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>name="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSlot"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>slot="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doForceOverscroll"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>forceOverscroll="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doFullscreen"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>fullscreen="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollEvents"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollEvents="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollX"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollX="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollY"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollY="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doLines"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>lines="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doClass"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>class="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doColsize"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>colsize="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSize2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>size="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doInset"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>inset="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAlt"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>alt="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doVertical"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>vertical="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHorizontal"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>horizontal="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doType2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>type="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doActivated"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>activated="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSide"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>side="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCardbutton"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cardbutton="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSide2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>side="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMenuId"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>menuId="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doContentId"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>contentId="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doType2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>type="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAutoHide"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>autoHide="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMax"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>max="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMin"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>min="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doStep"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>step="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doValueNumber"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>vlue="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doReversed"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>reversed="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doProgresstype"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>progresstype="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSpinnername"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>spinnerName="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doPaused"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>paused="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollable"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollable="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSwipeGesture"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>swipeGesture="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doLayout"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>layout="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doPager"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>pager="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doTappable"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>tappable="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doVisible"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>visible="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doStopPropagation"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>stopPropagation="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doButton"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doGrid"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-grid &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-grid&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCol"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-col &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCol2"><l></l><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-col size="&lt;#1&gt;" &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-col&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCol3"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-col class="&lt;#1&gt;"&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRow"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-row &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRow2"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-row class="&lt;#1&gt;"&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCard"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardHeader"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-header&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardHeaderSubtitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-subtitle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-subtitle&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardHeaderTitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardContent"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-content&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCheckBox"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-checkbox &lt;#1&gt; [(ngModel)]="&lt;#2&gt;"&gt;&lt;/ion-checkbox&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDatetime"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-datetime &lt;#1&gt;&gt;&lt;/ion-datetime&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChip"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-chip &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-chip&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doLabel"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-label &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-label&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doContent"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-content&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFab"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-fab &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFabButton"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-fab-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFabList"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-fab-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-list&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIcon"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-icon name="&lt;#1&gt;" &lt;#2&gt;&gt;&lt;/ion-icon&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doIcon2"><l></l><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;ion-icon name="&lt;#1&gt;" &lt;#2&gt;&gt;&lt;/ion-icon&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doInput"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-input &lt;#1&gt;&gt;&lt;/ion-input&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTextarea"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-textarea &lt;#1&gt;&gt;&lt;/ion-textarea&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doList"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doListHeader"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-list-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list-header&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doItem"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-item &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-item&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAvatar"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-avatar &lt;#1&gt;&gt;&#xD;  &lt;img src="&lt;#2&gt;"/&gt;&#xD;&lt;/ion-avatar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doThumbnail"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-thumbnail &lt;#1&gt;&gt;&#xD;  &lt;img src="&lt;#2&gt;"/&gt;&#xD;&lt;/ion-thumbnail&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doImg"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-img &lt;#1&gt; src="&lt;#2&gt;"&gt;&lt;/ion-img&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMenu"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-menu &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMenuButton"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-menu-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMenuToggle"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-menu-toggle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-toggle&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSplitPane"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-split-pane &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-split-pane&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doNote"><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-note&gt;&lt;#1&gt;&lt;/ion-note&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doNote2"><l></l><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-note color="&lt;#1&gt;"&gt;&lt;#2&gt;&lt;/ion-note&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSpinner"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-spinner &lt;#1&gt;&gt;&lt;/ion-spinner&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRadio"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l> &lt;ion-radio &lt;#1&gt; value="&lt;#2&gt;"&gt;&lt;/ion-radio&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRadioGroup1"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-radio-group &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-radio-group&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRange"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-range &lt;#1&gt;&gt;&#xD;&lt;/ion-range&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSearchbar"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-searchbar &lt;#1&gt;&gt;&lt;/ion-searchbar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSegment"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-segment &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSegmentButton"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-segment-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSelect"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-select &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-select&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSelectOption"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-select-option &lt;#1&gt;&gt;&lt;#2&gt;&lt;/ion-select-option&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doText"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-text &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-text&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doBackdrop"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-backdrop &lt;#1&gt;&gt;&#xD;&lt;/ion-backdrop&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doProgressBar"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-progress-bar &lt;#1&gt;&gt;&lt;/ion-progress-bar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReorderGroup"><list><l>false</l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-reorder-group &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder-group&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReorder1"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-reorder &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReorder2"><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-reorder&gt;&#xD;  &lt;ion-item&gt;&#xD;    &lt;ion-label&gt;&#xD;      &lt;#1&gt;&#xD;    &lt;/ion-label&gt;&#xD;  &lt;/ion-item&gt;&#xD;&lt;/ion-reorder&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSlides"><list><l></l></list><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-slides &lt;#1&gt; [options]="&lt;#2&gt;"&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-slides&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSlide"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-slide &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-slide&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTabs"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-tabs &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tabs&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTabButton"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-tab-button tab="&lt;#1&gt;"&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tab-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doToggle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-toggle &lt;#1&gt; [(ngModel)]="&lt;#2&gt;"&gt;&lt;/ion-toggle&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doToolbar"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-toolbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-toolbar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHeader"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-header&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFooter"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-footer &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-footer&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doButtons"><l></l><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-buttons &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-buttons&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doNavbar"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-navbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-navbar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doBadge"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-badge &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-badge&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDiv"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;div &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/div&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlTag"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlText"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlH"><l><option>h1</option></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlBlockquote"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;blockquote &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/blockquote&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlIns"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ins &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ins&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlP"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;p &lt;#1&gt;&gt;&#xD;   &lt;#2&gt;&#xD;&lt;/p&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlDataList"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;datalist &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/datalist&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadTitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlEmptyTag"><l><option>hr</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlEmptyTag"><l><option>br</option></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHr"></block></script><list></list></block><l><option>code</option></l><l>&lt;hr&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlBr"></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;br&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlOption"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;option &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/option&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlJoin"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlHeadProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlSourceProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlFramProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlTarget"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlRel2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlSandbox"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlPreload"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlAutoplay"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlMuted"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlControls"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlMethod"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlAutocomplete"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlFormProperties1"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlHeadProperties1"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlLang"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>lang ="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlTable1Properties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlMediaProperties"><l><option>src</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlFormProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlSvgProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlTextProperties"><l>href</l><l>http://iot.ttu.edu.tw</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSimpleProperty"><l>novalidate</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlList1"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlList"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlSvg2"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlSvg"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt; /&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlText1"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlText2"><l></l><list><l></l></list><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMedia1"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMedia2"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlTable1"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlTable"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml"><list><l></l></list><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#2&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml2"><l><option>lang</option></l><l>en</l><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;="&lt;#2&gt;"&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#4&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadTitle2"><l>My First Html Page</l></block></script><list></list></block><l><option>code</option></l><l>&lt;title&gt; &lt;#1&gt; &lt;/title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadBasic"><l></l><list><l></l></list><script></script></block><block s="doHtmlHeadBasic3"><l><option>base</option></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadBasic4"><l>meta</l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml5Basic"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml5Basic2"><l><option>h2</option></l><list></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlText2"><l></l><list><l></l></list><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlForm"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlForm1"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlFrame"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBase"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBaseComma"><list><l>a</l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCSSTagSelector"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorId"><l>id</l></block></autolambda><list></list></block><l><option>code</option></l><l>#&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorClass"><l>class</l></block></autolambda><list></list></block><l><option>code</option></l><l>.&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorTagClass"><l><option>p</option></l><l>class</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportColorRgba"><l>255</l><l>255</l><l>255</l><l>0.0</l></block></autolambda><list></list></block><l><option>code</option></l><l>rgba(&lt;#1&gt;,&lt;#2&gt;,&lt;#3&gt;,&lt;#4&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportBackgroundValue"><l> </l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportBorderValue"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorElement"><l><option>a</option></l><l><option>:visited</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorElement2"><l></l><l><option>:nth-child</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCSSSelectorOperator"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCSSSelectorFunction"><l><option>:nth-child</option></l><l>2</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;(&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSProperty"><l></l><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBorder"><l><option>border</option></l><l>2px solid powderblue</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBackground"><l><option>background</option></l><l>linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSMarginPadding"><l>margin</l><l>25px 50px 75px 100px</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSText"><l>text-align</l><l>center</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringInterpolation"><l>expr</l></block></autolambda><list></list></block><l><option>code</option></l><l>{{&lt;#1&gt;}}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportPropertyBinding"><l>Property binding</l></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportEventBinding"><l>Event binding</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTwoWayBinding"><l>Two way binding</l></block></autolambda><list></list></block><l><option>code</option></l><l>[(&lt;#1&gt;)]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportAngularControlCommand"><l>*ngFor</l><l>let item of items</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAngularComponent"><l><option>Component</option></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>@&lt;#1&gt;({&lt;#2&gt;)}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportAngularComponentKeyValue"><l><option>selector</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:"&lt;#2&gt;"</l></block></script></block-definition></blocks><variables><variable name="code"><l></l></variable><variable name="script"><context id="5589"><inputs></inputs><variables></variables><block s="reifyScript"><script></script><list></list></block><receiver><ref id="8"></ref></receiver><origin><ref id="8"></ref></origin><context id="5597"><inputs></inputs><variables></variables><receiver><ref id="8"></ref></receiver><origin><ref id="8"></ref></origin></context></context></variable></variables></project><project name="ionic" app="Snap! 6, https://snap.berkeley.edu" version="1"><notes>This project features a FizzBuzz script and a recursive factorial block that you can run and debug inside Snap! and also compile into various text-based programming languages:&#xD;&#xD;   * JavaScript&#xD;   * Smalltalk&#xD;   * Python&#xD;   * C&#xD;&#xD;Enjoy!&#xD;-Jens</notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAAAXNSR0IArs4c6QAABW1JREFUeF7tnb1LZGcUh8/oxIzIGFcR0owiW2uhIPgByYxGEIRgK2KqqAhRLNMINvoPJE2wyD9gp1YSI5jSBWEtElK4ISqIG/yCdcePCfeGQHYNztkLL3PwPLdZGM575pzn93BVWHhTpVKpJDwQqBCBFAJWiDxfGxNAQESoKAEErCh+vhwBcaCiBBCwovj5cgTEgYoSKCvg4eGhHBwcSGNjo2QymbLD3hXfyItffpZS6f6d2s7+QXnztijn5+fS3t4uDQ0NZXtR8PQJlBVwc3NTcrmcmsTL76el8PHvknrvxEf5b+TP51/Gn0ZSFwoFdU8Kny6BRwXc39+Xm5sbqaqqiglEMvb398vq6qqMjY3JxsaGnJ6eSnV1tYyPj8c1r777SvLPXj8glh6Yk98+/SL+/OLiQrq7u6WmpubpkmUzFYFHBdza2pJsNhs3ur29lb29vVjGvr4+WVhYkNnZWVlcXJSlpaVYpru7Ozn+4ev/F7AwJy+bPot7RXUdHR1SW1urGpKip0vgUQFPTk5i6erq6mICa2trMjg4KOvr6zI5OSkrKyvS29sr29vbMjExIdfX1/L6xxnJP/vr4RuwMCcvsj3x50dHRzI6Ohq/OXl8Eyj7O2D047apqUlNqfHVT/L8j7V369M1cvH5t/Lr20/k/v5eUqmU5PN5dU8Kny6BsgJGq+/s7Mjx8bFcXl7G8kT/f+Hff/+LJvrssScSubm5WXp6/nkT8kBAJSCYIBCKAAKGIktfFQEEVGGiKBQBBAxFlr4qAgiowkRRKAIIGIosfVUEEFCFiaJQBBAwFFn6qgggoAoTRaEIIGAosvRVEUBAFSaKQhFAwFBk6asigIAqTBSFIoCAocjSV0UAAVWYKApFAAFDkaWvigACqjBRFIoAAoYiS18VAQRUYaIoFAEEDEWWvioCCKjCRFEoAggYiix9VQQQUIWJolAEEDAUWfqqCCCgChNFoQggYCiy9FURQEAVJopCEUDAUGTpqyKAgCpMFIUigIChyNJXRQABVZgoCkUAAUORpa+KAAKqMFEUigAChiJLXxUBBFRhoigUAQQMRZa+KgIIqMJEUSgCCBiKLH1VBBBQhYmiUAQQMBRZ+qoIIKAKE0WhCCBgArK7u7vS1dWV4CRH3ieAgAmcWF5elugm0eiixtbWVhkYGJCWlpYEnTiCgAkdmJmZie/Pi57o7rxisSjDw8PxxY4jIyNSX1+fsLOvYwiYMO/oytmpqSlJp9MPOlxdXcU3ws/Pz0smk0n4DT6OIWCCnKMLt6PLuiMJoye6J7mtrS2+BT66iLuzszNBV59HEDBB7tPT03J2dhZf3p3L5WRoaCi+vpbnwwkg4Iczi+9NzmazCU5yhL+CccAUAd6ApuLwNwwC+svc1MYIaCoOf8MgoL/MTW2MgKbi8DcMAvrL3NTGCGgqDn/DIKC/zE1tjICm4vA3DAL6y9zUxghoKg5/wyCgv8xNbYyApuLwNwwC+svc1MYIaCoOf8MgoL/MTW2MgKbi8DcMAvrL3NTGCGgqDn/DIKC/zE1tjICm4vA3DAL6y9zUxghoKg5/wyCgv8xNbYyApuLwNwwC+svc1MYIaCoOf8MgoL/MTW2MgKbi8DcMAvrL3NTGCGgqDn/DIKC/zE1tjICm4vA3DAL6y9zUxghoKg5/wyCgv8xNbYyApuLwNwwC+svc1MYIaCoOf8MgoL/MTW2MgKbi8DcMAvrL3NTGCGgqDn/DIKC/zE1tjICm4vA3DAL6y9zUxghoKg5/wyCgv8xNbYyApuLwNwwC+svc1MYIaCoOf8MgoL/MTW2MgKbi8DcMAvrL3NTGCGgqDn/DIKC/zE1tjICm4vA3zN9KyJ63iXHIDAAAAABJRU5ErkJggg==</thumbnail><stage name="Stage" width="480" height="360" costume="0" color="255,255,255,1" tempo="60" threadsafe="false" penlog="false" volume="100" pan="0" lines="round" ternary="true" hyperops="true" codify="true" inheritance="true" sublistIDs="false" scheduled="false" id="1"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAAAXNSR0IArs4c6QAADoVJREFUeF7t1cEJAAAIxDDdf2m3sJ+4wEEQuuMIECBAgACBd4F9XzRIgAABAgQIjAB7AgIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECByxcQFpoRMBzwAAAABJRU5ErkJggg==</pentrails><costumes><list struct="atomic" id="2"></list></costumes><sounds><list struct="atomic" id="3"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites><sprite name="Alonzo" idx="1" x="20.38538153358718" y="4.705762285929097" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="80,80,80,1" pen="tip" id="8"><costumes><list struct="atomic" id="9"></list></costumes><sounds><list struct="atomic" id="10"></list></sounds><blocks></blocks><variables></variables><scripts><script x="31.176755812500005" y="11.999994000000015"><custom-block s="run %cmdRing"><block s="reifyScript"><script></script><list></list></block></custom-block></script></scripts></sprite><watcher var="script" style="normal" x="5.3660187404602766e-11" y="3.576516860448464e-11" color="243,118,29" hidden="true"/><watcher var="code" style="normal" x="23.086012563196164" y="20.40865065224476" color="243,118,29"/></sprites></stage><hidden> forward turn turnLeft setHeading doFaceTowards gotoXY doGotoObject doGlide changeXPosition setXPosition changeYPosition setYPosition bounceOffEdge xPosition yPosition direction doSwitchToCostume doWearNextCostume getCostumeIdx doThinkFor doThink changeEffect setEffect clearEffects changeScale setScale getScale show hide comeToFront goBack playSound doPlaySoundUntilDone doStopAllSounds doRest doPlayNote doChangeTempo doSetTempo getTempo clear down up setColor changeHue setHue changeBrightness setBrightness changeSize setSize doStamp reportTouchingObject reportTouchingColor reportColorIsTouchingColor colorFiltered reportStackSize reportFrameCount doAsk reportLastAnswer getLastAnswer reportMouseX reportMouseY reportMouseDown reportKeyPressed reportDistanceTo doResetTimer reportTimer getTimer reportAttributeOf reportURL reportIsFastTracking doSetFastTracking reportCONS reportCDR reportListContainsItem doDeleteFromList doInsertInList doReplaceInList reifyScript reifyReporter reifyPredicate reportRound reportMonadic reportRandom reportLetter reportStringSize reportUnicode reportIsA reportIsIdentical reportJoinWords receiveGo receiveKey receiveClick receiveMessage doBroadcast doBroadcastAndWait getLastMessage doWarp doWait doWaitUntil doForever doRepeat doUntil doStopBlock doStop doStopAll fork evaluate doCallCC reportCallCC receiveOnClone createClone removeClone reportPower receiveInteraction receiveCondition doIf doIfElse reportIfElse doReport doStopThis doSend doFor doRun doTellTo reportAskFor newClone doPauseAll reportRelationTo reportAspect reportGet reportObject reportAudio reportVideo doSetVideoTransparency reportGlobalFlag doSetGlobalFlag reportDate doDeclareVariables doDeleteAttr reportMappedCode doMapListCode doMapValueCode doMapCodeOrHeader doPlaySoundAtRate reportGetSoundAttribute reportNewSoundFromSamples doSetInstrument changeVolume setVolume getVolume changePan setPan getPan playFreq stopFreq getPenDown changePenHSVA setPenHSVA getPenAttribute floodFill write reportPenTrailsAsCostume doPasteOn doCutFrom doSayFor bubble reportGetImageAttribute reportNewCostumeStretched reportNewCostume getEffect reportShown goToLayer reportUnicodeAsLetter reportTextSplit</hidden><headers></headers><code><string>&lt;#1&gt;</string><tempvars_delim> </tempvars_delim><delim>,</delim><doTypeSciptIf>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptIf><doTypeSciptIfElse>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;} else {&#xD;    &lt;#3&gt;&#xD;}</doTypeSciptIfElse><doTypeSciptSwitch>switch (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptSwitch><doTypeSciptSwitchCase>case &lt;#1&gt;: {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptSwitchCase><doTypeSciptFor>for (&lt;#1&gt; &lt;#2&gt;; &lt;#3&gt;; &lt;#4&gt;)  {&#xD;    &lt;#5&gt;&#xD;}</doTypeSciptFor><doTypeSciptForIn>for (&lt;#1&gt; &lt;#2&gt; in &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</doTypeSciptForIn><doTypeSciptForOf>for (&lt;#1&gt; &lt;#2&gt; of &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</doTypeSciptForOf><doTypeSciptWhile>while (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptWhile><doTypeSciptDoWhile>do {&#xD;    &lt;#1&gt;&#xD;} while (&lt;#2&gt;)</doTypeSciptDoWhile><doTypeSciptBreak>break &lt;#1&gt;;</doTypeSciptBreak><doTypeSciptContinue>break &lt;#1&gt;;</doTypeSciptContinue><reportSum>(&lt;#1&gt; + &lt;#2&gt;)</reportSum><reportDifference>(&lt;#1&gt; - &lt;#2&gt;)</reportDifference><reportProduct>(&lt;#1&gt; * &lt;#2&gt;)</reportProduct><reportQuotient>(&lt;#1&gt; / &lt;#2&gt;)</reportQuotient><reportModulus>(&lt;#1&gt; % &lt;#2&gt;)</reportModulus><reportLessThan>(&lt;#1&gt; &lt; &lt;#2&gt;)</reportLessThan><reportEquals>(&lt;#1&gt; == &lt;#2&gt;)</reportEquals><reportGreaterThan>(&lt;#1&gt; &gt; &lt;#2&gt;)</reportGreaterThan><reportAnd>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</reportAnd><reportOr>(&lt;#1&gt; || &lt;#2&gt;)</reportOr><reportNot>(!&lt;#1&gt;)</reportNot><reportBoolean>True</reportBoolean><reportUnaryOperator>(&lt;#1&gt;&lt;#2&gt;)</reportUnaryOperator><reportBinayOperator>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</reportBinayOperator><reportTernaryOperator>(&lt;#1&gt;?&lt;#2&gt;:&lt;#3&gt;)</reportTernaryOperator><reportRelationalOperator>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</reportRelationalOperator><reportJFunctionConstant>&lt;#1&gt;</reportJFunctionConstant><reportJSMathFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportJSMathFunction><reportJSDateFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportJSDateFunction><reportTypeSciptNewArray>[&lt;#1&gt;]</reportTypeSciptNewArray><reportTypeSciptNewObject>{&lt;#1&gt;}</reportTypeSciptNewObject><reportTypeSciptKeyValue>&lt;#1&gt;:&lt;#2&gt;</reportTypeSciptKeyValue><reportListWithoutComma>&lt;#1&gt;</reportListWithoutComma><reportStringBuiltInFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportStringBuiltInFunction><reportNumberBuiltInFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportNumberBuiltInFunction><reportArrayBuiltInFunction>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</reportArrayBuiltInFunction><doTypeSciptImport>import {&lt;#1&gt;} from &lt;#2&gt;;</doTypeSciptImport><doTypeSciptConsoleLog>console.log(`&lt;#1&gt;`);</doTypeSciptConsoleLog><doTypeSciptConsoleFunction>console.&lt;#1&gt;(&lt;#2&gt;);</doTypeSciptConsoleFunction><doTypeSciptLet10>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;;</doTypeSciptLet10><doTypeSciptLet13>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;</doTypeSciptLet13><doTypeSciptLet15>&lt;#1&gt; &lt;#2&gt;</doTypeSciptLet15><reportTypeSciptParameter>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</reportTypeSciptParameter><reportTypeSciptParameter2>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</reportTypeSciptParameter2><reportTypeSciptParameter3>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</reportTypeSciptParameter3><reportTypeSciptParameter4>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</reportTypeSciptParameter4><reportTypeSciptStringVariable2>${&lt;#1&gt;}</reportTypeSciptStringVariable2><reportTypeSciptString>`&lt;#1&gt;`</reportTypeSciptString><reify>&lt;#1&gt;</reify><reportTypeSciptFunction3>&lt;#1&gt; (&lt;#2&gt;) =&gt; {&#xD;  &lt;#3&gt;&#xD;}</reportTypeSciptFunction3><reportTypeSciptFunction4>&lt;#1&gt; function (&lt;#2&gt;) {&#xD;  &lt;#3&gt;&#xD;}</reportTypeSciptFunction4><doTypeSciptFunction2>&lt;#1&gt; function &lt;#2&gt; (&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</doTypeSciptFunction2><reportTypeSciptNewClassObject>new &lt;#1&gt; (&lt;#2&gt;)</reportTypeSciptNewClassObject><doTypeSciptReturn>return &lt;#1&gt;;</doTypeSciptReturn><doTypeSciptExecuteFunction>&lt;#1&gt;(&lt;#2&gt;);</doTypeSciptExecuteFunction><doTypeSciptExecuteFunction2>&lt;#1&gt;(&lt;#2&gt;)</doTypeSciptExecuteFunction2><doTypeSciptClass>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; {&#xD;    &lt;#4&gt;&#xD;}</doTypeSciptClass><doTypeSciptClass2>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt; {&#xD;    &lt;#6&gt;&#xD;}</doTypeSciptClass2><doTypeSciptVariable>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt;</doTypeSciptVariable><doTypeSciptConstructor>constructor (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</doTypeSciptConstructor><doTypeSciptClassSuper>super(&lt;#1&gt;);</doTypeSciptClassSuper><doTypeSciptClassMethod>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</doTypeSciptClassMethod><doTypeSciptClassMethod2>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt;;</doTypeSciptClassMethod2><reportObjectProperty>&lt;#1&gt;.&lt;#2&gt;</reportObjectProperty><reportTypeSciptStringGeneric>&lt;#1&gt;&lt;&lt;#2&gt;&gt;</reportTypeSciptStringGeneric><doProperties>&lt;#1&gt;</doProperties><doColor>color=&quot;&lt;#1&gt;&quot;</doColor><doPosition>position=&quot;&lt;#1&gt;&quot;</doPosition><doValue>value=&quot;&lt;#1&gt;&quot;</doValue><doPlaceholder>placeholder=&quot;&lt;#1&gt;&quot;</doPlaceholder><doAutocapitalize>autocapitalize=&quot;&lt;#1&gt;&quot;</doAutocapitalize><doInputmode>inputmode=&quot;&lt;#1&gt;&quot;</doInputmode><doRows>rows=&quot;&lt;#1&gt;&quot;</doRows><doCols>cols=&quot;&lt;#1&gt;&quot;</doCols><doShowCancelButton>showCancelButton=&quot;&lt;#1&gt;&quot;</doShowCancelButton><doCancelButtonText>cancelButtonText=&quot;&lt;#1&gt;&quot;</doCancelButtonText><doType3>type=&quot;&lt;#1&gt;&quot;</doType3><doDisabled>disabled=&quot;&lt;#1&gt;&quot;</doDisabled><doAnimated>animated=&quot;&lt;#1&gt;&quot;</doAnimated><doDebounce>debounce=&quot;&lt;#1&gt;&quot;</doDebounce><doDisplayFormat>displayFormat=&quot;&lt;#1&gt;&quot;</doDisplayFormat><doExpand>expand=&quot;&lt;#1&gt;&quot;</doExpand><doFill>fill=&quot;&lt;#1&gt;&quot;</doFill><doSize>size=&quot;&lt;#1&gt;&quot;</doSize><doMultiple>multiple=&quot;&lt;#1&gt;&quot;</doMultiple><doOkText>okText=&quot;&lt;#1&gt;&quot;</doOkText><doCancelText>cancelText=&quot;&lt;#1&gt;&quot;</doCancelText><doChecked>checked=&quot;&lt;#1&gt;&quot;</doChecked><doName>name=&quot;&lt;#1&gt;&quot;</doName><doAllowEmptySelection>name=&quot;&lt;#1&gt;&quot;</doAllowEmptySelection><doOutline>name=&quot;&lt;#1&gt;&quot;</doOutline><doSlot>slot=&quot;&lt;#1&gt;&quot;</doSlot><doForceOverscroll>forceOverscroll=&quot;&lt;#1&gt;&quot;</doForceOverscroll><doFullscreen>fullscreen=&quot;&lt;#1&gt;&quot;</doFullscreen><doScrollEvents>scrollEvents=&quot;&lt;#1&gt;&quot;</doScrollEvents><doScrollX>scrollX=&quot;&lt;#1&gt;&quot;</doScrollX><doScrollY>scrollY=&quot;&lt;#1&gt;&quot;</doScrollY><doLines>lines=&quot;&lt;#1&gt;&quot;</doLines><doClass>class=&quot;&lt;#1&gt;&quot;</doClass><doColsize>colsize=&quot;&lt;#1&gt;&quot;</doColsize><doSize2>size=&quot;&lt;#1&gt;&quot;</doSize2><doInset>inset=&quot;&lt;#1&gt;&quot;</doInset><doAlt>alt=&quot;&lt;#1&gt;&quot;</doAlt><doVertical>vertical=&quot;&lt;#1&gt;&quot;</doVertical><doHorizontal>horizontal=&quot;&lt;#1&gt;&quot;</doHorizontal><doType2>type=&quot;&lt;#1&gt;&quot;</doType2><doActivated>activated=&quot;&lt;#1&gt;&quot;</doActivated><doSide>side=&quot;&lt;#1&gt;&quot;</doSide><doCardbutton>cardbutton=&quot;&lt;#1&gt;&quot;</doCardbutton><doSide2>side=&quot;&lt;#1&gt;&quot;</doSide2><doMenuId>menuId=&quot;&lt;#1&gt;&quot;</doMenuId><doContentId>contentId=&quot;&lt;#1&gt;&quot;</doContentId><doAutoHide>autoHide=&quot;&lt;#1&gt;&quot;</doAutoHide><doMax>max=&quot;&lt;#1&gt;&quot;</doMax><doMin>min=&quot;&lt;#1&gt;&quot;</doMin><doStep>step=&quot;&lt;#1&gt;&quot;</doStep><doValueNumber>vlue=&quot;&lt;#1&gt;&quot;</doValueNumber><doReversed>reversed=&quot;&lt;#1&gt;&quot;</doReversed><doProgresstype>progresstype=&quot;&lt;#1&gt;&quot;</doProgresstype><doSpinnername>spinnerName=&quot;&lt;#1&gt;&quot;</doSpinnername><doPaused>paused=&quot;&lt;#1&gt;&quot;</doPaused><doScrollable>scrollable=&quot;&lt;#1&gt;&quot;</doScrollable><doSwipeGesture>swipeGesture=&quot;&lt;#1&gt;&quot;</doSwipeGesture><doLayout>layout=&quot;&lt;#1&gt;&quot;</doLayout><doPager>pager=&quot;&lt;#1&gt;&quot;</doPager><doTappable>tappable=&quot;&lt;#1&gt;&quot;</doTappable><doVisible>visible=&quot;&lt;#1&gt;&quot;</doVisible><doStopPropagation>stopPropagation=&quot;&lt;#1&gt;&quot;</doStopPropagation><bubble>&lt;#1&gt;</bubble><doButton>&lt;ion-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-button&gt;</doButton><doGrid>&lt;ion-grid &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-grid&gt;</doGrid><doCol>&lt;ion-col &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</doCol><doCol2>&lt;ion-col size=&quot;&lt;#1&gt;&quot; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-col&gt;</doCol2><doCol3>&lt;ion-col class=&quot;&lt;#1&gt;&quot;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</doCol3><doRow>&lt;ion-row &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</doRow><doRow2>&lt;ion-row class=&quot;&lt;#1&gt;&quot;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</doRow2><doCard>&lt;ion-card &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card&gt;</doCard><doCardHeader>&lt;ion-card-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-header&gt;</doCardHeader><doCardHeaderSubtitle>&lt;ion-card-subtitle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-subtitle&gt;</doCardHeaderSubtitle><doCardHeaderTitle>&lt;ion-card-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-title&gt;</doCardHeaderTitle><doCardContent>&lt;ion-card-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-content&gt;</doCardContent><doCheckBox>&lt;ion-checkbox &lt;#1&gt; [(ngModel)]=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-checkbox&gt;</doCheckBox><doDatetime>&lt;ion-datetime &lt;#1&gt;&gt;&lt;/ion-datetime&gt;</doDatetime><doChip>&lt;ion-chip &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-chip&gt;</doChip><doLabel>&lt;ion-label &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-label&gt;</doLabel><doContent>&lt;ion-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-content&gt;</doContent><doFab>&lt;ion-fab &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab&gt;</doFab><doFabButton>&lt;ion-fab-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-button&gt;</doFabButton><doFabList>&lt;ion-fab-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-list&gt;</doFabList><doIcon>&lt;ion-icon name=&quot;&lt;#1&gt;&quot; &lt;#2&gt;&gt;&lt;/ion-icon&gt;</doIcon><doIcon2>&lt;ion-icon name=&quot;&lt;#1&gt;&quot; &lt;#2&gt;&gt;&lt;/ion-icon&gt;</doIcon2><doInput>&lt;ion-input &lt;#1&gt;&gt;&lt;/ion-input&gt;</doInput><doTextarea>&lt;ion-textarea &lt;#1&gt;&gt;&lt;/ion-textarea&gt;</doTextarea><doList>&lt;ion-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list&gt;</doList><doListHeader>&lt;ion-list-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list-header&gt;</doListHeader><doItem>&lt;ion-item &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-item&gt;</doItem><doAvatar>&lt;ion-avatar &lt;#1&gt;&gt;&#xD;  &lt;img src=&quot;&lt;#2&gt;&quot;/&gt;&#xD;&lt;/ion-avatar&gt;</doAvatar><doThumbnail>&lt;ion-thumbnail &lt;#1&gt;&gt;&#xD;  &lt;img src=&quot;&lt;#2&gt;&quot;/&gt;&#xD;&lt;/ion-thumbnail&gt;</doThumbnail><doImg>&lt;ion-img &lt;#1&gt; src=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-img&gt;</doImg><doMenu>&lt;ion-menu &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu&gt;</doMenu><doMenuButton>&lt;ion-menu-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-button&gt;</doMenuButton><doMenuToggle>&lt;ion-menu-toggle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-toggle&gt;</doMenuToggle><doSplitPane>&lt;ion-split-pane &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-split-pane&gt;</doSplitPane><doNote>&lt;ion-note&gt;&lt;#1&gt;&lt;/ion-note&gt;</doNote><doNote2>&lt;ion-note color=&quot;&lt;#1&gt;&quot;&gt;&lt;#2&gt;&lt;/ion-note&gt;</doNote2><doSpinner>&lt;ion-spinner &lt;#1&gt;&gt;&lt;/ion-spinner&gt;</doSpinner><doRadio> &lt;ion-radio &lt;#1&gt; value=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-radio&gt;</doRadio><doRadioGroup1>&lt;ion-radio-group &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-radio-group&gt;</doRadioGroup1><doRange>&lt;ion-range &lt;#1&gt;&gt;&#xD;&lt;/ion-range&gt;</doRange><doSearchbar>&lt;ion-searchbar &lt;#1&gt;&gt;&lt;/ion-searchbar&gt;</doSearchbar><doSegment>&lt;ion-segment &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment&gt;</doSegment><doSegmentButton>&lt;ion-segment-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment-button&gt;</doSegmentButton><doSelect>&lt;ion-select &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-select&gt;</doSelect><doSelectOption>&lt;ion-select-option &lt;#1&gt;&gt;&lt;#2&gt;&lt;/ion-select-option&gt;</doSelectOption><doText>&lt;ion-text &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-text&gt;</doText><doBackdrop>&lt;ion-backdrop &lt;#1&gt;&gt;&#xD;&lt;/ion-backdrop&gt;</doBackdrop><doProgressBar>&lt;ion-progress-bar &lt;#1&gt;&gt;&lt;/ion-progress-bar&gt;</doProgressBar><doReorderGroup>&lt;ion-reorder-group &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder-group&gt;</doReorderGroup><doReorder1>&lt;ion-reorder &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder&gt;</doReorder1><doReorder2>&lt;ion-reorder&gt;&#xD;  &lt;ion-item&gt;&#xD;    &lt;ion-label&gt;&#xD;      &lt;#1&gt;&#xD;    &lt;/ion-label&gt;&#xD;  &lt;/ion-item&gt;&#xD;&lt;/ion-reorder&gt;</doReorder2><doSlides>&lt;ion-slides &lt;#1&gt; [options]=&quot;&lt;#2&gt;&quot;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-slides&gt;</doSlides><doSlide>&lt;ion-slide &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-slide&gt;</doSlide><doTabs>&lt;ion-tabs &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tabs&gt;</doTabs><doTabButton>&lt;ion-tab-button tab=&quot;&lt;#1&gt;&quot;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tab-button&gt;</doTabButton><doToggle>&lt;ion-toggle &lt;#1&gt; [(ngModel)]=&quot;&lt;#2&gt;&quot;&gt;&lt;/ion-toggle&gt;</doToggle><doToolbar>&lt;ion-toolbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-toolbar&gt;</doToolbar><doHeader>&lt;ion-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-header&gt;</doHeader><doFooter>&lt;ion-footer &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-footer&gt;</doFooter><doTitle>&lt;ion-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-title&gt;</doTitle><doButtons>&lt;ion-buttons &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-buttons&gt;</doButtons><doNavbar>&lt;ion-navbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-navbar&gt;</doNavbar><doBadge>&lt;ion-badge &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-badge&gt;</doBadge><reportNewList>&lt;#1&gt;</reportNewList><doDiv>&lt;div &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/div&gt;</doDiv><doHtmlTag>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlTag><doHtmlText>&lt;#1&gt;</doHtmlText><doHtmlH>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlH><doHtmlBlockquote>&lt;blockquote &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/blockquote&gt;</doHtmlBlockquote><doHtmlIns>&lt;ins &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ins&gt;</doHtmlIns><doHtmlP>&lt;p &lt;#1&gt;&gt;&#xD;   &lt;#2&gt;&#xD;&lt;/p&gt;</doHtmlP><doHtmlDataList>&lt;datalist &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/datalist&gt;</doHtmlDataList><doHtmlHeadTitle>&lt;title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/title&gt;</doHtmlHeadTitle><doHtmlEmptyTag>&lt;&lt;#1&gt;&gt;</doHtmlEmptyTag><reportHtmlEmptyTag>&lt;&lt;#1&gt;&gt;</reportHtmlEmptyTag><doHtmlHr>&lt;hr&gt;</doHtmlHr><doHtmlBr>&lt;br&gt;</doHtmlBr><doHtmlOption>&lt;option &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/option&gt;</doHtmlOption><reportHtmlJoin>&lt;#1&gt;</reportHtmlJoin><doHtmlHeadProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlHeadProperties><doHtmlSourceProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlSourceProperties><doHtmlFramProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlFramProperties><doHtmlTarget>&lt;#1&gt;</doHtmlTarget><doHtmlRel2>&lt;#1&gt;</doHtmlRel2><doHtmlSandbox>&lt;#1&gt;</doHtmlSandbox><doHtmlPreload>&lt;#1&gt;</doHtmlPreload><doHtmlAutoplay>&lt;#1&gt;</doHtmlAutoplay><doHtmlMuted>&lt;#1&gt;</doHtmlMuted><doHtmlControls>&lt;#1&gt;</doHtmlControls><doHtmlMethod>&lt;#1&gt;</doHtmlMethod><doHtmlAutocomplete>&lt;#1&gt;</doHtmlAutocomplete><doHtmlFormProperties1>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</doHtmlFormProperties1><doHtmlHeadProperties1>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</doHtmlHeadProperties1><doHtmlLang>lang =&quot;&lt;#1&gt;&quot;</doHtmlLang><doHtmlTable1Properties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlTable1Properties><reportHtmlMediaProperties>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</reportHtmlMediaProperties><doHtmlFormProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</doHtmlFormProperties><doHtmlSvgProperties>&lt;#1&gt; = &quot;&lt;#2&gt;&quot;</doHtmlSvgProperties><reportHtmlTextProperties>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</reportHtmlTextProperties><reportSimpleProperty>&lt;#1&gt;</reportSimpleProperty><doHtmlList1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlList1><doHtmlList>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtmlList><doHtmlSvg2>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlSvg2><doHtmlSvg>&lt;&lt;#1&gt; &lt;#2&gt; /&gt;</doHtmlSvg><doHtmlText1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlText1><doHtmlText2>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtmlText2><doMedia1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doMedia1><doMedia2>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;/&lt;#1&gt;&gt;</doMedia2><doHtmlTable1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlTable1><doHtmlTable>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtmlTable><doHtml>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#2&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</doHtml><doHtml2>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;=&quot;&lt;#2&gt;&quot;&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#4&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</doHtml2><doHtmlHeadTitle2>&lt;title&gt; &lt;#1&gt; &lt;/title&gt;</doHtmlHeadTitle2><doHtmlHeadBasic>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlHeadBasic><doHtmlHeadBasic4>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</doHtmlHeadBasic4><doHtml5Basic>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtml5Basic><doHtmlForm>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doHtmlForm><doHtmlForm1>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</doHtmlForm1><doHtmlFrame>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</doHtmlFrame><doCSSBase>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</doCSSBase><doCSSBaseComma>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</doCSSBaseComma><doCSSTagSelector>&lt;#1&gt;</doCSSTagSelector><doSelectorId>#&lt;#1&gt;</doSelectorId><doSelectorClass>.&lt;#1&gt;</doSelectorClass><doSelectorTagClass>&lt;#1&gt;.&lt;#2&gt;</doSelectorTagClass><reportColorRgba>rgba(&lt;#1&gt;,&lt;#2&gt;,&lt;#3&gt;,&lt;#4&gt;)</reportColorRgba><reportBackgroundValue>&lt;#1&gt;</reportBackgroundValue><reportBorderValue>&lt;#1&gt;</reportBorderValue><doSelectorElement>&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;</doSelectorElement><doSelectorElement2>&lt;#1&gt;&lt;#2&gt;(&lt;#3&gt;)</doSelectorElement2><doCSSSelectorOperator>&lt;#1&gt;</doCSSSelectorOperator><doCSSSelectorFunction>&lt;#1&gt;(&lt;#2&gt;)</doCSSSelectorFunction><doCSSProperty>&lt;#1&gt;:&lt;#2&gt;;</doCSSProperty><doCSSBorder>&lt;#1&gt;:&lt;#2&gt;;</doCSSBorder><doCSSBackground>&lt;#1&gt;:&lt;#2&gt;;</doCSSBackground><doCSSMarginPadding>&lt;#1&gt;:&lt;#2&gt;;</doCSSMarginPadding><doCSSText>&lt;#1&gt;:&lt;#2&gt;;</doCSSText><doIonicReorder>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicReorder><doIonicContainer>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicContainer><doIonicCard>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicCard><doIonicChip>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicChip><doIonicFloatingActionButton>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicFloatingActionButton><doIonicGrid>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicGrid><doIonicInfiniteScroll>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicInfiniteScroll><doIonicList>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicList><doIonicMedia>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicMedia><doIonicMenu>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicMenu><doIonicRouter>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicRouter><doIonicSegmentButton>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicSegmentButton><doIonicSelect>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicSelect><doIonicToolbar>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicToolbar><doIonicControl>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</doIonicControl><reportIonicIconPropertyValue>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</reportIonicIconPropertyValue><reportIonicButtonPropertyValue>&lt;#1&gt; =&quot;&lt;#2&gt;&quot;</reportIonicButtonPropertyValue><doIonicItem>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicItem><errorObsolete>position=&quot;&lt;#1&gt;&quot;</errorObsolete><reportColor>color=&quot;&lt;#1&gt;&quot;</reportColor><reportPosition>position=&quot;&lt;#1&gt;&quot;</reportPosition><reportTypeSciptFunctionType>(&lt;#1&gt;) =&gt; &lt;#2&gt;</reportTypeSciptFunctionType><reportTypeSciptMultiVariables>...&lt;#1&gt;</reportTypeSciptMultiVariables><doHtml5Basic2>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</doHtml5Basic2><reportStringInterpolation>{{&lt;#1&gt;}}</reportStringInterpolation><reportPropertyBinding>[&lt;#1&gt;]</reportPropertyBinding><reportEventBinding>(&lt;#1&gt;)</reportEventBinding><reportTwoWayBinding>[(&lt;#1&gt;)]</reportTwoWayBinding><reportAngularControlCommand>&lt;#1&gt;=&quot;&lt;#2&gt;&quot;</reportAngularControlCommand><reportAngularComponentKeyValue>&lt;#1&gt;:&quot;&lt;#2&gt;&quot;</reportAngularComponentKeyValue><doAngularComponent>@&lt;#1&gt;({&lt;#2&gt;)}</doAngularComponent><doIonicTabs>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</doIonicTabs><doIonicControl2>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</doIonicControl2></code><blocks><block-definition s="while %&apos;test&apos; %&apos;action&apos;" type="command" category="control"><header></header><code>while &lt;#1&gt;:&#xD;    &lt;#2&gt;&#xD;</code><translations></translations><inputs><input type="%boolUE"></input><input type="%cs"></input></inputs><script><block s="doIf"><block s="evaluate"><block var="test"/><list></list></block><script><block s="doRun"><block var="action"/><list></list></block><custom-block s="while %boolUE %cs"><block s="evaluate"><block var="test"/><list></list></block><block var="action"/></custom-block></script></block></script></block-definition><block-definition s="new List" type="reporter" category="lists"><header></header><code>[]</code><translations></translations><inputs></inputs><script><block s="doReport"><block s="reportNewList"><list></list></block></block></script></block-definition><block-definition s="main %&apos;script&apos;" type="command" category="control"><header></header><code>&lt;#1&gt;</code><translations></translations><inputs><input type="%cs"></input></inputs><script><block s="doRun"><block var="script"/><list></list></block></script></block-definition><block-definition s="for %&apos;i&apos; = %&apos;start&apos; to %&apos;end&apos; %&apos;action&apos;" type="command" category="control"><header></header><code>for &lt;#1&gt; in range(&lt;#2&gt;, &lt;#3&gt;):&#xD;    &lt;#4&gt;</code><translations></translations><inputs><input type="%upvar"></input><input type="%n">1</input><input type="%n">5</input><input type="%cs"></input></inputs><script><block s="doSetVar"><l>i</l><block var="start"/></block><custom-block s="while %boolUE %cs"><block s="reportLessThan"><block var="i"/><block s="reportSum"><block var="end"/><l>1</l></block></block><script><block s="doRun"><block var="action"/><list></list></block><block s="doChangeVar"><l>i</l><l>1</l></block></script></custom-block></script></block-definition><block-definition s="map to JavaScript" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>&apos;&lt;#1&gt;&apos;</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l>,</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>console.log(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>console.log(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;} else {&#xD;    &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>while (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>for (var &lt;#1&gt; = &lt;#2&gt;; &lt;#1&gt; &lt;= &lt;#3&gt;; &lt;#1&gt; += 1) {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; === &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; || &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>true</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>false</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>false</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringSize"><l>world</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.length)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><script></script><list></list></block><l><option>code</option></l><l>(typeof &lt;#1&gt; === &apos;number&apos;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.toString())</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>function fact(n) {&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fact(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>function fib(n) {&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fib(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = &lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; += 1;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doShowVar"><l></l></block></script><list></list></block><l><option>code</option></l><l>console.log(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHideVar"><l></l></block></script><list></list></block><l><option>code</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>var &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><custom-block s="new List"></custom-block></autolambda><list></list></block><l><option>code</option></l><l>[]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListAttribute"><l><option>length</option></l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.length)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListItem"><l>1</l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#2&gt;[&lt;#1&gt; - 1]</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAddToList"><l>thing</l><l/></block></script><list></list></block><l><option>code</option></l><l>&lt;#2&gt;.push(&lt;#1&gt;);</l></block></script></block-definition><block-definition s="map to Smalltalk" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>&apos;&lt;#1&gt;&apos;</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l></l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>Transcript&#xD;    show: &lt;#1&gt;;&#xD;    cr.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>Transcript&#xD;    show: &lt;#1&gt;;&#xD;    cr.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ifTrue: [&#xD;    &lt;#2&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&#xD;    ifTrue: [&#xD;        &lt;#2&gt;]&#xD;    ifFalse: [&#xD;        &lt;#3&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;] whileTrue: [&#xD;    &lt;#2&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>(&lt;#2&gt; to: &lt;#3&gt;) do: [:&lt;#1&gt; |&#xD;    &lt;#4&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;  &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; = &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; and: [&lt;#2&gt;])</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; or: [&lt;#2&gt;])</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; not)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>true</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>false</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>false</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;, &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringSize"><l>world</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; size)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; isNumber)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; printString)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>| fact |&#xD;fact := [:n| &lt;body&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(fact value: &lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>| fib |&#xD;fib := [:n | &lt;body&gt;].</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(fib value: &lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; := &lt;#2&gt;.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; := &lt;#1&gt; + 1.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doShowVar"><l></l></block></script><list></list></block><l><option>code</option></l><l>Transcript&#xD;    show: &lt;#1&gt;;&#xD;    cr.</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHideVar"><l></l></block></script><list></list></block><l><option>code</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>| &lt;#1&gt; |</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>#(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><custom-block s="new List"></custom-block></autolambda><list></list></block><l><option>code</option></l><l>(OrderedCollection new)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListAttribute"><l><option>length</option></l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; size)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListItem"><l>1</l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#2&gt; at: &lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAddToList"><l>thing</l><l/></block></script><list></list></block><l><option>code</option></l><l>&lt;#2&gt; add: &lt;#1&gt;.</l></block></script></block-definition><block-definition s="map to Python" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>"&lt;#1&gt;"</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l>,</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>print &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>print &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;:&#xD;    &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;:&#xD;    &lt;#2&gt;&#xD;else: &#xD;    &lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>while &lt;#1&gt;:&#xD;    &lt;#2&gt;&#xD;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>for &lt;#1&gt; in range(&lt;#2&gt;, &lt;#3&gt;):&#xD;    &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; == &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; | &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>True</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>false</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>False</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringSize"><l>world</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;.length)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><script></script><list></list></block><l><option>code</option></l><l>isinstance(&lt;#1&gt;, (int, long, float, complex))</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>str(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>def fact(n):&#xD;    &lt;body&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fact(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>def fib(n):&#xD;    &lt;body&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fib(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; += 1</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doShowVar"><l></l></block></script><list></list></block><l><option>code</option></l><l>print &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHideVar"><l></l></block></script><list></list></block><l><option>code</option></l><l></l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>#variables &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><custom-block s="new List"></custom-block></autolambda><list></list></block><l><option>code</option></l><l>[]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListAttribute"><l><option>length</option></l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>len(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListItem"><l>1</l><l/></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#2&gt;[&lt;#1&gt; - 1]</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAddToList"><l>thing</l><l/></block></script><list></list></block><l><option>code</option></l><l>&lt;#2&gt;.append(&lt;#1&gt;)</l></block></script></block-definition><block-definition s="map to C" type="command" category="other"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>"&lt;#1&gt;"</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l>,</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSayFor"><l>Hello!</l><l>2</l></block></script><list></list></block><l><option>code</option></l><l>printf(&lt;#1&gt;);&#xD;printf("&#xD;");</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>printf(&lt;#1&gt;);&#xD;printf("&#xD;");</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="main %cs"><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>#include &lt;stdio.h&gt;&#xD;int main()&#xD;{&#xD;    &lt;#1&gt;&#xD;    return(0);&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;&#xD;{&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if &lt;#1&gt;&#xD;{&#xD;    &lt;#2&gt;&#xD;}&#xD;else &#xD;{&#xD;    &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReport"><l></l></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="while %boolUE %cs"><l/><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>while &lt;#1&gt;&#xD;{&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><custom-block s="for %upvar = %n to %n %cs"><l>i</l><l>1</l><l>5</l><script></script></custom-block></script><list></list></block><l><option>code</option></l><l>int &lt;#1&gt;; for (&lt;#1&gt; = &lt;#2&gt;; &lt;#1&gt; &lt;= &lt;#3&gt;; &lt;#1&gt;++)&#xD;{&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; == &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; || &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>"%d", &lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>int fact(int n)&#xD;{&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fact(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>header</option></l><l>int fib(int n)&#xD;{&#xD;    &lt;body&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><script></script><list></list></block><l><option>code</option></l><l>fib(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSetVar"><l></l><l>0</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = &lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChangeVar"><l></l><l>1</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;++;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDeclareVariables"><list><l>a</l></list></block></script><list></list></block><l><option>code</option></l><l>int &lt;#1&gt;;</l></block></script></block-definition><block-definition s="run %&apos;function&apos;" type="command" category="other"><header></header><code></code><translations></translations><inputs><input type="%cmdRing"></input></inputs><script><block s="doSetVar"><l>script</l><block var="function"/></block><custom-block s="MapTo Ionic"></custom-block><block s="doHideVar"><l>script</l></block><block s="doShowVar"><l>code</l></block><block s="doSetVar"><l>code</l><block s="reportMappedCode"><block var="script"/></block></block></script></block-definition><block-definition s="MapTo Ionic" type="command" category="variables"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doMapValueCode"><l><option>String</option></l><l>&lt;#1&gt;</l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>variables</option></l><l> </l></block><block s="doMapListCode"><l><option>delimiter</option></l><l><option>collection</option></l><l>,</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicContainer"><l><option>ion-content</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicCard"><l><option>ion-card</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicChip"><l><option>ion-chip</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicFloatingActionButton"><l><option>ion-fab</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicGrid"><l><option>ion-grid</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicChip"><l><option>ion-chip</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicInfiniteScroll"><l><option>ion-infinite-scroll</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicItem"><l><option>ion-item</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicList"><l><option>ion-list</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicMedia"><l><option>ion-avatar</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicMenu"><l><option>ion-menu</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicReorder"><l><option>ion-reorder</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicRouter"><l><option>ion-router</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicSegmentButton"><l><option>ion-router-outlet</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicSelect"><l><option>ion-select</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicTabs"><l><option>ion-tabs</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicToolbar"><l><option>ion-toolbar</option></l><list></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;  &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicControl"><l><option>ion-label</option></l><list></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIonicControl2"><l><option>ion-icon</option></l><list></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportIonicIconPropertyValue"><l>name</l><l>heart</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportIonicButtonPropertyValue"><l>name</l><l>heart</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptIf"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptIfElse"><l/><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>if (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;} else {&#xD;    &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptSwitch"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>switch (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptSwitchCase"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>case &lt;#1&gt;: {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptFor"><l><option>let</option></l><l>i=1</l><l>i&lt;4</l><l>i++</l><script></script></block></script><list></list></block><l><option>code</option></l><l>for (&lt;#1&gt; &lt;#2&gt;; &lt;#3&gt;; &lt;#4&gt;)  {&#xD;    &lt;#5&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptForIn"><l><option>let</option></l><l>item</l><l>items</l><script></script></block></script><list></list></block><l><option>code</option></l><l>for (&lt;#1&gt; &lt;#2&gt; in &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptForOf"><l><option>let</option></l><l>item</l><l>items</l><script></script></block></script><list></list></block><l><option>code</option></l><l>for (&lt;#1&gt; &lt;#2&gt; of &lt;#3&gt;)  {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptWhile"><l/><script></script></block></script><list></list></block><l><option>code</option></l><l>while (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptDoWhile"><script></script><l/></block></script><list></list></block><l><option>code</option></l><l>do {&#xD;    &lt;#1&gt;&#xD;} while (&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptBreak"><list></list></block></script><list></list></block><l><option>code</option></l><l>break &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptContinue"><list></list></block></script><list></list></block><l><option>code</option></l><l>break &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSum"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; + &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportDifference"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; - &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportProduct"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; * &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportQuotient"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; / &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportModulus"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; % &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportLessThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &lt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportEquals"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; == &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportGreaterThan"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &gt; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportAnd"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; &amp;&amp; &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportOr"><l/><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt; || &lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportNot"><l/></block></autolambda><list></list></block><l><option>code</option></l><l>(!&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportBoolean"><l><bool>true</bool></l></block></autolambda><list></list></block><l><option>code</option></l><l>True</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportUnaryOperator"><l>&#126;</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportBinayOperator"><l></l><l><option>+</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTernaryOperator"><l>cond</l><l>trueS</l><l>falseS</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;?&lt;#2&gt;:&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyPredicate"><autolambda><block s="reportRelationalOperator"><l></l><l>==</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportJFunctionConstant"><l>Math.PI</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportJSMathFunction"><l>math</l><l>abs</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportJSDateFunction"><l>Date</l><l><option>getDate</option></l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptNewArray"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptNewObject"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>{&lt;#1&gt;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptKeyValue"><l>key</l><l>value</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportListWithoutComma"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringBuiltInFunction"><l>string</l><l>charAt</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNumberBuiltInFunction"><l>number</l><l>toString</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportArrayBuiltInFunction"><l>array</l><l>concat</l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptImport"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>import {&lt;#1&gt;} from &lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptConsoleLog"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>console.log(`&lt;#1&gt;`);</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptStringVariable2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>${&lt;#1&gt;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptConsoleFunction"><l>log</l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>console.&lt;#1&gt;(&lt;#2&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptString"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>`&lt;#1&gt;`</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptLet10"><l><option>let</option></l><l>var</l><l>string</l><l><option>=</option></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptLet13"><l></l><l>var</l><l><option>=</option></l><l>expr</l><l><option>;</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptLet15"><l>expr</l><l><option>;</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter"><l></l><l>var</l><l>: string</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter2"><l></l><l>var</l><l>string</l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; = &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter3"><l></l><l>var</l><l>string</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptParameter4"><l></l><l>var</l><l>string</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptFunctionType"><list></list><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;) =&gt; &lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reifyScript"><script></script><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptFunction3"><l></l><list></list><script></script></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; (&lt;#2&gt;) =&gt; {&#xD;  &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptFunction4"><l></l><list></list><script></script></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; function (&lt;#2&gt;) {&#xD;  &lt;#3&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptFunction2"><l></l><l>func</l><list><l></l></list><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; function &lt;#2&gt; (&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptMultiVariables"><l>var</l></block></autolambda><list></list></block><l><option>code</option></l><l>...&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptNewClassObject"><l></l><list></list></block></autolambda><list></list></block><l><option>code</option></l><l>new &lt;#1&gt; (&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptReturn"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>return &lt;#1&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptExecuteFunction"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;(&lt;#2&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doTypeSciptExecuteFunction2"><l></l><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;(&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClass"><l></l><l><option>class</option></l><l>CName</l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; {&#xD;    &lt;#4&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClass2"><l></l><l><option>class</option></l><l>CName</l><l><option>extends</option></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; &lt;#3&gt; &lt;#4&gt; &lt;#5&gt; {&#xD;    &lt;#6&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptVariable"><l></l><l>var</l><l>string</l><l><option>;</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt; : &lt;#3&gt; &lt;#4&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptConstructor"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>constructor (&lt;#1&gt;) {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClassSuper"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>super(&lt;#1&gt;);</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClassMethod"><l></l><l>method</l><list><l></l></list><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt; {&#xD;    &lt;#5&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTypeSciptClassMethod2"><l></l><l>method</l><list><l></l></list><l>void</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; &lt;#2&gt;(&lt;#3&gt;) : &lt;#4&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportObjectProperty"><l>this</l><l>property</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTypeSciptStringGeneric"><l>Array</l><l>string</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&lt;&lt;#2&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doProperties"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doValue"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>value="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportColor"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>color="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportPosition"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>position="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doPlaceholder"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>placeholder="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAutocapitalize"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>autocapitalize="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doInputmode"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>inputmode="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doRows"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>rows="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCols"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cols="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doShowCancelButton"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>showCancelButton="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCancelButtonText"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cancelButtonText="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doType3"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>type="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doDisabled"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>disabled="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAnimated"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>animated="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doDebounce"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>debounce="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doDisplayFormat"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>displayFormat="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doExpand"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>expand="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doFill"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>fill="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSize"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>size="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMultiple"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>multiple="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doOkText"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>okText="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCancelText"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cancelText="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doChecked"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>checked="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doName"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>name="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAllowEmptySelection"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>name="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doOutline"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>name="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSlot"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>slot="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doForceOverscroll"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>forceOverscroll="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doFullscreen"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>fullscreen="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollEvents"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollEvents="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollX"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollX="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollY"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollY="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doLines"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>lines="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doClass"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>class="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doColsize"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>colsize="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSize2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>size="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doInset"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>inset="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAlt"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>alt="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doVertical"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>vertical="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHorizontal"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>horizontal="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doType2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>type="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doActivated"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>activated="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSide"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>side="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCardbutton"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>cardbutton="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSide2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>side="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMenuId"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>menuId="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doContentId"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>contentId="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doType2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>type="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doAutoHide"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>autoHide="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMax"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>max="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doMin"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>min="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doStep"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>step="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doValueNumber"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>vlue="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doReversed"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>reversed="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doProgresstype"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>progresstype="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSpinnername"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>spinnerName="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doPaused"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>paused="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doScrollable"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>scrollable="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSwipeGesture"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>swipeGesture="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doLayout"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>layout="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doPager"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>pager="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doTappable"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>tappable="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doVisible"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>visible="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doStopPropagation"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>stopPropagation="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="bubble"><l>Hello!</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doButton"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doGrid"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-grid &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-grid&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCol"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-col &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCol2"><l></l><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-col size="&lt;#1&gt;" &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-col&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCol3"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-col class="&lt;#1&gt;"&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-col&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRow"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-row &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRow2"><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-row class="&lt;#1&gt;"&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-row&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCard"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardHeader"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-header&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardHeaderSubtitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-subtitle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-subtitle&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardHeaderTitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCardContent"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-card-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-card-content&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCheckBox"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-checkbox &lt;#1&gt; [(ngModel)]="&lt;#2&gt;"&gt;&lt;/ion-checkbox&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDatetime"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-datetime &lt;#1&gt;&gt;&lt;/ion-datetime&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doChip"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-chip &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-chip&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doLabel"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-label &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-label&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doContent"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-content &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-content&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFab"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-fab &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFabButton"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-fab-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFabList"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-fab-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-fab-list&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doIcon"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-icon name="&lt;#1&gt;" &lt;#2&gt;&gt;&lt;/ion-icon&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doIcon2"><l></l><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;ion-icon name="&lt;#1&gt;" &lt;#2&gt;&gt;&lt;/ion-icon&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doInput"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-input &lt;#1&gt;&gt;&lt;/ion-input&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTextarea"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-textarea &lt;#1&gt;&gt;&lt;/ion-textarea&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doList"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-list &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doListHeader"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-list-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-list-header&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doItem"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-item &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-item&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAvatar"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-avatar &lt;#1&gt;&gt;&#xD;  &lt;img src="&lt;#2&gt;"/&gt;&#xD;&lt;/ion-avatar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doThumbnail"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-thumbnail &lt;#1&gt;&gt;&#xD;  &lt;img src="&lt;#2&gt;"/&gt;&#xD;&lt;/ion-thumbnail&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doImg"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-img &lt;#1&gt; src="&lt;#2&gt;"&gt;&lt;/ion-img&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMenu"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-menu &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMenuButton"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-menu-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMenuToggle"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-menu-toggle &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-menu-toggle&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSplitPane"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-split-pane &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-split-pane&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doNote"><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-note&gt;&lt;#1&gt;&lt;/ion-note&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doNote2"><l></l><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-note color="&lt;#1&gt;"&gt;&lt;#2&gt;&lt;/ion-note&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSpinner"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-spinner &lt;#1&gt;&gt;&lt;/ion-spinner&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRadio"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l> &lt;ion-radio &lt;#1&gt; value="&lt;#2&gt;"&gt;&lt;/ion-radio&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRadioGroup1"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-radio-group &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-radio-group&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doRange"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-range &lt;#1&gt;&gt;&#xD;&lt;/ion-range&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSearchbar"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-searchbar &lt;#1&gt;&gt;&lt;/ion-searchbar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSegment"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-segment &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSegmentButton"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-segment-button &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-segment-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSelect"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-select &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-select&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSelectOption"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-select-option &lt;#1&gt;&gt;&lt;#2&gt;&lt;/ion-select-option&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doText"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-text &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-text&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doBackdrop"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-backdrop &lt;#1&gt;&gt;&#xD;&lt;/ion-backdrop&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doProgressBar"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-progress-bar &lt;#1&gt;&gt;&lt;/ion-progress-bar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReorderGroup"><list><l>false</l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-reorder-group &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder-group&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReorder1"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-reorder &lt;#1&gt;&gt;&#xD;  &lt;#2&gt;&#xD;&lt;/ion-reorder&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doReorder2"><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-reorder&gt;&#xD;  &lt;ion-item&gt;&#xD;    &lt;ion-label&gt;&#xD;      &lt;#1&gt;&#xD;    &lt;/ion-label&gt;&#xD;  &lt;/ion-item&gt;&#xD;&lt;/ion-reorder&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSlides"><list><l></l></list><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-slides &lt;#1&gt; [options]="&lt;#2&gt;"&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/ion-slides&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doSlide"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-slide &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-slide&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTabs"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-tabs &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tabs&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTabButton"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-tab-button tab="&lt;#1&gt;"&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-tab-button&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doToggle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-toggle &lt;#1&gt; [(ngModel)]="&lt;#2&gt;"&gt;&lt;/ion-toggle&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doToolbar"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-toolbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-toolbar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHeader"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-header &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-header&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doFooter"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-footer &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-footer&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doTitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doButtons"><l></l><l></l><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-buttons &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-buttons&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doNavbar"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-navbar &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-navbar&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doBadge"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;ion-badge &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ion-badge&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportNewList"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doDiv"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;div &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/div&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlTag"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlText"><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlH"><l><option>h1</option></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlBlockquote"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;blockquote &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/blockquote&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlIns"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;ins &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/ins&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlP"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;p &lt;#1&gt;&gt;&#xD;   &lt;#2&gt;&#xD;&lt;/p&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlDataList"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;datalist &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/datalist&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadTitle"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;title &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlEmptyTag"><l><option>hr</option></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlEmptyTag"><l><option>br</option></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHr"></block></script><list></list></block><l><option>code</option></l><l>&lt;hr&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlBr"></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;br&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlOption"><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;option &lt;#1&gt;&gt;&#xD;    &lt;#2&gt;&#xD;&lt;/option&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlJoin"><list><l></l></list></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlHeadProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlSourceProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlFramProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlTarget"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlRel2"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlSandbox"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlPreload"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlAutoplay"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlMuted"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlControls"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlMethod"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlAutocomplete"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlFormProperties1"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlHeadProperties1"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlLang"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>lang ="&lt;#1&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlTable1Properties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlMediaProperties"><l><option>src</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlFormProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlSvgProperties"><l></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; = "&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportHtmlTextProperties"><l>href</l><l>http://iot.ttu.edu.tw</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt; ="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportSimpleProperty"><l>novalidate</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlList1"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlList"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlSvg2"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlSvg"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt; /&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlText1"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlText2"><l></l><list><l></l></list><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMedia1"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doMedia2"><l></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlTable1"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlTable"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml"><list><l></l></list><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#2&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml2"><l><option>lang</option></l><l>en</l><script></script><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;!DOCTYPE HTML&gt;&#xD;&lt;html &lt;#1&gt;="&lt;#2&gt;"&gt;&#xD;  &lt;head&gt;&#xD;    &lt;#3&gt;&#xD;  &lt;/head&gt;&#xD;  &lt;body&gt;&#xD;    &lt;#4&gt;&#xD;  &lt;/body&gt;&#xD;&lt;/html&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadTitle2"><l>My First Html Page</l></block></script><list></list></block><l><option>code</option></l><l>&lt;title&gt; &lt;#1&gt; &lt;/title&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadBasic"><l></l><list><l></l></list><script></script></block><block s="doHtmlHeadBasic3"><l><option>base</option></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlHeadBasic4"><l>meta</l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml5Basic"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtml5Basic2"><l><option>h2</option></l><list></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doHtmlText2"><l></l><list><l></l></list><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt; &lt;#3&gt; &lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlForm"><l></l><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&#xD;    &lt;#3&gt;&#xD;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlForm1"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doHtmlFrame"><l></l><list><l></l></list><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;&lt;#1&gt; &lt;#2&gt;&gt;&lt;#3&gt;&lt;/&lt;#1&gt;&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBase"><list><l></l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBaseComma"><list><l>a</l></list><script></script></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt; {&#xD;    &lt;#2&gt;&#xD;}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCSSTagSelector"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorId"><l>id</l></block></autolambda><list></list></block><l><option>code</option></l><l>#&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorClass"><l>class</l></block></autolambda><list></list></block><l><option>code</option></l><l>.&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorTagClass"><l><option>p</option></l><l>class</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;.&lt;#2&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportColorRgba"><l>255</l><l>255</l><l>255</l><l>0.0</l></block></autolambda><list></list></block><l><option>code</option></l><l>rgba(&lt;#1&gt;,&lt;#2&gt;,&lt;#3&gt;,&lt;#4&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportBackgroundValue"><l> </l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportBorderValue"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorElement"><l><option>a</option></l><l><option>:visited</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&lt;#2&gt;&lt;#3&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doSelectorElement2"><l></l><l><option>:nth-child</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;&lt;#2&gt;(&lt;#3&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCSSSelectorOperator"><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="doCSSSelectorFunction"><l><option>:nth-child</option></l><l>2</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;(&lt;#2&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSProperty"><l></l><l></l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBorder"><l><option>border</option></l><l>2px solid powderblue</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSBackground"><l><option>background</option></l><l>linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSMarginPadding"><l>margin</l><l>25px 50px 75px 100px</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doCSSText"><l>text-align</l><l>center</l></block></script><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:&lt;#2&gt;;</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportStringInterpolation"><l>expr</l></block></autolambda><list></list></block><l><option>code</option></l><l>{{&lt;#1&gt;}}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportPropertyBinding"><l>Property binding</l></block></autolambda><list></list></block><l><option>code</option></l><l>[&lt;#1&gt;]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportEventBinding"><l>Event binding</l></block></autolambda><list></list></block><l><option>code</option></l><l>(&lt;#1&gt;)</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportTwoWayBinding"><l>Two way binding</l></block></autolambda><list></list></block><l><option>code</option></l><l>[(&lt;#1&gt;)]</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportAngularControlCommand"><l>*ngFor</l><l>let item of items</l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;="&lt;#2&gt;"</l></block><block s="doMapCodeOrHeader"><block s="reifyScript"><script><block s="doAngularComponent"><l><option>Component</option></l><list><l></l></list></block></script><list></list></block><l><option>code</option></l><l>@&lt;#1&gt;({&lt;#2&gt;)}</l></block><block s="doMapCodeOrHeader"><block s="reifyReporter"><autolambda><block s="reportAngularComponentKeyValue"><l><option>selector</option></l><l></l></block></autolambda><list></list></block><l><option>code</option></l><l>&lt;#1&gt;:"&lt;#2&gt;"</l></block></script></block-definition></blocks><variables><variable name="code"><l></l></variable><variable name="script"><context id="5589"><inputs></inputs><variables></variables><block s="reifyScript"><script></script><list></list></block><receiver><ref id="8"></ref></receiver><origin><ref id="8"></ref></origin><context id="5597"><inputs></inputs><variables></variables><receiver><ref id="8"></ref></receiver><origin><ref id="8"></ref></origin></context></context></variable></variables></project>';
    var codeEnd = '</script><list></list></block></custom-block></script></scripts></sprite></sprites>';
    code = '';
    var headendpost = htmlcode.indexOf('</head');
    if (headendpost > 5) {
        var metaindex = htmlcode.indexOf('<meta', 0);
        while (metaindex >= 0 && metaindex < headendpost) {
            var addindex = htmlcode.indexOf('>', metaindex + 1);
            var metaend = htmlcode.indexOf('</meta', metaindex + 1);
            if (metaend < 0 || ((metaend - addindex) < 5)) {
                htmlcode = htmlcode.substring(0, addindex) + '></meta>' + htmlcode.substring(addindex + 1);
            }
            metaindex = htmlcode.indexOf('<meta', metaindex + 1);
        }

        var linkindex = htmlcode.indexOf('<link', 0);
        while (linkindex >= 0 && linkindex < headendpost) {
            var addindex = htmlcode.indexOf('>', linkindex + 1);
            var metaend = htmlcode.indexOf('</link', linkindex + 1);
            if (metaend < 0 || ((metaend - addindex) < 5)) {
                htmlcode = htmlcode.substring(0, addindex) + '></link>' + htmlcode.substring(addindex + 1);
            }
            linkindex = htmlcode.indexOf('<link', linkindex + 1);
        }


        //var linkindex = htmlcode.indexOf('<link', 0);

    }
    htmlcode = htmlcode.replace('<!DOCTYPE HTML>', '').replace(new RegExp('<html', 'g'), '<html1').replace(new RegExp('</html', 'g'), '</html1').replace(new RegExp('<head', 'g'), '<head1').replace(new RegExp('</head', 'g'), '</head1').replace(new RegExp('<body', 'g'), '<body1').replace(new RegExp('</body', 'g'), '</body1').replace(new RegExp('<title', 'g'), '<title1').replace(new RegExp('</title', 'g'), '</title1').replace(new RegExp('<script', 'g'), '<script1').replace(new RegExp('</script', 'g'), '</script1').replace(new RegExp('<noscript', 'g'), '<noscript1').replace(new RegExp('</noscript', 'g'), '</noscript1').replace(new RegExp('<style', 'g'), '<style1').replace(new RegExp('</style', 'g'), '</style1').replace(new RegExp('<base', 'g'), '<base1').replace(new RegExp('</base', 'g'), '</base1').replace(new RegExp('<link', 'g'), '<link1').replace(new RegExp('</link', 'g'), '</link1').replace(new RegExp('<meta', 'g'), '<meta1').replace(new RegExp('</meta', 'g'), '</meta1');
    //htmlcode='<html lang="en"><head></head><body><div ></div></body></html>'
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlcode, "text/html");
    var test = this.myLoop(doc.body, '');
    //var test = doc.documentElement.innerHTML;
    code = test;
    return codeStar + code + codeEnd;
}

IDE_Morph.prototype.myLoop = function (x, z) {
    var i, y, xLen, txt;
    txt = "";
    x = x.childNodes;
    xLen = x.length;
    for (i = 0; i < xLen; i++) {
        y = x[i];
        var block = "";
        ychildNodesLen = y.childNodes.length;
        if (ychildNodesLen != 0) {
            if (y.children[0] != undefined) {
//		if(y.tagName != undefined){
                var z1 = y.children;
                var z2 = z1.length;
                //if(y.localName!='test'){
                //	if(z1.childNodes[0] != undefined){
                block = this.getBlock(y, z, 1);
                //	}else{
                //        block = this.getBlock(y,z,0);
                //	}
                //}

                //if(z2 > 1){
                //if( y.localName=='ion-thumbnail' || y.localName=='ion-avatar' ){
                //	txt += (block +this.myLoop(y,y.localName) +'</block>');
                //}else 
                if (y.localName != 'test') {
                    if (y.localName == 'head1') {
                        txt += (block + '' + this.myLoop(y, y.localName) + '</script><script>');
                    } else if (y.localName == 'body1') {
                        txt += (block + '' + this.myLoop(y, y.localName) + '');
                    } else {
                        var data = y.innerText.replace(/(^\s*)|(\s*$)/g, '');
                        if (data = '') {
                        } else {
                        }
                        txt += (block + '<script>' + this.myLoop(y, y.localName) + '</script></block>');
                    }
                }
                //}else{
                //    else if(y.localName=='test'){
                //		txt += (block +this.myLoop(y,y.localName));
                //	}else if(y.localName=='head1'){
                //		txt += (block +this.myLoop(y,y.localName) +'</script><script>');
                //	}else if(y.localName=='body1'){
                //		txt += (block +this.myLoop(y,y.localName));
                //   }else{
                //		txt += (block +this.myLoop(y,y.localName) +'</block>');
                //	}
                //}
//		}else{
//			txt += this.myLoop(y,y.localName);
//		}
            } else {
                block = this.getBlock(y, z, 0);
                //if((y.tagName=='IMG'&&(z=="ion-thumbnail"||z=="ion-avatar"))||y.tagName=='TEST'){
                //	txt += (block);
                //}else 
                if (y.tagName == "BASE1" || y.tagName == "LINK1" || y.tagName == "META1") {
                    txt += (block) + '</block>';
                } else if (y.localName == 'head1') {
                    txt += (block + this.myLoop(y, y.localName) + '</script><script>');
                } else if (y.localName == 'body1') {
                    txt += (block + this.myLoop(y, y.localName));
                    //}else if(y.tagName=="ION-ICON"){
                    //	txt += (block)+'</block>';
                } else {
                    if (y.localName == 'style1' || y.localName == 'script1') {
                        var data = y.innerText.replace(/(^\s*)|(\s*$)/g, '');
                        var textblock = '<block s="doHtmlText"><list><l>' + data + '</l></list></block>'
                        txt += (block + '<script>' + textblock + '</script></block>');
                    } else {
                        var data = y.innerText.replace(/(^\s*)|(\s*$)/g, '');
                        txt += (block + '<l>' + data + '</l></block>');
                    }
                }
                /*
                 if(y.nodeValue != null){
                 //var data = y.nodeValue.replace(/\s+/g,'');
                 var data = y.nodeValue.trim();
                 if(data != ""){
                 if(z =="script" || z =="style"){
                 txt += '<script><block s="doHtmlText"><list><l>'+data+'</l></list></block></script>';
                 }else{
                 txt += "<l>"+data+"</l>";
                 }
                 }
                 }else{
                 if(y.tagName != undefined){
                 if(y.localName!='test'){
                 block = this.getBlock(y,z,0);
                 }
                 if((y.tagName=='IMG'&&(z=="ion-thumbnail"||z=="ion-avatar"))||y.tagName=='TEST'){
                 txt += (block);
                 }else if(y.tagName=="BASE1" || y.tagName=="LINK1" || y.tagName=="META1"){
                 txt += (block)+'</block>';
                 }else{
                 txt += (block +'<l></l></block>');
                 }
                 }
                 }
                 */
            }
        } else {

            if (y.nodeValue != null) {
                //var data = y.nodeValue.replace(/\s+/g,'');
                var data = y.nodeValue.trim();
                data = data.replace(/(^\s*)|(\s*$)/g, '');
                if (data != "") {
                    if (y.nodeName != "#comment") {
                        txt += '<block s="doHtmlText"><list><l>' + data + '</l></list></block>';
                    }
                }
                /*
                 if(data != ""){
                 if(z =="script" || z =="style"){
                 txt += '<script><block s="doHtmlText"><list><l>'+data+'</l></list></block></script>';
                 }else{
                 txt += "<l>"+data+"</l>";
                 }
                 }
                 */
            } else {
                block = this.getBlock(y, z, 0);
                var data = y.innerText.replace(/(^\s*)|(\s*$)/g, '');
                txt += (block + '<l>' + data + '</l></block>');
            }

        }
    }
    return txt;
}

IDE_Morph.prototype.getBlock = function (tag, tag2, type) {
    var attrs = tag.attributes;
    var attrsLen = attrs.length;
    var attText = '';
    if ((tag.localName == "head1" || tag.localName == "body1") && tag2 == 'html1') {
        return '';
    }
    //if(tag.localName=="ion-toggle" || tag.localName=="ion-checkbox" || tag.localName=="ion-radio" || tag.localName=="ion-tab-button"){
    //	if(attrsLen>1){
    //	    attText='<list>';
    //    }else{
    //		attText='<list><l></l></list>';
    //	}
    //}else 
    if (tag.localName == "img") {
        //	if(tag2=="ion-thumbnail" || tag2=="ion-avatar"){
        //		attText='';
        //	}else{
        if (attrsLen > 0) {
            attText = '<list>';
        } else {
            attText = '<list><l></l></list>';
        }
        //	}
        //}else if(tag.localName=="ion-thumbnail" || tag.localName=="ion-avatar"){
        //	if(attrsLen>0){
        //	    attText='<list>';
        //    }else{
        //		attText='<list><l></l></list>';
        //	}
    } else if (tag.localName == "title1") {
        attText = '';
    } else if (tag.localName == "br" || tag.localName == "hr") {
        attText = '';
        //}else if(tag.localName=="ion-icon"){
        //	attText='';
    } else {
        if (attrsLen > 0) {
            attText = '<list>';
        } else {
            attText = '<list><l></l></list>';
        }
    }
    var otherName = '';
    var otherValue = '';
    for (i = 0; i < attrsLen; i++) {
        var attr = attrs[i];
        var attrValue = '';
        if (tag.localName.indexOf("ion-") == 0) {
            attrValue = this.getIonPropertiesBlock(attr.name, attr.value, tag.localName);
            attText += attrValue;
        }
        if (attrValue == '') {
            //if(tag.localName=="ion-toggle" || tag.localName=="ion-checkbox" || tag.localName=="ion-thumbnail" || tag.localName=="ion-avatar"){
            //	if(attr.name=="[(ngmodel)]"){
            //		otherValue=attr.value;
            //	}else{
            //		attrValue = '<l>'+ attr.name+'="'+attr.value + '"</l>';
            //        attText += attrValue;
            //	}
            //} else 
            if (tag.localName == "ion-radio") {
                if (attr.name == "value") {
                    otherValue = attr.value;
                } else {
                    attrValue = '<l>' + attr.name + '="' + attr.value + '"</l>';
                    attText += attrValue;
                }
                //}else if(tag.localName=="ion-slides"){
                //	if(attr.name=="[options]"){
                //		otherValue=attr.value;
                //	}else{
                //		attrValue = '<l>'+ attr.name+'="'+attr.value + '"</l>';
                //      attText += attrValue;
                //	}
            } else if (tag.localName == "ion-tab-button") {
                if (attr.name == "tab") {
                    otherValue = attr.value;
                } else {
                    attrValue = '<l>' + attr.name + '="' + attr.value + '"</l>';
                    attText += attrValue;
                }
                //}else if(tag.localName=="ion-img" || tag.localName=="ion-thumbnail" || tag.localName=="ion-avatar" || tag.localName=="img"){
                //	if(attr.name=="src"){
                //		otherValue=attr.value;
                //	}else{
                //		attrValue = '<l>'+ attr.name+'="'+attr.value + '"</l>';
                //        attText += attrValue;
                //	}
            } else if (tag.localName == "html1") {
                //if(attr.name=="lang"){
                //	otherValue=attr.value;
                //}else{
                attrValue = '<l>' + attr.name + '="' + attr.value + '"</l>';
                attText += attrValue;
                //}
            } else {
                attrValue = '<l>' + attr.name + '="' + attr.value + '"</l>';
                attText += attrValue;
            }
        }
    }

    if (tag.localName == "html1") {
        if (attrsLen > 0) {
            attText += '</list>';
        } else {
            //if(tag.localName=="ion-slides"){
            //    attText+='<l></l>';
            //}
        }
    } else if (tag.localName == "img") {
        //if(tag2=="ion-thumbnail" || tag2=="ion-avatar"){
        //	attText='';
        //}else{
        if (attrsLen > 0) {
            attText += '</list>';
        }
        //}
        //}else if(tag.localName=="ion-thumbnail" || tag.localName=="ion-avatar" ){
        //	if(attrsLen>0){
        //	    attText+='</list>';
        //    }
        //}else if(tag.localName=="ion-icon"){
        //	attText+='<list><l></l></list>';
    } else {
        if (attrsLen > 0) {
            attText += '</list>';
        }
    }
    /*
     if(tag.localName=="img" && (tag2=="ion-thumbnail" || tag2=="ion-avatar")){
     attText+="<l>"+otherValue+"</l>";
     return attText;
     }
     */
    if (otherValue != '') {
        attText += "<l>" + otherValue + "</l>";
    }
    var block = "";
    var blockName = '""';
    var tagName = tag.tagName.toLowerCase();
    /*
     if(tagName=="ion-header"){
     blockName = '"doHeader"';
     }else if(tagName=="ion-toolbar"){
     blockName = '"doToolbar"';
     }else if(tagName=="ion-title"){
     blockName = '"doTitle"';
     }else if(tagName=="ion-content"){
     blockName = '"doContent"';
     }else if(tagName=="ion-label"){
     blockName = '"doLabel"';
     }else if(tagName=="ion-text"){
     blockName = '"doText"';
     }else if(tagName=="ion-input"){
     blockName = '"doInput"';
     }else if(tagName=="ion-textarea"){
     blockName = '"doTextarea"';
     }else if(tagName=="ion-searchbar"){
     blockName = '"doSearchbar"';
     }else if(tagName=="ion-datetime"){
     blockName = '"doDatetime"';
     }else if(tagName=="ion-item"){
     blockName = '"doItem"';
     }else if(tagName=="ion-badge"){
     blockName = '"doBadge"';
     }else if(tagName=="ion-grid"){
     blockName = '"doGrid"';
     }else if(tagName=="ion-row"){
     blockName = '"doRow"';
     }else if(tagName=="ion-col"){
     blockName = '"doCol"';
     }else if(tagName=="ion-list"){
     blockName = '"doList"';
     }else if(tagName=="ion-list-header"){
     blockName = '"doListHeader"';
     }else if(tagName=="ion-img"){
     blockName = '"doImg"';
     }else if(tagName=="ion-button"){
     blockName = '"doButton"';
     }else if(tagName=="ion-checkbox"){
     blockName = '"doCheckBox"';
     }else if(tagName=="ion-radio"){
     blockName = '"doRadio"';
     }else if(tagName=="ion-radio-group"){
     blockName = '"doRadioGroup1"';
     }else if(tagName=="ion-select"){
     blockName = '"doSelect"';
     }else if(tagName=="ion-select-option"){
     blockName = '"doSelectOption"';
     }else if(tagName=="ion-item"){
     blockName = '"doItem"';
     }else if(tagName=="ion-item-divider"){
     blockName = '"doItemDivider"';
     }else if(tagName=="ion-item-group"){
     blockName = '"doItemGroup"';
     }else if(tagName=="ion-item-sliding"){
     blockName = '"doItemSliding"';
     }else if(tagName=="ion-item-options"){
     blockName = '"doItemOptions"';
     }else if(tagName=="ion-item-option"){
     blockName = '"doItemOption"';
     }else if(tagName=="ion-note"){
     blockName = '"doNote"';
     }else if(tagName=="ion-refresh"){
     blockName = '"doRefresher"';
     }else if(tagName=="ion-refresh-content"){
     blockName = '"doRefresherContent"';
     }else if(tagName=="ion-icon"){
     blockName = '"doIcon"';
     //	}else if(tagName=="div"){
     //		blockName = '"doDiv"';
     }else if(tagName=="ion-chip"){
     blockName = '"doChip"';
     }else if(tagName=="ion-toggle"){
     blockName = '"doToggle"';
     }else if(tagName=="ion-avatar"){
     blockName = '"doAvatar"';
     }else if(tagName=="ion-thumbnail"){
     blockName = '"doThumbnail"';
     }else if(tagName=="ion-card"){
     blockName = '"doCard"';
     }else if(tagName=="ion-card-header"){
     blockName = '"doCardHeader"';
     }else if(tagName=="ion-card-subtitle"){
     blockName = '"doCardHeaderSubtitle"';
     }else if(tagName=="ion-card-title"){
     blockName = '"doCardHeaderTitle"';
     }else if(tagName=="ion-card-content"){
     blockName = '"doCardContent"';
     }else if(tagName=="ion-fab"){
     blockName = '"doFab"';
     }else if(tagName=="ion-fab-button"){
     blockName = '"doFabButton"';
     }else if(tagName=="ion-fab-list"){
     blockName = '"doFabList"';
     }else if(tagName=="ion-menu"){
     blockName = '"doMenu"';
     }else if(tagName=="ion-menu-button"){
     blockName = '"doMenuButton"';
     }else if(tagName=="ion-menu-toggle"){
     blockName = '"doMenuToggle"';
     }else if(tagName=="ion-split-pane"){
     blockName = '"doSplitPane"';
     }else if(tagName=="ion-backdrop"){
     blockName = '"doBackdrop"';
     }else if(tagName=="ion-progress-bar"){
     blockName = '"doProgressBar"';
     }else if(tagName=="ion-spinner"){
     blockName = '"doSpinner"';
     }else if(tagName=="ion-range"){
     blockName = '"doRange"';
     }else if(tagName=="ion-reorder"){
     blockName = '"doReorder1"';
     }else if(tagName=="ion-reorder-group"){
     blockName = '"doReorderGroup"';
     }else if(tagName=="ion-segment"){
     blockName = '"doSegment"';
     }else if(tagName=="ion-segment-button"){
     blockName = '"doSegmentButton"';
     }else if(tagName=="ion-slides"){
     blockName = '"doSlides"';
     }else if(tagName=="ion-slide"){
     blockName = '"doSlide"';
     }else if(tagName=="ion-tabs"){
     blockName = '"doTabs"';
     }else if(tagName=="ion-tab-button"){
     blockName = '"doTabButton1"';
     }else if(tagName=="ion-navbar"){
     blockName = '"doNavbar"';
     }else if(tagName=="ion-footer"){
     blockName = '"doFooter"';
     }else if(tagName=="ion-back-button"){
     blockName = '"doBackButton"';
     
     }else 
     */
    if (tagName == "ion-app" || tagName == "ion-header" ||
            tagName == "ion-content" || tagName == "ion-footer" || tagName == "ion-navbar") {
        var blocksname = '"doIonicContainer"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "ion-menu-button" || tagName == "ion-menu-toggle" ||
            tagName == "ion-back-button") {
        var blocksname = '"doIonicContainer"';
        if (type == 1) {
            blocksname = '"doIonicContainer"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-card-title" || tagName == "ion-card-subtitle") {
        var blocksname = '"doIonicCard"';
        if (type == 1) {
            blocksname = '"doIonicCard"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-card" || tagName == "ion-card-header" || tagName == "ion-card-content") {
        var blocksname = '"doIonicCard"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-chip") {
        var blocksname = '"doIonicChip"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-fab" || tagName == "ion-fab-list" || tagName == "ion-fab-button") {
        var blocksname = '"doIonicFloatingActionButton"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-grid" || tagName == "ion-row" || tagName == "ion-col") {
        var blocksname = '"doIonicGrid"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-infinite-scroll" || tagName == "ion-infinite-scroll-content") {
        var blocksname = '"doIonicInfiniteScroll"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-item" || tagName == "ion-item-group" || tagName == "ion-item-divider" ||
            tagName == "ion-item-sliding" || tagName == "ion-item-options" || tagName == "ion-item-option") {
        var blocksname = '"doIonicItem"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "ion-list-header") {
        var blocksname = '"doIonicList"';
        if (type == 1) {
            blocksname = '"doIonicList"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-list" || tagName == "ion-virtual-scroll" || tagName == "ion-radio-group") {
        var blocksname = '"doIonicList"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-avatar" || tagName == "ion-thumbnail") {
        var blocksname = '"doIonicMedia"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-split-pane" || tagName == "ion-menu") {
        var blocksname = '"doIonicMenu"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-reorder-group" || tagName == "ion-reorder") {
        var blocksname = '"doIonicReorder"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-router" || tagName == "ion-router-outlet") {
        var blocksname = '"doIonicRouter"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-segment-button") {
        var blocksname = '"doIonicSegmentButton"';
        if (type == 1) {
            blocksname = '"doIonicSegmentButton"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-segment" || tagName == "ion-segment-button") {
        var blocksname = '"doIonicSegmentButton"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-slides" || tagName == "ion-slide") {
        var blocksname = '"doIonicSlides"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-select-option") {
        var blocksname = '"doIonicSelect"';
        if (type == 1) {
            blocksname = '"doIonicSelect"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-select") {
        var blocksname = '"doIonicSelect"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';

    } else if (tagName == "ion-tabs" || tagName == "ion-tab" || tagName == "ion-tab-bar" ||
            tagName == "ion-tab-bar" || tagName == "ion-tab-button") {
        var blocksname = '"doIonicTabs"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "ion-button" || tagName == "ion-title" || tagName == "ion-label") {
        var blocksname = '"doIonicToolbar"';
        if (type == 1) {
            blocksname = '"doIonicToolbar"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "ion-toolbar") {
        var blocksname = '"doIonicToolbar"';
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "ion-datetime" || tagName == "ion-input" ||
            tagName == "ion-textarea" || tagName == "ion-range" || tagName == "ion-searchbar" || tagName == "ion-icon" ||
            tagName == "ion-img" || tagName == "ion-radio" || tagName == "ion-toggle" ||
            tagName == "ion-menu-button" || tagName == "ion-menu-toggle" ||
            tagName == "ion-modal" || tagName == "ion-backdrop" || tagName == "ion-nav" || tagName == "ion-nav-link" ||
            tagName == "ion-popover" || tagName == "ion-loading" || tagName == "ion-progress-bar" || tagName == "ion-spinner" ||
            tagName == "ion-route" || tagName == "ion-router-link" || tagName == "ion-route-redirect" || tagName == "ion-ripple-effect" ||
            tagName == "ion-back-button" || tagName == "ion-badge" || tagName == "ion-card-title" || tagName == "ion-card-subtitle" ||
            tagName == "ion-note" || tagName == "ion-reorder" ||
            tagName == "ion-text" ||
            tagName == "ion-segment-button" || tagName == "ion-select-option" ||
            tagName == "ion-searchbar" || tagName == "ion-checkbox") {
        var blocksname = '"doIonicContainer"';
        if (type == 1) {
            blocksname = '"doIonicContainer"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "title1") {
        blockName = '"doHtmlHeadTitle2"';
    } else if (tagName == "br" || tagName == "hr") {
        blockName = '"doHtmlEmptyTag"><l>' + tagName + '</l';
    } else if (tagName == "script1" || tagName == "noscript1" || tagName == "style1") {
        tagName = tagName.replace("1", "");
        blockName = '"doHtmlHeadBasic"><l>' + tagName + '</l';
    } else if (tagName == "base1" || tagName == "link1" || tagName == "meta1") {
        tagName = tagName.replace("1", "");
        blockName = '"doHtmlHeadBasic4"><l>' + tagName + '</l';
    } else if (tagName == "h1" || tagName == "h2" ||
            tagName == "h3" || tagName == "h4" || tagName == "h5" || tagName == "h6" ||
            tagName == "p" || tagName == "a" || tagName == "pre" || tagName == "blockquote" ||
            tagName == "code" || tagName == "kbd" || tagName == "samp" || tagName == "var" ||
            tagName == "span" || tagName == "b" || tagName == "em" || tagName == "i" ||
            tagName == "mark" || tagName == "small" || tagName == "strong" || tagName == "del" ||
            tagName == "ins") {
        var blocksname = '"doHtml5Basic"';
        if (type == 1) {
            blocksname = '"doHtml5Basic"';
        } else if (type == 0) {
            blocksname = '"doHtml5Basic2"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "div" || tagName == "article" || tagName == "aside" || tagName == "details" ||
            tagName == "footer" || tagName == "figcaption" || tagName == "figure" || tagName == "header" ||
            tagName == "main" || tagName == "mark" || tagName == "nav" || tagName == "section" ||
            tagName == "summary" || tagName == "time" || tagName == "h1" || tagName == "h2" ||
            tagName == "h3" || tagName == "h4" || tagName == "h5" || tagName == "h6" ||
            tagName == "p" || tagName == "a" || tagName == "pre" || tagName == "blockquote" ||
            tagName == "code" || tagName == "kbd" || tagName == "samp" || tagName == "var" ||
            tagName == "span" || tagName == "b" || tagName == "em" || tagName == "i" ||
            tagName == "mark" || tagName == "small" || tagName == "strong" || tagName == "del" ||
            tagName == "ins" || tagName == "sub" || tagName == "sup" || tagName == "abbr" ||
            tagName == "address" || tagName == "bdo" || tagName == "cite" || tagName == "q"
            ) {
        var blocksname = '"doHtml5Basic"';
        if (type == 1) {
            blocksname = '"doHtml5Basic"';
        } else if (type == 0) {
            blocksname = '"doHtml5Basic2"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
//	}else if(tagName=="ul" || tagName=="ol" || tagName=="li" || tagName=="dl"||
//         tagName=="dt" || tagName=="dd"
//		 ){
//		blockName = '"doHtmlList1"><l><option>'+tagName+'</option></l';
    } else if (tagName == "ul" || tagName == "ol" || tagName == "li" || tagName == "dl" ||
            tagName == "dt" || tagName == "dd" || tagName == "th" || tagName == "td"
            ) {
        var blocksname = '"doHtmlList1"';
        if (type == 1) {
            blocksname = '"doHtmlList1"';
        } else if (type == 0) {
            blocksname = '"doHtmlList"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "table" || tagName == "colgroup" || tagName == "col" || tagName == "tr" ||
            tagName == "thead" || tagName == "tbody" || tagName == "tfoot"
            ) {
        var blocksname = '"doHtmlTable1"';
        if (type == 1) {
            blocksname = '"doHtmlTable1"';
        } else if (type == 0) {
            blocksname = '"doHtmlTable"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "form" || tagName == "button" || tagName == "datalist" || tagName == "fieldset" ||
            tagName == "input" || tagName == "label" || tagName == "legend" || tagName == "optgroup" ||
            tagName == "option" || tagName == "output" || tagName == "select" || tagName == "textarea"
            ) {
        var blocksname = '"doHtmlForm"';
        if (type == 1) {
            blocksname = '"doHtmlForm"';
        } else if (type == 0) {
            blocksname = '"doHtmlForm1"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "iframe" || tagName == "embed" || tagName == "video" || tagName == "track" ||
            tagName == "audio" || tagName == "img" || tagName == "map" || tagName == "area" ||
            tagName == "source" || tagName == "object" || tagName == "param" || tagName == "picture"
            ) {
        var blocksname = '"doMedia1"';
        if (type == 1) {
            blocksname = '"doMedia1"';
        } else if (type == 0) {
            blocksname = '"doMedia"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "canvas" || tagName == "svg" || tagName == "circle" || tagName == "rect" ||
            tagName == "polygon" || tagName == "defs" || tagName == "linearGradient" || tagName == "stop" ||
            tagName == "ellipse" || tagName == "text"
            ) {
        var blocksname = '"doHtmlSvg2"';
        if (type == 1) {
            blocksname = '"doHtmlSvg2"';
        } else if (type == 0) {
            blocksname = '"doHtmlSvg"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    } else if (tagName == "html1") {
        blockName = '"doHtml"';
    } else {
        var blocksname = '"doIonicContainer"';
        if (type == 1) {
            blocksname = '"doIonicContainer"';
        } else if (type == 0) {
            blocksname = '"doIonicControl"';
        }
        blockName = blocksname + '><l><option>' + tagName + '</option></l';
    }




    block = '<block s=' + blockName + '>' + attText;
    return block;
}

IDE_Morph.prototype.getIonPropertiesBlock = function (name, value, tagName) {
    var block = '';
    var blockvalue = '';
    blockvalue = value;
    if (name == 'color') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="reportColor"><l>' + blockvalue + '</l></block>';
    } else if (name == 'slot') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doSlot"><l>' + blockvalue + '</l></block>';
    } else if (name == 'lines') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doSlot"><l>' + blockvalue + '</l></block>';
    } else if (name == 'class') {
        block = '<block s="doClass"><l>' + blockvalue + '</l></block>';
    } else if (name == 'size') {
        if (tagName == "ion-grid" || tagName == "ion-row" || tagName == "ion-col") {
            block = '<block s="doSize2"><l>' + blockvalue + '</l></block>';
        } else {
            if (value != '') {
                blockvalue = '<option>' + value + '</option>';
            }
            block = '<block s="doSize"><l>' + blockvalue + '</l></block>';
        }
    } else if (name == 'position') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="reportPosition"><l>' + blockvalue + '</l></block>';
    } else if (name == 'multiple') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doMultiple"><l>' + blockvalue + '</l></block>';
    } else if (name == 'value') {
        block = '<block s="doValue"><l>' + blockvalue + '</l></block>';
    } else if (name == 'name') {
        if (tagName == 'ion-icon') {
            block = '<l>' + blockvalue + '</l>';
        } else {
            block = '<block s="doName"><l>' + blockvalue + '</l></block>';
        }
    } else if (name == 'placeholder') {
        block = '<block s="doPlaceholder"><l>' + blockvalue + '</l></block>';
    } else if (name == 'autocapitalize') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doAutocapitalize"><l>' + blockvalue + '</l></block>';
    } else if (name == 'inputmode') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doInputmode"><l>' + blockvalue + '</l></block>';
    } else if (name == 'rows') {
        block = '<block s="doRows"><l>' + blockvalue + '</l></block>';
    } else if (name == 'cols') {
        block = '<block s="doCols"><l>' + blockvalue + '</l></block>';
    } else if (name == 'showcancelbutton') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doShowCancelButton"><l>' + blockvalue + '</l></block>';
    } else if (name == 'cancelbuttontext') {
        block = '<block s="doCancelButtonText"><l>' + blockvalue + '</l></block>';
    } else if (name == 'oktext') {
        block = '<block s="doOkText"><l>' + blockvalue + '</l></block>';
    } else if (name == 'canceltext') {
        block = '<block s="doCancelText"><l>' + blockvalue + '</l></block>';
    } else if (name == 'type') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        var s = ''
        if (tagName == 'ion-searchbar') {
            s = 'doType3';
        } else {
            s = 'doType2';
        }
        block = '<block s="' + s + '"><l>' + blockvalue + '</l></block>';
    } else if (name == 'disabled') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doDisabled"><l>' + blockvalue + '</l></block>';
    } else if (name == 'animated') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doAnimated"><l>' + blockvalue + '</l></block>';
    } else if (name == 'debounce') {
        block = '<block s="doDebounce"><l>' + blockvalue + '</l></block>';
    } else if (name == 'displayformat') {
        block = '<block s="doDisplayFormat"><l>' + blockvalue + '</l></block>';
    } else if (name == 'expand') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doExpand"><l>' + blockvalue + '</l></block>';
    } else if (name == 'fill') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doFill"><l>' + blockvalue + '</l></block>';
    } else if (name == 'checked') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doChecked"><l>' + blockvalue + '</l></block>';
    } else if (name == 'allowemptyselection') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doAllowEmptySelection"><l>' + blockvalue + '</l></block>';
    } else if (name == 'outline') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doOutline"><l>' + blockvalue + '</l></block>';
    } else if (name == 'forceoverscroll') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doForceOverscroll"><l>' + blockvalue + '</l></block>';
    } else if (name == 'fullscreen') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doFullscreen"><l>' + blockvalue + '</l></block>';
    } else if (name == 'scrollevents') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doScrollEvents"><l>' + blockvalue + '</l></block>';
    } else if (name == 'scrollx') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doScrollX"><l>' + blockvalue + '</l></block>';
    } else if (name == 'scrolly') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doScrollY"><l>' + blockvalue + '</l></block>';
    } else if (name == 'colsize') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doColsize"><l>' + blockvalue + '</l></block>';
    } else if (name == 'inset') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doInset"><l>' + blockvalue + '</l></block>';
    } else if (name == 'alt') {
        block = '<block s="doAlt"><l>' + blockvalue + '</l></block>';
    } else if (name == 'vertical') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doVertical"><l>' + blockvalue + '</l></block>';
    } else if (name == 'horizontal') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doHorizontal"><l>' + blockvalue + '</l></block>';
    } else if (name == 'activated') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doActivated"><l>' + blockvalue + '</l></block>';
    } else if (name == 'side') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        var s = ''
        if (tagName == 'ion-menu') {
            s = 'doSide';
        } else {
            s = 'doSide2';
        }
        block = '<block s="' + s + '"><l>' + blockvalue + '</l></block>';
    } else if (name == 'menuid') {
        block = '<block s="doMenuId"><l>' + blockvalue + '</l></block>';
    } else if (name == 'menu') {
        block = '<block s="doMenu"><l>' + blockvalue + '</l></block>';
    } else if (name == 'contentid') {
        block = '<block s="doContentId"><l>' + blockvalue + '</l></block>';
    } else if (name == 'autohide') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doAutoHide"><l>' + blockvalue + '</l></block>';
    } else if (name == 'max') {
        block = '<block s="doMax"><l>' + blockvalue + '</l></block>';
    } else if (name == 'min') {
        block = '<block s="doMin"><l>' + blockvalue + '</l></block>';
    } else if (name == 'step') {
        block = '<block s="doStep"><l>' + blockvalue + '</l></block>';
    } else if (name == 'reversed') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doReversed"><l>' + blockvalue + '</l></block>';
    } else if (name == 'progresstype') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doProgresstype"><l>' + blockvalue + '</l></block>';
    } else if (name == 'spinnername') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doSpinnername"><l>' + blockvalue + '</l></block>';
    } else if (name == 'paused') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doPaused"><l>' + blockvalue + '</l></block>';
    } else if (name == 'swipegesture') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doSwipeGesture"><l>' + blockvalue + '</l></block>';
    } else if (name == 'pager') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doPager"><l>' + blockvalue + '</l></block>';
    } else if (name == 'tappable') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doTappable"><l>' + blockvalue + '</l></block>';
    } else if (name == 'stoppropagation') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doStopPropagation"><l>' + blockvalue + '</l></block>';
    } else if (name == 'cardbutton') {
        if (value != '') {
            blockvalue = '<option>' + value + '</option>';
        }
        block = '<block s="doCardbutton"><l>' + blockvalue + '</l></block>';
    }


    return block;
}

//去除前後(左右)空白
String.prototype.trim = function () {
//    alert(this);
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}

// ProjectDialogMorph filter field

ProjectDialogMorph.prototype.buildFilterField = function () {
    var myself = this;

    this.filterField = new InputFieldMorph('');
    this.magnifyingGlass = new SymbolMorph(
            'magnifyingGlass',
            this.filterField.height(),
            this.titleBarColor.darker(50)
            );

    this.body.add(this.magnifyingGlass);
    this.body.add(this.filterField);

    this.filterField.reactToInput = function (evt) {
        var text = this.getValue();

        myself.listField.elements =
                myself.projectList.filter(aProject => {
                    var name = aProject.projectname || aProject.name || aProject.ProjectName,
                            notes = aProject.notes || '';
                    return name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                            notes.toLowerCase().indexOf(text.toLowerCase()) > -1;
                });

        if (myself.listField.elements.length === 0) {
            myself.listField.elements.push('(no matches)');
        }

        myself.clearDetails();
        myself.listField.buildListContents();
        myself.fixListFieldItemColors();
        myself.listField.adjustScrollBars();
        myself.listField.scrollY(myself.listField.top());
        myself.fixLayout();
    };
};

IDE_Morph.prototype.exportProject = function (name) {
    // Export project XML, saving a file to disk
    var menu, str;
    if (name) {
        name = this.setProjectName(name);
        this.scene.captureGlobalSettings();
        try {
            menu = this.showMessage('Exporting');
            str = this.serializer.serialize(
                    new Project(this.scenes, this.scene)
                    );
            let filestr = '<files>';
            for (var i = 0; i < this.sprites.contents.length; i++) {
                const key = this.sprites.contents[i].name;
                let codetext = fileListData[key];
                const type = fileListType[key];
                let file = '<file>'
                //codetext = btoa(unescape(encodeURIComponent(codetext)));
                if (type != "undefined" && codetext != "undefined") {
                    file = file + '<filename>' + key + '.' + type + '</filename>';
                    file = file + '<filecode>' + codetext + '</filecode>';
                    filestr = filestr + file + '</file>';
                }
            }
            filestr = filestr + '</files>';
            str = str + filestr;
            this.saveXMLAs(str, name);
            menu.destroy();
            this.recordSavedChanges();
            this.showMessage('Exported!', 1);
        } catch (err) {
            if (Process.prototype.isCatchingErrors) {
                this.showMessage('Export failed: ' + err);
            } else {
                throw err;
            }
        }
    }
};

IDE_Morph.prototype.createPalette = function (forSearching) {
    // assumes that the logo pane has already been created
    // needs the categories pane for layout
    var myself = this,
            vScrollAction;

    if (this.palette) {
        this.palette.destroy();
    }

    if (forSearching) {
        this.palette = new ScrollFrameMorph(
                null,
                null,
                this.currentSprite.sliderColor
                );
        this.palette.isForSearching = true;

        // search toolbar (floating cancel button):
        /* commented out for now
         this.palette.toolBar = new PushButtonMorph(
         this,
         () => {
         this.refreshPalette();
         this.palette.adjustScrollBars();
         },
         new SymbolMorph("magnifierOutline", 16)
         );
         this.palette.toolBar.alpha = 0.2;
         this.palette.toolBar.padding = 1;
         // this.palette.toolBar.hint = 'Cancel';
         this.palette.toolBar.labelShadowColor = new Color(140, 140, 140);
         this.palette.toolBar.fixLayout();
         this.palette.add(this.palette.toolBar);
         */

    } else {
        this.palette = this.currentSprite.palette(this.currentCategory);
    }
    this.palette.isDraggable = false;
    this.palette.acceptsDrops = true;
    this.palette.enableAutoScrolling = false;
    this.palette.contents.acceptsDrops = false;

    if (this.scene.unifiedPalette) {
        this.palette.adjustScrollBars = function () {
            ScrollFrameMorph.prototype.adjustScrollBars.call(this);
            myself.categories.refresh();
        };

        vScrollAction = this.palette.vBar.action;
        this.palette.vBar.action = function (num) {
            vScrollAction(num);
            myself.categories.buttons.forEach(each => each.refresh());
        };
    }

    this.palette.reactToDropOf = (droppedMorph, hand) => {
        if (droppedMorph instanceof DialogBoxMorph) {
            this.world().add(droppedMorph);
        } else if (droppedMorph instanceof SpriteMorph) {
            this.removeSprite(droppedMorph);
        } else if (droppedMorph instanceof SpriteIconMorph) {
            droppedMorph.destroy();
            this.removeSprite(droppedMorph.object);
        } else if (droppedMorph instanceof CostumeIconMorph) {
            // this.currentSprite.wearCostume(null); // do we need this?
            droppedMorph.perish(myself.isAnimating ? 200 : 0);
        } else if (droppedMorph instanceof BlockMorph) {
            this.stage.threads.stopAllForBlock(droppedMorph);
            if (hand && hand.grabOrigin.origin instanceof ScriptsMorph) {
                hand.grabOrigin.origin.clearDropInfo();
                hand.grabOrigin.origin.lastDroppedBlock = droppedMorph;
                hand.grabOrigin.origin.recordDrop(hand.grabOrigin);
            }
            droppedMorph.perish(myself.isAnimating ? 200 : 0);
            CommandBlockMorph.prototype.runblock("test");
        } else {
            droppedMorph.perish(myself.isAnimating ? 200 : 0);
        }
    };

    this.palette.contents.reactToDropOf = (droppedMorph) => {
        // for "undrop" operation
        if (droppedMorph instanceof BlockMorph) {
            droppedMorph.destroy();
        }
    };

    this.palette.setWidth(this.logo.width());
    this.add(this.palette);
    return this.palette;
};