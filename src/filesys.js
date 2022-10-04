var rootclient = null;
var node = null;
var projectname = $("#projectname"),
    projectmode = $("#projectmode");
framework = $("#framework");
var index = 0;
var demopathmap = new Array();
var clickEvent = null;
var selectNode = null;
const comments = document.querySelector('.comments');
//var dropfile = null;

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
    console.log('beforeunload');
    for (var prop in demopathmap) {
        console.log(prop);
        var command = '{' +
            '"command":"closedemo",' +
            '"user":"' + SnapCloud.username + '",' +
            '"name":"' + prop + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
    }

});

mySidebar.ondrop = function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('ondrop');
    //dropfile = e.dataTransfer;
    updateMenu(e.dataTransfer);
}

$(function() {
    $("#dialog").dialog({
        autoOpen: false,
        buttons: {
            "ok": function() {
                console.log(projectname.val())
                console.log(projectmode.val())
                var command = '{' +
                    '"command":"creatProject",' +
                    '"user":"' + SnapCloud.username + '",' +
                    '"name":"' + projectname.val() + '",' +
                    '"mode":"' + projectmode.val() + '",' +
                    '"framework":"angular"' +
                    '}';
                rootclient.publish(SnapCloud.username, command);
                selectNode = {
                    "nodeId": 1,
                    "parentId": 0,
                    "text": projectname.val() + "<div style='float:right'><button onclick='beforeOpen()'>開啟</button><button onclick='beforeDelete()'>刪除</button>"
                };
                $.LoadingOverlay("show", {
                    zIndex: 9998
                });
				setTimeout(function(){
					$.LoadingOverlay("hide");
				}, 3000);
                $(this).dialog("close");
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });

    $("#opener").click(function() {
        $("#dialog").dialog("open");
    });
});

function newproject() {

    var str = prompt("輸入專案名稱", "");
    var str = prompt("輸入專案名稱", "");

    var command = '{' +
        '"command":"creatProject",' +
        '"user":"' + SnapCloud.username + '",' +
        '"name":"testmqtt",' +
        '"mode":"tabs"' +
        '}';
    rootclient.publish(SnapCloud.username, command);
}

function deleteMenu(node) {
    if (node != null && node.parentId != null) {
        console.log(node.nodeId);
        if (node.parentId == null) {
            alert('不能選擇根目錄');
        }
        $("#treeview").treeview("deleteNode", [node.nodeId, {
            silent: true
        }]);
        var pathnode = node;
        var path = '';
        while (pathnode.parentId != null) {
            pathnode = $("#treeview").treeview('getNode', pathnode.parentId);
            if (pathnode.text.split('<div')[0] != 'root') {
                path = pathnode.text.split('<div')[0] + '/' + path;
            }
        }
        var command = '{' +
            '"command":"delProject",' +
            '"user":"' + SnapCloud.username + '",' +
            '"name":"' + node.text.split('<div')[0] + '",' +
            '"path":"' + path + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
		console.log(command);
        $.LoadingOverlay("show", {
            zIndex: 9998
        });
		setTimeout(function(){
			$.LoadingOverlay("hide");
		}, 3000);
    } else {
        alert('請選擇要刪除的檔案或專案');
    }
    clickEvent = null;
}

function openMenu(node) {
    if (node != null && node.parentId != null) {
        console.log(node.nodeId);
        if (node.parentId == null) {
            alert('不能選擇根目錄');
            return;
        }
        selectNode = node;
        var command = '{' +
            '"command":"openProject",' +
            '"user":"' + SnapCloud.username + '",' +
            '"name":"' + node.text.split('<div')[0] + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
        $.LoadingOverlay("show", {
            zIndex: 9998
        });
		setTimeout(function(){
			$.LoadingOverlay("hide");
		}, 3000);
    } else {
        alert('請選擇要開啟的專案');
    }
    clickEvent = null;
}

function viewFile(node) {
    if (node != null && node.nodeId != 0) {
        console.log(node.nodeId);
        var pathnode = node;
        var path = '';
        while (pathnode.parentId != null) {
            pathnode = $("#treeview").treeview('getNode', pathnode.parentId);
            if (pathnode.text.split('<div')[0] != 'root') {
                path = pathnode.text.split('<div')[0] + '/' + path;
            }
        }
        var command = '{' +
            '"command":"viewFile",' +
            '"user":"' + SnapCloud.username + '",' +
            '"name":"' + node.text.split('<div')[0] + '",' +
            '"path":"' + path + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
        $.LoadingOverlay("show", {
            zIndex: 9998
        });
		setTimeout(function(){
			$.LoadingOverlay("hide");
		}, 3000);
    } else {

    }
    clickEvent = null;
}

function runproject() {
    var nownode = node;
    if (selectNode != null) {
        nownode = selectNode;
    }
    if (nownode != null && nownode.nodeId != 0) {
        console.log(nownode.nodeId);
        if (nownode.parentId == null) {
            alert('不能選擇根目錄');
            return;
        }
        var pathnode = nownode;
        //var path = '';
        var projectName = '';
        while (pathnode.parentId != null) {
            var previousnode = $("#treeview").treeview('getNode', pathnode.parentId);
            if (previousnode.text.split('<div')[0] == SnapCloud.username) {
                projectName = pathnode.text.split('<div')[0];
                break;
            }
            pathnode = previousnode;

        }
        if (projectName == '') {
            projectName = nownode.text.split('<div')[0];
        }
        var command = '{' +
            '"command":"demo",' +
            '"user":"' + SnapCloud.username + '",' +
            '"name":"' + projectName + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
        $.LoadingOverlay("show", {
            zIndex: 9998
        });
		setTimeout(function(){
			$.LoadingOverlay("hide");
		}, 3000);
    } else {
        alert('請選擇要模擬的專案');
    }
}

function closedemo() {
    var nownode = node;
    if (selectNode != null) {
        nownode = selectNode;
    }
    if (nownode != null && nownode.nodeId != 0) {
        console.log(nownode.nodeId);
        if (nownode.parentId == null) {
            alert('不能選擇根目錄');
            return;
        }
        var pathnode = nownode;
        //var path = '';
        var projectName = '';
        while (pathnode.parentId != null) {
            var previousnode = $("#treeview").treeview('getNode', pathnode.parentId);
            if (previousnode.text.split('<div')[0] == SnapCloud.username) {
                projectName = pathnode.text.split('<div')[0];
                break;
            }
            pathnode = previousnode;

        }
        if (projectName == '') {
            projectName = nownode.text.split('<div')[0];
        }
        var command = '{' +
            '"command":"closedemo",' +
            '"user":"' + SnapCloud.username + '",' +
            '"name":"' + nownode.text.split('<div')[0] + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
        $.LoadingOverlay("show", {
            zIndex: 9998
        });
		setTimeout(function(){
			$.LoadingOverlay("hide");
		}, 3000);
    } else {
        alert('請選擇要結束模擬的專案');
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function updateMenu(e) {
    console.log('updateMenu1');
    var file = e.files[0];
    if (!file) {
        return;
    }
    console.log('updateMenu2');
    if (node != null) {
        console.log(node.nodeId);
        var pathnode = node;
        var path = '';
        while (pathnode.parentId != null) {
            pathnode = $("#treeview").treeview('getNode', pathnode.parentId);
            if (pathnode.text.split('<div')[0] != 'root') {
                path = pathnode.text.split('<div')[0] + '/' + path;
            }
        }
        if (node.text.split('<div')[0].indexOf('.') == -1) {
            path = path + node.text.split('<div')[0] + '/'
        }
        //const input = document.querySelector('input[type="file"]');
        //const file = input.files[0];

        const reader = new FileReader();
        reader.onloadend = function() {
            console.log(reader.result);
            console.log("uploadFile Test");
            var command = '{' +
                '"command":"uploadFile",' +
                '"user":"' + SnapCloud.username + '",' +
                '"filename":"' + file.name + '",' +
                '"filetype":"' + file.type + '",' +
                '"filedata":"' + reader.result + '",' +
                '"path":"' + path + '"' +
                '}';
            rootclient.publish(SnapCloud.username, command);
        }
        reader.readAsDataURL(file);

        $.LoadingOverlay("show", {
            zIndex: 9998
        });
		setTimeout(function(){
			$.LoadingOverlay("hide");
		}, 3000);
    } else {
        console.log('updateMenu3');
    }
    e.value = '';
}

function build() {
    var nownode = node;
    if (selectNode != null) {
        nownode = selectNode;
    }
    if (nownode != null && nownode.nodeId != 0) {
        console.log(nownode.nodeId);
        if (nownode.parentId == null) {
            alert('不能選擇根目錄');
            return;
        }
        var pathnode = nownode;
        //var path = '';
        var projectName = '';
        while (pathnode.parentId != null) {
            var previousnode = $("#treeview").treeview('getNode', pathnode.parentId);
            if (previousnode.text.split('<div')[0] == SnapCloud.username) {
                projectName = pathnode.text.split('<div')[0];
                break;
            }
            pathnode = previousnode;

        }
        if (projectName == '') {
            projectName = nownode.text.split('<div')[0];
        }
        var command = '{' +
            '"command":"build",' +
            '"user":"' + SnapCloud.username + '",' +
            '"platform":"android",' +
            '"keystore":"' + projectName + '.jks",' +
            '"aliasname":"' + projectName + '",' +
            '"password":"socad3284",' +
            '"name":"' + projectName + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
        rootclient.subscribe('build/' + SnapCloud.username)
        //$.LoadingOverlay("show", {zIndex:9998});
    } else {
        alert('請選擇要打包的專案');
    }
}


function openother() {
    var command = '{' +
        '"command":"getPath",' +
        '"user":"' + SnapCloud.username + '"' +
        '}';
    selectNode = null;
    rootclient.publish('login', command);
}

function removeAll() {
    var command = '{' +
        '"command":"removeAll",' +
        '"user":"' + SnapCloud.username + '"' +
        '}';
    selectNode = null;
    rootclient.publish(SnapCloud.username, command);
}

var viewWindow;

function w3_open(open=false) {
    //SnapCloud.username='test1';
    //$("#world").LoadingOverlay("show");
    //$.LoadingOverlay("show");
    if (SnapCloud.username == null) {
        alert('請登入Snap帳號');
		$.LoadingOverlay("hide");
        return false;
    }
	
	if(open){			
	    document.getElementById("main").style.marginRight = "25%";
	    document.getElementById("mySidebar").style.width = "25%";
	    document.getElementById("mySidebar").style.display = "block";
	}	
    //document.getElementById("openNav").style.display = 'inline-block';

    //div.remove();
    ///document.getElementById("treeview").innerText ='loading...'

    if (rootclient == null) {
        //rootclient = mqtt.connect('ws://140.129.33.7:9001');
		rootclient = mqtt.connect('wss://iot.ttu.edu.tw:9002');
        rootclient.subscribe('return/' + SnapCloud.username);
		rootclient.subscribe('snapView/' + SnapCloud.username);
        rootclient.subscribe('build/' + SnapCloud.username);
        rootclient.subscribe(SnapCloud.username + '/log');
        rootclient.on('message', function(topic, message) {
			try{
            console.log(message.toString())
            if (topic.toString() == (SnapCloud.username + '/log')) {
                //document.getElementById("log")
                //var p = document.createElement("p");                 // Create a <li> node
                //p.innerText =message.toString();
                //document.getElementById("log").appendChild(p);
                append(createComment(message.toString()))
                document.getElementById("log").style.height = "250px";
                document.getElementById("log").style.padding = "20px";
                document.getElementById("logbutton").innerText = "x";
                document.getElementById("buttondiv").style.marginBottom = "250px";
			} else if (topic.toString() == ('snapView/' + SnapCloud.username)) {
				var filename = message.toString().split(';data=')[0];
                var data = message.toString().split(';data=')[1];
				var htmlText = '<textarea style="width: calc(100%); height: calc(100%);">' + data.replace('</textarea>', '&lt;/textarea&gt;') + '</textarea>';
				viewWindow = window.open("", "viewWindow", "toolbar=no, menubar=no");
				try {
					viewWindow.document.write(htmlText);
				} catch (e) {
					
				}
				viewWindow.document.close();
				
            } else if (topic.toString() == ('return/' + SnapCloud.username)) {
                var command_obj = JSON.parse(message.toString());
                var command = command_obj.command;

                if (command == "creatProject") {
                    if (command_obj.return == 0) {
                        $('#treeview').treeview('addNode', [0, {
                            node: {
                                text: projectname.val()
                            },
                            silent: true
                        }]);
                        $('#tree').treeview('expandNode', 0);
                    }
				} else if (command == "removeAll") {
					    var command = '{' +
						    '"command":"getPath",' +
					  	    '"user":"' + SnapCloud.username + '"' +
						    '}';
						rootclient.publish('login', command);
                } else if (command == "delProject") {
                    if (command_obj.return == 0) {
                        $("#treeview").treeview("deleteNode", [node.nodeId, {
                            silent: true
                        }]);
                    }
                } else if (command == "getPath") {
                    index++;
                    var path = command_obj.return;
                    var data = creatNode(path, 1, '');
                    console.log(data);

                    $('#treeview').treeview({
                        data: JSON.parse(data),
                        color: "#4F4F4F",
                        expandIcon: 'glyphicon glyphicon-chevron-right',
                        collapseIcon: 'glyphicon glyphicon-chevron-down',
                        nodeIcon: 'glyphicon glyphicon-bookmark',
                        enableLinks: true,
                        levels: 1,
                        showIcon: false,
                        selectedBackColor: "#84C1FF",
                        selectedColor: "#333",
                        onNodeClicked: function(event, node) {
                            console.log("click event");
                            switch (clickEvent) {
                                case "deleteEvent":
                                    deleteMenu(node);
                                    break;
                                case "editEvent":
                                    editMenu(node);
                                    break;
                                case "updateEvent":
                                    //updateMenu(node);
                                    break;
                                case "openEvent":
                                    openMenu(node);
                                    break;
								case "viewEvent":
									viewFile(node);
                                default:
                                    break;
                            }
                        },
                        onDragenter: function(event) {
                            // 进入事件
                            console.log(event.originalEvent)
                        },
                        onDragleave: function(event) {
                            // 离开事件
                            console.log(event.originalEvent)
                        },
                        onDrop: function(event, data) {
                            // 放下事件
                            event.preventDefault();
                            console.log(event.originalEvent, data)
                            node = data;
                            //updateMenu(dropfile)
                        },
                        /*
                        ajax: {
                        	cache:false
                        },
                        ajaxDefaults: { // Used by initAjax option
                        	cache: false, // false: Append random '_' argument to the request url to prevent caching.
                        	dataType: "json" // Expect json format and pass json object to callbacks.
                        },
                        */

                    });
					
                    $('#treeview').on('nodeSelected', function(event, data) {
                        console.log(data);
                        node = data;
                    })
					
                    $('#treeview').treeview('expandNode', [0, {
                        levels: 0,
                        silent: true
                    }]);

                } else if (command == "demo") {
                    var demopath = command_obj.return;
                    demopathmap[command_obj.filename] = demopath;
                    console.log('開啟' + demopath);
                    //window.location.href=demopath;
                    window.open(demopath, "demo_" + command_obj.filename, "width=360 , height=640");
				} else if (command == "createMySQLUser") {
                    var response = command_obj.return;
					if(response==0){
						console.log('MySQL 建立');
					}else{
						console.log('MySQL 建立失敗');
					}
                    //window.location.href=demopath;
                    window.open("http://140.129.33.209/phpmyadmin/");
                } else if (closedemo) {
                    if (command_obj.return == 0) {
                        demopathmap[command_obj.filename] = null;
                    }
                }
                $.LoadingOverlay("hide");
            } else if (topic.toString() == ('build/' + SnapCloud.username)) {
                var fileName = message.toString().split(';data=')[0];
                var content = message.toString().split(';data=')[1];
                createAndDownloadFile(fileName, content, "apk");
            }
			} catch (err) {
				console.log(err.toString());
			}
        })
    }
	
	if(open){	
	    setTimeout(() => {
            var command = '{' +
                '"command":"getPath",' +
                '"user":"' + SnapCloud.username + '"' +
            '}';
            rootclient.publish('login', command);
	    }, "1000")
	}
	return true;
}


/**
 * 建立並下載檔案
 * @param  {String} fileName 檔名
 * @param  {String} content  檔案內容
 */
function createAndDownloadFile(fileName, content, type) {
    var downloadLink = document.createElement('a');
    //const linkSource = "data:application/"+type+";base64," + content;

    //var blob = Base64.decode(content);
    //var blob = b64toBlob(content);

    //var blob =  Buffer.from(content, 'base64');
    const linkSource = "data:application/" + type + ";base64," + content;
    downloadLink.download = fileName;
    //downloadLink.href = URL.createObjectURL(blob);
    downloadLink.href = linkSource;
    downloadLink.click();
    //URL.revokeObjectURL(blob);
}

function b64toBlob(b64Data, contentType = 'application/apk', sliceSize = 512) {
    const byteCharacters = Base64.decode(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {
        type: contentType
    });
    return blob;
};

function beforeDelete() {
	console.log("beforeDelete")
    clickEvent = "deleteEvent";
};

function beforeEdit() {
    clickEvent = "editEvent";
};

function beforeUpdate() {
    clickEvent = "updateEvent";
};

function beforeOpen() {
    clickEvent = "openEvent";
};
function beforeView(){
    clickEvent = "viewEvent";
};


function w3_close() {
    document.getElementById("main").style.marginRight = "0%";
    document.getElementById("mySidebar").style.display = "none";
    //document.getElementById("openNav").style.display = "inline-block";
    rootclient.end();
    rootclient = null;
    document.getElementById("mySidebar");
    $('#treeview').treeview('remove');
    document.getElementById("treeview").innerText = 'loading...'
}

function editMenu(node) {
    if (node != null && node.nodeId != 0) {
        console.log(node.nodeId);
        var pathnode = node;
        var path = '';
        while (pathnode.parentId != null) {
            pathnode = $("#treeview").treeview('getNode', pathnode.parentId);
            if (pathnode.text.split('<div')[0] != 'root') {
                path = pathnode.text.split('<div')[0] + '/' + path;
            }
        }
        var command = '{' +
            '"command":"snapupdata",' +
            '"user":"' + SnapCloud.username + '",' +
            '"name":"' + node.text.split('<div')[0] + '",' +
            '"path":"' + path + '"' +
            '}';
        rootclient.publish(SnapCloud.username, command);
        $.LoadingOverlay("show", {
            zIndex: 9998
        });
		setTimeout(function(){
			$.LoadingOverlay("hide");
		}, 3000);
    } else {

    }
    clickEvent = null;
}

function loading() {
    $.LoadingOverlay("show", {
        zIndex: 9998
    });
	setTimeout(function(){
		$.LoadingOverlay("hide");
	}, 3000);
}

function createComment(content) {
    const el = document.createElement('li');
    el.textContent = `${content}`;
    el.classList.add('comment');
    return el;
}

function append(comment) {
    comments.appendChild(comment);
	/*console.log(comments.scrollHeight - comments.offsetHeight)
    if (comments.offsetHeight < comments.scrollHeight && comments.scrollTop + comments.offsetHeight + 100 > comments.scrollHeight) {
        comments.scrollTop = comments.scrollHeight - comments.offsetHeight;
		console.log("log test0")
    }else{
		console.log("log test1")
	}*/
	comments.scrollTop = comments.scrollHeight - comments.offsetHeight;
}

function logclear(){
	while (comments.lastElementChild) {
        comments.removeChild(comments.lastElementChild);
    }
	comments.scrollTop = 0;
}


function logwindow() {
    if (document.getElementById("log").style.height == "0px") {
        document.getElementById("log").style.height = "250px";
        document.getElementById("log").style.padding = "20px";
        document.getElementById("logbutton").innerText = "x";
        document.getElementById("buttondiv").style.marginBottom = "250px";

    } else {
        document.getElementById("log").style.height = "0px";
        document.getElementById("log").style.padding = "0px";
        document.getElementById("logbutton").innerText = "log";
        document.getElementById("buttondiv").style.marginBottom = "0px";
    }
}

function creatNode(children, length, head) {
    var data = '';
    var index = 1;
    var old = head;
    try {
        data = '[' +
            '{' +
            children.map(node => {
                var text = '';
                var filename = node.name;
                if (filename == ".") {
                    filename = 'root';
                }
                if (head == '') {
                    head = node.name;
                }
                var right = "<div style='float:right'>"
                var uploadButton = "<button onclick='file.click()'>" +
                    "上傳" +
                    "</button>";

                //var uploadButton = "<input id='file' type='file' onchange='upload(this)' style='display: none' />"
                //"<button type='button' onclick='file.click()'>檔案上傳</button>";

                var editButton = "<button onclick='beforeEdit()'>" +
                    "編輯" +
                    "</button>";

                var delButton = "<button onclick='beforeDelete()'>" +
                    "刪除" +
                    "</button>";

                var openButton = "<button onclick='beforeOpen()'>" +
                    "開啟" +
                    "</button>";
					
				var viewButton = "<button onclick='beforeView()'>" +
                    "預覽" +
                    "</button>";

                //var syncButton = "<button onclick='executefunction1()'>" +
                //"同步" +
                //"</button>";

                if (head == SnapCloud.username) {
                    if (head == filename && old == "") {
                        text = '"text":"' + filename + right + '"';
                    } else {
						if (filename.indexOf('.') == -1) {
							text = '"text":"' + filename + right + openButton + delButton + '"';
						}else{
							text = '"text":"' + filename + right + viewButton + delButton + '"';
						}
                    }
                } else {
                    if (filename.indexOf('.') == -1) {
                        if (head == filename) {
                            text = '"text":"' + filename + right + uploadButton + delButton + '"';
                        } else {
                            text = '"text":"' + filename + right + uploadButton + '"';
                        }
                   // } else if (filename.indexOf('.html') != -1) {
                   //     text = '"text":"' + filename + right + editButton + delButton + '"';
                    } else {
                        text = '"text":"' + filename + right + viewButton + delButton + '"';
                    }
                }
                if (node.children != null) {
                    if (node.children.length > 0) {
                        text = text + ',"nodes":' + creatNode(node.children, node.children.length, head);
                    }
                }
                if (index == 1 && index != length) {
                    text = text + "}";
                } else if (index > 1 && index != length) {
                    text = "{" + text + "}";
                } else if (index == 1 && index == length) {
                    text = text;
                } else if (index > 1 && index == length) {
                    text = '{' + text
                }
                index++;
                return text;
            }) +
            '}' +
            ']'
    } catch (error) {
        console.error(error);
    }
    return data;
}