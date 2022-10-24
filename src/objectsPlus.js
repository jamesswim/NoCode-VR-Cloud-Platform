
// init decorator
//    motion : new Color(74, 108, 212),
//    looks : new Color(143, 86, 227),
//    sound : new Color(207, 74, 217),
//    pen : new Color(0, 161, 120),
//    control : new Color(230, 168, 34),
//    sensing : new Color(4, 148, 220),
//    operators : new Color(98, 194, 19),
//    variables : new Color(243, 118, 29),
//    lists : new Color(217, 77, 17),
//    other: new Color(150, 150, 150)

SpriteMorph.prototype.originalInit = SpriteMorph.prototype.init;
// Definition of a new Python Category
SpriteMorph.prototype.categories.push('control2');
SpriteMorph.prototype.blockColor['control2'] = new Color(230, 168, 34);
//SpriteMorph.prototype.categories.push('ionic-text');
SpriteMorph.prototype.blockColor['ionic-text'] = new Color(74, 108, 212);
//SpriteMorph.prototype.categories.push('ionic-widgets');
SpriteMorph.prototype.blockColor['ionic-widgets'] = new Color(160, 120, 120);
SpriteMorph.prototype.blockColor['ionic-widgets2'] = new Color(160, 80, 80);
SpriteMorph.prototype.categories.push('html');
SpriteMorph.prototype.blockColor['html'] = new Color(74, 108, 212);
SpriteMorph.prototype.categories.push('JavaScript');
SpriteMorph.prototype.blockColor['JavaScript'] = new Color(120, 161, 120);
SpriteMorph.prototype.categories.push('css');
SpriteMorph.prototype.blockColor['css'] = new Color(0, 161, 120);

SpriteMorph.prototype.categories.push('server');
SpriteMorph.prototype.blockColor['server'] = new Color(0, 161, 120);
//eric 20211808 angular to react
SpriteMorph.prototype.categories.push('react');
SpriteMorph.prototype.blockColor['react'] = new Color(4, 148, 220);
//eric 20221003 ar/vr
SpriteMorph.prototype.categories.push('AR/VR');
SpriteMorph.prototype.blockColor['AR/VR'] = new Color(4, 148, 220);
SpriteMorph.prototype.categories.push('AR/VR2');
SpriteMorph.prototype.blockColor['AR/VR2'] = new Color(4, 148, 220);
//eric 20210520 vue
SpriteMorph.prototype.categories.push('vue');
SpriteMorph.prototype.blockColor['vue'] = new Color(4, 148, 220);
//eric 20211808 typescript to firebase
SpriteMorph.prototype.categories.push('firebase');
SpriteMorph.prototype.blockColor['firebase'] = new Color(0, 161, 120);
SpriteMorph.prototype.categories.push('htmlhead');
SpriteMorph.prototype.blockColor['htmlhead'] = new Color(143, 86, 227);
SpriteMorph.prototype.categories.push('htmlbody');
SpriteMorph.prototype.blockColor['htmlbody'] = new Color(207, 74, 217);
//SpriteMorph.prototype.categories.push('htmlbody2');
//SpriteMorph.prototype.blockColor['htmlbody2'] = new Color(255, 133, 0);
SpriteMorph.prototype.categories.push('properties');
SpriteMorph.prototype.blockColor['properties'] = new Color(114, 148, 220);
SpriteMorph.prototype.categories.push('ionic-control');
SpriteMorph.prototype.blockColor['ionic-control'] = new Color(143, 86, 227);
SpriteMorph.prototype.categories.push('chart');
SpriteMorph.prototype.blockColor['chart'] = new Color(143, 86, 227);
SpriteMorph.prototype.categories.push('ionic-container');
SpriteMorph.prototype.blockColor['ionic-container'] = new Color(207, 74, 217)
SpriteMorph.prototype.categories.push('cordova');
SpriteMorph.prototype.blockColor['cordova'] = new Color(0, 161, 120);
SpriteMorph.prototype.categories.push('ionic');
SpriteMorph.prototype.blockColor['ionic'] = new Color(207, 74, 217);
SpriteMorph.prototype.originalInitBlocks = SpriteMorph.prototype.initBlocks;

// FCC php and mysql 
//    motion : new Color(74, 108, 212),
//    looks : new Color(143, 86, 227),
//    sound : new Color(207, 74, 217),
//    pen : new Color(0, 161, 120),
//    control : new Color(230, 168, 34),
//    sensing : new Color(4, 148, 220),
//    operators : new Color(98, 194, 19),
//    variables : new Color(243, 118, 29),
//    lists : new Color(217, 77, 17),
//    other: new Color(150, 150, 150) 
SpriteMorph.prototype.categories.push('phpMySQL');
SpriteMorph.prototype.blockColor['phpMySQL'] = new Color(0, 161, 120);
SpriteMorph.prototype.categories.push('MySQL');
SpriteMorph.prototype.blockColor['MySQL'] = new Color(74, 108, 212);
SpriteMorph.prototype.categories.push('operatorsMySQL');
SpriteMorph.prototype.blockColor['operatorsMySQL'] = new Color(98, 194, 19);
SpriteMorph.prototype.categories.push('axios');
SpriteMorph.prototype.blockColor['axios'] = new Color(0, 161, 120);
SpriteMorph.prototype.categories.push('MQTT');
SpriteMorph.prototype.blockColor['MQTT'] = new Color(207, 74, 217);

SpriteMorph.prototype.initPythonBlocks = function () {

    // variables Set Map data structure

    this.blocks.reportDictFuntion = {
        type: 'reporter',
        category: 'lists',
        spec: ' %s . %DictFuntion ( %exp )',
        defaults: ['Map/Set', 'get']
    };
    this.blocks.reportFuntion2 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %DictFuntion2 ( %exp )',
        defaults: ['new Map']
    };
    //20220331 add Phone Plugin
    this.blocks.doPhonePluginFunction = {
        type: 'command',
        category: 'react',
        spec: 'Phone Plug FnC: %PhonePluginFunction ( %exp )',
        defaults: ['navigator.camera.getPicture']
    };
    this.blocks.reportPhonePluginFunction = {
        type: 'reporter',
        category: 'react',
        spec: 'Phone Plug FnC: %PhonePluginFunction ( %exp )',
        defaults: ['navigator.camera.getPicture']
    };
    this.blocks.reportCameraOptions = {
        type: 'reporter',
        category: 'react',
        spec: 'Cordova Options %CameraOptionsKey : %CameraOptionsValue',
        defaults: ['destinationType', 'Camera.DestinationType.FILE_URI']
    };
    //20220223 add Ionic block
    this.blocks.doIonicImportController = {
        type: 'command',
        category: 'ionic-control',
        spec: 'import { %IonicController } form " { %IonicLib }"',
        defaults: ['loadingController', 'https://iot.ttu.edu.tw:9999/ionic/index.esm.js']
    };
    this.blocks.doWindowController = {
        type: 'command',
        category: 'ionic-control',
        spec: 'set window. %IonicController ;',
        defaults: ['loadingController']
    };
    this.blocks.doCreatIonicController = {
        type: 'command',
        category: 'ionic-control',
        spec: '%VariableDeclaration %t = await %IonicController .create( %exp )',
        defaults: ['controller', 'loadingController']
    };
    this.blocks.doIonicControllerPresent = {
        type: 'command',
        category: 'ionic-control',
        spec: '%AsyncAwait  %t . %ControllerPrototype ( %exp )',
        defaults: ['await', 'controller', 'present']
    };
    //
    this.blocks.doJavaScriptTry = {
        type: 'command',
        category: 'control2',
        spec: 'try { %c }catch( %t ){ %c }',
        defaults: [null, 'e']
    };
    this.blocks.doJavaScriptIf = {
        type: 'command',
        category: 'operators',
        spec: '{ return ( %s && ( %c )}',
        defaults: ['cond']
    };
    this.blocks.doJavaScriptIfElse = {
        type: 'command',
        category: 'operators',
        spec: '{ return ( %s ? ( %c ) : ( %c ) ) }',
        defaults: ['cond']
    };
    // chart.js
    this.blocks.doChartImport = {
        type: 'command',
        category: 'chart',
        spec: '1. <script Import chart.js"></script>'
    };
    this.blocks.doChartHtml = {
        type: 'command',
        category: 'chart',
        spec: '2. <canvas id=" %t " %exp0 ></canvas>',
        defaults: ['myChart']
    };
    this.blocks.doChartSetID = {
        type: 'command',
        category: 'chart',
        spec: '3. <script > const %t = document.getElementById(" %t "); %c </script>',
        defaults: ['ctx', 'myChart']
    };
    /*
     this.blocks.doChartConfig1  = {
     type: 'command',
     category: 'htmlhead',
     spec: 'const config = { type : %ChartType , data : { %exp }}',
     defaults: ['bar']
     };
     
     this.blocks.doChartConfig2  = {
     type: 'command',
     category: 'htmlhead',
     spec: 'const config = { type : %ChartType , data : { %exp }, options : { %exp }}',
     defaults: ['bar']
     };
     */
    this.blocks.doChartConfig1 = {
        type: 'command',
        category: 'chart',
        spec: '4.1 const %t = { type : %ChartType , %br data : { labels: [ %exp ] datasets : [ %exp ]}}',
        defaults: ['config', 'bar']
    };
    this.blocks.doChartConfig2 = {
        type: 'command',
        category: 'chart',
        spec: '4.2 const %t = { type : %ChartType , %br data : { labels: [ %exp ] datasets : [ %exp ]}, %br options : { %exp }}',
        defaults: ['config', 'bar']
    };
    this.blocks.reportChartData = {
        type: 'report',
        category: 'chart',
        spec: '5.1 Chart Data { label : %s , data : [ %exp ], %exp0 }'
    };
    this.blocks.reportChartData2 = {
        type: 'report',
        category: 'chart',
        spec: '5.1.1  Data { x : %n , y : %n , r : %n  }'
    };
    this.blocks.reportChartItem = {
        type: 'report',
        category: 'chart',
        spec: '5.2 %ChartItem : %s ',
        defaults: ['data']
    };
    this.blocks.reportChartItem2 = {
        type: 'report',
        category: 'chart',
        spec: '5.2.1 %ChartItem : [ %exp ]',
        defaults: ['data']
    };
    this.blocks.doChartInit = {
        type: 'command',
        category: 'chart',
        spec: '6 const myChart = new Chart( %t , %t )',
        defaults: ['ctx', 'config']
    };
//firebase
    this.blocks.doFirebaseConfig = {
        type: 'command',
        category: 'htmlhead',
        spec: '1. firebaseConfig = { %s }',
        defaults: ['']
    };
    //Add a new document in collection "cities"


    this.blocks.doFirebaseSetDoc = {
        type: 'command',
        category: 'firebase',
        spec: 'FB: await %FirestoreCU (doc( %t , %t , %t ), %t );',
        defaults: ['setDoc', 'db', 'coll', 'docID', 'docData']
    };
    this.blocks.doFirebaseSetDoc2 = {
        type: 'command',
        category: 'firebase',
        spec: 'FB: await %FirestoreCU (doc( %t , %t , %t ), { %c });',
        defaults: ['setDoc', 'db', 'coll', 'docID']
    };
    this.blocks.doFirebaseAddDoc = {
        type: 'command',
        category: 'firebase',
        spec: 'FB: await addDoc(doc( %t , %t ), %t );',
        defaults: ['db', 'coll', 'docData']
    };
    this.blocks.doFirebaseAddDoc2 = {
        type: 'command',
        category: 'firebase',
        spec: 'FB: await addDoc(doc( %t , %t ), { %c });',
        defaults: ['db', 'coll']
    };
    this.blocks.reportFirebaseDoc = {
        type: 'report',
        category: 'firebase',
        spec: 'FB: doc( %t , %t , %t )',
        defaults: ['db', 'coll', 'docID']
    };
    this.blocks.reportFirebaseCollection = {
        type: 'report',
        category: 'firebase',
        spec: 'FB: collection( %t , %t )',
        defaults: ['db', 'coll']
    };
    this.blocks.reportFirebaseQuery = {
        type: 'report',
        category: 'firebase',
        spec: 'FB: query(collection( %t , %t ), conds: %exp )',
        defaults: ['db', 'coll']
    };
    this.blocks.reportFirebaseQueryWhere = {
        type: 'report',
        category: 'firebase',
        spec: 'cond: where( %t , %FirebaseRelationalOp , %FirebaseValueType )',
        defaults: ['filed', '== (eq)', 'true']
    };
    this.blocks.reportFirebaseQueryConds = {
        type: 'report',
        category: 'firebase',
        spec: 'cond: %FirebaseQueryConds ( %exp )',
        defaults: ['orderBy("name", "desc")', '']
    };
    this.blocks.doFirebaseGetDoc = {
        type: 'command',
        category: 'firebase',
        spec: '%VariableDeclaration %t %AsignOperator await %FirestoreRD (doc( %t , %t , %t )) ;',
        defaults: ['let', 'doc', '=', 'getDoc', 'db', 'coll', 'docID']
    };
    this.blocks.doFirebaseGetDocs = {
        type: 'command',
        category: 'firebase',
        spec: '%VariableDeclaration %t %AsignOperator await %FirestoreRD ( query: %exp );',
        defaults: ['let', 'querySnapshot', '=', 'getDocs', null]
    };
    this.blocks.doFirebaseAssign = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %FirebaseVariable %AsignOperator %expblank ;',
        defaults: ['let', 'queryResult', '=', '']
    };
    // Eric 20220120 import firebase
    this.blocks.doFirebaseScriptInit = {
        type: 'command',
        category: 'htmlhead',
        spec: '2. <script type = "module"> import firebase modules; %c',
    };
    this.blocks.doFirebaseImportFireStore = {
        type: 'command',
        category: 'htmlhead',
        spec: '3.1 import firebase modules; %t = getFirestore();',
        defaults: ['db']
    };
    this.blocks.doFirebaseImportFireAuth = {
        type: 'command',
        category: 'htmlhead',
        spec: '3.2 import firebase modules; %t = getAuth();',
        defaults: ['auth']
    };
    // Eric 20220120 auth

    this.blocks.doFirebaseAuthSignIn = {
        type: 'command',
        category: 'firebase',
        spec: 'signInWithEmailAndPassword( %t , %t , %t )',
        defaults: ['auth', 'mail', 'password']
    };
    this.blocks.doFirebaseAuthThen = {
        type: 'command',
        category: 'firebase',
        spec: '6. %FirebaseAuth ( %t , %s , %s ).then( ( %t ) =>{ %c }).catch( (error) =>{ %c })',
        defaults: ['signInWithEmailAndPassword', 'auth', 'mail', 'password', 'userCredential']
    };
    this.blocks.doCallFunctionById = {
        type: 'command',
        category: 'firebase',
        spec: '4. %VariableMethodModifier Function %t Element by id %t %c',
        defaults: ['', 'function', 'id']
    };
    this.blocks.doGetValueById = {
        type: 'command',
        category: 'firebase',
        spec: '5. %VariableDeclaration %t get value Element by id %t ',
        defaults: ['const', 'variable', 'id']
    };
    this.blocks.doFirebaseAuthSignInThen = {
        type: 'command',
        category: 'firebase',
        spec: 'signInWithEmailAndPassword( %t , %t , %t ).then( ( %t ) =>{ %c }).catch( (error) =>{ %c })',
        defaults: ['auth', 'mail', 'password', 'userCredential']
    };
    this.blocks.reportFirebaseAuthSignIn = {
        type: 'reporter',
        category: 'firebase',
        spec: 'signInWithEmailAndPassword( %t , %t , %t )',
        defaults: ['auth', 'mail', 'password']
    };
    this.blocks.doFirebaseAuthCreateUser = {
        type: 'command',
        category: 'firebase',
        spec: 'createUserWithEmailAndPassword( %t , %t , %t )',
        defaults: ['auth', 'mail', 'password']
    };
    this.blocks.doFirebaseAuthCreateUserThen = {
        type: 'command',
        category: 'firebase',
        spec: 'createUserWithEmailAndPassword( %t , %t , %t ).then( ( %t ) =>{ %c }).catch( (error) =>{ %c })',
        defaults: ['auth', 'mail', 'password', 'userCredential']
    };
    this.blocks.reportFirebaseAuthCreateUser = {
        type: 'reporter',
        category: 'firebase',
        spec: 'createUserWithEmailAndPassword( %t , %t , %t )',
        defaults: ['auth', 'mail', 'password']
    };
    this.blocks.doFirebaseSendEmailVerification = {
        type: 'command',
        category: 'firebase',
        spec: 'createUserWithEmailAndPassword( %t .currentUser)',
        defaults: ['auth']
    };
    this.blocks.reporterMailVerified = {
        type: 'reporter',
        category: 'firebase',
        spec: '8. get Rmail Verified %t .emailVerified',
        defaults: ['auth']
    };
    this.blocks.doFirebaseSendEmailVerificationThen = {
        type: 'command',
        category: 'firebase',
        spec: '9. createUserWithEmailAndPassword( %t .currentUser).then( () =>{ %c }).catch( (error) =>{ %c })',
        defaults: ['auth']
    };
    this.blocks.reportFirebaseSendEmailVerification = {
        type: 'reporter',
        category: 'firebase',
        spec: 'createUserWithEmailAndPassword( %t .currentUser)',
        defaults: ['auth']
    };
    this.blocks.doOnAuthStateChanged = {
        type: 'command',
        category: 'firebase',
        spec: '7. onAuthStateChanged( %t ,( %t ) =>{ %c })',
        defaults: ['auth', 'user']
    }

    this.blocks.doSignOut = {
        type: 'command',
        category: 'firebase',
        spec: '10. signOut( %t })',
        defaults: ['auth']
    }
    // Eric 20211210 add function
    this.blocks.doFirebaseAddFunction = {
        type: 'command',
        category: 'control2',
        spec: 'FB:addDoc async %t ( %exp ) { %br try { %br %t = await addDoc(collection( %t , %t ), %br key-values:{ %c }); success: %c } catch ( %t ) { %c }',
        defaults: ['addDocument', [''], 'docRef', 'db', 'aCollection', null, null, 'e']
    };
    // Eric 20211210 data item
    this.blocks.doFirebaseDataItem = {
        type: 'command',
        category: 'firebase',
        spec: 'FB:docItem %s :  %FirebaseValueType %EndDelimiter',
        defaults: ['key', '"string"', ',']
    };
//    this.blocks.doFirebaseDataItem2 = {
//        type: 'command',
//        category: 'firebase',
//        spec: 'FB:docItem %s : %FirebaseValueType %EndDelimiter',
//        defaults: ['key', '"string"', ',']
//    };
    // Eric 20211210 get function
    this.blocks.doFirebaseGetFunction = {
        type: 'command',
        category: 'control2',
        spec: 'FB: %t ( %exp ) { %br %t  = Data %t collection = %s %br docs forEach %t %c %c }',
        defaults: ['getDocs', [''], 'docs', 'db', '', 'doc']
    };
    // Eric 20211210 doc id Or Data
    this.blocks.reportFirebaseDocIdOrData = {
        type: 'report',
        category: 'firebase',
        spec: 'FB: %t . %Firebasedoc %s',
        defaults: ['doc', 'id']
    };
    // Eric 20211210 getbyid function
    this.blocks.doFirebaseGetByIdFunction = {
        type: 'command',
        category: 'control2',
        spec: 'Firebase get function %t ( %exp ) { %br doc = %t Data %t collection = %s id = %s %c }',
        defaults: ['getDataById', ['id'], 'doc', 'db', '', 'id']
    };
    // Eric 20211210 getbyid function
    this.blocks.doFirebaseSearchFunction = {
        type: 'command',
        category: 'control2',
        spec: 'Firebase search function %t ( %exp ) { %br docs = %t Data %t collection = %s where %s %s %s %br docs forEach %t %c %c }',
        defaults: ['searchData', [''], 'docs', 'db', '', '', '', '', 'doc']
    };
    // Eric 20211210 update function
    this.blocks.doFirebaseUpdateFunction = {
        type: 'command',
        category: 'control2',
        spec: 'Firebase update function %t ( %exp ) { %br doc = %t Data %t collection = %s id = %s data = %c %c }',
        defaults: ['updateData', ['id'], 'docRef', 'db', '', 'id']
    };
    // Eric 20211210 delete function
    this.blocks.doFirebaseDeleteFunction = {
        type: 'command',
        category: 'control2',
        spec: 'Firebase delete function %t ( %exp ) { %br res = %t Data %t collection = %s id = %s %c }',
        defaults: ['updateData', ['id'], 'res', 'db', '', 'id']
    };
    // Eric 20211210 getElementById onClick
    this.blocks.doElementByIdOnClick = {
        type: 'command',
        category: 'JavaScript',
        spec: 'Get Element Id %s EventListener func %s',
        defaults: ['', '']
    };
    this.blocks.doFirebaseInit = {
        type: 'command',
        category: 'firebase',
        spec: ' %t = getFirestore();',
        defaults: ['db']
    }

    this.blocks.reportFirebaseFirestore = {
        type: 'reporter',
        category: 'firebase',
        spec: 'Firestore %Firestore',
        defaults: ['getFirestore']
    }

    this.blocks.doFirebaseAdd = {
        type: 'command',
        category: 'firebase',
        spec: '1. Firebase add data %t collection %s { %c }',
        defaults: ['db', '']
    }

    this.blocks.reportFirebaseAdd = {
        type: 'reporter',
        category: 'firebase',
        spec: '1. Firebase add data %t collection %s { %c }',
        defaults: ['db', '']
    }

    this.blocks.reportFirebaseGetAll = {
        type: 'reporter',
        category: 'firebase',
        spec: '2.a Firebase Get collection data %t collection %s',
        defaults: ['db', '']
    }

    this.blocks.reportFirebaseGet = {
        type: 'reporter',
        category: 'firebase',
        spec: '2.b Firebase Get collection data ( %s )',
        defaults: ['']
    }

    this.blocks.reportFirebaseGetId = {
        type: 'reporter',
        category: 'firebase',
        spec: '2.c Firebase Get data %t collection %s id %s',
        defaults: ['db', '', '']
    }

//    this.blocks.reportFirebaseQuery = {
//        type: 'reporter',
//        category: 'firebase',
//        spec: '3 Firebase query collection data %t collection %s where %s %s %s',
//        defaults: ['db', '', '', '"=="', '']
//    }

    this.blocks.doFirebaseUpdateData = {
        type: 'command',
        category: 'firebase',
        spec: '4. Firebase update data %t collection %s id %s { %c }',
        defaults: ['db', '', '']
    }

    this.blocks.reportFirebaseUpdateData = {
        type: 'reporter',
        category: 'firebase',
        spec: '4. Firebase update data %t collection %s id %s { %c }',
        defaults: ['db', '', '']
    }

    this.blocks.doFirebaseDeleteData = {
        type: 'command',
        category: 'firebase',
        spec: '5. Firebase delete data %t collection %s id %s ',
        defaults: ['db', '', '']
    }

    this.blocks.reportFirebaseDeleteData = {
        type: 'reporter',
        category: 'firebase',
        spec: '5. Firebase delete data %t collection %s id %s ',
        defaults: ['db', '', '']
    }

// HTML DOM
    this.blocks.reportTagConstant = {
        type: 'reporter',
        category: 'html',
        spec: 'Tag P: %TagConstant ',
        defaults: ['attributes']
    };
    this.blocks.reportDomConstant = {
        type: 'reporter',
        category: 'html',
        spec: 'Dom P: %DomConstant ',
        defaults: ['document.title']
    };
    this.blocks.reportDomDocumentFunction = {
        type: 'reporter',
        category: 'html',
        spec: 'Dom Fn: %DomDocumentFunction ( %exp )',
        defaults: ['document.getElementById']
    };

    this.blocks.reportDomElementFunctionProperty = {
        type: 'reporter',
        category: 'html',
        spec: 'Elm p: %DomDocumentFunction ( %exp ) . %TagConstant ',
        defaults: ['document.getElementById', '', 'innerHTML']
    };
    this.blocks.reportDomEvent = {
        type: 'reporter',
        category: 'html',
        spec: 'Dom event: %element . %DomEvent ',
        defaults: ['window', 'onload']
    }

    this.blocks.doDomDocumentFunction = {
        type: 'command',
        category: 'html',
        spec: 'Dom Fn: %DomDocumentFunction ( %exp )',
        defaults: ['document.getElementById']
    };

    this.blocks.doDomElementFunction = {
        type: 'command',
        category: 'html',
        spec: 'Elm Fn: %s . %DomElementFunction ( %IonicElementEvent , %exp )',
        defaults: ['elm', 'addEventListener', 'ionChange']
    };

    this.blocks.doDomGetElementAddEventFunction = {
        type: 'command',
        category: 'html',
        spec: 'Reg Event: %t .getElementById( %t ).addEventListener( %IonicElementEvent , %exp )',
        defaults: ['elm', 'id', 'ionChange', ["callback"]]
    };

    this.blocks.doDomDocumentFunctionConst = {
        type: 'command',
        category: 'html',
        spec: '%VariableDeclaration %t %AsignOperator %DomDocumentFunction ( %exp ) %EndDelimiter ',
        defaults: ['const', 'elm', '=', 'document.getElementById', [''], ';']
    };

    this.blocks.reportCordovaFunction = {
        type: 'reporter',
        category: 'operators',
        spec: 'Cordova Fn: %CordovaFuntion ( %exp )',
        defaults: ['navigator.camera.getPicture']
    };


    this.blocks.doBatteryEvent = {
        type: 'command',
        category: 'cordova',
        spec: 'Battery: window.addEventListener( %BatteryEvent , %exp )',
        defaults: ['batterystatus']
    };

    this.blocks.doCordovaFunction1 = {
        type: 'command',
        category: 'cordova',
        spec: 'Cordova Fn: %CordovaFunction1 ( %exp );',
        defaults: ['navigator.accelerometer.clearWatch']
    };

    this.blocks.doCordovaFunction2 = {
        type: 'command',
        category: 'cordova',
        spec: 'Cordova Fn: %CordovaFunction2 ( %exp )',
        defaults: ['WifiWizard2.startScan']
    };


    this.blocks.doCordovaCalllBackFunction1 = {
        type: 'command',
        category: 'cordova',
        spec: 'Cordova CB Fn: %CordovaCallBackFunction1 ( %t , %t )',
        defaults: ['navigator.accelerometer.getCurrentAcceleration', 'onSuccess', 'onFail']
    };

    this.blocks.doCordovaCalllBackFunction2 = {
        type: 'command',
        category: 'cordova',
        spec: 'Cordova CB Fn: %CordovaCallBackFunction2 ( %t , %t , %s )',
        defaults: ['navigator.camera.getPicture', 'onSuccess', 'onFail', '']
    };


    this.blocks.reportCordovaCalllBackFunction2 = {
        type: 'report',
        category: 'cordova',
        spec: 'Cordova CB Fn: %CordovaCallBackFunction2 ( %t , %t , %s )',
        defaults: ['navigator.camera.getPicture', 'onSuccess', 'onFail', '']
    };

    this.blocks.reportCordovaProperty = {
        type: 'reporter',
        category: 'variables',
        spec: ' %s . %CordovaProperty ',
        defaults: ['device', 'model']
    };

    this.blocks.doCordovaDomDocumentFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: 'Dom Fn: %DomDocumentFunction ( %CordovaEvent , %exp )',
        defaults: ['document.addEventListener', '"deviceready"']
    };


// Vue

    this.blocks.doVueFileOptions = {
        type: 'command',
        category: 'vue',
        spec: '1. Set Vue %t and %t ',
        defaults: ['_options', 'loadModule']
    };

    this.blocks.reportVueFile = {
        type: 'reporter',
        category: 'variables',
        spec: 'R2: component:  %t (" %s ", %t ))',
        defaults: ['loadModule', 'your.vue', '_options']
    };


    this.blocks.doLoadVueFile = {
        type: 'command',
        category: 'vue',
        spec: 'C3 componets:  %s : %t (" %t .vue", %t ))',
        defaults: ['VueSFC', 'loadModule', 'VueSFC', '_options']
    };

    this.blocks.doHtmlVueIonic = {
        type: 'command',
        category: 'htmlbody',
        spec: 'Vue+Ionic: <html %htmlKeys = %htmlValues > <head> <import Libs> <title> %s </title> %c </head> <body> <div id = " %t "> <srcipt> %c  </script> </body> </html>',
        defaults: ['lang', 'en', 'My Vue Html Page', null, '_root']
    };
	
    this.blocks.doHtmlVueIonic2 = {
        type: 'command',
        category: 'htmlbody',
        spec: 'Vue+Ionic: <html %htmlKeys = %htmlValues > <head> <import Libs><title> %s  </title> %c </head> <body> <div id = " %t ">  %c <srcipt> %c  </script> </body> </html>',
        defaults: ['lang', 'en', 'My Vue Html Page', null, '_root']
    };
	
	this.blocks.doVueFile = {
        type: 'command',
        category: 'vue',
        spec: '<script Components:(import SFC) > %c <template> %c <script setup> %c <style> %c',
    };

    this.blocks.doVueMain = {
        type: 'command',
        category: 'vue',
        spec: '1: Root Comp: %VariableDeclaration %VueVariable = %VueObjectFunction ({  %c',
        defaults: ['const', '_app', 'Vue.createApp', null]
    };

    this.blocks.doVueMain2 = {
        type: 'command',
        category: 'vue',
        spec: '1: fn call1 %VariableDeclaration %VueVariable = %VueObjectFunction1 ( %exp )',
        defaults: ['const', '_vm', '_app.mount']
    };

    this.blocks.doVueMain2A = {
        type: 'command',
        category: 'vue',
        spec: '1: fn call2 %VueObjectFunction1 ( %exp )',
        defaults: ['_app.use']
    };

    // VueGlobalComponent
    this.blocks.doVueMain3 = {
        type: 'command',
        category: 'vue',
        spec: '1: Global Comp: %VueObjectFunction2 (" %t ", { %c',
        defaults: ['_app.component', 'MyComp']
    };
    // VueLocalComponent
    this.blocks.doVueMain4 = {
        type: 'command',
        category: 'vue',
        spec: '1: Local Comp: %VariableDeclaration %t = { %c',
        defaults: ['const', 'LocalComp']
    };

    this.blocks.doVueData = {
        type: 'command',
        category: 'vue',
        spec: 'C2: data() { return { %c',
        defaults: []
    };

    this.blocks.doVueDataProvide = {
        type: 'command',
        category: 'vue',
        spec: 'C2: %dataProvide () { return { %c',
        defaults: ['data']
    };

    this.blocks.doVueDataKeyValue = {
        type: 'command',
        category: 'vue',
        spec: 'B3C2: %VueDataKey : %VueDataKeyValue ,',
        defaults: ['props', '["value"]']
    };

    this.blocks.doVueMethods = {
        type: 'command',
        category: 'vue',
        spec: 'C2: %VueMethods : { %c',
        defaults: ['methods']
    };

    this.blocks.doVueMethodsFunction = {
        type: 'command',
        category: 'vue',
        spec: 'C3: %t ( %exp ) { %c',
        defaults: ['func']
    };

    this.blocks.doVueTemplate = {
        type: 'command',
        category: 'vue',
        spec: 'C2: template: ` %c',
        defaults: []
    };

    //20220630 eric
    this.blocks.doScriptSetupExportVueComponents = {
        type: 'command',
        category: 'vue',
        spec: 'A1: <script> export default { Components: { %c',
    };

    this.blocks.doScriptSetupImportSFC = {
        type: 'command',
        category: 'vue',
        spec: "A2 import SFC %t from './ %s .vue'",
        defaults: ['VueSFC', 'VueSFC']
    };

    //20220801 FCC
    this.blocks.doScriptSetupExportDefulat = {
        type: 'command',
        category: 'vue',
        spec: 'B2: export default %VueExportDefault ({ %c',
        defaults: ['defineComponent']
    };

    this.blocks.doScriptSetupExportDefault = {// componets, provide, ...
        type: 'command',
        category: 'vue',
        spec: '1: export default { %c',
    };


    this.blocks.doVueTemplateTag = {
        type: 'command',
        category: 'vue',
        spec: 'A1B1: < %VueComponent %VueComponentOption > %c',
        defaults: ['template', '']
    };

    this.blocks.doVueScriptSetupAssign = {
        type: 'command',
        category: 'vue',
        spec: 'A2B3: %VariableDeclaration %t %AsignOperator %ScriptSetupFunc ( %setupValue )',
        defaults: ['const', 'varReact', '=', 'Vue.reactive', '{ count: 0 }']
    };


    this.blocks.doVueHooks = {
        type: 'command',
        category: 'vue',
        spec: 'C2: hook: %VueHooks ( %exp0 ) { %c',
        defaults: ['mounted']
    };

    this.blocks.doVueSetup = {
        type: 'command',
        category: 'vue',
        spec: 'B2: setup ( %t , { %t , %t , %t , %t } ) { %c return { %c',
        defaults: ['props', 'attrs', 'slots', 'emit', 'expose']
    };

    this.blocks.doVueSetup2 = {
        type: 'command',
        category: 'vue',
        spec: 'B2: setup ( %exp ) { %c return { %c',
        defaults: []
    };

    this.blocks.doVueSetupAssign = {
        type: 'command',
        category: 'vue',
        spec: 'B3: setup %VariableDeclaration %t %AsignOperator %setupFunc ( %setupValue )',
        defaults: ['const', 'varReact', '=', 'Vue.reactive', '{ count: 0 }']
    };


    this.blocks.doVueSetupHook = {
        type: 'command',
        category: 'vue',
        spec: 'A2B3: hook: %VueSetupHooks ( %exp )',
        defaults: ['onMounted']
    };


    this.blocks.doVueSetupReturnValues = {
        type: 'command',
        category: 'vue',
        spec: 'B3: setup return %exp ,',
        defaults: ['']
    };


    this.blocks.reportVueDirective = {
        type: 'reporter',
        category: 'properties',
        spec: 'html p: %VueControl %VueControlOperator %VueControlValue ',
        defaults: ['v-for', '=', '"(item, index) of items"']
    };

    this.blocks.reportVueDirective2 = {
        type: 'reporter',
        category: 'properties',
        spec: 'html p: %VueDirective2',
        defaults: ['v-once']
    };
    this.blocks.reportVueHtmlEvent = {
        type: 'reporter',
        category: 'properties',
        spec: 'event: %VueEvent %VueSubEvent =" %VueEventValue "',
        defaults: ['@click', '', 'func']
    };


    this.blocks.doVueCSS = {
        type: 'command',
        category: 'vue',
        spec: 'css: %VueCSS { %c',
        defaults: ['v-enter-active']
    };

    this.blocks.reportVueObjectProperty = {
        type: 'reporter',
        category: 'variables',
        spec: 'vue: %VueThis . %VueProperty ',
        defaults: ['this', 'property']
    };

    this.blocks.reportVueKeyValue = {
        type: 'reporter',
        category: 'variables',
        spec: 'vue: %VueKey : %VueValue ',
        defaults: ['key', 'value']
    };

    this.blocks.doVuexStore = {
        type: 'command',
        category: 'vue',
        spec: 'RS1: Router/Store: %VariableDeclaration %VueVariable = %VueObjectFunction ({  %c',
        defaults: ['const', '_store', 'Vuex.createStore', null]
    };


    this.blocks.doVuexStoreFunction = {
        type: 'command',
        category: 'vue',
        spec: 'S2: Store fn: %VuexMethods : { %c',
        defaults: ['state']
    };

    this.blocks.doVuexFunctionCall = {
        type: 'command',
        category: 'vue',
        spec: 'S3: store FC:  %VuexObjectFunctionCall ( %exp )',
        defaults: ['this.$store.commit']
    };

    this.blocks.doVueRouterRoute = {
        type: 'command',
        category: 'vue',
        spec: 'R1: Route: %VariableDeclaration %VueVariable = [  %c',
        defaults: ['const', '_routes', null]
    };

    this.blocks.doVueRouterRouteItem = {
        type: 'command',
        category: 'vue',
        spec: 'R2: Route: %RouteKey : %RouteValue ,',
        defaults: ['path', "'/'"]
    };


    this.blocks.doVueRouterItem = {
        type: 'command',
        category: 'vue',
        spec: 'R2: Router: %RouterKey : %RouterValue ,',
        defaults: ['history', 'VueRouter.createWebHistory()']
    };
	
	this.blocks.doVueRouterPathAndComponent = {
        type: 'command',
        spec: 'R2: { Router path : "/ %s " component: " %s .vue") },',
        category: 'vue',
        defaults: ['', 'App']
    };
	

    this.blocks.doVueHTML5RouterLink = {
        type: 'command',
        category: 'html',
        spec: 'Router Link: < %VueRouterHTML5 p: %expblank > %expblank </>',
        defaults: ['router-link', '', '']
    };

    this.blocks.reportVueHTML5RouterLinkProperty = {
        type: 'reporter',
        category: 'properties',
        spec: 'Router p: %VueRouterLinkKey %VueControlOperator %VueRouterLinkValue ',
        defaults: ['to', '=', '"/home"']
    };
// React
    this.blocks.doHtmlReact = {
        type: 'command',
        category: 'htmlbody',
        spec: '1 RA: <html %htmlKeys = " %htmlValues "> <head> <title> %s </title> %c </head> <body> <div id = " %t "> <import React Libs> <srcipt type = "text/babel"> %c  </script> </body> </html>',
        defaults: ['lang', 'en', 'My React Html Page', null, 'HtmlDiv']
    };
    this.blocks.doHtmlReactIonic = {
        type: 'command',
        category: 'htmlbody',
        spec: '1 RA+Ionic: <html %htmlKeys = %htmlValues > <head> <title> %s </title> %c </head> <body> <div id = " %t "> <import React+Ionic Libs> <srcipt type = "text/babel"> %c  </script> </body> </html>',
        defaults: ['lang', 'en', 'My React Html Page', null, 'HtmlDiv']
    };
    this.blocks.doReactImportJavaScriptLibs = {
        type: 'command',
        category: 'react',
        spec: 'RA: Import React JavaScript Libs',
        defaults: []
    };
    this.blocks.doReactImportHooks = {
        type: 'command',
        category: 'react',
        spec: 'Hook1 import hook lib: const { useState, ... } = React;',
        defaults: []
    };
    this.blocks.doReactUseStateHooks = {
        type: 'command',
        category: 'react',
        spec: 'Hook2 State: [ %t , %t ] = useState( %ReactStateValue );',
        defaults: ['count', 'setCount', '0']
    };
    this.blocks.doReactSetState = {
        type: 'command',
        category: 'react',
        spec: ' %s (( %exp ) => %s );',
        defaults: ['setState', [''], 'newState']
    };
    this.blocks.doReactSetState2 = {
        type: 'command',
        category: 'react',
        spec: ' %s (( %exp ) => %c',
        defaults: ['setState', [''], null]
    };
    this.blocks.reportReactSetState = {
        type: 'reporter',
        category: 'react',
        spec: 'RA FnC: %ReactFunction ( %exp )',
        defaults: ['setState', ['']]
    };
    this.blocks.doReactUseEffectHooks = {
        type: 'command',
        category: 'react',
        spec: 'Hook2 Effect: %EffectHook ( %AsyncAwait ( %exp ) => { %c });',
        defaults: ['useEffect']
    };
    this.blocks.doReactUseEffectHook2 = {
        type: 'command',
        category: 'react',
        spec: 'Hook2 Effect: %EffectHook ( %AsyncAwait ( %exp ) => { %c }, %s );',
        defaults: ['useEffect', '', null, null, '[]']
    };
    this.blocks.doReactUseContextHooks = {
        type: 'command',
        category: 'react',
        spec: 'Hook2 Context: %t = %ContextHook ( %s );',
        defaults: ['context', 'useContext']
    };
    this.blocks.doReactUseReducerHook = {
        type: 'command',
        category: 'react',
        spec: 'Hook2 reducer: [ %t , %t ] = useReducer( %s , %ReactStateValue  );',
        defaults: ['state', 'dispatch', 'reducer', '{key:value}']
    };
    this.blocks.doReactUseReducerHook2 = {
        type: 'command',
        category: 'react',
        spec: 'Hook2 reducer: [ %t , %t ] = useReducer( %s , %s , %s  );',
        defaults: ['state', 'dispatch', 'reducer', 'initArg', 'initFunc']
    };
    this.blocks.doReactFunction = {
        type: 'command',
        category: 'react',
        spec: '2A: %VariableDeclaration %t = %AsyncAwait ( %exp ) => { %c',
        defaults: ['const', 'RAComp', ['']]
    };
    this.blocks.doReactFunction2 = {
        type: 'command',
        category: 'react',
        spec: '2A: %VariableMethodModifier func %t ( %exp ) { %c',
        defaults: ['', 'RAComp', ['']]
    };
    this.blocks.doReactFunction3 = {
        type: 'command',
        category: 'react',
        spec: '2A: %VariableDeclaration %t = %AsyncAwait ( %exp ) => { %c return ( %c );}',
        defaults: ['const', 'RAComp', '', ['props']]
    };

    this.blocks.doReactFunction4 = {
        type: 'command',
        category: 'react',
        spec: '2A: %VariableMethodModifier func %t ( %exp ) { %c return ( %c',
        defaults: ['', 'RAComp', ['']]
    };
    this.blocks.doReactFunction5 = {
        type: 'command',
        category: 'react',
        spec: '2A: %VariableDeclaration %t = %AsyncAwait ( %exp ) => { %c return ( %c',
        defaults: ['const', 'RAComp', ['']]
    };
    this.blocks.doReactDOMRender = {
        type: 'command',
        category: 'JavaScript',
        spec: '3: ReactDOM.render(< %expblank />, document.getElementById(" %s ");',
        defaults: [['RAComp'], 'HtmlDiv']
    };

    this.blocks.doReactRender = {
        type: 'command',
        category: 'JavaScript',
        spec: '3: %t .render(< %expblank />);',
        defaults: ['root', ['RAComp']]
    };

    this.blocks.reportReactConstant = {
        type: 'reporter',
        category: 'react',
        spec: 'RA c: %ReactConstant ',
        defaults: ['props']
    };
    this.blocks.reportReactElement = {
        type: 'reporter',
        category: 'operators',
        spec: 'RA tag: < %expblank />'
    };
    this.blocks.reportReactDOMFunction = {
        type: 'reporter',
        category: 'react',
        spec: 'ReactDOM. %ReactDOMFunction ( %exp )',
        defaults: ['render']
    };
    this.blocks.reportReactDOMTag = {
        type: 'reporter',
        category: 'react',
        spec: 'RA tag: < %expblank />',
        defaults: ['']
    };
    this.blocks.reportReactEvent = {
        type: 'reporter',
        category: 'properties',
        spec: 'RA event: %ReactEvent = { %ReactEventValue }',
        defaults: ['onClick', "alert('click event')"]
    };
    this.blocks.reportReactEvent2 = {
        type: 'reporter',
        category: 'properties',
        spec: 'RA event: %ReactEvent = { ( %exp ) => %c',
        defaults: ['onClick', '', ]
    };
    this.blocks.reportReactProperty = {
        type: 'reporter',
        category: 'properties',
        spec: 'RA p: %ReactProperty = { %ReactPropertyValue }',
        defaults: ['p', "v"]
    };
    this.blocks.reportReactArrowFunction = {
        type: 'reporter',
        category: 'operators',
        spec: 'RA f: ( %exp ) => %c',
        defaults: ['']
    };
    this.blocks.reportReactArrowFunction2 = {
        type: 'reporter',
        category: 'operators',
        spec: 'RA f: ( %exp ) => %s ',
        defaults: ['']
    };
    this.blocks.doReactArrowFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: 'RA m: %t = ( %exp ) => { %c }',
        defaults: ['mName', ['']]
    };
    this.blocks.doReactClassMethod = {
        type: 'command',
        category: 'JavaScript',
        spec: 'RA m: %VariableMethodModifier %ReactComponentFunction ( %exp ) { %c }',
        defaults: ['', 'render()', ['']]
    };
    this.blocks.doReactReturn = {
        type: 'command',
        category: 'react',
        spec: '2B: return ( %c );',
        defaults: []
    };
    this.blocks.doReactDOMFunction = {
        type: 'command',
        category: 'react',
        spec: 'RA FnC: %ReactFunction ( %exp )',
        defaults: ['setState']
    };
//    this.blocks.reportReactDOMFunction = {
//        type: 'reporter',
//        category: 'react',
//        spec: 'RA FnC: %ReactFunction ( %exp )',
//        defaults: ['setState']
//    };
// phpMySQL

    this.blocks.doPhpContainer = {
        type: 'command',
        category: 'phpMySQL',
        spec: '<?php %c ?>',
        defaults: []
    };

    this.blocks.reportPhpContainer = {
        type: 'reporter',
        category: 'phpMySQL',
        spec: '<?php %exp ?>',
        defaults: []
    };

    this.blocks.reportPhpBuiltInFunction = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunction ( %exp ) ",
        defaults: ['section_start', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionArray = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionArray ( %exp ) ",
        defaults: ['array(value1,value2,value3,etc.)', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionCalendarDate = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionCalendarDate ( %exp ) ",
        defaults: ['Calendar/Date', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionDirectory = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionDirectory ( %exp ) ",
        defaults: ['directory', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionFilesystem = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionFilesystem ( %exp ) ",
        defaults: ['file system', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionFTP = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionFTP ( %exp ) ",
        defaults: ['ftp/network', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionJSON = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionJSON ( %exp ) ",
        defaults: ['json/mail/variable', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionMath = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionMath ( %exp ) ",
        defaults: ['math/conversion', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionMysqli = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionMysqli ( %exp ) ",
        defaults: ['mysqli/PDO', ['']]
    };

    this.blocks.reportPhpBuiltInFunctionString = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "php fn: %PhpBuiltInFunctionString ( %exp ) ",
        defaults: ['string', ['']]
    };

    this.blocks.reportPhpGlobalVariable = {
        type: 'reporter',
        category: 'operators',
        spec: 'php gv: %PhpGlobalVariable [ %s ]',
        defaults: ['$_POST', '']
    };
    this.blocks.doPhpEcho = {
        type: 'command',
        category: 'phpMySQL',
        spec: '%PhpBuiltInFunction2 %expblank ;',
        defaults: ['echo']
    };
    this.blocks.doPhpEcho2 = {
        type: 'command',
        category: 'phpMySQL',
        spec: 'echo " %expblank ";',
        defaults: [['']]
    };
    this.blocks.doPhpDie = {
        type: 'command',
        category: 'phpMySQL',
        spec: '%PhpBuiltInFunction ( %exp );',
        defaults: ['die(message)']
    };
    this.blocks.doPhpTextAssignment = {
        type: 'command',
        category: 'phpMySQL',
        spec: '1 %t = <<<_end %c _end',
        defaults: ["$SQLStatement"]
    };
    this.blocks.doPhpAssignment = {
        type: 'command',
        category: 'phpMySQL',
        spec: ' %t = %expblank ;',
        defaults: ["$var"]
    };
    this.blocks.doPhpAssignment2 = {
        type: 'command',
        category: 'phpMySQL',
        spec: ' %s = %expblank ;',
        defaults: ["$var"]
    };
    //$connect = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    this.blocks.doPhp_PDO = {
        type: 'command',
        category: 'phpMySQL',
        spec: '1: %t = new PDO( %PDO_dsn , %t , %t );',
        defaults: ["$pdo", '"mysql:host=localhost;port=3306;dbname=db"', "$userName", "$password"]
    };
//    this.blocks.reportdoPhp_PDO_dsn = {
//        type: 'reporter',
//        category: 'operatorsMySQL',
//        spec: " %PDO_dsn ",
//        defaults: ['']
//    };
    this.blocks.reportPDOFunction = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "f: %PDOObject -> %PDOFunction ( %exp0 ) ",
        defaults: ['$pdo', 'query("SQL Statement")']
    };
    this.blocks.doPhp_mysqli_connect = {
        type: 'command',
        category: 'phpMySQL',
        spec: '1: %t = mysqli_connect( %t , %t , %t , %t );',
        defaults: ["$dbConnect", "$host", "$userName", "$password", "$database"]
    };
    this.blocks.reportSQLFunction = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "f: %SQLObject -> %SQLFunction ( %exp0 ) ",
        defaults: ['$dbConnect', 'field_count()']
    };
    this.blocks.reportSQLField = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: "c: %SQLObject -> %SQLField ",
        defaults: ['$dbConnect', 'connect_errno']
    };
    this.blocks.doPhp_mysqli_query = {
        type: 'command',
        category: 'phpMySQL',
        spec: '2: %t = mysqli_query( %t , %t );',
        defaults: ["$queryResult", "$dbConnect", "$SQLStatement"]
    };
    //20220825 Eric 
    this.blocks.doPhp_mysqli_stmt = {
        type: 'command',
        category: 'phpMySQL',
        spec: '2i: %t = mysqli_prepare( %t , %t );',
        defaults: ["$stmt", "$dbConnect", "$SQLStatement"]
    };
    this.blocks.doPhp_mysqli_fetch_all = {
        type: 'command',
        category: 'phpMySQL',
        spec: '3a: %t = mysqli_fetch_all( %t );',
        defaults: ["$dbRecords", "$queryResult"]
    };
    this.blocks.doPhp_mysqli_fetch_array = {
        type: 'command',
        category: 'phpMySQL',
        spec: '3b: %t = mysqli_fetch_array( %t , MYSQLI_BOTH );',
        defaults: ["$dbRecord", "$queryResult"]
    };
    this.blocks.doPhp_mysqli_close = {
        type: 'command',
        category: 'phpMySQL',
        spec: '4: mysqli_close( %t );',
        defaults: ["$dbConnect"]
    };
    this.blocks.doPhpForEach = {
        type: 'command',
        category: 'phpMySQL',
        spec: '3: foreach( %t as %t => %t ) { %c',
        defaults: ["$dbRecords", "$key", "$record"]
    };
    this.blocks.doPhpTryCatch = {
        type: 'command',
        category: 'phpMySQL',
        spec: 'try{ %c } catch ( %t %t ) { %c',
        defaults: [null, 'Exception', '$e']
    };
    this.blocks.doPhpHtmlTable = {
        type: 'command',
        category: 'phpMySQL',
        spec: "3a: echo 'table: < %table1 p: %exp0blank >' %c",
        defaults: ['table', ['']]
    };
    this.blocks.doPhpHtmlTable2 = {
        type: 'command',
        category: 'phpMySQL',
        spec: "3b: echo 'table: %table p: %exp0blank >' Text: %expblank />",
        defaults: ['td', ['']]
    };
    this.blocks.doSqlSelectFrom = {
        type: 'command',
        category: 'MySQL',
        spec: "2a SEL: SELECT %SelectOption f: %exp FROM %exp ",
        defaults: ['DISTINCT', '*', 't']
    };
    this.blocks.doSqlSelectJoin = {
        type: 'command',
        category: 'html',
        spec: "2b SEL: %SelectJoin %s %SelectJoinOnUsing %exp ",
        defaults: ['JOIN', '$table', 'ON', 'c']
    };
    this.blocks.reportSqlSelectAsExpression = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: '3 alias: %s AS %s ',
        defaults: ['fName', 'aliasName']
    };
    this.blocks.reportSqlSelectFunction = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: '3 field fn: %FieldFunction ( %exp )',
        defaults: ['COUNT', '*']
    };
    this.blocks.doSqlSelectFromWhere = {
        type: 'command',
        category: 'MySQL',
        spec: "2c SEL: WHERE %s ",
        defaults: ['$conditions']
    };
    this.blocks.reportSqlWhereCondition = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: '3 cond:( %s %SqlOperator %s )',
        defaults: ['$field', '=', 'value']
    };
    this.blocks.reportSqlWhereConditionSubQuery = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: '3 sub Query: %SubQueryOp ( %c',
        defaults: []
    };
    this.blocks.doSqlSelectFromGroupBy = {
        type: 'command',
        category: 'MySQL',
        spec: "2d SEL: GROUP BY %exp ",
        defaults: ['g']
    };
    this.blocks.doSqlSelectFromHaving = {
        type: 'command',
        category: 'MySQL',
        spec: "2e SEL: HAVING %s ",
        defaults: ['$groupByConditions']
    };
    this.blocks.doSqlSelectFromOrderBy = {
        type: 'command',
        category: 'MySQL',
        spec: "2f SEL: ORDER BY %exp ",
        defaults: ['f']
    };
    this.blocks.reportSqlOrderByField = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: '3 field: %s %OrderDir ',
        defaults: ['$field', 'ASC']
    };

    this.blocks.doSqlSelectFromLimit = {
        type: 'command',
        category: 'MySQL',
        spec: "2g SEL: LIMIT %s ",
        defaults: ['0, 20'] // page, # of records
    };

    this.blocks.doSqlSelectSetBagOp = {
        type: 'command',
        category: 'MySQL',
        spec: "2h SEL: %SetBagOp ",
        defaults: ['UNION'] // page, # of records
    };
    this.blocks.doSqlInsert = {
        type: 'command',
        category: 'MySQL',
        spec: "2 INS: INSERT INTO %s ( %s ) values( %s );",
        defaults: ['$table', '$fields', '$values']
    };
    this.blocks.doSqlInsert2 = {
        type: 'command',
        category: 'MySQL',
        spec: "2 INS: INSERT INTO %s values( %s );",
        defaults: ['$table', '$values']
    };
    this.blocks.doSqlDelete = {
        type: 'command',
        category: 'MySQL',
        spec: "2 DEL: DELETE FROM %s ",
        defaults: ['$table']
    };
    this.blocks.doSqlUpdate = {
        type: 'command',
        category: 'MySQL',
        spec: "2 UPD: UPDATE %s SET %s ",
        defaults: ['$table', '$fields']
    };
    this.blocks.doSqlAlter = {
        type: 'command',
        category: 'MySQL',
        spec: "2 TB: ALTER TABLE %s %PhpSqlAlterTable %c",
        defaults: ['$table', 'ADD']
    };
    this.blocks.doSqlAlterReferentialConstraint = {
        type: 'command',
        category: 'MySQL',
        spec: "2 ALT: ALTER TABLE %s %PhpSqlAlterTable C: %s FOREIGN KEY ( %s ) REFERENCES %s ",
        defaults: ['$table', 'ADD CONSTRAINT', '$constraint', '$field', '$table_field']
    };

    this.blocks.doSqlCreateDB = {
        type: 'command',
        category: 'MySQL',
        spec: "2 DB/TB: %DBCommand %DBExist %s Opts: %exp ",
        defaults: ['CREATE DATABASE', '', '$dbName', '']
    };
    this.blocks.reportSqlCreateDBOption = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: '2 DB opt: %DBOptionKey %DBOptionValue ',
        defaults: ['CHARACTER SET', 'utf8']
    };
    this.blocks.doSqlCreateDB2 = {
        type: 'command',
        category: 'MySQL',
        spec: "2 DB: %DBCommand %DBOBject %DBExist %s CHARACTER SET %CharSetOpt COLLATE %CollectOpt",
        defaults: ['CREATE', 'DATABASE', '', '$dbObj', 'utf8mb4', 'utf8mb4_unicode_ci']
    };


    this.blocks.doSqlCreateTable = {
        type: 'command',
        category: 'MySQL',
        spec: "2 TB: %TableCommand %DBExist %s fields:( %c",
        defaults: ['CREATE TABLE', '', '$tbName']
    };


    this.blocks.doSqlCreateTableField = {
        type: 'command',
        category: 'MySQL',
        spec: "3 TB field: %s %FieldType %FieldOption %EndDelimiter ",
        defaults: ['$fieldName', 'INT', '', ',']
    };
//    %FieldConstraint
    this.blocks.doSqlCreateTableFieldConstraint = {
        type: 'command',
        category: 'MySQL',
        spec: "3 TB constraint: %FieldConstraint %EndDelimiter ",
        defaults: ['PRIMARY KEY ($id)', ',']
    };

    this.blocks.reportSqlCreateDBOption = {
        type: 'reporter',
        category: 'operatorsMySQL',
        spec: '3 TB opt: %DBOptionKey %DBOptionValue ',
        defaults: ['CHARACTER SET', 'utf8']
    };
//    this.blocks.doSqlAlter = {
//        type: 'command',
//        category: 'html',
//        spec: "2 ALT: ALTER TABLE %t %PhpSqlAlterTable %t ",
//        defaults: ['$table', 'ADD', '$field_type']
//    };    
//       mysqli_connect $result = mysqli_query($con, "select * from employee");
//    $records = mysqli_fetch_all($result);
    /*     foreach ($records as $key => $record) {
     //echo $key . '==>' . $record . '<br>';
     foreach ($record as $key => $value) {
     echo $value . ' ';
     }
     echo '<br>';
     }
     mysqli_close($con);
     */

// FCC 10/25/2021 widgets from Ionic  

// Ionic header Bar & Navigation
    //Eric 12/21/2021 add Ionic lib
    this.blocks.doHtmlIonic = {
        type: 'command',
        category: 'htmlbody',
        spec: 'Ionic: <html %htmlKeys = %htmlValues > <head> <title> %s </title> %c </head> <body> %c </body> </html>',
        defaults: ['lang', 'en', 'My Ionic Html Page']
    };
    this.blocks.doIonicImportJavaScriptLibs = {
        type: 'command',
        category: 'properties',
        spec: 'Import Ionic JavaScript Libs',
        defaults: []
    };
    this.blocks.doIonicHeaderBar = {
        type: 'command',
        category: 'ionic-widgets',
        spec: '<HeaderBar BarColor=" %color " <title= %s text-align = %IonicTextAlignment p: %exp0blank > %c',
        defaults: ['primary', '首頁', 'ion-text-center', ['']]
    };
    this.blocks.doIonicHeaderBarItem = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '<HeaderBarItem Buttons Slot = " %IonicToolbarPropertyValue " <button p: %exp0blank ><Icon IconName = " %IonicIconPropertyValue " p: %exp0blank >',
        defaults: ['primary', [''], 'menu-outline']
    };
    this.blocks.doIonicHeaderNav = {
        type: 'command',
        category: 'ionic-widgets',
        spec: '<HeaderNav scrollable Nav Color=" %color " value= %s p: %exp0blank > %c',
        defaults: ['primary', '', ['']]
    };
    this.blocks.doIonicHeaderNavLabelItem = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '<HeaderNavItem: <seg-button p: %exp0blank ><label %s p: %exp0blank >',
        defaults: [[''], 'title', ['']]
    };
    this.blocks.doIonicBanner = {
        type: 'command',
        category: 'ionic-widgets',
        spec: '<IonicBanner p: %exp0blank %c',
        defaults: ['']
    };
    this.blocks.doIonicBannerItem = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '<IonicBannerItem <img: src = " %IonicImagePropertyValue " p: %exp0blank >',
        defaults: ['https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310640.jpg']
    };
    this.blocks.doIonicBannerChange = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '<Banner change frequency = %n >',
        defaults: ['5000']
    };

    this.blocks.doIonicInfoList = {
        type: 'command',
        category: 'ionic-widgets',
        spec: '<IonicInfoList p: %exp0blank > %c',
        defaults: []
    };
    this.blocks.doIonicInfoListItem = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '1: <IonicInfoListItem  <column p: %exp0blank ><img: src= " %IonicImagePropertyValue " p: %exp0blank ><subtitle %s ><title %s >',
        defaults: [[''], 'https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310640.jpg', [''], 'subtitle', 'title']
    };
    this.blocks.doIonicInfoListItem2 = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '2: <IonicInfoListItem  <card p: %exp0blank  click="location.href= %IonicLinkPropertyValue "><img: src= " %IonicImagePropertyValue " p: %exp0blank ><ion-item p: %exp0blank ><title %s p: %exp0blank >',
        defaults: [[''], 'https://sports.ltn.com.tw/news/breakingnews/3716935', 'https://img.ltn.com.tw/Upload/sports/page/800/2021/10/27/phpAoEMuq.jpg', [''], [''], 'NBA》鬧劇告一段落 美媒曝B.西蒙斯接受心理治療', '']
    };
    //	Eric 10/28/2021 widgets from Ionic  
    this.blocks.doIonicFlashBar = {
        type: 'command',
        category: 'ionic-widgets',
        spec: '<IonicFlashBar <button color=" %color "> BarColor=" %clr "<title= %s p: %exp0blank > %c',
        defaults: ['dark']
    };
    this.blocks.doIonicFlashBarItem = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '<IonicFlashBarItem  <title= %s color=" %color  p: %exp0blank >',
        defaults: [, 'dark', ]
    };

    this.blocks.doIonicFlashBarChange = {
        type: 'command',
        category: 'ionic-widgets2',
        spec: '<FlashBar change frequency = %n >',
        defaults: ['2000']
    };
// 
// Ionic
    // FCC 2022/04/20
    this.blocks.reportIonicEvent = {
        type: 'reporter',
        category: 'ionic-control',
        spec: 'Ionic event: %IonicElementEvent ',
        defaults: ['ionChange']
    };

    // Eric 2021/11/01 Ionic css
    this.blocks.reportIonicTextAlignment = {
        type: 'reporter',
        category: 'properties',
        spec: ' Text Alignment: %IonicText %IonicTextModifier ',
        defaults: ['ion-text-', 'left']
    };
    this.blocks.reportIonicFloatElements = {
        type: 'reporter',
        category: 'properties',
        spec: ' Float Elements: %IonicFloatElements %IonicFloatModifier ',
        defaults: ['ion-float-', 'left']
    };
    this.blocks.reportIonicHide = {
        type: 'reporter',
        category: 'properties',
        spec: 'Hide: %IonicHide %IonicHideDir ',
        defaults: ['ion-hide', '']
    };
    this.blocks.reportPaddingOrMargin = {
        type: 'reporter',
        category: 'properties',
        spec: 'Padding/Margin: %IonicPaddingMargin',
        defaults: ['ion-padding']
    };
    this.blocks.reportFlexContainer = {
        type: 'reporter',
        category: 'properties',
        spec: 'Flex Container: %FlexContainer',
        defaults: ['ion-justify-content-start']
    };
    // 2021/11/01 Ionic css end

    this.blocks.doIonicContainer = {
        type: 'command',
        category: 'ionic-container',
        spec: '< %IonicContainer p: %exp0blank %c',
        defaults: ['ion-content']
    };
    this.blocks.doIonicAppHeaderContentFooter = {
        type: 'command',
        category: 'ionic-widgets',
        spec: '<ion-app p: %exp0blank > <ion-header p: %exp0blank > %c <ion-content p: %exp0blank > %c <ion-footer p: %exp0blank > %c',
        defaults: []
    };
    this.blocks.doIonicCard = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicCard p: %exp0blank %c',
        defaults: ['ion-card']
    };
    this.blocks.doIonicCardHeaderContent = {
        type: 'command',
        category: 'ionic-widgets',
        spec: '<ion-card p: %exp0blank > <ion-card-header p: %exp0blank > %c <ion-card-content p: %exp0blank > %c',
        defaults: ['']
    };
    this.blocks.doIonicChip = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicChip p: %exp0blank %c',
        defaults: ['ion-chip']
    };
    this.blocks.doIonicFloatingActionButton = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicFloatingActionButton p: %exp0blank %c',
        defaults: ['ion-fab']
    };
    this.blocks.doIonicGrid = {
        type: 'command',
        category: 'ionic-container',
        spec: '< %IonicGrid p: %exp0blank %c',
        defaults: ['ion-grid']
    };
    this.blocks.doIonicInfiniteScroll = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicInfiniteScroll p: %exp0blank %c',
        defaults: ['ion-infinite-scroll']
    };
    this.blocks.doIonicItem = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicItem p: %exp0blank %c',
        defaults: ['ion-item']
    };
    this.blocks.doIonicList = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicList p: %exp0blank %c',
        defaults: ['ion-list']
    };
    this.blocks.doIonicMedia = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicMedia p: %exp0blank %c',
        defaults: ['ion-avatar']
    };
    this.blocks.doIonicMenu = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicMenu p: %exp0blank %c',
        defaults: ['ion-menu']
    };
    this.blocks.doIonicReorder = {
        type: 'command',
        category: 'ionic-container',
        spec: '< %IonicReorder p: %exp0blank %c',
        defaults: ['ion-reorder']
    };
    this.blocks.doIonicRouter = {
        type: 'command',
        category: 'ionic-container',
        spec: '< %IonicRouter p: %exp0blank %c',
        defaults: ['ion-router']
    };
    this.blocks.doIonicSegmentButton = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicSegmentButton p: %exp0blank %c',
        defaults: ['ion-segment-button']
    };
    this.blocks.doIonicSelect = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicSelect p: %exp0blank %c',
        defaults: ['ion-select']
    };
    this.blocks.doIonicSlides = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicSlides p: %exp0blank %c',
        defaults: ['ion-slides']
    };
    this.blocks.doIonicTabs = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicTabs p: %exp0blank %c',
        defaults: ['ion-tabs']
    };
    this.blocks.doIonicToolbar = {
        type: 'command',
        category: 'ionic-control',
        spec: '< %IonicToolbar p: %exp0blank %c',
        defaults: ['ion-toolbar']
    };
    this.blocks.doIonicControl = {
        type: 'command',
        category: 'ionic-control',
        spec: 'display: < %IonicControl p: %expblank > %expblank </>',
        defaults: ['ion-label']
    };

    this.blocks.doIonicControl2 = {
        type: 'command',
        category: 'ionic-control',
        spec: 'action: < %IonicControl2 p: %expblank > %expblank </>',
        defaults: ['ion-button']
    };
    // Ionic block property vs value
    this.blocks.reportIonicButtonPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'button: %IonicButtonProperty =" %IonicButtonPropertyValue "',
        defaults: ['size', 'small']
    };
    this.blocks.reportIonicCardPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'card: %IonicCardProperty =" %IonicCardPropertyValue "',
        defaults: ['type', 'submit']
    };
    this.blocks.reportIonicChipPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'chip: %IonicChipProperty =" %IonicChipPropertyValue "',
        defaults: ['outline', 'true']
    };
    this.blocks.reportIonicContentPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: ' content: %IonicContentProperty =" %IonicContentPropertyValue "',
        defaults: ['fullscreen', 'true']
    };
    this.blocks.reportIonicDateTimePropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'datetime: %IonicDateTimeProperty =" %IonicDateTimePropertyValue "',
        defaults: ['hour-cycle', 'h23']
    };
    this.blocks.reportIonicFabPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'fab: %IonicFabProperty =" %IonicFabPropertyValue "',
        defaults: ['vertical', 'center']
    };
    this.blocks.reportIonicGridPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'grid: %IonicGridProperty =" %IonicGridPropertyValue "',
        defaults: ['', '']
    };
    this.blocks.reportIonicInfiniteScrollPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: ' inf-scroll: %IonicInfiniteScrollProperty = %IonicInfiniteScrollPropertyValue ',
        defaults: ['threshold', '15%']
    };
    this.blocks.reportIonicInputPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'input: %IonicInputProperty =" %IonicInputPropertyValue "',
        defaults: ['placeholder', 'Enter Input']
    };
    this.blocks.reportIonicIconPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'icon/img: %IonicIconProperty =" %IonicIconPropertyValue "',
        defaults: ['name', 'heart']
    };
    this.blocks.reportIonicItemPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'item: %IonicItemProperty =" %IonicItemPropertyValue "',
        defaults: ['lines', 'full']
    };
    this.blocks.reportIonicListPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'list: %IonicListProperty =" %IonicListPropertyValue "',
        defaults: ['lines', 'full']
    };
    this.blocks.reportIonicMenuPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'menu: %IonicMenuProperty =" %IonicMenuPropertyValue "',
        defaults: ['side', 'start']
    };
    this.blocks.reportIonicProgressPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'progress: %IonicProgressProperty = %IonicProgressPropertyValue ',
        defaults: ['name', 'circles']
    };
    this.blocks.reportIonicSegmentPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'segment: %IonicSegmentProperty =" %IonicSegmentPropertyValue "',
        defaults: ['scrollable', 'true']
    };
    this.blocks.reportIonicSelectPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'select: %IonicSelectProperty = %IonicSelectPropertyValue ',
        defaults: ['placeholder', 'Select One']
    };
    this.blocks.reportIonicSlidesPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'slides: %IonicSlidesProperty = %IonicSlidesPropertyValue ',
        defaults: ['', '']
    };
    this.blocks.reportIonicTabsPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'tabs: %IonicTabsProperty =" %IonicTabsPropertyValue "',
        defaults: ['slot', 'bottom']
    };
    this.blocks.reportIonicTextPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'text: %IonicTextProperty = " %IonicTextPropertyValue "',
        defaults: ['size', 'large']
    };
    this.blocks.reportIonicToolbarPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'toolbar: %IonicToolbarProperty =" %IonicToolbarPropertyValue "',
        defaults: ['slot', 'primary']
    };
// Angular 
    this.blocks.reportAngularTemplateVariable = {
        type: 'reporter',
        category: 'properties',
        spec: '# %s ',
        defaults: ['template-var']
    };
    this.blocks.reportAngularControlCommand = {
        type: 'reporter',
        category: 'properties',
        spec: 'ng: %AngularCommand = " %s "',
        defaults: ['*ngFor', 'let item of items']
    };
    this.blocks.doAngularComponent = {
        type: 'command',
        category: 'react',
        spec: '@ %AngularDirective ( %exp )',
        defaults: ['Component']
    };
    this.blocks.reportAngularComponentKeyValue = {
        type: 'reporter',
        category: 'properties',
        spec: ' %AngularComponentKey : %s ',
        defaults: ['selector', '']
    };
//    this.blocks.reportAngularDirective = {
//        type: 'reporter',
//        category: 'properties',
//        spec: 'ng: %AngularCommand = " %s "',
//        defaults: ['*ngFor', 'let item of items']
//    };
    // customed control FCC 2020/01/21
    // typescript FCC 2021/08/11

    // control
    this.blocks.doTypeSciptIf = {
        type: 'command',
        category: 'control2',
        spec: 'if ( %b ) %c'
    };
    this.blocks.doTypeSciptIfElse = {
        type: 'command',
        category: 'control2',
        spec: 'if ( %b ) %c else %c'
    };
    this.blocks.doTypeSciptSwitch = {
        type: 'command',
        category: 'control2',
        spec: 'switch ( %s ) %c'
    };
    this.blocks.doTypeSciptSwitchCase = {
        type: 'command',
        category: 'control2',
        spec: 'case %s : %c'
    };
    this.blocks.doTypeSciptSwitchDefault = {
        type: 'command',
        category: 'control2',
        spec: 'default: %c'
    };
    this.blocks.doTypeSciptFor = {
        type: 'command',
        category: 'control',
        spec: 'for ( %VariableDeclaration %t = %s ; %s ;  %s ) %loop',
        defaults: ['let', 'i', '0', 'i<4', 'i++']
    };
    this.blocks.doTypeSciptForIn = {
        type: 'command',
        category: 'control',
        spec: 'for ( %VariableDeclaration %t in %t ) %loop',
        defaults: ['let', 'index', 'items']
    };
    this.blocks.doTypeSciptForOf = {
        type: 'command',
        category: 'control',
        spec: 'for ( %VariableDeclaration %t of %t ) %loop',
        defaults: ['let', 'item', 'items']
    };
    this.blocks.doTypeSciptWhile = {
        type: 'command',
        category: 'control',
        spec: 'while ( %b ) %loop'
    };
    this.blocks.doTypeSciptDoWhile = {
        type: 'command',
        category: 'control',
        spec: 'do %loop while ( %b );'
    };
    this.blocks.doTypeSciptBreak = {
        type: 'command',
        category: 'control',
        spec: 'break %exp0 ;'
    };
    this.blocks.doTypeSciptContinue = {
        type: 'command',
        category: 'control',
        spec: 'continue %exp0 ;',
        defaults: ''
    };
    // JavaScript
    this.blocks.doTypeSciptImport = {
        type: 'command',
        category: 'JavaScript',
        spec: 'import { %exp } from %s ;',
        defaults: [[''], '']
    };

    this.blocks.doTypeSciptImport2 = {
        type: 'command',
        category: 'JavaScript',
        spec: 'import  %exp  from %s ;',
        defaults: [[''], '']
    };

    this.blocks.doTypeSciptLet = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %scriptVars %PredefinedType = %exp ;',
        defaults: ['', 'v', ':string']
    };
//    this.blocks.doTypeSciptLet10 = {
//        type: 'command',
//        category: 'JavaScript',
//        spec: '%VariableDeclaration %t  %PredefinedType %AsignOperator %exp ;',
//        defaults: ['let', 'v', ':string', '=', '']
//    };

    // eric 20211808 doTypeSciptLet10 to doJavaSciptLet10
    this.blocks.doJavaSciptLet10 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %t %AsignOperator %expblank ;',
        defaults: ['', 'v', '=', '']
    };
//    this.blocks.doTypeSciptLet11 = {
//        type: 'command',
//        category: 'JavaScript',
//        spec: '%VariableDeclaration %scriptVars  %PredefinedType %AsignOperator %exp ;',
//        defaults: ['let', 'v', ':string', '=', '']
//    };

//    this.blocks.doTypeSciptLet12 = {
//        type: 'command',
//        category: 'JavaScript',
//        spec: '%VariableDeclaration %s  %PredefinedType %AsignOperator %exp ;',
//        defaults: ['const', 'v', ':string', '=']
//    }

    this.blocks.doTypeSciptLet13 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %s %AsignOperator %s %EndDelimiter ',
        defaults: ['', 'v', '=', 'expr', ';']
    };


//    this.blocks.doTypeSciptLet13A = {
//        type: 'command',
//        category: 'JavaScript',
//        spec: '%VariableDeclaration %s %AsignOperator %objarray %c %EndDelimiter ',
//        defaults: ['const', 'v', '=', '{', '', ';']
//    };

    this.blocks.doTypeSciptLet14 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%expblank %EndDelimiter',
        defaults: [['expr'], ';']
    };
    this.blocks.doTypeSciptLet15 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%s %EndDelimiter',
        defaults: ['expr', ';']
    };
    this.blocks.doTypeSciptLet2 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %s  %PredefinedType = %exp ;',
        defaults: ['', 'v', ':string']
    };
    this.blocks.doTypeSciptLet3 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %s = %exp %EndDelimiter ',
        defaults: ['']
    };
    this.blocks.doTypeSciptLet4 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %expblank  %EndDelimiter ',
        defaults: ['', '', '']
    };
    this.blocks.reportTypeSciptNewClassObject = {
        type: 'reporter',
        category: 'JavaScript',
        spec: 'new %s ( %exp0 )'
    };
    this.blocks.reportNewClassObject = {
        type: 'reporter',
        category: 'server',
        spec: 'new %JavaScriptObject ( %exp0 )',
        defaults: ['XMLHttpRequest']
    };
    this.blocks.reportClassFunction = {
        type: 'reporter',
        category: 'server',
        spec: ' %VariableMethodModifier %JavaScriptObject2 . %JavaScriptObjectFunction ( %exp )',
        defaults: ['', 'xmlHttpRequest', 'send']
    };

    this.blocks.doClassFunction = {
        type: 'command',
        category: 'axios',
        spec: ' %VariableMethodModifier %JavaScriptObject2 . %JavaScriptObjectFunction ( %exp )',
        defaults: ['', 'axios', 'get']
    };

    this.blocks.doClassFunction2 = {
        type: 'command',
        category: 'axios',
        spec: ' %VariableMethodModifier %JavaScriptObject2 . %JavaScriptObjectFunction ( %c )',
        defaults: ['', 'axios', 'get']
    };


    this.blocks.doAxiosFunction2 = {
        type: 'command',
        category: 'axios',
        spec: '1 axios: %VariableMethodModifier %JavaScriptObject2 . %JavaScriptObjectFunction ( %exp )',
        defaults: ['', 'axios', 'get']
    };

    this.blocks.doAxiosFunction = {
        type: 'command',
        category: 'axios',
        spec: '1 axios: %VariableMethodModifier axios({ %c })',
        defaults: ['']
    };

    this.blocks.doAxiosKeyValue = {
        type: 'command',
        category: 'axios',
        spec: '2 axios: %AxiosKey : %AxiosValue  %EndDelimiter ',
        defaults: ['method', '"get"', ',']
    };


    this.blocks.doPromiseFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: '2 Promise: %AsyncAwait ( %exp ) => { %c',
        defaults: ['', ['response']]
    };

    this.blocks.reportPromiseObjectFunction = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %PromiseObject . %PromiseFunction  ( %exp ) ',
        defaults: ['Promise', 'then( function (message) { ... })', '']
    };

    this.blocks.doPromiseObjectFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: '1 Promise: %PromiseObject . %PromiseFunction  ( %c ) %EndDelimiter ',
        defaults: ['Promise', 'then( function (message) { ... })', null, null]
    };

    this.blocks.doPromiseObjectFunction2 = {
        type: 'command',
        category: 'JavaScript',
        spec: '1 Promise: %PromiseObject . %PromiseFunction  ( %c',
        defaults: ['Promise', 'then( function (message) { ... })', null]
    };

    this.blocks.reportClassConstant = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %JavaScriptObject2 . %JavaScriptObjectConstant',
        defaults: ['xmlHttpRequest', 'readyState']
    };

    this.blocks.doReactEventFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: 'f: %JavaScriptObject2 . %JavaScriptObjectEventFunction = %VariableMethodModifier %s ( %exp ) => { %c',
        defaults: ['xmlHttpRequest', 'onreadystatechange', '', 'function', ['event']]
    };
//    this.blocks.reportTypeSciptCommandRing = {
//        type: 'reporter',
//        category: 'control2',
//        spec: ' %cmdRing '
//    };
    /*
     reifyScript: {
     type: 'ring',
     category: 'other',
     spec: '%rc %ringparms',
     alias: 'command ring lambda'
     },
     reifyReporter: {
     type: 'ring',
     category: 'other',
     spec: '%rr %ringparms',
     alias: 'reporter ring lambda'
     },
     reifyPredicate: {
     type: 'ring',
     category: 'other',
     spec: '%rp %ringparms',
     alias: 'predicate ring lambda'
     },
     */
    this.blocks.reportTypeSciptString = {
        type: 'reporter',
        category: 'JavaScript',
        spec: '` %expblank `',
        defaults: ['']
    };
    this.blocks.reportJavaSciptString = {
        type: 'reporter',
        category: 'JavaScript',
        spec: " %StringSymbol %expblank '",
        defaults: ["'", '']
    };

    this.blocks.doTypeSciptConsoleLog = {
        type: 'command',
        category: 'JavaScript',
        spec: 'console.log(` %expblank `);',
        defaults: ['']
    };
    this.blocks.doTypeSciptConsoleFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: ' %ConsoleFunction ( %exp );',
        defaults: ['console.log']
    };

    this.blocks.reportTypeSciptFunction3 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: 'f: %AsyncAwait ( %exp ) => { %c',
        defaults: ['']
    };
    this.blocks.doTypeSciptFunction3 = {
        type: 'command',
        category: 'JavaScript',
        spec: 'f: %VariableDeclaration %t = %AsyncAwait ( %exp0 ) => { %c',
        defaults: ['', 'arrowF']
    };
    this.blocks.reportTypeSciptFunction5 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: 'f: %AsyncAwait ( %exp ) => { %s }',
        defaults: ['']
    };
    this.blocks.reportTypeSciptFunction4 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: 'f: %AsyncAwait function ( %exp ) { %c',
        defaults: ['']
    };

    // eric 20211808 doTypeSciptFunction2 to doJavaSciptFunction2
    this.blocks.doJavaSciptFunction3 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %s = %AsyncAwait ( %exp ) => { %expblank }',
        defaults: ['', 'func', '']
    };

    this.blocks.doJavaSciptFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %s = %AsyncAwait ( %exp ) => { %c',
        defaults: ['', 'func', '']
    };
    this.blocks.doJavaSciptArrowFunctionWithEvent = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableDeclaration %element . %DomEvent = %AsyncAwait ( %exp ) => { %c',
        defaults: ['', 'window', 'onload', '']
    };
    this.blocks.doJavaSciptFunction2 = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableMethodModifier function %t ( %exp ) { %c',
        defaults: ['', 'func', '']
    };
    this.blocks.reportTypeSciptParameter = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %t  %PredefinedType = %s',
        defaults: ['', 'v', ':string']
    };
    this.blocks.reportTypeSciptParameter2 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %s  %PredefinedType = %s',
        defaults: ['', 'v', ':string']
    };
    this.blocks.reportTypeSciptParameter3 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %t %PredefinedType ',
        defaults: ['', 'v', ':string']
    };
    this.blocks.reportTypeSciptParameter4 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %s %PredefinedType ',
        defaults: ['', 'v', ':string']
    };
    // eric 20211808 reportTypeSciptParameter~4 to reportJavaSciptParameter~4

    this.blocks.reportJavaSciptParameter = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %t = %s',
        defaults: ['', 'v']
    };
    this.blocks.reportJavaSciptParameter2 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %s = %s',
        defaults: ['', 'v']
    };
    this.blocks.reportJavaSciptParameter3 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %t',
        defaults: ['', 'v']
    };
    this.blocks.reportJavaSciptParameter4 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %VariableDeclaration %s',
        defaults: ['', 'v']
    };
//    this.blocks.doTypeSciptReturn2 = {
//        type: 'command',
//        category: 'control2',
//        spec: 'return %scriptVars ;'
//    };

    this.blocks.doTypeSciptReturn = {
        type: 'command',
        category: 'JavaScript',
        spec: 'return %exp ;'
    };
    this.blocks.doTypeSciptExecuteFunction = {
        type: 'command',
        category: 'JavaScript',
        spec: 'call: %s ( %exp );',
        defaults: [null]
    };

    this.blocks.doTypeSciptExecuteFunction2 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: 'call: %s ( %exp )',
        defaults: [null]
    };
    // same as doTypeSciptExecuteFunction2 
    this.blocks.reportCallFunction = {
        type: 'reporter',
        category: 'JavaScript',
        spec: 'call: %s ( %exp )',
        defaults: [null]
    };
    // class
    this.blocks.doSciptClass = {
        type: 'command',
        category: 'control2',
        spec: '%VariableMethodModifier { %c',
        defaults: ['export default']
    };
    this.blocks.doTypeSciptClass = {
        type: 'command',
        category: 'control2',
        spec: '%VariableMethodModifier %InterfaceClassEnum %t { %c',
        defaults: ['', 'class', 'CName']
    };
    this.blocks.doTypeSciptClass2 = {
        type: 'command',
        category: 'control2',
        spec: '%VariableMethodModifier %InterfaceClassEnum %t %ExtendsOrImplements %exp { %c',
        defaults: ['', 'class', 'CName', 'extends']
    };
    this.blocks.doTypeSciptVariable = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableMethodModifier %t %PredefinedType %EndDelimiter',
        defaults: ['', 'v', ':string', ';']
    };
    // eric 20211808 doTypeSciptVariable to doJavaSciptVariable	
    this.blocks.doJavaSciptVariable = {
        type: 'command',
        category: 'JavaScript',
        spec: '%VariableMethodModifier %t %EndDelimiter',
        defaults: ['', 'v', ';']
    };
    this.blocks.doTypeSciptConstructor = {
        type: 'command',
        category: 'JavaScript',
        spec: 'constructor ( %exp ){ %c',
        defaults: ['']
    };
    this.blocks.doTypeSciptClassSuper = {
        type: 'command',
        category: 'JavaScript',
        spec: 'super( %exp );',
        defaults: ['']
    };
//%ReactComponentFunction
    this.blocks.doTypeSciptClassMethod = {
        type: 'command',
        category: 'JavaScript',
        spec: ' %VariableMethodModifier %t ( %exp ) %PredefinedType { %c }',
        defaults: ['', 'method', '', ':void']
    };
    this.blocks.doTypeSciptClassMethod2 = {
        type: 'command',
        category: 'JavaScript',
        spec: ' %VariableMethodModifier %t ( %exp ) %PredefinedType ;',
        defaults: ['', 'method', '', ':void']
    };
    // eric 20211808 doTypeSciptClassMethod~2 to doJavaSciptClassMethod~2	
    this.blocks.doJavaSciptClassMethod = {
        type: 'command',
        category: 'JavaScript',
        spec: ' %VariableMethodModifier %t ( %exp ) { %c',
        defaults: ['', 'method', '']
    };
    this.blocks.doJavaSciptClassMethod2 = {
        type: 'command',
        category: 'JavaScript',
        spec: ' %VariableMethodModifier %t ( %exp ) ;',
        defaults: ['', 'method', '']
    };
    this.blocks.reportObjectProperty = {
        type: 'reporter',
        category: 'variables',
        spec: ' %s . %JSProperty ',
        defaults: ['this', 'property']
    };


    this.blocks.reportTypeDeclaration = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %t : %PredefinedType ',
        defaults: ['v', 'string']
    };
    this.blocks.reportTypeDeclaration2 = {
        type: 'reporter',
        category: 'operators',
        spec: ' %s : %PredefinedType ',
        defaults: ['v', 'string']
    };
    this.blocks.reportTypeSciptStringVariable = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' ` %exp0 "$"{ %s } %exp0 ` ',
        defaults: ['']
    };
    this.blocks.reportTypeSciptStringVariable2 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' $ { %s } ',
        defaults: ['']
    };
    this.blocks.reportTypeSciptStringGeneric = {
        type: 'reporter',
        category: 'lists',
        spec: '  %s < %s >  ',
        defaults: ['Array', 'string']
    };
    this.blocks.reportTypeSciptMultiVariables = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' ... %t ',
        defaults: ['v']
    };
    this.blocks.reportTypeSciptFunctionType = {
        type: 'reporter',
        category: 'operators',
        spec: ' ( %exp0 ) => %PredefinedType ',
        defaults: ['v', 'string']
    };
    // end of class
    // variables
    this.blocks.reportTypeSciptNewArray = {
        type: 'reporter',
        category: 'lists',
        spec: 'array: [ %exp ]'
    };
    this.blocks.reportTypeSciptNewArray2 = {
        type: 'reporter',
        category: 'lists',
        spec: 'array: %s [ %exp ]'
    };
//
    this.blocks.reportTypeSciptNewObject = {
        type: 'reporter',
        category: 'lists',
        spec: 'obj: { %exp }'
    };

    this.blocks.reportTypeSciptNewObject2 = {
        type: 'reporter',
        category: 'lists',
        spec: 'obj: { %c'
    };

    this.blocks.doTypeSciptNewObject = {
        type: 'command',
        category: 'lists',
        spec: 'obj: { %c'
    };

    this.blocks.reportDomElement = {
        type: 'reporter',
        category: 'lists',
        spec: ' < %expblank />'
    };
    this.blocks.reportTypeSciptKeyValue = {
        type: 'reporter',
        category: 'variables',
        spec: ' %JSProperty : %s',
        defaults: ['key', 'value']
    };
    // operators
    this.blocks.reportListWithoutComma = {
        type: 'reporter',
        category: 'variables',
        spec: "[][]...: %exp ",
        defaults: ['']
    };
    this.blocks.reportTernaryOperator = {
        type: 'reporter',
        category: 'JavaScript',
        spec: "3: %s ? %s : %s ",
        defaults: ['cond', 'trueS', 'falseS']
    };
    this.blocks.reportBinayOperator = {
        type: 'reporter',
        category: 'JavaScript',
        spec: "2: %s %BinayOperators %s ",
        defaults: ['', '+', '']
    };
    this.blocks.reportUnaryOperator = {
        type: 'reporter',
        category: 'JavaScript',
        spec: "1: %UnaryOperators %s ",
        defaults: ['~', '']
    };
    this.blocks.reportRelationalOperator = {
        type: 'predicate',
        category: 'JavaScript',
        spec: '2: %s %RelationalOp %s',
        defaults: ['', '===', '']
    };
    this.blocks.reportStringBuiltInFunction = {
        type: 'reporter',
        category: 'JavaScript',
        spec: '%s . %StringBuiltInFunction ( %exp0 )',
        defaults: ['string', 'charAt']
    };
    this.blocks.reportNumberBuiltInFunction = {
        type: 'reporter',
        category: 'JavaScript',
        spec: '%s . %NumberBuiltInFunction ( %exp0 )',
        defaults: ['number', 'toString']
    };
    this.blocks.reportArrayBuiltInFunction = {
        type: 'reporter',
        category: 'lists',
        spec: ' %s . %ArrayBuiltInFunction ( %exp0 )',
        defaults: ['array/list', 'concat']
    };
    this.blocks.reportArrayBuiltInFunctionWithCallback = {
        type: 'reporter',
        category: 'lists',
        spec: ' %s . %ArrayBuiltInFunction (( %exp ) => %c',
        defaults: ['array/list', 'map']
    };
    this.blocks.doArrayBuiltInFunctionWithCallback = {
        type: 'command',
        category: 'lists',
        spec: '{ %s . %ArrayBuiltInFunction (( %exp ) => %c',
        defaults: ['array/list', 'map']
    };
    this.blocks.reportJFunctionConstant = {
        type: 'reporter',
        category: 'JavaScript',
        spec: 'const: %FunctionConstants ',
        defaults: ['Math.PI']
    };
    this.blocks.reportJSJsonFunction = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %s . %JsonFunction ( %exp0 ) ',
        defaults: ['JSON', 'parse']
    };
    this.blocks.reportJSMathFunction = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %s . %MathFunction ( %exp0 ) ',
        defaults: ['Math', 'abs']
    };
    this.blocks.reportJSDateFunction = {
        type: 'reporter',
        category: 'JavaScript',
        spec: ' %s . %DateFunction ( %exp0 )',
        defaults: ['Date', 'getDate()']
    };
    // sensing ==> Angular
    this.blocks.reportReactExpression = {
        type: 'reporter',
        category: 'JavaScript',
        spec: '{ %s }',
        defaults: ['expr']
    };
    this.blocks.reportReactExpression2 = {
        type: 'reporter',
        category: 'JavaScript',
        spec: '{ ... %s , %exp }',
        defaults: ['state']
    };
    this.blocks.reportStringInterpolation = {
        type: 'reporter',
        category: 'operators',
        spec: '{{ %VueDataKey }}',
        defaults: ['expr']
    };
    this.blocks.reportPropertyBinding = {
        type: 'reporter',
        category: 'react',
        spec: '[ %s ]',
        defaults: ['Property binding']
    };
    this.blocks.reportEventBinding = {
        type: 'reporter',
        category: 'react',
        spec: '( %s )',
        defaults: ['Event binding']
    };
    this.blocks.reportTwoWayBinding = {
        type: 'reporter',
        category: 'react',
        spec: '[( %s )]',
        defaults: ['Two way binding']
    };
    // typescript FCC 2021/08/11  end  

    this.blocks.doTryExcept = {
        type: 'command',
        category: 'control2',
        spec: 'try: %c except: %c'
    };
    this.blocks.doTryExcept2 = {
        type: 'command',
        category: 'control2',
        spec: 'try: %c except %s as %t : %c',
        defaults: [null, '', 'e']
    };
    this.blocks.doTryExcept3 = {
        type: 'command',
        category: 'control2',
        spec: 'try: %c except ( %exp ) : %c'
    };
    this.blocks.reportException = {
        type: 'report',
        category: 'control2',
        spec: 'ex: %exceptions'
    };
    this.blocks.doExcept = {
        type: 'command',
        category: 'control2',
        spec: 'except: %c'
    };
    this.blocks.doExcept2 = {
        type: 'command',
        category: 'control2',
        spec: 'except ( %exp ) : %c'
    };
    this.blocks.doExcept3 = {
        type: 'command',
        category: 'control2',
        spec: 'except %s as %t : %c',
        defaults: ['', 'e']
    };
    this.blocks.doFinally = {
        type: 'command',
        category: 'control2',
        spec: 'finally: %c'
    };
    this.blocks.doRaise = {
        type: 'command',
        category: 'control2',
        spec: 'raise %s ( %exp )'
    };
    this.blocks.doRaise2 = {
        type: 'command',
        category: 'control2',
        spec: 'raise %s '
    };
    this.blocks.doWith = {
        type: 'command',
        category: 'control2',
        spec: 'with %c : %c'
    };
    this.blocks.doWithAs = {
        type: 'command',
        category: 'control2',
        spec: 'with %s as %t : %c'
    };
    this.blocks.reportForIn = {
        type: 'reporter',
        category: 'control',
        spec: 'for %s in %s ',
        defaults: ['i', 'range']
    };
    this.blocks.reportForIn2 = {
        type: 'reporter',
        category: 'control',
        spec: ' %s for %s in %s %s ',
        defaults: ['', 'i', 'range']
    };
    this.blocks.reportForIn3 = {
        type: 'reporter',
        category: 'control',
        spec: ' %s for %s in %s ',
        defaults: ['', 'i', 'range']
    };
    this.blocks.reportRange = {
        type: 'reporter',
        category: 'control',
        spec: 'range( %exp )'
    };
//    this.blocks.doElseIf = {
//        type: 'command',
//        category: 'control',
//        spec: 'else if %b %c'
//    };


    this.blocks.reportIfElse2 = {
        type: 'reporter',
        category: 'control',
        spec: ' %s if %b else %s ',
        defaults: ['', '', '']
    };
//    this.blocks.doElse = {
//        type: 'command',
//        category: 'control',
//        spec: 'else %c'
//    };      


    this.blocks.reportColor = {
        type: 'reporter',
        category: 'properties',
        spec: 'color=" %color "',
        defaults: ['primary']
    }


    //ionic-container

    this.blocks.doColDefaults = {
        type: 'command',
        category: 'ionic-container',
        spec: '<Ion-Col size= %n size-sm= %n size-md= %n size-lg= %n size-xl= %n p: %exp0blank > %c </Ion-Col>',
        defaults: [12, 12, 6, 3, 3]
    };
    //html

    this.blocks.doHtmlTag = {
        type: 'command',
        category: 'html',
        spec: '< %s p: %expblank %c >'
    };
    this.blocks.doHtmlText = {
        type: 'command',
        category: 'html',
        spec: '%expblank '
    };
    this.blocks.reportHtmlJoin = {
        type: 'reporter',
        category: 'properties',
        spec: '%expblank '
    };
    this.blocks.doHtmlTarget = {
        type: 'reporter',
        category: 'properties',
        spec: 'target %target'
    };
    this.blocks.doHtmlMethod = {
        type: 'reporter',
        category: 'properties',
        spec: 'method = %method'
    };
    this.blocks.doHtmlAutocomplete = {
        type: 'reporter',
        category: 'properties',
        spec: 'autocomplete = %autocomplete'
    };
    // FCC: to be deleted
    this.blocks.doHtmlInputType = {
        type: 'reporter',
        category: 'properties',
        spec: 'inputType = %inputtype'
    };
    // FCC: to be deleted

    this.blocks.reportHtmlEntity = {
        type: 'reporter',
        category: 'properties',
        spec: 'entity: %HtmlEntity ',
        defaults: ['< &lt;']
    };
    this.blocks.doHtml = {
        type: 'command',
        category: 'htmlbody',
        spec: '<html p: %exp0blank > <head> %c </head><body> %c ></body></html>'
    };
    this.blocks.doHtml2 = {
        type: 'command',
        category: 'htmlbody',
        spec: '<html %htmlKeys =" %htmlValues "> <head> <title %s >  %c </head> <body %exp0blank > %c </body> </html>',
//        spec: '<html %htmlKeys = %htmlValues > %br     <head> %c %br     </head> %br     <body> %c %br     </body> %br </html>',        
        defaults: ['lang', 'en', 'My First HTML Page']
    };
// FCC 20210618 to be deleted
    this.blocks.doHtmlHeadTitle = {
        type: 'command',
        category: 'htmlhead',
        spec: '<title attrs = %exp0blank > %s'
    };
    this.blocks.doHtmlHeadTitle2 = {
        type: 'command',
        category: 'htmlhead',
        spec: '<title> %s </> ',
        defaults: ['My First Html Page']
    };
    this.blocks.doHtmlHeadBasic = {
        type: 'command',
        category: 'htmlhead',
        spec: 'head: < %htmlheadbasic p: %exp0blank %c',
        defaults: ['style', '']
    };
    this.blocks.doHtmlHeadBasic2 = {
        type: 'command',
        category: 'htmlhead',
        spec: 'head: < %htmlheadbasic1 p: %exp0blank />'

    };
    this.blocks.doHtmlScript = {
        type: 'command',
        category: 'htmlhead',
        spec: '<script type=" %scriptType " src=" %scriptSrc " p: %exp0blank />',
        defaults: ['text/javascript', 'react.development.js']
    };
    this.blocks.doHtmlBabelScript = {
        type: 'command',
        category: 'htmlhead',
        spec: '<script type="text/babel" src=" %scriptSrc " data-plugins="transform-modules-umd" p: %exp0blank />',
        defaults: ['./js/your.js']
    };
//Eric 20220519 link CSS 
    this.blocks.doHtmlCssLink = {
        type: 'command',
        category: 'htmlhead',
        spec: '<link rel="stylesheet" href=" %cssHref " type="text/css" p: %exp0blank />',
        defaults: ['./css/your.css']
    };
    // FCC 2022 06 06 
    this.blocks.doHtmlScript2 = {
        type: 'command',
        category: 'htmlhead',
        spec: '<script %scriptType > %c',
        defaults: ['']
    };
// FCC 20210618 to be deleted


    this.blocks.doHtmlHeadBasic4 = {
        type: 'command',
        category: 'htmlhead',
        spec: 'head: < %htmlheadbasic1 p: %exp0blank />',
        defaults: ['meta', '']
    };
    this.blocks.doHtmlHeadProperties1 = {
        type: 'reporter',
        category: 'properties',
        spec: 'head: %headProperties = %headPropertiesValue ',
        defaults: ['charset', '"utf-8"']
    };
    this.blocks.doHtmlDomEvent = {
        type: 'reporter',
        category: 'properties',
        spec: 'event: %DomEvent = %DomEventValue ',
        defaults: ['onclick', ""]
    };
    this.blocks.reportHtmlHtmlPropertyValue = {
        type: 'reporter',
        category: 'properties',
        spec: 'html: %htmlKeys = " %htmlValues "',
        defaults: ['lang', 'en']
    };
//    this.blocks.doHtmlHeadProperties = {
//        type: 'reporter',
//        category: 'properties',
//        spec: 'properties %headProperties = %s'
//    };
    this.blocks.doHtml5MainStructure = {
        type: 'command',
        category: 'html',
        spec: 'layout: <header p: %exp0blank > %c <nav p: %exp0blank > %c <main p: %exp0blank > %c <footer p: %exp0blank > %c',
        defaults: []
    };
    this.blocks.doHtml5Layout = {
        type: 'command',
        category: 'html',
        spec: 'layout: < %html5Layout p: %expblank %c',
        defaults: ['div', '']
    };
    this.blocks.doHtml5Basic = {
        type: 'command',
        category: 'html',
        spec: 'text: < %html5Text p: %expblank %c',
        defaults: ['p', '']
    };
    this.blocks.doHtml5Basic2 = {
        type: 'command',
        category: 'html',
        spec: 'text: < %html5Text p: %expblank > %expblank </>',
        defaults: ['p', '', '']
    };
//    this.blocks.reportHtml5Basic3 = {
//        type: 'reporter',
//        category: 'html',
//        spec: 'text: < %html5Text p: %exp0blank > cont = %s_blank />',
//        defaults: ['div', '', '']
//    };
    this.blocks.reportHTMLCSSProperties = {
        type: 'reporter',
        category: 'properties',
        spec: 'css: %htmlCssProperties =" %s "',
        defaults: ['class']
    };
    this.blocks.reportHtmlTextProperties = {
        type: 'reporter',
        category: 'properties',
        spec: 'text: %textproperties = %textpropertiesValues ',
        defaults: ['href', '"http://iot.ttu.edu.tw"']
    };
    this.blocks.reportHtmlMediaProperties = {
        type: 'reporter',
        category: 'properties',
        spec: 'media: %sourceproperties = %sourcepropertiesvalue ',
        defaults: ['src', 'image.png']
    };
    this.blocks.doHtmlSvg = {
        type: 'command',
        category: 'html',
        spec: 'svg: < %svg p: %exp0blank />',
        defaults: ["circle", '']
    };
    this.blocks.doHtmlSvg2 = {
        type: 'command',
        category: 'html',
        spec: 'svg: < %svg p: %exp0blank > %c',
        defaults: ['svg', '']
    };
    this.blocks.doHtmlSvgProperties = {
        type: 'reporter',
        category: 'properties',
        spec: ' svg: %svgproperties = %svgpropertyvalue ',
        defaults: ['width', '100']
    };
//    this.blocks.doHtmlTime = {
//        type: 'reporter',
//        category: 'html',
//        spec: '<time attrs = %exp0blank > cont = %s_blank </time>'
//    };

    this.blocks.doHtmlEmptyTag = {
        type: 'command',
        category: 'html',
        spec: '< %emptyTag >',
        defaults: ['hr']
    };
    this.blocks.reportHtmlEmptyTag = {
        type: 'reporter',
        category: 'html',
        spec: '< %emptyTag >',
        defaults: ['br']
    };
    this.blocks.reportSimpleProperty = {
        type: 'reporter',
        category: 'properties',
        spec: 'prop: %simpleProperty ',
        defaults: ['novalidate']
    };
    this.blocks.doHtmlHr = {
        type: 'command',
        category: 'html',
        spec: '<hr>'
    };
    this.blocks.doHtmlBr = {
        type: 'reporter',
        category: 'html',
        spec: '<br>'
    };
    this.blocks.doMedia = {
        type: 'command',
        category: 'html',
        spec: 'media: < %media p: %expblank > %exp0blank  </>',
        defaults: ['img', '', '']
    };
    this.blocks.doMedia1 = {
        type: 'command',
        category: 'html',
        spec: 'media: < %media p: %expblank > %c',
        defaults: ['img', '']
    };
    this.blocks.doMedia2 = {
        type: 'command',
        category: 'html',
        spec: 'media: < %media p: %exp0blank />',
        defaults: ['img', '']
    };
    this.blocks.doHtmlTable = {
        type: 'command',
        category: 'html',
        spec: 'table: %table p: %exp0blank > %expblank </>',
        defaults: ['td', '']
    };
    this.blocks.doHtmlTable1 = {
        type: 'command',
        category: 'html',
        spec: 'table: < %table1 p: %exp0blank > %c',
        defaults: ['table', '']
    };
    this.blocks.doHtmlTable1Properties = {
        type: 'reporter',
        category: 'properties',
        spec: 'table: %tableproperties = %tablePropertiesValues ',
        defaults: ['border', '"1"']
    };
    this.blocks.doHtmlForm = {
        type: 'command',
        category: 'html',
        spec: 'form: < %formBlock p: %exp0blank > %c',
        defaults: ['form', '']
    };
    this.blocks.doHtmlForm2 = {
        type: 'command',
        category: 'html',
        spec: 'form: < %formBlock p: %formproperties = %formpropertiesvalue %formproperties = %s  %exp0blank > %c',
        defaults: ['form', 'method', '"post"', 'action', '"action.php"', '']
    };
    this.blocks.doHtmlForm1 = {
        type: 'command',
        category: 'html',
        spec: 'form elem: < %form p: %expblank >  %expblank </>',
        defaults: ['button', '']
    };
//    this.blocks.doHtmlForm3 = {
//        type: 'command',
//        category: 'html',
//        spec: 'form: < %form p: type =  %exp0blank > cont = %s_blank />',
//        defaults: ['input', '']
//    };


//    this.blocks.doHtmlFormProperties = {
//        type: 'reporter',
//        category: 'properties',
//        spec: 'form: %formproperties = %s'
//    };

    this.blocks.doHtmlFormProperties1 = {
        type: 'reporter',
        category: 'properties',
        spec: 'form: %formproperties = %formpropertiesvalue ',
        defaults: ['method', '"post"']
    };
    this.blocks.reportHtmlFormInputProperties = {
        type: 'reporter',
        category: 'properties',
        spec: 'input: %formInputProperty = %formInputPropertyValue ',
        defaults: ['type', 'text']
    };
    this.blocks.doHtmlFormInput = {
        type: 'command',
        category: 'html',
        spec: '<input p: %expblank />',
        defaults: ['']
    };
    this.blocks.doHtmlFormInput2 = {
        type: 'command',
        category: 'html',
        spec: '<input p: type= %inputtype name= %inputtype value= %inputTypeValue  %exp0blank  > %s',
        defaults: ['text', 'text', 'text', '', 'text']
    };
    this.blocks.doHtmlFormInput3 = {
        type: 'command',
        category: 'html',
        spec: '%exp0blank <input p: type= %inputtype name= %inputtype value= %inputTypeValue  %exp0blank /> %exp0blank',
        defaults: ['', '"text"', '"text"', '"text"', '']
    };
    this.blocks.doHtmlOption = {
        type: 'command',
        category: 'html',
        spec: '<option attrs = %exp0blank > %s_blank </option>'
    };
    this.blocks.doHtmlDataList = {
        type: 'command',
        category: 'html',
        spec: '<datalist attrs = %exp0blank > %c </datalist>'
    };
    this.blocks.doHtmlList1 = {
        type: 'command',
        category: 'html',
        spec: 'list: < %htmllist p: %exp0blank > %c',
        defaults: ['ul', '']
    };
    this.blocks.doHtmlList = {
        type: 'command',
        category: 'html',
        spec: 'list: < %htmllist p: %exp0blank > %expblank </>',
        defaults: ['li']
    };
    this.blocks.reportHtmlListProperties = {
        type: 'reporter',
        category: 'properties',
        spec: 'list: %listProperties = %listPropertiesValues ',
        defaults: ['start', '"10"']
    };
    this.blocks.doHtmlFrame = {
        type: 'command',
        category: 'html',
        spec: 'frame < %frame p: %exp0blank > %s_blank <>'
    };
    this.blocks.doHtmlFrame1 = {
        type: 'command',
        category: 'html',
        spec: '<frame attrs = %exp0blank >'
    };
    this.blocks.doHtmlFrameset = {
        type: 'command',
        category: 'html',
        spec: '<frameset p: %exp0blank > %c <>'
    };
    this.blocks.doHtmlFramProperties = {
        type: 'reporter',
        category: 'properties',
        spec: ' Fram %framproperties = %s'
    };
    this.blocks.doHtmlScrolling = {
        type: 'reporter',
        category: 'properties',
        spec: 'scrolling %scrolling'
    };
    //css
//    this.blocks.doCSSBase = {
//        type: 'command',
//        category: 'css',
//        spec: 'selector %s { %c }'
//    };


    this.blocks.doCSSBase = {
        type: 'command',
        category: 'css',
        spec: 'desc sel: %expblank { %c',
        defaults: ['*']
    };
    this.blocks.doCSSBaseComma = {
        type: 'command',
        category: 'css',
        spec: 'sel,: %exp { %c',
        defaults: ['a']
    };
    this.blocks.doCSSTagSelector = {
        type: 'reporter',
        category: 'css',
        spec: 'tag: %element',
        defaults: ['p']
    };
    this.blocks.reportCSSTagKeyFramesSelector = {
        type: 'reporter',
        category: 'css',
        spec: 'tag: %TagKey %t',
        defaults: ['@keyframes', 'id']
    };
    this.blocks.doCSSTagSelector2 = {
        type: 'reporter',
        category: 'css',
        spec: 'tag: %element2 %selector',
        defaults: ['a', ':hover']
    };
    this.blocks.doCSSSelectorOperator = {
        type: 'reporter',
        category: 'css',
        spec: 'sel op: %selector',
        defaults: ['>']
    };
    this.blocks.doCSSSelectorFunction = {
        type: 'reporter',
        category: 'css',
        spec: 'sel fn: %cssOptions2 ( %s )',
        defaults: [':nth-child', '2']
    };
    this.blocks.doSelectorElement = {
        type: 'reporter',
        category: 'css',
        spec: 'selector %element %cssOptions %element',
        defaults: ['p', '>', 'li']
    };
    this.blocks.doSelectorElement2 = {
        type: 'reporter',
        category: 'css',
        spec: 'selector %element : %cssOptions2 ( %s )',
        defaults: ['p', ':nth-child', '2']
    };
    this.blocks.doSelectorClass = {
        type: 'reporter',
        category: 'css',
        spec: 'class: . %t',
        defaults: ['class']
    };
    this.blocks.doSelectorId = {
        type: 'reporter',
        category: 'css',
        spec: 'id: # %t',
        defaults: ['id']
    };
    this.blocks.doCSSComment = {
        type: 'command',
        category: 'css',
        spec: '/* %exp */',
        defaults: []
    };
//    this.blocks.reportCommads = {
//        type: 'ring',
//        category: 'other',
//        spec: '%rc',
//        defaults: []
//    };   
//    %rc
// report CSS property=value
    this.blocks.reportCSSProperty = {
        type: 'reporter',
        category: 'css',
        spec: 'prop: %cssproperty : %csspropertyValue ;',
        defaults: ['color', 'red']
    };
    this.blocks.reportCSSBackground = {
        type: 'reporter',
        category: 'css',
        spec: 'backgroud: %background : %backgroundvalue ;',
        defaults: ['background-color', 'red']
    };
    this.blocks.reportCSSBorder = {
        type: 'reporter',
        category: 'css',
        spec: 'border: %border : %bordervalue ;',
        defaults: ['border', '2px solid powderblue']
    };
    this.blocks.reportCSSMarginPadding = {
        type: 'reporter',
        category: 'css',
        spec: 'MarPad: %cssMarginPadding : %cssMarginPaddingValue ;',
        defaults: ['margin', '25px 50px 75px 100px']
    };
// do CSS property=value
    this.blocks.doCSSProperty = {
        type: 'command',
        category: 'css',
        spec: 'prop: %cssproperty : %csspropertyValue ;',
        defaults: ['color', 'red']
    };
    this.blocks.doCSSBorder = {
        type: 'command',
        category: 'css',
        spec: 'border: %border : %bordervalue ;',
        defaults: ['border', '2px solid powderblue']
    };
    this.blocks.doCSSBackground = {
        type: 'command',
        category: 'css',
        spec: 'backgroud: %background : %backgroundvalue ;',
        defaults: ['backgroud-color', 'red']
    };
    this.blocks.doCSSText = {
        type: 'command',
        category: 'css',
        spec: 'FtTx: %cssText : %cssTextValue ;',
        defaults: ['text-align', 'center']
    };
    this.blocks.reportCSSText = {
        type: 'reporter',
        category: 'css',
        spec: 'FtTx: %cssText : %cssTextValue ;',
        defaults: ['text-align', 'center']
    };
    this.blocks.doCSSList = {
        type: 'command',
        category: 'css',
        spec: 'DpLs: %cssList : %cssListValue ;',
        defaults: ['display', 'inline']
    };
    this.blocks.reportCSSList = {
        type: 'reporter',
        category: 'css',
        spec: 'DpLs: %cssList : %cssListValue ;',
        defaults: ['display', 'inline']
    };
//%cssMarginPadding
    this.blocks.doCSSMarginPadding = {
        type: 'command',
        category: 'css',
        spec: 'MarPad: %cssMarginPadding : %cssMarginPaddingValue ;',
        defaults: ['margin', '25px 50px 75px 100px']
    };
//rgba
    this.blocks.reportColorRgb = {
        type: 'reporter',
        category: 'css',
        spec: 'rgb( %s , %s , %s )',
        defaults: ['255', '255', '255']
    };
    this.blocks.reportColorRgba = {
        type: 'reporter',
        category: 'css',
        spec: 'rgba( %s , %s , %s , %s )',
        defaults: ['255', '255', '255', '0.0']
    };
//rgba(
    this.blocks.doSelectorTagClass = {
        type: 'reporter',
        category: 'css',
        spec: 'tag.class: %element . %t',
        defaults: ['p', 'class']
    };
// border value

//    this.blocks.doCSSProperty = {
//        type: 'command',
//        category: 'css',
//        spec: ' %cssproperty : %s ;'
//    };

    this.blocks.doCSSPropertyAlign = {
        type: 'command',
        category: 'css',
        spec: 'align %align : %alignValue ;'
    };
    this.blocks.doCSSPropertyAnimation = {
        type: 'command',
        category: 'css',
        spec: 'animation %animation : %s ;'
    };
    this.blocks.doCSSPropertyAnimationValue = {
        type: 'reporter',
        category: 'css',
        spec: 'animation value %animationvalue'
    };
    this.blocks.doCSSPropertyAnimationCubicBezier = {
        type: 'reporter',
        category: 'css',
        spec: 'animation cubic-bezier ( %exp )'
    };
    this.blocks.doCSSPropertyBackground = {
        type: 'command',
        category: 'css',
        spec: 'background %background : %s ;'
    };
    this.blocks.doCSSPropertyPosition = {
        type: 'command',
        category: 'css',
        spec: 'position: %cssposition ;',
        defaults: ['relative']
    };
    this.blocks.doCSSPropertyTransform = {
        type: 'command',
        category: 'css',
        spec: 'transform: %cssTransform ;',
        defaults: ['scale(2)']
    };
    this.blocks.doCSSPropertyDirection = {
        type: 'command',
        category: 'css',
        spec: 'direction %direction : %s ;'
    };
    this.blocks.doCSSPropertyGradual = {
        type: 'reporter',
        category: 'css',
        spec: 'Gradual %gradual (" %exp ")'
    };
    // fcc: to be delete 
    this.blocks.doCSSPropertyColor = {
        type: 'reporter',
        category: 'css',
        spec: 'color %clr'
    };
    // fcc: to be delete 
    this.blocks.doCSSPropertyBackgroundImage = {
        type: 'reporter',
        category: 'css',
        spec: 'background img %backgroundimg (" %s ")'
    };
    this.blocks.doCSSPropertyBox = {
        type: 'command',
        category: 'css',
        spec: 'box %box : %boxValue ;',
        defaults: ['box-shadow', '8px 8px 10px blue']
    };
    this.blocks.reportCSSPropertyBox = {
        type: 'reporter',
        category: 'css',
        spec: 'box %box : %boxValue ;',
        defaults: ['box-shadow', '8px 8px 10px blue']
    };
    this.blocks.doCSSPropertyBreak = {
        type: 'command',
        category: 'css',
        spec: 'break %break : %s ;'
    };
    this.blocks.doCSSPropertyBreakValue = {
        type: 'reporter',
        category: 'css',
        spec: 'break value %breakValue'
    };
	
	//MQTT module
    this.blocks.doCreateMqttClient = {
        type: 'command',
        category: 'MQTT',
        spec: 'MQTT create %t with id %s server %s onMessageArrived %t',
        defaults: ['client', '"myClientId"', '"wss://broker.emqx.io:8084/mqtt"', 'onMessageArrived']
    };

    this.blocks.doConnectMqtt = {
        type: 'command',
        category: 'MQTT',
        spec: 'MQTT %t connect username %s password %s onSuccess %t onFailure %t %exp0',
        defaults: ['client','','','onSuccess','onFailure']
    };

    this.blocks.doRegisterMessage = {
        type: 'command',
        category: 'MQTT',
        spec: 'MQTT on message fn: %t function ( %t ) %t %t  %c',
        defaults: ['onMessageArrived', 'payload' ,'topic', 'msg']
    };
	
    this.blocks.doPublishMqtt = {
        type: 'command',
        category: 'MQTT',
        spec: 'MQTT %t publishes topic %s message %s qos %mqttQos',
        defaults: ['client', 'topic', 'message', '0']
    };

    this.blocks.doSubscribeMqtt = {
        type: 'command',
        category: 'MQTT',
        spec: 'MQTT %t subscribes topic %s qos %mqttQos',
        defaults: ['client', 'topic', '0']
    };

}


SpriteMorph.prototype.changeBlockVisibility = function (aBlock, hideIt, quick) {
    var ide = this.parentThatIsA(IDE_Morph),
            dict, cat;
    if (aBlock.isCustomBlock) {
        (aBlock.isGlobal ? aBlock.definition
                : this.getMethod(aBlock.semanticSpec)
                ).isHelper = !!hideIt;
    } else if (aBlock.selector === 'reportGetVar') {
        this.variables.find(
                aBlock.blockSpec
                ).vars[aBlock.blockSpec].isHidden = !!hideIt;
    } else {
        if (hideIt) {
            if (aBlock.categorylocation != null) {
                StageMorph.prototype.hiddenPrimitives[aBlock.categorylocation + "_" + aBlock.selector] = true;
            } else {
                StageMorph.prototype.hiddenPrimitives[aBlock.selector] = true;
            }
        } else {
            if (aBlock.categorylocation != null) {
                delete StageMorph.prototype.hiddenPrimitives[aBlock.categorylocation + "_" + aBlock.selector];
            } else {
                delete StageMorph.prototype.hiddenPrimitives[aBlock.selector];
            }
        }
    }
    if (quick) {
        return;
    }
    dict = {
        doWarp: 'control',
        reifyScript: 'operators',
        reifyReporter: 'operators',
        reifyPredicate: 'operators',
        doDeclareVariables: 'variables'
    };
    cat = dict[aBlock.selector] || aBlock.category;
    if (cat === 'lists') {
        cat = 'variables';
    }
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
};
SpriteMorph.prototype.isHidingBlock = function (aBlock) {
    var frame;
    if (aBlock.isCustomBlock) {
        return (
                aBlock.isGlobal ? aBlock.definition
                : this.getMethod(aBlock.semanticSpec)
                ).isHelper;
    }
    if (aBlock.selector === 'reportGetVar') {
        frame = this.variables.silentFind(aBlock.blockSpec);
        if (!frame) {
            return false;
        }
        return frame.vars[aBlock.blockSpec].isHidden;
    }
    if (aBlock.categorylocation != null) {
        return StageMorph.prototype.hiddenPrimitives[aBlock.categorylocation + "_" + aBlock.selector] === true;
    } else {
        return StageMorph.prototype.hiddenPrimitives[aBlock.selector] === true;
    }
};
var firstHide = true;
SpriteMorph.prototype.initBlocks = function () {
    this.originalInitBlocks();
    this.initPythonBlocks();
    if (firstHide) {
        var defs = SpriteMorph.prototype.blocks;
        Object.keys(defs).forEach(function (sel) {
            if (defs[sel].category === 'chart') {
                StageMorph.prototype.hiddenPrimitives["looks_" + sel] = true;
            }
            if (defs[sel].category === 'ionic-widgets' || defs[sel].category === 'ionic-widgets2') {
                StageMorph.prototype.hiddenPrimitives["ionic-container_" + sel] = true;
            }
            //if (defs[sel].category === 'chart' || defs[sel].category === 'node' || defs[sel].category === 'bit' || defs[sel].category === 'file' || defs[sel].category === 'perf' || defs[sel].category === 'rtcfifo' || defs[sel].category === 'rtcmem' || defs[sel].category === 'rtctime' || defs[sel].category === 'struct' || defs[sel].category === 'math' || defs[sel].category === 'string') {
            //    if (!(sel === 'doSetTmrAlarm')) {
            //        StageMorph.prototype.hiddenPrimitives[sel] = true;
            //    }
            //    // StageMorph.prototype.hiddenPrimitives[sel] = true;
            //}
        });
        firstHide = false;
    }
}

SpriteMorph.prototype.initBlocks();
// blockTemplates decorator

SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;
SpriteMorph.prototype.blockTemplates = function (category = 'motion',
        all = false // include hidden blocks
        ) {
    var myself = this;
    var blocks = myself.originalBlockTemplates(category, all);
    function blockBySelector(selector) {
        if (StageMorph.prototype.hiddenPrimitives[category + "_" + selector] && !all) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        newBlock.categorylocation = category;
        return newBlock;
    }
    ;
    /* eric 20211208 angular to react
     if (category === 'angular') {
     blocks.push(blockBySelector('reportStringInterpolation'));
     blocks.push(blockBySelector('reportPropertyBinding'));
     blocks.push(blockBySelector('reportEventBinding'));
     blocks.push(blockBySelector('reportTwoWayBinding'));
     blocks.push('-');
     blocks.push(blockBySelector('reportAngularControlCommand'));
     blocks.push('-');
     blocks.push(blockBySelector('doAngularComponent'));
     blocks.push(blockBySelector('reportTypeSciptNewObject'));
     blocks.push(blockBySelector('reportAngularComponentKeyValue'));
     blocks.push('-');
     blocks.push(blockBySelector('doHtmlReact'));
     
     } else 
     */
    if (category === 'control') {

        blocks.push(blockBySelector('doTypeSciptIf'));
        blocks.push(blockBySelector('doTypeSciptIfElse'));

//        doJavaScriptTry
        blocks.push(blockBySelector('doTypeSciptSwitch'));
        blocks.push(blockBySelector('doTypeSciptSwitchCase'));
        blocks.push(blockBySelector('doTypeSciptSwitchDefault'));
        blocks.push('-');
        blocks.push(blockBySelector('doTypeSciptFor'));
        blocks.push(blockBySelector('doTypeSciptForIn'));
        blocks.push(blockBySelector('doTypeSciptForOf'));
        blocks.push(blockBySelector('doTypeSciptWhile'));
        blocks.push(blockBySelector('doTypeSciptDoWhile'));
        blocks.push(blockBySelector('doTypeSciptBreak'));
        blocks.push(blockBySelector('doTypeSciptContinue'));
//        blocks.push('-');
//        blocks.push(blockBySelector('reportFirebaseQuery'));
//        blocks.push(blockBySelector('doTryExcept3'));
//        blocks.push(blockBySelector('doTryExcept2'));
//        blocks.push(blockBySelector('reportException'));
//        blocks.push(blockBySelector('doExcept'));
//        blocks.push(blockBySelector('doExcept2'));
//        blocks.push(blockBySelector('doExcept3'));
//        blocks.push(blockBySelector('doFinally'));
//        blocks.push(blockBySelector('doRaise'));
//        blocks.push(blockBySelector('doRaise2'));
//        blocks.push('-');
//        blocks.push(blockBySelector('doWith'));
//        blocks.push(blockBySelector('doWithAs'));
//        blocks.push('-');

//        
//        blocks.push(blockBySelector('doForIn3'));
//        blocks.push(blockBySelector('reportForIn'));
//        blocks.push(blockBySelector('reportForIn3'));
//        blocks.push(blockBySelector('reportForIn2'));
//        blocks.push(blockBySelector('reportRange'));
//        blocks.push(blockBySelector('reportJSJsonFunction'));
        blocks.push(blockBySelector('doJavaScriptTry'));
        blocks.push('-');
        blocks.push(blockBySelector('reportPromiseObjectFunction'));
//        blocks.push(blockBySelector('doPromiseObjectFunction')); // FCC 2022/08/09: mark this block
        blocks.push(blockBySelector('doPromiseObjectFunction2'));
        blocks.push(blockBySelector('doPromiseFunction'));
        blocks.push(blockBySelector('doReactEventFunction'));

    } else if (category === 'operators') {

        blocks.push('-');
        blocks.push(blockBySelector('reportUnaryOperator'));
        blocks.push(blockBySelector('reportBinayOperator'));
        blocks.push(blockBySelector('reportTernaryOperator'));
        blocks.push(blockBySelector('reportRelationalOperator'));
//        blocks.push('-');
        blocks.push(blockBySelector('reportTypeSciptStringVariable2'));
//        blocks.push(blockBySelector('reportArrayBuiltInFunctionWithCallback'));

        blocks.push(blockBySelector('reportTypeSciptString'));
        blocks.push(blockBySelector('reportJavaSciptString'));
        blocks.push(blockBySelector('reportTypeSciptMultiVariables'))
        blocks.push(blockBySelector('reportReactExpression2'));
        blocks.push('-');
        blocks.push(blockBySelector('reportCallFunction'));
        blocks.push(blockBySelector('reportJFunctionConstant'));
        blocks.push(blockBySelector('reportFuntion2'));
        blocks.push(blockBySelector('reportJSDateFunction'));
        blocks.push(blockBySelector('reportJSJsonFunction'));
        blocks.push(blockBySelector('reportJSMathFunction'));
        blocks.push(blockBySelector('reportNumberBuiltInFunction'));
        blocks.push(blockBySelector('reportStringBuiltInFunction'));
//        blocks.push(blockBySelector('reportTypeSciptFunction5'));
//        blocks.push(blockBySelector('reportTypeSciptFunction3'));


//        blocks.push('-'); // variables
//        blocks.push(blockBySelector('reportTypeSciptNewArray'));
//        blocks.push(blockBySelector('reportTypeSciptNewObject'));
//        blocks.push(blockBySelector('reportArrayBuiltInFunction'));
//        blocks.push(blockBySelector('reportArrayBuiltInFunctionWithCallback'));
//        blocks.push(blockBySelector('reportDictFuntion'));
//        blocks.push(blockBySelector('reportObjectProperty'));
//        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
//        blocks.push(blockBySelector('reportListWithoutComma'));

        blocks.push('-'); // HTML DOM
        blocks.push(blockBySelector('reportTagConstant'));
        blocks.push(blockBySelector('reportDomConstant'));
        blocks.push(blockBySelector('reportDomDocumentFunction'));
        blocks.push(blockBySelector('reportDomEvent'));
        blocks.push(blockBySelector('reportDomElementFunctionProperty'));


        blocks.push('-'); // server
        blocks.push(blockBySelector('reportNewClassObject'));
        blocks.push(blockBySelector('reportClassFunction'));
        blocks.push(blockBySelector('reportClassConstant'));

        blocks.push('-'); // Cordova
        blocks.push(blockBySelector('reportCordovaFunction'));



//        blocks.push(blockBySelector('reportDomElementFunctionProperty'));
//        blocks.push(blockBySelector('reportTypeSciptMultiVariables'));
//        blocks.push(blockBySelector('reportObjectProperty'));




    } else if (category === 'variables') {

//        blocks.push('-');
//        blocks.push(blockBySelector('reportArrayBuiltInFunction'));
//        blocks.push(blockBySelector('reportTypeSciptNewArray'));
//        blocks.push(blockBySelector('reportTypeSciptNewObject'));
////        blocks.push(blockBySelector('doHtmlBabelScript'));
//        blocks.push(blockBySelector('reportDictFuntion'));
//        blocks.push(blockBySelector('reportObjectProperty'));
//        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
//        blocks.push(blockBySelector('reportTypeSciptNewObject2'));

        blocks.push(blockBySelector('reportTypeSciptNewArray'));
        blocks.push(blockBySelector('reportTypeSciptNewArray2'));
        blocks.push(blockBySelector('reportTypeSciptNewObject'));
        blocks.push(blockBySelector('reportTypeSciptNewObject2'));
        blocks.push(blockBySelector('doTypeSciptNewObject'));
        blocks.push(blockBySelector('reportArrayBuiltInFunction'));
        blocks.push(blockBySelector('reportArrayBuiltInFunctionWithCallback'));

        blocks.push(blockBySelector('reportDictFuntion'));
        blocks.push(blockBySelector('reportObjectProperty'));
        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
        blocks.push(blockBySelector('reportListWithoutComma'));

    } else if (category === 'html') {


        blocks.push(blockBySelector('doHtml'));
        blocks.push(blockBySelector('reportHtmlHtmlPropertyValue'));
        blocks.push(blockBySelector('doHtml2'));
        blocks.push('-');
        blocks.push(blockBySelector('doHtmlHeadTitle2'));
//        blocks.push(blockBySelector('doHtmlHeadBasic')); // script

        blocks.push(blockBySelector('doHtmlHeadBasic4')); // base, link, meta
        blocks.push(blockBySelector('doHtmlHeadProperties1'));
        blocks.push(blockBySelector('doHtmlScript'));
        blocks.push(blockBySelector('doHtmlBabelScript'));
        blocks.push(blockBySelector('doHtmlCssLink'));
        blocks.push(blockBySelector('doHtmlScript2'));
        blocks.push(blockBySelector('doHtmlDomEvent'));
        blocks.push(blockBySelector('doHtmlText'));
        blocks.push(blockBySelector('reportHtmlJoin'))
//		blocks.push(blockBySelector('reportSQLFunction'));
//		blocks.push(blockBySelector('doHtml5MainStructure'));        
        blocks.push(blockBySelector('reportHTMLCSSProperties'));
        blocks.push('-');
        blocks.push(blockBySelector('doHtml5MainStructure'));
        blocks.push(blockBySelector('doHtml5Layout'));
        blocks.push(blockBySelector('doHtml5Basic')); // <text: />
        blocks.push(blockBySelector('doHtml5Basic2'));
        blocks.push(blockBySelector('reportHtmlTextProperties'));
        blocks.push(blockBySelector('reportSimpleProperty'));
        blocks.push(blockBySelector('reportHtmlEntity'));
        blocks.push(blockBySelector('doHtmlEmptyTag')); // hr
        blocks.push(blockBySelector('reportHtmlEmptyTag')); // br

        blocks.push('-');
        blocks.push(blockBySelector('doHtmlList1'));
        blocks.push(blockBySelector('doHtmlList'));
        blocks.push(blockBySelector('reportHtmlListProperties'));
        blocks.push('-');
        blocks.push(blockBySelector('doHtmlTable1'));
        blocks.push(blockBySelector('doHtmlTable'));
        blocks.push(blockBySelector('doHtmlTable1Properties'));
        blocks.push('-');
        blocks.push(blockBySelector('doHtmlForm2'))
        blocks.push(blockBySelector('doHtmlForm'));
        blocks.push(blockBySelector('doHtmlFormProperties1'));
        ;
        blocks.push(blockBySelector('doHtmlForm1'));
//        blocks.push(blockBySelector('reportHTMLCSSProperties'));   
        blocks.push(blockBySelector('doHtmlFormInput3'));
        blocks.push(blockBySelector('doHtmlFormInput'));
        blocks.push(blockBySelector('reportHtmlFormInputProperties'));
        blocks.push('=');
        blocks.push(blockBySelector('doMedia1'));
        blocks.push(blockBySelector('doMedia'));
        blocks.push(blockBySelector('reportHtmlMediaProperties'));
        blocks.push('-');
        blocks.push(blockBySelector('doHtmlSvg2'));
        blocks.push(blockBySelector('doHtmlSvg'));
        blocks.push(blockBySelector('doHtmlSvgProperties'));

    } else if (category === 'JavaScript') {
//        blocks.push(blockBySelector('reifyScript'));
//        blocks.push(blockBySelector('reifyReporter'));
//        blocks.push(blockBySelector('reifyPredicate'));
//        blocks.push('#');
//        blocks.push('-');


        blocks.push(blockBySelector('doTypeSciptImport'));
        blocks.push(blockBySelector('doTypeSciptImport2'))
        blocks.push(blockBySelector('doTypeSciptConsoleLog'));
//        blocks.push(blockBySelector('reportTypeSciptStringVariable2'));
        blocks.push(blockBySelector('doTypeSciptConsoleFunction'));
//        blocks.push(blockBySelector('reportTypeSciptString'));
        blocks.push('-');
        // eric 20211808 doTypeSciptLet10 to doJavaSciptLet10
        //blocks.push(blockBySelector('doJavaSciptArrowFunctionWithEven'));
        blocks.push(blockBySelector('doJavaSciptLet10'));
        blocks.push(blockBySelector('doTypeSciptLet13'));
        blocks.push(blockBySelector('doTypeSciptLet15'));
        blocks.push(blockBySelector('doJavaSciptFunction3'))
        blocks.push(blockBySelector('doJavaSciptFunction'))
        blocks.push(blockBySelector('doJavaSciptArrowFunctionWithEvent'));
        blocks.push(blockBySelector('doJavaSciptFunction2'));
        blocks.push(blockBySelector('doTypeSciptReturn'));
//        blocks.push(blockBySelector('reportTypeSciptMultiVariables'));

        blocks.push(blockBySelector('doTypeSciptExecuteFunction'));
        blocks.push(blockBySelector('reportCallFunction'));
        // eric 20211808 reportTypeSciptParameter~4 to reportJavaSciptParameter~4
        //blocks.push(blockBySelector('reportTypeSciptParameter'));
        //blocks.push(blockBySelector('reportTypeSciptParameter2'));
        //blocks.push(blockBySelector('reportTypeSciptParameter3'));
        //blocks.push(blockBySelector('reportTypeSciptParameter4'));

//        blocks.push(blockBySelector('reportJavaSciptParameter3'));
//        blocks.push(blockBySelector('reportJavaSciptParameter4'));

//        blocks.push(blockBySelector('reportTypeSciptFunctionType'));

        blocks.push(blockBySelector('reportTypeSciptFunction5'));
        blocks.push(blockBySelector('reportTypeSciptFunction3'));
//        blocks.push(blockBySelector('doDomGetElementAddEventFunction'));
//        blocks.push(blockBySelector('reportIonicEvent'));
//        blocks.push(blockBySelector('reportDomDocumentFunction'));

        blocks.push(blockBySelector('doDomDocumentFunction'));
        blocks.push(blockBySelector('doDomDocumentFunctionConst'));
        blocks.push(blockBySelector('doDomElementFunction'));
        blocks.push(blockBySelector('doDomGetElementAddEventFunction'));

//        blocks.push(blockBySelector('reportCordovaFunction'));
//        blocks.push(blockBySelector('reportNewClassObject'));
//        blocks.push(blockBySelector('reportClassFunction'));

//        blocks.push('-');
// old javascript 

//        blocks.push(blockBySelector('reportTypeSciptNewArray'));
//        blocks.push(blockBySelector('reportTypeSciptNewObject'));
//        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
//        blocks.push(blockBySelector('reportTypeSciptMultiVariables'));
//        blocks.push(blockBySelector('reportPromiseObjectFunction'));
        blocks.push('-'); // function    

        // eric 20211808 doTypeSciptFunction2 to doJavaSciptFunction2
        //blocks.push(blockBySelector('doTypeSciptFunction2'));

//        blocks.push('-');
//// old javascript 
//
//        blocks.push(blockBySelector('reportTypeSciptNewArray'));
//        blocks.push(blockBySelector('reportTypeSciptNewObject'));
//        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
//        blocks.push(blockBySelector('reportTypeSciptMultiVariables'));
//        blocks.push(blockBySelector('reportObjectProperty'));
//        blocks.push('-');
//        blocks.push(blockBySelector('doDomDocumentFunctionConst'));

        blocks.push('-'); // class     
        blocks.push(blockBySelector('doSciptClass'));
        blocks.push(blockBySelector('doTypeSciptClass'));
        blocks.push(blockBySelector('doTypeSciptClass2'));
        blocks.push(blockBySelector('reportTypeSciptNewClassObject'));
        blocks.push(blockBySelector('reportJavaSciptParameter'));
        blocks.push(blockBySelector('reportJavaSciptParameter2'));
//        blocks.push(blockBySelector('reportObjectProperty'));
//        blocks.push(blockBySelector('reportTypeSciptStringGeneric'));

        blocks.push('-');
        // eric 20211808 doTypeSciptVariable to doJavaSciptVariable
        //blocks.push(blockBySelector('doTypeSciptVariable'));
        blocks.push(blockBySelector('doJavaSciptVariable'));
        blocks.push(blockBySelector('doTypeSciptConstructor'));
        blocks.push(blockBySelector('doTypeSciptClassSuper'));
        // eric 20211808 doTypeSciptClassMethod~2 to doJavaSciptClassMethod~2
        //blocks.push(blockBySelector('doTypeSciptClassMethod'));
        //blocks.push(blockBySelector('doTypeSciptClassMethod2'));
        blocks.push(blockBySelector('doJavaSciptClassMethod'));
        blocks.push(blockBySelector('doJavaSciptClassMethod2'));
        blocks.push(blockBySelector('doTypeSciptLet13'))
        blocks.push(blockBySelector('doTypeSciptLet14'));
        blocks.push('-');
//doCSSTagSelector 
        blocks.push(blockBySelector('doAxiosFunction2'));
//        blocks.push(blockBySelector('doClassFunction')); 
        blocks.push(blockBySelector('doAxiosFunction'));
        blocks.push(blockBySelector('doAxiosKeyValue'));
    } else if (category === 'css') {
//        blocks.push(blockBySelector('reportHTMLCSSProperties'));   
        blocks.push(blockBySelector('doHtmlHeadBasic')); // script
        blocks.push(blockBySelector('reportHTMLCSSProperties'));
        blocks.push('-');
        blocks.push(blockBySelector('doCSSBaseComma'));
        blocks.push(blockBySelector('doCSSBase'));
        blocks.push(blockBySelector('doCSSTagSelector'));
        blocks.push(blockBySelector('doCSSTagSelector2'));
        blocks.push(blockBySelector('reportCSSTagKeyFramesSelector'));
        blocks.push(blockBySelector('doSelectorElement'));
        blocks.push(blockBySelector('doSelectorElement2'));
        blocks.push(blockBySelector('doSelectorClass'));
        blocks.push(blockBySelector('doSelectorId'));
        blocks.push(blockBySelector('doSelectorTagClass'));
        blocks.push(blockBySelector('doCSSSelectorOperator'));
        blocks.push(blockBySelector('doCSSSelectorFunction'));

        blocks.push('-');
        blocks.push(blockBySelector('doCSSProperty'));
        blocks.push(blockBySelector('reportCSSProperty'));
        //        blocks.push(blockBySelector('reportCSSTagKeyFramesSelector '));    
        blocks.push(blockBySelector('reportColorRgb'));
        blocks.push(blockBySelector('reportColorRgba'));
        blocks.push(blockBySelector('doCSSPropertyColor'));
        blocks.push('-');
        blocks.push(blockBySelector('doCSSComment'));
        blocks.push(blockBySelector('doCSSBackground'));
        blocks.push(blockBySelector('reportCSSBackground'));
        blocks.push(blockBySelector('doCSSBorder'));
        blocks.push(blockBySelector('reportCSSBorder'));
//        blocks.push('=');
        blocks.push(blockBySelector('doCSSPropertyBox'));
        blocks.push(blockBySelector('reportCSSPropertyBox'));
//        blocks.push(blockBySelector('doCSSPropertyBoxValue'));
        blocks.push(blockBySelector('doCSSList'));
        blocks.push(blockBySelector('reportCSSList'));
        blocks.push(blockBySelector('doCSSText'));
        blocks.push(blockBySelector('reportCSSText'));
        blocks.push(blockBySelector('doCSSMarginPadding'));
        blocks.push(blockBySelector('reportCSSMarginPadding'));
        blocks.push(blockBySelector('doCSSPropertyPosition'));
        blocks.push(blockBySelector('doCSSPropertyTransform'));
//        blocks.push(blockBySelector('doCSSPropertyTransform')); 
        blocks.push('=');
        blocks.push(blockBySelector('doCSSPropertyDirection'));
        blocks.push(blockBySelector('doCSSPropertyGradual'));
        blocks.push(blockBySelector('reportHtmlJoin'));
        blocks.push('=');
        blocks.push(blockBySelector('doCSSPropertyAlign'));
        blocks.push(blockBySelector('doCSSPropertyAnimation'));
        blocks.push(blockBySelector('doCSSPropertyAnimationValue'));
        blocks.push(blockBySelector('doCSSPropertyAnimationCubicBezier'));
//        blocks.push('=');
//        blocks.push(blockBySelector('doPromiseFunction'));
//        blocks.push(blockBySelector('doCSSPropertyBackgroundImage'));

        blocks.push('=');
        blocks.push(blockBySelector('doCSSPropertyBreak'));
        blocks.push(blockBySelector('doCSSPropertyBreakValue'));
//        blocks.push('=');
//        blocks.push(blockBySelector('doAxiosFunction'));

    } else if (category === 'server') {


//        blocks.push(blockBySelector('reportJavaSciptString'));
//        blocks.push(blockBySelector('reifyReporter'));
//        blocks.push(blockBySelector('reportPhpBuiltInFunctionString'));
//        blocks.push('#');PhpBuiltInFunctionString
        blocks.push('-');
        blocks.push(blockBySelector('doPhpContainer'));
        blocks.push(blockBySelector('reportPhpContainer'));
        blocks.push(blockBySelector('reportJavaSciptString'));

        blocks.push(blockBySelector('doPhpEcho'));
        blocks.push(blockBySelector('doPhpEcho2'));
        blocks.push(blockBySelector('doPhpDie'));
        blocks.push(blockBySelector('doPhpAssignment2'));
        blocks.push(blockBySelector('doPhpAssignment'));
//        blocks.push(blockBySelector('reportJavaSciptString'));        
        blocks.push(blockBySelector('reportPhpGlobalVariable'));
        blocks.push(blockBySelector('reportPhpBuiltInFunction'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionArray'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionCalendarDate'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionDirectory'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionFilesystem'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionFTP'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionJSON'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionMath'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionMysqli'));
        blocks.push(blockBySelector('reportPhpBuiltInFunctionString'));
        blocks.push('-');
        blocks.push(blockBySelector('doPhp_PDO'));
        blocks.push(blockBySelector('reportPDOFunction'));
        blocks.push(blockBySelector('doPhp_mysqli_connect'));
        blocks.push(blockBySelector('reportSQLFunction'));
        blocks.push(blockBySelector('reportSQLField'));
        blocks.push(blockBySelector('doPhp_mysqli_query'));
        blocks.push(blockBySelector('doPhp_mysqli_stmt'));
        blocks.push(blockBySelector('doPhp_mysqli_fetch_all'));
        blocks.push(blockBySelector('doPhp_mysqli_fetch_array'));
        blocks.push(blockBySelector('doPhp_mysqli_close'));
        blocks.push('-');
        blocks.push(blockBySelector('doPhpTextAssignment'));
        blocks.push(blockBySelector('doSqlSelectFrom'));
        blocks.push(blockBySelector('doSqlSelectJoin'));
        blocks.push(blockBySelector('reportSqlSelectAsExpression'));
        blocks.push(blockBySelector('reportSqlSelectFunction'));
        blocks.push(blockBySelector('doSqlSelectFromWhere'));
//blocks.push(blockBySelector('doSqlCreateTableFieldConstraint'));
        blocks.push(blockBySelector('reportSqlWhereCondition'));
        blocks.push(blockBySelector('reportSqlWhereConditionSubQuery'));
        blocks.push(blockBySelector('doSqlSelectFromOrderBy'));
        blocks.push(blockBySelector('reportSqlOrderByField'));
        blocks.push(blockBySelector('doSqlSelectFromGroupBy'));
        blocks.push(blockBySelector('doSqlSelectFromHaving'));
        blocks.push(blockBySelector('doSqlSelectFromLimit'));
        blocks.push(blockBySelector('doSqlSelectSetBagOp'));

        blocks.push('-');
        blocks.push(blockBySelector('doSqlInsert2'));
        blocks.push(blockBySelector('doSqlInsert'));        
        blocks.push(blockBySelector('doSqlDelete'));
        blocks.push(blockBySelector('doSqlUpdate'));

        blocks.push(blockBySelector('doSqlCreateDB'));
        blocks.push(blockBySelector('reportSqlCreateDBOption'));
        blocks.push(blockBySelector('doSqlCreateTable'));
        blocks.push(blockBySelector('doSqlCreateTableField'));
        blocks.push(blockBySelector('doSqlCreateTableFieldConstraint'));
        blocks.push(blockBySelector('doSqlAlter'));
        blocks.push(blockBySelector('doSqlAlterReferentialConstraint'));
//        blocks.push(blockBySelector('doSqlCreateDB2'));
//        blocks.push('=');
        blocks.push('-');
        blocks.push(blockBySelector('doPhpHtmlTable'));
        blocks.push(blockBySelector('doPhpHtmlTable2'));
        blocks.push('-');
        blocks.push(blockBySelector('doPhpForEach'));
        blocks.push(blockBySelector('doPhpTryCatch'));
        blocks.push('=');
        blocks.push(blockBySelector('doFirebaseConfig'));
        blocks.push(blockBySelector('doFirebaseScriptInit'));
        blocks.push(blockBySelector('doFirebaseImportFireStore'));
        blocks.push(blockBySelector('doFirebaseImportFireAuth'));
        blocks.push('-');
        blocks.push(blockBySelector('doFirebaseSetDoc'));
        blocks.push(blockBySelector('doFirebaseSetDoc2'));
        blocks.push(blockBySelector('doFirebaseAddDoc'));
        blocks.push(blockBySelector('doFirebaseAddDoc2'));
        blocks.push(blockBySelector('doFirebaseDataItem'));
        blocks.push(blockBySelector('doJavaSciptLet10'));
        blocks.push(blockBySelector('reportTypeSciptNewArray'));
        blocks.push(blockBySelector('reportTypeSciptNewObject'));
        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
        blocks.push(blockBySelector('doFirebaseGetDoc'));
        blocks.push(blockBySelector('reportFirebaseDocIdOrData'));
        blocks.push(blockBySelector('doFirebaseGetDocs'));
        blocks.push(blockBySelector('reportFirebaseCollection'));
        blocks.push(blockBySelector('reportFirebaseDoc'));
        blocks.push(blockBySelector('reportFirebaseQuery'));
        blocks.push(blockBySelector('reportFirebaseQueryWhere'));
        blocks.push(blockBySelector('reportFirebaseQueryConds'));
        blocks.push('-');
        //blocks.push(blockBySelector('reportSqlWhereCondition'));
        blocks.push(blockBySelector('doCallFunctionById'));
        blocks.push(blockBySelector('doGetValueById'));
        blocks.push(blockBySelector('doFirebaseAuthThen'));
        //blocks.push(blockBySelector('doFirebaseAuthSignInThen'));
        //blocks.push(blockBySelector('reportFirebaseAuthSignIn'));
        //blocks.push(blockBySelector('doFirebaseAuthCreateUser'));
        //blocks.push(blockBySelector('doFirebaseAuthCreateUserThen'));
        //blocks.push(blockBySelector('reportFirebaseAuthCreateUser'));
        //blocks.push(blockBySelector('doFirebaseSendEmailVerification'));
        blocks.push(blockBySelector('doOnAuthStateChanged'));
        blocks.push(blockBySelector('reporterMailVerified'));
        blocks.push(blockBySelector('doFirebaseSendEmailVerificationThen'));
        blocks.push(blockBySelector('doSignOut'));
        blocks.push('-');
        /*
         blocks.push(blockBySelector('doFirebaseAddFunction'));
         blocks.push(blockBySelector('doFirebaseGetFunction'));
         blocks.push(blockBySelector('doFirebaseGetByIdFunction'));
         blocks.push(blockBySelector('doFirebaseSearchFunction'));
         blocks.push(blockBySelector('doFirebaseUpdateFunction'));
         blocks.push(blockBySelector('doFirebaseDeleteFunction'));
         blocks.push(blockBySelector('doElementByIdOnClick'));
         blocks.push(blockBySelector('reportFirebaseFirestore'));
         blocks.push(blockBySelector('doFirebaseInit'));
         blocks.push(blockBySelector('doFirebaseAdd'));
         blocks.push(blockBySelector('reportFirebaseAdd'));
         blocks.push(blockBySelector('reportFirebaseGetAll'));
         blocks.push(blockBySelector('reportFirebaseGet'));
         blocks.push(blockBySelector('reportFirebaseGetId'));
         //        blocks.push(blockBySelector('reportIonicDateTimePropertyValue'));
         blocks.push(blockBySelector('doFirebaseUpdateData'));
         blocks.push(blockBySelector('reportFirebaseUpdateData'));
         blocks.push(blockBySelector('doFirebaseDeleteData'));
         blocks.push(blockBySelector('reportFirebaseDeleteData'));
         */
		blocks.push(blockBySelector('doCreateMqttClient'));
        blocks.push(blockBySelector('doConnectMqtt'));
        blocks.push(blockBySelector('doPublishMqtt'));
        blocks.push(blockBySelector('doSubscribeMqtt'));
        blocks.push(blockBySelector('doRegisterMessage'));
        //blocks.push(blockBySelector('doRegisterFunction'));
        //blocks.push(blockBySelector('doSetupMqttLastWill'));
	} else if (category === 'AR/VR') {
		
    } else if (category === 'react') {

//        blocks.push(blockBySelector('reportTwoWayBinding'));
//        blocks.push('-');
//        blocks.push(blockBySelector('reportAngularControlCommand'));
//        blocks.push('-');
//        blocks.push(blockBySelector('doAngularComponent'));
////        blocks.push(blockBySelector('reportTypeSciptNewObject'));
//        blocks.push(blockBySelector('reportAngularComponentKeyValue'));
//        blocks.push('-');
//        blocks.push(blockBySelector('reportAngularTemplateVariable'));
        //angular end

        blocks.push(blockBySelector('doHtmlReactIonic'));
        blocks.push(blockBySelector('doHtmlReact'));
        blocks.push(blockBySelector('doHtmlScript2'));
        blocks.push(blockBySelector('doReactImportJavaScriptLibs'));
//        
        blocks.push('-');
        blocks.push(blockBySelector('doReactFunction4'));
        blocks.push(blockBySelector('doReactFunction5'));
//        blocks.push(blockBySelector('doReactFunction2')); // these two functions can be use in JavaScript 
//        blocks.push(blockBySelector('doReactFunction'));
//        blocks.push(blockBySelector('reportReactConstant'));
//        blocks.push(blockBySelector('reportReactElement'));
//        
//          
        blocks.push(blockBySelector('doReactReturn'));
//        blocks.push(blockBySelector('doReactDOMRender'));
        blocks.push(blockBySelector('doReactRender'));
        blocks.push('-');
//        blocks.push(blockBySelector('reportReactEvent'));
//        blocks.push(blockBySelector('reportReactProperty'));
//        blocks.push('-');
        blocks.push(blockBySelector('doReactDOMFunction'));
        blocks.push(blockBySelector('reportReactSetState'));
//        blocks.push(blockBySelector('reportReactArrowFunction2'));
//        blocks.push(blockBySelector('reportReactArrowFunction'));
        blocks.push('-');
//        blocks.push(blockBySelector('doReactRender'));
        blocks.push(blockBySelector('doReactUseStateHooks'));
        blocks.push(blockBySelector('doReactUseEffectHooks'));
        blocks.push(blockBySelector('doReactUseEffectHook2'));
        blocks.push(blockBySelector('doReactUseContextHooks'));
        blocks.push(blockBySelector('doReactUseReducerHook'));
        blocks.push(blockBySelector('doReactUseReducerHook2'));
        blocks.push('-');
        //eric 20211208 angular start
//        blocks.push(blockBySelector('doReactSetState'));
//        blocks.push(blockBySelector('doReactSetState2'));
//        blocks.push(blockBySelector('reportReactExpression'));
//        blocks.push(blockBySelector('reportReactExpression2'));
//        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
//        blocks.push(blockBySelector('doTypeSciptLet13'))
//        blocks.push(blockBySelector('doTypeSciptLet15'));
//        blocks.push(blockBySelector('reportDomConstant'));
//        blocks.push(blockBySelector('reportDomDocumentFunction'));
// server commands and reporters
//        blocks.push(blockBySelector('reportNewClassObject'));
//        blocks.push(blockBySelector('reportClassFunction'));
//        blocks.push(blockBySelector('doClassFunction'));

//        blocks.push(blockBySelector('reportTypeSciptNewArray'));
//        blocks.push(blockBySelector('reportTypeSciptNewObject'));
//        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
//        blocks.push(blockBySelector('reportTypeSciptMultiVariables'));
//        blocks.push(blockBySelector('reportObjectProperty'));
//        blocks.push('-');


//        blocks.push(blockBySelector('doReactEventFunction'));
//        blocks.push(blockBySelector('reportTypeSciptNewArray'));
//        blocks.push(blockBySelector('reportTypeSciptNewObject'));
//        blocks.push(blockBySelector('reportTypeSciptKeyValue'));
//        blocks.push(blockBySelector('reportTypeSciptMultiVariables'));
//        blocks.push(blockBySelector('reportObjectProperty'));
////        blocks.push('-');
//
//
//
//        blocks.push(blockBySelector('reportStringInterpolation'));
//        blocks.push(blockBySelector('reportPropertyBinding'));
//        blocks.push(blockBySelector('reportEventBinding'));
        blocks.push('-'); // react
        blocks.push(blockBySelector('reportReactConstant'));
        blocks.push(blockBySelector('reportReactEvent'));
        blocks.push(blockBySelector('reportReactEvent2'));
        blocks.push(blockBySelector('reportReactProperty'));
        blocks.push(blockBySelector('reportReactDOMTag'));
        blocks.push(blockBySelector('reportReactDOMFunction'));


//        blocks.push(blockBySelector('reportStringInterpolation'));
        blocks.push(blockBySelector('reportPropertyBinding'));
        blocks.push(blockBySelector('reportEventBinding'));
        blocks.push(blockBySelector('doJavaScriptIfElse'));
        blocks.push(blockBySelector('doJavaScriptIf'));
        blocks.push(blockBySelector('doArrayBuiltInFunctionWithCallback'));

        blocks.push('-');
//        blocks.push(blockBySelector('reportReactDOMFunction'));
//        blocks.push(blockBySelector('reportReactDOMTag'));
        blocks.push(blockBySelector('doTypeSciptClass2'));
        blocks.push(blockBySelector('doReactClassMethod'));
        blocks.push(blockBySelector('doReactReturn'));
        blocks.push(blockBySelector('doReactArrowFunction'));
        blocks.push(blockBySelector('doTypeSciptExecuteFunction'));
        blocks.push(blockBySelector('doTypeSciptExecuteFunction2'));

    } else if (category === 'vue') {
        // Vue
        blocks.push(blockBySelector('doHtmlVueIonic'));
        blocks.push(blockBySelector('doHtmlVueIonic2'));
		blocks.push(blockBySelector('doVueFile'));
        blocks.push(blockBySelector('doVueFileOptions'));
//        blocks.push(blockBySelector('doVueScriptSetupAssign'));

//        blocks.push(blockBySelector('doScriptSetupExportDefulat'));
        blocks.push(blockBySelector('doVueMain'));
        blocks.push(blockBySelector('doVueMain4'));
        blocks.push(blockBySelector('doVueMain3'));

        blocks.push(blockBySelector('doVueMain2'));
        blocks.push(blockBySelector('doVueMain2A'));
        blocks.push(blockBySelector('doScriptSetupExportDefault'));

        blocks.push('-');
        // A. script setup
        // 2022/07/01 Eric doScriptSetupExportVueComponents doScriptSetupImportSFC
        blocks.push(blockBySelector('doScriptSetupExportVueComponents'));
        blocks.push(blockBySelector('doScriptSetupImportSFC'));


        blocks.push(blockBySelector('doVueTemplateTag'));           // A1

        blocks.push(blockBySelector('doVueScriptSetupAssign'));     // A2B3
        blocks.push(blockBySelector('reportTypeSciptNewObject'));
        blocks.push(blockBySelector('reportVueKeyValue'));
        blocks.push(blockBySelector('doVueSetupHook'));
        blocks.push(blockBySelector('reportTypeSciptFunction5'));
        blocks.push(blockBySelector('reportTypeSciptFunction3'));

        blocks.push('-');
        // B. setup (Compostional APIs)
        blocks.push(blockBySelector('doScriptSetupExportDefulat')); // A2B2
        blocks.push(blockBySelector('doVueSetup2'));
        blocks.push(blockBySelector('doVueSetup'));
//        blocks.push(blockBySelector('doVueSetupAssign'));
//        blocks.push(blockBySelector('reportVueKeyValue'));
        blocks.push(blockBySelector('doVueSetupReturnValues'));

        blocks.push('-');
        // C. Optional APIs
//        blocks.push(blockBySelector('doVueData')); // FCC 2022/07/28 This block is covered by doVueDataProvide
        blocks.push(blockBySelector('doVueDataProvide'));
        blocks.push(blockBySelector('doVueTemplate'));
        blocks.push(blockBySelector('doVueDataKeyValue'));
        blocks.push(blockBySelector('doVueHooks'));
        blocks.push(blockBySelector('doVueMethods')); // components, 
        blocks.push(blockBySelector('doVueMethodsFunction'));
        blocks.push(blockBySelector('doLoadVueFile'));
//        blocks.push(blockBySelector('reportVueFile'));






        blocks.push('-');

//        blocks.push(blockBySelector('doLoadVueFile'));
        blocks.push(blockBySelector('reportVueDirective'));
        blocks.push(blockBySelector('reportVueDirective2'));
        blocks.push(blockBySelector('reportVueHtmlEvent'));

        blocks.push(blockBySelector('reportStringInterpolation'));
        blocks.push(blockBySelector('reportVueObjectProperty'));

        blocks.push('-');
        // store
        blocks.push(blockBySelector('doVuexStore'));
        blocks.push(blockBySelector('doVuexStoreFunction'));
        blocks.push(blockBySelector('doVuexFunctionCall'));
        // routers
        blocks.push(blockBySelector('doVueRouterItem'));
		blocks.push(blockBySelector('doVueRouterPathAndComponent'));
        blocks.push(blockBySelector('doVueRouterRoute'));
        blocks.push(blockBySelector('doTypeSciptNewObject'));
        blocks.push(blockBySelector('doVueRouterRouteItem'));
        blocks.push(blockBySelector('reportVueFile'));
        blocks.push('-');
        // Vue HTML and CSS
        blocks.push(blockBySelector('doVueHTML5RouterLink'));
        blocks.push(blockBySelector('reportVueHTML5RouterLinkProperty'));
//        blocks.push(blockBySelector('reportVueHTML5RouterLinkProperty'));

        blocks.push(blockBySelector('doVueCSS'));
    } else if (category === 'cordova') {

        blocks.push(blockBySelector('reportCordovaFunction'));
        blocks.push(blockBySelector('doCordovaFunction1'));
        blocks.push(blockBySelector('doCordovaFunction2'));
        blocks.push(blockBySelector('doCordovaCalllBackFunction1'));
        blocks.push(blockBySelector('doCordovaCalllBackFunction2'));
        blocks.push(blockBySelector('reportCameraOptions'));
        blocks.push(blockBySelector('doBatteryEvent'));
        blocks.push(blockBySelector('reportCordovaProperty'));
        blocks.push(blockBySelector('doCordovaDomDocumentFunction'));


    } else if (category === 'ionic') {
        blocks.push(blockBySelector('doHtmlIonic'));
//        blocks.push(blockBySelector('doIonicImportJavaScriptLibs'));
        blocks.push(blockBySelector('doIonicControl'));
        blocks.push(blockBySelector('doIonicControl2'));
        blocks.push(blockBySelector('reportHtmlJoin'))
        blocks.push(blockBySelector('reportIonicEvent'));
        blocks.push(blockBySelector('reportColor'));
        blocks.push('-');
        // property = value
        blocks.push(blockBySelector('reportIonicButtonPropertyValue'));
        blocks.push(blockBySelector('reportIonicIconPropertyValue'));
        blocks.push(blockBySelector('reportIonicDateTimePropertyValue'));
        blocks.push(blockBySelector('reportIonicInputPropertyValue'));
        blocks.push(blockBySelector('reportIonicProgressPropertyValue'));
        blocks.push(blockBySelector('reportIonicTextPropertyValue'));
        blocks.push('-');
        blocks.push(blockBySelector('reportIonicTextAlignment'));
        blocks.push(blockBySelector('reportIonicFloatElements'));
        blocks.push(blockBySelector('reportIonicHide'));
        blocks.push(blockBySelector('reportPaddingOrMargin'));
        blocks.push(blockBySelector('reportFlexContainer'));
        blocks.push(blockBySelector('doIonicImportController'));
        blocks.push(blockBySelector('doWindowController'));
        blocks.push(blockBySelector('doCreatIonicController'));
        blocks.push(blockBySelector('doIonicControllerPresent'));
        blocks.push('-');
        blocks.push(blockBySelector('doIonicAppHeaderContentFooter'));
        blocks.push(blockBySelector('doIonicHeaderBar'));
        blocks.push(blockBySelector('doIonicHeaderBarItem'));
        blocks.push(blockBySelector('doIonicHeaderNav'));
        blocks.push(blockBySelector('doIonicHeaderNavLabelItem'));
        blocks.push(blockBySelector('doIonicFlashBar'));
        blocks.push(blockBySelector('doIonicFlashBarItem'));
        blocks.push(blockBySelector('doIonicFlashBarChange'));
        blocks.push(blockBySelector('doIonicBanner'));
        blocks.push(blockBySelector('doIonicBannerItem'));
        blocks.push(blockBySelector('doIonicBannerChange'));
        blocks.push('-');
        blocks.push(blockBySelector('doIonicInfoList'));
        blocks.push(blockBySelector('doIonicInfoListItem'));
        blocks.push(blockBySelector('doIonicInfoListItem2'));
        blocks.push('=');
        blocks.push(blockBySelector('doIonicContainer'));
        blocks.push(blockBySelector('reportIonicContentPropertyValue'));
        blocks.push(blockBySelector('doIonicCard'));
        blocks.push(blockBySelector('doIonicCardHeaderContent'));
        blocks.push(blockBySelector('reportIonicCardPropertyValue'));
        blocks.push(blockBySelector('doIonicChip'));
        blocks.push(blockBySelector('reportIonicChipPropertyValue'));
        blocks.push(blockBySelector('doIonicFloatingActionButton'));
        blocks.push(blockBySelector('reportIonicFabPropertyValue'));
        blocks.push(blockBySelector('doIonicGrid'));
        blocks.push(blockBySelector('doColDefaults'));
        blocks.push(blockBySelector('reportIonicGridPropertyValue'));
        blocks.push(blockBySelector('doIonicInfiniteScroll'));
        blocks.push(blockBySelector('reportIonicInfiniteScrollPropertyValue'));
        blocks.push(blockBySelector('doIonicItem'));
        blocks.push(blockBySelector('reportIonicItemPropertyValue'));
        blocks.push(blockBySelector('doIonicList'));
        blocks.push(blockBySelector('reportIonicListPropertyValue'));
        blocks.push(blockBySelector('doIonicMedia'));
        blocks.push(blockBySelector('doIonicMenu'));
        blocks.push(blockBySelector('reportIonicMenuPropertyValue'));
        blocks.push(blockBySelector('doIonicReorder'));
        blocks.push(blockBySelector('doIonicRouter'));
        blocks.push(blockBySelector('doIonicSegmentButton'));
        blocks.push(blockBySelector('reportIonicSegmentPropertyValue'));
        blocks.push(blockBySelector('doIonicSelect'));
        blocks.push(blockBySelector('reportIonicSelectPropertyValue'));
        blocks.push(blockBySelector('doIonicSlides'));
        blocks.push(blockBySelector('reportIonicSlidesPropertyValue'));
        blocks.push(blockBySelector('doIonicTabs'));
        blocks.push(blockBySelector('reportIonicTabsPropertyValue'));
        blocks.push(blockBySelector('doIonicToolbar'));
        blocks.push(blockBySelector('reportIonicToolbarPropertyValue'));
    } else if (category === 'looks') {
        blocks.push(blockBySelector('doChartImport'));
        blocks.push(blockBySelector('doChartHtml'));
        blocks.push(blockBySelector('doChartSetID'));
        blocks.push(blockBySelector('doChartConfig1'));
        blocks.push(blockBySelector('doChartConfig2'));
        blocks.push(blockBySelector('reportChartData'));
        blocks.push(blockBySelector('reportChartData2'));
        blocks.push(blockBySelector('reportChartItem'));
        blocks.push(blockBySelector('reportChartItem2'));
        blocks.push(blockBySelector('doChartInit'));
    }
    return blocks;
}
var code = '';
var download_ide = '';
WatcherMorph.prototype.codeMenu = WatcherMorph.prototype.userMenu;
//CellMorph

WatcherMorph.prototype.download = function (ide) {
    var codetext = code;
    //var ide = this.parentThatIsA(IDE_Morph);
    ide.saveFileAs(
            codetext,
            'text/html',
            ide.projectName // variable name
            );
}

WatcherMorph.prototype.showCode = function () {
    var codetext = code;
    var htmlText = '<pre><code>' + codetext + '</code></pre>';
    htmlWindow = window.open("", "htmlwindow", "toolbar=no, menubar=no, width=360 , height=640 ");
    try {
        htmlWindow.document.write(htmlText);
    } catch (e) {
    }
    htmlWindow.document.close();
    // newWindow.document.close();
}

var costumes = null;
var runtype = '';
var htmlWindow;
var demoWindow;
var ionicWindow;
var htmlWindowFirst = true;
var ionicWindowFirst = true;
WatcherMorph.prototype.run = function (ide, type) {
    var codetext = code;
    var arr = ide.sprites.asArray()[0];
    costumes = arr.costumes.contents;
    var imageHashmap = {};
    for (var i = 0; i < costumes.length; i++) {
        var costume = costumes[i];
        costume.namelength = costume.name.length;
    }
    costumes.sort(function (a, b) {
        return (b.namelength - a.namelength)
    });
    for (var i = 0; i < costumes.length; i++) {
        var costume = costumes[i];
        var img = costume.contents.toDataURL();
        var name = costume.name;
        codetext = codetext.replace(new RegExp('img/' + costume.name + '.png', 'g'), img).replace(new RegExp(costume.name + '.png', 'g'), img);
        //imageHashmap[name+'.png']=img;
    }
    codetext = codetext.replace(new RegExp("'", 'g'), '&apos;');
//	var costume = arr.costumes.contents[0];
//	var image = costume.contents.toDataURL();
    runtype = type;
    var htmlCode = '';
    if (type == 'ionic') {
        htmlCode = '<!doctype html>' +
                '<html lang="en">' +
                '<head>' +
                '<meta charset="utf-8">' +
                '<title>IonicTest</title>' +
                '<script type="module" src="https://iot.ttu.edu.tw:9999/ionic/ionic.esm.js"></script>' +
                '<script nomodule src="https://iot.ttu.edu.tw:9999/ionic/ionic.js"></script>' +
                '<link rel="stylesheet" href="https://iot.ttu.edu.tw:9999/ionic/ionic.bundle.css"/>' +
                '<style>' +
                'body,' +
                'html {' +
                'height: 100%;' +
                'margin: 0;' +
                '}' +
                '</style>' +
                '</head>' +
                '<body>' +
                '<ion-app>' +
                codetext +
                '</ion-app>' +
                '</body>' +
                '</html>';
    } else if (type == 'html', type) {
        htmlCode = codetext;
    }
    htmlText = WatcherMorph.prototype.setCode(htmlCode, type);
    if (type == 'ionic') {
        ionicWindow = window.open("", "ionicwindow", "toolbar=no, menubar=no");
        try {
            ionicWindow.document.write(htmlText);
            //const doc = <HTMLIFrameElement> ionicWindow.document.getElementsById('phoneframe')[0];
            //doc.
        } catch (e) {
        }
        ionicWindow.document.close();
    } else {
        htmlWindow = window.open("", "htmlwindow", "toolbar=no, menubar=no");
        try {
            htmlWindow.document.write(htmlText);
            //const doc = <HTMLIFrameElement> ionicWindow.document.getElementsById('phoneframe')[0];
            //doc.
        } catch (e) {
        }
        htmlWindow.document.close();
    }

}

WatcherMorph.prototype.setCode = function (htmlCode, type) {
    var htmlText =
            '<link rel="stylesheet" href="websrc/devices.min.css" type="text/css"/>' +
            '<script>' +
            'var oldselect = "Window";' +
            'var devices = ["iphone-x","iphone11","iphone12","iphone12mini","iphone12max","googlepixel","googlepixel2","iphone8","iphone8plus","iphone5s","iphone5c","ipad","SamsungGalaxyS5","nexus5","iphone5s","note8","htc-one","Window"];' +
            'function changeSize(){' +
            'let selectDevice = document.getElementById("selectPhone").value;' +
            'let oldselectView = document.getElementById(oldselect+"s");' +
            'let phoneframe = document.getElementById("phoneframe");' +
            'while (oldselectView.firstChild) {' +
            '    oldselectView.removeChild(oldselectView.lastChild);' +
            '}' +
            'document.getElementById(selectDevice+"s").appendChild(phoneframe);' +
            'for(let i =0;i<devices.length;i++){' +
            '    let device =  devices[i];' +
            '    let deviceView = document.getElementById(device);' +
            ' 	 if(device==selectDevice){' +
            ' 	 	deviceView.style.display="block";' +
            '		deviceView.style.visibility ="visible";' +
            '	}else{' +
            '		deviceView.style.display="none";' +
            '		deviceView.style.visibility ="hidden";' +
            '	}' +
            '}' +
            'oldselect = selectDevice;' +
            'localStorage.setItem("selectPhone", selectDevice);' +
            'reIframeSize();' +
            '}' +
            'function showcode(){' +
            'var codepane = document.getElementById("codepane");' +
            'var left = document.getElementById("left");' +
            'var right = document.getElementById("right");' +
            'var codepane = document.getElementById("codepane");' +
            'if(codepane.style.visibility == "hidden"){' +
            '    codepane.style.visibility ="visible";' +
            '    left.style.width ="60%";' +
            '    right.style.width ="40%";' +
            '    document.getElementById("codebutton").innerText = "隱藏程式碼";' +
            '}else{' +
            '    codepane.style.visibility ="hidden";' +
            '    left.style.width ="100%";' +
            '    right.style.width ="0%";' +
            '    document.getElementById("codebutton").innerText = "顯示程式碼";' +
            '}' +
            '}' +
            'function reIframeSize(){' +
            'var phoneframe = document.getElementById("phoneframe");' +
            'var windowlayout = document.getElementById("windowlayout");' +
//			'phoneframe.contentWindow.location.reload(true);' +
            'windowlayout.innerHTML = phoneframe.clientWidth +" x "+ phoneframe.clientHeight;' +
            'if(textList.length==0){' +
            '	var code = document.getElementById("code");' +
            '	textList.push(code.value);' +
            //'	 var iwidth = parseInt(document.body.clientWidth, 10);' +
            //'    document.getElementById("phoneframe").width=  "100%";' +
            //'    document.getElementById("phoneframe").height= document.body.clientHeight;' +
            //'    console.log(document.getElementById("phoneframe").width);' +
            //'    console.log(document.getElementById("phoneframe").height);' +
            '}' +
            '}' +
            'window.onresize=reIframeSize;' +
            'function runcode(){' +
            //'console.log(opener.parentPara);'+
            'var code = document.getElementById("code").value;' +
            'var costumes = opener.costumes;' +
            'var imageHashmap = {};' +
            'for (var i = 0; i < costumes.length; i++) {' +
            'var costume = costumes[i];' +
            'var img = costume.contents.toDataURL();' +
            'var name = costume.name;' +
            'code = code.replace(new RegExp("../../assets/img/" + costume.name + ".png", "g"), img).replace(new RegExp(costume.name + ".png", "g"), img);' +
            '}' +
            //'codetext =  codetext.replace(new RegExp("'", "g"), "&#8217");' +
            'var type=opener.runtype;' +
            'var htmlCode = "";' +
            'if(type == "ionic" ){' +
            'var htmlCode = "<!doctype html>" +' +
            '"<html lang=\\"en\\">" +' +
            '"<head>" +' +
            '"<meta charset=\\"utf-8\\">" +' +
            '"<title>IonicTest</title>" +' +
            '"<script type=\\"module\\" src=\\"https://iot.ttu.edu.tw:9999/ionic/ionic.esm.js\\"><\\/script>" +' +
            '"<script nomodule src=\\"https://iot.ttu.edu.tw:9999/ionic/ionic.js\\"><\\/script>" +' +
            '"<link rel=\\"stylesheet\\" href=\\"https://iot.ttu.edu.tw:9999/ionic/ionic.bundle.css\\"/>" +' +
            '"<style>" +' +
            '"body," +' +
            '"html {" +' +
            '"height: 100%;" +' +
            '"margin: 0;" +' +
            '"}" +' +
            '"</style>" +' +
            '"</head>" +' +
            '"<body>" +' +
            '"<ion-app>" +' +
            'code +' +
            '"</ion-app>" +' +
            '"</body>" +' +
            '"</html>";' +
            '}else if(type == "html"){' +
            'htmlCode = code' +
            '}' +
            'document.getElementById("phoneframe").srcdoc = htmlCode;' +
            '}' +
            'function changeTextSize(){' +
            'var textSize = document.getElementById("text-size").value;' +
            'var textarea = document.getElementById("code");' +
            'textarea.style.fontSize = textSize+"px";' +
            'localStorage.setItem("text-size", textSize);' +
            '}' +
            'var step = 0;' +
            'var textList = new Array();' +
            'function textWrite(){' +
            '	var code = document.getElementById("code");' +
            '	var undo = document.getElementById("undo1");' +
            '	var redo = document.getElementById("redo1");' +
            '	while (textList.length-1!=step) {' +
            '		if(textList.length-1>step){' +
            '			textList.pop();' +
            '		}else{' +
            '			step = textList.length-1;' +
            '		}' +
            '	}' +
            '	step++; ' +
            '	textList.push(code.value);' +
            '	if(undo.disabled == true){' +
            '		undo.disabled = false;' +
            '	}' +
            '	if(redo.disabled == false){' +
            '		redo.disabled = true;' +
            '	}' +
            '}' +
            'function undo1(){' +
            '	var code = document.getElementById("code");' +
            '	var undo = document.getElementById("undo1");' +
            '	var redo = document.getElementById("redo1");' +
            '	step--;' +
            '	code.value = textList[step];' +
            '	if(redo.disabled == true){' +
            '		redo.disabled = false;' +
            '	}' +
            '	if(step < 1){' +
            '		undo.disabled = true;' +
            '	}' +
            '}' +
            'function redo1(){' +
            '	var code = document.getElementById("code");' +
            '	var undo = document.getElementById("undo1");' +
            '	var redo = document.getElementById("redo1");' +
            '	step++;' +
            '	code.value = textList[step];' +
            '	if(undo.disabled == true){' +
            '		undo.disabled = false;' +
            '	}' +
            '	if(step >= textList.length - 1){' +
            '		redo.disabled = true;' +
            '	}' +
            '}' +
            'function clear1(){' +
            '	var code = document.getElementById("code");' +
            '	var undo = document.getElementById("undo1");' +
            '	var redo = document.getElementById("redo1");' +
            '   if(code.value != ""){' +
            '	  while (textList.length-1!=step) {' +
            '		if(textList.length-1>step){' +
            '			textList.pop();' +
            '		}else{' +
            '			step = textList.length-1;' +
            '		}' +
            '	  }' +
            '	  step++;' +
            '	  code.value = "";' +
            '	  textList.push(code.value);' +
            '	  if(undo.disabled == true){' +
            '		   undo.disabled = false;' +
            '	  }' +
            '	  if(redo.disabled == false){' +
            '		  redo.disabled = true;' +
            '	  }' +
            '	}' +
            '}' +
            '</script>' +
            '<style>' +
            '.split { ' +
            'height: 100%; ' +
            'position: fixed; ' +
            'z-index: 1; ' +
            'overflow-x: hidden; ' +
            'top: 0; ' +
            '} ' +
            '.left { ' +
            'left: 0;  ' +
            'width: 60%;  ' +
            '}  ' +
            '.right {  ' +
            'right: 0;  ' +
            'width: 40%;  ' +
            '}  ' +
            '</style>' +
            '<body>' +
            '	<div class="split right" id="right">' +
            '     <div id = "codepane">' +
            '        <p style="position:absolute; left:60px; top:25px;">Code</p>' +
            '        <button style="position:absolute; top:40px; left:20px;" onclick="runcode()">run</button>' +
            '		 <select id="text-size" style="position:absolute; top:40px; left:110px;" onchange="changeTextSize()">' +
            ' 		 	<option value="14">14</option>' +
            ' 			<option value="16">16</option>' +
            ' 			<option value="18">18</option>' +
            ' 			<option value="20">20</option>' +
            ' 			<option value="24">24</option>' +
            ' 			<option value="28">28</option>' +
            ' 			<option value="36">36</option>' +
            ' 		 </select>' +
            '		 <button id ="undo1" style="position:absolute; top:40px; left:180px;" disabled onclick="undo1()">Undo</button>' +
            '		 <button id ="redo1" style="position:absolute; top:40px; left:240px;" disabled onclick="redo1()">Redo</button>' +
            '		 <button id ="clear" style="position:absolute; top:40px; left:300px;" onclick="clear1()">Clear</button>' +
            '        <textarea id="code" oninput="textWrite()" style="position:absolute;left:20px;top:75px; width: calc(90%); height: calc(75%);">' + code.replace('</textarea>', '&lt;/textarea&gt;') + '</textarea>' +
            '     </div>' +
            '   </div>' +
            '	<div class="split left" id="left">' +
            '	  <div>' +
            '       <p style = "margin-bottom:-10px;margin-left:5px;margin-top:0px;">html/ionic run</p>' +
            '	    <div style = "display : inline-block;margin-left:5px;">' +
            '	    	<select id="selectPhone" onchange="changeSize()">' +
            '	     		<option value="iphone-x">iPhone X/XS/11 Pro</option>' +
            '	     		<option value="iphone11">iPhone 11/XR</option>' +
            '	     		<option value="iphone12">iPhone 12/12 Pro</option>' +
            '	     		<option value="iphone12mini">iPhone 12 Mini</option>' +
            '	     		<option value="iphone12max">iPhone 12 Pro Max</option>' +
            '		    	<option value="iphone8plus">iPhone 6/7/8 Plus</option>' +
            '		    	<option value="iphone8">iPhone 6/7/8</option>' +
            '		    	<option value="iphone5s">iPhone 5s</option>' +
            '		    	<option value="iphone5c">iPhone 5c</option>' +
            '		    	<option value="ipad">ipad</option>' +
            '		    	<option value="googlepixel">Android(Google Pixel)</option>' +
            '		    	<option value="googlepixel2">Android(Google Pixel 2)</option>' +
            '		    	<option value="SamsungGalaxyS5">Android(Galaxy S5)</option>' +
            '		    	<option value="nexus5">Android(nexus5)</option>' +
            '		    	<option value="note8">Android(note8)</option>' +
            '		    	<option value="htc-one">Android(htc-one)</option>' +
            '		    	<option value="Window">Window</option>' +
            '	    	</select>' +
            '	    </div>' +
            '   	<div style = "display : inline-block">' +
            '		    <button id = "codebutton" style="" onclick="showcode()">隱藏程式碼</button>' +
            '	    </div>' +
            '   	<div style = "display : inline-block">' +
            '		    <p id = "windowlayout" ></p>' +
            '	    </div>' +
            '     </div>' +
            '	  <div >' +
            '		<div class="marvel-device iphone-x" id="iphone-x">' +
            '			<div class="notch">' +
            '				<div class="camera"></div>' +
            '				<div class="speaker"></div>' +
            '			</div>' +
            '			<div class="top-bar"></div>' +
            '			<div class="sleep"></div>' +
            '			<div class="bottom-bar"></div>' +
            '			<div class="volume"></div>' +
            '			<div class="overflow">' +
            '			<div class="shadow shadow--tr"></div>' +
            '			<div class="shadow shadow--tl"></div>' +
            '			<div class="shadow shadow--br"></div>' +
            '			<div class="shadow shadow--bl"></div>' +
            '	    </div>' +
            '	    <div class="inner-shadow"></div>' +
            '       <div class="screen" id="iphone-xs">' +
            '	    </div>' +
            '	  </div>' +
            '		<div class="marvel-device iphone11" id="iphone11">' +
            '			<div class="notch">' +
            '				<div class="camera"></div>' +
            '				<div class="speaker"></div>' +
            '			</div>' +
            '			<div class="top-bar"></div>' +
            '			<div class="sleep"></div>' +
            '			<div class="bottom-bar"></div>' +
            '			<div class="volume"></div>' +
            '			<div class="overflow">' +
            '			<div class="shadow shadow--tr"></div>' +
            '			<div class="shadow shadow--tl"></div>' +
            '			<div class="shadow shadow--br"></div>' +
            '			<div class="shadow shadow--bl"></div>' +
            '	    </div>' +
            '	    <div class="inner-shadow"></div>' +
            '       <div class="screen" id="iphone11s">' +
            '	    </div>' +
            '	  </div>' +
            '		<div class="marvel-device iphone12" id="iphone12">' +
            '			<div class="notch">' +
            '				<div class="camera"></div>' +
            '				<div class="speaker"></div>' +
            '			</div>' +
            '			<div class="top-bar"></div>' +
            '			<div class="sleep"></div>' +
            '			<div class="bottom-bar"></div>' +
            '			<div class="volume"></div>' +
            '			<div class="overflow">' +
            '			<div class="shadow shadow--tr"></div>' +
            '			<div class="shadow shadow--tl"></div>' +
            '			<div class="shadow shadow--br"></div>' +
            '			<div class="shadow shadow--bl"></div>' +
            '	    </div>' +
            '	    <div class="inner-shadow"></div>' +
            '       <div class="screen" id="iphone12s">' +
            '	    </div>' +
            '	  </div>' +
            '		<div class="marvel-device iphone12mini" id="iphone12mini">' +
            '			<div class="notch">' +
            '				<div class="camera"></div>' +
            '				<div class="speaker"></div>' +
            '			</div>' +
            '			<div class="top-bar"></div>' +
            '			<div class="sleep"></div>' +
            '			<div class="bottom-bar"></div>' +
            '			<div class="volume"></div>' +
            '			<div class="overflow">' +
            '			<div class="shadow shadow--tr"></div>' +
            '			<div class="shadow shadow--tl"></div>' +
            '			<div class="shadow shadow--br"></div>' +
            '			<div class="shadow shadow--bl"></div>' +
            '	    </div>' +
            '	    <div class="inner-shadow"></div>' +
            '       <div class="screen" id="iphone12minis">' +
            '	    </div>' +
            '	  </div>' +
            '		<div class="marvel-device iphone12max" id="iphone12max">' +
            '			<div class="notch">' +
            '				<div class="camera"></div>' +
            '				<div class="speaker"></div>' +
            '			</div>' +
            '			<div class="top-bar"></div>' +
            '			<div class="sleep"></div>' +
            '			<div class="bottom-bar"></div>' +
            '			<div class="volume"></div>' +
            '			<div class="overflow">' +
            '			<div class="shadow shadow--tr"></div>' +
            '			<div class="shadow shadow--tl"></div>' +
            '			<div class="shadow shadow--br"></div>' +
            '			<div class="shadow shadow--bl"></div>' +
            '	    </div>' +
            '	    <div class="inner-shadow"></div>' +
            '       <div class="screen" id="iphone12maxs">' +
            '	    </div>' +
            '	  </div>' +
            '	  <div class="marvel-device iphone8 " id="iphone8">' +
            '		<div class="top-bar"></div>' +
            '		<div class="sleep"></div>' +
            '		<div class="volume"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="sensor"></div>' +
            '		<div class="speaker"></div>' +
            '		<div class="screen" id="iphone8s">' +
            '	    </div>' +
            '	    <div class="home"></div>' +
            '		<div class="bottom-bar"></div>' +
            '	  </div>' +
            '	  <div class="marvel-device iphone8plus " id="iphone8plus">' +
            '		<div class="top-bar"></div>' +
            '		<div class="sleep"></div>' +
            '		<div class="volume"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="sensor"></div>' +
            '		<div class="speaker"></div>' +
            '		<div class="screen" id="iphone8pluss">' +
            '		</div>' +
            '	  	<div class="home"></div>' +
            '	    <div class="bottom-bar"></div>' +
            '	  </div>' +
            '	  <div class="marvel-device iphone5s" id="iphone5s">' +
            '		<div class="top-bar"></div>' +
            '		<div class="sleep"></div>' +
            '		<div class="volume"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="sensor"></div>' +
            '		<div class="speaker"></div>' +
            '		<div class="screen" id="iphone5ss">' +
            '		</div>' +
            '		<div class="home"></div>' +
            '		<div class="bottom-bar"></div>' +
            '	  </div>' +
            '	  <div class="marvel-device iphone5c" id="iphone5c">' +
            '		<div class="top-bar"></div>' +
            '		<div class="sleep"></div>' +
            '		<div class="volume"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="sensor"></div>' +
            '		<div class="speaker"></div>' +
            '		<div class="screen" id="iphone5cs">' +
            '		</div>' +
            '		<div class="home"></div>' +
            '		<div class="bottom-bar"></div>' +
            '	  </div>' +
            '	  <div class="marvel-device ipad" id="ipad">' +
            '		<div class="camera"></div>' +
            '		<div class="screen" id="ipads">' +
            '		</div>' +
            '		<div class="home"></div>' +
            '	  </div>' +
            '	  <div class="marvel-device s5" id="SamsungGalaxyS5">' +
            '		<div class="top-bar"></div>' +
            '		<div class="sleep"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="sensor"></div>' +
            '		<div class="speaker"></div>' +
            '		<div class="screen" id="SamsungGalaxyS5s">' +
            '		</div>' +
            '		<div class="home"></div>' +
            '	  </div>' +
            '	  <div class="device device-google-pixel-2-xl" id="googlepixel2" >' +
            '			<div class="device-frame" id="googlepixel2s">' +
            '			</div>' +
            '			<div class="device-stripe"></div>' +
            '			<div class="device-header"></div>' +
            '			<div class="device-sensors"></div>' +
            '			<div class="device-btns"></div>' +
            '			<div class="device-power"></div>' +
            '	  </div>' +
            '	  <div class="device device-google-pixel" id="googlepixel" >' +
            '			<div class="device-frame" id="googlepixels">' +
            '			</div>' +
            '			<div class="device-stripe"></div>' +
            '			<div class="device-header"></div>' +
            '			<div class="device-sensors"></div>' +
            '			<div class="device-btns"></div>' +
            '			<div class="device-power"></div>' +
            '	  </div>' +
            '	  <div class="marvel-device nexus5" id="nexus5">' +
            '		<div class="top-bar"></div>' +
            '		<div class="sleep"></div>' +
            '		<div class="volume"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="screen" id="nexus5s">' +
            '		</div>' +
            '	  </div>' +
            '	  <div class="marvel-device note8" id="note8">' +
            '		<div class="inner"></div>' +
            '		<div class="overflow">' +
            '			<div class="shadow"></div>' +
            '		</div>' +
            '		<div class="speaker"></div>' +
            '		<div class="sensors"></div>' +
            '		<div class="more-sensors"></div>' +
            '		<div class="sleep"></div>' +
            '		<div class="volume"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="screen" id="note8s">' +
            '		</div>' +
            '	  </div>' +
            '	  <div class="marvel-device htc-one" id="htc-one">' +
            '		<div class="top-bar"></div>' +
            '		<div class="camera"></div>' +
            '		<div class="sensor"></div>' +
            '		<div class="speaker"></div>' +
            '		<div class="screen" id="htc-ones">' +
            '		</div>' +
            '	  </div>' +
            '	  <div style="width:100%;border:none;height:100%" id="Window">' +
            '		<div class="screen" id="Windows">' +
            '		<iframe id="phoneframe" style="width:100%;border:none;height:100%" srcdoc=\'' + htmlCode + '\'></iframe>' +
            '		</div>' +
            '	  </div>' +
            '</div>' +
//          '		  <iframe id="phoneframe" width="375px" height="812px" style="position:absolute;left:30;top:60;" srcdoc=\'' + htmlCode + '\'></iframe>' +
//          '		  <img  id="phoneImg" width="435px" height="872px" src="Costumes/iphone.png"  style="position:absolute; pointer-events: none;">' +			
            '	</div>' +
            '<script>' +
            'var selectPhone = document.getElementById("selectPhone");' +
            'var lastSelectedPhone = localStorage.getItem("selectPhone");' +
            'if(lastSelectedPhone) {' +
            '   let existPhone = false;' +
            '	for(let i =0;i<devices.length;i++){' +
            '    	let device =  devices[i];' +
            ' 	 	if(device==lastSelectedPhone){' +
            ' 	 	    existPhone = true;' +
            '		}' +
            '	}' +
            ' 	if(!existPhone){' +
            ' 	    lastSelectedPhone="iphone-x";' +
            '	}' +
            '   selectPhone.value = lastSelectedPhone; ' +
            '}' +
            'changeSize();' +
            'var selectText = document.getElementById("text-size");' +
            'var lastSelectedText = localStorage.getItem("text-size");' +
            'if(lastSelectedText) {' +
            '    selectText.value = lastSelectedText; ' +
            '	 changeTextSize();' +
            '}' +
            '</script>' +
            '</body>';
    if (type == 'ionic') {
        htmlText = htmlText.replace('>html/ionic run<', '>ionic run<')
        htmlText = htmlText.replace('var type=opener.runtype;', 'var type="ionic";')
    } else {
        htmlText = htmlText.replace('>html/ionic run<', '>html run<')
        htmlText = htmlText.replace('var type=opener.runtype;', 'var type="html";')
    }
    return htmlText;
}

WatcherMorph.prototype.userMenu = function () {
    menu = this.codeMenu();
    menu.addLine();
    var myself = this;
    var on = '\u25CF',
            off = '\u25CB';
    menu.addItem((autodemo ? on : off) + ' ' + localize('Html Auto demo'), function () {
        autodemo = !autodemo;
    });
    menu.addLine();
    menu.addItem('export html file...', function () {
//    	var ide = myself.parentThatIsA(IDE_Morph);
//        // File operations
//        var fs = require('fs');
//        ////Or Returns only path. For multi platform.
//        var path = require('path');
//        var only_path = path.dirname(process.execPath) + path.sep;
//
//        var file_path = only_path + myself.getter +'.lua';
//        var file_path = only_path + 'code\\' + ide.projectName + '.lua';
//        var content = myself.currentValue.toString();
//        // Write to file, read file back in, write contents to DOM
////
////        fs.exists(file_path, function (exists) {
////            if (exists) {
////                var r = confirm(ide.projectName + '.lua '+"is about to overwrite the existing one in IoT IDE");
////                if (r == true) {
////                    fs.writeFile(file_path, content, function (err) {
////                    if (err) {
////                        alert(err);
////                    } else {
////
////                    }
////                });
////                } else {
////                    
////                }
//////                alert('File is exist');
////            } else {
////                fs.writeFile(file_path, content, function (err) {
////                    if (err) {
////                        alert(err);
////                    } else {
//////                        alert(ide.projectName + '.lua '+'is exported to IoT IDE');
////                    }
////                });
////            }
////        });
//
//        fs.writeFile(file_path, content, function (err) {
//            if (err) {
//                alert(err);
//            } else {
//                ide.showMessage(file_path + ' File successfully written.',3)
////                alertify.log(file_path + '\nFile successfully written.')
////                alert(file_path + 'File successfully written.');//
//           }
//        });

        var ide = myself.parentThatIsA(IDE_Morph);
        ide.saveFileAs(
                myself.currentValue.toString(),
                'text/html',
                ide.currentSprite.name //ide.projectName // variable name//
                );
    });
    menu.addItem('export html-php file...', function () {


        var ide = myself.parentThatIsA(IDE_Morph);
        ide.saveFileAs(
                myself.currentValue.toString(),
                'text/php',
                ide.currentSprite.name //ide.projectName // variable name
                );
    });
    menu.addItem('export ionic html file...', function () {
        var codetext = myself.currentValue.toString()


        var htmlText = '<!doctype html>\n' +
                '<html lang="en">\n' +
                '	<head>\n' +
                '		<meta charset="utf-8">\n' +
                '		<title>IonicTest</title>\n' +
                '		<script type="module" src="https://iot.ttu.edu.tw:9999/ionic/ionic.esm.js"></script>\n' +
                '		<script nomodule src="https://iot.ttu.edu.tw:9999/ionic/ionic.js"></script>\n' +
                '		<link rel="stylesheet" href="https://iot.ttu.edu.tw:9999/ionic/ionic.bundle.css"/>\n' +
                '		<style>\n' +
                '			body, html {\n' +
                '				height: 100%;\n' +
                '				margin: 0;\n' +
                '			}\n' +
                '		</style>\n' +
                '	</head>\n' +
                '	<body>\n' +
                '		' +
                codetext +
                '\n' +
                '	</body>\n' +
                '</html>\n';
        var ide = myself.parentThatIsA(IDE_Morph);
        ide.saveFileAs(
                htmlText,
                'text/html',
                ide.currentSprite.name //ide.projectName // variable name
                );
    });
    menu.addItem('export JavaScript file...', function () {


        var ide = myself.parentThatIsA(IDE_Morph);
        ide.saveFileAs(
                myself.currentValue.toString(),
                'text/js',
                ide.currentSprite.name //ide.projectName // variable name
                );
    });
    menu.addItem('export vue file...', function () {


        var ide = myself.parentThatIsA(IDE_Morph);
        ide.saveFileAs(
                myself.currentValue.toString(),
                'text/vue',
                ide.currentSprite.name //ide.projectName // variable name
                );
    });
    menu.addItem('export CSS file...', function () {


        var ide = myself.parentThatIsA(IDE_Morph);
        ide.saveFileAs(
                myself.currentValue.toString(),
                'text/css',
                ide.currentSprite.name //ide.projectName // variable name
                );
    });
    menu.addLine();

    menu.addItem('App simulator (Android & iOS): scan QR code', function () {
        var ide = myself.parentThatIsA(IDE_Morph);

        var arr = ide.sprites.asArray()[0];
        var data = [];
        for (var i = 0; i < ide.sprites.contents.length; i++) {
            const key = ide.sprites.contents[i].name;
            let codetext2 = fileListData[key];
            const type = fileListType[key];
            //console.log('key = ' + key + '.' + type);
            // console.log('codetext = ' + codetext2);
            //codetext = btoa(unescape(encodeURIComponent(codetext)));               
            let item = {name: key, type: type, code: codetext2};
            data.push(item);
        }

        var costumes = arr.costumes.contents;
        for (var i = 0; i < costumes.length; i++) {
            var costume = costumes[i];
            var img = costume.contents.toDataURL();
            var name = costume.name;
            let item = {name: name, type: 'png', code: img};
            data.push(item);
        }

        var codetext = btoa(unescape(encodeURIComponent(myself.currentValue.toString())));
        //var command = '{' +
        //        '"command":"qrcode test",' +
        //        '"data":"' + codetext + '",' +
        //        '"user":"' + SnapCloud.username + '",' +
        //        '"pathname":"' + ide.currentSprite.name + '",' +
        //        '"return":' + 0 +
        //        '}';
        //loading();
        //w3_open();
        let topic = GetRandomLetters(10);
        console.log(JSON.stringify(data));
        //var testclient = mqtt.connect('ws://140.129.33.7:9001');
        var testclient = mqtt.connect('wss://iot.ttu.edu.tw:9002');
        testclient.publish(topic, JSON.stringify(data), {qos: 0, retain: true, dup: false});
        var w = window.open("", "qrcodewindow", "toolbar=yes, menubar=yes");
        var html = '<script src="websrc/jquery.js"></script>\n' +
                '<script type="text/javascript" src="websrc/jquery.qrcode.js"></script>\n' +
                '<script type="text/javascript" src="websrc/qrcode.js"></script>\n' +
                '<p>請先到 https://play.google.com/store/apps/details?id=ttu.sird.snapqrcode 下載 App</p>\n' +
                '<p>使用 App 掃描下方 QR Code 可在手機上模擬</p>\n' +
                '<div id="qrcodeCanvas"></div>\n' +
                '<h1>Android 手機 debug 方式:</h1>\n' +
                '<h3>準備工作</h3>\n' +
                '<p>USB 線</p>\n' +
                '<p>Android 手機</p>\n' +
                '<p>Chrome瀏覽器</p>\n' +
                '<h3>手機設定:</h3>\n' +
                '<p>設定 > 關于裝置 > 軟體資訊 > 版本號碼，連續按 7 次，直到出現提醒「開發者模式已啟用」的提示。</p>\n' +
                '<p>返回設定介面， 從「開發人員選項」進去，就可以看到「USB 偵錯」（USB 除錯）的選項，把它開啟。 </p>\n' +
                '<h3>debug步驟:</h3>\n' +
                '<p>1. 手機透過 USB 線 連接電腦</p>\n' +
                '<p>2. 手機准許電腦透過 USB 線讀取資料 </p>\n' +
                '<p>3. 啟動 Snap! App </p>\n' +
                '<p>4. 電腦 Chrome 瀏覽器的網址輸入 chrome://inspect </p>\n' +
                '<p>5. 會出現自己的手機與對應的APP頁面 點選 WebView in ttu.sird.snapqrcode 下方的 inspect 按鍵就可以開始除錯了 </p>\n' +
                '<script>\n' +
                '	jQuery("#qrcodeCanvas").qrcode({\n' +
                '		text	: "' + topic + '"\n' +
                '	});	\n' +
                '</script>' +
                '<script>\n' +
                '   setTimeout(setCenter, 0)\n' +
                '   function  setCenter(){\n' +
                '	    const canvas = document.querySelector("canvas");\n' +
                '	    canvas.style.cssText += \'display:block; margin:auto;\'; \n' +
                '	}\n' +
                '</script>';
        try {
            w.document.write(html);
        } catch (e) {
        }

        w.document.close();
    });

    menu.addLine();

    menu.addItem('build local project', function () {
        //var codetext = btoa(unescape(encodeURIComponent(myself.currentValue.toString())));

        const islogin = w3_open();
        if (islogin) {
            append(createComment("send file to cloud ..."))
            document.getElementById("log").style.height = "250px";
            document.getElementById("log").style.padding = "20px";
            document.getElementById("logbutton").innerText = "x";
            document.getElementById("buttondiv").style.marginBottom = "250px";
            setTimeout(() => {
                var ide = myself.parentThatIsA(IDE_Morph);
                var arr = ide.sprites.asArray()[0];
                for (var i = 0; i < ide.sprites.contents.length; i++) {
                    const key = ide.sprites.contents[i].name;
                    let codetext = fileListData[key];
                    const type = fileListType[key];
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
                        default:
                            path = '';
                    }
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + codetext + '",' +
                            '"filename":"' + key + '.' + type + '",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"' + path + '",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish(SnapCloud.username, command);
                }


                costumes = arr.costumes.contents;
                for (var i = 0; i < costumes.length; i++) {
                    var costume = costumes[i];
                    var img = costume.contents.toDataURL();
                    var name = costume.name;
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + img + '",' +
                            '"filename":"' + name + '.png",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"img/",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish(SnapCloud.username, command);
                }

                var command = '{' +
                        '"command":"createlocalproject",' +
                        '"user":"' + SnapCloud.username + '",' +
                        '"return":' + 0 +
                        '}';
                console.log(command);
                //loading();
                //w3_open();
                //var testclient = mqtt.connect('ws://140.129.33.7:9001');
                //append(createComment("create Apk ..."))
                rootclient.publish(SnapCloud.username, command);
            }, 1000);
        }
    });

    menu.addItem('update local code', function () {
        //var codetext = btoa(unescape(encodeURIComponent(myself.currentValue.toString())));

        const islogin = w3_open();
        if (islogin) {
            append(createComment("send file to cloud ..."))
            document.getElementById("log").style.height = "250px";
            document.getElementById("log").style.padding = "20px";
            document.getElementById("logbutton").innerText = "x";
            document.getElementById("buttondiv").style.marginBottom = "250px";
            setTimeout(() => {
                var ide = myself.parentThatIsA(IDE_Morph);
                var arr = ide.sprites.asArray()[0];
                for (var i = 0; i < ide.sprites.contents.length; i++) {
                    const key = ide.sprites.contents[i].name;
                    let codetext = fileListData[key];
                    const type = fileListType[key];
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
                        default:
                            path = '';
                    }
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + codetext + '",' +
                            '"filename":"' + key + '.' + type + '",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"' + path + '",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish('updatelocal/' + SnapCloud.username, command);
                }


                costumes = arr.costumes.contents;
                for (var i = 0; i < costumes.length; i++) {
                    var costume = costumes[i];
                    var img = costume.contents.toDataURL();
                    var name = costume.name;
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + img + '",' +
                            '"filename":"' + name + '.png",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"img/",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish('updatelocal/' + SnapCloud.username, command);
                }
            }, 1000);
        }
    });

    menu.addLine();

    menu.addItem('project build Android Apk', function () {
        //var codetext = btoa(unescape(encodeURIComponent(myself.currentValue.toString())));

        const islogin = w3_open();
        if (islogin) {
            append(createComment("send file to cloud ..."))
            document.getElementById("log").style.height = "250px";
            document.getElementById("log").style.padding = "20px";
            document.getElementById("logbutton").innerText = "x";
            document.getElementById("buttondiv").style.marginBottom = "250px";
            setTimeout(() => {
                var ide = myself.parentThatIsA(IDE_Morph);
                var arr = ide.sprites.asArray()[0];
                for (var i = 0; i < ide.sprites.contents.length; i++) {
                    const key = ide.sprites.contents[i].name;
                    let codetext = fileListData[key];
                    const type = fileListType[key];
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
                        default:
                            path = '';
                    }
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + codetext + '",' +
                            '"filename":"' + key + '.' + type + '",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"' + path + '",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish(SnapCloud.username, command);
                }


                costumes = arr.costumes.contents;
                for (var i = 0; i < costumes.length; i++) {
                    var costume = costumes[i];
                    var img = costume.contents.toDataURL();
                    var name = costume.name;
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + img + '",' +
                            '"filename":"' + name + '.png",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"img/",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish(SnapCloud.username, command);
                }

                var command = '{' +
                        '"command":"createprojectApk",' +
                        '"user":"' + SnapCloud.username + '",' +
                        '"return":' + 0 +
                        '}';
                console.log(command);
                //loading();
                //w3_open();
                //var testclient = mqtt.connect('ws://140.129.33.7:9001');
                //append(createComment("create Apk ..."))
                rootclient.publish(SnapCloud.username, command);
            }, 1000);
        }
    });

    menu.addItem('project build iOS IPA', function () {
        const islogin = w3_open();
        if (islogin) {
            append(createComment("send file to cloud ..."))
            document.getElementById("log").style.height = "250px";
            document.getElementById("log").style.padding = "20px";
            document.getElementById("logbutton").innerText = "x";
            document.getElementById("buttondiv").style.marginBottom = "250px";
            setTimeout(() => {
                var ide = myself.parentThatIsA(IDE_Morph);
                var arr = ide.sprites.asArray()[0];
                for (var i = 0; i < ide.sprites.contents.length; i++) {
                    const key = ide.sprites.contents[i].name;
                    let codetext = fileListData[key];
                    const type = fileListType[key];
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
                        default:
                            path = '';
                    }
                    if (key == 'index' && type == 'html') {
                        codetext = decodeURIComponent(escape(atob(codetext)));
                        codetext = codetext.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="viewport" content="initial-scale=1, width=device-width, height=device-height, viewport-fit=cover"><style>body{padding-top: constant(safe-area-inset-top);padding-top: env(safe-area-inset-top);}</style>')
                        if (codetext.indexOf('vue3-sfc-loader') != -1 && codetext.indexOf('async getFile(url)') != -1) {
                            codetext = vuecodeiOSUpdate(codetext);
                        }
                        codetext = btoa(unescape(encodeURIComponent(codetext)));
                        //btoa(unescape(encodeURIComponent(newValue)))
                    }
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + codetext + '",' +
                            '"filename":"' + key + '.' + type + '",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"' + path + '",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish(SnapCloud.username, command);
                }


                costumes = arr.costumes.contents;
                for (var i = 0; i < costumes.length; i++) {
                    var costume = costumes[i];
                    var img = costume.contents.toDataURL();
                    var name = costume.name;
                    var command = '{' +
                            '"command":"saveporjectfile",' +
                            '"data":"' + img + '",' +
                            '"filename":"' + name + '.png",' +
                            '"user":"' + SnapCloud.username + '",' +
                            '"path":"img/",' +
                            '"return":' + 0 +
                            '}';
                    console.log(command);
                    rootclient.publish(SnapCloud.username, command);
                }

                var command = '{' +
                        '"command":"createprojectIpa",' +
                        '"user":"' + SnapCloud.username + '",' +
                        '"return":' + 0 +
                        '}';
                console.log(command);
                rootclient.publish(SnapCloud.username, command);
            }, 1000);
        }

    });

    return menu;
}

function vuecodeiOSUpdate(code) {
    const iosReadFileCodeHead = 'setTimeout(_func,500)\n' +
            '    function _func () {\n' +
            '    const _options = {\n';
    //const iosReadFileCodeHead = 'function delay(time) {\n'+
    //        '    return new Promise(resolve => setTimeout(resolve, time));\n'+
    //        '    }\n' +
    //		'    await delay(500);\n' +
    //        '    const _options = {\n';
    code = code.replace('const _options = {', iosReadFileCodeHead);

    const iosReadFileCode = 'async getFile(url) {\n' +
            '                const code = await _readiOSfile(url);\n' +
            '                return code;\n' +
            '            },';

    const getFileCode = code.substring(code.indexOf('async getFile(url) {'), code.indexOf('},', code.indexOf('async getFile(url) {')) + 2);
    code = code.replace(getFileCode, iosReadFileCode);


    const iosReadFileCodeEnd = 'const _vm=_app.mount(_root)\n' +
            '    }\n' +
            '    function _readiOSfile(url){\n' +
            '        return _resolveLocalFileSystemURL(url).then(response => {\n' +
            '            return response;\n' +
            '        });' +
            '    }\n' +
            '    async function _resolveLocalFileSystemURL(url){\n' +
            '        return await new Promise( (resolve,reject) => {\n' +
            '            window.resolveLocalFileSystemURL(cordova.file.applicationDirectory+"www/", function (dir) {\n' +
            '                dir.getFile(url.replace("./",""), { create: false }, function (fileEntry) {\n' +
            '                    _readFile(fileEntry).then( result => {\n' +
            '                        resolve(result);\n' +
            '                    })\n' +
            '                },function(err){\n' +
            '                    reject("gotFileEntry fail");\n' +
            '                });\n' +
            '            });\n' +
            '        });\n' +
            '    }\n' +
            '    async function _readFile(fileEntry) {\n' +
            '        return new Promise((resolve, reject) => {\n' +
            '            fileEntry.file((file)=>{\n' +
            '                _reader(file).then(function (_reader) {\n' +
            '                    resolve(_reader.result)\n' +
            '                })\n' +
            '            },function(err){\n' +
            '                reject("gotFileEntry fail");\n' +
            '            });\n' +
            '        });\n' +
            '    }\n' +
            '    function _reader (file){\n' +
            '        return new Promise((resolve, reject) => {\n' +
            '            let reader = new FileReader();\n' +
            '            reader.onload = function () {\n' +
            '                resolve(reader);\n' +
            '            };\n' +
            '            reader.onerror = reject;\n' +
            '            reader.readAsText(file);\n' +
            '        });\n' +
            '    }';
    code = code.replace('const _vm=_app.mount(_root)', iosReadFileCodeEnd);
    //code = code.replace('const _vm=_app.mount(_root)', 'const _vm=_app.mount(_root)\n}');
    if (code.indexOf('cordova.js') == -1) {
        code = code.replace('<script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader"></script>', '<script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader"></script>\n    <script type="text/javascript" src="cordova.js"  ></script>');
    }
    return code;
}

function GetRandomLetters(_length) {
    var str = "";
    for (var i = 0; i < _length; i++) {
        if (parseInt(Math.random() * 2, 10)) {
            var num = Math.random() * 26 + 65;
            str += String.fromCharCode(num);
        } else {
            var num = Math.random() * 26 + 97;
            str += String.fromCharCode(num);
        }
    }
    return str;
}

SyntaxElementMorph.prototype.setScale = function (num) {
    var scale = Math.min(Math.max(num, 1), 25);
    PushButtonMorph.prototype.fontSize = 10 * num;
    this.scale = scale;
    this.corner = 3 * scale;
    this.rounding = 9 * scale;
    this.edge = 1.000001 * scale;
    this.inset = 6 * scale;
    this.hatHeight = 12 * scale;
    this.hatWidth = 70 * scale;
    this.rfBorder = 3 * scale;
    this.minWidth = 0;
    this.dent = 8 * scale;
    this.bottomPadding = 3 * scale;
    this.cSlotPadding = 4 * scale;
    this.typeInPadding = scale;
    this.labelPadding = 4 * scale;
    this.labelFontName = 'Verdana';
    this.labelFontStyle = 'sans-serif';
    this.fontSize = 10 * scale;
    this.embossing = new Point(
            -1 * Math.max(scale / 2, 1),
            -1 * Math.max(scale / 2, 1)
            );
    this.labelWidth = 450 * scale;
    this.labelWordWrap = true;
    this.dynamicInputLabels = true;
    this.feedbackColor = new Color(255, 255, 255);
    this.feedbackMinHeight = 5;
    this.minSnapDistance = 20;
    this.reporterDropFeedbackPadding = 10 * scale;
    this.contrast = 65;
    this.labelContrast = 25;
    this.activeHighlight = new Color(153, 255, 213);
    this.errorHighlight = new Color(173, 15, 0);
    this.activeBlur = 20;
    this.activeBorder = 4;
    this.rfColor = new Color(120, 120, 120);
};
SpriteMorph.prototype.freshPalette = function (category) {
    var myself = this,
            palette = new ScrollFrameMorph(null, null, this.sliderColor),
            unit = SyntaxElementMorph.prototype.fontSize,
            x = 0,
            y = 5,
            ry = 0,
            blocks,
            hideNextSpace = false,
            stage = this.parentThatIsA(StageMorph),
            shade = new Color(140, 140, 140),
            searchButton,
            makeButton;
    palette.owner = this;
    palette.padding = unit / 2;
    palette.color = this.paletteColor;
    palette.growth = new Point(0, MorphicPreferences.scrollBarSize);
    // toolbar:

    palette.toolBar = new AlignmentMorph('column');
    searchButton = new PushButtonMorph(
            this,
            "searchBlocks",
            new SymbolMorph("magnifierOutline", 16)
            );
    searchButton.alpha = 0.2;
    searchButton.padding = 1;
    searchButton.hint = localize('find blocks') + '...';
    searchButton.labelShadowColor = shade;
    searchButton.edge = 0;
    searchButton.padding = 3;
    searchButton.fixLayout();
    palette.toolBar.add(searchButton);
    makeButton = new PushButtonMorph(
            this,
            "makeBlock",
            new SymbolMorph("cross", 16)
            );
    makeButton.alpha = 0.2;
    makeButton.padding = 1;
    makeButton.hint = localize('Make a block') + '...';
    makeButton.labelShadowColor = shade;
    makeButton.edge = 0;
    makeButton.padding = 3;
    makeButton.fixLayout();
    palette.toolBar.add(makeButton);
    palette.toolBar.fixLayout();
    palette.add(palette.toolBar);
    // menu:
    palette.userMenu = function () {
        var menu = new MenuMorph();
        menu.addPair(
                [
                    new SymbolMorph(
                            'magnifyingGlass',
                            MorphicPreferences.menuFontSize
                            ),
                    localize('find blocks') + '...'
                ],
                () => myself.searchBlocks(),
                '^F'
                );
        menu.addItem(
                'hide blocks...',
                () => new BlockVisibilityDialogMorph(myself).popUp(myself.world())
        );
        menu.addLine();
        menu.addItem(
                'make a category...',
                () => this.parentThatIsA(IDE_Morph).createNewCategory()
        );
        if (SpriteMorph.prototype.customCategories.size) {
            menu.addItem(
                    'delete a category...',
                    () => this.parentThatIsA(IDE_Morph).deleteUserCategory()
            );
        }
        return menu;
    };
    if (category === 'unified') {
        // In a Unified Palette custom blocks appear following each category,
        // but there is only 1 make a block button (at the end).
        ide = this.parentThatIsA(IDE_Morph);
        showCategories = ide.scene.showCategories;
        showButtons = ide.scene.showPaletteButtons;
        blocks = SpriteMorph.prototype.allCategories().reduce(
                (blocks, category) => {
            let header = [this.categoryText(category), '-'],
                    primitives = this.getPrimitiveTemplates(category),
                    customs = this.customBlockTemplatesForCategory(category),
                    showHeader = showCategories &&
                    !['lists', 'other'].includes(category) &&
                    (primitives.some(item =>
                        item instanceof BlockMorph) || customs.length);
            // hide category names
            if (!showCategories && category !== 'variables') {
                primitives = primitives.filter(each =>
                    each !== '-' && each !== '=');
            }

            // hide "make / delete a variable" buttons
            if (!showButtons && category === 'variables') {
                primitives = primitives.filter(each =>
                    !(each instanceof PushButtonMorph &&
                            !(each instanceof ToggleMorph)));
            }

            return blocks.concat(
                    showHeader ? header : [],
                    primitives,
                    showHeader ? '=' : null,
                    customs,
                    showHeader ? '=' : '-'
                    );
        },
                []
                );
    } else {
        // ensure we do not modify the cached array
        blocks = this.getPrimitiveTemplates(category).slice();
    }

    if (category !== 'unified' || showButtons) {
        blocks.push('=');
        blocks.push(this.makeBlockButton(category));
    }

    if (category !== 'unified') {
        blocks.push('=');
        blocks.push(...this.customBlockTemplatesForCategory(category));
    }
    if (category === 'variables') {
        blocks.push(...this.customBlockTemplatesForCategory('lists'));
        blocks.push(...this.customBlockTemplatesForCategory('other'));
    }

    blocks.forEach(block => {
        if (block === null) {
            return;
        }
        if (block === '-') {
            if (hideNextSpace) {
                return;
            }
            y += unit * 0.8;
            hideNextSpace = true;
        } else if (block === '=') {
            if (hideNextSpace) {
                return;
            }
            y += unit * 1.6;
            hideNextSpace = true;
        } else if (block === '#') {
            x = 0;
            y = (ry === 0 ? y : ry);
        } else {
            hideNextSpace = false;
            if (x === 0) {
                y += unit * 0.3;
            }
            block.setPosition(new Point(x, y));
            palette.addContents(block);
            if (block instanceof ToggleMorph) {
                x = block.right() + unit / 2;
            } else if (block instanceof RingMorph) {
                x = block.right() + unit / 2;
                ry = block.bottom();
            } else {
                x = 0;
                y += block.height();
            }
        }
    });
    palette.scrollX(palette.padding);
    palette.scrollY(palette.padding);
    return palette;
};
CellMorph.prototype.layoutChanged = function () {
    var listWatcher = this.parentThatIsA(ListWatcherMorph);
    // adjust my layout
    this.bounds.setHeight(this.contentsMorph.height()
            + this.edge
            + this.border * 2);
    this.bounds.setWidth(Math.max(
            this.contentsMorph.width() + this.edge * 6
            ));
    // position my contents
    this.contentsMorph.setCenter(this.center());
    this.rerender();
    if (listWatcher) {
        listWatcher.fixLayout();
    }
};
CellMorph.prototype.layoutChanged = function () {
    var listWatcher = this.parentThatIsA(ListWatcherMorph);
    // adjust my layout
    this.bounds.setHeight(this.contentsMorph.height()
            + this.edge
            + this.border * 2);
    this.bounds.setWidth(Math.max(
            this.contentsMorph.width() + this.edge * 6
            ));
    // position my contents
    this.contentsMorph.setCenter(this.center());
    this.rerender();
    if (listWatcher) {
        listWatcher.fixLayout();
    }
};
var fileListData = {};
var fileListType = {};
WatcherMorph.prototype.update = function () {
    var newValue, sprite, num, att,
            isInherited = false;
    var ide = this.parentThatIsA(IDE_Morph);
    if (this.target && this.getter) {
        this.updateLabel();
        if (this.target instanceof VariableFrame) {
            newValue = this.target.vars[this.getter] ?
                    this.target.vars[this.getter].value : undefined;
            if (newValue === undefined && this.target.owner) {
                sprite = this.target.owner;
                if (contains(sprite.inheritedVariableNames(), this.getter)) {
                    newValue = this.target.getVar(this.getter);
                    // ghost cell color
                    this.cellMorph.setColor(
                            SpriteMorph.prototype.blockColor.variables
                            .lighter(35)
                            );
                } else {
                    this.destroy();
                    return;
                }
            } else {
                // un-ghost the cell color
                this.cellMorph.setColor(
                        SpriteMorph.prototype.blockColor.variables
                        );
            }
        } else {
            newValue = this.target[this.getter]();
            // determine whether my getter is an inherited attribute
            att = {
                xPosition: 'x position',
                yPosition: 'y position',
                direction: 'direction',
                getCostumeIdx: 'costume #',
                getScale: 'size',
                getVolume: 'volume',
                getPan: 'balance',
                reportShown: 'shown?',
                getPenDown: 'pen down?'
            } [this.getter];
            isInherited = att ? this.target.inheritsAttribute(att) : false;
        }
        if (newValue !== '' && !isNil(newValue)) {
            num = +newValue;
            if (typeof newValue !== 'boolean' && !isNaN(num)) {
                newValue = Math.round(newValue * 1000000000) / 1000000000;
            }
        }
        if (newValue === undefined) {
            // console.log('removing watcher for', this.labelText);
            this.destroy();
            return;
        }
        if (newValue !== this.currentValue ||
                isInherited !== this.isGhosted ||
                (!isNil(newValue) &&
                        newValue.version &&
                        (newValue.version !== this.version)
                        )
                ) {
            this.changed();
            this.cellMorph.contents = newValue;
            if (ide != null && newValue != null && this.getter == "code") {
                try {
                    const file = ide.currentSprite.name;
                    fileListData[file] = btoa(unescape(encodeURIComponent(newValue))); //newValue;
                    for (var i = 0; i < ide.currentSprite.costumes.contents.length; i++) {
                        if (ide.currentSprite.costumes.contents[i].name == 'html') {
                            fileListType[file] = ide.currentSprite.costumes.contents[i].name;
                            break;
                        } else if (ide.currentSprite.costumes.contents[i].name == 'js') {
                            fileListType[file] = ide.currentSprite.costumes.contents[i].name;
                            break;
                        } else if (ide.currentSprite.costumes.contents[i].name == 'css') {
                            fileListType[file] = ide.currentSprite.costumes.contents[i].name;
                            break;
                        } else if (ide.currentSprite.costumes.contents[i].name == 'php') {
                            fileListType[file] = ide.currentSprite.costumes.contents[i].name;
                            break;
                        } else if (ide.currentSprite.costumes.contents[i].name == 'vue') {
                            fileListType[file] = ide.currentSprite.costumes.contents[i].name;
                            break;
                        }
                    }
                } catch (error) {
                }
            }
            this.isGhosted = isInherited;
            if (isSnapObject(this.target)) {
                if (isInherited) {
                    this.cellMorph.setColor(this.readoutColor.lighter(35));
                } else {
                    this.cellMorph.setColor(this.readoutColor);
                }
            }
            this.cellMorph.fixLayout();
            if (!isNaN(newValue)) {
                this.sliderMorph.value = newValue;
                this.sliderMorph.fixLayout();
            }
            this.fixLayout();
            if (this.currentValue && this.currentValue.version) {
                this.version = this.currentValue.version;
            } else {
                this.version = Date.now();
            }
            this.currentValue = newValue;
        }
        /*
         if (newValue === this.currentValue ||
         isInherited !== this.isGhosted ||
         (!isNil(newValue) &&
         newValue.version &&
         (newValue.version !== this.version)
         )
         ) {
         if (ide != null && newValue != null) {
         try {
         const file = ide.currentSprite.name;
         fileListData[file] = btoa(unescape(encodeURIComponent(newValue))); //newValue;
         for (var i = 0; i < ide.currentSprite.costumes.contents.length; i++) {
         if (ide.currentSprite.costumes.contents[i].name == 'html') {
         fileListType[file] = ide.currentSprite.costumes.contents[i].name;
         break;
         } else if (ide.currentSprite.costumes.contents[i].name == 'js') {
         fileListType[file] = ide.currentSprite.costumes.contents[i].name;
         break;
         } else if (ide.currentSprite.costumes.contents[i].name == 'css') {
         fileListType[file] = ide.currentSprite.costumes.contents[i].name;
         break;
         } else if (ide.currentSprite.costumes.contents[i].name == 'php') {
         fileListType[file] = ide.currentSprite.costumes.contents[i].name;
         break;
         }
         }
         } catch (error) {
         }
         }
         }
         */
    }
    if (this.cellMorph.contentsMorph instanceof ListWatcherMorph) {
        this.cellMorph.contentsMorph.update();
    } else if (isSnapObject(this.cellMorph.contents)) {
        this.cellMorph.update();
    }
};
CellMorph.prototype.createContents = function () {
    // re-build my contents
    var txt,
            img,
            fontSize = SyntaxElementMorph.prototype.fontSize,
            isSameList = this.contentsMorph instanceof ListWatcherMorph
            && (this.contentsMorph.list === this.contents),
            isSameTable = this.contentsMorph instanceof TableFrameMorph
            && (this.contentsMorph.tableMorph.table === this.contents);
    if (this.isBig) {
        fontSize = fontSize * 1.5;
    }

    if (this.contentsMorph && !isSameList && !isSameTable) {
        this.contentsMorph.destroy();
        this.version = null;
    }

    if (!isSameList && !isSameTable) {
        if (this.contents instanceof Morph) {
            if (isSnapObject(this.contents)) {
                img = this.contents.thumbnail(new Point(40, 40));
                this.contentsMorph = new Morph();
                this.contentsMorph.isCachingImage = true;
                this.contentsMorph.bounds.setWidth(img.width);
                this.contentsMorph.bounds.setHeight(img.height);
                this.contentsMorph.cachedImage = img;
                this.version = this.contents.version;
            } else {
                this.contentsMorph = this.contents;
            }
        } else if (isString(this.contents)) {
            txt = this.contents;
            if (this.parent != null) {
                if (this.parent.labelText == "code") {
                    code = txt;
                    if (autodemo) {
                        WatcherMorph.prototype.runhtmlCode();
                    }
                    //var ide = this.parentThatIsA(IDE_Morph);
                    //WatcherMorph.prototype.run(ide, 'html');
                }
            }
//            txt  = this.contents.length > 500 ?
//                    this.contents.slice(0, 500) + '...' : this.contents;
            this.contentsMorph = new TextMorph(
                    txt,
                    fontSize,
                    null,
                    true,
                    false,
                    'left' // was formerly 'center', reverted b/c of code-mapping
                    );
            if (this.isEditable) {
                this.contentsMorph.isEditable = true;
                this.contentsMorph.enableSelecting();
            }
            this.contentsMorph.setColor(WHITE);
        } else if (typeof this.contents === 'boolean') {
            img = SpriteMorph.prototype.booleanMorph.call(
                    null,
                    this.contents
                    ).fullImage();
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof HTMLCanvasElement) {
            img = this.contents;
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof Context) {
            img = this.contents.image();
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof Costume) {
            img = this.contents.thumbnail(new Point(40, 40));
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof Sound) {
            this.contentsMorph = new SymbolMorph('notes', 30);
        } else if (this.contents instanceof List) {
            if (this.contents.isTable()) {
                this.contentsMorph = new TableFrameMorph(new TableMorph(
                        this.contents,
                        10
                        ));
                this.contentsMorph.expand(new Point(200, 150));
            } else {
                if (this.isCircular()) {
                    this.contentsMorph = new TextMorph(
                            '(...)',
                            fontSize,
                            null,
                            false, // bold
                            true, // italic
                            'center'
                            );
                    this.contentsMorph.setColor(WHITE);
                } else {
                    this.contentsMorph = new ListWatcherMorph(
                            this.contents,
                            this
                            );
                }
            }
            this.contentsMorph.isDraggable = false;
        } else {
            this.contentsMorph = new TextMorph(
                    !isNil(this.contents) ? this.contents.toString() : '',
                    fontSize,
                    null,
                    true,
                    false,
                    'center'
                    );
            if (this.isEditable) {
                this.contentsMorph.isEditable = true;
                this.contentsMorph.enableSelecting();
            }
            this.contentsMorph.setColor(WHITE);
        }
        this.add(this.contentsMorph);
    }
};
//Eric set export Sprite 
SpriteMorph.prototype.exportSprite = function () {
    if (this.isTemporary) {
        return;
    }
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        this.name = this.name + "_sprite";
        ide.exportSprite(this);
        this.name = this.name.replace('_sprite', '');
    }
};
SpriteMorph.prototype.blockForSelector = function (selector, setDefaults) {
    var migration, info, block, defaults, inputs, i;
    migration = this.blockMigrations[selector];
    info = this.blocks[migration ? migration.selector : selector];
    if (!info) {
        return null;
    }
    block = info.type === 'command' ? new CommandBlockMorph()
            : info.type === 'hat' ? new HatBlockMorph()
            : info.type === 'ring' ? new RingMorph()
            : new ReporterBlockMorph(info.type === 'predicate');
    block.color = this.blockColorFor(info.category);
    block.category = info.category;
    block.selector = migration ? migration.selector : selector;
    if (contains(['reifyReporter', 'reifyPredicate'], block.selector)) {
        block.isStatic = true;
    }
    block.setSpec(localize(info.spec));
    if (migration && migration.expand) {
        block.inputs()[migration.expand].addInput();
    }
    if ((setDefaults && info.defaults) || (migration && migration.inputs)) {
        defaults = migration ? migration.inputs : info.defaults;
        block.defaults = defaults;
        inputs = block.inputs();
        if (selector == 'reportJoinWords') {
            inputs[0].setContents(defaults);
            inputs[0].defaults = defaults;
        } else {
            for (i = 0; i < defaults.length; i += 1) {
                if (defaults[i] !== null) {
                    if (inputs[i] instanceof MultiArgMorph) {
                        try {
                            while (inputs[i].cachedInputs.length < defaults[i].length) {
                                inputs[i].addInput();
                            }
                        } catch (err) {

                        }
                        inputs[i].setContents(defaults[i]);
                        inputs[i].defaults = defaults[i];
                    } else {
                        inputs[i].setContents(defaults[i]);
                    }
                }
            }
        }
        /*
         if (inputs[0] instanceof MultiArgMorph) {
         while(inputs[0].cachedInputs.length<defaults[0].length){
         inputs[0].addInput();
         }
         inputs[0].setContents(defaults);
         inputs[0].defaults = defaults;
         if(selector!='reportJoinWords'){
         for (i = 1; i < defaults.length; i += 1) {
         if (defaults[i] !== null) {
         inputs[i].setContents(defaults[i]);
         if (inputs[i] instanceof MultiArgMorph) {
         inputs[i].defaults = defaults[i];
         }
         }
         }
         }
         } else {
         for (i = 0; i < defaults.length; i += 1) {
         if (defaults[i] !== null) {
         inputs[i].setContents(defaults[i]);
         if (inputs[i] instanceof MultiArgMorph) {
         inputs[i].defaults = defaults[i];
         }
         }
         }
         }
         */
    }
    return block;
};