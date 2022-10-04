/*

    cloud.js

    a backend API for SNAP!

    written by Jens Mönig

    Copyright (C) 2015 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// Global settings /////////////////////////////////////////////////////

/*global modules, IDE_Morph, SnapSerializer, hex_sha512, alert, nop,
localize*/

modules.cloud = '2015-December-15';

// Global stuff

var Cloud;
var SnapCloud = new Cloud(
    'https://iot.ttu.edu.tw:8181/SnapCloudB/webresources'
);


// Cloud: Snap! API

Cloud.prototype.signup = function (
    username,
    password,
    birthdate,
    birthdyear,
    email,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
  
    var request = new XMLHttpRequest(),
        xhttp = new XMLHttpRequest(),
        myself = this;
		
	if (birthdate == null){
		birthdate = "January"
	}
	if(birthdyear==null){
		birthdyear = "< 2000"
	}
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'https://')
                + this.url + '/entity.user/exist/'
                + username,
            true
        );

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var pws = calcMD5(password);
                if (request.responseText === "0") {
                   xhttp.open("POST", "https://iot.ttu.edu.tw:8181/SnapCloudB/webresources/entity.user", true);
                   xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                   xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
                   xhttp.send(JSON.stringify({account : username, password : pws, email : email,
                   birthdate : birthdate, birthdyear : birthdyear}));
                   callBack.call(
                            null,
                            'Signup'
                    );
                } else {
                    errorCall.call(
                        null,
                        localize('This user name already exists')
                    );
                }
            }
        };
        request.send();
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.signupTest = function (
    username,
    password,
    birthdate,
    birthdyear,
    email,
	subscription,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
  
    var request = new XMLHttpRequest(),
        xhttp = new XMLHttpRequest(),
        myself = this;
		
	if (birthdate == null){
		birthdate = "January"
	}
	if(birthdyear==null){
		birthdyear = "< 2000"
	}
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'https://')
                + this.url + '/entity.user/exist/'
                + username,
            true
        );

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var pws = calcMD5(password);
                if (request.responseText === "0") {
                   xhttp.open("POST", "https://iot.ttu.edu.tw:8181/SnapCloudB/webresources/entity.user", true);
                   xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                   xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
                   xhttp.send(JSON.stringify({account : username, password : pws, email : email,
                   birthdate : birthdate, birthdyear : birthdyear, subscription: subscription}));
                   callBack.call(
                            null,
                            'Signup'
                    );
                } else {
                    errorCall.call(
                        null,
                        localize('This user name already exists')
                    );
                }
            }
        };
        request.send();
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.setSubscription = function (
    username,
	subscription,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        var stickyUrl = this.url +'/entity.user/'+username
                + '/subscription/';
        
        request.open(
            "PUT",
            stickyUrl,
            true
        );
        
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
                  
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                callBack.call(
                            null,
                            request.responseText
                );
            } 
        };
        request.send(JSON.stringify({account : username, subscription : subscription}));
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.getSubscription = function (
    username,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
  
    var request = new XMLHttpRequest(),
        xhttp = new XMLHttpRequest(),
        myself = this;
		
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'https://')
                + this.url + '/entity.user/subscription/'
                + username,
            true
        );

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                //if (request.responseText === "0") {
					if(callBack!=null){
                        callBack.call(
                            null,
							request.responseText
                        );
					}
					console.log(request.responseText);
					SnapCloud.sub = request.responseText;
                //} 
            }
        };
        request.send();
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.entit = function (
    callBack,
    errorCall
) {
    if (!(this.username && this.password)) {
        this.message('You are not logged in');
        return;
    }
    this.login(
        this.username,
        this.password,
        callBack,
        errorCall
    );
};

Cloud.prototype.reconnect = function (
    callBack,
    errorCall
) {
    if (!(this.username && this.password)) {
        this.message('You are not logged in');
        return;
    }
    this.login(
        this.username,
        this.password,
        callBack,
        errorCall
    );
};

Cloud.prototype.login = function (
    username,
    password,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
//        usr = JSON.stringify({'__h': password, '__u': username}),
        myself = this;
    this.setRoute(username);
    try {
		myself.getSubscription(username, null,null);
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'https://')
                + this.url + '/entity.user/exist/'
                + username + '/' + password,
            true
        );
//        request.setRequestHeader(
//            "Content-Type",
//            "application/json; charset=utf-8"
//        );
        // glue this session to a route:
//        request.setRequestHeader('SESSIONGLUE', this.route);
//        request.withCrede1ntials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
//                var out = request.responseText;
                if (request.responseText) {
                    var out = request.responseText;
					if(out === "no authenticate"){
						errorCall.call(
                        null,
                         'User is not authenticated, Please go to email authentication',
                         'connection failed'
                        );
					}else{
//                    if(out === "1"){
//                        myself.username = username;
//                        myself.password = password;
//                        callBack.call(null, 'Snap!Cloud');
//                    }else {
//                        errorCall.call(
//                            null,
//                            'User name or password is error',
//                            'connection failed'
//                        );
//                    }
                        myself.api = myself.parseAPI(request.responseText);
//                    myself.session = request.getResponseHeader('MioCracker')
//                        .split(';')[0];
//                    // set the cookie identifier:
//                    myself.limo = this.getResponseHeader("miocracker")
//                        .substring(
//                            9,
//                            this.getResponseHeader("miocracker").indexOf("=")
//                        );
//                    if (myself.api.) {
                        myself.username = username;
                        myself.password = password;
                        callBack.call(null, myself.api, 'Snap!Cloud');
//                    } else {
//                        errorCall.call(
//                            null,
//                            request.responseText,
//                            'connection failed'
//                        );
//                    }
					}
                } else {
                    errorCall.call(
                        null,
                         'User name or password is error',
                         'connection failed'
                    );
                }
            }
        };
        request.send();
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.callService = function (
    serviceName,
    callBack,
    errorCall,
    args
) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        service = this.api[serviceName],
        myself = this,
        stickyUrl,
        postDict;

//    if (!this.session) {
//        errorCall.call(null, 'You are not connected', 'Cloud');
//        return;
//    }
//    if (!service) {
//        errorCall.call(
//            null,
//            'service ' + serviceName + ' is not available',
//            'API'
//        );
//        return;
//    }
    if (args && args.length > 0) {
        postDict = {};
        service.parameters.forEach(function (parm, idx) {
            postDict[parm] = args[idx];
        });
        postDict["account"] = this.username;
    }
    var out = 0;
//    postDict[account] = this.username;
    try {
        if(serviceName === "getRawProject" || serviceName === "deleteProject"){
              stickyUrl = this.url +
                    '/' +service.url +postDict["ProjectName"];   
        }else if(serviceName === "putProject"){
                stickyUrl = this.url +
                    '/' +service.url +postDict["projectName"];   
        }else{
            stickyUrl = this.url +
                    '/' +service.url;   
        }
        request.open(service.method, stickyUrl, true);
        if(serviceName === "saveProject" || serviceName === "deleteProject" 
                || serviceName === "putProject" || serviceName === "changePassword"){
            request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            request.setRequestHeader("Access-Control-Allow-Origin", "*");
			
        }
//        else if (serviceName === "changePassword"){
//            request.setRequestHeader("Content-Type", "application/json");
//            request.setRequestHeader("Access-Control-Allow-Origin", "*");
//        }
       
//         request.open(
//            "GET",
//            (this.hasProtocol() ? '' : 'http://')
//                + this.url + '/entity.project/userproject/'
//                + username,
//            true
//        );

//        request.open(
//            "GET",
//            (this.hasProtocol() ? '' : 'http://')
//                + this.url + '/entity.project/userproject/'
//                + this.username,
//            true
//        );

//        request.withCredentials = true;
//        request.setRequestHeader(
//            "Content-Type",
//            "application/json"
//        );
//        request.setRequestHeader('MioCracker', this.session);
//        request.setRequestHeader('SESSIONGLUE', this.route);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var responseList = [];
                if (request.responseText &&
                        request.responseText.indexOf('ERROR') === 0) {
                    errorCall.call(
                        this,
                        request.responseText,
                        localize('Service:') + ' ' + localize(serviceName)
                    );
                    return;
                }
                if (serviceName === 'login') {
                    myself.api = myself.parseAPI(request.responseText);
                }
                if (serviceName === 'getRawProject') {
                    responseList = request.responseText;
                } else {
                    responseList = myself.parseResponse(
                        request.responseText
                    );
                }
                callBack.call(null, responseList, service.url);
            }
        };
        
        if(serviceName === "saveProject" || serviceName === "putProject" || serviceName === "changePassword"){
            request.send(JSON.stringify(postDict));
//            request.send(JSON.stringify({account : "test1", projectName : "123", sourceCode : "test",
//                   media : "asd", sourceSize : "0", mediaSize : "0"}));
        }else{
            request.send();
        }
    } catch (err) {
        console.log(err.toString())

    }
};

Cloud.prototype.saveProject = function (ide, callBack, errorCall,static) {
    var myself = this,
        pdata,
        media,
        size,
        mediaSize;

    ide.serializer.isCollectingMedia = true;
	ide.sprites.asArray();
    pdata = ide.serializer.serialize(
                new Project(ide.scenes, ide.scene)
            );
    media = ide.serializer.mediaXML(ide.getProjectName());
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();
	
	let filestr = '<files>';
	for( var key in fileListData ){
		let codetext = fileListData[key];
		const type = fileListType[key];
		let file = '<file>'
		//codetext = btoa(unescape(encodeURIComponent(codetext)));
		file = file + '<filename>'+key+'.'+type+'</filename>';
		file = file + '<filecode>'+codetext+'</filecode>';
		filestr = filestr+file+'</file>';
	}
	filestr = filestr+'</files>';
	pdata = pdata + filestr; 
	
    mediaSize = media ? media.length : 0;
    size = pdata.length + mediaSize;
    if (mediaSize > 10485760) {
        new DialogBoxMorph().inform(
            'Snap!Cloud - Cannot Save Project',
            'The media inside this project exceeds 10 MB.\n' +
                'Please reduce the size of costumes or sounds.\n',
            ide.world(),
            ide.cloudIcon(null, new Color(180, 0, 0))
        );
        throw new Error('Project media exceeds 10 MB size limit');
    }

    // check if serialized data can be parsed back again
    try {
        ide.serializer.parse(pdata);
    } catch (err) {
        ide.showMessage('Serialization of program data failed:\n' + err);
        throw new Error('Serialization of program data failed:\n' + err);
    }
    if (media !== null) {
        try {
            ide.serializer.parse(media);
        } catch (err) {
            ide.showMessage('Serialization of media failed:\n' + err);
            throw new Error('Serialization of media failed:\n' + err);
        }
    }
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();

    ide.showMessage('Uploading ' + Math.round(size / 1024) + ' KB...');
    myself.reconnect(
        function () {
            myself.callService(
                (static==="save" ? 'saveProject' : 'putProject'),
//                'saveProject',
                function (response, url) {
                    callBack.call(null, response, url);
                    myself.disconnect();
                    ide.hasChangedMedia = false;
                },
                errorCall,
                [
                    ide.getProjectName(),
                    pdata,
                    media,
                    pdata.length,
                    media ? media.length : 0
                ]
            );
        },
        errorCall
    );
};

// Cloud: payload transformation

Cloud.prototype.parseAPI = function (src) {
    var api = {},
        services;
    services = src.split(" ");
    services.forEach(function (service) {
        var entries = service.split("&"),
            serviceDescription = {},
            parms;
        entries.forEach(function (entry) {
            var pair = entry.split("="),
                key = decodeURIComponent(pair[0]).toLowerCase(),
                val = decodeURIComponent(pair[1]);
            if (key === "service") {
                api[val] = serviceDescription;
            } else if (key === "parameters") {
                parms = val.split(",");
                if (!(parms.length === 1 && !parms[0])) {
                    serviceDescription.parameters = parms;
                }
            } else {
                serviceDescription[key] = val;
            }
        });
    });
    return api;
};

Cloud.prototype.changePassword = function (
    oldPW,
    newPW,
    callBack,
    errorCall
) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'changePassword',
                function (response, url) {
					var pwh = calcMD5(newPW);
                    myself.password = pwh;
                    callBack.call(null, response, url);
//                    myself.disconnect();
                },
                errorCall,
                [calcMD5(oldPW), calcMD5(newPW)]
            );
        },
        errorCall
    );
};

Cloud.prototype.resetPassword = function (
    username,
    mail,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        var stickyUrl = this.url +'/entity.user/'+username
                + '/email/'+mail;
        
        request.open(
            "GET",
            stickyUrl,
            true
        );
//        request.setRequestHeader(
//            "Content-Type",
//            "application/x-www-form-urlencoded"
//        );
//        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText,
                            'Reset Password'
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText,
                            'Reset Password'
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'ResetPW',
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.newPassword = function (
    username,
    newpassword,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        var pws = calcMD5(newpassword);
        var stickyUrl = this.url +'/entity.user/'+username
                + '/newpassword/';
        
        request.open(
            "PUT",
            stickyUrl,
            true
        );
        
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
                  
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                callBack.call(
                            null,
                            request.responseText,
                            'Reset Password'
                        );
            } 
        };
//        request.send("test");
        request.send(JSON.stringify({account : username, newpassword : pws}));
//        request.send();
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};


/*
Cloud.prototype.getProjectList = function (callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getProjectList',
                function (response, url) {
                    callBack.call(null, response, url);
                    myself.disconnect();
                },
                errorCall
            );
        },
        errorCall
    );
};
*/
