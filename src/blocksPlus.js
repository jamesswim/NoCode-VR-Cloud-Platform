// labelPart() proxy

// add a global variabe 
window.labelWidth = 350; // use in ionic settings

SyntaxElementMorph.prototype.fixLayout = function () {
    var nb,
            parts = this.parts(),
            pos = this.position(),
            x = 0,
            y,
            lineHeight = 0,
            maxX = 0,
            blockWidth = this.minWidth,
            blockHeight,
            l = [],
            lines = [],
            space = this.isPrototype ?
            1 : Math.floor(fontHeight(this.fontSize) / 3),
            ico = this instanceof BlockMorph && this.hasLocationPin() ?
            this.methodIconExtent().x + space : 0,
            bottomCorrection,
            rightMost,
            hasLoopCSlot = false,
            hasLoopArrow = false;

    if ((this instanceof MultiArgMorph) && (this.slotSpec !== '%cs')) {
        blockWidth += this.arrows().width();
    } else if (this instanceof ReporterBlockMorph) {
        blockWidth += (this.rounding * 2) + (this.edge * 2);
    } else {
        blockWidth += (this.corner * 4)
                + (this.edge * 2)
                + (this.inset * 3)
                + this.dent;
    }

    if (this.nextBlock) {
        nb = this.nextBlock();
    }

    // determine lines
    parts.forEach(part => {
        if ((part instanceof CSlotMorph)
                || (part.slotSpec === '%cs')) {
            if (l.length > 0) {
                lines.push(l);
                lines.push([part]);
                l = [];
                x = 0;
            } else {
                lines.push([part]);
            }
        } else if (this.isVertical() && !(part instanceof FrameMorph)) {
            // variadic ring-inputs are arranged vertically
            // except the arrows for expanding and collapsing them
            if (l.length > 0) {
                lines.push(l);
            }
            l = [part];
            x = part.fullBounds().width() + space;
        } else {
            if (part.isVisible) {
                x += part.fullBounds().width() + space;
            }
            // FCC 2020/02/07: add window.labelWidth global variable to extend block width
            if ((x > this.labelWidth + window.labelWidth) || part.isBlockLabelBreak) {
                if (l.length > 0) {
                    lines.push(l);
                    l = [];
                    x = part.fullBounds().width() + space;
                }
            }
            l.push(part);
            if (part.isBlockLabelBreak) {
                x = 0;
            }
        }
    });
    if (l.length > 0) {
        lines.push(l);
    }

    // distribute parts on lines
    if (this instanceof CommandBlockMorph) {
        y = this.top() + this.corner + this.edge;
        if (this instanceof HatBlockMorph) {
            y += this.hatHeight;
        }
    } else if (this instanceof ReporterBlockMorph) {
        y = this.top() + (this.edge * 2);
    } else if (this instanceof MultiArgMorph
            || this instanceof ArgLabelMorph) {
        y = this.top();
        if (this.slotSpec === '%cs' && this.inputs().length > 0) {
            y -= this.rounding;
        }
    }
    lines.forEach(line => {
        if (hasLoopCSlot) {
            hasLoopArrow = true;
            hasLoopCSlot = false;
        }
        x = this.left() + ico + this.edge + this.labelPadding;
        if (this instanceof RingMorph) {
            x = this.left() + space; //this.labelPadding;
        } else if (this.isPredicate) {
            x = this.left() + ico + this.rounding;
        } else if (this instanceof MultiArgMorph ||
                this instanceof ArgLabelMorph
                ) {
            x = this.left();
        }
        y += lineHeight;
        lineHeight = 0;
        line.forEach(part => {
            if (part.isLoop) {
                hasLoopCSlot = true;
            }
            if (part instanceof CSlotMorph) {
                x -= this.labelPadding;
                if (this.isPredicate) {
                    x = this.left() + ico + this.rounding;
                }
                part.setColor(this.color);
                part.setPosition(new Point(x, y));
                lineHeight = part.height();
            } else if (part instanceof MultiArgMorph &&
                    (part.slotSpec === '%cs')) {
                if (this.isPredicate) {
                    x += this.corner;
                }
                part.setPosition(new Point(x, y));
                lineHeight = part.height();
            } else {
                part.setPosition(new Point(x, y));
                if (!part.isBlockLabelBreak) {
                    if (part.slotSpec === '%c' || part.slotSpec === '%loop') {
                        x += part.width();
                    } else if (part.isVisible) {
                        x += part.fullBounds().width() + space;
                    }
                }
                maxX = Math.max(maxX, x);
                lineHeight = Math.max(
                        lineHeight,
                        part instanceof StringMorph ?
                        part.rawHeight() : part.height()
                        );
            }
        });

        // adjust label row below a loop-arrow C-slot to accomodate the loop icon
        if (hasLoopArrow) {
            x += this.fontSize * 1.5;
            maxX = Math.max(maxX, x);
            hasLoopArrow = false;
        }

        // center parts vertically on each line:
        line.forEach(part => {
            part.moveBy(new Point(
                    0,
                    Math.floor((lineHeight - part.height()) / 2)
                    ));
        });
    });

    // determine my height:
    y += lineHeight;
    if (this.children.some(any => any instanceof CSlotMorph)) {
        bottomCorrection = this.bottomPadding;
        if (this instanceof ReporterBlockMorph && !this.isPredicate) {
            bottomCorrection = Math.max(
                    this.bottomPadding,
                    this.rounding - this.bottomPadding
                    );
        }
        y += bottomCorrection;
    }
    if (this instanceof CommandBlockMorph) {
        blockHeight = y - this.top() + (this.corner * 2);
    } else if (this instanceof ReporterBlockMorph) {
        blockHeight = y - this.top() + (this.edge * 2);
    } else if (this instanceof MultiArgMorph
            || this instanceof ArgLabelMorph) {
        blockHeight = y - this.top();
    }

    // determine my width:
    if (this.isPredicate) {
        blockWidth = Math.max(
                blockWidth,
                maxX - this.left() + this.rounding
                );
    } else if ((this instanceof MultiArgMorph && this.slotSpec !== '%cs')
            || this instanceof ArgLabelMorph) {
        blockWidth = Math.max(
                blockWidth,
                maxX - this.left() - space
                );
    } else {
        blockWidth = Math.max(
                blockWidth,
                maxX - this.left() + this.labelPadding - this.edge
                );
        // adjust right padding if rightmost input has arrows
        rightMost = parts[parts.length - 1];
        if (rightMost instanceof MultiArgMorph && rightMost.isVisible &&
                (lines.length === 1)) {
            blockWidth -= space;
        }
        // adjust width to hat width
        if (this instanceof HatBlockMorph) {
            blockWidth = Math.max(blockWidth, this.hatWidth * 1.5);
        }
    }

    // set my extent (silently, because we'll redraw later anyway):
    this.bounds.setWidth(blockWidth);
    this.bounds.setHeight(blockHeight);

    // adjust CSlots and collect holes
    this.holes = [];
    parts.forEach(part => {
        var adjustMultiWidth = 0;
        if (part instanceof CSlotMorph || (part.slotSpec === '%cs')) {
            if (this.isPredicate) {
                part.bounds.setWidth(
                        blockWidth -
                        ico -
                        this.rounding -
                        this.inset -
                        this.corner
                        );
                adjustMultiWidth = this.corner;
            } else {
                part.bounds.setWidth(blockWidth - this.edge - ico);
                adjustMultiWidth = this.corner + this.edge;
            }
            if (part.fixLoopLayout) {
                part.fixLoopLayout();
            }
        }
        if (part.slotSpec === '%cs') { // a multi-arg
            part.inputs().forEach(slot =>
                slot.bounds.setWidth(
                        part.right() - slot.left() - adjustMultiWidth
                        )
            );
        }
        part.fixHolesLayout();
        this.holes.push.apply(
                this.holes,
                part.holes.map(hole =>
                    hole.translateBy(part.position().subtract(pos))
                )
                );
    });

    // position next block:
    if (nb) {
        nb.setPosition(
                new Point(
                        this.left(),
                        this.bottom() - (this.corner)
                        )
                );
    }

    // find out if one of my parents needs to be fixed
    if (this instanceof BlockMorph && this.parent && this.parent.fixLayout) {
        this.parent.fixLayout();
        this.parent.changed();
        if (this.parent instanceof SyntaxElementMorph) {
            return;
        }
    }

    this.fixHighlight();
};

SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;

SyntaxElementMorph.prototype.labelPart = function (spec) {
    var part;


    switch (spec) {
        // vue  %ScriptSetupFunc %dataProvide
		case '%mqttEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'connect': ['connect'],
                        'offline': ['offline']
                    },
                    false
                    );
            break;
		case '%mqttQos':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'AT_MOST_ONCE': ['0'],
                        'AT_LEAST_ONCE': ['1'],
                        'EXACTLY_ONCE': ['2']
                    },
                    false
                    );
            break;
		case '%mqttBoolean':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['0'],
                        'true': ['1']
                    },
                    false
                    );
            break;
        case '%dataProvide':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'data': ['data'],
                        'provide': ['provide'],
                    },
                    false
                    );
            break;

        case '%VueComponent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'script': ['script'],
                        'script lang="ts"': ['script lang="ts"'],
                        'script setup': ['script setup'],
                        'script setup lang="ts"': ['script setup lang="ts"'],
                        'style': ['style'],
                        'style scoped': ['style scoped'],
                        'template': ['template'],
                    },
                    false
                    );
            break;

        case '%VueComponentOption':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        'script': ['script'],
                        'script lang="ts"': ['lang="ts"'],
                        'script setup': ['setup'],
                        'script setup lang="ts"': ['setup lang="ts"'],
//                        'style': ['style'],
//                        'template': ['template'],
                    },
                    false
                    );
            break;

            // vue  %

        case '%VueExportDefault':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'defineComponent({ ...});"': ['defineComponent'],
//                        'script setup': ['setup'],
//                        'script setup lang="ts"': ['setup lang="ts"'],
//                        'style': ['style'],
//                        'template': ['template'],
                    },
                    false
                    );
            break;

        case '%ScriptSetupFunc':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Parent-Child properties  ----': [''],
//                        "A2: computed({ get() {console.log('check')  return 'check?'; } })": ['computed'],
                        'A2: defineProps({text: String, default:"default"} | [text])': ['defineProps'],
                        'A2: defineEmits(["changeEvent", "deleteEvent"])': ['defineEmits'],
//                        'Vue.defineProps({foo: String}))': ['Vue.defineProps'],
//                        'Vue.defineEmits(["change", "delete"])': ['Vue.defineEmits'],  
                        'Vue.computed(() => {})': ['Vue.computed'],
                        'Vue.defineExpose({a, b})': ['Vue.defineExpose'],
                        'Vue.useSlots())': ['Vue.useSlots'],
                        'Vue.useAttrs()': ['Vue.useAttrs'],

                        'Vue.watchEffect(() => {})': ['Vue.watchEffect'],
                        'Vue.watch(() => {})': ['Vue.watch'],

                        '----  Reactivity: Core  ----': [''],
                        'Vue.reactive({ count: 0 })': ['Vue.reactive'],
                        'Vue.ref(0)': ['Vue.ref'],
                        'Vue.readonly(original)': ['Vue.readonly'],
                        '----  Reactivity: Utilities  ----': [''],
                        'Vue.unref(var)': ['Vue.unref'],
                        'Vue.toRef(refProp, "reactiveProp")': ['Vue.toRef'],
                        'Vue.toRefs(reactiveObj)': ['Vue.toRefs'],
                        'Vue.isProxy(var)': ['Vue.isProxy'],
                        'Vue.isReactive(var)': ['Vue.isReactive'],
                        'Vue.isReadonly(var)': ['Vue.isReadonly'],
//
                        '----  Reactivity: Advanced  ----': [''],
                        'Vue.shallowRef({ count: 0 })': ['Vue.shallowRef'],
                        'Vue.triggerRef(shallowRefVar)': ['Vue.triggerRef'],
                        'Vue.shallowReactive({ count: 0 , nested: { bar: 2} })': ['Vue.shallowReactive'],
                        'Vue.shallowReadonly({ count: 0 , nested: { bar: 2} })': ['Vue.shallowReadonly'],

                        'Vue.toRaw(reactiveObj)': ['Vue.toRaw'],
                        'Vue.markRaw({})': ['Vue.markRaw'],
                        'Vue.effectScope()': ['Vue.effectScope'],

                        '----  Vue router ----': [''],
                        'VueRouter.useRoute()': ['VueRouter.useRoute'],
                        'VueRouter.useRouter()': ['VueRouter.useRouter'],

                        '----  Vuex Store  ----': [''],
                        'Vuex.useStore()': ['Vuex.useStore'],
                    },
                    false
                    );
            break;

        case '%VueVariable':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        'Vue': ['Vue'],

                        '----  Vue  ----': [''],
                        '_app = Vue.createApp (...)': ['_app'],
                        '_vm  = _app.mount("#_root")': ['_vm'],

                        '----  Vuex  ----': [''],
                        '_store = Vuex.createStore(..)': ['_store'],
                        '----  VueRouter  ----': [''],
                        '_router = VueRouter.createRouter(...)': ['_router'],
                    },
                    false
                    );
            break;
// %RoutePath

        case '%RouterKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Router ----': [''],
                        'history : VueRouter.createWebHistory() | VueRouter.createWebHashHistory()': ["history"],
                        "routes :  [ { path: '/', component: Home }, { path: '/about', component: About }, ]": ["routes"],
                        'routes : _routes': ["routes"],

                    },
                    false
                    );
            break;

        case '%RouterValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  Vue Router ----': [''],
                        'history : VueRouter.createWebHistory()': ["VueRouter.createWebHistory()"],
                        "history : VueRouter.createWebHistory('/forder/')": ["VueRouter.createWebHistory('/folder/')"],
                        'history : VueRouter.createWebHashHistory()': ["VueRouter.createWebHashHistory()"],

                        'routes : _routes': ["_routes"],
                        "routes :  [ { path: '/', component: Home }, { path: '/about', component: About }, ]": ["[ ]"],

                    },
                    false
                    );
            break;


        case '%RouteKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Route  ----': [''],
                        'path : "/"': ['path'],

                        'name : Home': ['name'],
                        'component : Home|()=>"import(../views/PostView.vue"': ['component'],

                    },
                    false
                    );
            break;

        case '%RouteValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Route path ----': [''],
                        'path : "/"': ["'/'"],
                        'path : "/Home"': ["'/Home'"],
                        'path : "/Login"': ["'/Login'"],
                        'path : "/About"': ["'/About'"],
                        '----  Vue Route component ----': [''],
                        'component : Home': ['Home'],
                        'component : Login': ['Login'],
                        'component : About': ['About'],
                        'component : () => import ("../views/About.vue") (sync load)': ["() => import ('./About.vue')"],
                        'component : load Async module': ["Vue.defineAsyncComponent(() => loadModule('./About.vue')"],
                        '----  Vue Route name ----': [''],
                        'name : Home': ["'Home'"],
                        'name : Login': ["'Login'"],
                        'name : About': ["'About'"],
                    },
                    false
                    );
            break;

//    %VueRouterHTML5
        case '%VueRouterHTML5':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Route Link ----': [''],
                        'router-link to = "/home"': ['router-link'],
                        'router-view': ['router-view'],

                        '----  Vue slot ----': [''],
                        'slot': ['slot'],
                        '----  Vue template ----': [''],
                        'component :is = "dynComponent"': ['component'],
                        'keep-alive': ['keep-alive'],
                        'teleport to = "body"': ['teleport'],
                        'transition': ['transition'],
                        'transition-group': ['transition-group'],

                    },
                    false
                    );
            break;

//      %VueRouterLinkKey      
        case '%VueRouterLinkKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Route Link ----': [''],
                        'to = "/"': ['to'],
                        'to = "/home"': ['to'],
                        'to = "/home" replace': ['to'],
                        ':to={ path: "/home" }': ['router-view'],
                        'replace': ['replace'],
                        'custom': ['custom'],
                        'v-slot="{ navigate }"': ['v-slot'],

                        '----  Vue Transition Tag ----': [''],
                        'mode = "in-out |out-in"': ['mode'],
                        'appear = true': ['appear'],

                        'enter-active-class = "enter"': ['enter-active-class'],
                        'leave-active-class = "leave"': ['leave-active-class'],

                        '@before-enter = "handleBeforeEnter"': ['@before-enter'],
                        '@enter = "handleEnterActive"': ['@enter'],
                        '@after-enter = "handleBeforeEnter"': ['@after-enter'],
                        '@before-leave = "handleBeforeLeave"': ['@before-leave'],
                        '@leave = "handleLeaveActive"': ['leave'],
                        '@after-leave = "handleBeforeLeave"': ['@after-leave'],
                    },
                    false
                    );
            break;

        case '%VueRouterLinkValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Route Link ----': [''],
                        'to = "/"': ['"/"'],
                        'to = "/home"': ['"/home"'],
                        'to = "/home" replace': ['"/home" replace'],
                        ':to={ path: "/home" }': ['{ }'],
                        'replace': ['replace'],
                        'custom': ['custom'],
                        'v-slot="{ navigate }"': ['"{ navigate }"'],

                        '----  Vue Transition Tag ----': [''],
                        'mode = "in-out"': ['"in-out"'],
                        'mode = "out-in"': ['"out-in"'],
                        'appear = true': ['true'],

                        'enter-active-class = "enter"': ['"enter"'],
                        'leave-active-class = "leave"': ['"leave"'],

                        '@before-enter = "handleBeforeEnter"': ['"handleBeforeEnter"'],
                        '@enter = "handleEnterActive"': ['"handleEnterActive"'],
                        '@after-enter = "handleBeforeEnter"': ['"handleBeforeEnter"'],
                        '@before-leave = "handleBeforeLeave"': ['"handleBeforeLeave"'],
                        '@leave = "handleLeaveActive"': ['"handleLeaveActive"'],
                        '@after-leave = "handleBeforeLeave"': ['"handleBeforeLeave"'],
                    },
                    false
                    );
            break;

        case '%VueObjectFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  vue  ----': [''],
                        'Vue.createApp': ['Vue.createApp'],
                        'Vue.defineComponent': ['Vue.defineComponent'],
                        'Vue.defineAsyncComponent': ['Vue.defineAsyncComponent'],
                        'Vue.defineCustomElement': ['Vue.defineCustomElement'],
                        '----  router  ----': [''],
                        'VueRouter.createRouter': ['VueRouter.createRouter'],
//                        'VueRouter.useRouter': ['VueRouter.useRouter'],                        
                        '----  Vuex  ----': [''],
                        'Vuex.createStore': ['Vuex.createStore'],
                    },
                    false
                    );
            break;


        case '%VueObjectFunction1':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  _app  ----': [''],
                        '1 _app.component("ion-content", "IonContent")': ['_app.component'],
//                        '_app.directive("dirertive", {..}': ['_app.directive'],       
                        '1 _app.mixin({ optional API)")': ['_app.mixin'],
                        '1 _app.mount("#_root")': ['_app.mount'],
                        '1 _app.use(router)': ['_app.use'],
                        '1 _app.use(store)': ['_app.use'],
                        '----  Set Ionic Components  ----': [''],
                        '1 _setIonicConponents(_app)': ['_setIonicConponents'],
                        '----  Vue  ----': [''],
                        'Vue.defineAsyncComponent(()=>import("./components/AsyncComponent.vue"))': ['Vue.defineAsyncComponent'],
                        'Vue.defineComponent({...})': ['Vue.defineComponent'],
                        'Vue.h("tag", { properties }, slot)': ['Vue.h'],
//                        'Vue.onBeforeMonut': ['Vue.onBeforeMonut'],
//                        'Vue.onMounted': ['Vue.onMounted'],
//                        'Vue.onBeforeUpdate': ['Vue.onBeforeUpdate'],
//                        'Vue.onUpdated': ['Vue.onUpdated'],
//                        'Vue.onBeforeUnmount': ['Vue.onBeforeUnmount'],
//                        'Vue.onBeforeUnmount': ['Vue.onBeforeUnmount'],
//                        'Vue.onUnmounted': ['Vue.onUnmounted'],
//                        '----  _vm  ----': [''],

//                        '----  Vuex Store ----': [''],
//                        '4 this.$store.dispatch("changeAction" [, "params"]) // call a function in actions': ['this.$store.dispatch'],     
//                        '4 this.$store.commit("changeAction" [, "params"]) // call a function in mutations': ['this.$store.commit'],                            
//                        '4 this.commit("changeAction" [, "params"]) // call a function in mutations': ['this.commit'],       
//                        '4 store.commit("changeAction" [, "params"]) // call a function in mutations': ['store.commit'],    
                    },
                    false
                    );
            break;

        case '%VueObjectFunction2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  _app  ----': [''],
                        '_app.component("MyComponent", {..})': ['_app.component'],
                        '_app.directive("dirertive", {..})': ['_app.directive'],

//                        'app.use(router)': ['app.use'],
                        '----  Vue  ----': [''],
                        'Vue.defineAsyncComponent': ['Vue.defineAsyncComponent'],

                    },
                    false
                    );
            break;

//VueDataKeyValue delimiters: ['%{', '}%'],
        case '%VueDataKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue data  ----': [''],
                        'B3 name : "CompName"': ['name'],
                        'B3C2 components: { "CompName" : Comp, ...},"': ['components'],
                        'B3C2 delimiters : ["%{", "}%"],': ['delimiters'],
                        'B3C2 directives : directives': ['directives'],
                        'B3C2 extends : CompA': ['extends'],
                        'C2 el: "#app"': ['el'],
                        'B3C2 inheritAttrs : false': ['inheritAttrs'],
                        'B3C2 mixins : [mixinObj]': ['mixins'],
                        'B3C2 props : ["label", "value"]': ['props'],
                        'B3C2 props : content : {type:Number, default: ()=> {return 456};}': ['props'],
                        'B3C2 provide -> inject': ['provide'],
                        'B3C2 inject : ["providedObj"]': ['inject'],

                        '----  Vue event  ----': [''],
                        'B3C2 emits : ["event1, event2"]': ['emits'],
                        'event': ['event'],

//                        '----  Vue Router  ----': [''],
//                        '2 history : VueRouter.createWebHashHistory() |VueRouter.createWebHistory()': ['history'],
//                        '2 inject: ["provideObj"]': ['inject'],

                        '----  Vue model  ----': [''],
                        'modelValue': ['modelValue'],

                        '----  Vue data variable  ----': [''],

                        '4 default : function () {return 456};}': ['default'],
                        '4 required : true, ': ['required'],
                        '4 type : Number, ': ['type'],
                        '4 validator : function (value) {return value<1000};}': ['validator'],

                        'count': ['count'],

                        'id': ['id'],
                        'index': ['index'],
                        'item': ['item'],
                        'items': ['items'],
                        'obj': ['obj'],
                        'objs': ['objs'],
                        'message': ['message'],
                        'messages': ['messages'],
                        'show': ['show'],
                        'total': ['total'],
                        'var1': ['var1'],
                        'var2': ['var2'],
                    },
                    false
                    );
            break;

        case '%VueDataKeyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  Vue data  ----': [''],
                        '[]': ['[ ]'],
                        '{ }': ['{  }'],
                        '[{ }]': ['[{  }]'],
                        '""': ['""'],
                        '"Hello Vue"': ['"Hello Vue"'],
                        '0': ['0'],
                        '1': ['1'],
                        'true': ['true'],
                        'false': ['false'],
                        '["Angular", "React", "Vue"]': ['["Angular", "React", "Vue]'],
                        '{ key1: "value1", key2:"value2"}': ['{ key1: "value1", key2:"value2"}'],
                        '----  Vue directives ----': [''],
                        '2 directives : directives': ['directives'],

                        '----  Vue props ----': [''],
                        '3. props: { modelValue : String': ['modelValue'],
                        '----  Vue value ----': [''],
                        '4 default : 456': ['456'],
                        '4 default : function() {return 456};}': ['function() {return 456}'],
                        '4 required : true, ': ['true'],
                        '4 type : Array, ': ['Array'],
                        '4 type : Boolean, ': ['Boolean'],
                        '4 type : Function, ': ['Function'],
                        '4 type : Number, ': ['Number'],
                        '4 type : Object, ': ['Object'],
                        '4 type : String, ': ['String'],
                        '4 type : Symbol, ': ['Symbol'],
                        '4 validator : function (value) {return value<1000};}': ['function (value) {return value<1000};}'],

//                        '----  Vue Router  ----': [''],
//                        '2 history : VueRouter.createWebHashHistory() ': ['VueRouter.createWebHashHistory()'],
//                        '2 history : VueRouter.createWebHistory()': ['VueRouter.createWebHistory()'],
//                        '----  components  ----': [''],
//                        '2 components : Vue.defineAsyncComponent(() => loadModule("./your.vue",options))': ['Vue.defineAsyncComponent(() => loadModule("./your.vue",options))'],

                    },
                    false
                    );
            break;

        case '%VueHooks':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        'setup(props, context)': ['setup'],
                        '----  Options: Lifecycle Hooks ----': [''],
                        'beforeCreate(){...}': ['beforeCreate'],
                        'created(){...}': ['created'],
                        'beforeMount(){...}': ['beforeMount'],
                        'mounted(){...}': ['mounted'],
                        'beforeUpdate(){...}': ['beforeUpdate'],
                        'updated(){...}': ['updated'],
                        'beforeUnmount(){...}': ['beforeUnmount'],
                        'unmounted(){...}': ['unmounted'],
                        'errorCaptured(){...}': ['errorCaptured'],
                        'renderTracked(){...}': ['renderTracked'],
                        'renderTriggered(){...}': ['renderTriggered'],
                        'activated(){...}': ['activated'],
                        'deactivated(){...}': ['deactivated'],

//                        '----  Composition API: Lifecycle Hooks  ----': [''],
//                        'beforeCreate': ['beforeCreate'],
//                        'created': ['created'],
//                        'onBeforeMount(()=>{})': ['onBeforeMount'],
//                        'onMounted(()=>{})': ['onMounted'],
//                        'onBeforeUpdate(()=>{})': ['onBeforeUpdate'],
//                        'onUpdated(()=>{})': ['onUpdated'],
//                        'onBeforeUnmount(()=>{})': ['onBeforeUnmount'],
//                        'onUnmounted(()=>{})': ['onUnmounted'],
//                        'onErrorCaptured(()=>{})': ['onErrorCaptured'],
//                        'onRenderTracked(()=>{})': ['onRenderTracked'],
//                        'onRenderTriggered(()=>{})': ['onRenderTriggered'],
//                        'onActivated(()=>{})': ['onActivated'],
//                        'onDeactivated(()=>{})': ['onDeactivated'],

//                        '----  Vue misc  ----': [''],
//                        'setup(props, context)': ['setup'],
//                        'provide(){...}': ['provide'],
//                        'render(){...}': ['render'],

                        '----  Ionic: Lifecycle Hooks  ----': [''],
                        'onIonViewDidEnter(){...}': ['onIonViewDidEnter'],
                        'onIonViewDidLeave(){...}': ['onIonViewDidLeave'],
                        'onIonViewWillEnter(){...}': ['onIonViewWillEnter'],
                        'onIonViewWillLeave(){...}': ['onIonViewWillLeave'],
                    },
                    false
                    );
            break;

        case '%VueSetupHooks':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  Composition API: Lifecycle Hooks  ----': [''],
//                        'beforeCreate': ['beforeCreate'],
//                        'created': ['created'],
//                        'onBeforeMount': ['Vue.onBeforeMount'],
//                        'onMounted': ['Vue.onMounted'],
//                        'onBeforeUpdate': ['Vue.onBeforeUpdate'],
//                        'onUpdated': ['Vue.onUpdated'],
//                        'onBeforeUnmount': ['Vue.onBeforeUnmount'],
//                        'onUnmounted': ['Vue.onUnmounted'],
//                        'onErrorCaptured': ['Vue.onErrorCaptured'],
//                        'onRenderTracked': ['Vue.onRenderTracked'],
//                        'onRenderTriggered': ['Vue.onRenderTriggered'],
//                        'onActivated': ['Vue.onActivated'],
//                        'onDeactivated': ['Vue.onDeactivated'],
                        'Vue.onBeforeMount(()=>{})': ['Vue.onBeforeMount'],
                        'Vue.onMounted(()=>{})': ['onMounted'],
                        'Vue.onBeforeUpdate(()=>{})': ['onBeforeUpdate'],
                        'Vue.onUpdated(()=>{})': ['Vue.onUpdated'],
                        'Vue.onBeforeUnmount(()=>{})': ['Vue.onBeforeUnmount'],
                        'Vue.onUnmounted(()=>{})': ['Vue.onUnmounted'],
                        'Vue.onErrorCaptured(()=>{})': ['Vue.onErrorCaptured'],
                        'Vue.onRenderTracked(()=>{})': ['Vue.onRenderTracked'],
                        'Vue.onRenderTriggered(()=>{})': ['Vue.onRenderTriggered'],
                        'Vue.onActivated(()=>{})': ['Vue.onActivated'],
                        'Vue.onDeactivated(()=>{})': ['Vue.onDeactivated'],

//                        '----  Ionic: Lifecycle Hooks  ----': [''],
//                        'onIonViewDidEnter': ['onIonViewDidEnter'],
//                        'onIonViewDidLeave': ['onIonViewDidLeave'],
//                        'onIonViewWillEnter': ['onIonViewWillEnter'],
//                        'onIonViewWillLeave': ['onIonViewWillLeave'],
                    },
                    false
                    );
            break;


        case '%VueMethods':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- Component Options API  ----': [''],

                        '2 computed': ['computed'],
                        '2 components': ['components'],
                        '2 directives': ['directives'],
                        '2 emits': ['emits'],
//                        '2. maxins': ['maxins'],                        
                        '2 methods': ['methods'],
                        '2 props: { content : { type : Number, default: ()=> {return 456};}': ['props'],
//                        '2 provide { providedObj : 1 } Parent ==> Child': ['provide'],
//                        '2 provide  { providedObj : 1 } Parent ==> Child': ['provide'],
//                        '2 render': ['render'],                      
                        '2 watch(source, callback, [options])': ['watch'],
                        '2 watchEffect(() => console.log(count.value))': ['watchEffect'],
                        '----  Options API: model  ----': [''],
                        '3 props: { modelModifiers : default : ()=>({})': ['modelModifiers'],

                        '----  Vue data variable  ----': [''],
                        '3 content : {type:Number, default: ()=> {return 456};}': ['content'],
                        '3 params : { content : 123, a : 456 }': ['params'],
//                        '----  Vuex state API  ----' [''],
//                        '2 state': ['state'],
//                        '2 actions // async function': ['actions'],
//                        '2 modules': ['modules'],                             
//                        '2 mutations // sync function': ['mutations'],

//                        'emits': ['emits'],    //                        
//
//                        '----  computed/methods API  ----': [''],
//                        'inc() { this.a + 1 },': ['inc'],                       
//                        'get() {return this.a + 1},': ['get'],
//                        'set(v) {this.a = v + 1},': ['set'],  
                    },
                    false
                    );
            break;

        case '%VuexMethods':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

//                        '----  Vuex state API  ----': [''],
                        '2 state': ['state'],
                        '2 actions // async function': ['actions'],
                        '2 modules': ['modules'],
                        '2 mutations // sync function': ['mutations'],

                    },
                    false
                    );
            break;

        case '%VuexObjectFunctionCall':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vuex Store Function Call ----': [''],
                        'this.$store.dispatch("changeAction" [, "params"]) // call a function in actions': ['this.$store.dispatch'],
                        'this.$store.commit("changeAction" [, "params"]) // call a function in mutations': ['this.$store.commit'],
                        '_vm.$store.dispatch("changeAction" [, "params"]) // call a function in actions': ['_vm.$store.dispatch'],
                        '_vm.$store.commit("changeAction" [, "params"]) // call a function in mutations': ['_vm.$store.commit'],
                        'this.commit("changeAction" [, "params"]) // call a function in mutations': ['this.commit'],
                        'store.commit("changeAction" [, "params"]) // call a function in mutations': ['store.commit'],
                        '----  routes ----': [''],
                        'this.$router.push("path" ) ': ['this.$router.push'],
                        '_vm.$router.push("path" ) ': ['_vm.$router.push'],
						'this.$router.back() ': ['this.$router.back'],
                        '_vm.$router.back() ': ['_vm.$router.back'],

                    },
                    false
                    );
            break;

        case '%VueControl': // directive
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Directive: control  ----': [''],
                        'v-for="item of items"': ['v-for'],
                        'v-if="boolenVar or cond"': ['v-if'],
                        'v-else-if="boolenVar"': ['v-else-if'],
//                        'v-else': ['v-else'],

                        '----  Directive v-model: two-way data binding ----': [''],
                        'v-model = "var"': ['v-model'],
                        'v-model.lazy = "var"': ['v-model.lazy'],
                        'v-model.number = "var"': ['v-model.number'],
                        'v-model.trim = "var"': ['v-model.trim'],

                        '----  Directive v-bind: one-way data binding   ----': [''],
                        'v-bind = "$attrs"': ['v-bind'],
                        'v-bind:id = "dynamicId"': ['v-bind:id'],
                        ':id = "dynamicId"': [':id'],
                        ':index = "index"': [':index'],
                        ':is = "aComponent"': [':is'],
                        ':item = "item"': [':item'],
                        ':items = "items"': [':items'],
                        ':key ="text"': [':key'],
                        ':[key] ="value"': [':[key]'],
                        ':prop = "someThing"': [':prop'],
                        ':src ="imageSrc"': [':src'],
                        ':title ="text"': [':title'],
                        ':value = "text"': [':value'],

                        '---- Directive v-bind: CSS  ----': [''],
                        ':class = "classString | classArray |classObject"': [':class'],
                        ':style = "styleString|styleObject"': [':style'],
                        'class = "red | green | {red:true, green:true}"': ['class'],
                        'style = "[baseStyles, overridingStyles]"': ['style'],

                        '---- Directive v-slot  ----': [''],
                        'v-slot:item = "slotProps"': ['v-slot:item'],
                        '#item = "slotProps"': ['#item'],

                        '---- Directive misc  ----': [''],
                        'v-html = "msg"': ['v-html'],
                        'v-memo ="[valueA, valueB]"': ['v-memo'],

                        'v-show = "var"': ['v-show'],
                        'v-text = "msg"': ['v-text'],

                        '----  Vue Dom   ----': [''],
                        'ref = "domRef"': ['ref'],

//                        '----  Router  ----': [''],
//                        'path : "/home"': ['path'],
//                        'component : Home"': ['component'],

                    },
                    false
                    );
            break;

        case '%VueDirective2': // directive
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  Directive control  ----': [''],
                        'v-else': ['v-else'],

                        '----  Directive Data binding  ----': [''],
                        'v-cloak': ['v-cloak'],
                        'v-once': ['v-once'],
                        'v-pre': ['v-pre'],

                        '----  Vue tag  ----': [''],
                        'component': ['component'],
                        'keep-alive': ['keep-alive'],
                        'slot': ['slot'],
                        'teleport to="tagId" ': ['teleport'],
                        'template': ['template'],
                        'transition': ['transition'],
                        'transition-group': ['transition-group'],

                        '----  router tag  ----': [''],
                        '<router-link to="/home">': ['router-link'],
                        '<router-view>': ['router-view'],
                        'slot': ['slot'],

                        '----  Vue Component Instance  ----': [''],
                        '$data': ['$data'],
                        '$props': ['$props'],
                        '$el': ['$el'],
                        '$options': ['$options'],
                        '$parent': ['$parent'],
                        '$root': ['$root'],

                        '$slots': ['$slots'],
                        '$refs': ['$refs'],
                        '$attrs': ['$attrs'],
                        '----  Vue Component Instance function ----': [''],
                        '$watch()': ['$watch'],
                        '$emit()': ['$emit'],
                        '$forceUpdate()': ['$forceUpdate'],
                        '$nextTick()': ['$nextTick'],
                        '----  Vue event/objs  ----': [''],
                        'event': ['event'],
                        '$event': ['$event'],

                        'this.$emit': ['this.$emit'],

                        '$refs': ['$refs'],
                        'this.$refs': ['this.$refs'],

                        '----  _vm  ----': [''],
                        '_vm.$data': ['_vm.$data'],
//                        'v-once': ['v-once'],
//                        'v-pre': ['v-pre'],
                    },
                    false
                    );
            break;


        case '%VueControlValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Control  ----': [''],
                        'v-for Array: todo in todos': ['"todo in todos"'],
                        'v-for Array: item in items': ['"item in items"'],
                        'v-for Array: (item, index) in items': ['"(item, index) in items"'],
                        'v-for Object: value in dicts': ['"value in dicts"'],
                        'v-for Object: (value, key) in dicts': ['"(value, key) in dicts"'],
                        'v-for Object: (value, key, index) in dicts': ['"(value, key, index) in dicts"'],
                        'v-for Range: n in 10': ['"n in 10"'],
                        'v-if = boolenVar': ['"boolenVar"'],
                        'v-if = boolenVar === 3': ['"boolenVar === 3"'],
//                        'v-else': [''],

                        '----  Directive v-bind: one-way data binding   ----': [''],
                        'v-bind = "$attrs"': ['$attrs'],

                        '----  Vue Data binding  ----': [''],
                        'content': ['"content"'],
                        'id': ['"id"'],
                        'index': ['"index"'],
                        'item': ['"item"'],
                        'items': ['"items"'],
                        'message': ['"message"'],
                        'show': ['"show"'],
                        'total': ['"total"'],
                        'var1': ['"var1"'],
                        'var2': ['"var2"'],

                        '----  Vue CSS  ----': [''],
                        'classString="red"': ['"red"'],
                        'classArray=["red", "green"]': ['"["red", "green"]"'],
                        'style="{ color: red; }"': ['"{ color: red; }"'],

                        '----  Router  ----': [''],
                        'path : "/home"': ['"/home"'],
                        'path : "/about"': ['"/about"'],
                        'component : Home': ['Home'],
                        'component : About': ['About'],
//                        ':style="[baseStyles, overridingStyles]"': [':style'],

                    },
                    false
                    );
            break;

        case '%VueControlOperator':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue Control  ----': [''],
                        '=': ['='],
                        ':': [':'],
//                        'v-if="flase"': ['false'],                        


//                        '@input="onInput"': [@input'],     

                    },
                    false
                    );
            break;

        case '%VueEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue event  ----': [''],
                        '@click="count++"': ['@click'],
                        '@click="one($event), two($event)"': ['@click'],
                        '@input="onInput"': ['@input'],
                        '@keydown="count++"': ['@keydown'],
                        '@keyup="count++"': ['@keyup'],
                        '@submit="count++"': ['@submit'],
                        '@scroll="count++"': ['@scroll'],

                        'v-on:click="methodName"': ['v-on:click'],
                        'v-on:input="onInput"': ['v-on:input'],
                        'v-on:keyup="count++"': ['v-on:keyup'],
                        'v-on:submit="count++"': ['v-on:submit'],
                        'v-on:scroll="count++"': ['v-on:scroll'],

                        '----  Vue dynamic event  ----': [''],
                        '@[event]="count++"': ['@[event]'],
                        'v-on:[event]="methodName"': ['v-on:[event]'],

                        '----  Vue <Transition> event  ----': [''],
                        '@before-enter="func"': ['@before-enter'],
                        '@before-leave="func"': ['@before-leave'],
                        '@enter="func"': ['@enter'],
                        '@leave="func"': ['@leave'],
                        '@appear="func"': ['@appear'],
                        '@after-enter="func"': ['@after-enter'],
                        '@after-leave="func"': ['@after-leave'],
                        '@after-appear="func"': ['@after-appear'],
                        '@enter-cancelled="func"': ['@enter-cancelled'],
                        '@leave-cancelled="func"': ['@leave-cancelled'],
                        '@appear-cancelled="func"': ['@appear-cancelled'],

                    },
                    false
                    );
            break;

        case '%VueSubEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue sub event  ----': [''],
                        '.capture': ['.capture'],
                        '.passive': ['.passive'],
                        '.prevent': ['.prevent'],
                        '.once': ['.once'],
                        '.self': ['.self'],
                        '.stop': ['.stop'],
                        '.stop.prevent': ['.stop.prevent'],

                        '----  Key sub event   ----': [''],
                        '.enter': ['.enter'],
                        '.esc': ['.esc'],
                        '.delete': ['.delete'],
                        '.down': ['.down'],
                        '.left': ['.left'],
                        '.right': ['.right'],
                        '.space': ['.space'],
                        '.tab': ['.tab'],
                        '.up': ['.up'],
//                        '.left': ['.left'],       
//                        '.right': ['.right'],       

                        '---- Mouse Button Modifierst   ----': [''],
                        '.left ': ['.left'],
                        '.middle': ['.middle'],
                        '.right ': ['.right'],

                        '----  System Modifier Keys  ----': [''],
                        '.alt': ['.alt'],
                        '.ctrl': ['.ctrl'],
                        '.meta': ['.meta'],
                        '.once ': ['.once'],
                        '.shift': ['.shift'],
                        '.exact': ['.exact'],
                        '.ctrl.exact': ['.ctrl.exact'],
//                        '.stop.prevent': ['.stop.prevent'],  
                    },
                    false
                    );
            break;

        case '%VueEventValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue event  ----': [''],
                        '@click="count++"': ['count++'],
                    },
                    false
                    );
            break;

        case '%setupFunc':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Reactivity: Core  ----': [''],
                        'Vue.reactive({ count: 0 })': ['Vue.reactive'],
                        'Vue.ref(0)': ['Vue.ref'],
                        'Vue.readonly(original)': ['Vue.readonly'],
                        'Vue.watchEffect(() => {})': ['Vue.watchEffect'],
                        'Vue.computed(() => {})': ['Vue.computed'],
                        '----  Reactivity: Utilities  ----': [''],
                        'Vue.unref(var)': ['Vue.unref'],
                        'Vue.toRef(refProp, "reactiveProp")': ['Vue.toRef'],
                        'Vue.toRefs(reactiveObj)': ['Vue.toRefs'],
                        'Vue.isProxy(var)': ['Vue.isProxy'],
                        'Vue.isReactive(var)': ['Vue.isReactive'],
                        'Vue.isReadonly(var)': ['Vue.isReadonly'],

                        '----  Reactivity: Advanced  ----': [''],
                        'Vue.shallowRef({ count: 0 })': ['Vue.shallowRef'],
                        'Vue.triggerRef(shallowRefVar)': ['Vue.triggerRef'],
                        'Vue.shallowReactive({ count: 0 , nested: { bar: 2} })': ['Vue.shallowReactive'],
                        'Vue.shallowReadonly({ count: 0 , nested: { bar: 2} })': ['Vue.shallowReadonly'],

                        'Vue.toRaw(reactiveObj)': ['Vue.toRaw'],
                        'Vue.markRaw({})': ['Vue.markRaw'],
                        'Vue.effectScope()': ['Vue.effectScope'],

                        '----  Vue router ----': [''],
                        'VueRouter.useRoute()': ['VueRouter.useRoute'],
                        'VueRouter.useRouter()': ['VueRouter.useRouter'],

                        '----  Vuex Store  ----': [''],
                        'Vuex.useStore()': ['Vuex.useStore'],
//                        'this.$store.dispatch("changeAction") // call a function in actions': ['this.$store.dispatch'],     
//                        'this.$store.commit("changeAction", "params") // call a function in mutations': ['this.$store.commit'],                            
//                        'this.commit("changeAction") // call a function in mutations': ['this.commit'],       
//                        'store.commit("changeAction") // call a function in mutations': ['store.commit'],                               
                    },
                    false
                    );
            break;


//%setupValue
        case '%setupValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Array/Object  ----': [''],
                        '{ }': ['{ }'],
                        '[ ]': ['[ ]'],
                        '[{ }]': ['[{  }]'],
                        '{ count: 0 }': ['{ count: 0 }'],
                        '[ref("Vue")]': ['[ref("Vue")]'],
                        '["Angular", "React", "Vue"]': ['["Angular", "React", "Vue"]'],
                        '{ key1: "value1", key2:"value2"}': ['{ key1: "value1", key2:"value2"}'],
                        '{ get: () => {..}, set: (param) => {...} }': ['{ get: () => {..}, set: (param) => {...} }'],
                        '----  ref(): Basic data type  ----': [''],
                        '0': ['0'],
                        '1': ['1'],
                        '""': ['""'],
                        "''": ["''"],
                        '"Vue"': ['"Vue"'],
                        'true': ['true'],
                        'false': ['false'],
                        '----  routes function call ----': [''],
                        'this.$route.query.': ['this.$route.query.'],
                        '_vm.$route.query.': ['_vm.$route.query.'],
                        '----  Vuex function call ----': [''],
                        'this.$store.dispatch("changeAction")': ['"changeAction"'],
                        'store.commit("changeAction")': ['"changeAction"'],
                    },
                    false
                    );
            break;


        case '%VueCSS':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue CSS  ----': [''],
                        '@keyframes id': ['@keyframes id'],

                        '----  Vue CSS  ----': [''],
//                        '.enter': ['.enter'],  
//                        '.leave ': ['.leave '],    
//                        '.enter': ['.enter'],  
//                        '.leave ': ['.leave '],                          
//                        '.fade-enter-from': ['.fade-enter-from'],                          
//                        '.fade-enter-active': ['.fade-enter-active'],
//                        '.fade-enter-to': ['.fade-enter-to'],       
//                        '.fade-leave-from': ['.fade-leave-from'],                              
//                        '.fade-leave-active': ['.fade-leave-active'],  
//                        '.fade-leave-to': ['.fade-leave-to'],   
//                        
//                        '.slide-enter-from': ['.slide-enter-from'],                          
//                        '.slide-enter-active': ['.slide-enter-active'],
//                        '.slide-enter-to': ['.slide-enter-to'],
//                        '.slide-leave-from': ['.slide-leave-from'],                              
//                        '.slide-leave-active': ['.slide-leave-active'],  
//                        '.slide-leave-to': ['.slide-leave-to'],     

                        '.v-enter-from': ['.v-enter-from'],
                        '.v-enter-active': ['.v-enter-active'],
                        '.v-enter-to': ['.v-enter-to'],
                        '.v-leave-from': ['.v-leave-from'],
                        '.v-leave-active': ['.v-leave-active'],
                        '.v-leave-to': ['.v-leave-to'],
                        '.v-move': ['.v-move'],

//                        '@input="onInput"': [@input'],     

                    },
                    false
                    );
            break;

//vue this . property
        case '%VueThis':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue  ----': [''],
                        'this': ['this'],
                        '_vm': ['_vm'],
                        '_vm.$data.value': ['_vm.$data'],
                        '----  A: Vue script setup ----': [''],
                        'props.text': ['props'],
//                        'slots.default()': ['slots'],                        
                        '----  B: Vue setup ----': [''],
                        'attrs.value': ['attrs'],
                        'slots.default()': ['slots'],

                        '----  C: Vue Optional APIs ----': [''],
                        'this.$attrs.value': ['this.$attrs'],
                        'this.$options.value': ['this.$options'],
                        'this.$refs.value': ['this.$refs'],
                        '$attrs.value': ['$attrs'],
                        '$slots.default()': ['$slots'],
                        '----  C: Vue Optional APIs ==> v-model----': [''],
                        'modelModifies': ['modelModifies'],
                        'modelValue': ['modelValue'],
                        '----  Vuex  ----': [''],
                        'this.$store.value': ['this.$store'],
                        'this.$store.state.value': ['this.$store.state'],
                        'this.$store.value': ['this.$store'],
                        'store.value': ['store'],
                        'state.value': ['state'],
                    },
                    false
                    );
            break;

        case '%VueProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue  ----': [''],
                        'this.property': ['property'],
                        '_vm.$data': ['$data'],
                        '----  A: Vue script setup ----': [''],
                        'props.text': ['text'],
                        '---- B: Vue setup ----': [''],
                        'refVar.value': ['value'],
                        'attrs.value': ['value'],
                        'slots.default()': ['default()'],
                        'slots.slots.default()[0].children': ['slots.default()[0].children'],
//                        'refVar.value': ['value'],
//                        'refVar.value': ['value'],
//                        'refVar.value': ['value'],

                        '----  C: Vue Optional APIs ----': [''],
                        'this.$attrs': ['$attrs'],
                        'this.$options': ['$options'],
                        'this.$refs': ['$refs'],
                        'this.$emit("func")': ['$emit'],

                        '----  Vuex  ----': [''],
                        'this.$store.state.name': ['name'],

//                        '----  Vuex  ----': [''],
//                        'this.$store.state.name': ['name'],
                    },
                    false
                    );
            break;

//vue Key : value
        case '%VueKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue A props ----': [''],
                        'type : String|Number|': ['type'],
                        'default : "default"': ['default'],
                        'required : true|false': ['required'],
                    },
                    false
                    );
            break;

        case '%VueValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Vue A props ----': [''],
                        'type : String': ['String'],
                        'type : Number|': ['Number'],
                        'default : "default"': ['"default"'],
                        'required : true': ['true'],
                        'required : false': ['false'],
                    },
                    false
                    );
            break;

// cordova
        case '%CordovaFuntion':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  camera  ----': [''],
                        'navigator.camera.getPicture(successCallback, errorCallback, options)': ['navigator.camera.getPicture'],
                        'navigator.camera.cleanup(successCallback, errorCallback) (iOS only)': ['navigator.camera.cleanup'],
                        '----  geolocation  ----': [''],
                        'navigator.geolocation.getCurrentPosition(geolocationSuccess, [geolocationError], [geolocationOptions])': ['navigator.geolocation.getCurrentPosition'],
                        'navigator.geolocation.watchPosition(geolocationSuccess, [geolocationError], [geolocationOptions])': ['navigator.geolocation.watchPosition'],
                        'navigator.geolocation.clearWatch(watchID)': ['navigator.geolocation.clearWatch'],
                        '----  acceleration  ----': [''],
                        'navigator.accelerometer.getCurrentAcceleration(accelerationSuccess, [accelerationError])': ['navigator.accelerometer.getCurrentAcceleration'],
                        'navigator.accelerometer.watchAcceleration(accelerationSuccess, [accelerationError], [accelerationOptions])': ['navigator.accelerometer.watchAcceleration'],
                        'navigator.accelerometer.clearWatch(watchID)': ['navigator.accelerometer.clearWatch'],
                        '----  MQTT  ----': [''],
                        'cordova.plugins.CordovaMqTTPlugin.connect([connectOptions])': ['cordova.plugins.CordovaMqTTPlugin.connect'],
                        'cordova.plugins.CordovaMqTTPlugin.publish([publishOptions])': ['cordova.plugins.CordovaMqTTPlugin.publish'],
                        'cordova.plugins.CordovaMqTTPlugin.subscribe([subscribeOptions])': ['cordova.plugins.CordovaMqTTPlugin.subscribe'],
                        'cordova.plugins.CordovaMqTTPlugin.listen("topic",function(payload,params,topic){})': ['cordova.plugins.CordovaMqTTPlugin.listen'],
                        '----  Wi-Fi  ----': [''],
                        'WifiWizard2.startScan() ': ['WifiWizard2.startScan'],
                        'WifiWizard2.getScanResults(null).then(Success,Error)': ['WifiWizard2.getScanResults(null).then'],
                        'window.wifiManager.connect(SSID,Password,connectSuccess,connectError)': ['window.wifiManager.connect'],
                        '----  Media  ----': [''],
                        'new Media(src, mediaSuccess, [mediaError], [mediaStatus])': ['new Media'],
                        'media.getCurrentPosition(mediaSuccess, [mediaError])': ['media.getCurrentPosition'],
                        'media.getDuration()': ['media.getDuration'],
                        'media.pause()': ['media.pause'],
                        'media.pauseRecord()': ['media.pauseRecord'],
                        'media.play()': ['media.play'],
                        'media.release()': ['media.release'],
                        'media.resumeRecord()': ['media.resumeRecord'],
                        'media.seekTo(milliseconds)': ['media.seekTo'],
                        'media.setVolume(volume)': ['media.setVolume'],
                        'media.startRecord()': ['media.startRecord'],
                        'media.stop()': ['media.stop'],
                        'media.stopRecord()': ['media.stopRecord'],
                        'media.setRate(rate)': ['media.setRate'],
//                        'media.stop()': ['media.stop'],         
                        '----  media  ----': [''],
                        'navigator.device.capture.captureVideo(captureSuccess, captureError, [options])': ['navigator.device.capture.captureVideo'],
                        'navigator.device.capture.captureAudio(captureSuccess, captureError, options)': ['navigator.device.capture.captureAudio'],
                        'navigator.device.capture.captureImage(captureSuccess, captureError, options)': ['navigator.device.capture.captureImage'],
                        'mediaFile.getFormatData( successCallback,  [errorCallback])': ['mediaFile.getFormatData'],
                        'media.pauseRecord()': ['media.pauseRecord'],
                        '----  notification  ----': [''],
                        'navigator.notification.alert(message, alertCallback, [title], [buttonName])': ['navigator.notification.alert'],
                        'navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])': ['navigator.notification.confirm'],
                        'navigator.notification.prompt(message, promptCallback, [title], [buttonLabels], [defaultText])': ['navigator.notification.prompt'],
                        'navigator.notification.beep(times)': ['navigator.notification.beep'],
                        'navigator.notification.dismissPrevious([successCallback], [errorCallback])': ['navigator.notification.dismissPrevious'],
                        'navigator.notification.dismissAll([successCallback], [errorCallback])': ['navigator.notification.dismissAll'],
                        '----  vibrate  ----': [''],
                        'navigator.vibrate(time)': ['navigator.vibrate'],
                        'navigator.vibrate(pattern)': ['navigator.vibrate'],
//                        'has("apples")': ['has'],
//                        'set("apples", 500)': ['set'],
                    },
                    false
                    );
            break;


            // JavaScript ES6-11 
            // variables data structure
        case '%DictFuntion':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  Set  ----': [''],
                        'add("a")': ['add'],
                        'delete("a")': ['delete'],
                        'forEach (function(value){}': ['forEach'],
                        'has("a")': ['has'],
                        'values()': ['values'],
                        '----  Map  ----': [''],
                        'delete("apples")': ['delete'],
                        'entries()': ['entries'],
                        'forEach (function(value, key){})': ['forEach'],
                        'get("apples")': ['get'],
                        'has("apples")': ['has'],
                        'set("apples", 500)': ['set'],
                    },
                    false
                    );
            break;

        case '%DictFuntion2': // Tensor
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'new Date("2022-01-01") ': ['new Date'],
                        'new Number(123)': ['new Number'],
                        'new String("John")': ['new String'],
                        'new Symbol("John")': ['new Symbol'],

                        'new Set(["a","b","c"])': ['new Set'],

//                         'cmp(dict1, dict2)': ['cmp'],
                        'new Map ([ ["apples", 500],  ["bananas", 300]': ['new Map '],
                        '----  Number  ----': [''],
                        'parseFloat("10")': ['parseFloat'],
                        'parseInt("10")': ['parseInt'],
                    },
                    false
                    );
            break;
//%JSProperty

        case '%JSProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- Array/List/String ----': [''],
                        'length': ['length'],
                        '---- Map/Set ----': [''],
                        'size': ['size'],
                        '---- MQTT ----': [''],
                        'onMessageArrived': ['onMessageArrived'],
                        'onConnectionLost': ['onConnectionLost'],
                        'onSuccess': ['onSuccess'],
                        'onFailure': ['onFailure'],
                        'keepAliveInterval': ['keepAliveInterval'],
                        'timeout': ['timeout'],
                        '---- JSON key of Data  ----': [''],
                        'author': ['author'],
                        'city': ['city'],
                        'content': ['content'],
                        'description': ['description'],
                        'icon': ['icon'],
                        'id': ['id'],
                        'image': ['image'],
                        'link': ['link'],
                        'keyword': ['keyword'],
                        'name': ['name'],
                        'page': ['page'],
                        'subtitle': ['subtitle'],
                        'title': ['title'], },
                    false
                    );
            break


        case '%PhonePluginFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- camera ----': [''],
                        'navigator.camera.getPicture': ['navigator.camera.getPicture'],
                    },
                    false
                    );
            break

            //20220331 add Phone Plugin
        case '%PhonePluginFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- camera ----': [''],
                        'navigator.camera.getPicture': ['navigator.camera.getPicture'],
                    },
                    false
                    );
            break
        case '%CameraOptionsKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- accelerometer ----': [''],
                        'frequency(number)': ['frequency'],
                        '---- geolocation ----': [''],
                        'enableHighAccuracy(Boolean)': ['enableHighAccuracy'],
                        'Timeout(number)': ['Timeout'],
                        'maximumAge(number)': ['maximumAge'],
                        '---- Camera ----': [''],
                        'quality': ['quality'],
                        'destinationType': ['destinationType'],
                        'sourceType': ['sourceType'],
                        'allowEdit': ['allowEdit'],
                        'saveToPhotoAlbum ': ['saveToPhotoAlbum '],
                        'mediaType': ['mediaType'],
                        'targetWidth': ['targetWidth'],
                        'targetHeight': ['targetHeight'],
                        'correctOrientation': ['correctOrientation'],
                        'cameraDirection': ['cameraDirection'],
                        'encodingTyp': ['encodingTyp'],
                        'popoverOptions': ['popoverOptions'],
                    },
                    false
                    );
            break
        case '%CameraOptionsValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- quality ----': [''],
                        'number(0~100)': ['50'],
                        '---- destinationType ----': [''],
                        'DATA_URL (Base64)': ['Camera.DestinationType.DATA_URL'],
                        'FILE_UR File (URI)': ['Camera.DestinationType.FILE_URI'],
                        '---- sourceType ----': [''],
                        'CAMERA': ['Camera.PictureSourceType.CAMERA'],
                        'PHOTOLIBRARY': ['Camera.PictureSourceType.PHOTOLIBRARY'],
                        'SAVEDPHOTOALBUM': ['Camera.PictureSourceType.SAVEDPHOTOALBUM'],
                        '---- allowEdit ----': [''],
                        'Boolean (edit image)': ['false'],
                        '---- saveToPhotoAlbum ----': [' '],
                        'Boolean (save image)': ['false'],
                        '---- mediaType ----': [''],
                        'PICTURE': ['Camera.MediaType.PICTURE'],
                        'VIDEO': ['Camera.MediaType.VIDEO'],
                        'ALLMEDIA (PICTURE&VIDEO)': ['Camera.MediaType.ALLMEDIA'],
                        '---- targetWidth ----': [''],
                        'number (be used with targetHeight)': ['500'],
                        '---- targetHeight ----': [''],
                        'number (be used with targetWidth)': ['500'],
                        '---- correctOrientation ----': [''],
                        'Boolean (Rotate the image)': ['false'],
                        '---- cameraDirection ----': [''],
                        'BACK': ['Camera.Direction.BACK'],
                        'FRONT': ['Camera.Direction.FRONT'],
                        '---- encodingTyp ----': [''],
                        'JPEG': ['Camera.EncodingType.JPEG'],
                        'PNG': ['Camera.EncodingType.PNG'],
                    },
                    false
                    );
            break
            //
        case '%StringSymbol':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '"': ['"'],
                        '`': ['`'],
                        "'": ["'"],

                    },
                    false
                    );
            break

        case '%JavaScriptObject':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- REST ----': [''],
                        'axios': ['axios'],
                        'XMLHttpRequest': ['XMLHttpRequest'],
                        'FileReader': ['FileReader'],
                        '---- MQTT ----': [''],
                        'Paho.MQTT.Client(hostname, port, "clientId")': ['Paho.MQTT.Client'],
                        'Paho.MQTT.Message': ['Paho.MQTT.Message'],
                    },
                    false
                    );
            break
        case '%JavaScriptObject2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- Snap ----': [''],
                        'snap': ['snap'],
                        '---- REST ----': [''],
                        'axios': ['axios'],
                        'xmlHttpRequest': ['xmlHttpRequest'],
                        'fileReader': ['fileReader'],
                        '---- MQTT ----': [''],
                        'Paho.MQTT.Client': ['Paho.MQTT.Client'],
                        'Paho.MQTT.Message': ['Paho.MQTT.Message'],
                    },
                    false
                    );
            break
        case '%JavaScriptObjectFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- axios (REST) ----': [''],
//                        'axios(config)': ['axios'],                               
                        'axios.request(config)': ['request'],
                        'axios.get(url[, config])': ['get'],
                        'axios.delete(url[, config])': ['delete'],
                        'axios.head(url[, config])': ['head'],
                        'axios.options(url[, config])': ['options'],
                        'axios.post(url[, data[, config]])': ['post'],
                        'axios.put(url[, data[, config]])': ['put'],
                        'axios.patch(url[, data[, config]])': ['patch'],

                        '---- Snap ----': [''],
                        'registerUser(userid,password,mail) ': ['registerUser'],
                        'isExist(userid)': ['isExist'],
                        'verifyUser(userid,password)': ['verifyUser'],
                        'verifyUserAndEmail(userid,mail)': ['verifyUserAndEmail'],
                        'modifyPassword(userid,password)': ['modifyPassword'],

                        '---- XMLHttpRequest ----': [''],
                        'abort()': ['abort'],
                        'getAllResponseHeaders()': ['getAllResponseHeaders'],
                        'getResponseHeader(headerName)': ['getResponseHeader'],
                        'open(method, url[, async[, user[, password]]])': ['open'],
                        'overrideMimeType(mimeType)': ['overrideMimeType'],
                        'send(body)': ['send'],
                        'setRequestHeader(header, value)': ['setRequestHeader'],

                        '---- FileReader ----': [''],
                        'onload': ['onload'],
                        'readAsArrayBuffer(blob)': ['readAsArrayBuffer'],
                        'readAsBinaryString(blob)': ['readAsBinaryString'],
                        'readAsDataURL(blob)': ['readAsDataURL'],
                        'readAsText(blob[, encoding])': ['readAsText'],

                        '---- Paho.MQTT.Client ----': [''],
                        'connect': ['connect'],
                        'send': ['send'],
                        'subscribe': ['subscribe'],
                    },
                    false
                    );
            break
//%AxiosKey : %AxiosValue
        case '%AxiosKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- Axios config ----': [''],
                        'baseURL: "https://localhost:3000"': ['url'],
                        'data: {firstName: "Fred",lastName: "Flintstone" }': ['data'],
                        'headers: {"X-Requested-With":"XMLHttpRequest"} ': ['headers'],
                        'method: "delete"|"get"|"post"|"put" ': ['method'],
                        'params: { ID: 12345 }': ['params'],
                        'responseType: "stream"': ['responseType'],
                        'transfromRequest: [function( data, header) { }': ['transfromRequest'],
                        'transfromResponse: [function( data) { }': ['transfromResponse'],
                        'url: "http://bit.ly/2mTM3nY"': ['url'],

                    },
                    false
                    );
            break
        case '%AxiosValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- Axios config ----': [''],
                        'baseURL: "https://localhost:3000"': ['"https://localhost:3000"'],
                        'data: {firstName: "Fred",lastName: "Flintstone" }': [' {firstName: "Fred",lastName: "Flintstone" }'],
                        'headers: {"X-Requested-With":"XMLHttpRequest"} ': ['{"X-Requested-With":"XMLHttpRequest"} '],
                        'method: "delete"': ['"delete"'],
                        'method: "get"': ['"get"'],
                        'method: "post"': ['"post"'],
                        'method: "put"': ['"put"'],
                        'params: { ID: 12345 }': ['{ ID: 12345 }'],
                        'responseType: "stream"': ['"stream"'],
                        'transfromRequest: [function( data, header) { }]': ['[function( data, header) { }]'],
                        'transfromResponse: [function( data) { }]': ['[function( data) { }]'],
                        'url: "http://localhost/"': ['"http://localhost/"'],

                    },
                    false
                    );
            break
        case '%JavaScriptObjectConstant':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- XMLHttpRequest ----': [''],
                        'readyState': ['readyState'],
                        'response': ['response'],
                        'responseText': ['responseText'],
                        'responseType': ['responseType'],
                        'responseURL': ['responseURL'],
                        'responseXML': ['responseXML'],
                        'status': ['status'],
                        'statusText': ['statusText'],
                        'timeout': ['timeout'],
                        'withCredentials ': ['timeout'],
                        '---- XMLHttpRequest event ----': [''],
                        'onreadystatechange': ['onreadystatechange'],
                        '---- FileReader ----': [''],
                        'error': ['error'],
                        'readyState': ['readyState'],
                        'result': ['result'],
                        '---- MQTT ----': [''],
                        'onConnectionLost': ['onConnectionLost'],
                        'onMessageArrived ': ['onMessageArrived'],
                        'destinationName': ['destinationName'],
//                        'result': ['result'],                        
                    },
                    false
                    );
            break

        case '%JavaScriptObjectEventFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- XMLHttpRequest ----': [''],
                        'onreadystatechange': ['onreadystatechange'],
                        '---- FileReader ----': [''],
                        'onabort': ['onabort'],
                        'onerror': ['onerror'],
                        'onload': ['onload'],
                        'onloadstart': ['onloadstart'],
                        'onloadend': ['onloadend'],
                        'onprogress': ['onprogress'],
                    },
                    false
                    );
            break

            //Eric 2022/03/04 ionic Ionic Lib
        case '%IonicLib':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'https://iot.ttu.edu.tw:9999/ionic/index.esm.js': ['https://iot.ttu.edu.tw:9999/ionic/index.esm.js'],
                    },
                    false
                    );
            break
            //Eric 2022/02/23 ionic Controller
        case '%IonicController':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'menuController': ['menuController'],
                        'loadingController': ['loadingController'],
                        'toastController': ['toastController'],
                        'actionSheetController': ['actionSheetController'],
                        'pickerController': ['pickerController'],
                    },
                    false
                    );
            break

        case '%ControllerPrototype':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'present': ['present'],
                    },
                    false
                    );
            break

            //Eric 2022/01/25 firebase auth
        case '%FirebaseAuth':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'signInWithEmailAndPassword': ['signInWithEmailAndPassword'],
                        'createUserWithEmailAndPassword': ['createUserWithEmailAndPassword'],
                    },
                    false
                    );
            break
            //Eric 2022/01/22 chart
        case '%ChartType':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'bar': ['bar'],
                        'line': ['line'],
                        'bubble': ['bubble'],
                        'scatter': ['scatter'],
                        'doughnut': ['doughnut'],
                        'pie': ['pie'],
                        'polarArea': ['polarArea'],
                        'radar': ['radar']
                    },
                    false
                    );
            break
        case '%ChartItem':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'type : "bar"': ['type'],
                        'labels (array)': ['labels'],
                        'datasets : [{},{}]': ['datasets'],
                        '-----Dataset-----': [''],
                        'label (string)': ['label'],
                        'data : (object)': ['data'],
                        'x : "2016-12-25"': ['x'],
                        'y : 10': ['y'],
                        'r : 10': ['r'],
                        'id (string)': ['id'],
                        'nested (object)': ['nested'],
                        'value (number)': ['value'],
                        'backgroundColor (array)': ['backgroundColor'],
                        'borderColor (array)': ['borderColor'],
                        'borderWidth (number)': ['borderWidth'],
                        'clip : (number|object)': ['clip'],
                        'order: (number)': ['order'],
                        'stack: (string)': ['stack'],
                        'parsing: (boolean|object)': ['parsing'],
                        'hidden: (boolean)': ['hidden'],
                        '-----options-----': [''],
                        'parsing': ['parsing'],
                        'indexAxis': ['indexAxis'],
                        'plugins {}': ['plugins'],
                        'title': ['title'],
                        'subtitle': ['subtitle'],
                        'display': ['display'],
                        'text': ['text'],
                    },
                    false
                    );
            break
            // FCC 2021/12/14 firebase
        case '%FirebaseQueryConds':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

//                        '---- order by ---- ': [''],
                        'orderBy("name", "desc")': ['orderBy'],
                        'limit(3)': ['limit'],
                    },
                    false
                    );
            break

        case '%FirebaseRelationalOp':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- relational op ---- ': [''],
                        '">" (gt)': ['">"'],
                        '">=" (ge)': ['">="'],
                        '"<" (lt)': ['"<"'],
                        '"<=" (le)': ['"<="'],
                        '== (eq)': ['"=="'],
                        '"!=" (neq)': ['"!="'],
                        'in': ['in'],
                        'not-in': ['not-in'],
//                                'orderBy("name", "desc")': ['orderBy("name", "desc")'],

                        '---- array contains ---- ': [''],
                        'array-contains': ['array-contains'],
                        'array-contains-any': ['array-contains-any'],

//                        '---- order by ---- ': [''],
//                        'orderBy("name", "desc")': ['orderBy("name", "desc")'],
//                        'limit(3)': ['limit(3)'],                        
                    },
                    false
                    );
            break

        case '%FirebaseVariable':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'docData': ['docData'],
                        'queryResult': ['queryResult'],
                        'null': ['null'],
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%FirebaseValueType':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '"string"': ['""'],
                        "'string'": ["' '"],
                        'Timestamp.fromDate(new Date("December 10, 1815"))': ['Timestamp.fromDate(new Date("December 10, 2021"))'],
                        'null': ['null'],
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;
        case '%FirestoreRD':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- doc ---- ': [''],
                        'deleteDoc': ['deleteDoc'],
                        'getDoc': ['getDoc'],
                        'getDocFromServer': ['getDocFromServer'],
                        'getDocFromCache': ['getDocFromCache'],
                        '---- docs ---- ': [''],
                        'getDocs': ['getDocs'],
                        'getDocsFromServer': ['getDocFromServer'],
                        'getDocsFromCache': ['getDocFromCache'],
//                        'deleteDoc': ['deleteDoc'],
//                        'where': ['where'],
//                        'deleteDoc': ['updateDoc'],
                    },
                    false
                    );
            break;

        case '%FirestoreCU':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'setDoc': ['setDoc'],
//                        'addDoc': ['addDoc'],
//                        'getDoc': ['getDoc'], getDocFromCache
//                        'getDocs': ['getDocs'],
//                        'query': ['query'],
//                        'where': ['where'],
                        'updateDoc': ['updateDoc'],
                    },
                    false
                    );
            break;
            // Eric 2021/12/10 firebase
        case '%Firebasedoc':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'id': ['id'],
                        'data()': ['data()'],
                        'exists()': ['exists()'],
                    },
                    false
                    );
            break;
            // Eric 2021/11/10 firebase function
        case '%Firestore':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'getFirestore': ['getFirestore'],
                        'collection': ['collection'],
                        'doc': ['doc'],
                        'setDoc': ['setDoc'],
                        'addDoc': ['addDoc'],
                        'getDoc': ['getDoc'],
                        'getDocs': ['getDocs'],
                        'query': ['query'],
                        'where': ['where'],
                        'updateDoc': ['updateDoc'],
                        'deleteDoc': ['deleteDoc'],
                    },
                    false
                    );
            break;
            // Eric 2021/11/01 Ionic css
            //--Text Alignment--
        case '%IonicText':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-text-{modifier}': ['ion-text-'],
                        'ion-text-sm-{modifier} (min-width: 576px)': ['ion-text-sm-'],
                        'ion-text-md-{modifier} (min-width: 768px)': ['ion-text-md-'],
                        'ion-text-lg-{modifier} (min-width: 992px)': ['ion-text-lg-'],
                        'ion-text-xl-{modifier} (min-width: 1200px)': ['ion-text-xl-'],
                    },
                    false
                    );
            break;
        case '%IonicTextModifier':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'left': ['left'],
                        'right': ['right'],
                        'start': ['start'],
                        'end': ['end'],
                        'center': ['center'],
                        'justify': ['justify'],
                        'wrap': ['wrap'],
                        'nowrap': ['nowrap'],
                        'uppercase': ['uppercase'],
                        'lowercase': ['lowercase'],
                        'capitalize': ['capitalize'],
                    },
                    false
                    );
            break;

        case '%IonicFloatElements':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-float-{modifier}': ['ion-float-'],
                        'ion-float-sm-{modifier} (min-width: 576px)': ['ion-float-sm-'],
                        'ion-float-md-{modifier} (min-width: 768px)': ['ion-float-md-'],
                        'ion-float-lg-{modifier} (min-width: 992px)': ['ion-float-lg-'],
                        'ion-float-xl-{modifier} (min-width: 1200px)': ['ion-float-xl-'],
                    },
                    false
                    );
            break;

        case '%IonicFloatModifier':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'left': ['left'],
                        'right': ['right'],
                        'start': ['start'],
                        'end': ['end'],
                    },
                    false
                    );
            break;

        case '%IonicHide':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-hide': ['ion-hide'],
                        'ion-hide-sm-{dir}': ['ion-hide-sm-'],
                        'ion-hide-md-{dir}': ['ion-hide-md-'],
                        'ion-hide-lg-{dir}': ['ion-hide-lg-'],
                        'ion-hide-xl-{dir}': ['ion-hide-xl-'],
                    },
                    false
                    );
            break;

        case '%IonicHideDir':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'up': ['up'],
                        'down': ['down'],
                    },
                    false
                    );
            break;

        case '%IonicPaddingMargin':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '--Padding--': [''],
                        'ion-padding': ['ion-padding'],
                        'ion-padding-top': ['ion-padding-top'],
                        'ion-padding-start': ['ion-padding-start'],
                        'ion-padding-end': ['ion-padding-end'],
                        'ion-padding-bottom': ['ion-padding-bottom'],
                        'ion-padding-vertical': ['ion-padding-vertical'],
                        'ion-padding-horizontal': ['ion-padding-horizontal'],
                        'ion-no-padding': ['ion-no-padding'],
                        '--Margin--': [''],
                        'ion-margin': ['ion-margin'],
                        'ion-margin-top': ['ion-margin-top'],
                        'ion-margin-start': ['ion-margin-start'],
                        'ion-margin-end': ['ion-margin-end'],
                        'ion-margin-bottom': ['ion-margin-bottom'],
                        'ion-margin-vertical': ['ion-margin-vertical'],
                        'ion-margin-horizontal': ['ion-margin-horizontal'],
                        'ion-no-margin': ['ion-no-margin'],
                    },
                    false
                    );
            break;

        case '%FlexContainer':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-justify-content-start': ['ion-justify-content-start'],
                        'ion-justify-content-end': ['ion-justify-content-end'],
                        'ion-justify-content-center': ['ion-justify-content-center'],
                        'ion-justify-content-around': ['ion-justify-content-around'],
                        'ion-justify-content-between': ['ion-justify-content-between'],
                        'ion-justify-content-evenly': ['ion-justify-content-evenly'],
                        'ion-align-items-start': ['ion-align-items-start'],
                        'ion-align-items-end': ['ion-align-items-end'],
                        'ion-align-items-center': ['ion-align-items-center'],
                        'ion-align-items-baseline': ['ion-align-items-baseline'],
                        'ion-align-items-stretch': ['ion-align-items-stretch'],
                        'ion-nowrap': ['ion-nowrap'],
                        'ion-wrap': ['ion-wrap'],
                        'ion-wrap-reverse': ['ion-wrap-reverse'],
                        'ion-align-self-start': ['ion-align-self-start'],
                        'ion-align-self-end': ['ion-align-self-end'],
                        'ion-align-self-center': ['ion-align-self-center'],
                        'ion-align-self-baseline': ['ion-align-self-baseline'],
                        'ion-align-self-stretch': ['ion-align-self-stretch'],
                        'ion-align-self-auto': ['ion-align-self-auto'],
                        'ion-no-border': ['ion-no-border'],
                    },
                    false
                    );
            break;

            // FCC 2021/10/30 REACT 

            //     <!--<script type= %scriptType src= %srcScript-->  %ReactDOMFunction
//StateHooks

            // react  %ReactPropery
        case '%EffectHook':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'useEffect': ['useEffect'],
                        'useLayoutEffect': ['useLayoutEffect'],
                    },
                    false
                    );
            break
        case '%ContextHook':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'useContext': ['useContext'],
                        'createContext': ['createContext'],
                        'useRef': ['useRef'],
                        'useMemo': ['useMemo'],
                    },
                    false
                    );
            break

        case '%ReactStateValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- number ----': [''],
                        '0': ['0'],
                        '1': ['1'],
                        '---- Array ----': [''],
                        '{key:value}': ['{key:value}'],
                        '{...state, key:value}': ['...state, key:value}'],

                        '---- boolean ----': [''],
                        'true': ['true'],
                        'false': ['false'],

                        '---- function ----': [''],
                        '()=> {return state;}': ['()=> {return state;}'],
//                        'false': ['false'],

                        '---- string ----': [''],
                        '"state"': ['"state"'],

//                        '---- React.Component ----': [''],                              
                    },
                    false
                    );
            break;

        case '%ReactConstant':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- React ----': [''],
                        'props': ['props'],
                        'state': ['state'],
                        'refs': ['refs'],
                        'this.props': ['this.props'],
                        'this.state': ['this.state'],
                        'this.refs': ['this.refs'],
                        '---- React Class ----': [''],
                        'React.Component': ['React.Component'],
                        'React.PureComponent': ['React.PureComponent'],

                        '---- Hook ----': [''],
                        'UserContext.Provider': ['UserContext.Provider'],
//                        'findDOMNode(component)': ["findDOMNode"],  
//                        '---- ReactDOM ----': [''],
//                        "hydrate(element, container[, callback])": ["hydrate"],                        
//                        "render(element, container[, callback])": ["ReactDOM"],
//                        'unmountComponentAtNode(container)': ["unmountComponentAtNode"],                        
                    },
                    false
                    );
            break;

        case '%ReactFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- React Hook  ----': [''],
                        'setState': ['setState'],
                        'dispatch': ['dispatch'],
//                        'findDOMNode(component)': ["findDOMNode"],  
                        '---- ReactDOM ----': [''],
                        'ReactDOM.createRoot(container[, options])': ["ReactDOM.createRoot"],
                        'ReactDOM.hydrateRoot(container, element[, options])': ["ReactDOM.hydrateRoot"],
                        'ReactDOM.createPortal(child, container)': ["ReactDOM.createPortal"],
                        'ReactDOM.findDOMNode(component)': ["ReactDOM.findDOMNode"],
                        "ReactDOM.hydrate(element, container[, callback])": ["ReactDOM.hydrate"],
                        "ReactDOM.render(element, container[, callback])": ["ReactDOM.render"],
                        'ReactDOM.unmountComponentAtNode(container)': ["ReactDOM.unmountComponentAtNode"],
                    },
                    false
                    );
            break;

        case '%ReactDOMFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'createPortal(child, container)': ["findDOMNode"],
                        'findDOMNode(component)': ["findDOMNode"],
                        "hydrate(element, container[, callback])": ["hydrate"],
                        "render(element, container[, callback])": ["render"],
                        'unmountComponentAtNode(container)': ["unmountComponentAtNode"],
                    },
                    false
                    );
            break;

        case '%ReactComponentFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'constructor(props)': ["constructor"],
                        'componentDidMount()': ["componentDidMount"],
                        "componentDidUpdate(prevProps, prevState, snapshot)": ["componentDidUpdate"],
                        'componentWillUnmount()': ["componentWillUnmount"],
                        'static getDerivedStateFromProps(props, state)': ["getDerivedStateFromProps"],
                        'getSnapshotBeforeUpdate(prevProps, prevState)': ["getSnapshotBeforeUpdate"],
                        'render()': ["render"],
                        'shouldComponentUpdate(nextProps, nextState)': ["shouldComponentUpdate"],

                    },
                    false
                    );
            break;

        case '%ReactEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed
//                        ondblclick="myFunction()"
                        '---- html element p ... ----': [''],
//                        'onClick="myFunction()"': ['onClick'],                        
                        'onDoubleClick="myFunction()"': ['DoubleClick'],
                        'onDrag="myFunction(event)': ['onDrag'],
                        'onDragend="myFunction(event)': ['onDragend'],
                        'onDragEnter="myFunction(event)': ['onDragEnter'],
                        'onDragLeave="myFunction(event)': ['onDragLeave'],
                        'onDragOver="myFunction(event)': ['onDragOver'],
                        'onDragStart="myFunction(event)': ['onDragStart'],
                        'onDrop="myFunction(event)': ['onDrop'],

                        'onMouseDown="myFunction()"': ['onMouseDown'],
                        'onMouseEnter="myFunction()"': ['onMouseEnter'],
                        'onMouseLeave="myFunction()"': ['onMouseLeave'],
                        'onMouseMove="myFunction()"': ['onMouseMove'],
                        'onMouseOver="myFunction()"': ['onMouseOver'],
                        'onMouseOut="myFunction()"': ['onMouseOut'],
                        'onMouseUp="myFunction()"': ['onMouseUp'],
                        '---- body ----': [''],
                        'onLoad="myFunction()"': ['onLoad'],
//                        'onload="myFunction()"': ['onload'],                        
                        '---- Button ----': [''],
                        'onClick="myFunction()"': ['onClick'],

                        '---- Input type="text" ----': [''],
                        'onChange="myFunction()""': ['onChange'],
                        'onInput="myFunction()"': ['onInput'],
                        'onKeyDown="myFunction()"': ['onKeyDown'],
                        'onKeyPress="myFunction()"': ['onKeyPress'],
//                        'onKeyDown="myFunction()"': ['onKeyDown'],
                        'onKeyUp="myFunction()"': ['onKeyUp'],

                        'onBlur="myFunction()': ['onBlur'],
                        'onCopy="myFunction()"': ['onCopy'],
                        'onCut="myFunction()"': ['onCut'],
//                        'oncopy="myFunction()"': ['onopy'],
                        'onFocus="myFunction()"': ['onFocus'],
                        'onFocusIn="myFunction()"': ['onFocusIn'],
                        'onFocusOut="myFunction()"': ['onFocusOut'],
                        'onInvalid="myFunction()"': ['onInvalid'],

//                        '---- select ----': [''],
//                        'onChange="myFunction()""': ['onChange'],
                    },
                    false
                    );
            break;

        case '%ReactEventValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed

                        "alert('DomEvent')": ["alert('DomEvent')"],
                        "() => alert('DomEvent')": ["() => alert('DomEvent')"],
                        "consolog.log('DomEvent')": ["consolog.log('DomEvent')"],
                        "() => consolog.log('DomEvent')": ["() => consolog.log('DomEvent')2A"],
                        "myFunction()": ["myFunction()"],
//                        'href="https://reactjs.org"': ["href"],
//                        'onkeydown="myFunction()"': ["alert('onkeydown');"],                        
                    },
                    false
                    );
            break;

        case '%ReactProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'alt={alt}': ["alt"],
                        'className={className}': ['className'],
                        'href={url}': ["href"],
//                        'key={c}': ["key"],
                        'src={logo}': ["src"],
                        'style={{background:color}': ["style"],
                        '---- select ----': [''],
                        'value={value}': ['value'],
                        '---- li ----': [''],
                        'key={index}': ['key'],

                        '---- JSON key of Data  ----': [''],
                        'author': ['author'],
                        'city': ['city'],
                        'content': ['content'],
                        'description': ['description'],
                        'icon': ['icon'],
                        'id': ['id'],
                        'image': ['image'],
                        'link': ['link'],
                        'keyword': ['keyword'],
                        'name': ['name'],
                        'page': ['page'],
                        'subtitle': ['subtitle'],
                        'title': ['title'],
                    },
                    false
                    );
            break;

        case '%ReactPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'boolVar={true}': ['true'],
                        'boolVar={false}': ['false'],
                        '---- select ----': [''],
                        'value={value}': ['value'],
                        '---- li ----': [''],
                        'key={index}': ['index'],
                    },
                    false
                    );
            break;
// React
// DOM
        case '%TagConstant':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- debug ----': [''],
                        'debugger': ['debugger'],

                        '---- Tag attribute----': [''],
                        'isId': ['isId'],
                        'length': ['length'],
                        'name': ['name'],
                        'specified': ['specified'],
                        'value': ['value'],

                        '---- Tag element ----': [''],

                        'attributes': ['attributes'],
                        'attributes.length': ['attributes.length'],
                        'attribute name': ['name'],

                        'childElementCount': ['childElementCount'],
                        'children.length': ['children.length'],
                        'childNodes': ['childNodes'],
                        'childNodes.length': ['childNodes.length'],
                        'children': ['children'],
                        'className': ['className'],
                        'clientHeight': ['clientHeight'],
                        'clientLeft': ['clientLeft'],
                        'clientTop': ['clientTop'],

                        'clientWidth': ['clientWidth'],
                        'contentEditable': ['contentEditable'],
//                        '~': [null],
                        'dir': ['dir'],

                        'firstChild': ['firstChild'],
                        'firstElementChild': ['firstElementChild'],
                        'id': ['id'],
                        'innerHTML': ['innerHTML'],
                        'innerText': ['innerText'],
                        'isContentEditable': ['isContentEditable'],
                        'lang': ['lang'],

                        'lastChild': ['lastChild'],
                        'lastElementChild': ['lastElementChild'],
//                        '~': [null],
                        '---- n Tag element ----': [''],
                        'namespaceURI': ['namespaceURI'],
                        'nextSibling': ['nextSibling'],
                        'nextElementSibling': ['nextElementSibling'],
                        'nodeName': ['nodeName'],
                        'nodeType': ['nodeType'],
                        'nodeValue': ['nodeValue'],
                        'offsetHeight': ['offsetHeight'],
                        'offsetWidth': ['offsetWidth'],

                        'offsetLeft': ['offsetLeft'],
                        'offsetParent': ['offsetParent'],

                        'offsetTop': ['offsetTop'],
                        'outerHTML': ['outerHTML'],
                        'outerText': ['outerText'],
                        'ownerDocument': ['ownerDocument'],
                        'parentNode': ['parentNode'],
                        'parentElement': ['parentElement'],
                        'previousSibling': ['previousSibling'],
                        'previousElementSibling': ['previousElementSibling'],
//                        '~': [null],
                        'scrollHeight': ['scrollHeight'],
                        'scrollLeft': ['scrollLeft'],

                        'scrollTop': ['scrollTop'],
                        'scrollWidth': ['scrollWidth'],
                        'style': ['style'],
                        'style.color': ['style.color'],
                        'style.display': ['style.display'],
                        'tabIndex': ['tabIndex'],
                        'tagName': ['tagName'],
                        'textContent': ['textContent'],
                        'title': ['title'],

                    },
                    false
                    );
            break;

        case '%DomConstant':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- debug ----': [''],
                        'debugger': ['debugger'],

                        '---- document ----': [''],
                        'document.activeElement': ['document.activeElement'],
                        'document.anchors': ['document.anchors'],
                        'document.baseURI': ['document.baseURI'],
                        'document.body': ['document.body'],

                        'document.cookie': ['document.cookie'],
                        'document.doctype': ['document.doctype'],
                        'documentElement': ['documentElement'],
                        'document.documentMode': ['document.documentMode'],
                        'document.documentURI': ['document.documentURI'],
                        'document.domain': ['document.domain'],
                        'document.embeds': ['document.embeds'],

                        'document.forms': ['document.forms'],
                        'document.images': ['document.images'],
                        'document.implementation': ['document.implementation'],
                        'document.inputEncoding': ['document.inputEncoding'],
                        'document.lastModified': ['document.lastModified'],
                        'document.links': ['document.links'],

                        'document.readyState': ['document.readyState'],
                        'document.referrer': ['document.referrer'],
                        'document.scripts': ['document.scripts'],
                        'document.strictErrorChecking': ['document.strictErrorChecking'],
                        'document.title': ['document.title'],
                        'document.URL': ['document.URL'],

                        '---- event ----': [''], // offsetX、clientX、pageX、screenX
                        'event': ['event'],
                        'event.clientX': ['event.clientX'],
                        'event.clientY': ['event.clientY'],
                        'event.offsetX': ['event.offsetX'],
                        'event.offsetY': ['event.offsetY'],
                        'event.pageX': ['event.pageX'],
                        'event.pageY': ['event.pageY'],
                        'event.screenX': ['event.screenX'],
                        'event.screenY': ['event.screenY'],
                        'event.preventDefault': ['event.preventDefault'],
                        'event.target.value': ['event.target.value'],
                        'event.target.files (input file)': ['event.target.files'],
                        'event.dataTransfer.files (Drow file)': ['event.dataTransfer.files'],
//                        'document.activeElement': ['document.activeElement'],

                        '---- file ----': [""],
                        'file.name': ["file.name"],
                        'file.type': ["file.type"],
                        'file.size': ["file.size"],
//
//                        '---- Tag attribute----': [''],
//                        'isId': ['isId'],
//                        'length': ['length'],
//                        'name': ['name'],
//                        'specified': ['specified'],
//                        'value': ['value'],
//
//                        '---- Tag element ----': [''],
//
//                        'attributes': ['attributes'],
//                        'attributes.length': ['attributes.length'],
//                        'attribute name': ['name'],
//
//                        'childElementCount': ['childElementCount'],
//                        'children.length': ['children.length'],
//                        'childNodes': ['childNodes'],
//                        'childNodes.length': ['childNodes.length'],
//                        'children': ['children'],
//                        'className': ['className'],
//                        'clientHeight': ['clientHeight'],
//                        'clientLeft': ['clientLeft'],
//                        'clientTop': ['clientTop'],
//
//                        'clientWidth': ['clientWidth'],
//                        'contentEditable': ['contentEditable'],
////                        '~': [null],
//                        'dir': ['dir'],
//
//                        'firstChild': ['firstChild'],
//                        'firstElementChild': ['firstElementChild'],
//                        'id': ['id'],
//                        'innerHTML': ['innerHTML'],
//                        'innerText': ['innerText'],
//                        'isContentEditable': ['isContentEditable'],
//                        'lang': ['lang'],
//
//                        'lastChild': ['lastChild'],
//                        'lastElementChild': ['lastElementChild'],
////                        '~': [null],
//                        '---- n Tag element ----': [''],
//                        'namespaceURI': ['namespaceURI'],
//                        'nextSibling': ['nextSibling'],
//                        'nextElementSibling': ['nextElementSibling'],
//                        'nodeName': ['nodeName'],
//                        'nodeType': ['nodeType'],
//                        'nodeValue': ['nodeValue'],
//                        'offsetHeight': ['offsetHeight'],
//                        'offsetWidth': ['offsetWidth'],
//
//                        'offsetLeft': ['offsetLeft'],
//                        'offsetParent': ['offsetParent'],
//
//                        'offsetTop': ['offsetTop'],
//                        'outerHTML': ['outerHTML'],
//                        'outerText': ['outerText'],
//                        'ownerDocument': ['ownerDocument'],
//                        'parentNode': ['parentNode'],
//                        'parentElement': ['parentElement'],
//                        'previousSibling': ['previousSibling'],
//                        'previousElementSibling': ['previousElementSibling'],
////                        '~': [null],
//                        'scrollHeight': ['scrollHeight'],
//                        'scrollLeft': ['scrollLeft'],
//
//                        'scrollTop': ['scrollTop'],
//                        'scrollWidth': ['scrollWidth'],
//                        'style': ['style'],
//                        'style.color': ['style.color'],
//                        'tabIndex': ['tabIndex'],
//                        'tagName': ['tagName'],
//                        'textContent': ['textContent'],
//                        'title': ['title'],

                        '---- window ----': [""],
                        'window.innerWidth': ['window.innerWidth'],
                        'window.innerHeight': ['window.innerHeight'],
                        'window.title': ['window.title'],
//                        '---- ReactDOM ----': [''],                              
//                        "hydrate(element, container[, callback])": ["hydrate"],                        
//                        "render(element, container[, callback])": ["ReactDOM"],
//                        'unmountComponentAtNode(container)': ["unmountComponentAtNode"],                        
                    },
                    false
                    );
            break;


        case '%DomDocumentFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed
                        '---- async (Promise) ----': [""],
                        'fetch("https://jsonplaceholder.typicode.com/users")': ['fetch'],
                        'new Promise((resolve, reject) => { })': ['new Promise'],
                        'clearInterval(obj)': ['clearInterval'],
                        'clearTimeout(obj)': ['clearTimeout'],
                        'setInterval(function[, delay, arg1, arg2, ...])': ['setInterval'],
                        'setTimeout(function[, delay, arg1, arg2, ...])': ['setTimeout'],

                        '---- document ----': [""],
                        'document.addEventListener(event, function, useCapture)': ["document.addEventListener"],

                        'document.createElement(element)': ["document.createElement"],
                        'document.getElementById("TagId")': ["document.getElementById"],
                        'document.getElementsByName("TagName")': ["document.getElementsByName"],
                        'document.querySelector("TagName")': ["document.querySelector"],

                        'document.removeChild(element)': ["document.removeChild"],
                        'document.replaceChild(new, old)': ["document.replaceChild"],

                        'document.write(markup)': ["document.write"],
                        'document.writeln(markup)': ["document.writeln"],

                        '---- node/element ----': [""],
                        'node.appendChild(element)': ["node.appendChild"],
                        'node.cloneNode(true)': ["node.cloneNode"],
                        'node.contains(otherNode)': ["node.contains"],
                        'node.getRootNode()': ["node.getRootNode"],

                        'node.hasChildNodes()': ["node.hasChildNodes"],
                        'node.insertBefore(newNode, referenceNode)': ["node.insertBefore"],
                        'node.isEqualNode(otherNode)': ["node.isEqualNode"],
                        'node.isSameNode(otherNode)': ["node.isSameNode"],

                        'node.removeChild(child)': ["node.removeChild"],
                        'node.replaceChild(newChild, oldChild)': ["node.ireplaceChild"],

                        'node.setAttribute(attribute, value)': ["node.setAttribute"],

                        '---- event ----': [""],
                        'event.preventDefault': ["event.preventDefault"],
//                        'JSON.parse(text[, reviver])': ["JSON.parse"],

                        '---- JSON ----': [""],
                        'JSON.stringify(value[, replacer[, space]])': ["JSON.stringify"],
                        'JSON.parse(text[, reviver])': ["JSON.parse"],

                        '---- window ----': [""],
                        'window.addEventListener(event, eventHandler)': ["window.addEventListener"],
                        'window.removeEventListener(event, eventHandler)': ["window.removeEventListener"],
                        'window.localStorage.getItem("user")': ["window.localStorage.getItem"],
                        'window.localStorage.setItem("user", user)': ["window.localStorage.setItem"],
                        'window.onload()': ["window.onload"],
//                        'window.localStorage.setItem("user", user)': ["window.localStorage.setItem],


//                        '---- Dom element ----': [""],
//                        'addEventListener(event, function, useCapture)': ["addEventListener"],
//                        'removeEventListener(event, function, useCapture)': ["removeEventListener"],
//                        'remove()': ["remove"],
                    },
                    false
                    );
            break;

        case '%DomElementFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- Dom element ----': [""],
                        'addEventListener(event, function, useCapture)': ["addEventListener"],
                        'removeEventListener(event, function, useCapture)': ["removeEventListener"],
                        'remove()': ["remove"],
                    },
                    false
                    );
            break;


        case '%PromiseObject':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed

//                        '---- Promise ----': [""],
                        'Promise': ['Promise'],
                        'Response': ['Response'],
//                        'setTimeout(function[, delay, arg1, arg2, ...])': ['setTimeout'],
//                        'unmountComponentAtNode(container)': ["unmountComponentAtNode"],     
//                        '---- Response ----': [""],
//                        'arrayBuffer()': ['arrayBuffer'],
//                        'blob()': ['blob'],
//                        'clone()': ['clone'],
//                        'error()': ['error'],
//                        'formData()': ['formData'],
//                        'json()': ['json'],
//                        'redirect(url, status)': ['redirect'],
//                        'text()': ['text'],                        
                    },
                    false
                    );
            break;


//%PromiseFunction
        case '%PromiseFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed

                        '---- Promise ----': [""],
                        'then( function (message) { ... })': ['then'],
                        'catch( function (message) { ... })': ['catch'],
//                        'setTimeout(function[, delay, arg1, arg2, ...])': ['setTimeout'],
//                        'unmountComponentAtNode(container)': ["unmountComponentAtNode"],     
                        '---- Response ----': [""],
                        'arrayBuffer()': ['arrayBuffer'],
                        'blob()': ['blob'],
                        'clone()': ['clone'],
                        'error()': ['error'],
                        'formData()': ['formData'],
                        'json()': ['json'],
                        'redirect(url, status)': ['redirect'],
                        'text()': ['text'],
                    },
                    false
                    );
            break;

        case '%scriptType':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed
                        '---- JavaScript ----': [""],
                        'type = "text/javascript"': ['type = "text/javascript"'],
                        'type = "text/babel"': ['type = "text/babel"'],
                        'type = "module"': ['type = "module"'],
                        "nomodule": ["nomodule"],

                        '---- Vue ----': [""],
                        "setup": ["setup"],
//                        'onkeypress="myFunction()"': ["alert('onkeypress')"],
//                        'onkeydown="myFunction()"': ["alert('onkeydown');"],                        
                    },
                    false
                    );
            break;

        case '%scriptSrc':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed
                        '---- axios ----': [""],
                        "axios": ["https://unpkg.com/axios/dist/axios.min.js"],
                        '---- react ----': [""],
                        "PubSubJS (pubsub-js.js)": ["https://unpkg.com/pubsub-js"],
//                        '---- react ----': [""],
                        "react.development.js": ["https://unpkg.com/react@18/umd/react.development.js"],
                        "react-dom.development.js": ["https://unpkg.com/react-dom@18/umd/react-dom.development.js"],

                        '---- babel ----': [""],
                        'babel.min.js': ["https://unpkg.com/@babel/standalone/babel.min.js"],
//
                        // Eric 2021/11/02 add firebase
                        '---- firebase ----': [""],
                        'firebase-app': ["https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"],
                        'firebase-database': ["https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"],
//                        'onkeydown="myFunction()"': ["alert('onkeydown');"],    

                        // Eric 2022/01/22 chart
                        '---- chart ----': [""],
                        'chart': ["https://cdn.jsdelivr.net/npm/chart.js"],
                        '---- cordova ----': [""],
                        'cordova.js (mobile only)': ["cordova.js"],

                        '---- MQTT  ----': [""],
                        'mqttws31.js': ["https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js"],
                        '---- Snap  ----': [""],
                        'SnapLoginServer.js': ["https://iot.ttu.edu.tw:9999/ionic/SnapLoginServer.js"],
                        '---- vue3-sfc-loader ----': [""],
                        'vue3-sfc-loader': ["https://cdn.jsdelivr.net/npm/vue3-sfc-loader"],
                        //'VueIonicComponent': ["https://iot.ttu.edu.tw:9999/ionic/VueIonicComponents.js"],
                    },
                    false
                    );
            break;


            // FCC 2021/10/26 HTML DOM 

        case '%DomEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed
//                        ondblclick="myFunction()"
//                        '---- html element p ... ----': [''],

                        'onblur="myFunction()': ['onblur'],

                        'onchange="myFunction()""': ['onchange'],
                        'onclick="myFunction()"': ['onclick'],
                        'oncopy="myFunction()"': ['oncopy'],
                        'oncut="myFunction()"': ['oncut'],

                        'ondblclick="myFunction()"': ['ondbclick'],

                        'ondrag="myFunction(event)': ['ondrag'],
                        'ondragend="myFunction(event)': ['ondragend'],
                        'ondragenter="myFunction(event)': ['ondragenter'],
                        'ondragleave="myFunction(event)': ['ondragleave'],
                        'ondragover="myFunction(event)': ['ondragover'],
                        'ondragstart="myFunction(event)': ['ondragstart'],
                        'ondrop="myFunction(event)': ['ondrop'],

                        '---- f ----': [''],
                        'onfocus="myFunction()"': ['onfocus'],
                        'onfocusin="myFunction()"': ['onfocusin'],
                        'onfocusout="myFunction()"': ['onfocusout'],

                        'oninput="myFunction()"': ['oninput'],
                        'oninvalid="myFunction()"': ['oninvalid'],

                        'onkeydown="myFunction()"': ['onkeydown'],
                        'onkeypress="myFunction()"': ['onkeypress'],
                        'onkeyup="myFunction()"': ['onkeyup'],

                        'onload="myFunction()"': ['onload'],

                        '---- m ----': [''],
                        'onmousedown="myFunction()"': ['onmousedown'],
                        'onmouseenter="myFunction()"': ['onmouseenter'],
                        'onmouseleave="myFunction()"': ['onmouseleave'],
                        'onmousemove="myFunction()"': ['onmousemove'],
                        'onmouseover="myFunction()"': ['onmouseover'],
                        'onmouseout="myFunction()"': ['onmouseout'],
                        'onmouseup="myFunction()"': ['onmouseup'],
                    },
                    false
                    );
            break;
        case '%DomEventValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        // FCC to be completed

                        "alert(message)": ['"alert(`message`)"'],
                        "consolog.log(message')": ['"console.log(`message`)"'],
                        "callMyFunction()": ['"callMyFunction()"'],
//                        'onkeypress="myFunction()"': ["alert('onkeypress')"],
//                        'onkeydown="myFunction()"': ["alert('onkeydown');"],                        
                    },
                    false
                    );
            break;

// FCC 2021/08/12 PhpMySQL 

// %PDOObject -> %PDOFunction

        case '%PDO_dsn':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- MySQL ----': [''],
                        '"mysql:host=localhost;port=3306;dbname=db"': ['"mysql:host=localhost;port=3306;dbname=db"'],
                        '"mysql:host=$host;port=$port;dbname=$dbname"': ['"mysql:host=$host;port=$port;dbname=$dbname"'],

                        '---- PostgreSQL ----': [''],
                        '"pgsql:host=localhost;port=3306;dbname=db"': ['"pgsql:host=localhost;port=3306;dbname=db"'],
                        '"pgsql:host=$host;port=$port;dbname=$dbname";': ['"pgsql:host=$host;port=$port;dbname=$dbname"'],

                    },
                    false
                    );
            break;


        case '%PDOObject':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- pdo ----': [''],
                        '$pdo': ['$pdo'],

                        '---- query ----': [''],
                        '$query': ['$query'],
                    },
                    false
                    );
            break;


        case '%PDOFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- pdo ----': [''],
                        'beginTransaction()': ['beginTransaction'],
                        'commit()': ['commit'],
                        'errorCode()': ['errorCode'],
                        'errorInfo()': ['errorInfo'],
                        'exec(string $statement)': ['exec'],
                        'getAttribute(int $attribute)': ['getAttribute'],
                        'getAvailableDrivers()': ['getAvailableDrivers'],
                        'inTransaction()': ['inTransaction'],
                        'lastInsertId(string $name = null)': ['lastInsertId'],
                        'prepare(string $statement, array $driver_options = array())': ['prepare'],

                        'query($sql)': ['query'],
                        'query(string $statement, int $PDO::FETCH_COLUMN, int $colno)': ['query'],

                        'quote(string $string, int $parameter_type = PDO::PARAM_STR)': ['quote'],
                        'rollBack()': ['rollBack'],
                        'setAttribute(int $attribute, mixed $value)': ['setAttribute'],
//                        'commit()': ['commit'],
//                        'commit()': ['commit'],

                        '---- query ----': [''],
                        'bindColumn(mixed $column,mixed &$param, int $type = ?, int $maxlen = ?, mixed $driverdata = ?)()': ['bindColumn'],
                        'bindParam(mixed $parameter, mixed &$variable,int $data_type = PDO::PARAM_STR, int $length = ?, mixed $driver_options = ?)()': ['bindParam'],
                        'bindValue(mixed $parameter, mixed $value, int $data_type = PDO::PARAM_STR)': ['bindValue'],
                        'closeCursor()': ['closeCursor'],
                        'columnCount()': ['columnCount'],
                        'debugDumpParams()': ['debugDumpParams'],
                        'errorCode() same as PDO': ['errorCode'],
                        'errorInfo() same as PDO': ['errorInfo'],
                        'execute(array $input_parameters = ?)': ['execute'],
                        'fetch(int $fetch_style = ?, int $cursor_orientation = PDO::FETCH_ORI_NEXT, int $cursor_offset = 0)': ['fetch'],
                        'fetchAll(int $fetch_style = ?, mixed $fetch_argument = ?, array $ctor_args = array())': ['fetchAll'],
                        'fetchColumn(int $column_number = 0)': ['fetchColumn'],
                        'fetchObject(string $class_name = "stdClass", array $ctor_args = ?)': ['fetchObject'],
                        'getAttribute(int $attribute) Query attributes': ['getAttribute'],
                        'getColumnMeta(int $column)': ['getColumnMeta'],
                        'getIterator()': ['getIterator'],
                        'nextRowset()': ['nextRowset'],
                        'rowCount()': ['rowCount'],
                        'setFechMode(PDO::FETCH_ASSOC)': ['setFechMode(PDO::FETCH_ASSOC)'],
                        'setAttribute(int $attribute, mixed $value) Query attributes': ['setAttribute'],
                        'setFetchMode(int $mode)': ['setFetchMode'],
                        'setFetchMode(int $PDO::FETCH_COLUMN, int $colno)': ['setFetchMode'],
                        'setFetchMode(int $PDO::FETCH_CLASS, string $classname, array $ctorargs)': ['setFetchMode'],
                        'setFetchMode(int $PDO::FETCH_INTO, object $object)': ['setFetchMode'],
//                        'commit()': ['commit'],




                    },
                    false
                    );
            break;

        case '%PhpGlobalVariable':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- HTTP ----': [''],
                        '$_POST — HTTP POST variables': ['$_POST'],
                        '$_GET — HTTP GET variables': ['$_GET'],
                        '$_FILES — HTTP File Upload variables': ['$_FILES'],
                        '$_REQUEST — HTTP Request variables': ['$_REQUEST'],
                        '$_COOKIE — HTTP Cookies': ['$_COOKIE'],
                        '$_SESSION — Session variables': ['$_SESSION'],
                        '$http_response_header ': ['$http_response_header '],
//                        '$_SESSION — Session variables': ['$_SESSION'],
//                        '$argv — Array of arguments passed to script': ['$argv'], 
                        '---- PHP ----': [''],
                        '$_SERVER — Server and execution environment information': ['$_SERVER'],

                        '$_ENV — Environment variables': ['$_ENV'],
                        '$argc — The number of arguments passed to script': ['$argc'],
                        '$argv — Array of arguments passed to script': ['$argv'],
                        '$GLOBALS — References all variables available in global scope': ['$GLOBALS'],
                        '$php_errormsg — The previous error message': ['$php_errormsg'],
                    },
                    false
                    );
            break;

        case '%PhpSqlAlterTable':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- update fields ----': [''],
                        'ADD field type': ['ADD'],
//                        'DROP COLUMN field': ['DROP COLUMN'],
                        'DROP COLUMN field': ['DROP COLUMN'],
                        'MODIFY COLUMN field type': ['MODIFY COLUMN'],
                        '---- update constraint ----': [''],
                        'ADD CONSTRAINT': ['ADD CONSTRAINT'],
                        'DROP CONSTRAINT': ['DROP CONSTRAINT'],
                        '---- SQL INDEX  ----': [''],
                        'ADD INDEX indexName(ID)': ['ADD INDEX'],
                        'ADD UNIQUE (ID)': ['ADD UNIQUE'],
                        'DROP INDEX indexName': ['DROP INDEX'],
                    },
                    false
                    );
            break;

        case '%PhpBuiltInFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- PHP Array ----': [''],


                        '---- PHP include/require ----': [''],
                        'include': ['include'],
                        'include_once': ['include_once'],
                        'require': ['require'],
                        'require_once': ['require_once'],
//                        'include': ['include'],
//                        'require_once': ['require_once'],

                        '---- PHP section ----': [''],
                        'session_start()': ['session_start'],
                        'session_destroy() -- destroy the session': ['session_destroy'],
                        'session_unset() -- remove all session variables': ['session_unset'],
                        'session_id()': ['session_id'],

                        '---- PHP Network/HTTP ----': [''],
                        'header("Location: https://iot.ttu.edu.tw/")': ['header'],
                        'header("Location: login.php?msg=loggin fail")': ['header'],
                        'setcookie("keyName",$value, time()+3600*24);': ['setcookie'],

                        '---- PHP connection ----': [''],
                        'connection_aborted() -- Check whether client disconnected ': ['connection_aborted'],
                        'connection_status() -- Returns connection status ': ['connection_status'],
                        'connection_timeout() -- Returns connection status ': ['connection_timeout'],

                        '---- PHP constant ----': [''],
                        'constant(constant)': ['constant'],
                        'define(name,value [,case_insensitive])': ['define'],
                        'defined(name)': ['defined'],

//                        'defined(name)],
                        '---- PHP built-in function ----': [''],
                        'die(message)': ['die'],
                        'echo(message)': ['echo'],
                        'eval(phpcode)': ['eval'],
                        'exit(message)': ['exit'],
                        'phpinfo([INFO_ALL|INFO_GENERAL|INFO_VARIABLES|...])': ['phpinfo'],
                        
                        '---- PHP print function ----': [''],
                        'print(message)': ['print'],
                        'print_r(array)': ['print_r'],
                        'var_dump(array)': ['var_dump'],
//                        '---- PHP ----': [''],      __halt_compiler()
//                        'get_browser(user_agent,return_array)': ['get_browser'],
//                        '__halt_compiler()': ['__halt_compiler'],
//                        'highlight_file(filename[,T/F])': ['highlight_file'],
//
//                        'highlight_string(string[,T/F])': ['highlight_string'],
//                        'hrtime(return_as_num) — high resolution time': ['hrtime'],
//                        'ignore_user_abort([T/F])': ['ignore_user_abort'],
//                        'pack(format,args+) — packs data into a binary string': ['pack'],
//                        'php_strip_whitespace(filename)': ['php_strip_whitespace'],
//                        'show_source(filename[,T/F])': ['show_source'],
                        'sleep(seconds)': ['sleep'],

//                        'sys_getloadavg()': ['sys_getloadavg'],
//
//                        'time_nanosleep(seconds,nanoseconds)': ['time_nanosleep'],
//                        'time_sleep_until(timestamp)': ['time_sleep_until'],
//                        'uniqid([prefix],more_entropy]) — generates a unique ID': ['uniqid'],
//                        'unpack(format,data) — uppacks data from a binary string': ['uppack'],
//                        'usleep(microseconds)': ['usleep'],
                        'unset($var)': ['unset'],
                        
                        '---- PHP FileSystem function ----': [''],                        
                        'move_uploaded_file(file, dest)': ['move_uploaded_file'],
                        
                        '---- MySQL ----': [''],
                        'mysqli_affected_rows(connection)': ['mysqli_affected_rows'],
                        'mysqli_autocommit(connection, mode)': ['mysqli_autocommit'],
                        'mysqli_change_user(connection, username, password, dbname)': ['mysqli_change_user'],
                        'mysqli_character_set_name(connection)': ['mysqli_character_set_name'],
                        'mysqli_close(connection)': ['mysqli_close'],
                        'mysqli_commit(connection, flags, name)': ['mysqli_commit'],
                        'mysqli_connect(host, username, password, dbname, port, socket)': ['mysqli_connect'],
                        'mysqli_connect_errno()': ['mysqli_connect_errno'],
                        'mysqli_connect_error()': ['mysqli_connect_error'],
                        'mysqli_num_rows($queryResult)': ['mysqli_num_rows'],
                        'mysqli_free_result($queryResult)': ['mysqli_free_result'],
                        'mysqli_debug("d:t:o,debug.trace")': ['mysqli_debug'],

                        'mysqli_data_seek(result,offset)': ['mysqli_data_seek'],
                        'mysqli_dump_debug_info(link)': ['mysqli_dump_debug_info'],

                        'mysqli_errno(connection)': ['mysqli_errno'],
                        'mysqli_error(connection)': ['mysqli_error'],
                        'mysqli_error_list(connection)': ['mysqli_error_list'],
                        'mysqli_fetch_all(result, resulttype)': ['mysqli_fetch_all'],
                        'mysqli_fetch_array(result,resulttype)': ['mysqli_fetch_array'],
                        'mysqli_fetch_assoc(result)': ['mysqli_fetch_assoc'],
                        'sqli_fetch_field(result)': ['sqli_fetch_field'],
                        'mysqli_fetch_field_direct(result, fieldnr)': ['mysqli_fetch_field_direct'],
                        'mysqli_fetch_fields(result)': ['mysqli_fetch_fields'],
                        'mysqli_fetch_lengths(result)': ['mysqli_fetch_lengths'],
                        'mysqli_fetch_object(result, classname, params)': ['mysqli_fetch_object'],
                        'mysqli_fetch_row(result)': ['mysqli_fetch_row'],
                        'mysqli_field_count(connection)': ['mysqli_field_count'],
                        'mysqli_field_seek(result, fieldnr)': ['mysqli_field_seek'],
                        'mysqli_get_charset(connection)': ['mysqli_get_charset'],
                        'mysqli_get_client_info(connection)': ['mysqli_get_client_info'],
                        'mysqli_get_client_stats()': ['mysqli_get_client_stats'],
                        'mysqli_get_client_version(connection)': ['mysqli_get_client_version'],
                        'mysqli_get_connection_stats(connection)': ['mysqli_get_connection_stats'],

                        'mysqli_get_host_info(connection)': ['mysqli_get_host_info'],
                        'mysqli_get_proto_info(connection)': ['mysqli_get_proto_info'],
                        'mysqli_get_server_info(connection)': ['mysqli_get_server_info'],
                        'mysqli_get_server_version(connection)': ['mysqli_get_server_version'],
                        'mysqli_info(connection)': ['mysqli_info'],
                        'mysqli_init()': ['mysqli_init'],
                        'mysqli_insert_id(connection)': ['mysqli_insert_id'],
                        'mysqli_kill(connection, processid)': ['mysqli_kill'],
                        'mysqli_more_results(connection)': ['mysqli_more_results'],

                        'mysqli_multi_query(connection, query)': ['mysqli_multi_query'],
                        'mysqli_next_result(connection)': ['mysqli_next_result'],
                        'mysqli_options(connection, option, value)': ['mysqli_options'],
                        'mysqli_ping(connection)': ['mysqli_ping'],
                        'mysqli_poll(read, error, reject, seconds, microseconds)': ['mysqli_poll'],
                        'mysqli_query(connection, query, resultmode)': ['mysqli_query'],
                        'mysqli_real_connect(connection, host, username, password, dbname, port, socket, flag)': ['mysqli_real_connect'],
                        'mysqli_real_escape_string(connection, escapestring)': ['mysqli_real_escape_string'],
                        'mysqli_real_query(connection, query)': ['mysqli_real_query'],
                        'mysqli_reap_async_query(connection)': ['mysqli_reap_async_query'],
                        'mysqli_refresh(connection, options)': ['mysqli_refresh'],
                        'mysqli_rollback(connection, flags, name)': ['mysqli_rollback'],
                        'mysqli_select_db(connection, name)': ['mysqli_select_db'],
                        'mysqli_set_charset(connection, charset)': ['mysqli_set_charset'],
                        'mysqli_set_local_infile_handler(read_file)': ['mysqli_set_local_infile_handler'],
                        'mysqli_sqlstate(connection)': ['mysqli_sqlstate'],
                        'mysqli_ssl_set(connection, key, cert, ca, capath, cipher)': ['mysqli_ssl_set'],
                        'mysqli_stat(connection)': ['mysqli_stat'],
                        'mysqli_stmt_init(connection)': ['mysqli_stmt_init'],
                        'mysqli_thread_id(connection)': ['mysqli_thread_id'],
                        'mysqli_thread_safe()': ['mysqli_thread_safe'],
                        'mysqli_use_result(connection)': ['mysqli_use_result'],
                        'mysqli_warning_count(connection)': ['mysqli_warning_count'],

                        '---- SQL Injection ---- ': [''],
                        'mysqli_prepare($dbConnect,$SQLStatement)': ['mysqli_prepare'],
                        'mysqli_stmt_bind_param($stmt,"i(int)d(double)s(string)b(blob)",...)': ['mysqli_stmt_bind_param'],
                        'mysqli_stmt_bind_result($stmt,...)': ['mysqli_stmt_bind_result'],
                        'mysqli_stmt_execute($stmt)': ['mysqli_stmt_execute'],
                        'mysqli_stmt_fetch($stmt)': ['mysqli_stmt_fetch'],
                        'mysqli_stmt_close()': ['mysqli_stmt_close'],
                    },
                    false
                    );
            break;


        case '%PhpBuiltInFunction2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP comments ----': [''],
                        '//': ['//'],
                        '#': ['#'],
                        '/*': ['/*'],
                        '*/': ['*/'],
                        '---- PHP Print ----': [''],
                        'echo message': ['echo'],
                        '---- PHP include/require ----': [''],                        
                        'include': ['include'],
                        'include_once': ['include_once'],
                        'require': ['require'],
                        'require_once': ['require_once'],
                        '---- PHP variable scope ----': [''],
                        'global $var': ['global'],                        
                        'static $var': ['static'],   
                    },
                    false
                    );
            break;

        case '%PhpBuiltInFunctionArray':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP Array ----': [''],
                        'array(value1,value2,value3,etc.)': ['array'],
                        'array(key=>value,key=>value,key=>value,etc.);': ['array'],
                        'array_change_key_case(array,CASE_LOWER|CASE_UPPER)': ['array_change_key_case'],
                        'array_chunk(array,size,preserve_key': ['array_chunk'],
                        'array_column(array,column_key,index_key)': ['array_column'],
                        'array_combine(keys,values);': ['array_combine'],
                        'array_count_values(array)': ['array_count_values'],
                        'array_diff(array1,array2,array3...) value only': ['array_diff'],
                        'array_diff_assoc(array1,array2,array3...) key+value': ['array_diff_assoc'],
                        'array_diff_uassoc(array1,array2,array3...,myfunction)': ['array_diff_uassoc'],
                        'array_diff_ukey(array1,array2,array3...,myfunction)': ['array_diff_ukey'],
                        'array_fill(index,number,value)': ['array_fill'],
                        'array_fill_keys(keys,value)': ['array_fill_keys'],
                        'array_filter(array,callbackfunction);': ['array_filter'],
                        'array_flip(array)': ['array_flip'],
                        'array_intersect(array1,array2,array3...) value only': ['array_intersect'],
                        'array_intersect_uassoc(array1,array2,array3...,myfunction) key+value': ['array_intersect_uassoc'],
                        'array_intersect_key(array1,array2,array3...) key only': ['array_intersect_key'],
                        'array_key_exists(key,array)': ['array_key_exists'],
                        'array_map(myfunction,array1,array2,array3...)': ['array_map'],
                        'array_merge(array1,array2,array3...)': ['array_merge'],
                        'array_merge_recursive(array1,array2,array3...)': ['array_merge_recursive'],
                        'array_multisort(array1 [, SORT_ASC|SORT_DESC,SORT_REGULAR|SORT_NUMERIC|SORT_STRING,array2,array3...])': ['array_multisort'],
                        'array_pad(array,size,value)': ['array_pad'],
                        'array_pop()': ['array_pop'],
                        'array_product(array)': ['array_product'],
                        'array_push(array,value1,value2...)': ['array_push'],
                        'array_rand(array,number)': ['array_rand'],
                        'array_reduce(array,myfunction,initial)': ['array_reduce'],
                        'array_replace(array1,array2,array3...)': ['array_replace'],
                        'array_replace_recursive(array1,array2,array3...)': ['array_replace_recursive'],
                        'array_reverse(array,preserve)': ['array_reverse'],
                        'array_search(value,array,strict)': ['array_search'],
                        'array_shift(array)': ['array_shift'],
                        'array_splice(array,start,length,array)': ['array_splice'],
                        'array_sum(array)': ['array_sum'],
                        'array_udiff(array1,array2,array3...,myfunction)': ['array_udiff'],
                        'array_udiff_assoc(array1,array2,array3...) key+value': ['array_udiff_assoc'],
                        'array_udiff_uassoc(array1,array2,array3...,myfunction)': ['array_udiff_uassoc'],
                        'array_uintersect(array1,array2,array3...,myfunction)': ['array_uintersect'],
                        'array_uintersect_assoc(array1,array2,array3...,myfunction)': ['array_uintersect_assoc'],
                        'array_uintersect_uassoc(array1,array2,array3...,myfunction)': ['array_uintersect_uassoc'],
                        'array_unique(array)': ['array_unique'],
                        'array_unshift(array,value1,value2,value3...)': ['array_unshift'],
                        'array_values(array)': ['array_values'],
                        'array_walk(array,myfunction,userdata...)': ['array_walk'],
                        'array_walk_recursive(array,myfunction,parameter...)': ['array_walk_recursive'],
                        'arsort(array,sortingtype);': ['arsort'],
                        'asort(array,sortingtype);': ['asort'],
                        'compact(var1,var2...)': ['compact'],
                        'count(array [,mode])': ['count'],
                        'current(array) in loop': ['current'],
                        'each(array) in loop': ['each'],
                        'end(array)': ['require'],
                        'extract(array,extract_rules,prefix)': ['extract'],
                        'in_array(search,array,type)': ['in_array'],
                        'key(array)': ['key'],
                        'krsort(array,sortingtype);': ['krsort'],
                        'list(var1,var2...)': ['list'],
                        'natcasesort(array)': ['natcasesort'],
                        'natsort(array)': ['natsort'],
                        'next(array) in loop': ['next'],
                        'pos(array)': ['pos'],
                        'prev(array) in loop': ['prev'],
                        'range(low,high [,step])': ['range'],
                        'reset(array)': ['reset'],
                        'rsort(array,sortingtype);': ['rsort'],
                        'shuffle(array)': ['shuffle'],
                        'sizeof(array [,mode])': ['sizeof'],
                        'sort(array,sortingtype);': ['sort'],
                        'uasort(array,myfunction)': ['uasort'],
                        'uksort(array,myfunction)': ['uksort'],
                        'usort(array,myfunction)': ['usort'],

                    },
                    false
                    );
            break;


//
        case '%PhpBuiltInFunctionCalendarDate':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP Date ----': [''],
                        'date(format,timestamp)': ['date'],
                        'date("Y/m/d")': ['date'],
                        'date("l")': ['date'],

                        '---- PHP Calendar ----': [''],
                        'cal_days_in_month(calendar,month,year)': ['cal_days_in_month'],
                        'cal_from_jd(jd,calendar)': ['cal_from_jd'],
                        'cal_info([0 = CAL_GREGORIAN|1 = CAL_JULIAN|2 = CAL_JEWISH|3 = CAL_FRENCH])': ['cal_info'],
                        'cal_to_jd(calendar,month,day,year)': ['cal_to_jd'],
                        'easter_date([year])': ['easter_date'],
                        'easter_days([year,method])': ['easter_days'],
                        'frenchtojd(month,day,year)': ['frenchtojd'],
                        'gregoriantojd(month,day,year)': ['gregoriantojd'],
                        'jddayofweek(jd [,mode:0~2])': ['jddayofweek'],
                        'jdmonthname(jd [,mode:0~5)': ['jdmonthname'],
                        'jdtofrench(jd)': ['jdtofrench'],
                        'jdtogregorian(jd)': ['jdtogregorian'],
                        'jdtojewish(jd[,hebrew,fl])': ['jdtojewish'],
                        'jdtojulian(jd)': ['jdtojulian'],
                        'jdtounix(jd)': ['jdtounix'],
                        'jewishtojd(month,day,year)': ['jewishtojd'],
                        'juliantojd(month,day,year)': ['juliantojd'],
                        'unixtojd(timestamp)': ['unixtojd'],

                    },
                    false
                    );
            break;

        case '%PhpBuiltInFunctionDirectory':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP Directory ----': [''],
                        'chdir(directory)': ['chdir'],
                        'chroot(directory)': ['chroot'],
                        'closedir([dir_handle])': ['closedir'],
                        'dir(directory [,context])': ['dir'],
                        'getcwd()': ['getcwd'],
                        'opendir(directory [,context])': ['opendir'],
                        'readdir(dir_handle)': ['readdir'],
                        'rewinddir(dir_handle)': ['rewinddir'],
                        'scandir(directory [,sorting_order,context])': ['scandir'],

                    },
                    false
                    );
            break;


        case '%PhpBuiltInFunctionFilesystem':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP Filesystem ----': [''],

                        'basename(path [,suffix])': ['basename'],
                        'chgrp(file [,group])': ['chgrp'],
                        'chmod(file,mode)': ['chmod'],
                        'chown(file,owner)': ['chown'],
                        'clearstatcache()': ['clearstatcache'],
                        'copy(source,destination)': ['copy'],
                        'dirname(path)': ['dirname'],
                        'disk_free_space(directory)': ['disk_free_space'],
                        'disk_total_space(directory)': ['disk_total_space'],
                        'diskfreespace(directory)': ['diskfreespace'],
                        'fclose(file)': ['fclose'],
                        'feof(file)': ['feof'],
                        'fflush(file)': ['fflush'],
                        'fgetc(file)': ['fgetc'],
                        'fgetcsv(file, length, separator, enclosure)': ['fgetcsv'],
                        'fgets(file, length)': ['fgets'],
                        'fgetss(file, length, tags)': ['fgetss'],
                        'file(filename, flag, context)': ['file'],
                        'file_exists(path)': ['file_exists'],
                        'file_get_contents(path, include_path, context, start, max_length)': ['file_get_contents'],
                        'file_put_contents(filename, data, mode, context)': ['file_put_contents'],
                        'fileatime(filename)': ['fileatime'],
                        'filectime(filename)': ['filectime'],
                        'filegroup(filename)': ['filegroup'],
                        'fileinode(filename)': ['fileinode'],
                        'filemtime(filename)': ['filemtime'],
                        'fileowner(filename)': ['fileowner'],
                        'fileperms(filename)': ['fileperms'],
                        'filesize(filename)': ['filesize'],
                        'filetype(filename)': ['filetype'],
                        'flock(file, lock, block)': ['flock'],
                        'fnmatch(pattern, string, flags)': ['fnmatch'],
                        'fopen(filename, mode [, include_path, context])': ['fopen'],
                        'fpassthru(file)': ['fpassthru'],
                        'fputcsv(file, fields, separator, enclosure, escape)': ['fputcsv'],
                        'fputs(file, string, length))/fwrite()': ['fputs'],
                        'fread(file, length)': ['fread'],
                        'fscanf(file, format [, mixed])': ['fscanf'],
                        'fseek(file, offset [, whence])': ['fseek'],
                        'fstat(file': ['fstat'],
                        'ftell(file)': ['ftell'],
                        'ftruncate(file, size)': ['ftruncate'],
                        'fwrite(file, string, length)': ['fwrite'],
                        'glob(pattern, flags)': ['glob'],
                        'is_dir(file)': ['is_dir'],
                        'is_executable(file)': ['is_executable'],
                        'is_file(file)': ['is_file'],
                        'is_link(file)': ['is_link'],
                        'is_readable(file)': ['is_readable'],
                        'is_uploaded_file(file)': ['is_uploaded_file'],
                        'is_writable(file)': ['is_writable'],
                        'lchgrp(file, group))': ['lchgrp'],
                        'lchown(file, group)': ['lchown'],
                        'link(target, link)': ['link'],

                        'linkinfo(path)': ['linkinfo'],
                        'lstat(filename)': ['lstat'],
                        'mkdir(path [, mode, recursive, context])': ['mkdir'],
                        'move_uploaded_file(file, dest)': ['move_uploaded_file'],
                        'parse_ini_file(file [, process_sections, scanner_mode])': ['parse_ini_file'],
                        'parse_ini_string(ini [, process_sections, scanner_mode])': ['parse_ini_string'],
                        'pathinfo(path [, options])': ['pathinfo'],
                        'pclose(pipe)': ['pclose'],
                        'popen(command, mode)': ['popen'],
                        'readfile(file [, include_path, context])': ['readfile'],
                        'readlink(linkpath)': ['readlink'],
                        'realpath(path)': ['realpath'],
                        'realpath_cache_get()': ['realpath_cache_get'],
                        'realpath_cache_size()': ['realpath_cache_size'],
                        'rename(old, new, context)': ['rename'],
                        'rewind(file)': ['rewind'],
                        'rmdir(dir, context)': ['rmdir'],
                        'set_file_buffer(file, buffer)': ['set_file_buffer'],
                        'stat(filename)': ['stat'],
                        'symlink(target, link)': ['symlink'],
                        'tempnam(dir, prefix)': ['tempnam'],
                        'tmpfile()': ['tmpfile'],
                        'touch(filename, time, atime)': ['touch'],
                        'umask(mask)': ['umask'],
                        'unlink(filename [, context])': ['unlink'],
//                        'ech': ['echo'],                        
                    },
                    false
                    );
            break;

// FCC to be complted
        case '%PhpBuiltInFunctionFTP':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP FTP ----': [''],
                        'ftp_connect(host, port, timeout)': ['ftp_connect'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        
//                        
                        '---- PHP Network ----': [''],
                        'checkdnsrr(host, type)': ['checkdnsrr'],
                        'closelog()': ['closelog'],
                        'dns_check_record(host, type)': ['dns_check_record'],
                        'dns_get_mx(host, mxhosts, weight)': ['dns_get_mx'],
                        'dns_get_record(hostname, type, authns, addtl, raw)': ['dns_get_record'],
                        'fsockopen(hostname [, port, errno, errstr, timeout) opens a socket connection])': ['fsockopen'],
                        'gethostbyaddr(ipaddress)': ['gethostbyaddr'],
                        'gethostbyname(hostname "iot.ttu.edu.tw")': ['gethostbyname'],
                        'gethostbynamel(hostname) returns a list of IPs': ['gethostbynamel'],
                        'gethostname()': ['gethostname'],
                        'getmxrr(host, mxhosts [, weight]) returns the MX records for the specified internet host name': ['getmxrr'],
                        'getprotobyname(protocolname)': ['getprotobyname'],
                        'getprotobynumber(protocolnumber)': ['getprotobynumber'],
                        'getservbyname(service, protocol)': ['getservbyname'],
                        'getservbyport(port, protocol)': ['getservbyport'],
                        
                        '---- h PHP Network ----': [''],
                        'header_register_callback(callback)': ['header_register_callback'],
                        'header_remove(headername)  removes an HTTP header previously set ': ['header_remove'],
                        'header(header [,replace ,http_response_code])': ['header'],
                        'header("Location: http://www.example.com/")': ['header'],
                        'header("Location: login.php?msg=loggin fail")': ['header'],
                        'header("Content-type: text/plain");': ['header'],
                        'headers_list()': ['headers_list'],
                        'headers_sent([file,line])': ['headers_sent'],
                        'http_response_code(code)': ['http_response_code'],
                        'inet_ntop(address) converts an IPv4 or 128bit IPv6 address': ['inet_ntop'],
                        'inet_pton(address)': ['inet_pton'],
                        'ip2long(address) converts an IPv4 address into a long integer': ['ip2long'],
                        'long2ip(address)': ['long2ip'],
                        'openlog(ident, option, facility) opens the connection of system logger.': ['openlog'],
                        'pfsockopen(hostname [, port, errno, errstr, timeout]) opens a socket connection': ['pfsockopen'],

                        'setcookie(name,value [,expire,path,domain,secure, httponly])': ['setcookie'],
                        'setcookie("keyName",$value, time()+3600*24);': ['setcookie'],
                        'setrawcookie(name, value, expire, path, domain, secure);': ['setrawcookie'],
                        'socket_get_status()/stream_get_meta_data()': ['socket_get_status'],
                        'socket_set_blocking()/stream_get_meta_data() ': ['socket_set_blocking'],
                        'socket_set_timeout()/stream_get_meta_data() ': ['socket_set_timeout'],
                        'syslog(priority, message)  generates a system log message': ['syslog'],
                      
                    },
                    false
                    );
            break;

        case '%PhpBuiltInFunctionJSON':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP JSON ----': [''],
                        'json_decode(string [, assoc, depth, options])': ['json_decode'],
                        'json_encode(value [, options, depth])': ['json_encode'],
                        'json_last_error()': ['json_last_error'],
                        'json_last_error_msg()': ['json_last_error_msg'],
                        '---- PHP Mail ----': [''],
                        'ezmlm_hash(address);': ['ezmlm_hash'],
                        'mail(to,subject,message [,headers,parameters]);': ['mail'],

                        '---- PHP Variable Handling l ----': [''],
                        'boolval(variable)': ['boolval'],
                        'debug_zval_dump(variable)': ['debug_zval_dump'],
                        'doubleval(variable)': ['doubleval'],
                        'is_countable(variable)': ['is_countable'],
                        'empty(variable)': ['empty'],
                        'floatval(variable)': ['floatval'],
                        'get_defined_vars()': ['get_defined_vars'],
                        'get_resource_type(resource)': ['get_resource_type'],
                        'gettype(variable)': ['gettype'],
                        'intval(variable [, base])': ['intval'],
                        'is_array(variable)': ['is_array'],
                        'is_bool(variable)': ['is_bool'],
                        'is_callable(variable, syntax_only, name )': ['is_callabl'],
                        'is_double(variable)': ['is_double'],
                        'is_float(variable)': ['is_float'],
                        'is_int(variable)': ['is_int'],
                        'is_integer(variable)': ['is_integer'],
                        'is_iterable(variable)': ['is_iterable'],

                        'is_long(variable)': ['is_long'],
                        'is_null(variable)': ['is_null'],
                        'is_numeric(variable)': ['is_numeric'],
                        'is_object(variable)': ['is_object'],
                        'is_real(variable)': ['is_real'],

                        'is_resource(variable)': ['is_resource'],
                        'is_scalar(variable)': ['is_scalar'],
                        'is_string(variable)': ['is_string'],
                        'isset(variable [, ....])': ['isset'],
                        'print_r(variable, return)': ['print_r'],

                        'serialize(value)': ['serialize'],
                        'settype(variable, type)': ['settype'],
                        'strval(variable)': ['strval'],
                        'unserialize(string, options)': ['unserialize'],
                        'unset(variable, ....)': ['unset'],
                        'var_dump(var1, var2, ...)': ['var_dump'],
                        'var_export(variable, return)': ['var_export'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],                        

                    },
                    false
                    );
            break;

        case '%PhpBuiltInFunctionMath':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP Math ----': [''],

                        'abs(x)': ['abs'],
                        'ceil(x)': ['ceil'],
                        'floor(x)': ['floor'],
                        'fmod(x,y)  remainder (modulo) of x/y': ['fmod'],
                        'getrandmax()': ['getrandmax'],
                        'intdiv(dividend, divisor)': ['intdiv'],
                        'is_finite(value)': ['is_finite'],
                        'is_infinite(value)': ['is_infinite'],

                        'is_nan(value)': ['is_nan'],
                        'lcg_value() /rand(0,1)': ['lcg_value'],

                        'max(array_values)': ['max'],
                        'max(value1, value2, ... valueN )': ['max'],
                        'min(array_values)': ['min'],
                        'min(value1, value2, ... valueN )': ['min'],

                        'mt_getrandmax()': ['mt_getrandmax'],
                        'mt_rand() / random': ['mt_rand'],
                        'mt_rand(min,max)': ['mt_rand'],
                        'mt_srand(seed, mode)': ['mt_srand'],
                        'pi()': ['pi'],
                        'rand()': ['rand'],
                        'rand(min,max)': ['rand'],
                        'round(number [,precision,mode])': ['round'],
                        'srand(seed)': ['srand'],

                        '---- Power & log ----': [''],
                        'exp(x)': ['exp'],
                        'expm1(x)': ['expm1'],
                        'hypot(x,y)/sqrt(x*x+y*y)': ['hypot'],

                        'log(x[, base])': ['log'],
                        'pow(base, exponent)': ['pow'],
                        'sqrt(x)': ['sqrt'],

                        '---- sin cos ----': [''],
                        'acos(x)': ['acos'],
                        'acosh(x)': ['acosh'],
                        'asin(x)': ['asin'],
                        'atan(x)': ['atan'],
                        'atanh(x)': ['atanh'],
                        'atan2(x)': ['atan2'],
//                        'cbrt(x)': ['cbrt'],
//                        'clz32(x)': ['clz32'],
                        'cos(x)': ['cos'],
                        'cosh(x)': ['cosh'],
                        'expm1(x)': ['expm1'],
                        'fround(x)': ['fround'],
                        'imul(x)': ['imul'],
                        'log(x)': ['log'],
                        'log1p(x)': ['log1p'],
                        'log10(x)': ['log10'],
                        'log2(x)': ['log2'],
                        'sign(x)': ['sign'],
                        'sin(x)': ['sin'],
                        'sinh(x)': ['sinh'],
                        'tan(x)': ['tan'],
                        'tanh(x)': ['tanh'],
                        'trunc(x)': ['trunc'],
                        '---- conversion ----': [''],
                        'decbin(number)  decimal to binary': ['decbin'],
                        'dechex(number)': ['dechex'],
                        'decoct(number)': ['decoct'],
                        'deg2rad(number)': ['deg2rad'],

                        'hexdec(hex_string)': ['hexdec'],
                        'octdec(octal_string)': ['octdec'],

                        'rad2deg(number)': ['rad2deg'],

                    },
                    false
                    );
            break;

        case '%PhpBuiltInFunctionMysqli':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- MySQL ----': [''],
                        'mysqli_affected_rows(connection)': ['mysqli_affected_rows'],
                        'mysqli_autocommit(connection, mode)': ['mysqli_autocommit'],
                        'mysqli_change_user(connection, username, password, dbname)': ['mysqli_change_user'],
                        'mysqli_character_set_name(connection)': ['mysqli_character_set_name'],
                        'mysqli_close(connection)': ['mysqli_close'],
                        'mysqli_commit(connection, flags, name)': ['mysqli_commit'],
                        'mysqli_connect(host, username, password, dbname, port, socket)': ['mysqli_connect'],
                        'mysqli_connect_errno()': ['mysqli_connect_errno'],
                        'mysqli_connect_error()': ['mysqli_connect_error'],
                        'mysqli_num_rows($queryResult)': ['mysqli_num_rows'],
                        'mysqli_free_result($queryResult)': ['mysqli_free_result'],
                        'mysqli_debug("d:t:o,debug.trace")': ['mysqli_debug'],

                        'mysqli_data_seek(result,offset)': ['mysqli_data_seek'],
                        'mysqli_dump_debug_info(link)': ['mysqli_dump_debug_info'],

                        'mysqli_errno(connection)': ['mysqli_errno'],
                        'mysqli_error(connection)': ['mysqli_error'],
                        'mysqli_error_list(connection)': ['mysqli_error_list'],
                        'mysqli_fetch_all(result, resulttype)': ['mysqli_fetch_all'],
                        'mysqli_fetch_array(result,resulttype)': ['mysqli_fetch_array'],
                        'mysqli_fetch_assoc(result)': ['mysqli_fetch_assoc'],
                        'mysqli_fetch_field(result)': ['mysqli_fetch_field'],
                        'mysqli_fetch_field_direct(result, fieldnr)': ['mysqli_fetch_field_direct'],
                        'mysqli_fetch_fields(result)': ['mysqli_fetch_fields'],
                        'mysqli_fetch_lengths(result)': ['mysqli_fetch_lengths'],
                        'mysqli_fetch_object(result, classname, params)': ['mysqli_fetch_object'],
                        'mysqli_fetch_row(result)': ['mysqli_fetch_row'],
                        'mysqli_field_count(connection)': ['mysqli_field_count'],
                        'mysqli_field_seek(result, fieldnr)': ['mysqli_field_seek'],
                        'mysqli_get_charset(connection)': ['mysqli_get_charset'],
                        'mysqli_get_client_info(connection)': ['mysqli_get_client_info'],
                        'mysqli_get_client_stats()': ['mysqli_get_client_stats'],
                        'mysqli_get_client_version(connection)': ['mysqli_get_client_version'],
                        'mysqli_get_connection_stats(connection)': ['mysqli_get_connection_stats'],

                        'mysqli_get_host_info(connection)': ['mysqli_get_host_info'],
                        'mysqli_get_proto_info(connection)': ['mysqli_get_proto_info'],
                        'mysqli_get_server_info(connection)': ['mysqli_get_server_info'],
                        'mysqli_get_server_version(connection)': ['mysqli_get_server_version'],
                        'mysqli_info(connection)': ['mysqli_info'],
                        'mysqli_init()': ['mysqli_init'],
                        'mysqli_insert_id(connection)': ['mysqli_insert_id'],
                        'mysqli_kill(connection, processid)': ['mysqli_kill'],
                        'mysqli_more_results(connection)': ['mysqli_more_results'],

                        'mysqli_multi_query(connection, query)': ['mysqli_multi_query'],
                        'mysqli_next_result(connection)': ['mysqli_next_result'],
                        'mysqli_options(connection, option, value)': ['mysqli_options'],
                        'mysqli_ping(connection)': ['mysqli_ping'],
                        'mysqli_poll(read, error, reject, seconds, microseconds)': ['mysqli_poll'],
                        'mysqli_query(connection, query, resultmode)': ['mysqli_query'],
                        'mysqli_real_connect(connection, host, username, password, dbname, port, socket, flag)': ['mysqli_real_connect'],
                        'mysqli_real_escape_string(connection, escapestring)': ['mysqli_real_escape_string'],
                        'mysqli_real_query(connection, query)': ['mysqli_real_query'],
                        'mysqli_reap_async_query(connection)': ['mysqli_reap_async_query'],
                        'mysqli_refresh(connection, options)': ['mysqli_refresh'],
                        'mysqli_rollback(connection, flags, name)': ['mysqli_rollback'],
                        'mysqli_select_db(connection, name)': ['mysqli_select_db'],
                        'mysqli_set_charset(connection, charset)': ['mysqli_set_charset'],
                        'mysqli_set_local_infile_handler(read_file)': ['mysqli_set_local_infile_handler'],
                        'mysqli_sqlstate(connection)': ['mysqli_sqlstate'],
                        'mysqli_ssl_set(connection, key, cert, ca, capath, cipher)': ['mysqli_ssl_set'],
                        'mysqli_stat(connection)': ['mysqli_stat'],
                        'mysqli_stmt_init(connection)': ['mysqli_stmt_init'],
                        'mysqli_thread_id(connection)': ['mysqli_thread_id'],
                        'mysqli_thread_safe()': ['mysqli_thread_safe'],
                        'mysqli_use_result(connection)': ['mysqli_use_result'],
                        'mysqli_warning_count(connection)': ['mysqli_warning_count'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],
//                        'echo': ['echo'],                        

                        '---- SQL Injection ---- ': [''],
                        'mysqli_prepare($dbConnect,$SQLStatement)': ['mysqli_prepare'],
                        'mysqli_stmt_bind_param($stmt,"i(int)d(double)s(string)b(blob)",...)': ['mysqli_stmt_bind_param'],
                        'mysqli_stmt_bind_result($stmt,...)': ['mysqli_stmt_bind_result'],
                        'mysqli_stmt_execute($stmt)': ['mysqli_stmt_execute'],
                        'mysqli_stmt_fetch($stmt)': ['mysqli_stmt_fetch'],
                        'mysqli_stmt_close()': ['mysqli_stmt_close'],
                    },
                    false
                    );
            break;

        case '%PhpBuiltInFunctionString':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- PHP String ----': [''],
                        'addcslashes(string,characters) add slash': ['addcslashes'],
                        'addslashes(string) add slash': ['addslashes'],
                        'bin2hex(string)': ['bin2hex'],
                        'chop(string,charlist)': ['chop'],
                        'chr(ascii)': ['chr'],
                        'chunk_split(string,length,end)': ['chunk_split'],
                        'convert_cyr_string(string,from,to)': ['convert_cyr_string'],
                        'convert_uudecode(string)': ['convert_uudecode'],
                        'convert_uuencode(string)': ['convert_uuencode'],
                        'count_chars(string,mode)': ['count_chars'],
                        'crc32(string)': ['crc32'],
                        'crypt(str [,salt])': ['crypt'],
                        'echo(strings)': ['echo'],
                        'explode(separator,string [,limit]) breaks a string into an array': ['explode'],
                        'fprintf(stream,format,arg1 [,arg2,arg++])': ['fprintf'],
                        'get_html_translation_table(function,flags,character-set)': ['get_html_translation_table'],
                        'hebrev(string [,maxcharline])': ['hebrev'],
                        'hebrevc(string [,maxcharline])': ['hebrevc'],
                        'hex2bin(string)': ['hex2bin'],
                        'html_entity_decode(string,flags,character-set)': ['html_entity_decode'],
                        'htmlentities(string,flags,character-set,double_encode)': ['htmlentities'],
                        'htmlspecialchars_decode(string,flags)': ['htmlspecialchars_decode'],
                        'htmlspecialchars(string,flags,character-set,double_encode)': ['htmlspecialchars'],
                        '---- i ----': [''],
                        'implode(separator,array) returns a string from the elements of an array': ['implode'],
                        'join(separator,array) same as impode': ['join'],
                        'lcfirst(string) converts the first character of a string to lowercase': ['lcfirst'],
                        'levenshtein(string1,string2 [,insert,replace,delete])': ['levenshtein'],
                        'localeconv()': ['localeconv'],
                        'ltrim(string [,charlist])': ['ltrim'],

                        'md5(string,raw)': ['md5'],
                        'md5_file(file,raw)': ['md5_file'],
                        'metaphone(string,length)': ['metaphone'],
                        'money_format(string,number)': ['money_format'],
                        'nl_langinfo(element)': ['nl_langinfo'],
                        'nl2br(string,xhtml)': ['nl2br(string,xhtml)'],
                        'number_format(number,decimals,decimalpoint,separator)': ['number_format'],
                        'ord(string)': ['ord'],
                        'parse_str(string,array) parses a query string into variables.': ['parse_str'],
                        'print(strings)': ['print'],
                        'printf(format,arg1,arg2,arg++)': ['printf'],
                        'quoted_printable_decode(string)': ['quoted_printable_decode'],
                        'quoted_printable_encode(string)': ['quoted_printable_encode'],
                        'quotemeta(string) adds backslashes in front of some predefined characters': ['quotemeta'],
                        '---- s ----': [''],
                        'rtrim(string,charlist)': ['rtrim'],
                        'setlocale(constant,location)': ['setlocale'],
                        'sha1(string,raw) SHA-1 hash ': ['sha1'],
                        'sha1_file(file,raw)': ['sha1_file'],
                        'similar_text(string1,string2,percent)': ['similar_text'],
                        'soundex(string)': ['soundex'],
                        'sprintf(format,arg1,arg2,arg++)': ['sprintf'],
                        'sscanf(string,format,arg1,arg2,arg++)': ['sscanf'],
                        'str_getcsv(string,separator,enclosure,escape)': ['str_getcsv'],
                        'str_ireplace(find,replace,string,count)': ['str_ireplace'],
                        'str_pad(string,length,pad_string,pad_type)': ['str_pad'],
                        'str_repeat(string,repeat)': ['str_repeat'],
                        'str_replace(find,replace,string [,count])': ['str_replace'],
                        'str_rot13(string) ROT13 encoding on a string': ['str_rot13'],
                        'str_shuffle(string)': ['str_shuffle'],
                        'str_split(string [,length])': ['str_split'],
                        'str_word_count(string,return,char)': ['str_word_count'],
                        'strcasecmp(string1,string2)': ['strcasecmp'],
                        'strchr(string,search,before_search)': ['strchr'],
                        'strcmp(string1,string2)': ['strcmp'],
                        'strcoll(string1,string2)  compares two strings.': ['strcoll'],
                        'strcspn(string,char,start,length)': ['strcspn'],
                        'strip_tags(string,allow)': ['strip_tags'],
                        'stripcslashes(string) removes backslashes ': ['stripcslashes'],
                        'stripslashes(string)': ['stripslashes'],
                        'stripos(string,find,start)': ['stripos'],
                        'stristr(string,search,before_search)': ['stristr'],
                        'strlen(string)': ['strlen'],
                        'strnatcasecmp(string1,string2) compares two strings using a "natural" algorithm.': ['strnatcasecmp'],
                        'strnatcmp(string1,string2)': ['strnatcmp'],
                        'strncasecmp(string1,string2,length)': ['strncasecmp'],
                        'strncmp(string1,string2,length)': ['strncmp'],
                        'strpbrk(string,charlist)': ['strpbrk'],
                        'strpos(string,find,start)': ['strpos'],
                        'strrchr(string,char)': ['strrchr'],
                        'strrev(string) reverses a string': ['strrev'],
                        'strripos(string,find,start)': ['strripos'],
                        'strrpos(string,find,start)': ['strrpos'],
                        'strspn(string,charlist,start,length)': ['strspn'],
                        'strstr(string,search [,before_search])': ['strstr'],
                        'strtok(string,split)': ['strtok'],
                        'strtolower(string)': ['strtolower'],
                        'strtoupper(string)': ['strtoupper'],
                        'strtr(string,from,to)  translates certain characters in a string': ['strtr'],
                        'strtr(string,array)': ['strtr'],
                        'substr(string,start,length)': ['substr'],
                        'substr_compare(string1,string2,startpos,length,case)': ['substr_compare'],
                        'substr_count(string,substring,start,length)': ['substr_count'],
                        'substr_replace(string,replacement,start,length)': ['substr_replace'],
                        'trim(string,charlist)': ['trim'],
                        'ucfirst(string)': ['ucfirst'],
                        'ucwords(string, delimiters)': ['ucwords'],
                        'vfprintf(stream,format,argarray)': ['vfprintf'],
                        'vprintf(format,argarray)': ['vprintf'],
                        'vsprintf(format,argarray)': ['vsprintf'],
                        'wordwrap(string,width,break,cut)': ['wordwrap'],

                    },
                    false
                    );
            break;


// FCC 2022/08/10 
//%DBCommand %DBOBject %DBExist %SelectFields %SqlOperator %FieldFunction %OrderDir %SelectJoin %SetBagOp
// %SubQueryOp $CharSetOpt $CollectOpt
        case '%CharSetOpt':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'big5': ['big5'],
                        'binary': ['binary'],
                        'latin1': ['latin1'],

                        'utf8mb4': ['utf8mb4'],
                        'utf8mb3': ['utf8mb3'],

                        'ucs2': ['ucs2'],
//                        'binary': ['binary'],                        
//                        'NOT EXISTS': ['NOT EXISTS'],
                    },
                    false
                    );
            break;

        case '%CollectOpt':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'utf8mb4_unicode_ci': ['utf8mb4_unicode_ci'],
                        'utf8mb3_general_ci': ['utf8mb3_general_ci'],
                        'big5_chinese_ci': ['big5_chinese_ci'],
                        'latin1_swedish_ci': ['latin1_swedish_ci'],
                        'ucs2_general_ci': ['ucs2_general_ci'],
                        'binary': ['binary'],
//                        'NOT EXISTS': ['NOT EXISTS'],
                    },
                    false
                    );
            break;

        case '%SubQueryOp':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ANY': ['ANY'],
                        'ALL': ['ALL'],
                        'SOME': ['SOME'],
                        'IN': ['IN'],

                        'EXISTS': ['EXISTS'],
                        'NOT EXISTS': ['NOT EXISTS'],
                    },
                    false
                    );
            break;

        case '%SetBagOp':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SET operator ----': [''],
                        'UNION': ['UNION'],
                        'INTERSECT': ['INTERSECT'],
                        'MINUS (Oracle)': ['MINUS'],
                        'EXCEPT': ['EXCEPT'],
                        '---- BAG operator ----': [''],
                        'UNION ALL': ['UNION ALL'],
                        'INTERSECT ALL': ['INTERSECT ALL'],
//                        'RIGHT (OUTER) JOIN': ['RIGHT JOIN'], 
//                        'FULL  (OUTER) JOIN': ['FULL JOIN'],                                
                    },
                    false
                    );
            break;

        case '%SelectJoin':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SELECT INNER JOIN ----': [''],
                        'JOIN (INNER JOIN) ON': ['JOIN'],
                        'NATURAL JOIN (INNER JOIN) USING': ['NATURAL JOIN'],
                        '---- SELECT OUTER JOIN ----': [''],
                        'LEFT  (OUTER) JOIN ON': ['LEFT JOIN'],
                        'RIGHT (OUTER) JOIN ON': ['RIGHT JOIN'],
                        'FULL  (OUTER) JOIN ON': ['FULL JOIN'],
                    },
                    false
                    );
            break;

        case '%SelectJoin':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SELECT INNER JOIN ----': [''],
                        'CROSS JOIN': ['CROSS JOIN'],
                        'JOIN (INNER JOIN) ON': ['JOIN'],
                        'NATURAL JOIN [USING]': ['NATURAL JOIN'],
                        '---- SELECT OUTER JOIN ----': [''],
                        'LEFT  (OUTER) JOIN ON': ['LEFT JOIN'],
                        'RIGHT (OUTER) JOIN ON': ['RIGHT JOIN'],
                        'FULL  (OUTER) JOIN ON': ['FULL JOIN'],
                    },
                    false
                    );
            break;

        case '%SelectJoinOnUsing':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ON: JOIN (INNER JOIN) ON $condition': ['ON'],
                        'USING: NATURAL JOIN USING $field': ['USING'],
                    },
                    false
                    );
            break;

        case '%FieldFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- SELECT Aggregation function ----': [''],
                        'AVG([ALL|DISTINCT] expression )': ['AVG'],
                        'COUNT(*)|COUNT([ALL|DISTINCT] expression )': ['COUNT'],
                        'MAX([ALL|DISTINCT] expression )': ['MAX'],
                        'MIN([ALL|DISTINCT] expression )': ['MIN'],
                        'SUM([ALL|DISTINCT] expression )': ['SUM'],
                        '-------------------------------': [''],
                        '---- SELECT/WHERE function ----': [''],
                        'COALESCE(value,...)': ['COALESCE'],
                        'GREATEST(value1,value2,...)': ['GREATEST'],
                        'LEAST(2,0)': ['LEAST'],
                        'ISNULL(1+1)': ['ISNULL'],
                        '--------------------------------': [''],
                        '---- MySQL String Functions ----': [''],
                        'ASCII(character)': ['ASCII'],
                        'CHAR_LENGTH(string)': ['CHAR_LENGTH'],
                        'CONCAT(expression1, expression2, expression3,...)': ['CONCAT'],
                        'CONCAT_WS(separator, expression1, expression2, expression3,...)': ['CONCAT_WS'],
                        'FIELD(value, val1, val2, val3, ...)': ['FIELD'],
                        'FIND_IN_SET(string, string_list)': ['FIND_IN_SET'],
                        'FORMAT(number, decimal_places)': ['FORMAT'],
                        'INSERT(string, position, number, string2)': ['INSERT'],
                        'INSTR(string1, string2)': ['INSTR'],
                        'LCASE(text)|LOWER(text)': ['LOWER'],
                        'LEFT(string, number_of_chars)': ['LEFT'],
                        'LENGTH(string)': ['LENGTH'],
                        'LOCATE(substring, string, start)': ['LOCATE'],
                        'LPAD(string, length, lpad_string)': ['LPAD'],
                        'MID(string, start, length)': ['MID'],
                        'POSITION(substring IN string)': ['POSITION'],
                        'REPEAT(string, number)': ['REPEAT'],
                        'REPLACE(string, from_string, new_string)': ['REPLACE'],
                        'REVERSE(string)': ['REVERSE'],
                        'RIGHT(string, number_of_chars)': ['RIGHT'],
                        'RPAD(string, length, rpad_string)': ['RPAD'],
                        'RTRIM(string)': ['RTRIM'],
                        'SPACE(number)': ['SPACE'],
                        'STRCMP(string1, string2)': ['STRCMP'],
                        'SUBSTR(string, start, length)': ['SUBSTR'],
                        'SUBSTRING(string, start, length)': ['SUBSTRING'],
                        'TRIM(string)': ['TRIM'],
                        'UCASE(text) | UPPER(text)': ['UCASE'],
                        '--------------------------------': [''],
                        '---- MySQL Numeric Functions----': [''],
                        'ABS(number)': ['ABS'],
                        'ACOS(number)': ['ACOS'],
                        'ASIN(number)': ['ASIN'],
                        'ATAN(number)': ['ATAN'],
                        'ATAN2(a, b)': ['ATAN2'],
                        'CEIL(number)|CEILING(number)': ['CEIL'],
                        'COS(number)': ['COS'],
                        'COT(number)': ['COT'],
                        'DEGREES(number)': ['DEGREES'],
                        'EXP(number)': ['EXP'],
                        'FLOOR(number)': ['FLOOR'],
                        'GREATEST(arg1, arg2, arg3, ...)': ['GREATEST'],
                        'LEAST(arg1, arg2, arg3, ...)': ['LEAST'],
                        'LN(number)': ['LN'],
                        'LOG(number)|LOG(base, number)': ['LOG'],
                        'LOG10(number)': ['LOG10'],
                        'LOG2(number)': ['LOG2'],
                        'MAX(expression)': ['MAX'],
                        'MIN(expression)': ['MIN'],
                        'MOD(x, y)': ['MOD'],
                        'PI()': ['PI'],
                        'POW(x, y)|POWER(x, y)': ['POW'],
                        'RADIANS(number)': ['RADIANS'],
                        'RAND(seed)': ['RAND'],
                        'ROUND(number, decimals)': ['ROUND'],
                        'SIGN(number)': ['SIGN'],
                        'SIN(number)': ['SIN'],
                        'SQRT(number)': ['SQRT'],
                        'SUM(expression)': ['SUM'],
                        'TAN(number)': ['TAN'],
                        'TRUNCATE(number, decimals)': ['TRUNCATE'],
                        '------------------------------------------------------------------------------': [''],
                        '---- MySQL Date Functions date:"2022-01-01" datetime:"2022-01-01 09:34:00"----': [''],
                        'ADDDATE(date, days)|ADDDATE(date, INTERVAL value addunit)': ['ADDDATE'],
                        'ADDTIME(datetime, addtime)': ['ADDTIME'],
                        'CURDATE()|CURRENT_DATE()': ['CURDATE'],
                        'CURRENT_TIMESTAMP()': ['CURRENT_TIMESTAMP'],
                        'CURTIME()|CURRENT_TIME()': ['CURTIME'],
                        'DATE(expression)': ['DATE'],
                        'DATEDIFF(date1, date2)': ['DATEDIFF'],
                        'DATE_ADD(date, INTERVAL value addunit)': ['DATE_ADD'],
                        'DATE_FORMAT(date, format)': ['DATE_FORMAT'],
                        'DATE_SUB(date, INTERVAL value interval)': ['DATE_SUB'],
                        'DAY(date)': ['DAY'],
                        'DAYNAME(date)': ['DAYNAME'],
                        'DAYOFMONTH(date)': ['DAYOFMONTH'],
                        'DAYOFWEEK(date)': ['DAYOFWEEK'],
                        'DAYOFYEAR(date)': ['DAYOFYEAR'],
                        'EXTRACT(part FROM date)': ['EXTRACT'],
                        'FROM_DAYS(number)': ['FROM_DAYS'],
                        'HOUR(datetime)': ['HOUR'],
                        'LAST_DAY(date)': ['LAST_DAY'],
                        'LOCALTIME()': ['LOCALTIME'],
                        'LOCALTIMESTAMP()': ['LOCALTIMESTAMP'],
                        'MAKEDATE(year, day)': ['MAKEDATE'],
                        'MAKETIME(hour, minute, second)': ['MAKETIME'],
                        'MICROSECOND(datetime)': ['MICROSECOND'],
                        'MINUTE(datetime)': ['MINUTE'],
                        'MONTH(date)': ['MONTH'],
                        'MONTHNAME(date)': ['MONTHNAME'],
                        'NOW()': ['NOW'],
                        'PERIOD_ADD(period, number)': ['PERIOD_ADD'],
                        'PERIOD_DIFF(period1, period2)': ['PERIOD_DIFF'],
                        'QUARTER(date)': ['QUARTER'],
                        'SECOND(datetime)': ['SECOND'],
                        'SEC_TO_TIME(seconds)': ['SEC_TO_TIME'],
                        'STR_TO_DATE(string, format) ("August 10 2017", "%M %d %Y")': ['STR_TO_DATE'],
                        'SUBDATE(date, INTERVAL value unit) SUBDATE("2017-06-15", INTERVAL 10 DAY)': ['SUBDATE'],
                        'SUBTIME(datetime, time_interval) SUBTIME("2017-06-15 10:24:21.000004", "5.000001");': ['LTRIM'],
                        'SYSDATE()': ['SYSDATE'],
                        'TIME(expression) TIME("19:30:10");': ['TIME'],
                        'TIME_FORMAT(time, format) TIME_FORMAT("19:30:10", "%H %i %s");': ['TIME_FORMAT'],
                        'TIME_TO_SEC(time) TIME_TO_SEC("19:30:10");': ['TIME_TO_SEC'],
                        'TIMEDIFF(time1, time2) TIMEDIFF("13:10:11", "13:10:10");': ['TIMEDIFF'],
                        'TIMESTAMP(expression, time) TIMESTAMP("2017-07-23",  "13:10:11");': ['TIMESTAMP'],
                        'TO_DAYS(date) TO_DAYS("2017-06-20");': ['TO_DAYS'],
                        'WEEK(date, firstdayofweek) WEEK("2017-06-15");': ['WEEK'],
                        'WEEKDAY(date) WEEKDAY("2017-06-15");': ['WEEKDAY'],
                        'WEEKOFYEAR(date) WEEKOFYEAR("2017-06-15");': ['WEEKOFYEAR'],
                        'YEAR(date)': ['YEAR'],
                        'YEARWEEK(date, firstdayofweek) YEARWEEK("2017-06-15", 0); ': ['YEARWEEK'],
                        '----------------------------------': [''],
                        '---- MySQL Advanced Functions ----': [''],

                        'BIN(number)': ['BIN'],
                        'CAST(value AS datatype) CAST("2017-08-29" AS DATE);': ['CAST'],
                        'COALESCE(val1, val2, ...., val_n)': ['COALESCE'],
                        'CONNECTION_ID()': ['CONNECTION_ID'],
                        'CONV(number, from_base, to_base)': ['CONV'],
                        'CONVERT(value, type) CONVERT("2017-08-29", DATE);': ['CONVERT'],
                        'CURRENT_USER()': ['CURRENT_USER'],
                        'DATABASE()': ['DATABASE'],
                        'IF(condition, value_if_true, value_if_false)': ['IF'],
                        'IFNULL(expression, alt_value) IFNULL(NULL, "W3Schools.com")': ['IFNULL'],
                        'ISNULL(expression) ': ['ISNULL'],
                        'LAST_INSERT_ID([expression])': ['LAST_INSERT_ID'],
                        'NULLIF(expr1, expr2)': ['NULLIF'],
                        'SESSION_USER()': ['SESSION_USER'],
                        'SYSTEM_USER()': ['SYSTEM_USER'],
                        'USER()': ['USER'],
                        'VERSION()': ['VERSION'],
                    },
                    false
                    );
            break;
            // SELECT field and WHERE condition    
        case '%SqlOperator':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- WHERE operator ----': [''],
                        'AND (&&)': ['AND'],
                        'OR (||)': ['OR'],
                        'XOR': ['OR'],
                        'NOT (!)': ['OR'],
                        'LIKE "_a%_"': ['LIKE'],
                        'RLIKE "^.. [abc] a%$.."': ['RLIKE'],
                        'REGEXP "_a%_"': ['REGEXP'],
                        '= (eq)': ['='],
                        '<=> (NULL-safe eq)': ['<>'],
                        '<> (not eq)': ['<>'],
                        '!= (not eq)': ['!='],
                        '>': ['>'],
                        '>=': ['>='],
                        '<': ['<'],
                        '<=': ['<='],
                        '---- SELECT/WHERE Arithmatic ----': [''],
                        '+': ['+'],
                        '-': ['-'],
                        '*': ['*'],
                        '/ (div)': ['/'],
                        '% (mod)': ['%'],
//                        '*': ['*'],   
                        '---- SELECT/WHERE Operator ----': [''],
                        'IN: var IN (0,1,2)': ['IN'],
                        'NOT IN: var NOT IN (0,1,2)': ['NOT IN'],
                        'IS: var IS TRUE|NULL': ['IS'],
                        'IS NOT: var IS NOT TRUE|NULL': ['IS NOT'],
                        '---- SELECT/WHERE bitwise operator ----': [''],
                        '&': ['$'],
                        '|': ['|'],
                        '^ (bitwise XOR)': ['^'],
                        '~ (bitwise NOT)': ['~'],
                        '>> (shift right)': ['>>'],
                        '<< (shift left)': ['<<'],
                    },
                    false
                    );
            break;

        case '%SelectOption':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SELECT option ----': [''],
                        'DISTINCT': ['DISTINCT'],
                        'TOP 10': ['TOP 10'],
                    },
                    false
                    );
            break;
// TABLE: %TableCommand %FieldType %FieldOption %Parenthesis
        case '%TableCommand':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SQL action ----': [''],
                        'ALTER TABLE $tb': ['ALTER TABLE'],
                        'CREATE TABLE $tb (...)': ['CREATE TABLE'],
//                        'CREATE SCHEMA $db': ['CREATE SCHEMA'],
                        'DROP TABLE $tb': ['DROP TABLE'],
//                        'USE $db': ['USE'],
                        '---- SQL show info ----': [''],
                        'SHOW CREATE TABLE $tb': ['SHOW CREATE TABLE'],
                        'SHOW TABLE $tb': ['SHOW TABLE'],
                        'SHOW TABLES': ['SHOW TABLES'],

                    },
                    false
                    );
            break;



        case '%FieldType':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- INTEGER ----': [''],
                        'TINYINT max:127': ['TINYINT'],
                        'SMALLINT max:32k': ['SMALLINT'],
                        'MEDIUMINT max:8M': ['MEDIUMINT'],
                        'INT(size) max:2G': ['INT'],
                        'BIGINT': ['BIGINT'],
                        'BIT(size) max:64': ['BIT'],
                        'BOOL 0:false other:true': ['BOOL'],
                        'LONGTEXT max:4G': ['LONGTEXT'],

                        '---- FLOAT ----': [''],
                        'FLOAT': ['FLOAT'],
                        'DOUBLE': ['DOUBLE'],
                        'DECIMAL(size, d)': ['DECIMAL(size, d)'],

                        '---- STRING ----': [''],
                        'CHAR(10) max:255': ['CHAR(10)'],
                        'CHAR(20) max:255': ['CHAR(20)'],
                        'VARCHAR(10) max:65535': ['VARCHAR(10)'],
                        'VARCHAR(20) max:65535': ['VARCHAR(20)'],
                        'TEXT(1000) max:65535': ['TEXT(1000)'],
                        'TINYTEXT max:255': ['TINYTEXT'],
                        'MEDIUMTEXT max:16M': ['MEDIUMTEXT'],
                        'LONGTEXT max:4G': ['LONGTEXT'],

                        '---- DATE and TIME ----': [''],
                        'DATE (YYYY-MM-DD)': ['DATE'],
                        'DATETIME (YYYY-MM-DD hh:mm:ss)': ['DATETIME'],
                        'TIMESTAMP (YYYY-MM-DD hh:mm:ss)': ['TIMESTAMP'],
                        'TIME (hh:mm:ss)': ['TIME'],
                        'YEAR': ['YEAR'],

                        '---- BINARY ----': [''],
                        'BLOB(1000) max:65535': ['BLOB(1000)'],
                        'TINYBLOB max:255': ['TINYBLOB'],
                        'MEDIUMBLOB max:16M': ['MEDIUMBLOB'],
                        'LONGBLOB max:4G': ['LONGBLOB'],

                        '---- ENUM and SET ----': [''],
                        'ENUM(val1, val2, val3, ...) max:64k': ['ENUM(val1, val2, val3, ...)'],
                        'SET(val1, val2, val3, ...) max:64': ['SET(val1, val2, val3, ...)'],
                    },
                    false
                    );
            break;

        case '%FieldOption':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SIMPLE ----': [''],
                        'AUTO_INCREMENT': ['AUTO_INCREMENT'],
                        'DEFAULT "string"': ['DEFAULT "string"'],
                        'DEFAULT NULL': ['DEFAULT NULL'],
                        'DEFAULT 0': ['DEFAULT 0'],
                        'NOT NULL': ['NOT NULL'],
                        'PRIMARY KEY': ['PRIMARY KEY'],
                        'UNSIGNED': ['UNSIGNED'],
                        'UNIQUE': ['UNIQUE'],
                        '---- COMPLEXE ----': [''],
                        'PRIMARY KEY AUTO_INCREMENT': ['PRIMARY KEY AUTO_INCREMENT'],
                        'NOT NULL AUTO_INCREMENT': ['NOT NULL AUTO_INCREMENT'],

                        'UNSIGNED AUTO_INCREMENT': ['UNSIGNED AUTO_INCREMENT'],
                        'UNSIGNED DEFAULT "string"': ['UNSIGNED DEFAULT "string"'],
                        'UNSIGNED DEFAULT 0': ['UNSIGNED DEFAULT 0'],
                        'UNSIGNED NOT NULL': ['UNSIGNED NOT NULL'],
                        'UNSIGNED UNIQUE': ['UNSIGNEDUNIQUE'],

                    },
                    false
                    );
            break;

        case '%FieldConstraint':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- SQL action ----': [''],
//                        'AUTO_INCREMENT': ['AUTO_INCREMENT'],
//                        'DEFAULT "string"': ['DEFAULT "string"'],
//                        'DEFAULT 0': ['DEFAULT 0'],                         
//                        'NOT NULL': ['NOT NULL'],
//                        'UNSIGNED': ['UNSIGNED'],
//                        'UNIQUE': ['UNIQUE'],                        

//                        '---- SQL show info ----': [''],
                        'CHECK (Age>=18)': ['CHECK (Age>=18)'],
                        'FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)': ['FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)'],
                        'PRIMARY KEY (ID)': ['PRIMARY KEY (ID)'],
                        'INDEX indexName (ID)': ['INDEX indexName (ID)'],
                        'FULLTEXT INDEX indexName (ID(20))': ['FULLTEXT INDEX indexName (ID(20))'],
                        'UNIQUE INDEX indexName (ID)': ['UNIQUE INDEX indexName (ID)'],
                        'UNIQUE (ID)': ['UNIQUE (ID)'],
                        'CONSTRAINT check_c CHECK (Age>=18)': ['CONSTRAINT check_c CHECK (Age>=18)'],
                        'CONSTRAINT fk_c FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)': ['CONSTRAINT fk_c FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)'],
                        'CONSTRAINT p_c PRIMARY KEY (ID)': ['CONSTRAINT p_c PRIMARY KEY (ID)'],
                        'CONSTRAINT u_c UNIQUE (ID)': ['CONSTRAINT u_c UNIQUE (ID)'],

//                        'SHOW TABLES FROM $db': ['SHOW TABLES FROM'],                        
//                        'SHOW CREATE TABLE $table': ['SHOW CREATE TABLE'],
//                        'SHOW DB|TABLE': ['SHOW'],
                    },
                    false
                    );
            break

        case '%DBCommand':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SQL DB action ----': [''],
                        'ALTER DATABASE $db': ['ALTER DATABASE'],
                        'CREATE DATABASE $db': ['CREATE DATABASE'],
                        'CREATE SCHEMA $db': ['CREATE SCHEMA'],
                        'DROP DATABASE $db': ['DROP DATABASE'],

                        'USE $db': ['USE'],
                        '---- SQL show info ----': [''],
                        'SHOW CREATE DATABASE $db': ['SHOW CREATE DATABASE'],
                        'SHOW DATABASES': ['SHOW DATABASES'],
                        'SHOW SCHEMAS': ['SHOW SCHEMAS'],
                        'SHOW DATABASES LIKE $pattern;': ['HOW DATABASES LIKE'],
                        'SELECT DATABASE()': ['SELECT DATABASE()'],
                        'SHOW TABLES FROM $db': ['SHOW TABLES FROM'],
//                        'SHOW CREATE TABLE $table': ['SHOW CREATE TABLE'],
//                        'SHOW DB|TABLE': ['SHOW'],
                        '---- SQL TABLE ----': [''],
                        'DROP TABLE $tb': ['DROP TABLE'],

                    },
                    false
                    );
            break;

        case '%DBOptionKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- SELECT option ----': [''],
                        'CHARACTER SET ': ['CHARACTER SET'],
                        'COLLATE': ['COLLATE'],
                        'ENCRYPTION': ['ENCRYPTION'],
                        'READ ONLY': ['READ ONLY'],
                    },
                    false
                    );
            break;

        case '%DBOptionValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- CHARACTER SET ----': [''],
                        'big5': ['big5'],
                        'binary': ['binary'],
                        'latin1': ['latin1'],

                        'utf8mb4': ['utf8mb4'],
                        'utf8mb3': ['utf8mb3'],

                        'ucs2': ['ucs2'],
                        '----  COLLATE ----': [''],
                        'big5_chinese_ci': ['big5_chinese_ci'],
                        'latin1_swedish_ci': ['latin1_swedish_ci'],
                        'utf8mb4_unicode_ci': ['utf8mb4_unicode_ci'],
                        'utf8mb3_general_ci': ['utf8mb3_general_ci'],
//                        'big5_chinese_ci': ['big5_chinese_ci'],
//                        'latin1_swedish_ci': ['latin1_swedish_ci'],
                        'ucs2_general_ci': ['ucs2_general_ci'],

                        '----  ENCRYPTION  ----': [''],
                        '"Y"': ['"Y"'],
                        '"N"': ['"N"'],

                        '----  READ ONLY ----': [''],
                        'DEFAULT ': ['DEFAULT '],
                        '0': ['0'],
                        '1': ['1'],

                    },
                    false
                    );
            break;

        case '%DBOBject':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SQL database ----': [''],
                        'DATABASES: SHOW DATABASE': ['DATABASE'],
                        'DATABASE: CREATE DATABASE': ['DATABASE'],
                        'SCHEMA': ['SCHEMA'],
                        '---- SQL table/view ----': [''],
                        'SHOW CREATE TABLE': ['CREATE TABLE'],
                        'TABLE': ['TABLE'],
                        'VIEW': ['VIEW'],
                        '---- SQL trigger/view ----': [''],
                        'TRIGGER': ['TRIGGER'],
                        'USER': ['USER'],
                        'TRIGGER': ['TRIGGER'],
                        'TYPE': ['TYPE'],
                    },
                    false
                    );
            break;

        case '%DBExist':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SQL ----': [''],
                        'IF NOT EXISTS': ['IF NOT EXISTS'],
                        'IF EXISTS': ['IF EXISTS'],
                    },
                    false
                    );
            break;

        case '%OrderDir':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- SQL ----': [''],
                        'ASC': ['ASC'],
                        'DESC': ['DESC'],
                    },
                    false
                    );
            break;
        case '%SQLObject':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- SQL ----': [''],
                        '$dbConnect': ['$dbConnect'],

                        '$queryResult': ['$queryResult'],
                        '$fieldInfo': ['$fieldInfo'],
//                        '$dbRecord': ['$dbRecord'],

                    },
                    false
                    );
            break;

        case '%SQLFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- $dbConnect ----': [''],
                        'autocommit(FALSE)': ['autocommit'],
                        'change_user("my_user", "my_password", "newDB")': ['change_user'],
                        'character_set_name()': ['character_set_name'],
                        'close()': ['close()'],
                        'commit()': ['commit'],

                        'dump_debug_info()': ['dump_debug_info'],
                        'change_user("my_user", "my_password", "newDB")': ['change_user'],
                        'character_set_name()': ['character_set_name'],

                        'field_count()': ['field_count'],
                        'get_charset()': ['get_charset'],

                        'get_client_info()': ['get_client_info'],
                        'get_connection_stats()': ['get_connection_stats'],
                        'host_info()': ['host_info'],

                        'ping()': ['ping'],
                        'prepare("INSERT INTO MyGuests (firstname, lastname, email) VALUES (?, ?, ?)")': ['prepare'],
                        'query($sql)': ['query'],

                        'real_escape_string($_POST["firstname"])': ['real_escape_string'],
                        'real_query($sql)': ['real_query'],
                        'store_result()': ['store_result'],
//                        'reap_async_query()': ['reap_async_query'],                          
                        'rollback()': ['rollback'],
                        'select_db("aDB")': ['select_db'],
                        'set_charset("utf8")': ['set_charset'],

                        'ssl_set(key, cert, ca, capath, cipher)': ['ssl_set'],
                        'stat()': ['stat'],
//                        'stat()': ['stat'],  

                        '---- $queryResult ----': [''],
                        'fetch_all(MYSQLI_ASSOC|MYSQLI_NUM)': ['fetch_all'],
                        'fetch_array(MYSQLI_ASSOC|MYSQLI_NUM)': ['fetch_array'],
                        'fetch_assoc()': ['fetch_assoc'],
                        'fetch_field()': ['fetch_field'],
                        'fetch_field_direct(1)': ['fetch_field_direct'],

                        'fetch_fields()': ['fetch_fields'],
                        'fetch_row()': ['fetch_row'],
                        'fetch_object()': ['fetch_object'],

                        'fetch_field()': ['fetch_field'],
                        'fetch_field_direct(1)': ['fetch_field_direct'],
                        'free_result()': ['free_result'],

//                        '---- $dbRecords ----': [''],
//                        'free_result()': ['free_result'],
//                        '$dbRecord': ['$dbRecord'],
//                        '---- $fieldInfo ----': [''],
//                        'affected_rows': ['affected_rows'],
//                        '$dbRecord': ['$dbRecord'],

                    },
                    false
                    );
            break;

        case '%SQLField':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- $dbConnect ----': [''],
                        'affected_rows': ['affected_rows'],
                        'connect_errno': ['connect_errno'],
                        'connect_error': ['connect_error'],
                        'client_version': ['client_version'],

                        'error': ['error'],
                        'error_list': ['error_list'],

                        'info': ['info'],
                        'error_list': ['error_list'],
                        'protocol_version': ['protocol_version'],
                        'server_info': ['server_info'],
                        'server_version': ['server_version'],
                        'sqlstate': ['sqlstate'],

                        '---- $queryResult ----': [''],
                        'num_rows': ['num_rows'],

                        '---- $fieldInfo ----': [''],
                        'name': ['name'],
                        'table': ['table'],
                        'max_length': ['max_length'],
//                        'sqlstate': ['sqlstate']                        
                    },
                    false
                    );
            break;
// FCC 2021/08/12 Ionic    

        case '%IonicElementEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'click': ['"click"'],
//                        'onclick': ['"onclick"'],                         
                        '---- ion-button/fab-button/ion-radio ----': [""],
                        'ionBlur': ['"ionBlur"'],
                        'ionFocus': ['"ionFocus"'],

                        '---- ion-checkbox/toggle ----': [""],
                        'ionBlur 2': ['"ionBlur"'],
                        'ionChange': ['"ionChange"'],
                        'ionFocus 2': ['"ionFocus"'],

                        '---- ion-conetent ----': [""],
                        'ionScroll': ['"ionScroll"'],
                        'ionScrollEnd': ['"ionScrollEnd"'],
                        'ionScrollStart': ['"ionScrollStart"'],

                        '---- ion-datetime ----': [""],
                        'ionBlur 3': ['"ionBlur"'],
                        'ionCancel': ['"ionCancel"'],
                        'ionChange 3': ['"ionChange"'],
                        'ionFocus 3': ['"ionFocus"'],

                        '---- ion-picker ----': [""],
                        'ionPickerDidDismiss': ['"ionPickerDidDismiss"'],
                        'ionPickerDidPresent': ['"ionPickerDidPresent"'],
                        'ionPickerWillDismiss': ['"ionPickerWillDismiss"'],
                        'ionPickerWillPresent': ['"ionPickerWillPresent"'],

                        '---- ion-infinite-scroll ----': [""],
                        'ionInfinite': ['"ionInfinite"'],

                        '---- ion-input/ion-textarea ----': [""],
                        'ionBlur 4': ['"ionBlur"'],
                        'ionChange 4': ['"ionChange"'],
                        'ionFocus 4': ['"ionFocus"'],
                        'ionInput': ['"ionInput"'],

                        '---- ion-item-sliding ----': [""],
                        'ionDrag': ['"ionDrag"'],

                        '---- ion-item-options ----': [""],
                        'ionSwipe': ['"ionSwipe"'],

                        '---- ion-img ----': [""],
                        'ionError': ['"ionError"'],
                        'ionImgDidLoad': ['"ionImgDidLoad"'],
                        'ionImgWillLoad': ['"ionImgWillLoad"'],
//                        'ionInput': ['"ionInput"'],    

                        '---- ion-menu ----': [""],
                        'ionDidClose': ['"ionDidClose"'],
                        'ionDidOpen': ['"ionDidOpen"'],
                        'ionWillClose': ['"ionWillClose"'],
                        'onWillOpen': ['"onWillOpen"'],

                        '---- ion-split-pane ----': [""],
                        'ionSplitPaneVisible': ['"ionSplitPaneVisible"'],

                        '---- ion-modal ----': [""],
                        'didDismiss': ['"didDismiss"'],
                        'didPresent': ['"didPresent"'],
                        'ionBreakpointDidChange': ['"ionBreakpointDidChange"'],
                        'ionModalDidDismiss': ['"ionModalDidDismiss"'],
                        'ionModalDidPresent': ['"ionModalDidPresent"'],
                        'ionModalWillDismiss': ['"ionModalWillDismiss"'],
                        'ionModalWillPresent': ['"ionModalWillPresent"'],
                        'willDismiss': ['"willDismiss"'],
                        'willPresent': ['"willPresent"'],

                        '---- ion-model ion-backdrop ----': [""],
                        'ionBackdropTap': ['"ionBackdropTap"'],

                        '---- ion-nav ----': [""],
                        'ionNavDidChange': ['"ionNavDidChange"'],
                        'ionNavWillChange': ['"ionNavWillChange"'],

                        '---- ion-popover ----': [""],
                        'didDismiss 2': ['"didDismiss"'],
                        'didPresent 2': ['"didPresent"'],
                        'ionPopoverDidDismiss': ['"ionPopoverDidDismiss"'],
                        'ionPopoverDidPresent': ['"ionPopoverDidPresent"'],
                        'ionPopoverWillDismiss': ['"ionPopoverWillDismiss"'],
                        'ionPopoverWillPresent': ['"ionPopoverWillPresent"'],
                        'willDismiss 2': ['"willDismiss"'],
                        'willPresent 2': ['"willPresent"'],

                        '---- ion-loading ----': [""],
                        'ionLoadingDidDismiss': ['"ionLoadingDidDismiss"'],
                        'ionLoadingDidPresent': ['"ionLoadingDidPresent"'],
                        'ionLoadingWillDismiss': ['"ionLoadingWillDismiss"'],
                        'ionLoadingWillPresent': ['"ionLoadingWillPresent"'],

                        '---- ion-range ----': [""],
                        'ionBlur 5': ['"ionBlur"'],
                        'ionChange 5': ['"ionChange"'],
                        'ionFocus 5': ['"ionFocus"'],
                        'ionKnobMoveEnd': ['"ionKnobMoveEnd"'],
                        'ionKnobMoveStart': ['"ionKnobMoveStart"'],

                        '---- ion-refresher ----': [""],
                        'ionPull': ['"ionPull"'],
                        'ionRefresh': ['"ionRefresh"'],

                        '---- ion-reorder-group ----': [""],
                        'ionItemReorder': ['"ionItemReorder"'],

                        '---- ion-router ----': [""],
                        'ionRouteDidChange': ['"ionRouteDidChange"'],
                        'ionRouteWillChange': ['"ionRouteWillChange"'],

                        '---- ion-route ----': [""],
                        'ionRouteDataChanged': ['"ionRouteDataChanged"'],

                        '---- ion-route-redirect ----': [""],
                        'ionRouteRedirectChanged': ['"ionRouteRedirectChanged"'],

                        '---- ion-searchbar ----': [""],
                        'ionBlur 6': ['"ionBlur"'],
                        'ionCancel 6': ['"ionCancel"'],
                        'ionChange 6': ['"ionChange"'],
                        'ionClear 6': ['"ionClear"'],
                        'ionFocus 6': ['"ionFocus"'],
                        'ionInput 6': ['"ionInput"'],

                        '---- ion-segment ----': [""],
                        'ionChange ': ['"ionChange"'],

                        '---- ion-select ----': [""],
                        'ionBlur 7': ['"ionBlur"'],
                        'ionCancel 7': ['"ionCancel"'],
                        'ionChange 7': ['"ionChange"'],
                        'ionDismiss': ['"ionClear"'],
                        'ionFocus 7': ['"ionFocus"'],
//                        'ionInput 6': ['"ionInput"'],     

                        '---- ion-slides ----': [""],
                        'ionSlideDidChange': ['"ionSlideDidChange"'],
                        'ionSlideDoubleTap': ['"ionSlideDoubleTap"'],
                        'ionSlideDrag': ['"ionSlideDrag"'],
                        'ionSlideNextEnd': ['"ionSlideNextEnd"'],
                        'ionSlideNextStart': ['"ionSlideNextStart"'],

                        'ionSlidePrevEnd': ['"ionSlidePrevEnd"'],
                        'ionSlidePrevStart': ['"ionSlidePrevStart"'],
                        'ionSlideReachEnd': ['"ionSlideReachEnd"'],
                        'ionSlideReachStart': ['"ionSlideReachStart"'],
                        'ionSlidesDidLoad': ['"ionSlidesDidLoad"'],
                        'ionSlideTap': ['"ionSlideTap"'],
                        'ionSlideTouchEnd': ['"ionSlideTouchEnd"'],
                        'ionSlideTouchStart': ['"ionSlideTouchStart"'],
                        'ionSlideTransitionEnd': ['"ionSlideTransitionEnd"'],
                        'ionSlideTransitionStart': ['"ionSlideTransitionStart"'],
                        'ionSlideWillChange': ['"ionSlideWillChange"'],

                        '---- ion-tabs ----': [""],
                        'ionTabsDidChange': ['"ionTabsDidChange"'],
                        'ionTabsWillChange': ['"ionTabsWillChange"'],

                        '---- ion-toast ----': [""],
                        'ionToastDidDismiss': ['"ionToastDidDismiss"'],
                        'ionToastDidPresent': ['"ionToastDidPresent"'],
                        'ionToastWillDismiss': ['"ionToastWillDismiss"'],
                        'ionToastWillPresent': ['"ionToastWillPresent"'],
//                        'ionRouteWillChange 3': ['"ionFocus"'],                        
                        // FCC to be completed ion-item-options ion-reorder-group ion-route-redirect ion-searchbar 
//                        ondblclick="myFunction()"
//
//                        '---- to be verified  ... ----': [''],
////                        'onClick="myFunction()"': ['onClick'],                        
//                        'ionDoubleClick="myFunction()"': ['"ionDoubleClick"'],
//                        'ionDrag="myFunction(event)': ['"ionDrag"'],
//                        'ionDragend="myFunction(event)': ['"ionDragend"'],
//                        'ionDragEnter="myFunction(event)': ['"ionDragEnter"'],
//                        'ionDragLeave="myFunction(event)': ['"ionDragLeave"'],
//                        'ionDragOver="myFunction(event)': ['"ionDragOver"'],
//                        'ionDragStart="myFunction(event)': ['"ionDragStart"'],
//                        'ionDrop="myFunction(event)': ['"ionDrop"'],
//
//                        'ionMouseDown="myFunction()"': ['"ionMouseDown"'],
//                        'ionMouseEnter="myFunction()"': ['"ionMouseEnter"'],
//                        'ionMouseLeave="myFunction()"': ['"ionMouseLeave"'],
//                        'ionMouseMove="myFunction()"': ['"ionMouseMove"'],
//                        'ionMouseOver="myFunction()"': ['"ionMouseOver"'],
//                        'ionMouseOut="myFunction()"': ['"ionMouseOut"'],
//                        'ionMouseUp="myFunction()"': ['"ionMouseUp"'],
//                        '---- body ----': [''],
//                        'ionLoad="myFunction()"': ['"ionLoad"'],
////                        'onload="myFunction()"': ['onload'],                        
//                        '---- Button ----': [''],
//                        'ionClick="myFunction()"': ['"ionClick"'],
//
//                        '---- Input type="text" ----': [''],
//                        'ionChange="myFunction()""': ['"ionChange"'],
//                        'ionInput="myFunction()"': ['"ionInput"'],
//                        'ionKeyDown="myFunction()"': ['"ionKeyDown"'],
//                        'ionKeyPress="myFunction()"': ['"ionKeyPress"'],
////                        'onKeyDown="myFunction()"': ['onKeyDown'],
//                        'ionKeyUp="myFunction()"': ['"ionKeyUp"'],
//
//                        'ionBlur="myFunction()': ['"ionBlur"'],
//                        'ionCopy="myFunction()"': ['"ionCopy"'],
//                        'ionCut="myFunction()"': ['"ionCut"'],
////                        'oncopy="myFunction()"': ['onopy'],
//                        'ionFocus="myFunction()"': ['"ionFocus"'],
//                        'ionFocusIn="myFunction()"': ['"ionFocusIn"'],
//                        'ionFocusOut="myFunction()"': ['"ionFocusOut"'],
//                        'ionInvalid="myFunction()"': ['"ionInvalid"'],

//                        'removeEventListener(event, function, useCapture)': ["removeEventListener"],
//                        'remove()': ["remove"],
                    },
                    false
                    );
            break;

        case '%AngularCommand':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '*ngFor (*ngFor="let item of items")': ['*ngFor'],
                        '*ngIf (*ngIf="items && items.length > 0")': ['*ngIf'],
                        '[ngSwitch]': ['[ngSwitch]'],
                        '*ngSwitchDefault': ['*ngSwitchDefault'],
                        '*ngSwitchCase': ['*ngSwitchCase'],
                        '---- CSS ----': [''],
                        '[ngClass]': ['[ngClass]'],
                        '[ngStyle]': ['[ngStyle]'],

                    },
                    false
                    );
            break;

        case '%AngularComponentKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'selector': ['selector'],
                        'templateUrl': ['templateUrl'],
                        'styleUrls': ['styleUrls'],
                        'template': ['template'],
                        'styles': ['styles'],

                    },
                    false
                    );
            break;

        case '%AngularDirective':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'Component': ['Component'],
                        'Directive': ['Directive'],
                        'Input': ['Input'],
                        'Output': ['Output'],
                        'ViewChild': ['ViewChild'],
                        'HostListener': ['HostListener'],
//                        '[ngClass]': ['[ngClass]'],
//                        '[ngStyle]': ['[ngStyle]'],

                    },
                    false
                    );
            break;
            // FCC 2021/08/12 Ionic    

        case '%IonicContainer':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-app (ion-header, ion-content, ion-footer) ': ['ion-app'],
                        'ion-header': ['ion-header'],
                        'ion-content': ['ion-content'],
                        'ion-footer': ['ion-footer'],

                        '---- Menu ----': [''],
                        'ion-split-pane': ['ion-split-pane'],
                        'ion-menu': ['ion-menu'],

                        '---- menu button/toggle blocks ----': [''],
                        'ion-menu-button': ['ion-menu-button'],
                        'ion-menu-toggle': ['ion-menu-toggle'],

                        '---- Grid ----': [''],
                        'ion-grid': ['ion-grid'],
                        'ion-row': ['ion-row'],
                        'ion-col': ['ion-col'],

                        '---- slides ----': [''],
                        'ion-slides (depricated) ': ['ion-slides'],
                        'ion-slide  (depricated) ': ['ion-slide'],
                        'swiper': ['swiper'],
                        'swiper-slide': ['swiper-slide'],

                        '---- tabs ----': [''],
                        'ion-tabs': ['ion-tabs'],
                        'ion-tab': ['ion-tab'],
                        'ion-tab-bar': ['ion-tab-bar'],
                        'ion-tab-button': ['ion-tab-button'],

                        '---- toolbar blocks ----': [''],
                        'ion-toolbar': ['ion-toolbar'],
                        'ion-buttons': ['ion-buttons'],
                        'ion-button': ['ion-button'],
//                        'ion-menu-button': ['ion-menu-button'],
//                        'ion-searchbar': ['ion-searchbar'],
                        'ion-back-button': ['ion-back-button'],

//                        '---- Useful blocks ----': [''],
//                        'ion-text': ['ion-text'],
//                        'ion-tab': ['ion-tab'],   
                    },
                    false
                    );
            break;

        case '%IonicCard':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-card': ['ion-card'],
                        'ion-card-header': ['ion-card-header'],
                        'ion-card-content': ['ion-card-content'],
                        'ion-card-title': ['ion-card-title'],
                        'ion-card-subtitle': ['ion-card-subtitle'],
                        '---- containner blocks ----': [''],
                        'ion-item': ['ion-item'],

                        '---- control blocks ----': [''],
                        'ion-button': ['ion-button'],
                        'ion-icon': ['ion-icon'],
                        'ion-title': ['ion-title'],
                        'ion-label': ['ion-label'],
//                        'ion-label': ['ion-label'],
                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;

        case '%IonicChip':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-chip': ['ion-chip'],
                        'ion-buttons': ['ion-buttons'],
                        'ion-button': ['ion-button'],
                        'ion-menu-button': ['ion-menu-button'],
                        'ion-searchbar': ['ion-searchbar'],
                        'ion-back-button': ['ion-back-button'],
                        '---- Useful blocks ----': [''],
                        'ion-icon': ['ion-icon'],
                        'ion-title': ['ion-title'],
                        'ion-label': ['ion-label'],
//                        'ion-back-button': ['ion-back-button'],
                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;

        case '%IonicFloatingActionButton': //Floating Action Button
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-fab': ['ion-fab'],
                        'ion-fab-list': ['ion-fab-list'],
                        'ion-fab-button': ['ion-fab-button'],

                        '---- Useful blocks ----': [''],
                        'ion-icon': ['ion-icon'],
                        'ion-label': ['ion-label'],
//                        'ion-back-button': ['ion-back-button'],
                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;

        case '%IonicGrid':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-grid': ['ion-grid'],
                        'ion-row': ['ion-row'],
                        'ion-col': ['ion-col'],

                        '---- Useful blocks ----': [''],
                        'ion-button': ['ion-button'],
                        'ion-icon': ['ion-icon'],
                        'ion-label': ['ion-label'],
//                        'div': ['div'],
                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;

        case '%IonicInfiniteScroll': //Floating Action Button
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-infinite-scroll': ['ion-infinite-scroll'],
                        'ion-infinite-scroll-content': ['ion-infinite-scroll-content'],
//                        'ion-fab-button': ['ion-fab-button'],
                    },
                    false
                    );
            break;

        case '%IonicItem':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-item': ['ion-item'],
                        'ion-item-group': ['ion-item-group'],
                        'ion-item-divider': ['ion-item-divider'],
                        'ion-item-sliding': ['ion-item-sliding'],
                        'ion-item-options': ['ion-item-options'],
                        'ion-item-option': ['ion-item-option'],
//                        'ion-item-options': ['ion-item-options'],
                        '---- Useful blocks ----': [''],
                        'ion-icon': ['ion-icon'],
                        'ion-img': ['ion-img'],
                        'ion-label': ['ion-label'],
                    },
                    false
                    );
            break;

        case '%IonicList': //Floating Action Button
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- List blocks ----': [''],
                        'ion-list': ['ion-list'],
                        'ion-list-header': ['ion-list-header'],
                        'ion-virtual-scroll': ['ion-virtual-scroll'],
                        '---- Item blocks ----': [''],
                        'ion-item': ['ion-item'],
                        'ion-item-group': ['ion-item-group'],
                        'ion-item-divider': ['ion-item-divider'],
                        'ion-item-sliding': ['ion-item-sliding'],
                        'ion-item-options': ['ion-item-options'],
                        'ion-item-option': ['ion-item-option'],
//                        'ion-item-options': ['ion-item-options'],
                        '---- Radio blocks ----': [''],
                        'ion-radio': ['ion-radio'],
                        'ion-radio-group': ['ion-radio-group'],

                    },
                    false
                    );
            break;

        case '%IonicMedia': //Floating Action Button
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- Media blocks ----': [''],
                        'ion-avatar': ['ion-avatar'],
                        'ion-thumbnail': ['ion-thumbnail'],
                        '---- image/icon blocks ----': [''],
                        'ion-icon': ['ion-icon'],
                        'ion-img': ['ion-img'],

//                        'ion-item-options': ['ion-item-options'],
                    },
                    false
                    );
            break;

        case '%IonicMenu':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- Menu blocks ----': [''],
                        'ion-split-pane': ['ion-split-pane'],
                        'ion-menu': ['ion-menu'],
                        '---- menu button/toggle blocks ----': [''],
                        'ion-menu-button': ['ion-menu-button'],
                        'ion-menu-toggle': ['ion-menu-toggle'],

//                        'ion-item-options': ['ion-item-options'],
                    },
                    false
                    );
            break;


        case '%IonicReorder':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-reorder-group': ['ion-reorder-group'],
                        'ion-reorder': ['ion-reorder'],

                        '---- menu button/toggle blocks ----': [''],
                        'ion-item': ['ion-item'],
                        'ion-label': ['ion-label'],
                        'ion-icon': ['ion-icon'],
                    },
                    false
                    );
            break;

        case '%IonicRouter':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-router': ['ion-router'],
                        'ion-router-outlet': ['ion-router-outlet'],

                        '---- Router blocks ----': [''],
                        'ion-route': ['ion-route'],
                        'ion-router-link': ['ion-router-link'],
                        'ion-route-redirect': ['ion-route-redirect'],

                    },
                    false
                    );
            break;

        case '%IonicSegmentButton':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-segment': ['ion-segment'],
                        'ion-segment-button': ['ion-segment-button'],
                    },
                    false
                    );
            break;

        case '%IonicSlides':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- slides ----': [''],

                        'ion-slides': ['ion-slides'],
                        'ion-slide': ['ion-slide'],
                    },
                    false
                    );
            break;

        case '%IonicSelect':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ion-select': ['ion-select'],
                        'ion-select-option': ['ion-select-option'],
                    },
                    false
                    );
            break;

        case '%IonicTabs':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-tabs': ['ion-tabs'],
                        'ion-tab': ['ion-tab'],
                        'ion-tab-bar': ['ion-tab-bar'],
                        'ion-tab-button': ['ion-tab-button'],
                        '---- Useful blocks ----': [''],
                        'ion-icon': ['ion-icon'],
                        'ion-title': ['ion-title'],
                        'ion-label': ['ion-label'],
//                        'ion-back-button': ['ion-back-button'],
                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;

        case '%IonicToolbar':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ion-toolbar': ['ion-toolbar'],
                        'ion-buttons': ['ion-buttons'],
                        'ion-button': ['ion-button'],
                        'ion-menu-button': ['ion-menu-button'],
                        'ion-searchbar': ['ion-searchbar'],
                        'ion-back-button': ['ion-back-button'],
                        '---- Useful blocks ----': [''],
                        'ion-icon': ['ion-icon'],
                        'ion-title': ['ion-title'],
                        'ion-label': ['ion-label'],
//                        'ion-back-button': ['ion-back-button'],
                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;


        case '%IonicControl':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- text blocks ----': [''],
                        'ion-badge': ['ion-badge'],
                        'ion-card-title': ['ion-card-title'],
                        'ion-card-subtitle': ['ion-card-subtitle'],

                        'ion-datetime': ['ion-datetime'],
                        'ion-label': ['ion-label'],
                        'ion-note': ['ion-note'],
                        'ion-reorder': ['ion-reorder'],
                        'ion-text': ['ion-text'],
                        'ion-title': ['ion-title'],
                        'ion-skeleton-text': ['ion-skeleton-text'],
//                        '---- input blocks ----': [''],
//                        'ion-checkbox': ['ion-checkbox'],
//                        'ion-input': ['ion-input'],
//                        'ion-textarea': ['ion-textarea'],
//                        'ion-range': ['ion-range'],
//                        'ion-searchbar': ['ion-searchbar'],

                        '---- image/icon blocks ----': [''],
                        'ion-icon': ['ion-icon'],
                        'ion-img': ['ion-img'],
//                        'ion-avatar': ['ion-avatar'],
//                        'ion-thumbnail': ['ion-thumbnail'],

//                        '---- button/toggle blocks ----': [''],
//                        'ion-button': ['ion-button'],
//                        'ion-radio': ['ion-radio'],
//                        'ion-toggle': ['ion-toggle'],
//                        'ion-menu-button': ['ion-menu-button'],
//                        'ion-menu-toggle': ['ion-menu-toggle'],
//                        'ion-segment-button': ['ion-segment-button'],

//                        '---- selection blocks ----': [''],
//                        'ion-select-option': ['ion-select-option'],

                        '---- modal blocks ----': [''],
                        'ion-modal': ['ion-modal'],
                        'ion-backdrop': ['ion-backdrop'],

                        '---- Navigation blocks ----': [''],
                        'ion-nav': ['ion-nav'],
                        'ion-nav-link': ['ion-nav-link'],

//                        '---- Dialog blocks ----': [''],
//                        'ion-popover': ['ion-popover'],
//                        'ion-loading': ['ion-loading'],
//                        'ion-progress-bar': ['ion-progress-bar'],
//                        'ion-spinner': ['ion-spinner'],

//                        '---- Router blocks ----': [''],
//                        'ion-route': ['ion-route'],
//                        'ion-router-link': ['ion-router-link'],
//                        'ion-route-redirect': ['ion-route-redirect'],
//
//                        'ion-ripple-effect': ['ion-ripple-effect'],
//                        'ion-searchbar': ['ion-searchbar'],
//                        'ion-back-button': ['ion-back-button'],

//                        'ion-segment-button': ['ion-segment-button'],

//                        'ion-checkbox': ['ion-checkbox'],
                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;

        case '%IonicControl2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

//                        '---- text blocks ----': [''],
//                        'ion-badge': ['ion-badge'],
//                        'ion-card-title': ['ion-card-title'],
//                        'ion-card-subtitle': ['ion-card-subtitle'],
//
//                        'ion-datetime': ['ion-datetime'],
//                        'ion-label': ['ion-label'],
//                        'ion-note': ['ion-note'],
//                        'ion-reorder': ['ion-reorder'],
//                        'ion-text': ['ion-text'],
//                        'ion-title': ['ion-title'],

                        '---- input blocks ----': [''],
                        'ion-datetime': ['ion-datetime'],
                        'ion-input': ['ion-input'],
                        'ion-textarea': ['ion-textarea'],
                        'ion-range': ['ion-range'],
                        'ion-searchbar': ['ion-searchbar'],

//                        '---- image/icon blocks ----': [''],
//                        'ion-icon': ['ion-icon'],
//                        'ion-img': ['ion-img'],
//                        'ion-avatar': ['ion-avatar'],
//                        'ion-thumbnail': ['ion-thumbnail'],

                        '---- button/toggle blocks ----': [''],
                        'ion-button': ['ion-button'],
                        'ion-radio': ['ion-radio'],
                        'ion-toggle': ['ion-toggle'],
                        'ion-menu-button': ['ion-menu-button'],
                        'ion-menu-toggle': ['ion-menu-toggle'],
//                        'ion-segment-button': ['ion-segment-button'],

                        '---- selection blocks ----': [''],
                        'ion-select-option': ['ion-select-option'],

                        '---- modal blocks ----': [''],
                        'ion-modal': ['ion-modal'],
                        'ion-backdrop': ['ion-backdrop'],

                        '---- Navigation blocks ----': [''],
                        'ion-nav': ['ion-nav'],
                        'ion-nav-link': ['ion-nav-link'],

                        '---- Dialog blocks ----': [''],
                        'ion-popover': ['ion-popover'],
                        'ion-loading': ['ion-loading'],
                        'ion-progress-bar': ['ion-progress-bar'],
                        'ion-spinner': ['ion-spinner'],

                        '---- Router blocks ----': [''],
                        'ion-route': ['ion-route'],
                        'ion-router-link': ['ion-router-link'],
                        'ion-route-redirect': ['ion-route-redirect'],

                        'ion-ripple-effect': ['ion-ripple-effect'],
//                        'ion-searchbar': ['ion-searchbar'],
                        'ion-back-button': ['ion-back-button'],

//                        'ion-segment-button': ['ion-segment-button'],

//                        'ion-checkbox': ['ion-checkbox'],
//                        'ion-searchbar': ['ion-searchbar'],
                    },
                    false
                    );
            break;
//FCC class = ion-text-center

        case '%IonicTextAlignment':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-button ----': [''],
                        'ion-text-start': ['ion-text-start'],
                        'ion-text-center"': ['ion-text-center'],
                        'ion-text-end': ['ion-text-end'],
                        'ion-text-justify': ['ion-text-justify'],
                        'ion-text-wrap': ['ion-text-wrap'],
                        'ion-text-nowrap': ['ion-text-nowrap'],

                    },
                    false
                    );
            break;



// Button property         
        case '%IonicButtonProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-button ----': [''],
                        'color="primary/secondary/success/danger/.."': ['color'],
                        'disabled="true/false"': ['disabled'],
                        'expand="block/full"': ['expand'],
                        'fill="clear/outline/solid"': ['fill'],
                        'href="url"': ['href'],
                        'ios="heart-outline"': ['ios'],
                        'md="heart-sharp"': ['md'],
                        'shape="round"': ['shape'],
                        'size="small/large/default"': ['size'],
                        'slot="start|end|primary|secondary"': ['slot'],
                        '---- ion-tab ----': [''],
                        'value="brown"': ['value'],
                        'tab="home/settings"': ['tab'],

                        '---- ion-tab-bar ----': [''],
                        'slot="top"': ['slot'],
                        'slot="bottom"': ['slot'],
                        'src="image.png"': ['src'],

                        '---- ion-tab-button ----': [''],
                        'tab="heart"': ['tab'],
                    },
                    false
                    );
            break;

        case '%IonicButtonPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-button ----': [''],
                        'color="primary"': ['primary'],
                        'color="secondary"': ['secondary'],
                        'color="danger"': ['danger'],
                        'disabled="true"': ['true'],
                        'disabled="false"': ['false'],
                        'expand="full"': ['full'],
                        'expand="block"': ['block'],
                        'fill="clear"': ['clear'],
                        'fill="outline"': ['outline'],
                        'fill="solid"': ['solid'],
                        'href="url"': ['href'],
                        'ios="heart-outline"': ['heart-outline'],
                        'md="heart-sharp"': ['heart-sharp'],
                        'shape="round"': ['round'],
                        'size="small"': ['small'],
                        'size="large"': ['large'],
                        'slot="start"': ['start'],
                        'slot="end"': ['end'],
                        'slot="primary"': ['primary'],
                        'slot="secondary"': ['secondary'],
                        '---- ion-tab ----': [''],
                        'value="brown"': ['brown'],
                        'tab="home"': ['home'],
                        'tab="settings"': ['settings'],

                        '---- ion-tab-bar ----': [''],
                        'slot="top"': ['top'],
                        'slot="bottom"': ['bottom'],
                        'src="image.png"': ['image.png'],

                        '---- ion-tab-button ----': [''],
                        'tab="heart"': ['heart'],

                    },
                    false
                    );
            break;

//%IonicCardProperty = %IonicCardPropertyValue            
        case '%IonicCardProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'mode="ios/md"': ['mode'],

                        '---- ion-card ----': [''],
                        'button="true/false"': ['button'],
                        'color="primary/secondary/success/danger/.."': ['color'],
                        'disabled="true/false"': ['disabled'],
                        'download="URL"': ['download'],
                        'href="URL"': ['href'],

                        'rel="bottom/top"': ['rel'],

                        'routerDirection="back" | "forward" | "root"': ['routerDirection'],
                        'target="_blank" | "_self" | "_parent" | "_top': ['target'],
                        'type="button" | "reset" | "submit"': ['type'],
                        '---- ion-card-header ----': [''],
                        '1 color="primary/secondary/success/danger/.."': ['color'],
                        'translucent="true/false"': ['translucent'],
                        '---- ion-card-subtitle ----': [''],
                        '2 color="primary/secondary/success/danger/.."': ['color'],
//                        'mode="ios/md"': ['mode'],                       
                        '---- ion-card-title ----': [''],
                        '3 color="primary/secondary/success/danger/.."': ['color'],
//                        'translucent="true/false"': ['translucent'],
                    },
                    false
                    );
            break;

        case '%IonicCardPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'mode="ios/md"': ['ios'],
                        'mode="md"': ['md'],

                        '---- ion-card ----': [''],
                        'button/disabled="true"': ['true'],
                        'button/disabled="false"': ['false'],
                        'color="primary/secondary/success/danger/.."': ['primary'],
//                        'disabled="true/false"': ['disabled'],
                        'download="URL"': [''],
                        'href="URL"': [''],

                        'rel="bottom"': ['bottom'],
                        'rel="top"': ['top'],

                        'routerDirection="back" | "forward" | "root"': ['back'],
                        'target="_blank" | "_self" | "_parent" | "_top': ['_blank'],
                        'type="button" | "reset" | "submit"': ['button'],
                        '---- ion-card-header ----': [''],
                        '1 color="primary/secondary/success/danger/.."': ['secondary'],
                        'translucent="true"': ['true'],
                        '---- ion-card-subtitle ----': [''],
                        '2 color="primary/secondary/success/danger/.."': ['danger'],
//                        'mode="ios/md"': ['mode'],                       
                        '---- ion-card-title ----': [''],
                        '3 color="primary/secondary/success/danger/.."': ['success'],
//                       
                    },
                    false
                    );
            break;

// Chip Property
        case '%IonicChipProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'color="primary/secondary/success/danger/.."': ['color'],
                        'disabled="true/false"': ['disabled'],
                        'outline="true/false"': ['outline'],

                    },
                    false
                    );
            break;

        case '%IonicChipPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'color="primary/secondary/success/danger/.."': ['primary'],
                        'disabled/outline="true"': ['true'],
                        'outline/outline="false"': ['false'],

                    },
                    false
                    );
            break;

// Content Property 
        case '%IonicContentProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-content ----': [''],
                        'color="primary/secondary/success/danger/.."': ['primary'],
                        'forceOverscroll="true/false"': ['forceOverscroll'],
                        'fullscreen="true/false"': ['fullscreen'],
                        'scrollEvents="true/false"': ['scrollEvents'],
                        'scrollX="true/false"': ['scrollX'],
                        'scrollY="true/false"': ['scrollY'],
                        '---- ion-header ----': [''],
                        'collapse="condense" (ios only)': ['collapse'],
                        'translucent="true/false"': ['translucent'],
                        '---- ion-footer ----': [''],
                        '2 translucent="true/false"': ['forceOverscroll'],

                    },
                    false
                    );
            break;

        case '%IonicContentPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-content ----': [''],
                        'color="primary/secondary/success/danger/.."': ['primary'],
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

// %IonicDateTimeProperty         
        case '%IonicDateTimeProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'disabled="true"': ['disabled'],
                        'first-day-of-week="1"': ['first-day-of-week'],
                        'hour-cycle="h12" | h23" | h11" | h24" | ': ['hour-cycle'],
                        'locale="fr-FR" | "en-GB" | "en-GB-u-hc-h12"': ['locale'],
                        'max="2022-01-01"': ['max'],
                        'min="1995-12-31"': ['min'],
                        'presentation="time-date" | presentation="time"': ['presentation'],
                        'readonly="true"': ['readonly'],
                        'value="2012-12-15T13:47:20.789"': ['value'],

                        '---- Datetime Format  ----': [''],
                        'year-values="2014,2015"': ['year-values'],
                        'month-values="6,7,8"': ['month-values'],
                        'day-values="01,02,03,04,05,06,08,09,10,11,12,13,14"': ['day-values'],
                        'hour-values="08,09,10,11,12"': ['hour-values'],
                        'minute-values="0,15,30,45"': ['minute-values'],
                        'second-values="0,15,30,45"': ['second-values'],
                    },
                    false
                    );
            break;

        case '%IonicDateTimePropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- ion-button ----': [''],
                        'true (disabled/readonly)': ['true'],
                        'false (disabled/readonly)': ['false'],
                        '0 (first-day-of-week)': ['0'],
                        '1 (first-day-of-week)': ['1'],
                        'hour-cycle= "h12" ': ['h12'],
                        'hour-cycle= "h23" ': ['h23'],
                        'hour-cycle= "h11" ': ['h11'],
                        'hour-cycle= "h24" ': ['h24'],
                        'locale= "fr-FR"': ['fr-FR'],
                        'locale= "en-GB" ': ['en-GB'],
                        'locale= "en-GB-u-hc-h12"': ['en-GB-u-hc-h12'],
                        'locale= "en-US" ': ['en-US'],
                        'locale= "zh-TW" ': ['zh-TW'],
                        'max="2022-01-01"': ['2022-01-01'],
                        'min="1995-12-31"': ['1995-12-31'],
                        'presentation="time"': ['time'],
                        'presentation="time-date"': ['time-date'],
//                        'readonly="true"': ['readonly'],
                        'value="2012-12-15T13:47:20.789"': ['2012-12-15T13:47:20.789'],

                        '---- Datetime Format  ----': [''],
                        'year-values="2014,2015"': ['2020,2022'],
                        'month-values="6,7,8"': ['6,7,8'],
                        'day-values="01,02,03,04,05,06,08,09,10,11,12,13,14"': ['01,02,03,04,05,06,08,09,10,11,12,13,14'],
                        'hour-values="08,09,10,11,12"': ['08,09,10,11,12'],
                        'minute-values="0,15,30,45"': ['0,15,30,45'],
                        'second-values="0,15,30,45"': ['0,15,30,45'],

                    },
                    false
                    );
            break;


//%IonicFabProperty = %IonicFabPropertyValue

        case '%IonicFabProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-fab ----': [''],
                        'activated="true/false"': ['activated'],
                        'edge="true/false"': ['edge'],
                        'horizontal="center" | "end" | "start"': ['horizontal'],
                        'vertical="bottom" | "center" | "top" ': ['vertical'],
//                        'closeIcon="home/settings"': ['closeIcon'],
                        '---- ion-fab-button ----': [''],
                        'activated="true/false"': ['activated'],
                        'closeIcon="close"': ['closeIcon'],
//                        'color="primary"': ['primary'],
                        'color="secondary"': ['color'],
                        'disabled="true/false"': ['disabled'],
                        'expand="full"': ['expand'],
                        'fill="clear"': ['fill'],
                        'href="url"': ['href'],
                        'ios="heart-outline"': ['ios'],
                        'md="heart-sharp"': ['md'],
                        'shape="round"': ['shape'],
                        'size="small"': ['size'],

                        '---- ion-fab-list ----': [''],
                        '2 activated="true/false"': ['activated'],
                        'side="bottom" | "end" | "start" | "top"': ['side'],
                    },
                    false
                    );
            break;

        case '%IonicFabPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-fab activated/edge----': [''],
                        'true': ['true'],
                        'false': ['false'],

                        '---- ion-fab horizontal/ion-fab-list ----': [''],
                        'center': ['center'],
                        'end': ['end'],
                        'start': ['start'],
                        '---- ion-fab vertical/ion-fab-list ----': [''],
                        '2 center': ['center'],
                        'bottom': ['bottom'],
                        'top': ['top'],

                        '---- ion-fab-button  ----': [''],

                        'color="primary"': ['primary'],
                        'color="secondary"': ['secondary'],
                        'color="danger"': ['danger'],
                        'disabled="true"': ['true'],
                        'disabled="false"': ['false'],
                        'expand="full"': ['full'],
                        'expand="block"': ['block'],
                        'fill="clear"': ['clear'],
                        'fill="outline"': ['outline'],
                        'fill="solid"': ['solid'],
                        'href="url"': ['href'],
                        'ios="heart-outline"': ['heart-outline'],
                        'md="heart-sharp"': ['heart-sharp'],
                        'shape="round"': ['round'],
                        'size="small"': ['small'],
                        'size="large"': ['large'],

//                        '---- ion-fab-list ----': [''],                       
//                        'fixed="true/false"': ['fixed'],      
//                        'side="bottom" | "end" | "start" | "top"': ['side'],                        

                    },
                    false
                    );
            break;

//Grid Property 
        case '%IonicGridProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-grid ----': [''],
                        'fixed="true/false"': ['fixed'],

                        '---- ion-col ----': [''],
                        'offset="3"': ['offset'],
                        'offsetLg="3"': ['offsetLg'],
                        'offsetMd="3"': ['offsetMd'],
                        'offsetSm="3"': ['offsetSm'],
                        'offsetXl="3"': ['offsetXl'],
                        'offsetXs="3"': ['offsetXs'],
                        'pull="3"': ['pull'],
                        'pullLg="3"': ['pullLg'],
                        'pullMd="3"': ['pullMd'],
                        'pullSm="3"': ['pullSm'],
                        'pullXl="3"': ['pullXl'],
                        'pullXs="3"': ['pullXs'],
                        'push="3"': ['push'],
                        'pushLg="3"': ['pushLg'],
                        'pushMd="3"': ['pushMd'],
                        'pushSm="3"': ['pushSm'],
                        'pushXl="3"': ['pushXl'],
                        'pushXs="3"': ['pushXs'],
                        'size="3"': ['size'],
                        'sizeLg="3"': ['sizeLg'],
                        'sizeMd="3"': ['sizeMd'],
                        'sizeSm="3"': ['sizeSm'],
                        'sizeXl="3"': ['sizeXl'],
                        'sizeXs="3"': ['sizeXs'],
                        'size-lg="3"': ['size-lg'],
                        'size-md="3"': ['size-md'],
                        'size-sm="3"': ['size-sm'],
                        'size-xl="3"': ['size-xl'],
                        'size-xs="3"': ['size-xs'],
//                        'pull="3"': ['pull'],
//                        'pullLg="3"': ['pullLg'],
//
//                        '---- ion-tab-button ----': [''],
//                        'tab="home/settings"': ['tab'],

                    },
                    false
                    );
            break;

        case '%IonicGridPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],

                        '3': ['3'],

                    },
                    false
                    );
            break;
//Eric 20220519 cssHref			
        case '%cssHref':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '': [''],
                    },
                    false
                    );
            break;

//Eric 20220524 
//CordovaEvent
        case '%CordovaEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '"deviceready"': ['"deviceready"'],
//                        '"batterylow"': ['"batterylow"'],
//                        '"batterycritical"': ['"batterycritical"'],
                    },
                    false
                    );
            break;

        case '%BatteryEvent':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '"batterystatus"': ['"batterystatus"'],
                        '"batterylow"': ['"batterylow"'],
                        '"batterycritical"': ['"batterycritical"'],
                    },
                    false
                    );
            break;
        case '%CordovaProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- device ----': [''],
                        'cordova': ['cordova'],
                        'model': ['model'],
                        'platform': ['platform'],
                        'uuid': ['uuid'],
                        'version': ['version'],
                        'manufacturer': ['manufacturer'],
                        'isVirtual': ['isVirtual'],
                        'serial': ['serial'],
                        '---- battery ----': [''],
                        'level': ['level'],
                        'isPlugged': ['isPlugged'],
                        '---- accelerometer ----': [''],
                        'x': ['x'],
                        'y': ['y'],
                        'z': ['z'],
                        'timestamp(accelerometer)': ['timestamp'],
                        '---- geolocation ----': [''],
                        'coords.latitude': ['coords.latitude'],
                        'coords.longitude': ['coords.longitude'],
                        'coords.altitude ': ['coords.altitude'],
                        'coords.accuracy ': ['coords.accuracy'],
                        'coords.altitudeAccuracy': ['coords.altitudeAccuracy'],
                        'coords.heading': ['coords.heading'],
                        'coords.speed': ['coords.speed'],
                        'timestamp(geolocation)': ['timestamp'],
                        '---- Wi-Fi ----': [''],
                        'level': ['level'],
                        'SSID': ['SSID'],
                        'BSSID': ['BSSID'],
                        'frequency': ['frequency'],
                        'capabilities': ['capabilities'],
                        'timestamp(Wi-Fi)': ['timestamp'],
                        'channelWidth': ['channelWidth'],
                        'centerFreq0': ['centerFreq0'],
                        'centerFreq1': ['centerFreq1'],
                        '---- BLE ----': [''],
                        'address': ['address'],
                        'name': ['name'],
                        'rssi': ['rssi'],
                        'advertisement': ['advertisement'],
                        'status': ['status'],
                    },
                    false
                    );
            break;

        case '%CordovaFunction1':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- accelerometer ----': [''],
                        'navigator.accelerometer.clearWatch(watchID);': ['navigator.accelerometer.clearWatch'],
                        '---- geolocation ----': [''],
                        'navigator.geolocation.clearWatch(watchID);': ['navigator.geolocation.clearWatch'],
                        '---- QRScanner ----': [''],
                        'window.QRScanner.prepare': ['window.QRScanner.prepare'],
                        'window.QRScanner.scan': ['window.QRScanner.scan'],
                        'window.QRScanner.show': ['window.QRScanner.show'],
                        'window.QRScanner.destroy': ['window.QRScanner.destroy'],
                        '---- wifiManager ----': [''],
                        'window.wifiManager.connect("SSID","Password",OnConnect,OnError)': ['window.wifiManager.connect'],
                    },
                    false
                    );
            break;

        case '%CordovaFunction2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- WifiWizard2 ----': [''],
                        'WifiWizard2.startScan': ['WifiWizard2.startScan'],
                        'WifiWizard2.getScanResults': ['WifiWizard2.getScanResults'],
                    },
                    false
                    );
            break;

        case '%CordovaCallBackFunction1':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- accelerometer ----': [''],
                        'navigator.accelerometer.getCurrentAcceleration': ['navigator.accelerometer.getCurrentAcceleration'],
                        '---- geolocation ----': [''],
                        'navigator.geolocation.getCurrentPosition': ['navigator.geolocation.getCurrentPosition'],
                        '---- ble ----': [''],
                        'bluetoothle.startScan': ['bluetoothle.startScan']
                    },
                    false
                    );
            break;

        case '%CordovaCallBackFunction2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- camera ----': [''],
                        'navigator.camera.getPicture': ['navigator.camera.getPicture'],
                        '---- accelerometer ----': [''],
                        'navigator.accelerometer.watchAcceleration': ['navigator.accelerometer.watchAcceleration'],
                        '---- geolocation ----': [''],
                        'navigator.geolocation.watchPosition': ['navigator.geolocation.watchPosition'],
                        '---- ble ----': [''],
                        'bluetoothle.connect(onConnect,onError,params)': ['bluetoothle.connect']
                    },
                    false
                    );
            break;

// Infinite Scroll Property
        case '%IonicInfiniteScrollProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                        '---- ion-infinite-scroll ----': [''],
                        'threshold="15%"': ['threshold'],

                        '---- ion-infinite-scroll-content ----': [''],
                        'loadingSpinner="bubbles"': ['bubbles'],
                        'loadingSpinner="circles"': ['circles'],
                        'loadingSpinner="circular"': ['circular'],
                        'loadingSpinner="crescent"': ['crescent'],
                        'loadingSpinner="dots"': ['dots'],
                        'loadingSpinner="lines"': ['lines'],
                        'loadingSpinner="lines-small"': ['lines-small'],

                        //                        'loadingText="IonicSafeString | string"': ['loadingText'],

                    },
                    false
                    );
            break;

        case '%IonicInfiniteScrollPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-infinite-scroll ----': [''],
                        'disabled="true/false"': ['disabled'],
                        'position="bottom/top"': ['position'],
                        'position="top"': ['top'],
                        'position="bottom"': ['bottom'],
                        'threshold="15%"': ['threshold'],

                        '---- ion-infinite-scroll-content ----': [''],
                        'loadingSpinner="bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small"': ['loadingSpinner'],
                        'loadingText="IonicSafeString | string"': ['loadingText'],

                        '---- ion-tab-bar ----': [''],

                        'src="image.png"': ['image.png'],
                        '---- ion-tab-button ----': [''],
                        'tab="heart"': ['heart'],

                    },
                    false
                    );
            break;


// Input Property
        case '%IonicInputProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-input ----': [''],
                        'accept="str"': ['accept'],
                        'autocapitalize="off", "none", "on", "sentences", "words", "characters"': ['autocapitalize'],
                        'autocomplete="on" | "off" | ...': ['autocomplete'],
                        'autocorrect="on" | "off"': ['autocorrect'],
                        'autofocus="true/false"': ['autofocus'],
                        'clearInput="true/false"': ['clearInput'],
                        'clearOnEdit="true/false"': ['clearOnEdit'],
                        'color="primary"': ['color'],
                        'debounce="100': ['debounce'],
                        'disabled="true/false"': ['disabled'],
                        'enterkeyhint="done" | "enter" | "go" | "next" | "previous" | "search" | "send"': ['enterkeyhint'],
                        'inputmode="decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url" ': ['inputmode'],
                        'max="100"': ['max'],
                        'maxlength=20': ['maxlength'],
                        'min="100"': ['min'],
                        'minlength=20': ['minlength'],
                        'mode="ios" | "md"': ['mode'],

                        'multiple="true/false"': ['multiple'],
                        'name="this.inputId"': ['name'],
                        'pattern="pat"': ['pattern'],
                        'placeholder="Instructional text"': ['placeholder'],
                        'readonly="true/false"': ['readonly'],
                        'required="true/false"': ['required'],
                        'size="100"': ['size'],
                        'spellcheck="true/false"': ['spellcheck'],
                        'step="value"': ['step'],
                        'type="date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week"': ['type'],
                        'value="value"': ['value'],

                        '---- ion-textarea ----': [''],
                        'autoGrow="true/false"': ['autoGrow'],

                        '2 autocapitalize="off", "none", "on", "sentences", "words", "characters"': ['autocapitalize'],
//                        'autocomplete="on" | "off" | ...': ['autocomplete'],
//                        'autocorrect="on" | "off"': ['autocorrect'],
                        '2 autofocus="true/false"': ['autofocus'],
                        '2 clearInput="true/false"': ['clearInput'],
                        '2 clearOnEdit="true/false"': ['clearOnEdit'],
                        '2 color="primary"': ['color'],
                        'cols="100"': ['cols'],
                        '2 debounce="100': ['debounce'],
                        '2 disabled="true/false"': ['disabled'],
                        '2 enterkeyhint="done" | "enter" | "go" | "next" | "previous" | "search" | "send"': ['enterkeyhint'],
                        '2 inputmode="decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url" ': ['inputmode'],
//                        'max="100"': ['max'],
                        '2 maxlength=20': ['maxlength'],
//                        'min="100"': ['min'],
                        '2 minlength=20': ['minlength'],
                        '2 mode="ios" | "md"': ['mode'],

//                        'multiple="true/false"': ['multiple'],
                        '2 name="this.inputId"': ['name'],
//                        'pattern="pat"': ['pattern'],
                        '2 placeholder="Instructional text"': ['placeholder'],
                        '2 readonly="true/false"': ['readonly'],
                        '2 required="true/false"': ['required'],
                        'rows="100"': ['rows'],
//                        'size="100"': ['size'],
                        '2 spellcheck="true/false"': ['spellcheck'],
//                        'step="value"': ['step'],
//                        'type="date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week"': ['type'],
                        '2 value="value"': ['value'],

                        'wrap="hard" | "off" | "soft" ': ['wrap'],
                    },
                    false
                    );
            break;

        case '%IonicInputPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                        'off': ['off'],
                        'on': ['on'],
                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        'enterkeyhint="done"': ['done'],
                        'inputmode="decimal" | "email" ': ['email'],
                        'enterkeyhint="enter" ': ['enter'],
                        'enterkeyhint="go"': ['go'],
                        'enterkeyhint="next"': ['next'],
                        'enterkeyhint="previous"': ['previous'],
                        'enterkeyhint="search"': ['search'],
                        'enterkeyhint="send"': ['send'],
                        'inputmode="decimal"': ['decimal'],
                        'inputmode="email" ': ['email'],
                        'inputmode="numeric"': ['numeric'],
                        'inputmode="email" ': ['email'],

                        'inputmode="search" ': ['search'],
                        'inputmode="tel"': ['tel'],
                        'inputmode="text"': ['text'],
                        'inputmode="url" ': ['url'],

                        'type="date"': ['date'],
                        'type="datetime-local"': ['datetime-local'],
                        'type="email"': ['email'],
                        'type="month"': ['month'],
                        'type="number"': ['number'],
                        'type="password"': ['password'],
                        'type="search"': ['search'],
                        'type="tel"': ['tel'],
                        'type="text"': ['text'],
                        'type="time"': ['time'],
                        'type="url"': ['url'],
                        'type="week"': ['week'],
//                        '---- ion-tab ----': [''],
//                        'value="brown"': ['value'],
//                        'tab="home/settings"': ['settings'],
//
//                        '---- ion-tab-bar ----': [''],
//                        'slot="top"': ['top'],
//                        'slot="bottom"': ['bottom'],
//                        'src="image.png"': ['image.png'],
//                        '---- ion-tab-button ----': [''],
//                        'tab="heart"': ['heart'],

                    },
                    false
                    );
            break;

// Item Property 
        case '%IonicItemProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-item ----': [''],

                        'button="true/false"': ['button'],
                        'color="primary"': ['color'],
                        'detail="true/false"': ['detail'],
                        'detailIcon="home/settings"': ['detailIcon'],
                        'disabled="true/false"': ['disabled'],

//                        'mode="md"': ['md'],
//                        
                        'download="URL"': ['download'],
                        'href="URL"': ['href'],

                        'lines="full" | "inset" | "none" ': ['lines'],
                        'mode="ios|md"': ['mode'],
                        'routerDirection="back" | "forward" | "root"': ['back'],
                        'target="_blank" | "_self" | "_parent" | "_top': ['_blank'],
                        'type="button" | "reset" | "submit"': ['button'],

                        '---- ion-item-divider ----': [''],
                        '2 color="primary"': ['color'],
                        '2 mode="ios|md"': ['mode'],
                        'sticky="true/false"': ['sticky'],

                        '---- ion-item-group ----': [''],

                        '---- ion-item-options ----': [''],
                        'side="end" | "start"': ['side'],

                        '---- ion-item-option ----': [''],
                        '5 color="primary"': ['color'],
                        '5 disabled="true/false"': ['disabled'],
                        '5 download="URL"': ['download'],
                        'expandable="true/false"': ['expandable'],
                        '5 href="URL"': ['href'],
                        '5 mode="ios|md"': ['mode'],
                        'rel="URL': ['rel'],
                        '5 target="_blank" | "_self" | "_parent" | "_top': ['_blank'],
                        '5 type="button" | "reset" | "submit"': ['type'],

                    },
                    false
                    );
            break;

        case '%IonicItemPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                        'off': ['off'],
                        'on': ['on'],
                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        'lines="full"': ['full'],
                        'lines="inset': ['inset'],
                        'lines="none" ': ['none'],

                        '---- ion-item-options ----': [''],
                        'side="end': ['end'],
                        'side="start"': ['start'],
                    },
                    false
                    );
            break;

// List
        case '%IonicListProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-list ----': [''],
                        'inset="true/false"': ['inset'],
                        'lines="full" | "inset" | "none" ': ['lines'],
                        'mode="ios|md"': ['mode'],

                        '---- ion-item-divider ----': [''],
                        'color="primary"': ['color'],
                        '2 lines="full" | "inset" | "none" ': ['lines'],
                        '2 mode="ios|md"': ['mode'],

                        '---- ion-virtual-scroll ----': [''],
                    },
                    false
                    );
            break;

        case '%IonicListPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],

                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        'lines="full"': ['full'],
                        'lines="inset': ['inset'],
                        'lines="none" ': ['none'],

                    },
                    false
                    );
            break;

// Menu Property 
        case '%IonicMenuProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-menu ----': [''],
                        'content-id="cId"': ['content-id'],
                        'disabled="true/false"': ['disabled'],
                        'menu-id="mId"': ['menu-id'],
                        'maxEdgeStart=30" ': ['maxEdgeStart'],
                        'side="end" | "start"': ['side'],
                        'swipeGesture="true/false"': ['swipeGesture'],
                        'type="overlay", "reveal", "push"': ['type'],

                        '---- ion-menu-button ----': [''],
                        'autoHide="true/false"': ['autoHide'],
                        'color="primary"': ['color'],
                        '2 disabled="true/false"': ['disabled'],
                        'menu="menu" ': ['menu'],
                        'mode="ios|md"': ['mode'],
                        'type="button" | "reset" | "submit"': ['type'],

                        '---- ion-menu-toggle ----': [''],
                        '3 autoHide="true/false"': ['autoHide'],
                        '3 menu="menu" ': ['menu'],

                        '---- ion-split-pane ----': [''],
                        '4 contentId="cId"': ['contentId'],
                        '4 disabled="true/false"': ['disabled'],
                        'when="true/false"|"string"': ['when'],
                    },
                    false
                    );
            break;

        case '%IonicMenuPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],

                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        'lines="full"': ['full'],
                        'lines="inset': ['inset'],
                        'lines="none" ': ['none'],

                    },
                    false
                    );
            break;

// Progress Property
        case '%IonicProgressProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-loading ----': [''],
//                        'tab="home/settings"': ['tab'],

                        '---- ion-progress-bar ----': [''],
                        'buffer=value"': ['buffer'],

                        'color="primary"': ['color'],
                        'mode="ios|md"': ['mode'],
                        'reversed="true/false""': ['reversed'],
                        'value=1"': ['value'],

                        '---- ion-skeleton-text ----': [''],
                        'animated="true/false""': ['animated'],

                        '---- ion-spinner ----': [''],
                        '4 color="primary"': ['color'],
                        'duration= n milliseconds': ['duration'],
                        'name="bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small"': ['name'],

                        'paused="true/false"': ['paused'],

                    },
                    false
                    );
            break;

        case '%IonicProgressPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        '---- ion-loading ----': [''],
//                        'tab="home/settings"': ['tab'],

                        '---- ion-progress-bar ----': [''],
                        'buffer=value"': ['buffer'],

                        'color="primary"': ['primary'],
                        'mode="ios|md"': ['ios'],
                        'reversed="true/false""': ['true'],
                        'value=1"': ['value'],

                        '---- ion-skeleton-text ----': [''],
                        'animated="true/false""': ['true'],

                        '---- ion-spinner ----': [''],
                        'color="primary"': ['color'],
                        'duration= n milliseconds': ['1000'],
                        'name="bubbles"': ['bubbles'],
                        'name="circles"': ['circles'],
                        'name="circular"': ['circular'],
                        'name="crescent"': ['crescent'],
                        'name="dots"': ['dots'],
                        'name="lines"': ['lines'],
                        'name="lines-small"': ['lines-small'],

                        'paused="true"': ['true'],

                    },
                    false
                    );
            break;

// Segment Property
        case '%IonicSegmentProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-segment ----': [''],
                        'color="primary"': ['color'],
                        'disabled="true/false"': ['disabled'],
                        'mode="ios|md"': ['mode'],
                        'scrollable="true/false"': ['scrollable'],
                        'swipeGesture="true/false"': ['swipeGesture'],
                        'value="the value of the segment"': ['value'],
                        '---- ion-segment-button ----': [''],

                        '2 disabled="true/false"': ['disabled'],
                        'layout="icon-bottom" | "icon-end" | "icon-hide" | "icon-start" | "icon-top" | "label-hide"': ['layout'],
                        '2 mode="ios|md"': ['mode'],
                        'type="button" | "reset" | "submit"': ['type'],

                        'value="the value of the segment button"': ['value'],

                    },
                    false
                    );
            break;

        case '%IonicSegmentPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],

                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        '---- ion-segment ----': [''],
                        'color="primary"': ['primary'],
//                        'disabled="true/false"': ['disabled'],
//                        'mode="ios|md"': ['mode'],
//                        'scrollable="true/false"': ['scrollable'],
//                        'swipeGesture="true/false"': ['swipeGesture'],
                        'value="the value of the segment"': ['value'],
                        '---- ion-segment-button ----': [''],

//                        '2 disabled="true/false"': ['disabled'],
                        'layout="icon-bottom" ': ['icon-bottom'],
                        'layout="icon-end" ': ['icon-end'],
                        'layout="icon-hide" ': ['icon-hide'],
                        'layout="icon-start" ': ['icon-start'],
                        'layout="icon-top" ': ['icon-top'],
                        'layout="label-hide" ': ['label-hide'],

                        'type="button"': ['button'],
                        'type="reset"': ['reset'],
                        'type="submit"': ['submit'],

                        'value="the value of the segment button"': ['value'],

                    },
                    false
                    );
            break;


//Select 
        case '%IonicSelectProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-select ----': [''],
                        'cancelText="Cancel/string"': ['cancelText'],
                        'compareWith': ['compareWith'],
                        'disabled="true/false"': ['disabled'],
                        'interface="action-sheet" | "alert" | "popover"': ['interface'],
                        'interfaceOptions="{}"': ['interfaceOptions'],
                        'mode="ios|md"': ['mode'],
                        'multiple="true/false"': ['multiple'],

                        'name="this.inputId"': ['name'],
                        'okText="OK"': ['okText'],
                        'placeholder="Instructional text"': ['placeholder'],
                        'selectedText="true/false"': ['selectedText'],
                        'value="value"': ['value'],

                        '---- ion-select-option ----': [''],
                        '2 disabled="true/false"': ['disabled'],
                        '2 value="value"': ['value'],

                    },
                    false
                    );
            break;

        case '%IonicSelectPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'true': ['true'],
                        'false': ['false'],

                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        '---- ion-select ----': [''],
                        'cancelText="Cancel"': ['Cancel'],
                        'interface="action-sheet"': ['action-sheet'],
                        'interface="alert"': ['alert'],
                        'interface="popover"': ['popover'],
                        'interfaceOptions="{}"': ['interfaceOptions'],

                        'okText="OK"': ['OK'],

                    },
                    false
                    );
            break;

// Slides
        case '%IonicSlidesProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-Slides ----': [''],
                        'pager="true""': ['pager'],
                        'scrollbar="true"': ['scrollbar'],
                        '---- ion-select-option ----': [''],
                        'slot="bottom/top"': ['slot'],

                        '---- ion-tab-button ----': [''],
                        'tab="home/settings"': ['tab'],

                    },
                    false
                    );
            break;

        case '%IonicSlidesPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-slides ----': [''],
                        'pager="true"': ['true'],
                        'pager="false"': ['false'],

                        'scrollbar="true"': ['true'],
                        'scrollbar="false"': ['false'],

                        '---- ion-tab-bar ----': [''],
                        'slot="top"': ['top'],
                        'slot="bottom"': ['bottom'],
                        'src="image.png"': ['image.png'],
                        '---- ion-tab-button ----': [''],
                        'tab="heart"': ['heart'],

                    },
                    false
                    );
            break;



// Tabs property         
        case '%IonicTabsProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-tabs ----': [''],
                        'value="brown"': ['brown'],

                        '---- ion-select-option ----': [''],
                        'slot="bottom/top"': ['slot'],

                        '---- ion-tab-button ----': [''],
                        'tab="home/settings"': ['tab'],

                    },
                    false
                    );
            break;

        case '%IonicTabsPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-tab ----': [''],
                        'tab="home/settings"': ['home'],
                        'tab="home/settings"': ['settings'],

                        '---- ion-tab-bar ----': [''],
                        'slot="top"': ['top'],
                        'slot="bottom"': ['bottom'],
                        'src="image.png"': ['image.png'],
                        '---- ion-tab-button ----': [''],
                        'tab="heart"': ['heart'],

                    },
                    false
                    );
            break;
// Text Property
        case '%IonicTextProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- badge | card-subtitle | card-title | note | text ----': [''],
                        'color="primary"': ['primary'],
                        'mode="ios|md"': ['mode'],

                        '---- ion-label ----': [''],
                        '2 color="primary"': ['primary'],
                        '2 mode="ios|md"': ['mode'],
                        'position="fixed" | "floating" | "stacked"': ['position'],

                        '---- ion-title ----': [''],
                        '3 color="primary"': ['primary'],
                        'size="large" | "small"': ['size'],

                    },
                    false
                    );
            break;

        case '%IonicTextPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        'true': ['true'],
//                        'false': ['false'],

                        'mode="ios"': ['ios'],
                        'mode="md"': ['md'],
                        '---- ion-label ----': [''],
                        'position="fixed" | "floating" | "stacked"': ['fixed'],
                        'position="floating"': ['floating'],
                        'position="stacked"': ['stacked'],
                        '---- ion-title ----': [''],
                        'size="large"': ['large'],
                        'size="small"': ['small'],
                    },
                    false
                    );
            break;



//Toolbar  
        case '%IonicToolbarProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- ion-toolbar ----': [''],
//                        'value="brown"': ['brown'],

                        '---- ion-buttons ----': [''],
                        'slot="primary/secondary/start/end"': ['slot'],

                        '---- ion-tab-button ----': [''],
                        'tab="home/settings"': ['tab'],

                    },
                    false
                    );
            break;

        case '%IonicToolbarPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- ion-toolbar ----': [''],
//                        'tab="home/settings"': ['home'],
//                        'tab="home/settings"': ['settings'],
                        '---- ion-buttons ----': [''],
                        'slot="primary/secondary/start/end"': ['slot'],
                        'slot="primary"': ['primary'],
                        'slot="secondary"': ['secondary'],
                        'slot="start"': ['start'],
                        'slot="end"': ['end'],
//                        'src="image.png"': ['image.png'],
//                        '---- ion-tab-button ----': [''],
//                        'tab="heart"': ['heart'],

                    },
                    false
                    );
            break;




// Icon property         
        case '%IonicIconProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-icon ----': [''],
                        'src="/path/to/external/file.svg': ['src'],
                        'name="heart"': ['name'],
                        'ios="heart-outline"': ['ios'],
                        'md="heart-sharp"': ['md'],
                        'size="small"': ['size'],
                        'slot="start/end"': ['slot'],
                        '---- ion-img ----': [''],
                        'alt="image"': ['alt'],
                        'src="image.png"': ['src'],
                    },
                    false
                    );
            break;

        case '%IonicIconPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- ion-icon ----': [''],
                        'src="/path/to/external/file.svg': ['https://source.unsplash.com/random/600x400'],
                        // FCC: todo add more icon
                        'name="heart"': ['heart'],
                        'name="menu-outline"': ['menu-outline'],
                        'name="search-outline"': ['search-outline'],
                        'name="settings-outline"': ['settings-outline'],
                        'ios="heart-outline"': ['heart-outline'],
                        'md="heart-sharp"': ['heart-sharp'],
                        'size="large"': ['large'],
                        'size="small"': ['small'],
                        'slot="start"': ['start'],
                        'slot="end"': ['end'],
                        '---- ion-img ----': [''],
                        'alt="an image"': ['an image'],
                        'src="image.png"': ['https://source.unsplash.com/random/600x400'],
                    },
                    false
                    );
            break;

        case '%IonicImagePropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'alt="an image"': ['an image'],
                        'src="https://iot.ttu.edu.tw/wp-content/uploads/2021/10/phpAoEMuq.jpg"': ['https://iot.ttu.edu.tw/wp-content/uploads/2021/10/phpAoEMuq.jpg'],
                        'src="https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310640.jpg"': ['https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310640.jpg'],
                        'src="https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1634887843.jpg"': ['https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1634887843.jpg'],
                        'src="https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635216570.jpg"': ['https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635216570.jpg'],
                        'src="https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310642.jpeg"': ['https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310642.jpeg'],
                        'src="https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310646.jpeg"': ['https://iot.ttu.edu.tw/wp-content/uploads/2021/10/1635310646.jpeg'],
                    },
                    false
                    );
            break;

        case '%IonicLinkPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'alt="Link"': ['Link'],
                        'location.href="https://sports.ltn.com.tw/news/breakingnews/3716935"': ['https://sports.ltn.com.tw/news/breakingnews/3716935'],
                        'location.href="https://market.ltn.com.tw/article/11215"': ['https://market.ltn.com.tw/article/11215'],
                        'location.href="https://market.ltn.com.tw/article/11205"': ['https://market.ltn.com.tw/article/11205'],
                        'location.href="https://market.ltn.com.tw/article/11175"': ['https://market.ltn.com.tw/article/11175'],
                        'location.href="https://health.ltn.com.tw/article/breakingnews/3716698"': ['https://health.ltn.com.tw/article/breakingnews/3716698'],
                        'location.href="https://news.ltn.com.tw/news/life/breakingnews/3718216"': ['https://news.ltn.com.tw/news/life/breakingnews/3718216'],
                    },
                    false
                    );
            break;


        case '%IonicImportFromAngularCore':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'Component': ['Component'],
                        'Event': ['Event'],
                        'Listen': ['Listen'],
                        'NgModule': ['NgModule'],
                        'Prop': ['Prop'],
                        'State': ['State'],
//                        'NgModule': ['NgModule'],
                        'Watch': ['Watch'],
                    },
                    false
                    );
            break;

        case '%IonicImportFromIonicAngular':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'ActionSheetController': ['ActionSheetController'],
                        'Event': ['Event'],
                        'Listen': ['Listen'],
                        'NgModule': ['NgModule'],
                        'Prop': ['Prop'],
                        'State': ['State'],
//                        'NgModule': ['NgModule'],
                        'Watch': ['Watch'],
                    },
                    false
                    );
            break;

        case '%IonicDecorator':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- async & await declaration ----': [''],
                        'Component': ['Component'],
                        'Event': ['Event'],
                        'Listen': ['Listen'],
                        'NgModule': ['NgModule'],
                        'Prop': ['Prop'],
                        'State': ['State'],
//                        'NgModule': ['NgModule'],
                        'Watch': ['Watch'],

                    },
                    false
                    );
            break;

            // FCC 2021/08/12 typescript        
        case '%AsyncAwait':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---- async & await declaration ----': [''],
                        'async (e.g. async function(){});': ['async'],
                        'await (e.g. let ret = await someFunction());': ['await'],

                    },
                    false
                    );
            break;

        case '%VariableDeclaration':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- variable declaration ----': [''],
                        'let': ['let'],
                        'const (constant)': ['const'],
                        'var (x)': ['var'],
                        '---- export & import declaration ----': [''],
                        'export let': ['export let'],
                        'export const (constant)': ['export const'],
                        'export default': ['export default'],
                        'export var (x)': ['export var'],
                        'export': ['export'],
                        'import': ['import'],
                        '---- read only ----': [''],
                        'readonly': ['readonly'],

                        '---- type declaration ----': [''],
                        'type (e.g. type Point = {x: number; y: number;};': ['type'],
                        'export type': ['export type'],
                        '---- Modifier for class property ----': [''],
                        'public': ['public'],
                        'protected': ['protected'],
                        'private': ['private'],
                        'static': ['static'],
                        'get': ['get'],
                        'set': ['set'],
                        '---- Angular directive ----': [''],
                        '@Input()': ['@Input()'],
                        '@Output()': ['@Output()'],
                    },
                    false
                    );
            break;

        case '%PredefinedType':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        ':boolean (true/false)': [':boolean'],
                        ':number  (numeric values)': [':number'],
                        ':string  (textual data)': [':string'],
                        ':symbol  (unique value of Symbol) ': [':symbol'],
                        ':any     (x)': [':any'],

                        '---- array ----': [''],
                        ':number[]': [':number[]'],
                        ':string[]': [':string[]'],
                        ':number[][]': [':number[][]'],
                        ':string[][]': [':string[][]'],
                        '---- function ----': [''],
                        '() => void': ['() => void'],
                        '() => boolean': ['() => boolean'],
                        '() => number': ['() => number'],
                        '() => string': ['() => string'],
                        '() => any (x)': ['() => any'],
                        '---- Null Undefined unknown ----': [''],
                        ':void    (no value)': [':void'],
                        'never': [':never'],
                        'unknown': ['unknown'],
                        'undefined': ['undefined'],
                        ' null': ['null'],
                    },
                    false
                    );
            break;

        case '%VariableMethodModifier':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- Modifier for class property ----': [''],
                        'public': ['public'],
                        'protected': ['protected'],
                        'private': ['private'],
                        'get': ['get'],
                        'set': ['set'],

                        'static': ['static'],
                        'abstract': ['abstract'],
                        '---- read only ----': [''],
                        'readonly': ['readonly'],
                        '---- async & await declaration ----': [''],
                        'async (e.g. async function(){});': ['async'],
                        'await (e.g. let ret = await someFunction());': ['await'],
                        '---- export/import ----': [''],
                        'export': ['export'],
                        'export default': ['export default'],
                        'import': ['import'],
                        '---- Angular directive ----': [''],
                        '@Input()': ['@Input()'],
                        '@Output()': ['@Output()'],
                    },
                    false
                    );
            break;

        case '%InterfaceClassEnum':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'class': ['class'],
                        'enum': ['enum'],
                        'interface': ['interface'],
//                        '---- export ----': [''],
//                        'export class': ['export class'],
//                        'var (x)': ['var'],
                    },
                    false
                    );
            break;

        case '%ExtendsOrImplements':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'extends': ['extends'],
                        'implements': ['implements'],
                    },
                    false
                    );
            break

        case '%EndDelimiter':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        ',': [','],
                        ';': [';'],
                    },
                    false
                    );
            break

        case '%AsignOperator':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '=': ['='],
                        '+=': ['+='],
                        '-=': ['-='],
                        '*=': ['*='],
                        '/=': ['/='],
                    },
                    false
                    );
            break

        case '%BinayOperators':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'in': ['in'],
                        'instanceof': ['instanceof'],
//                        'typeof': ['typeof'],
                        '+': ['+'],
                        '-': ['-'],
                        '*': ['*'],
                        '** (power)': ['**'],
                        '/ (expensive)': ['/'],
                        '% (mod expensive)': ['%'],
                        '---- bitwise op ---- ': [''],
                        '& (and)': ['&'],
//                        '(nand) ~&': ['~&'],
                        '| (or)': ['|'],
//                        '(nor) ~|': ['~|'],
                        '^ (xor)': ['^'],
                        '^~ (xnor) ~^': ['^~'],
                        '---- shift op ---- ': [''],
                        '<< (*2)': ['<<'],
                        '>> (/2)': ['>>'],
                        '<<<': ['<<<'],
                        '>>>': ['>>>'],
                        '---- special op ---- ': [''],
                        '.  php concat': ['.'],
                        '-> php obj->prop': ['->'],
                        '=> php key=>value': ['=>'],                        
                        '---- Vue op ---- ': [''],
                        'of': ['of'],
                        'in': ['in'],
                        '=': ['='],
                        ':': [':'],
                    },
                    false
                    );
            break

        case '%UnaryOperators':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '+': ['+'],
                        '-': ['-'],
                        '++': ['++'],
                        '--': ['--'],
                        '---- bitwise op ---- ': [''],
//                        '~': [''],
                        ' ~ (not)': ['~'],
                        '---- logical op ---- ': [''],
                        '! (not)': ['!'],
                        '---- reduction op ---- ': [''],
                        '& (and)': ['&'],
                        '| (or)': ['|'],
                        '^ (xor)': ['^'],
                        ' ~& (nand)': ['~&'],
                        ' ~| (nor) ~|': ['~|'],
                        ' ~^ (xnor) ~^': ['~^'],
                        '---- misc ---- ': [''],
                        ' typeof': ['typeof'],
                    },
                    false
                    );
            break

        case '%RelationalOp':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- relational op ---- ': [''],
                        '> (gt)': ['>'],
                        '>= (ge)': ['>='],
                        '< (lt)': ['<'],
                        '<= (le)': ['<='],
                        '== (eq)': ['=='],
                        '!= (neq)': ['!='],
                        '=== (strict eq)': ['==='],
                        '!== (strict neq)': ['!=='],

                        '---- logical op ---- ': [''],
                        '&& (and)': ['&&'],
                        '|| (or)': ['||'],

                    },
                    false
                    );
            break

        case '%StringBuiltInFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- relational op ---- ': [''],
                        'charAt(index)': ['charAt'],
                        'charCodeAt(index)': ['charCodeAt'],
                        'concat(string2, string3[, ..., stringN])': ['concat'],
//endsWith("Doe")         includes("world")
                        'endsWith("js")': ['endsWith'],
                        'indexOf(searchValue[, fromIndex])': ['indexOf'],
                        'includes("world")': ['includes'],
                        'lastIndexOf(searchValue[, fromIndex])': ['lastIndexOf'],
                        'localeCompare( aString )': ['localeCompare'],
                        'match(/rain/gi): g:global i:case insensitve': ['match'],
                        '---- p ---- ': [''],
                        'padEnd(4,"x")': ['padEnd'],
                        'padStart(4,"x")': ['padStart'],
//                        padStart(4,"x") padEnd(4,"x")
                        'replace(regexp/substr, newSubStr/function[, flags])': ['replace'],

                        'search(regexp)': ['search'],
                        'startsWith(searchvalue, start)': ['startsWith'],
                        'slice( beginslice [, endSlice] )': ['slice'],
                        'split([separator][, limit])': ['split'],
                        'substr(start[, length])': ['substr'],
                        'toLocaleLowerCase()': ['toLocaleLowerCase'],
                        'toLocaleUpperCase()': ['toLocaleUpperCase'],
                        'toLowerCase()': ['toLowerCase'],
                        'toString()': ['toString'],
                        'toUpperCase()': ['toUpperCase'],
                        'trim()': ['trim'],
                        'valueOf': ['valueOf'],

                    },
                    false
                    );
            break

        case '%NumberBuiltInFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'Number.isNaN(n)': ['isNaN'],
                        'Number.isFinite(n)': ['isFinite'],
                        'Number.isInteger(n)': ['isInteger'],
                        'Number.isSafeInteger(n)': ['isSafeInteger'],
                        'Number.parseFloat(str)': ['parseFloat'],
                        'Number.parseInt( str [, base] )': ['parseInt'],

                        'toExponential( [fractionDigits] )': ['toExponential'],
                        'toFixed( [digits] )': ['toFixed'],
                        'toLocaleString()': ['toLocaleString'],
                        'toPrecision( [ precision ] )': ['toPrecision'],
                        'toString( [radix] )': ['toString'],
                        'valueOf()': ['valueOf'],

                    },
                    false
                    );
            break

        case '%ArrayBuiltInFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'concat(value1, value2, ..., valueN)': ['concat'],
                        'every(callback[, thisObject]);': ['every'],
                        'filter(callback[, thisObject])': ['filter'],
                        'forEach(callback[, thisObject])': ['forEach'],
                        'indexOf(searchElement[, fromIndex])': ['indexOf'],
                        'join(separator)': ['join'],
                        'lastIndexOf(searchElement[, fromIndex])': ['lastIndexOf'],
                        'map(callback[, thisObject])': ['map'],
                        'pop()': ['pop'],
                        'push(element1, ..., elementN)': ['push'],
                        'reduce(callback[, initialValue])': ['reduce'],
                        'reduceRight(callback[, initialValue])': ['reduceRight'],
                        'reverse()': ['reverse'],
                        'shift()': ['shift'],
                        'slice( begin [,end] )': ['slice'],
                        'some(callback[, thisObject])': ['some'],
                        'sort( compareFunction )': ['sort'],
                        'splice(index, howMany, [element1][, ..., elementN])': ['splice'],
                        'toString()': ['toString'],
                        'unshift( element1, ..., elementN )': ['unshift'],

                    },
                    false
                    );
            break

        case '%ConsoleFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'alert(message)': ['alert'],
                        'print(message)': ['print'], // setTimeout(function[, delay, arg1, arg2, ...])     
                        'setTimeout(function[, delay, arg1, arg2, ...])': ['setTimeout'],
                        '----  console  ---- ': [''],
                        'console.assert (og a message and stack trace to console)': ['console.assert'],
                        'console.clear (Clear the console)': ['console.clear'],
                        'console.count (Log the number of times)': ['console.count'],
                        'console.countReset (Resets the counter)': ['console.countReset'],
                        'console.debug(Outputs an debug message)': ['console.debug'],
                        'console.dir(Displays properties of a JavaScript object)': ['console.dir'],
                        'console.dirxml (Displays an XML/HTML Element representation)': ['console.dirxml'],
                        'console.error (Outputs an error message)': ['console.error'],
                        'console.group (Creates a new inline group)': ['console.group'],

                        'console.groupCollapsed (Creates a new inline group)': ['console.groupCollapsed'],
                        'console.groupEnd (Exits the current inline group)': ['console.groupEnd'],
                        'console.info (Informative logging of information)': ['console.info'],
                        'console.log (general output of logging information)': ['console.log'],
                        'console.table (Displays tabular data)': ['console.table'],
                        'console.time (Starts a timer )': ['console.time'],
                        'console.timeEnd (Stops the specified timer )': ['console.timeEnd'],
                        'console.timeLog (Logs the value of the specified timer)': ['console.timeLog'],
                        'console.trace (Outputs a stack trace.)': ['console.trace'],
                        'console.warn (Outputs a warning message)': ['console.warn'],

                    },
                    false
                    );
            break

        case '%FunctionConstants':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- type ----': [''],
                        'undefined': ['undefined'],
                        'null': ['null'],
                        '---- boolean ----': [''],
                        'true': ['true'],
                        'false': ['false'],
                        '---- Number ----': [''],
                        'Number.EPSILON': ['Number.EPSILON'],
                        'Number.MAX_VALUE': ['Number.MAX_VALUE'],
                        'Number.MIN_VALUE': ['Number.MIN_VALUE'],
                        'Number.MAX_SAFE_INTEGER': ['Number.MAX_SAFE_INTEGER'],
                        'Number.MIN_SAFE_INTEGER': ['Number.MIN_SAFE_INTEGER'],
                        'Number.NaN': ['Number.NaN'],
                        'Number.NEGATIVE_INFINITY': ['Number.NEGATIVE_INFINITY'],
                        'Number.POSITIVE_INFINITY': ['Number.POSITIVE_INFINITY'],
                        'Number.prototype': ['Number.prototype'],
                        '---- Math ----': [''],
                        'Math.E (2.718)': ['Math.E'],
                        'Math.LN2 (0.693)': ['Math.LN2'],
                        'Math.LN10 (2.302)': ['Math.LN10'],
                        'Math.LOG2E (1.442)': ['Math.LOG2E'],
                        'Math.LOG10E (0.434)': ['Math.LOG10E'],
                        'Math.PI (3.14159)': ['Math.PI'],
                        'Math.SQRT1_2 (0.707)': ['Math.SQRT1_2'],
                        'Math.SQRT2 (1.414)': ['Math.SQRT2'],
                    },
                    false
                    );
            break;

        case '%MathFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---- number function ----': [''],
                        'abs(x)': ['abs'],
                        'ceil(x)': ['ceil'],
                        'floor(x)': ['floor'],
                        'max(value1, value2, ... valueN )': ['max'],
                        'min(value1, value2, ... valueN )': ['min'],
                        'random()': ['random'],
                        'round( x )': ['round'],
                        'toSource()': ['toSource'],

                        '---- Power & log ----': [''],
                        'exp(x)': ['exp'],
                        'log(x[, base])': ['log'],
                        'pow(base, exponent)': ['pow'],
                        'sqrt(x)': ['sqrt'],
                        /*'----  ----': [''],
                         'acos(x)': ['acos'],
                         'acosh(x)': ['acosh'],
                         'asin(x)': ['asin'],
                         'atan(x)': ['atan'],
                         'atanh(x)': ['atanh'],
                         'atan2(x)': ['atan2'],
                         'cbrt(x)': ['cbrt'],
                         'clz32(x)': ['clz32'],
                         'cos(x)': ['cos'],
                         'expm1(x)': ['expm1'],
                         'fround(x)': ['fround'],
                         'imul(x)': ['imul'],
                         'log1p(x)': ['log1p'],
                         'log10(x)': ['log10'],
                         'log2(x)': ['log2'],
                         'sign(x)': ['sign'],
                         'sin(x)': ['sin'],
                         'sinh(x)': ['sinh'],
                         'tan(x)': ['tan'],
                         'tanh(x)': ['tanh'],
                         'trunc(x)': ['trunc'],*/
                    },
                    false
                    );
            break;

        case '%DateFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '-- number function --': [''],
                        'new Date()': ['new Date'],
                        'getDate()': ['getDate'],
                        'getDay()': ['getDay'],
                        'getFullYear()': ['getFullYear'],
                        'getHours()': ['getHours'],
                        'getMilliseconds()': ['getMilliseconds'],
                        'getMinutes()': ['getMinutes'],
                        'getMonth()': ['getMonth'],
                        'getSeconds()': ['getSeconds'],
                        'getTime()': ['getTime'],
                        'getTimezoneOffset()': ['getTimezoneOffset'],

                        'getUTCDate()': ['getUTCDate'],
                        'getUTCDay()': ['getUTCDay'],
                        'getUTCFullYear()': ['getUTCFullYear'],
                        'getUTCHours()': ['getUTCHours'],
                        'getUTCMilliseconds()': ['getUTCilliseconds'],
                        'getUTCMinutes()': ['getUTCMinutes'],
                        'getUTCMonth()': ['getUTCMonth'],
                        'getUTCSeconds()': ['getUTCSeconds'],

                        'setDate()': ['setDate'],
                        'setDay()': ['setDay'],
                        'setFullYear()': ['setFullYear'],
                        'setHours()': ['setHours'],
                        'setMilliseconds()': ['setMilliseconds'],
                        'setMinutes()': ['setMinutes'],
                        'setMonth()': ['setMonth'],
                        'setSeconds()': ['setSeconds'],
                        'setTime()': ['setTime'],
                        'setTimezoneOffset()': ['setTimezoneOffset'],

                        'setUTCDate()': ['setUTCDate'],
                        'setUTCDay()': ['setUTCDay'],
                        'setUTCFullYear()': ['setUTCFullYear'],
                        'setUTCHours()': ['setUTCHours'],
                        'setUTCMilliseconds()': ['setUTCilliseconds'],
                        'setUTCMinutes()': ['setUTCMinutes'],
                        'setUTCMonth()': ['setUTCMonth'],
                        'setUTCSeconds()': ['setUTCSeconds'],

                        'setYear(yearValue) Use setFullYear instead': ['setYear'],
                        'toDateString()': ['toDateString'],
                        'toLocaleString()': ['toLocaleString'],
                        'toGMTString() Use toUTCString instead': ['toGMTString'],
                        'toLocaleString()': ['toLocaleString'],
                        'toSource()': ['toSource'],
                        'toString()': ['toString'],
                        'toTimeString()': ['toTimeString'],
                        'toUTCString()': ['toUTCString'],
                        'valueOf()': ['valueOf'],

                    },
                    false
                    );
            break;


        case '%JsonFunction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '---- number function ----': [''],
                        'parse(text)': ['parse'],
                        'stringify(obj/array)': ['stringify'],
//                        'floor(x)': ['floor'],
//                        'max(value1, value2, ... valueN )': ['max'],
//                        'min(value1, value2, ... valueN )': ['min'],
//                        'random()': ['random'],
//                        'round( x )': ['round'],
//                        'toSource()': ['toSource'],
//
//                        '---- Power & log ----': [''],
//                        'exp(x)': ['exp'],
//                        'log(x[, base])': ['log'],
//                        'pow(base, exponent)': ['pow'],
//                        'sqrt(x)': ['sqrt'],

                    },
                    false
                    );
            break;



//        
            // FCC 2021/08/12 TypeScipt end


            // eric 2021/06/23
        case '%exp0':
            part = new MultiArgMorph('%s', null, 0);
//            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            break;
            // eric 2021/08/16
        case '%expblank':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            part.type = 'blank'
            break;
        case '%s_blank':
            // 2021/08/17 InputSlotMorph (text,isNumeric,choiceDict,read-only)
            part = new InputSlotMorph(null, false, null, false);
            part.type = 's_Blank'
            break;
        case '%exp0blank':
            part = new MultiArgMorph('%s', null, 0);
//            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            part.type = 'blank'
            break;
        case '%exp0dot':
            part = new MultiArgMorph('%s', null, 0);
//            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            part.type = 'dot'
            break;
        case '%s_dot':
            part = new MultiArgMorph('%s', null, 0);
//            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            part.type = 's_Dot'
            break;
        case '%icon':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'add-outline': ['add-outline'],
                        'alarm-outline': ['alarm-outline'],
                        'cloud-download-outline': ['cloud-download-outline'],
                        'play-outline': ['play-outline'],
                        'play-back-outline': ['play-back-outline'],
                        'play-forward-outline': ['play-forward-outline'],
                        'play-skip-back-outline': ['play-skip-back-outline'],
                        'play-skip-forward-outline': ['play-skip-forward-outline'],
                        'settings-outline': ['settings-outline'],
                    },
                    false
                    );
            break;
        case '%exceptions':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  Base classes  ----': [''],
                        'Exception': ['Exception'],
                        'ArithmeticError': ['ArithmeticError'],
                        'BufferError': ['BufferError'],
                        'LookupError': ['LookupError'],
                        '----  Concrete classes  ----': [''],
                        'AssertionError': ['AssertionError'],
                        'AttributeError': ['AttributeError'],
                        'EOFError': ['EOFError'],
                        'FloatingPointError': ['FloatingPointError'],
                        'GeneratorExit': ['GeneratorExitr'],
                        'ImportError': ['ImportError'],
//                        'EOFError': ['EOFError'],
                        'ModuleNotFoundError': ['ModuleNotFoundError'],
                        'IndexError': ['IndexError'],
                        'KeyError': ['KeyError'],
                        'KeyboardInterrupt': ['KeyboardInterrupt'],
                        'MemoryError': ['MemoryError'],
                        'NameError': ['NameError'],
                        'NotImplementedError': ['NotImplementedError'],
                        'OSError': ['OSError'],
                        'OverflowError': ['OverflowError'],
                        'RecursionError': ['RecursionError'],
                        'ReferenceError': ['ReferenceError'],
                        'RuntimeError': ['RuntimeError'],
                        'StopIteration': ['StopIteration'],
                        'StopAsyncIteration': ['StopAsyncIteration'],
                        'SyntaxError': ['SyntaxError'],
                        'IndentationError': ['IndentationError'],
                        'TabError': ['TabError'],
                        'SystemError': ['SystemError'],
                        'SystemExit': ['SystemExit'],
                        'TypeError': ['TypeError'],
                        'UnboundLocalError': ['UnboundLocalError'],
                        'UnicodeError': ['UnicodeError'],
                        'UnicodeEncodeError': ['UnicodeEncodeErrorr'],
                        'UnicodeDecodeError': ['UnicodeDecodeError'],
                        'UnicodeTranslateError': ['UnicodeTranslateError'],
                        'ValueError': ['ValueError'],
                        'ZeroDivisionError': ['ZeroDivisionError'],
                        '----  OS exceptions  ----': [''],
                        'BlockingIOError': ['BlockingIOError'],
                        'ChildProcessError': ['ChildProcessError'],
                        'ConnectionError': ['ConnectionError'],

//                        'M or MULTILINE': ['MULTILINE'],
                    },
                    false
                    );
            break;
        case '%expand':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'block': ['block'],
                        'full': ['full'],
                    },
                    false
                    );
            break;
        case '%fill':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'clear': ['clear'],
                        'outline': ['outline'],
                        'solid': ['solid'],
                    },
                    false
                    );
            break;
        case '%size':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'small': ['small'],
                        'default': ['default'],
                        'large': ['large'],
                    },
                    false
                    );
            break;
        case '%color':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'primary': ['primary'],
                        'secondary': ['secondary'],
                        'tertiary': ['tertiary'],
                        'success': ['success'],
                        'warning': ['warning'],
                        'danger': ['danger'],
                        'light': ['light'],
                        'medium': ['medium'],
                        'dark': ['dark'],
                    },
                    false
                    );
            break;

        case '%type':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'bounded': ['bounded'],
                        'unbounded': ['unbounded'],
                    },
                    false
                    );
            break;

        case '%colsize':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'size-sm': ['size-sm'],
                        'size-md': ['size-md'],
                        'size-lg': ['size-lg'],
                    },
                    false
                    );
            break;

        case '%cardbutton':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%disabled':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%checked':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%outline':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%forceOverscroll':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;


        case '%fullscreen':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%scrollEvents':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%scrollX':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%scrollY':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%horizontal':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'center': ['center'],
                        'end': ['end'],
                        'start': ['start'],
                        'undefined': ['undefined'],
                    },
                    false
                    );
            break;

        case '%vertical':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'bottom': ['bottom'],
                        'center': ['center'],
                        'top': ['top'],
                        'undefined': ['undefined'],
                    },
                    false
                    );
            break;

        case '%type2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'button': ['button'],
                        'reset': ['reset'],
                        'submit': ['submit'],
                    },
                    false
                    );
            break;

        case '%type3':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'email': ['email'],
                        'number': ['number'],
                        'password': ['password'],
                        'search': ['search'],
                        'tel': ['tel'],
                        'text': ['text'],
                        'url': ['url'],
                    },
                    false
                    );
            break;

        case '%activated':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'false': ['false'],
                        'true': ['true'],
                    },
                    false
                    );
            break;

        case '%side':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'bottom': ['bottom'],
                        'end': ['end'],
                        'start': ['start'],
                        'top': ['top'],
                    },
                    false
                    );
            break;

        case '%autocapitalize':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'off': ['off'],
                        'none': ['none'],
                        'on': ['on'],
                        'sentences': ['sentences'],
                        'words': ['words'],
                        'characters': ['characters'],
                    },
                    false
                    );
            break;

        case '%inputmode':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'none': ['none'],
                        'text': ['text'],
                        'tel': ['tel'],
                        'url': ['url'],
                        'email': ['email'],
                        'numeric': ['numeric'],
                        'decimal': ['decimal'],
                        'search': ['search'],
                    },
                    false
                    );
            break;

        case '%lines':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'full': ['full'],
                        'inset': ['inset'],
                        'none': ['none'],
                        'undefined': ['undefined'],
                    },
                    false
                    );
            break;

        case '%side2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'end': ['end'],
                        'start': ['start'],
                    },
                    false
                    );
            break;

        case '%position':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'fixed': ['fixed'],
                        'floating': ['floating'],
                        'stacked': ['stacked'],
                        'undefined': ['undefined'],
                    },
                    false
                    );
            break;

        case '%inset':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%autoHide':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%tappable':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%visible':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%stopPropagation':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%reversed':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%progresstype':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'determinate': ['determinate'],
                        'indeterminate': ['indeterminate'],
                    },
                    false
                    );
            break;

        case '%spinnername':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'bubbles': ['bubbles'],
                        'circles': ['circles'],
                        'circular': ['circular'],
                        'crescent': ['crescent'],
                        'dots': ['dots'],
                        'lines': ['lines'],
                        'lines-small': ['lines-small'],
                        'undefined': ['undefined'],
                    },
                    false
                    );
            break;

        case '%paused':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%allowEmptySelection':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%dualKnobs':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%pin':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%snaps':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%ticks':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%animated':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%refreshingSpinner':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'bubbles': ['bubbles'],
                        'circles': ['circles'],
                        'circular': ['circular'],
                        'crescent': ['crescent'],
                        'dots': ['dots'],
                        'lines': ['lines'],
                        'lines-small': ['lines-small'],
                        'null': ['null'],
                        'undefined': ['undefined'],
                    },
                    false
                    );
            break;

        case '%slot':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'start': ['start'],
                        'end': ['end'],
                    },
                    false
                    );
            break;

        case '%showCancelButton':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'always': ['always'],
                        'focus': ['focus'],
                        'never': ['never'],
                    },
                    false
                    );
            break;

        case '%scrollable':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%swipeGesture':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%multiple':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%options':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%pager':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%collapse':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%slotButton':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'secondary': ['secondary'],
                        'primary': ['primary'],
                        'start': ['start'],
                        'end': ['end'],
                    },
                    false
                    );
            break;

        case '%h16':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'h1': ['h1'],
                        'h2': ['h2'],
                        'h3': ['h3'],
                        'h4': ['h4'],
                        'h5': ['h5'],
                        'h6': ['h6'],
                    },
                    false
                    );
            break;

        case '%htmlHeaderBasic':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'header': ['header'],
                        'title': ['title'],
                        'body': ['body'],
                        'div': ['div'],
                        'meta': ['meta'],
                        'link': ['link'],
                        'style': ['style'],
                        'main': ['main'],
                        'figure': ['figure'],
                        'hgroup': ['hgroup'],
                        'footer': ['footer'],
                        'article': ['article'],
                        'section': ['section'],
                        'nav': ['nav'],
                        'aside': ['aside'],
                    },
                    false
                    );
            break;
//%HtmlEntity
        case '%HtmlEntity':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  entity  ----': [''],
                        '< &lt;': ['&lt;'],
                        '> &gt;': ['&gt;'],
                        '& &amp;': ['&amp;'],
                        'sp &nbsp;': ['&nbsp;'],
                        '> &gt;': ['&gt;'],
                        '" &quot;': ['&quot;'],
                        "' &apos;": ['&apos;'],
                        '¢ &cent;': ['&cent;'],
                        '£ &pound;': ['&pound;'],
                        '¥ &yen;': ['&yen;'],
                        '€ &euro;': ['&euro;'],
                        '© &copy;': ['&copy;'],
                        '® &reg;': ['&reg;'],
                        '> &gt;': ['&gt;'],
                        '& &amp;': ['&amp;'],
                        '----  Mathematical Symbols  ----': [''],
                        '∀ &forall;': ['&forall;'],
                        '∂ &part;': ['&part;'],
                        '∃ &exist;': ['&exist;'],
                        '∅ &empty;': ['&empty;'],
                        '∇ &nabla;': ['&nabla;'],
                        '∈ &isin;': ['&isin;'],
                        '∋ &ni;': ['&ni;'],
                        '∉ &notin;': ['&notin;'],
                        '∏ &prod;': ['&prod;'],
                        '∑ &sum;': ['&sum;'],
                        '----   Emoji Symbols  ----': [''],
                        '😀 &#128512;': ['&#128512;'],
                        '😁 &#128513;': ['&#128513;'],
                        '😂 &#128514;': ['&#128514;'],
                        '😃 &#128515;': ['&#128515;'],
                        '😄 &#128516;': ['&#128516;'],
                        '😅 &#128517;': ['&#128517;'],
//                        '∃ &exist;': ['&exist;'],
//                        '∀ &forall;': ['&forall;'],
//                        '∂ &part;': ['&part;'],
//                        '∃ &exist;': ['&exist;'],
//                        '∀ &forall;': ['&forall;'],
//                        '∂ &part;': ['&part;'],
//                        '∃ &exist;': ['&exist;'],
                    },
                    false
                    );
            break;

        case '%htmlheadbasic':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'script (src)': ['script'],
                        'noscript': ['noscript'],
                        'style (type,media)': ['style'],

                    },
                    false
                    );
            break;

        case '%htmlheadbasic1':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'base (href)': ['base'],
//                        'title': ['title'],
                        'link (href,rel,media)': ['link'],
                        'meta (charset,name,content)': ['meta'],

                    },
                    false
                    );
            break;

//%htmlkeys
        case '%htmlKeys':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'lang': ['lang'],
                    },
                    false
                    );
            break;

        case '%htmlValues':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'lang=en': ['en'],
                        'lang=de': ['de'],
                        'lang=zh-Hant (traditional Chinese)': ['zh-Hant'],
                        'lang=zh-Hans (simplified Chinese)': ['zh-Hans'],
                        'lang=zh-cmn-Hant': ['zh-cmn-Hant'],
                        'lang=zh-cmn-Hans': ['zh-cmn-Hans'],
                    },
                    false
                    );
            break;


        case '%html5basic':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---  layout  ---': [''],
                        'header': ['header'],
                        'main': ['main'],
                        'article': ['article'],
                        'aside': ['aside'],
                        'nav': ['nav'],
                        'section': ['section'],
                        'footer': ['footer'],
                        'figure': ['figure'],
                        'hgroup': ['hgroup'],
                        'body': ['body'],
                        'div': ['div'],
                        '---  header 1~6  ---': [''],
                        'h1': ['h1'],
                        'h2': ['h2'],
                        'h3': ['h3'],
                        'h4': ['h4'],
                        'h5': ['h5'],
                        'h6': ['h6'],
                        '---  text  ---': [''],
                        'p (paragraph)': ['p'],
                        'a (anchor)  (href,target,rel,download,ping,referrerpolicy)': ['a'],
                        'span': ['span'],
                        'em': ['em'],
                        'i': ['i'],
                        'mark': ['mark'],
                        'strong': ['strong'],
                        'pre': ['pre'],
                        'code': ['code'],
                        'del (deletion)  (cite,datetime)': ['del'],
                        'blockquote   (cite,datetime)': ['blockquote'],
                        'ins   (cite,datetime)': ['ins'],
//						'---media---': [''],
//						'iframe   (src,height,width,name,sandbox)': ['iframe'],
//						'embed   (src,type,width,height)': ['embed'],
//						'video   (src,poster,preload,autoplay,loop,muted,controls,width,height)': ['video'],
//						'video : track    (src,srclang,kind,label,default)': ['track'],
//						'audio   (src,preload,autoplay,loop,muted,controls)': ['audio'],
//						'img   (src,width,heigh,alt,title,srcset,sizes,loading)': ['img'],
//						'canvas   (height,width)': ['canvas'],
//						'source  (srcset,media)': ['source'],
//						'object  (data,type,typemustmatch,name,width,height,usemap,form)': ['object'],
//						'object : sin' : ['param'],
//						'picture': ['picture'],
//						'---svg---': [''],
//						'svg   (width,height)': ['svg'],
//						'circle  (cx,cy,r,stroke,stroke-width,fill)': ['circle'],
//						'rect  (x,y,rx,ry,width,height,style)': ['rect'],
//						'polygon  (points,style)': ['polygon'],
//						'defs' : ['defs'],
//						'linearGradient  (id,x1,y1,x2,y2)': ['linearGradient'],
//						'stop  (offset,style)': ['stop'],
//						'ellipse  (cx,cy,rx,ry,fill)': ['ellipse'],
//						'text  (fill,font-size,font-family,x,y)': ['text'],
                        '---  table  ---': [''],
                        'table (border)': ['table'],
                        'colgroup (span,style)': ['colgroup'],
                        'col (span,class)': ['col'],
                        'caption': ['caption'],
                        'th table head': ['th'],
                        'td table data (rowspan,colspan)': ['td'],
                        'tr table row': ['tr'],
                        'thead': ['thead'],
                        'tbody': ['tbody'],
                        'tfoot': ['tfoot'],
//						'---form---': [''],
//						'form  (action,method,target,autocomplete)': ['form'],
//						'label  (for)': ['label'],
//                      'input  (placeholder,name,value,type,disabled,readonly,autocomplete,autofocus,max,min,step,maxlength,minlength,size,list,pattern)': ['input'],
//						'textarea  (placeholder,rows,cols,maxlength,minlength,readonly,wrap)': ['textarea'],
//						'fieldset  (disabled,name)': ['fieldset'],
//						'legend': ['legend'],
//						'select  (name,disabled,required)': ['select'],
//						'optgroup (label)': ['optgroup'],
//						'option  (value,selected,label,disabled)': ['option'],
//						'datalist ': ['datalist'],
//						'button (name,type,value,disabled)': ['button'],
                        '---  list  ---': [''],
                        'ul (unordered list)': ['ul'],
                        'ol (ordered list)': ['ol'],
                        'li (list item of ul/ol)': ['li'],
                        'dl (definition lists)': ['dl'],
                        'dt (definition term)': ['dt'],
                        'dd (description detail)': ['dd'],
                    },
                    false
                    );
            break;
//%html5Layout
        case '%html5Layout':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '/* JavaScript/React comment': ['!--'],
                        '!-- html comment': ['!--'],
                        '---layout---': [''],
                        'div': ['div'],
                        'article': ['article'],
                        'aside': ['aside'],
                        'details': ['details'],
                        'footer': ['footer'],
                        'figcaption': ['figcaption'],
                        'figure': ['figure'],
                        'header': ['header'],
//                        'hgroup': ['hgroup'],
//                        'body': ['body'],
                        'main': ['main'],
                        'mark': ['mark'],
                        'nav (navigation links)': ['nav'],
                        'section': ['section'],
//                        'summary': ['summary'],
//                        'time': ['time'],

                    },
                    false
                    );
            break;

        case '%html5Text':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '!--': ['!--'],
                        'a (anchor)  (href,target,rel,download,ping,referrerpolicy)': ['a'],
                        'abbr (Abbreviation text)': ['abbr'],
                        'address (Address tex)': ['address'],
                        'b (Bold text)': ['b'],
                        'bdo (text direction)': ['bdo'],
                        'blockquote   (cite,datetime)': ['blockquote'],

                        'cite (Title of a work)': ['cite'],
                        'code (computer code)': ['code'],
                        'del (Deleted text)  (cite,datetime)': ['del'],
                        'details': ['details'],
                        'em (Emphasized text)': ['em'],
                        '---h~6---': [''],
                        'h1': ['h1'],
                        'h2': ['h2'],
                        'h3': ['h3'],
                        'h4': ['h4'],
                        'h5': ['h5'],
                        'h6': ['h6'],

                        'i (Italic text)': ['i'],
                        'ins (Inserted text)': ['ins'],
                        'kbd (keyboard input)': ['kbd'],
                        'mark (Marked text)': ['mark'],
                        '---  p  ---': [''],
                        'p (paragraph)': ['p'],
                        'pre (predefined text)': ['pre'],
                        'q (inline quotation)': ['q'],

                        'samp (sample output)': ['samp'],

                        'small (Smaller text)': ['small'],
                        'span': ['span'],
                        'strong (Important text)': ['strong'],
                        'sub (Subscript tex)': ['sub'],
                        'summary': ['summary'],
                        'sup (Superscript text)': ['sup'],
                        'var (variable)': ['var'],

                        '---  date time (inline element)  ---': [''],
                        'date': ['date'],
                        'time': ['time'],
//                        'sup (Superscript text)': ['sup'],
                        '---layout---': [''],
                        'div': ['div'],
                        'article': ['article'],
                        'aside': ['aside'],
                        'details': ['details'],
                        'footer': ['footer'],
                        'figcaption': ['figcaption'],
                        'figure': ['figure'],
                        'header': ['header'],
//                        'hgroup': ['hgroup'],
//                        'body': ['body'],
                        'main': ['main'],
                        'mark': ['mark'],
                        'nav (navigation links)': ['nav'],
                        'section': ['section'],

//                        '--- Vue ---': [''],
//                        'template': ['template'],
//                        'router-link': ['router-link'],
//                        'router-view': ['router-view'],
                    },
                    false
                    );
            break;

        case '%htmlCssProperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '----  css  ----': [''],
                        'class = "header"': ['class'],
                        'id  = "footer"': ['id'],
                        'style="color:red;"': ['style'],
                    },
                    false
                    );
            break;

        case '%textproperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  css  ----': [''],
                        'class   (class=(Text) ex:class="intro")': ['class'],
                        'id   (id=(Text) ex:id="footer")': ['id'],
                        '----a----': [''],
                        'href=http://iot.ttu.edu.tw': ['href'],
                        'target (target="_blank"... ex:target="_blank")': ['target'],
                        'rel (rel="alternate"... ex:rel="alternate")': ['rel'],
                        'title="Go to the website of TTU\'s AIoT center"': ['title'],
//title="Go to W3Schools HTML section"                        
                        'download (download=filename ex:download="w3logo")': ['download'],
                        'ping (ping=list_of_URLs ex:ping="https://www.w3schools.com/trackpings")': ['ping'],
                        'referrerpolicy (referrerpolicy="no-referrer"... ex:referrerpolicy="no-referrer")': ['referrerpolicy'],
                        '----del、ins、blockquote----': [''],
                        'cite (cite=URL ex:cite="del_demo_cite.htm")': ['cite'],
                        'datetime (datetime=YYYY-MM-DDThh:mm:ssTZD ex:datetime="2015-11-15T22:55:03Z")': ['datetime'],
                    },
                    false
                    );
            break;

        case '%textpropertiesValues':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        '----  css selector ----': [''],
//                        'class   (class=(Text) ex:class="intro")': ['class'],
//                        'id   (id=(Text) ex:id="footer")': ['id'],

                        '----  a (anchor)  ----': [''],
                        'href="http://iot.ttu.edu.tw"': ['"http://iot.ttu.edu.tw"'],
                        'href="mailto:hege@example.com"': ['"mailto:hege@example.com"'],

                        'title="Go to the website of TTU\'s AIoT center"': ['"Go to the website of TTU\'s AIoT center"'],
                        '----  a target  ----': [''],
                        'target="_blank" ': ['"_blank"'],
                        'target="_self" ': ['"_self"'],
                        'target="_parent" ': ['"_parent"'],
                        'target="_top" ': ['"_top"'],
//                        'rel (rel="alternate"... ex:rel="alternate")': ['rel'],
//                        'download (download=filename ex:download="w3logo")': ['download'],
//                        'ping (ping=list_of_URLs ex:ping="https://www.w3schools.com/trackpings")': ['ping'],
//                        'referrerpolicy (referrerpolicy="no-referrer"... ex:referrerpolicy="no-referrer")': ['referrerpolicy'],
//                        '----del、ins、blockquote----': [''],
//                        'cite (cite=URL ex:cite="del_demo_cite.htm")': ['cite'],
//                        'datetime (datetime=YYYY-MM-DDThh:mm:ssTZD ex:datetime="2015-11-15T22:55:03Z")': ['datetime'],
                    },
                    false
                    );
            break;

        case '%headProperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  basic  ----': [''],
                        'class   (class=(Text) ex:class="intro")': ['class'],
                        'id   (id=(Text) ex:id="footer")': ['id'],
                        'title   (title=(Text) ex:title="Free Web tutorials")': ['title'],
                        'src   (src=URL ex:src="script-1.js")': ['src'],
                        '----  css  ----': [''],
                        'style   (style=(Text) ex:style="color:green")': ['style'],
                        'href   (href=URL ex:href="https://example.com/media/link-example.css")': ['href'],
                        'rel  (rel="stylesheet"...)': ['rel'],

                        '----  meta  ----': [''],
                        'charset   (ex:charset="utf-8")': ['charset'],
                        'name="author"|"description"|"keywords"|"viewport"': ['name'],
                        'content(author)="John Doe"| content(description)="Free Web tutorials"| content(keywords)="HTML, CSS, JavaScript" |content="width=device-width, initial-scale=1.0"': ['content'],
                        '----  link  ----': [''],
                        'rel="stylesheet/icon"': ['rel'],
                        'href="my-css-file.css"': ['href'],
                        'media="screen"|"print"|"handheld"': ['media'],
                        'sizes="144x144"': ['sizes'],
                        'type="image/x-icon"': ['type'],
                        'target="_self"|"_blank")': ['target'],
                        '----  script ----': [''],
                        "type=text/javascript": ["type"],
                        "type=text/babel": ["type"],
                        "type=module": ["type"],
                        '----  data-plugins ----': [''],
                        "data-plugins=transform-modules-umd": ["data-plugins"],
                    },
                    false
                    );
            break;

        case '%headPropertiesValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----charset----': [''],
                        'charset="utf-8"': ['"utf-8"'],
                        '---- media  ----': [''],
                        'media="screen"': ['"screen"'],
                        'media="print"': ['"print"'],
                        'media="handheld"': ['"handheld"'],
                        '----  meta name/content  ----': [''],
                        'name="author"': ['"author"'],
                        'content(author)="John Doe"': ['"John Doe"'],
                        'name="description"': ['"description"'],
                        'content(description)="Free Web tutorials"': ['"Free Web tutorials"'],
                        'generator': ['generator'],
                        'name="keywords"': ['"keywords"'],
                        'content(keywords)="HTML, CSS, JavaScript"': ['"HTML, CSS, JavaScript"'],
                        'name="viewport"': ['"viewport"'],
                        'content(viewport)="width=device-width, initial-scale=1.0"': ['"width=device-width, initial-scale=1.0"'],

                        '----  target  ----': [''],
                        'target="_self"': ['"_self"'],
                        'target="_blank"': ['"_blank"'],
                        'target="_parent"': ['"_parent"'],
                        'target="_top"': ['"_top"'],

                        '----  rel of link  ----': [''],
                        'rel="alternate"': ['"alternate"'],
                        'rel="author"': ['"author"'],
                        'rel="dns-prefetch"': ['"dns-prefetch"'],
                        'rel="help"': ['"help"'],

                        'rel="license"': ['"license"'],
                        'rel="next"': ['"next"'],
                        'rel="pingback"': ['"pingback"'],
                        'rel="preconnect"': ['"preconnect"'],
                        'rel="prefetch"': ['"prefetch"'],
                        'rel="preload"': ['"preload"'],
                        'rel="prerender""': ['"prerender"'],
                        'rel="prev"': ['"prev"'],
                        'rel="search"': ['"search"'],
//                        'type="image/x-icon': ['icon'],
                        'rel="icon"': ['"icon"'],
                        'rel="stylesheet"': ['"stylesheet"'],
//                        'type="image/x-icon': ['image/x-icon'],


                        '----  href of link  ----': [''],
                        'href="https://www.w3schools.com/w3css/4/w3.css"': ['"https://www.w3schools.com/w3css/4/w3.css"'],
                        'href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"': ['"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"'],

                        'href="favicon.ico"': ['"favicon.ico"'],

                        '----  type ----': [''],
                        'type="image/x-icon"': ['"image/x-icon"'],
                        'type="text/javascript"': ['"text/javascript"'],
                        'type="text/css"': ['"text/css"'],
                        'type="text/babel"': ['"text/babel"'],
                        'type="module"': ['"module"'],

                        '----  script src ----': [''],
                        'src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"': ['"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"'],
                        'src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"': ['"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"'],
                        '----  data-plugins ----': [''],
                        'data-plugins="transform-modules-umd"': ['"transform-modules-umd"'],
                    },
                    false
                    );
            break;


        case '%sourceproperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  css selector ----': [''],
                        'class  (class=(Text) ex:class="intro")': ['class'],
                        'id (id=(Text) ex:id="footer")': ['id'],

                        '----  property  ----': [''],
                        'src (src=URL ex:src="/default.asp")': ['src'],
                        'type (type=""... ex:type="video/mp4")': ['type'],
                        'height (height=pixels|% ex:height="180"|"100%")': ['height'],
                        'width (width=pixels|% ex:width="240"|"100%")': ['width'],
                        'name (name=(Text) ex:name="abc")': ['name'],

                        '----iframe----': [''],
                        'sandbox (sandbox="allow-forms"... ex:sandbox="allow-forms")': ['sandbox'],
                        '----video、audio----': [''],
                        'poster (poster=URL ex:poster="/images/w3html5.gif")': ['poster'],
                        'preload (preload="auto"... ex:preload="auto")': ['preload'],
                        'autoplay (autoplay=true|false ex:autoplay="true")': ['autoplay'],
                        'loop  (loop=true|false ex:loop="true")': ['loop'],
                        'muted  (muted=true|false ex:muted="true")': ['muted'],
                        'controls (controls=true|false ex:controls="true")': ['controls'],
                        '----track----': [''],
                        'srclang  (srclang=language_code ex:srclang="en")': ['srclang'],
                        'kind  (kind="captions"... ex:kind="captions")': ['kind'],
                        'label (label=(Text) ex:label="English")': ['label'],
                        'default (default=true|false ex:default="true")': ['default'],
                        '----img----': [''],
                        'alt (alt=(Text) ex:alt="Test")': ['alt'],
                        'title (alt=(Text) ex:alt="Test")': ['title'],
                        'src="fallback.jpg': ['src'],
                        'srcset (srcset=URL-list ex:srcset="/files/16864/clock-demo-200px.png 200w")': ['srcset'],
                        'sizes (sizes=sizes ex:sizes="(max-width: 600px) 200px, 50vw")': ['sizes'],
                        'loading (loading="eager|lazy" ex:loading="eager")': ['loading'],
                        'usemap usemap="#workmap"': ['usemap'],

                        '----  source in picture  ----': [''],
                        'srcset (srcset=URL ex:srcset="img_white_flower.jpg")': ['srcset'],
                        'media (media=media_query ex:media="(min-width:465px)")': ['media'],

                        '----object----': [''],
                        'data (data=URL ex:data="pic_trulli.jpg")': ['data'],
                        'typemustmatch (typemustmatch=true|false ex:typemustmatch="true")': ['typemustmatch'],
                        'usemap (usemap=#mapname ex:usemap="#planetmap")': ['usemap'],
                        'form (form=form_id )': ['form'],

                        '----  area  ----': [''],
                        'shape="rect"(circle)': ['shape'],
                        'coords="34,44,270,350"': ['coords'],
                        'alt="Computer"': ['alt'],
                        'href="computer.htm"': ['href'],

                        '----  meter/progress  ----': [''],
                        'max="100"': ['max'],
                        'min="0"': ['min'],
                        'value="50"': ['value'],
//                        'href="computer.htm"': ['href'],                        
                    },
                    false
                    );
            break;

        case '%sourcepropertiesvalue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----autoplay、loop、muted、controls----': [''],
                        'true': ['true'],
                        'false': ['false'],
                        '----sandbox----': [''],
                        'allow-forms': ['allow-forms'],
                        'allow-modals': ['allow-modals'],
                        'allow-orientation-lock': ['allow-orientation-lock'],
                        'allow-pointer-lock': ['allow-pointer-lock'],
                        'allow-popups': ['allow-popups'],
                        'allow-popups-to-escape-sandbox': ['allow-popups-to-escape-sandbox'],
                        'allow-presentation': ['allow-presentation'],
                        'allow-same-origin': ['allow-same-origin'],
                        'allow-scripts': ['allow-scripts'],
                        'allow-top-navigation': ['allow-top-navigation'],
                        'allow-top-navigation-by-user-activation': ['allow-top-navigation-by-user-activation'],
                        '----preload----': [''],
                        'none': ['none'],
                        'metadata': ['metadata'],
                        'auto ': ['auto'],
                        '----kind----': [''],
                        'subtitles': ['subtitles'],
                        'captions': ['captions'],
                        'descriptions': ['descriptions'],
                        'chapters': ['chapters'],
                        'metadata': ['metadata'],
                        '----loading----': [''],
                        'eager': ['eager'],
                        'lazy': ['lazy'],
                        '----  type  ----': [''],
                        'type="audio/ogg"': ['"audio/ogg"'],
                        'type="audio/mpeg"': ['"audio/mpeg"'],
                        'type="image/jpg"': ['"image/jpg"'],
                        'type="text/htm"l': ['"text/html"'],
                        'type="video/mp4"': ['"video/mp4"'],
                        'type="video/ogg"': ['"video/ogg"'],
                        'type="video/webm"': ['"video/webm"'],

                        '----  media in picture  ----': [''],
                        'media="(min-width:320px)")': ['"(min-width:320px)"'],
                        'media="(min-width:800px)")': ['"(min-width:800px)"'],
                        'media="(min-width:1200px)")': ['"(min-width:1200px)"'],
                        '----  srcset in picture  ----': [''],
                        'srcset="small.jpg"': ['"small.jpg"'],
                        'srcset="medium.jpg"': ['"medium.jpg"'],
                        'srcset="large.jpg"': ['"large.jpg"'],

                        '----img----': [''],
                        'alt="Test"': ['"Test"'],
                        'title="Test"': ['"Test"'],
                        'src="fallback.jpg': ['"fallback.jpg"'],
                        'srcset="large.jpg 1200w, medium.jpg 800w, small.jpg 320w"': ['"large.jpg 1200w, medium.jpg 800w, small.jpg 320w"'],
                        'sizes="(max-width: 600px) 200px, 50vw")': ['"(max-width: 600px) 200px, 50vw"'],
                        'loading="eager"': ['"eager"'],
                        'loading="lazy"': ['"lazy"'],
//                        'usemap usemap="#workmap"': ['usemap'],
                    },
                    false
                    );
            break;

        case '%formproperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  css selector ----': [''],
                        'class  (class=(Text) ex:class="intro")': ['class'],
                        'id="formId"': ['id'],

//                        '---- all ----': [''],
//                        'name="myForm" (name=(Text))': ['name'],
//                        'value (value=(Text) ex:value="inputdata")': ['value'],
////                        'disabled (disabled=true|false ex:disabled="true")': ['disabled'],
////                        'required (required=true|false ex:required="true")': ['required'],
//                        'placeholder  (placeholder=(text) ex:placeholder="pleas enter...")': ['placeholder'],
//                        '----  form  ----': [''],
//                        'accept-charset="utf-8"': ['accept-charset'],
                        'action="/action_page.php" (action=URL)")': ['action'],
//                        'autocomplete="on"|"off" ': ['autocomplete'],
//                        'enctype="multipart/form-data" | "application/x-www-form-urlencoded" | "text/plain")': ['enctype'],
                        'method="get"|"post"': ['method'],
//                        'novalidate="novalidate"': ['novalidate'],
//                        'rel="external" | "help" | "license" | "next" | "nofollow" | "noreferrer" | "prev" | "search" | "noopener" | "opener" ': ['rel'],
                        'target="_blank" | "_self" | "_parent" | "_top" ': ['target'],

                    },
                    false
                    );
            break;

        case '%formpropertiesvalue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        'true': ['true'],
//                        'false': ['false'],
//                        'accept-charset="utf-8"': ['utf-8'],
//                        'novalidate="novalidate"': ['novalidate'],
//                        'id="formId"': ['formId'],
//                        'name="formName"': ['formName'],
//                        '----  autocomplete  ----': [''],
//                        'autocomplete="on"': ['"on"'],
//                        'autocomplete="off"': ['"off"'],
//                        '----form enctype，input formenctype----': [''],
//                        'application/x-www-form-': ['application/x-www-form-'],
//                        'urlencoded': ['urlencoded'],
//                        'multipart/form-data': ['multipart/form-data'],
//                        'text/plain': ['text/plain'],
//                        '---- form method/input for mmethod----': [''],
                        'action="/action_page.php" (action=URL)")': ['"/action_page.php"'],
                        '---- form method ----': [''],
                        'method="get"': ['"get"'],
                        'method="post"': ['"post"'],

//                        '---- form rel ----': [''],
//                        'rel="external" ': ['external'],
//                        'rel="help" ': ['help'],
//                        'rel="license" "noopener" | "opener" ': ['license'],
//                        'rel="nofollow" ': ['nofollow'],
//                        'rel="noreferrer" ': ['noreferrer'],
//                        'rel="prev" ': ['prev'],
//                        'rel="search" ': ['search'],
//                        'rel="noopener" ': ['noopener'],
//                        'rel="opener" ': ['opener'],

                        '---- form target ----': [''],
                        'target="_blank" ': ['"_blank"'],
                        'target="_self" ': ['"_self"'],
                        'target="_parent" ': ['"_parent"'],
                        'target="_top" ': ['"_top"'],
                    },
                    false
                    );
            break;

            //%formInputProperty
        case '%formInputProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  css selector ----': [''],
                        'class  (class=(Text) ex:class="intro")': ['class'],
                        'id="fname" (id=(Text))': ['id'],
//                        'name="fname" (name=(Text))': ['name'],
//                        'value="John" (value=(Text)) ': ['value'],
                        '----  property  ----': [''],
                        'accesskey="E"': ['accesskey'],
                        'autocomplete = "on" | "off"': ['autocomplete'],
                        'autofocus = "autofocus"': ['autofocus'],
                        'checked = "checked" (for type="checkbox" or type="radio") ': ['checked'],
                        // dirname
                        'disabled = "disabled" ': ['disabled'],

//                        'type = "button" | "checkbox" | "color" | "date" | "datetime-local" ': ['type'],
//                        'type = "email" | "file" | "hidden" | "image" | "month" | "number" ': ['type'],
//                        'type = "password" | "radio" | "range" | "reset" | "search" | "submit" ': ['type'],
//                        'type = "tel" | "text" | "time" | "url" | "week" ': ['type'],
                        'list = "browsers"': ['list'],
                        'placeholder  (placeholder=(text) ex:placeholder="pleas enter...")': ['placeholder'],

                        'readonly = "readonly" ': ['readonly'],
                        'required = "required" ': ['required'],

                        '----  type=button  ----': [''],
                        'type = "submit"}"menu"|"button"|"reset"': ['type'],
//                        'width = "48px"': ['width'],
//                        'src = "img_submit.gif"': ['src'],
//                        'alt = "Submit"': ['alt'],
                        '----  type=image  ----': [''],
                        'height = "48px"': ['height'],
                        'width = "48px"': ['width'],
                        'src = "img_submit.gif"': ['src'],
                        'alt = "Submit"': ['alt'],

                        '----  type=text  ----': [''],
                        'size="50" (size=number ex:size="10")': ['size'],
                        'maxlength (maxlength=number ex:maxlength="100")': ['maxlength'],
                        'minlength (minlength=number ex:minlength="-100")': ['minlength'],
                        'pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"': ['pattern'],

                        '----  type=number/date  ----': [''],
                        'max="10" (max=number|date)': ['max'],
                        'min="-10" (min=number|date)': ['min'],
                        'step="1" (step=number|any)': ['step'],

                        '----  type=file  ----': [''],
                        'multiple="multiple" ': ['multiple'],
                        'accept="file_extension" | "media_type" | "audio/*" | "video/*" | "image/*" ': ['accept'],

                        '----  type=submit  ----': [''],
                        'formaction="/action_page2.php"': ['formaction'],
                        'formenctype="multipart/form-data"': ['formenctype'],
                        'formmethod="post"': ['formmethod'],
                        'formtarget="_blank"': ['formtarget'],
                        'formnovalidate="formnovalidate"': ['formnovalidate'],
//                        'formmethod="post"': ['formmethod'],

                        '----  textarea  ----': [''],
                        'rows (rows=number ex:rows="3")': ['rows'],
                        'cols (cols=number ex:cols="4")': ['cols'],
                        'maxlength (maxlength=number ex:maxlength="100") ': ['maxlength'],
                        'minlength (minlength=number ex:minlength="-100") ': ['minlength'],
                        'readonly (readonly=true|false ex:readonly="true") ': ['readonly'],
                        'wrap (wrap=hard|soft ex:wrap="hard")': ['wrap'],
                        '----  option  ----': [''],
                        'selected (selected=true|false ex:selected="true")': ['selected'],
                        'label (label=(Text) ex:label="Volvo")': ['label'],

                        '----  img  ----': [''],
                        'draggable="true")': ['draggable'],
//                        'label (label=(Text) ex:label="Volvo")': ['label'],

                    },
                    false
                    );
            break;

        case '%formInputPropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '----  button  ----': [''],
                        'type = "submit"': ['"submit"'],
                        'type = "reset"': ['"reset"'],
                        'type = "button"': ['"button"'],
                        'type = "menu"': ['"menu"'],
//                        'width = "48px"': ['"48px"'],
//                        'src = "img_submit.gif"': ['"img_submit.gif"'],
//                        'alt = "Submit"': ['"Submit"'],
//                        'draggable="true")': ['"true"'],
//                        'draggable="false")': ['"false"'],
                        '----  property  ----': [''],
                        'accesskey="E"': ['"E"'],
                        'autocomplete = "on"': ['"on"'],
                        'autocomplete = "off"': ['"off"'],
                        'autofocus = "autofocus"': ['"autofocus"'],
                        'checked = "checked" (for type="checkbox" or type="radio") ': ['"checked"'],
                        // dirname
                        'disabled = "disabled" ': ['"disabled"'],
                        'true': ['true'],
                        'false': ['false'],
                        'readonly = "readonly" ': ['"readonly"'],
                        'required = "required" ': ['"required"'],

                        '----  image  ----': [''],
                        'height = "48px"': ['"48px"'],
                        'width = "48px"': ['"48px"'],
                        'src = "img_submit.gif"': ['"img_submit.gif"'],
                        'alt = "Submit"': ['"Submit"'],
                        'draggable="true")': ['"true"'],
                        'draggable="false")': ['"false"'],

                        '----  text  ----': [''],
                        'size="50" (size=number ex:size="10")': ['"50"'],
                        'maxlength (maxlength=number ex:maxlength="100")': ['"100"'],
                        'minlength (minlength=number ex:minlength="-100")': ['"-100"'],
                        'pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"': ['"[0-9]{3}-[0-9]{2}-[0-9]{3}"'],

                        '----  type=number/date  ----': [''],
                        'max="10" (max=number|date)': ['"10"'],
                        'min="-10" (min=number|date)': ['"-10"'],
                        'step="1" (step=number|any)': ['"1"'],

                        '----  type=file  ----': [''],
                        'multiple="multiple" ': ['"multiple"'],
                        'accept= "audio/*"': ['"audio/*"'],
                        'accept="file_extension"': ['"file_extension"'],

                        'accept="image/*" ': ['"image/*"'],
                        'accept=video/*"': ['"video/*'],

//                        '----  type=submit  ----': [''],
//                        'formaction="/action_page2.php"': ['formaction'],
//                        'formenctype="multipart/form-data"': ['formenctype'],
//                        'formmethod="post"': ['formmethod'],
//                        'formtarget="_blank"': ['formtarget'],
//                        'formnovalidate="formnovalidate"': ['formnovalidate'],
//                        'formmethod="post"': ['formmethod'],

                        '----  textarea  ----': [''],
                        'rows (rows=number ex:rows="3")': ['"3"'],
                        'cols (cols=number ex:cols="4")': ['"40"'],
                        'maxlength (maxlength=number ex:maxlength="100") ': ['"100"'],
                        'minlength (minlength=number ex:minlength="-100") ': ['"-100"'],
                        'readonly (readonly=true|false ex:readonly="true") ': ['"true"'],
                        'wrap="hard"': ['"hard"'],
                        'wrap="soft"': ['"soft"'],

                        '----  option  ----': [''],
                        'selected="true"': ['"true"'],
                        'selected="false"': ['"false"'],
                        'label="Volvo"': ['"Volvo"'],

//                        '----  form autocomplete  ----': [''],
//                        'on': ['on'],
//                        'off': ['off'],
//                        '----form enctype，input formenctype----': [''],
//                        'application/x-www-form-': ['application/x-www-form-'],
//                        'urlencoded': ['urlencoded'],
//                        'multipart/form-data': ['multipart/form-data'],
//                        'text/plain': ['text/plain'],
//                        '---- form method/input for mmethod----': [''],
//                        'get': ['get'],
//                        'post': ['post'],
                        // FCC No more needed since there is an <input ...> tag
//                        '----  input type  ----': [''],
//                        'type="button"': ['"button"'],
//                        'type="checkbox"': ['"checkbox"'],
//                        'type="color" - color picker': ['"color"'],
//                        'type="date" - date control (year, month, day)': ['"date"'],
//                        'type="datetime-local" - a date and time control (year, month, day, time)': ['"datetime-local"'],
//                        'type="email" - e-mail address': ['"email"'],
//                        'type="file" - file-select field': ['"file"'],
//                        'type="hidden" - hidden input field': ['"hidden"'],
//                        'type="image" - image as the submit button': ['"image"'],
//                        'type="month" - month and year control': ['"month"'],
//                        'type="number" - field for entering a number': ['"number"'],
//                        'type="password" - password field': ['"password"'],
//                        'type="radio" - radio button': ['"radio"'],
//                        'type="range" - range control': ['"range"'],
//                        'type="reset" - reset button': ['"reset"'],
//                        'type="search" - text field for entering a search string': ['"search"'],
//                        'type="submit" - submit button': ['"submit"'],
//                        'type="tel" - field for entering a telephone number': ['"tel"'],
//                        'type="text" - textfield': ['"text"'],
//                        'type="time" - control for entering a time': ['"time"'],
//                        'type="url" - field for entering a URL': ['"url"'],
//                        'type="week" - week and year control': ['"week"'],
//
//                        '----textarea wrap----': [''],
//                        'hard': ['"hard"'],
//                        'soft': ['"soft"'],
                    },
                    false
                    );
            break;

        case '%simpleProperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  form  ----': [''],
                        'novalidate - form should not be validated when submitted': ['novalidate'],
                        '----  select/file in form  ----': [''],
                        'multiple - allowed to enter more than one value in an input field.': ['multiple'],
                        '----  option in select in form  ----': [''],
                        'selected - option is pre-selected': ['selected'],
                        '----  input in form  ----': [''],
                        'autofocus - input field should automatically get focus when the page loads': ['autofocus'],
                        'checked -  checkbox is checked': ['checked'],
                        'disabled - input field should be disabled': ['disabled'],
                        'readonly - input field is read-only': ['readonly'],
                        'required - input field must be filled out before submitting the form': ['required'],

                        '----  vedio/audio in media  ----': [''],
                        'autoplay - start a video/audio automatically': ['autoplay'],
                        'muted - start playing video/audio (but muted)': ['muted'],
                        'controls - audio controls, like play, pause, and volume': ['controls'],
                        ////                        'required': ['off'],
//                        'readonly': ['readonly'],
//                        'zh-Hant': ['zh-Hant'],
//                        'zh-Hans': ['zh-Hans'],
//                        'zh-Hans-HK': ['zh-Hans-HK'],
                    },
                    false
                    );
            break;

        case '%lang':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'en': ['en'],
                        'zh-Hant': ['zh-Hant'],
                        'zh-Hans': ['zh-Hans'],
                        'zh-Hans-HK': ['zh-Hans-HK'],
                    },
                    false
                    );
            break;

        case '%htmltext':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'p': ['p'],
                        'a': ['a'],
//                        'span': ['span'],
                        'em': ['em'],
                        'i': ['i'],
                        'mark': ['mark'],
                        'strong': ['strong'],
                        'pre': ['pre'],
                        'code': ['code'],
                        'del': ['del'],
                    },
                    false
                    );
            break;

        case '%emptyTag':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'br': ['br'],
                        'hr': ['hr'],
                    },
                    false
                    );
            break;

        case '%media':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'audio': ['audio'],
                        'video': ['video'],
                        'video : track': ['track'],

                        '---  img ---': [''],
                        'figure': ['figure'],
                        'figcaption': ['figcaption'],
                        'img <img src="workplace.jpg" alt="Workplace" usemap="#workmap" width="400" height="379">': ['img'],

                        '---  embedded  ---': [''],
                        'iframe': ['iframe'],
                        'embed': ['embed'],

                        'map <map name="workmap">': ['map'],
                        'meter <meter value="14417" min="0" max="14417">14417</meter>': ['meter'],
                        'progress <progress value="5" max="10">50%</progress>': ['progress'],
                        'area <area shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm">': ['area'],
//                        ' figcaption': [' <figcaption>'],						
//						'svg': ['svg'],
                        'source': ['source'],
                        'object': ['object'],
                        'object : param': ['param'],
                        'picture': ['picture'],
                    },
                    false
                    );
            break;

        case '%svg':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'canvas': ['canvas'],
                        'svg': ['svg'],
                        'circle': ['circle'],
                        'rect': ['rect'],
                        'polygon': ['polygon'],
                        'defs': ['defs'],
                        'linearGradient': ['linearGradient'],
                        'stop': ['stop'],
                        'ellipse': ['ellipse'],
                        'text': ['text'],
                    },
                    false
                    );
            break;

        case '%svgproperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---svg---': [''],
                        'height (height=pixels|% ex:height="180"|"100%")': ['height'],
                        'width (width=pixels|% ex:width="240"|"100%")': ['width'],
                        '---circle---': [''],
                        'cx (cx=number ex:cx="4")': ['cx'],
                        'cy (cy=number ex:cy="4")': ['cy'],
                        'r (r=number ex:r="10")': ['r'],
                        'stroke(stroke=color ex:stroke="green")': ['stroke'],
                        'stroke-width (stroke-width=number ex:stroke-width="10")': ['stroke-width'],
                        'fill (fill=color ex:fill="yellow")': ['fill'],
                        '---rect---': [''],
                        'x (x=number ex:x="4")': ['x'],
                        'y (y=number ex:y="4")': ['y'],
                        'rx (rx=number ex:rx="4")': ['rx'],
                        'ry (ry=number ex:ry="4")': ['ry'],
                        'width (width=number ex:width="200")': ['width'],
                        'height (height=number ex:height="100")': ['height'],
                        'style (style=(Text) ex:style="fill:rgb(0,0,255);stroke-width:10;")': ['style'],
                        '---polygon---': [''],
                        'points (points=numberlist  points="100,10 40,198"': ['points'],
                        'style (style=(Text) ex:style="fill:lime;stroke:purple;"': ['style'],
                        '---linearGradient---': [''],
                        'id (id=(Text) ex:id="grad1")': ['id'],
                        'x1 (x1=number% ex:x1="0%")': ['x1'],
                        'y1 (y1=number% ex:y1="0%")': ['y1'],
                        'x2 (x2=number% ex:x2="100%")': ['x2'],
                        'y2 (y2=number% ex:y2="100%")': ['y2'],
                        '---stop---': [''],
                        'offset (offset=number% ex:offset="0%")': ['offset'],
                        'style (style=(Text) ex:style="stop-color:rgb(255,0,0);stop-opacity:1")': ['style'],
                        '---ellipse---': [''],
                        'cx (cx=number ex:cx="2")': ['cx'],
                        'cy (cy=number ex:cy="3")': ['cy'],
                        'rx (rx=number ex:rx="5")': ['rx'],
                        'ry (ry=number ex:ry="6")': ['ry'],
                        'fill (fill=color ex:fill="#ffffff")': ['fill'],
                        '---text---': [''],
                        'fill (fill=color ex:fill="#101010")': ['fill'],
                        'font-size (font-size=number ex:font-size="45")': ['font-size'],
                        'font-family (font-family=(Text) ex:font-family="Verdana")': ['font-family'],
                        'x (x=number ex:x="10")': ['x'],
                        'y (y=number ex:y="20")': ['y'],

                    },
                    false
                    );
            break;

        case '%svgpropertyvalue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---svg---': [''],
                        'height="180': ['"180"'],
                        'height=100%"': ['"100%"'],
                        'width="240': ['"240"'],
                        'width=100%")': ['"100%"'],

                        '---circle---': [''],
                        'cx (cx=number ex:cx="4")': ['"4"'],
                        'cy (cy=number ex:cy="4")': ['"4"'],
                        'r (r=number ex:r="10")': ['"10"'],
                        'stroke(stroke=color ex:stroke="green")': ['"green"'],
                        'stroke-width (stroke-width=number ex:stroke-width="10")': ['"10"'],
                        'fill (fill=color ex:fill="yellow")': ['"yellow"'],

                        '---rect---': [''],
                        'x (x=number ex:x="4")': ['"4"'],
                        'y (y=number ex:y="4")': ['"4"'],
                        'rx (rx=number ex:rx="4")': ['"4"'],
                        'ry (ry=number ex:ry="4")': ['"4"'],
                        'width (width=number ex:width="200")': ['"200"'],
                        'height (height=number ex:height="100")': ['"100"'],
                        'style (style=(Text) ex:style="fill:rgb(0,0,255);stroke-width:10;")': ['"fill:rgb(0,0,255);stroke-width:10;"'],

                        '---polygon---': [''],
                        'points (points=numberlist  points="100,10 40,198"': ['"100,10 40,198"'],
                        'style (style=(Text) ex:style="fill:lime;stroke:purple;"': ['"fill:lime;stroke:purple;"'],

                        '---linearGradient---': [''],
                        'id (id=(Text) ex:id="grad1")': ['"grad1"'],
                        'x1 (x1=number% ex:x1="0%")': ['"0%"'],
                        'y1 (y1=number% ex:y1="0%")': ['"0%"'],
                        'x2 (x2=number% ex:x2="100%")': ['"100%"'],
                        'y2 (y2=number% ex:y2="100%")': ['"100%"'],

                        '---stop---': [''],
                        'offset (offset=number% ex:offset="0%")': ['0%'],
                        'style (style=(Text) ex:style="stop-color:rgb(255,0,0);stop-opacity:1")': ['"stop-color:rgb(255,0,0);stop-opacity:1"'],

                        '---ellipse---': [''],
                        'cx (cx=number ex:cx="2")': ['"2"'],
                        'cy (cy=number ex:cy="3")': ['"3"'],
                        'rx (rx=number ex:rx="5")': ['"5"'],
                        'ry (ry=number ex:ry="6")': ['"6"'],
                        'fill (fill=color ex:fill="#ffffff")': ['"#ffffff"'],

                        '---text---': [''],
                        'fill (fill=color ex:fill="#101010")': ['"#101010"'],
                        'font-size (font-size=number ex:font-size="45")': ['"45"'],
                        'font-family (font-family=(Text) ex:font-family="Verdana")': ['"Verdana"'],
                        'x (x=number ex:x="10")': ['"10"'],
                        'y (y=number ex:y="20")': ['"20"'],

                    },
                    false
                    );
            break;


        case '%table':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'colgroup (column groups)': ['colgroup'],
                        'col (an empty element)': ['col'],
                        'caption': ['caption'],
                        'th (table header)': ['th'],
                        'td (table data)': ['td'],
                        '---- Php ----': [''],
                        'table': ['table'],
                        'colgroup ': ['colgroup'],

                        'tr (table row)': ['tr'],
                        'thead (table header)': ['thead'],
                        'tbody (table body)': ['tbody'],
                        'tfoot (table footer)': ['tfoot']
                    },
                    false
                    );
            break;

        case '%table1':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        'table': ['table'],
                        'colgroup ': ['colgroup'],
//                        'col': ['col'],
                        'td (table data)': ['td'],
                        'tr (table row)': ['tr'],
                        'thead (table header)': ['thead'],
                        'tbody (table body)': ['tbody'],
                        'tfoot (table footer)': ['tfoot'],
                    },
                    false
                    );
            break;


        case '%listProperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  css  ----': [''],
                        'class  (class=(Text) ex:class="intro")': ['class'],
                        'id (id=(Text) ex:id="footer")': ['id'],

                        '--- order list ---': [''],
//                        'align="left (default)"|"right"|"center"': ['align'],                        
//                        'height (height=pixels|% ex:height="180"|"100%")': ['height'],
                        'reversed="reversed")': ['reversed'],
                        'start="10"': ['start'],
                        'type="1 | a | A | i | I"': ['type'],

                        '--- unorder list ---': [''],
                        'type="disc|circle|square|")': ['type'],

                    },
                    false
                    );
            break;

        case '%listPropertiesValues':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '--- order list  ---': [''],
                        'reversed="reversed"': ['"reversed"'],
                        'start="10"': ['"10"'],
                        'type="1"': ['"1"'],
                        'type="a"': ['"a"'],
                        'type="A"': ['"A"'],
                        'type="i"': ['"i"'],
                        'type="I"': ['"I"'],

                        '--- unorder list ---': [''],
                        'type="disc"': ['"disc"'],
                        'type="circle"': ['"circle"'],
                        'type="squzre"': ['"square"'],
                        'cellpadding="10"': ['"10"'],
                        '--- td (table data) / th (table head) atrributes ---': [''],
                        'colspan="3"  (colspan=number ex:colspan="3")': ['"3"'],
                        'rowspan="4"  (rowspan=number ex:rowspan="4")': ['"4"'],
//                        cellpadding="10"
                    },
                    false
                    );
            break;


        case '%tableproperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '----  css  ----': [''],
                        'class  (class=(Text) ex:class="intro")': ['class'],
                        'id (id=(Text) ex:id="footer")': ['id'],

                        '--- table atrributes ---': [''],
//                        'align="left (default)"|"right"|"center"': ['align'],                        
//                        'height (height=pixels|% ex:height="180"|"100%")': ['height'],
                        'width (width=pixels|% ex:width="240"|"100%")': ['width'],
                        'border="0"(default)|"1-100")': ['border'],
                        'span  (span=number ex:span="4")': ['span'],
                        'cellspacing="10" in pixels': ['cellspacing'],
                        'cellpadding="10" in pixels': ['cellpadding'],
                        'title="title"': ['title'],
                        '--- td (table data) /th (table head) atrributes ---': [''],
                        'colspan  (colspan=number ex:colspan="3")': ['colspan'],
                        'rowspan  (rowspan=number ex:rowspan="4")': ['rowspan'],

                    },
                    false
                    );
            break;

        case '%tablePropertiesValues':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '--- table atrributes  ---': [''],
                        'width="100%"': ['"100%"'],
                        'width="400"': ['"400"'],
                        'border="1"': ['"1"'],

                        'span  (span=number ex:span="4")': ['"4"'],
                        'cellspacing="10"': ['"10"'],
                        'cellpadding="10"': ['"10"'],
                        '--- td (table data) / th (table head) atrributes ---': [''],
                        'colspan=3  (colspan=number ex:colspan="3")': ['"3"'],
                        'rowspan=4  (rowspan=number ex:rowspan="4")': ['"4"'],
//                        cellpadding="10"
                    },
                    false
                    );
            break;

        case '%preload':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'none': ['none'],
                        'metadata': ['metadata'],
                        'auto ': ['auto'],
                    },
                    false
                    );
            break;

        case '%autoplay':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%htmlloop':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%muted':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%controls':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'true': ['true'],
                        'false': ['false'],
                    },
                    false
                    );
            break;

        case '%form':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '--- form controls ---': [''],
//                        'form - HTML form for user input': ['form'],
                        'button - clickable button': ['button'],
//                        'datalist - list of pre-defined options for input controls': ['datalist'],

//                        'input -  input control': ['input'], // correct format: <input .... />
                        'label - label for an <input> element': ['label'],
                        'output - result of a calculation': ['output'],
                        'optgroup - group of related options in a drop-down list': ['optgroup'],
                        'textarea - multiline input control (text area)': ['textarea'],
                        '--- select tag ---': [''],
                        'legend - caption for a <fieldset> element': ['legend'],

                        '--- select/datalist tag ---': [''],
                        'option (select) - option in a drop-down list': ['option'],
//                        'select - drop-down list': ['select'],

                    },
                    false
                    );
            break;

        case '%formBlock':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'form - HTML form for user input': ['form'],
//                        'button - clickable button': ['button'],
                        'datalist - list of pre-defined options for input controls': ['datalist'],
                        'fieldset - Groups related elements': ['fieldset'],
//                        'input -  input control': ['input'],
//                        'label - label for an <input> element': ['label'],
//                        'legend - caption for a <fieldset> element': ['legend'],
//                        'optgroup - group of related options in a drop-down list': ['optgroup'],
//                        'option - option in a drop-down list': ['option'],
//                        'output - result of a calculation': ['output'],
                        'select - drop-down list': ['select'],
                        'textarea - multiline input control (text area)': ['textarea'],
                    },
                    false
                    );
            break;

        case '%htmlinput':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'input': ['input'],
                        'textarea': ['textarea'],
                    },
                    false
                    );
            break;

        case '%target':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '_self': ['_self'],
                        '_blank': ['_blank'],
                        '_parent': ['_parent'],
                        '_top': ['_top'],
                    },
                    false
                    );
            break;

        case '%rel':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'nofollow': ['nofollow'],
                        'noreferrer': ['noreferrer'],
                        'noopener': ['noopener'],
                        'prev': ['prev'],
                        'next': ['next'],
                    },
                    false
                    );
            break;

        case '%htmllist':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'ul (unordered list)': ['ul'],
                        'ol (ordered list)': ['ol'],
                        'li (list item of ul/ol)': ['li'],
                        'dl (definition lists)': ['dl'],
                        'dt (definition term)': ['dt'],
                        'dd (description detail)': ['dd'],
                    },
                    false
                    );
            break;

        case '%method':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'get': ['get'],
                        'put': ['put'],
                        'post': ['post'],
                    },
                    false
                    );
            break;

        case '%autocomplete':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'on': ['on'],
                        'off': ['off'],
                    },
                    false
                    );
            break;

        case '%inputtype':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'button': ['"button"'],

                        'checkbox': ['"checkbox"'],
                        'color': ['"color"'],
                        'date': ['"date"'],
                        'datetime-local': ['"datetime-local"'],

                        'email': ['"email"'],
                        'file': ['"file"'],
                        'hidden': ['"hidden"'],
                        '--- i ---': [''],
                        'image': ['"image"'],
                        'month': ['"month"'],
                        'number': ['"number"'],

                        'password': ['"password"'],
                        'radio': ['"radio"'],
                        'range': ['"range"'],
                        'reset': ['"reset"'],
                        'search': ['"search"'],
                        'submit': ['"submit"'],
                        '--- t ---': [''],
                        'tel': ['"tel"'],
                        'text': ['"text"'],
//                        'textarea': ['"textarea"'],                        
                        'time': ['"time"'],
                        'url': ['"url"'],
                        'week': ['"week"'],
                    },
                    false
                    );
            break;

        case '%inputTypeValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
//                        'date': ['"date"'],

//                        'image': ['"image"'],
//                        'number': ['"number"'],

//                        'password': ['"password"'],
                        '--- text ---': [''],
                        'name': ['"name"'],
                        'text': ['"text"'],
                        'value': ['"value"'],
                        '--- button ---': [''],
                        'reset': ['"reset"'],
                        'submit': ['"submit"'],
                        'OK': ['"OK"'],
                        'Cancel': ['"Cancel"'],
                        '--- color ---': [''],
                        'red': ['"#FF0000"'],
                        'green': ['"#00FF00"'],
                        'blue': ['"#0000FF"'],
                        'Cancel': ['"Cancel"'],
                        '--- radio/checkbox ---': [''],
                        'item1': ['"item1"'],
                        'item2': ['"item2"'],
                    },
                    false
                    );
            break;

        case '%sandbox':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'allow-forms': ['allow-forms'],
                        'allow-modals': ['allow-modals'],
                        'allow-orientation-lock': ['allow-orientation-lock'],
                        'allow-pointer-lock': ['allow-pointer-lock'],
                        'allow-popups': ['allow-popups'],
                        'allow-popups-to-escape-sandbox': ['allow-popups-to-escape-sandbox'],
                        'allow-presentation': ['allow-presentation'],
                        'allow-same-origin': ['allow-same-origin'],
                        'allow-scripts': ['allow-scripts'],
                        'allow-top-navigation': ['allow-top-navigation'],
                        'allow-top-navigation-by-user-activation': ['allow-top-navigation-by-user-activation'],
                    },
                    false
                    );
            break;

        case '%frame':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'frameset': ['frameset'],
                        'frame': ['frame'],
                    },
                    false
                    );
            break;

        case '%framproperties':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---frameset---': [''],
                        'cols': ['cols'],
                        'rows': ['rows'],
                        '---frame---': [''],
                        'src': ['src'],
                        'name': ['name'],
                        'noresize': ['noresize'],
                        'scrolling': ['scrolling'],
                        'marginheight': ['marginheight'],
                        'marginwidth': ['marginwidth'],
                        'frameborder': ['frameborder'],
                    },
                    false
                    );
            break;


        case '%scrolling':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'yes': ['yes'],
                        'no': ['no'],
                    },
                    false
                    );
            break;

        case '%kind':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'subtitles': ['subtitles'],
                        'captions': ['captions'],
                        'descriptions': ['descriptions'],
                        'chapters': ['chapters'],
                        'metadata': ['metadata'],
                    },
                    false
                    );
            break;

        case '%selector':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        ' * ': ['*'],
                        '> chile selector': ['>'],
                        '+ sibling selector': ['+'],
                        ' ~ ': ['~'], // a horizontal line
                        '"~"': ['~'], // a horizontal line                        
                        ':link': [':link'],
                        ':visited': [':visited'],
                        ':active': [':active'],
                        ':hover': [':hover'],
                        ':focus': [':focus'],

                        '----  structural pseudo-classes ----': [''],
                        ':first-child': [':first-child'],

                        ':first-of-type': [':first-of-type'],
                        ':last-of-type': [':last-of-type'],
                        ':only-of-type': [':only-of-type'],
                        ':only-child': [':only-child'],
                        ':last-child': [':last-child'],

                        ':root': [':root'],

                        ':out-of-range': [':out-of-range'],
                        ':in-range': [':in-range'],
                        ':read-write': [':read-write'],
                        ':read-only': [':read-only'],
                        ':optional': [':optional'],
                        ':required': [':required'],
                        ':valid': [':valid'],
                        ':invalid': [':invalid'],

                        '----  pseudo-element ----': [''],
                        '::after': ['::after'],
                        '::backdrop': ['::backdrop'],
                        '::before': ['::before'],
                        '::cue': ['::cue'],
                        '::first-letter': ['::first-letter'],
                        '::first-line': ['::first-line'],
                        '::grammar-error': ['::grammar-error'],
                        '::marker': ['::marker'],
                        '::placeholder': ['::placeholder'],
                        '::selection': ['::selection'],
                        '::slotted()': ['::slotted()'],
                        '::spelling-error': ['::spelling-error'],
                    },
                    false
                    );
            break;

        case '%cssOptions':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        ' ': [' '],
                        ',': [','],
                        '> (child selector)': ['>'],
                        '+ (next sibling selector)': ['+'],
                        ' ~ (sibling selector)': ['~'],
                        '~': ['~'], // horizontal line FCC

                        ':link': [':link'],
                        ':visited': [':visited'],
                        ':active': [':active'],
                        ':hover': [':hover'],
                        ':focus': [':focus'],
                        ':first-letter': [':first-letter'],
                        ':first-line': [':first-line'],
                        ':first-child': [':first-child'],
                        ':before': [':before'],
                        ':after': [':after'],
                        ':first-of-type': [':first-of-type'],
                        ':last-of-type': [':last-of-type'],
                        ':only-of-type': [':only-of-type'],
                        ':only-child': [':only-child'],
                        ':last-child': [':last-child'],
                        '----  pseudo-element ----': [''],
                        '::after': ['::after'],
                        '::backdrop': ['::backdrop'],
                        '::before': ['::before'],
                        '::cue': ['::cue'],
                        '::first-letter': ['::first-letter'],
                        '::first-line': ['::first-line'],
                        '::grammar-error': ['::grammar-error'],
                        '::marker': ['::marker'],
                        '::placeholder': ['::placeholder'],
                        '::selection': ['::selection'],
                        '::slotted()': ['::slotted()'],
                        '::spelling-error': ['::spelling-error'],
                    },
                    false
                    );
            break;

        case '%cssOptions2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        ':lang': [':lang'],
                        ':nth-child': [':nth-child'],
                        ':nth-last-child': [':nth-last-child'],
                        ':nth-of-type': [':nth-of-type'],
                        ':nth-last-of-type': [':nth-last-of-type'],
                        ':not': [':not'],
                    },
                    false
                    );
            break;
        case '%TagKey':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '@keyframes': ['@keyframes'],
//                        ':nth-child': [':nth-child'],
//                        ':nth-last-child': [':nth-last-child'],
//                        ':nth-of-type': [':nth-of-type'],
//                        ':nth-last-of-type': [':nth-last-of-type'],
//                        ':not': [':not'],
                    },
                    false
                    );
            break

        case '%element':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---a---': [''],
                        'a': ['a'],
//                        'abbr': ['abbr'],
//                        'address': ['address'],
//                        'area': ['area'],
                        'article': ['article'],
                        'aside': ['aside'],
                        'audio': ['audio'],
                        '---b---': [''],
//                        'b': ['b'],
//                        'base': ['base'],
//                        'bdi': ['bdi'],
//                        'bdo': ['bdo'],
                        'blockquote': ['blockquote'],
                        'body': ['body'],
                        'br': ['br'],
                        'button': ['button'],
                        '---c---': [''],
                        'canvas': ['canvas'],
//                        'caption': ['caption'],
                        'cite': ['cite'],
                        'code': ['code'],
                        'col': ['col'],
                        'colgroup': ['colgroup'],
                        '---d---': [''],
                        'data': ['data'],
                        'datalist': ['datalist'],
                        'dd': ['dd'],
//                        'del': ['del'],
                        'details': ['details'],
                        'dfn': ['dfn'],
                        'dialog': ['dialog'],
                        'div': ['div'],
                        'dl': ['dl'],
                        'dt': ['dt'],
                        '---e---': [''],
                        'em': ['em'],
                        'embed': ['embed'],
                        '---f---': [''],
                        'fieldset': ['fieldset'],
                        'figcaption': ['figcaption'],
                        'figure': ['figure'],
                        'footer': ['footer'],
                        'form': ['form'],
                        '---h---': [''],
                        'h1': ['h1'],
                        'h2': ['h2'],
                        'h3': ['h3'],
                        'h4': ['h4'],
                        'h5': ['h5'],
                        'h6': ['h6'],
//                        'head': ['head'],
                        'header': ['header'],
//                        'hr': ['hr'],
//                        'html': ['html'],
                        '---i---': [''],
//                        'i': ['i'],
                        'iframe': ['iframe'],
                        'img': ['img'],
                        'input': ['input'],
//                        'ins': ['ins'],
                        '---k---': [''],
                        'kbd': ['kbd'],
                        '---l---': [''],
                        'legend': ['legend'],
                        'li': ['li'],
                        'link': ['link'],
                        '---m---': [''],
                        'main': ['main'],
                        'map': ['map'],
                        'mark': ['mark'],
//                        'meta': ['meta'],
                        'meter': ['meter'],
                        '---n---': [''],
                        'nav': ['nav'],
//                        'noscript': ['noscript'],
                        '---o---': [''],
                        'object': ['object'],
                        'ol': ['ol'],
                        'optgroup': ['optgroup'],
                        'option': ['option'],
                        'output': ['output'],
                        '---p---': [''],
                        'p': ['p'],
//                        'param': ['param'],
                        'picture': ['picture'],
                        'pre': ['pre'],
                        'progress': ['progress'],
                        '---q---': [''],
                        'q': ['q'],
                        '---r---': [''],
                        'rp': ['rp'],
                        'rt': ['rt'],
                        'ruby': ['ruby'],
                        '---s---': [''],
                        's': ['s'],
                        'samp': ['samp'],
                        'script': ['script'],
                        'section': ['section'],
                        'select': ['select'],
                        'small': ['small'],
                        'source': ['source'],
                        'span': ['span'],
                        'strong': ['strong'],
                        'style': ['style'],
                        'sub': ['sub'],
                        'summary': ['summary'],
                        'sup': ['sup'],
                        'svg': ['svg'],
                        '---t---': [''],
                        'table': ['table'],
                        'tbody': ['tbody'],
                        'td': ['td'],
//                        'template': ['template'],
                        'textarea': ['textarea'],
                        'tfoot': ['tfoot'],
                        'th': ['th'],
                        'thead': ['thead'],
                        'time': ['time'],
                        'title': ['title'],
                        'tr': ['tr'],
                        'track': ['track'],
                        'tt': ['tt'],
                        '---u---': [''],
                        'u': ['u'],
                        'ul': ['ul'],
                        '---v---': [''],
                        'var': ['var'],
                        'video': ['video'],
                        '---w---': [''],
                        'wbr': ['wbr'],
                        'window': ['window'],
                    },
                    false
                    );
            break;

        case '%element2':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---a---': [''],
                        'a': ['a'],
//                        'abbr': ['abbr'],
//                        'address': ['address'],
//                        'area': ['area'],
                        'article': ['article'],
                        'aside': ['aside'],
                        'audio': ['audio'],
                        '---b---': [''],
//                        'b': ['b'],
//                        'base': ['base'],
//                        'bdi': ['bdi'],
//                        'bdo': ['bdo'],
                        'blockquote': ['blockquote'],
                        'body': ['body'],
//                        'br': ['br'],
                        'button': ['button'],
                        '---c---': [''],
                        'canvas': ['canvas'],
//                        'caption': ['caption'],
                        'cite': ['cite'],
                        'code': ['code'],
                        'col': ['col'],
                        'colgroup': ['colgroup'],
                        '---d---': [''],
                        'data': ['data'],
                        'datalist': ['datalist'],
                        'dd': ['dd'],
//                        'del': ['del'],
                        'details': ['details'],
                        'dfn': ['dfn'],
                        'dialog': ['dialog'],
                        'div': ['div'],
                        'dl': ['dl'],
                        'dt': ['dt'],
                        '---e---': [''],
                        'em': ['em'],
                        'embed': ['embed'],
                        '---f---': [''],
                        'fieldset': ['fieldset'],
                        'figcaption': ['figcaption'],
                        'figure': ['figure'],
                        'footer': ['footer'],
                        'form': ['form'],
                        '---h---': [''],
                        'h1': ['h1'],
                        'h2': ['h2'],
                        'h3': ['h3'],
                        'h4': ['h4'],
                        'h5': ['h5'],
                        'h6': ['h6'],
//                        'head': ['head'],
                        'header': ['header'],
//                        'hr': ['hr'],
//                        'html': ['html'],
                        '---i---': [''],
//                        'i': ['i'],
                        'iframe': ['iframe'],
                        'img': ['img'],
                        'input': ['input'],
//                        'ins': ['ins'],
                        '---k---': [''],
                        'kbd': ['kbd'],
                        '---l---': [''],
                        'legend': ['legend'],
                        'li': ['li'],
                        'link': ['link'],
                        '---m---': [''],
                        'main': ['main'],
                        'map': ['map'],
                        'mark': ['mark'],
//                        'meta': ['meta'],
                        'meter': ['meter'],
                        '---n---': [''],
                        'nav': ['nav'],
//                        'noscript': ['noscript'],
                        '---o---': [''],
                        'object': ['object'],
                        'ol': ['ol'],
                        'optgroup': ['optgroup'],
                        'option': ['option'],
                        'output': ['output'],
                        '---p---': [''],
                        'p': ['p'],
//                        'param': ['param'],
                        'picture': ['picture'],
                        'pre': ['pre'],
                        'progress': ['progress'],
                        '---q---': [''],
                        'q': ['q'],
                        '---r---': [''],
                        'rp': ['rp'],
                        'rt': ['rt'],
                        'ruby': ['ruby'],
                        '---s---': [''],
                        's': ['s'],
                        'samp': ['samp'],
                        'script': ['script'],
                        'section': ['section'],
                        'select': ['select'],
                        'small': ['small'],
                        'source': ['source'],
                        'span': ['span'],
                        'strong': ['strong'],
                        'style': ['style'],
                        'sub': ['sub'],
                        'summary': ['summary'],
                        'sup': ['sup'],
                        'svg': ['svg'],
                        '---t---': [''],
                        'table': ['table'],
                        'tbody': ['tbody'],
                        'td': ['td'],
//                        'template': ['template'],
                        'textarea': ['textarea'],
                        'tfoot': ['tfoot'],
                        'th': ['th'],
                        'thead': ['thead'],
                        'time': ['time'],
                        'title': ['title'],
                        'tr': ['tr'],
                        'track': ['track'],
                        'tt': ['tt'],
                        '---u---': [''],
                        'u': ['u'],
                        'ul': ['ul'],
                        '---v---': [''],
                        'var': ['var'],
                        'video': ['video'],
                        '---w---': [''],
                        'wbr': ['wbr'],
                        'window': ['window'],
                    },
                    false
                    );
            break;

        case '%cssText':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---  font  ---': [''],
                        'font:  (font-style,font-variant,  font-weight, font-size/line-height,font-family) ': ['font'],

                        'font-family: courier, "Times New Roman", Times, serif, Arial, Helvetica, sans-serif, "Lucida Console", "Courier New", monospace': ['font-family'],
                        'font-style: normal italic | oblique': ['font-style'],

                        'font-size: 30px | 2.5em | 300%': ['font-size'],
                        'font-variant: normal | small-caps': ['font-weight'],
                        'font-weight: normal | bold': ['font-weight'],

                        '---  text  ---': [''],
                        'text-align: center | left | right | justify': ['text-align'],
                        'text-align-last: center | left | right': ['text-align-last'],
                        'text-decoration (line, color, style, thickness): underline red double 5px': ['text-decoration'],
                        'text-decoration-color: red | blue | green': ['text-decoration-color'],
                        'text-decoration-line: underline | overline | line-through | none': ['text-decoration-line'],
                        'text-decoration-style: solid |  double | dotted | dashed | wavy ': ['text-decoration-style'],
                        'text-decoration-thickness: auto |  5px | 25% ': ['text-decoration-thickness'],
                        'text-indent: 50px': ['text-indent'],
                        'text-shadow: 2px 2px 5px red': ['text-shadow'],
                        'text-transform: uppercase | lowercase | capitalize': ['text-transform'],

                        '---  text  relateed ---': [''],
                        'letter-spacing: 3px': ['letter-spacing'],
                        'line-height: 1.8': ['line-height'],
                        'vertical-align: baseline | text-top | text-bottom | sub | super': ['vertical-align'],
                        'word-spacing: 10px': ['word-spacing'],
                        'white-space: normal | nowrap | pre': ['white-space'],

                        '---   width & height  ---': [''],
                        'width: 30%': ['width'],
                        'height: 300px': ['height'],
                        'max-width: 500px': ['max-width'],
                        'min-width: 100px': ['min-width'],
                        'max-height: 500px': ['max-height'],
                        'min-height: 100px': ['min-height'],

                    },
                    false
                    );
            break;

        case '%cssTextValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---  font  ---': [''],
                        'font:  italic small-caps bold 12px/30px Georgia, serif) ': ['italic small-caps bold 12px/30px Georgia, serif'],
                        'font-family: courier, "Times New Roman", Times, serif, Arial, Helvetica, sans-serif, "Lucida Console", "Courier New", monospace': ['courier, "Times New Roman", Times, serif, Arial, Helvetica, sans-serif, "Lucida Console", "Courier New", monospace'],
                        'font-style: normal': ['normal'],
                        'font-style: italic': ['italic'],
                        'font-style: oblique': ['oblique'],
                        'font-size: 30px': ['30px'],
                        'font-size: 300%': ['300%'],
                        'font-size: 10vw': ['10vw'],
                        'font-variant: normal ': ['normal'],
                        'font-variant: small-caps': ['small-caps'],
                        'font-weight: normal': ['normal'],
                        'font-weight: bold': ['bold'],
                        'font-family: courier, "Times New Roman", Times, serif, Arial, Helvetica, sans-serif, "Lucida Console", "Courier New", monospace': ['courier, "Times New Roman", Times, serif, Arial, Helvetica, sans-serif, "Lucida Console", "Courier New", monospace'],

                        '---  text  ---': [''],
                        'text-align/text-align-last: center': ['center'],
                        'text-align/text-align-last: left': ['left'],
                        'text-align/text-align-last: right': ['right'],
                        'text-align: justify': ['justify'],

                        'text-decoration (line, color, style, thickness): underline red double 5px': ['underline red double 5px'],
                        'text-decoration: underline': ['underline'],
                        'text-decoration: none': ['none'],
                        'text-decoration-color: red': ['red'],
                        'text-decoration-color: blue': ['blue'],
                        'text-decoration-color: green': ['green'],
                        'text-decoration-line: underline': ['underline'],
                        'text-decoration-line: overline': ['overline'],
                        'text-decoration-line: line-through': ['line-through'],
                        'text-decoration-line: none': ['none'],

                        'text-decoration-style: solid': ['solid'],
                        'text-decoration-style: double ': ['double'],
                        'text-decoration-style: dotted': ['dotted'],
                        'text-decoration-style: dashed': ['dashed'],
                        'text-decoration-style: wavy ': ['wavy'],
                        'text-decoration-thickness: auto': ['auto'],
                        'text-decoration-thickness: 5px': ['5px'],
                        'text-decoration-thickness: 25%': ['25%'],

                        'text-indent: 50px': ['50px'],
                        'text-shadow: 2px 2px 5px red': ['2px 2px 5px red'],
                        'text-transform: uppercase': ['uppercase'],
                        'text-transform: lowercase': ['lowercase'],
                        'text-transform: capitalize': ['capitalize'],

                        '---  text  relateed ---': [''],
                        'letter-spacing: 3px': ['3px'],
                        'line-height: 20px': ['20px'],
                        'vertical-align: baseline ': ['baseline'],
                        'vertical-align: text-top': ['text-top'],
                        'vertical-align: text-bottom': ['text-bottom'],
                        'vertical-align: sub': ['sub'],
                        'vertical-align: super': ['super'],

                        'word-spacing: 10px': ['10px'],
                        'white-space: normal': ['normal'],
                        'white-space: nowrap': ['nowrap'],
                        'white-space: pre': ['pre'],

                        '---   width & height  ---': [''],
                        'width: 30%': ['30%'],
                        'height: 300px': ['300px'],
                        'max-width: 500px': ['500px'],
                        'min-width: 100px': ['100px'],
                        'max-height: 500px': ['500px'],
                        'min-height: 100px': ['100px'],

                    },
                    false
                    );
            break;



        case '%cssList':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---  list  ---': [''],
                        'list-style-type: circle | disc | decimal | lower-alpha | lower-roman | none | upper-alpha': ['list-style-type'],
                        'list-style-image: url(image)': ['list-style-image'],
                        'list-style-position: inside | outside (default)': ['list-style-position'],

                        '---  display  ---': [''],
                        'display: block | inline | inline-block | none': ['display'],

                    },
                    false
                    );
            break;

        case '%cssListValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---  list  ---': [''],
                        'list-style-type: circle': ['circle'],
                        'list-style-type: disc': ['disc'],

                        'list-style-type: decimal': ['decimal'],
                        'list-style-type: lower-alpha': ['lower-alpha'],
                        'list-style-type: lower-roman': ['lower-roman'],
                        'list-style-type: none': ['none'],
                        'list-style-type: upper-alpha': ['upper-alpha'],
                        'list-style-image: url(image)': ['list-style-image'],
                        'list-style-position: inside': ['inside'],
                        'list-style-position: outside (default)': ['outside'],

                        '---  display  ---': [''],
                        'display: block': ['block'],
                        'display: inline': ['inline'],
                        'display: inline-block': ['inline-block'],
                        'display: none': ['none'],
                    },
                    false
                    );
            break;


        case '%cssMarginPadding':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---  padding  ---': [''],
                        'padding: 70px 20px': ['padding'],
                        '---   margin  ---': [''],
                        'margin: 25px 50px 75px 100px': ['margin'],
                        'margin-top: 7px': ['margin-top'],
                        'margin-right: 0.2em': ['margin-right'],
                        'margin-bottom: auto': ['margin-bottom'],
                        'margin-left: inherit': ['margin-left'],

                    },
                    false
                    );
            break;

        case '%cssMarginPaddingValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---  padding  ---': [''],
                        'padding: 30px': ['30px'],
                        '---   margin  ---': [''],
                        'margin: 25px 50px 75px 100px': ['25px 50px 75px 100px'],
                        'margin-top: 7px': ['7px'],
                        'margin-right: 0.2em': ['0.2em'],
                        'margin-bottom: auto': ['auto'],
                        'margin-left: inherit': ['inherit'],
                    },
                    false
                    );
            break;

        case '%cssproperty':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'all': ['all'],
//                        'backface-visibility': ['backface-visibility'],
//                        'bottom': ['bottom'],
//                        'caption-side': ['caption-side'],
//                        'caret-color': ['caret-color'],



                        '---  background  ---': [''],
//                        'background-color:red': ['background-color'],
                        'background:linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)': ['background'],
                        'background: #ffffff url("img_tree.png") no-repeat right top': ['background'],
//
//                        'background-attachment: fixed': ['background-attachment'],
//                        'background-blend-mode': ['background-blend-mode-direction'],
//                        'background-clip : content-box ': ['background-clip'],
//                        'background-color:red': ['background-color'],
//                        'background-image:url("paper.gif")': ['background-image'],
//                        'background-origin': ['background-origin'],
//                        'background-position: right top': ['background-position'],
//                        'background-repeat: repeat-x|no-repeat': ['background-repeat'],
//                        'background-size': ['background-size'],

                        '---   box  ---': [''],
                        'box-sizing: border-box': ['box-sizing'],

                        '---  border/outline  ---': [''],
                        'border: 2px solid powderblue': ['border'],
//                        'border-bottom: 1px solid #f1f1f1': ['border-bottom'],
//                        'border-width: 25px 10px 4px 35px': ['border-width'],
//                        'border-color: red green blue yellow': ['border-color'],
//                        'border-style: dotted solid double dashed': ['border-style'],
//                        'border-radius: 5px': ['border-radius'],

                        'outline: 2px solid powderblue': ['outline'],
//                        'outline-width: 25px 10px 4px 35px': ['outline-width'],
//                        'outline-color: red green blue yellow': ['outline-color'],
//                        'outline-style: dotted solid double dashed': ['outline-style'],
//                        'outline-offset: 15px': ['outline-offset'],


                        '---  color  ---': [''],
                        'color:red': ['color'],

                        '---  content:   ---': [''],
                        'content: « ': ['content'],
                        'content: » ': ['content'],

                        'display: block | inline-block': ['display'],
                        '---  font  ---': [''],
                        'font: bold italic 40px/1.33 serif': ['font'],
//                        'font-family:"Courier New"|Courier|cursive|fantasy|monspace|serif|sans-serif': ['font-family'],
//                        'font-size: 40px | 300% | em | rem': ['font-size'],
//                        'font-weight: bold | normal | 100~900': ['font-weight'],
//                        'font-style: italic | normal': ['font-style'],

                        '---   line   ---': [''],
                        'line-height: normal | 3em | 34% | inherit |  initial | revert | unset ': ['line-height'],
//                        'overflow: hidden': ['overflow'],

                        '---   layout  ---': [''],
                        'clear: left, right, or both': ['clear'],
                        'float: left | right | none | inherit': ['float'],
                        'overflow: auto|hidden|visible:scroll': ['overflow'],

                        '---   margin  ---': [''],
                        'margin: 25px 50px 75px 100px': ['margin'],
//                        'margin-bottom: inherit': ['margin-bottom'],
//                        'margin-left: inherit': ['margin-left'],
//
//                        'margin-right: auto': ['margin-right'],
//                        'margin-top: 7px': ['margin-top'],
                        '---   opacity  (opposite of transparency) ---': [''],
                        'opacity: 0.6': ['opacity'],
//                        'overflow: hidden': ['overflow'],
//                        'float: left': ['float'],

                        '---  padding  ---': [''],
                        'padding: 70px 20px': ['padding'],
//                        'padding-bottom: 7px': ['padding-bottom'],
//                        'padding-left: 7px': ['padding-left'],
//                        'padding-right: 7px': ['padding-right'],
//                        'padding-top: 7px': ['padding-top'],
                        '---  position  ---': [''],
                        'position: static | relative | absolute | fixed | sticky': ['position'],
                        'top : 20px': ['top'],
                        'bottom : 20px': ['bottom'],
                        'left : 20px': ['left'],
                        'right : 20px': ['right'],
                        'z-index : 1': ['z-index'],

                        '---  text  ---': [''],
                        'text-align: center|left|right|justify': ['text-align'],
//                        'text-decoration: underline|overline|line-through|none': ['text-decoration'],
//                        'text-indent: 50px': ['text-indent'],
//                        'text-shadow: 2px 2px 5px red': ['text-shadow'],
//                        'text-transform: uppercase|lowercase|capitalize': ['text-transform'],
//                        'letter-spacing: 3px': ['letter-spacing'],
//                        'line-height: 1.8': ['line-height'],
//                        'vertical-align: baseline|top|bottom|middle|sub|super': ['vertical-align'],
//                        'word-spacing: 10px': ['word-spacing'],

//                        'white-space: normal | nowrap | pre': ['white-space'],\

                        '---  transition  ---': [''],
                        'transition: width 2s, height 4s;': ['transition'],

                        '---  Width and Height  ---': [''],
                        'width: 30%': ['width'],
                        'height: 300px': ['height'],
//                        'max-width: 500px': ['max-width'],
//                        'min-width: 100px': ['min-width'],
//                        'max-height: 500px': ['max-height'],
//                        'min-height: 100px': ['min-height'],



                    },
                    false
                    );
            break;

        case '%csspropertyValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {

                        '---  Global values  ---': [''],
                        'float: inherit': ['inherit'],
                        'initial ': ['initial'],
                        'display/float: none': ['none'],
                        'unset': ['unset'],

                        'all': ['all'],
//                        'backface-visibility': ['backface-visibility'],
                        'bottom': ['bottom'],
//                        'caption-side': ['caption-side'],
//                        'caret-color': ['caret-color'],
                        '---  border  ---': [''],
                        'border: 2px solid powderblue': ['2px solid powderblue'],
                        '---   box  ---': [''],
                        'box-sizing: border-box': ['border-box'],

                        '---  clear/float  ---': [''],
                        'clear/float: left': ['left'],
                        'clear/float: right': ['right'],
                        'clear: both': ['both'],

                        'overflow: auto': ['auto'],
                        'overflow: hidden': ['hidden'],
                        'overflow: visible': ['visible'],
                        'overflow: scroll': ['scroll'],

                        'background:linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)': ['linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)'],
                        '---  content:   ---': [''],
                        'content: « ': ['«'],
                        'content: » ': ['»'],

                        'display: block': ['block'],
                        'display: inline-block': ['inline-block'],

                        '---  color  ---': [''],
                        'color:red (#FF0000)': ['red'],
                        'color:green (#00FF00)': ['green'],
                        'color:blue (#0000FF)': ['blue'],
                        'color:black (#FFFFFF)': ['black'],
                        'color:white (#000000)': ['white'],
                        'color:currentcolor': ['currentcolor'],
//                        'color:red': ['red'],
//                        'color:red': ['red'],
                        'color:transparent': ['transparent'],
                        '---  font  ---': [''],
                        'font: bold italic 40px/1.33 serif': ['bold italic 40px/1.33 serif'],
//                        '---  text  ---': [''],
//                        'text-decoration: underline': ['underline'],
//                        'text-decoration: none': ['none'],
//                        'text-align: center': ['center'],
//                        'text-align: left': ['left'],
//                        'text-align: right': ['right'],
//                        'text-align: justify': ['justify'],
//                        '---  font family  ---': [''],
//                        'font-family:courier': ['courier'],
//                        '---  font size  ---': [''],
//                        'font-size:300%': ['300%'],
//                        'font-size:10vw': ['10vw'],

//                        '---  padding  ---': [''],
//                        'padding: 30px': ['30px'],
//                        '---   margin  ---': [''],
//                        'margin: 25px 50px 75px 100px': ['25px 50px 75px 100px'],
//                        'margin: auto': ['auto'],
                        '---   margin  ---': [''],
                        'margin: 25px 50px 75px 100px': ['25px 50px 75px 100px'],
                        'margin-bottom: inherit': ['inherit'],
                        'margin-left: inherit': ['margin-left'],

                        'margin-right: auto': ['auto'],
                        'margin-top: 7px': ['7px'],
                        '---  padding  ---': [''],
                        'padding: 70px 20px': [' 70px 20px'],

                        '---  position  ---': [''],
                        'position: static': ['static'],
                        'position: relative': ['relative'],
                        'position: absolute': ['absolute'],
                        'position: fixed': ['fixed'],
                        'position: sticky': ['sticky'],

                        '---   top | bottom | left | right  ---': [''],
                        'top | bottom | left | right: 200px': ['200px'],

                        '---  transition  ---': [''],
                        'transition: width 2s, height 4s': ['width 2s, height 4s'],
                        'transition: 3s background-color ease': ['3s background-color ease'],

                        '---   Width and Height  ---': [''],
                        'width: 30%': ['30%'],
                        'height: 300px;': ['300px'],
                    },
                    false
                    );

            break;

        case '%align':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'align-content': ['align-content'],
                        'align-items': ['align-items'],
                        'align-self': ['align-self'],
                    },
                    false
                    );
            break;

        case '%alignValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'auto': ['auto'],
                        'baseline': ['baseline'],
                        'center': ['center'],
                        'flex-start': ['flex-start'],
                        'flex-end': ['flex-end'],
                        'initial': ['initial'],
                        'inherit': ['inherit'],
                        'stretch': ['stretch'],
                        'space-between': ['space-between'],
                        'space-around': ['space-around'],
                        'space-evenly': ['space-evenly'],

                    },
                    false
                    );
            break;

        case '%animation':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'animation': ['animation'],
                        'animation-delay': ['animation-delay'],
                        'animation-direction': ['animation-direction'],
                        'animation-duration': ['animation-duration'],
                        'animation-fill-mode': ['animation-fill-mode'],
                        'animation-iteration-count': ['animation-iteration-count'],
                        'animation-name': ['animation-name'],
                        'animation-play-state': ['animation-play-state'],
                        'animation-timing-function': ['animation-timing-function'],
                    },
                    false
                    );
            break;

        case '%animationvalue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'initial': ['initial'],
                        'inherit': ['inherit'],
                        '---animation-direction---': [''],
                        'normal': ['normal'],
                        'reverse': ['reverse'],
                        'alternate': ['alternate'],
                        'alternate-reverse': ['alternate-reverse'],
                        '---animation-fill-mode---': [''],
                        'none': ['none'],
                        'forwards': ['forwards'],
                        'backwards': ['backwards'],
                        'both': ['both'],
                        '---animation-play-state---': [''],
                        'paused': ['paused'],
                        'running': ['running'],
                        '---animation-timing-function---': [''],
                        'linear': ['linear'],
                        'ease': ['ease'],
                        'ease-out': ['ease-out'],
                        'ease-in-out': ['ease-in-out'],
                    },
                    false
                    );
            break;

        case '%background':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'background : red url("./1.png") ': ['background'],
                        'background-attachment : scroll | fixed': ['background-attachment'],
                        'background-blend-mode': ['background-blend-mode-direction'],
                        'background-clip : border-box | padding-box | content-box': ['background-clip'],
                        'background-color : red | #bfa ': ['background-color'],
                        'background-image : url("./images/1.png")': ['background-image'],
                        'background-origin : padding-box | border-box | content-box': ['background-origin'],
                        'background-position : 100px 100px (top | bottom | left | right | center)': ['background-position'],
                        'background-repeat : repeat | repeat-x | repeat-y | no-repeat': ['background-repeat'],
                        'background-size : (width height) 100px | 100% | auto | cover | contain': ['background-size'],
                        '--ion-background-color': ['--ion-background-color'],
                    },
                    false
                    );
            break;

        case '%backgroundimg':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'url': ['url'],
                        'linear-gradient': ['linear-gradient'],
                        'radial-gradient': ['radial-gradient'],
                        'repeating-linear-gradient': ['repeating-linear-gradient'],
                        'repeating-radial-gradient': ['repeating-radial-gradient'],
                    },
                    false
                    );
            break;

        case '%gradual':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'linear-gradient': ['linear-gradient'],
                        'radial-gradient': ['radial-gradient'],
                        'conic-gradient': ['conic-gradient'],
                        'repeating-radial-gradient': ['repeating-radial-gradient'],
                        'repeating-linear-gradient': ['repeating-linear-gradient'],
                        'repeating-conic-gradient': ['repeating-conic-gradient'],
                    },
                    false
                    );
            break;

        case '%backgroundvalue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'initial': ['initial'],
                        'inherit': ['inherit'],
                        '--- background ---': [''],
                        'background : linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)': ['linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)'],
                        'background : linear-gradient(45deg, #33ccff 0%, #ff99cc 102%)': ['linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)'],
                        'background : red URL("./1.png")': ['red URL("./1.png")'],
                        '---background-attachment---': [''],
                        'scroll': ['scroll'],
                        'fixed': ['fixed'],
                        'local': ['local'],
                        '---background-blend-mode---': [''],
                        'normal': ['normal'],
                        'multiply': ['multiply'],
                        'overlay': ['overlay'],
                        'darken': ['darken'],
                        'lighten': ['lighten'],
                        'color-dodge': ['color-dodge'],
                        'saturation': ['saturation'],
                        'color': ['color'],
                        'luminosity': ['luminosity'],
                        '---background-color---': [''],
                        'red': ['red'],
                        'blue': ['blue'],
                        'green': ['green'],
                        '---background-image---': [''],
                        'background-image : url("./images/1.png")': ['url("./images/1.png")'],
                        '---background-origin/background-clip---': [''],
                        'padding-box': ['padding-box'],
                        'border-box': ['border-box'],
                        'content-box': ['content-box'],

                        '---background-position---': [''],
                        'left top': ['left top'],
                        'left center': ['left center'],
                        'left bottom': ['left bottom'],
                        'right top': ['right top'],
                        'right center': ['right center'],
                        'right bottom': ['right bottom'],
                        'center top': ['center top'],
                        'center center': ['center center'],
                        'center bottom': ['center bottom'],
                        '---background-repeat---': [''],
                        'repeat': ['repeat'],
                        'repeat-x': ['repeat-x'],
                        'repeat-y': ['repeat-y'],
                        'no-repeat': ['no-repeat'],
                        'space': ['space'],
                        'round': ['round'],
                        '---background-size---': [''],
                        'auto': ['auto'],
                        '100% (percentage)': ['100%'],
                        'cover': ['cover'],
                        'contain': ['contain'],

                    },
                    false
                    );
            break;

        case '%border':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---  border  ---': [''],
                        //                        'border': ['border'],
                        'border : 2px solid powderblue': ['border'],
                        'border-collapse': ['border-collapse'],
                        'border-color : red green blue yellow': ['border-color'],
                        'border-radius : 5px': ['border-radius'],
                        'border-style : dotted solid double dashed': ['border-style'],
                        'border-width : 25px 10px 4px 35px': ['border-width'],
                        '---  border t r b l image  ---': [''],
                        'border-bottom : 1px solid #f1f1f1': ['border-bottom'],
                        'border-bottom-color': ['border-bottom-color'],
                        'border-bottom-left-radius': ['border-bottom-left-radius'],
                        'border-bottom-right-radius': ['border-bottom-right-radius'],
                        'border-bottom-style': ['border-bottom-style'],
                        'border-bottom-width': ['border-bottom-width'],
//                        'border-color': ['border-color'],
                        'border-image': ['border-image'],
                        'border-image-outset': ['border-image-outset'],
                        'border-image-repeat': ['border-image-repeat'],
                        'border-image-slice': ['border-image-slice'],
                        'border-image-source': ['border-image-source'],
                        'border-image-width': ['border-image-width'],
//                        'border-radius': ['border-radius'],
                        'border-left': ['border-left'],
                        'border-left-color': ['border-left-color'],
                        'border-left-style': ['border-left-style'],
                        'border-left-width': ['border-left-width'],
                        'border-right': ['border-right'],
                        'border-right-color': ['border-right-color'],
                        'border-right-style': ['border-right-style'],
                        'border-right-width': ['border-right-width'],
                        'border-spacing': ['border-spacing'],
//                        'border-style': ['border-style'],
                        'border-top': ['border-top'],
                        'border-top-color': ['border-top-color'],
                        'border-top-left-radius': ['border-top-left-radius'],
                        'border-top-right-radius': ['border-top-right-radius'],
                        'border-top-style': ['border-top-style'],
                        'border-top-width': ['border-top-width'],
//                        'border-width': ['border-width'],
                        '---  outline  ---': [''],
                        'outline: 2px solid powderblue': ['outline'],
                        'outline-width: 25px 10px 4px 35px': ['outline-width'],
                        'outline-color: red green blue yellow': ['outline-color'],
                        'outline-style: dotted solid double dashed': ['outline-style'],
                        'outline-offset: 15px': ['outline-offset'],
                    },
                    false
                    );
            break;

        case '%bordervalue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'initial': ['initial'],
                        'inherit': ['inherit'],
                        '---  style  ---': [''],
                        'none - No border': ['none'],
                        'hidden - hidden border': ['hidden'],
                        'dotted - dotted border': ['dotted'],
                        'dashed - dashed border': ['dashed'],
                        'solid - solid border': ['solid'],
                        'double - double border': ['double'],
                        'groove - groove border.': ['groove'],
                        'ridge - ridge border.': ['ridge'],
                        'inset - inset border.': ['inset'],
                        'outset - outset border': ['outset'],
                        '---  width  ---': [''],
                        'medium': ['medium'],
                        'thin': ['thin'],
                        'thick': ['thick'],
                        '10px': ['10px'],
                        '---border-collapse---': [''],
                        'separate': ['separate'],
                        'collapse': ['collapse'],
                        '---border-image-repeat---': [''],
                        'stretch': ['stretch'],
                        'repeat': ['repeat'],
                        'round': ['round'],
                        'space': ['space'],
                        '---border-image-slice---': [''],
                        'fill': ['fill'],

                    },
                    false
                    );
            break;

        case '%box':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'box-decoration-break': ['box-decoration-break'],
                        'box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2) /* offset-x | offset-y | blur-radius | spread-radius | color */ ': ['box-shadow'],
                        'box-shadow: inset 5em 1em gold; /* inset | offset-x | offset-y | color */ ': ['box-shadow'],
                        'box-sizing : content-box |  border-box | inherit | unset ': ['box-sizing'],
                    },
                    false
                    );
            break;

        case '%boxValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        '---  Global  ---': [''],
                        'box-decoration-break/box-sizing : inherit': ['inherit'],
                        'box-decoration-break : inherit': ['initial'],
                        'box-decoration-break/box-sizing : unset ': ['unset'],
                        '---- box-decoration-break ----': [''],
                        'box-decoration-break: slice': ['slice'],
                        'box-decoration-break: clone': ['clone'],
                        '----  box-shadow ----': [''],
                        'box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2) /* offset-x | offset-y | blur-radius | spread-radius | color */ ': ['2px 2px 2px 1px rgba(0, 0, 0, 0.2)'],
                        'box-shadow: inset 5em 1em gold; /* inset | offset-x | offset-y | color */ ': ['inset 5em 1em gold'],

                        '----  box-sizing ----': [''],
                        'box-sizing : content-box': ['content-box'],
                        'box-sizing : border-box': ['border-box'],

                    },
                    false
                    );
            break;

        case '%break':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'break-after': ['break-after'],
                        'break-before': ['break-before'],
                        'break-inside': ['break-inside'],
                    },
                    false
                    );
            break;

        case '%breakValue':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'auto': ['auto'],
                        'all': ['all'],
                        'always': ['always'],
                        'avoid': ['avoid'],
                        'avoid-column': ['avoid-column'],
                        'avoid-page': ['avoid-page'],
                        'avoid-region': ['avoid-region'],
                        'column': ['column'],
                        'left': ['left'],
                        'page': ['page'],
                        'recto': ['recto'],
                        'region': ['region'],
                        'right': ['right'],
                        'verso': ['verso'],
                    },
                    false
                    );
            break;

        case '%cssposition':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'static': ['static'],
                        'relative': ['relative'],
                        'absolute': ['absolute'],
                        'fixed': ['fixed'],
                        'sticky': ['sticky'],
                    },
                    false
                    );
            break;

        case '%cssTransform':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'transform:rotate (degree)': ['rotate (3deg)'],
                        'transform:scale (number, number)': ['scale (number, number)'],
                        'transform:scaleX (number)': ['scaleX (number)'],
                        'transform:scaleY (number)': ['scaleY (number)'],
                        'transform:skewX (number)': ['skewX (number)'],
                        'transform:skewY (number)': ['skewY (number)'],
                        'transform:translate (number, number)': ['translate (number, number)'],
                        'transform:translateX (number)': ['translateX (number)'],
                        'transform:translateY (number)': ['translateY (number)'],
                    },
                    false
                    );
            break;

        case '%direction':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'top': ['top'],
                        'left': ['left'],
                        'bottom': ['bottom'],
                        'right': ['right'],
                    },
                    false
                    );
            break;

        case '%codeListKind':
            part = new InputSlotMorph(
                    null,
                    false,
                    {
                        'dot': ['dot'],
                        'collection': ['collection'],
                        'variables': ['variables'],
                        'parameters': ['parameters'],
                    },
                    true
                    );
            break;

        default:
            part = this.originalLabelPart(spec);
    }
    return part;
}

// eric 03/14/2022 expblank implementation
// when click run block, this function is called
MultiArgMorph.prototype.mappedCode = function (definitions) {
    var block = this.parentThatIsA(BlockMorph),
            key = '',
            code,
            items = '',
            itemCode,
            delim,
            count = 0,
            parts = [];

    if (block) {
        if (block instanceof RingMorph) {
            key = 'parms_';
        } else if (block.selector === 'doDeclareVariables') {
            key = 'tempvars_';
        }
        // 2021/08/16 eric check Inputs
        block.cachedInputs.forEach(function (inputData) {
            if (inputData.type === 'blank') {
                key = 'tempvars_';
            }
        });

    }

    code = StageMorph.prototype.codeMappings[key + 'list'] || '<#1>';
    itemCode = StageMorph.prototype.codeMappings[key + 'item'] || '<#1>';
    delim = StageMorph.prototype.codeMappings[key + 'delim'] || ' ';

    this.inputs().forEach(input =>
        parts.push(itemCode.replace(/<#1>/g, input.mappedCode(definitions)))
    );
    parts.forEach(part => {
        if (count) {
            items += delim;
        }
        items += part;
        count += 1;
    });
    code = code.replace(/<#1>/g, items);
    return code;
};

// 2021/08/16 eric
InputSlotMorph.prototype.mappedCode = function () {
    var block = this.parentThatIsA(BlockMorph),
            val = this.evaluate(),
            code;

    if (this.isNumeric) {
        code = StageMorph.prototype.codeMappings.number || '<#1>';
        return code.replace(/<#1>/g, val);
    }
    if (!isNaN(parseFloat(val))) {
        return val;
    }
    if (!isString(val)) {
        return val;
    }
    if (block && contains(
            ['doSetVar', 'doChangeVar', 'doShowVar', 'doHideVar'],
            block.selector
            )) {
        return val;
    }
    // 2021/08/16 eric check type
    if (this.type === "s_Blank") {
        return val;
    }
    if (this.type === "s_Dot") {
        return val;
    }
    code = StageMorph.prototype.codeMappings.string || '<#1>';
    return code.replace(/<#1>/g, val);
};

// 20220208 
BlockMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
            world = this.world(),
            myself = this,
            hasLine = false,
            shiftClicked = world.currentKey === 16,
            proc = this.activeProcess(),
            top = this.topBlock(),
            vNames = proc && proc.context && proc.context.outerContext ?
            proc.context.outerContext.variables.names() : [],
            alternatives,
            field,
            rcvr;

    function addOption(label, toggle, test, onHint, offHint) {
        menu.addItem(
                [
                    test ? new SymbolMorph(
                            'checkedBox',
                            MorphicPreferences.menuFontSize * 0.75
                            ) : new SymbolMorph(
                            'rectangle',
                            MorphicPreferences.menuFontSize * 0.75
                            ),
                    localize(label)
                ],
                toggle,
                test ? onHint : offHint
                );
    }

    function renameVar() {
        blck = myself.fullCopy();
        blck.addShadow();
        new DialogBoxMorph(
                myself,
                myself.userSetSpec,
                myself
                ).prompt(
                "Variable name",
                myself.blockSpec,
                world,
                blck.doWithAlpha(1, () => blck.fullImage()), // pic
                InputSlotMorph.prototype.getVarNamesDict.call(myself)
                );
    }

    menu.addItem(
            "help...",
            'showHelp'
            );
    if (this.isTemplate) {
        if (this.parent instanceof SyntaxElementMorph) { // in-line
            if (this.selector === 'reportGetVar') { // script var definition
                menu.addLine();
                menu.addItem(
                        'rename...',
                        () => this.refactorThisVar(true), // just the template
                        'rename only\nthis reporter'
                        );
                menu.addItem(
                        'rename all...',
                        'refactorThisVar',
                        'rename all blocks that\naccess this variable'
                        );
            }
        } else { // in palette
            if (this.selector === 'reportGetVar') {
                rcvr = this.scriptTarget();
                if (this.isInheritedVariable(false)) { // fully inherited
                    addOption(
                            'inherited',
                            () => rcvr.toggleInheritedVariable(this.blockSpec),
                            true,
                            'uncheck to\ndisinherit',
                            null
                            );
                } else { // not inherited
                    if (this.isInheritedVariable(true)) { // shadowed
                        addOption(
                                'inherited',
                                () => rcvr.toggleInheritedVariable(
                                    this.blockSpec
                                    ),
                                false,
                                null,
                                localize('check to inherit\nfrom')
                                + ' ' + rcvr.exemplar.name
                                );
                    }
                    addOption(
                            'transient',
                            'toggleTransientVariable',
                            this.isTransientVariable(),
                            'uncheck to save contents\nin the project',
                            'check to prevent contents\nfrom being saved'
                            );
                    menu.addLine();
                    menu.addItem(
                            'rename...',
                            () => this.refactorThisVar(true), // just the template
                            'rename only\nthis reporter'
                            );
                    menu.addItem(
                            'rename all...',
                            'refactorThisVar',
                            'rename all blocks that\naccess this variable'
                            );
                }
            } else if (this.selector !== 'evaluateCustomBlock') {
                //menu.addItem(
                //        "hide",
                //        'hidePrimitive'
                //        );
            }

            // allow toggling inheritable attributes
            if (StageMorph.prototype.enableInheritance) {
                rcvr = this.scriptTarget();
                field = {
                    xPosition: 'x position',
                    yPosition: 'y position',
                    direction: 'direction',
                    getScale: 'size',
                    getCostumeIdx: 'costume #',
                    getVolume: 'volume',
                    getPan: 'balance',
                    reportShown: 'shown?',
                    getPenDown: 'pen down?'
                }[this.selector];
                if (field && rcvr && rcvr.exemplar) {
                    menu.addLine();
                    addOption(
                            'inherited',
                            () => rcvr.toggleInheritanceForAttribute(field),
                            rcvr.inheritsAttribute(field),
                            'uncheck to\ndisinherit',
                            localize('check to inherit\nfrom')
                            + ' ' + rcvr.exemplar.name
                            );
                }
            }

            if (StageMorph.prototype.enableCodeMapping) {
                menu.addLine();
                menu.addItem(
                        'update code...',
                        'updateCode'
                        );
                menu.addLine();
                menu.addItem(
                        'header mapping...',
                        'mapToHeader'
                        );
                menu.addItem(
                        'code mapping...',
                        'mapToCode'
                        );
            }
        }
        return menu;
    }
    menu.addLine();
    if (this.selector === 'reportGetVar') {
        menu.addItem(
                'rename...',
                renameVar,
                'rename only\nthis reporter'
                );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
                'relabel...',
                () => this.relabel(
                    SpriteMorph.prototype.blockAlternatives[this.selector]
                    )
        );
    } else if (this.isCustomBlock && this.alternatives) {
        alternatives = this.alternatives();
        if (alternatives.length > 0) {
            menu.addItem(
                    'relabel...',
                    () => this.relabel(alternatives)
            );
        }
    }

    // direct relabelling:
    // - JIT-compile HOFs - experimental
    // - vector pen trails
    if (
            contains(
                    ['reportMap', 'reportKeep', 'reportFindFirst', 'reportCombine'],
                    this.selector
                    )
            ) {
        alternatives = {
            reportMap: 'reportAtomicMap',
            reportKeep: 'reportAtomicKeep',
            reportFindFirst: 'reportAtomicFindFirst',
            reportCombine: 'reportAtomicCombine'
        };
        menu.addItem(
                'compile',
                () => this.setSelector(alternatives[this.selector]),
                'experimental!\nmake this reporter fast and uninterruptable\n' +
                'CAUTION: Errors in the ring\ncan break your Snap! session!'
                );
    } else if (
            contains(
                    [
                        'reportAtomicMap',
                        'reportAtomicKeep',
                        'reportAtomicFindFirst',
                        'reportAtomicCombine'
                    ],
                    this.selector
                    )
            ) {
        alternatives = {
            reportAtomicMap: 'reportMap',
            reportAtomicKeep: 'reportKeep',
            reportAtomicFindFirst: 'reportFindFirst',
            reportAtomicCombine: 'reportCombine'
        };
        menu.addItem(
                'uncompile',
                () => this.setSelector(alternatives[this.selector])
        );
    } else if (
            contains(
                    ['reportPenTrailsAsCostume', 'reportPentrailsAsSVG'],
                    this.selector
                    )
            ) {
        alternatives = {
            reportPenTrailsAsCostume: 'reportPentrailsAsSVG',
            reportPentrailsAsSVG: 'reportPenTrailsAsCostume'
        };
        menu.addItem(
                localize(
                        SpriteMorph.prototype.blocks[
                                alternatives[this.selector]
                        ].spec
                        ),
                () => {
            this.setSelector(alternatives[this.selector]);
            this.changed();
        }
        );
    }

    menu.addItem(
            "duplicate",
            () => {
        var dup = this.fullCopy(),
                ide = this.parentThatIsA(IDE_Morph),
                blockEditor = this.parentThatIsA(BlockEditorMorph);
        dup.pickUp(world);
        // register the drop-origin, so the block can
        // slide back to its former situation if dropped
        // somewhere where it gets rejected
        if (!ide && blockEditor) {
            ide = blockEditor.target.parentThatIsA(IDE_Morph);
        }
        if (ide) {
            world.hand.grabOrigin = {
                origin: ide.palette,
                position: ide.palette.center()
            };
        }
    },
            'make a copy\nand pick it up'
            );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
                (proc ? this.fullCopy() : this).thumbnail(0.5, 60),
                () => {
            var cpy = this.fullCopy(),
                    nb = cpy.nextBlock(),
                    ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
            if (nb) {
                nb.destroy();
            }
            cpy.pickUp(world);
            if (!ide && blockEditor) {
                ide = blockEditor.target.parentThatIsA(IDE_Morph);
            }
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        },
                'only duplicate this block'
                );
        menu.addItem(
                'extract',
                'userExtractJustThis',
                'only grab this block'
                );
    }
    menu.addItem(
            "delete",
            'userDestroy'
            );
    if (isNil(this.comment)) {
        menu.addItem(
                "add comment",
                () => {
            var comment = new CommentMorph();
            this.comment = comment;
            comment.block = this;
            comment.layoutChanged();

            // Simulate drag/drop for better undo/redo behavior
            var scripts = this.parentThatIsA(ScriptsMorph),
                    ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
            if (!ide && blockEditor) {
                ide = blockEditor.target.parentThatIsA(IDE_Morph);
            }
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
            scripts.clearDropInfo();
            scripts.lastDropTarget = {element: this};
            scripts.lastDroppedBlock = comment;
            scripts.recordDrop(world.hand.grabOrigin);
        }
        );
    }
    menu.addItem(
            "script pic...",
            () => {
        var ide = this.parentThatIsA(IDE_Morph) ||
                this.parentThatIsA(BlockEditorMorph).target.parentThatIsA(
                IDE_Morph
                );
        ide.saveCanvasAs(
                top.scriptPic(),
                (ide.projectName || localize('untitled')) + ' ' +
                localize('script pic')
                );
    },
            'save a picture\nof this script'
            );
    if (top instanceof ReporterBlockMorph ||
            (!(top instanceof PrototypeHatBlockMorph) &&
                    top.allChildren().some((any) => any.selector === 'doReport'))
            ) {
        menu.addItem(
                "result pic...",
                () => top.exportResultPic(),
                'save a picture of both\nthis script and its result'
                );
    }
    if (shiftClicked) {
        menu.addItem(
                'download script',
                () => {
            var ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
            if (!ide && blockEditor) {
                ide = blockEditor.target.parentThatIsA(IDE_Morph);
            }
            if (ide) {
                ide.saveXMLAs(
                        ide.serializer.serialize(top),
                        top.selector + ' script',
                        false);
            }
        },
                'download this script\nas an XML file',
                new Color(100, 0, 0)
                );
    }
    if (proc) {
        if (vNames.length) {
            menu.addLine();
            vNames.forEach(vn =>
                menu.addItem(
                        vn + '...',
                        () => proc.doShowVar(vn)
                )
            );
        }
        proc.homeContext.variables.names().forEach(vn => {
            if (!contains(vNames, vn)) {
                menu.addItem(
                        vn + '...',
                        () => proc.doShowVar(vn)
                );
            }
        });
        return menu;
    }
    if (this.parent.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", 'unringify');
        if (this instanceof ReporterBlockMorph ||
                (!(top instanceof HatBlockMorph))) {
            menu.addItem("ringify", 'ringify');
        }
        return menu;
    }
    if (contains(
            ['doBroadcast', 'doSend', 'doBroadcastAndWait', 'receiveMessage',
                'receiveOnClone', 'receiveGo'],
            this.selector
            )) {
        hasLine = true;
        menu.addLine();
        menu.addItem(
                (this.selector.indexOf('receive') === 0 ?
                        "senders..." : "receivers..."),
                'showMessageUsers'
                );
    }
    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                    && (top instanceof HatBlockMorph))) {
        return menu;
    }
    if (!hasLine) {
        menu.addLine();
    }
    menu.addItem("ringify", 'ringify');
    if (StageMorph.prototype.enableCodeMapping) {
        menu.addLine();
        menu.addItem(
                'update code...',
                'updateCode'
                );
        menu.addLine();
        menu.addItem(
                'header mapping...',
                'mapToHeader'
                );
        menu.addItem(
                'code mapping...',
                'mapToCode'
                );
    }
    return menu;
};

BlockMorph.prototype.updateCode = function () {
    // open a dialog box letting the user map code via the GUI
    var key = this.selector.substr(0, 5) === 'reify' ?
            'reify' : this.selector,
            block = this.codeMappingHeader(),
            pic;
    block.addShadow(new Point(3, 3));
    pic = block.doWithAlpha(1, () => block.fullImage());
    xmlcode = IDE_Morph.prototype.getUpdateMap();

    new DialogBoxMorph(
            this,
            code => {
                if (key === 'evaluateCustomBlock') {
                    this.definition.codeMapping = code;
                } else {
                    StageMorph.prototype.codeMappings[key] = code;
                }
            },
            this
            ).promptCodeUpdate(
            'Code mapping',
            key === 'evaluateCustomBlock' ? this.definition.codeMapping || ''
            : StageMorph.prototype.codeMappings[key] || '',
            key === 'evaluateCustomBlock' ? this.definition.codeMapping || ''
            : xmlcode[key] || '',
            this.world(),
            pic,
            'Enter code that corresponds to the block\'s operation ' +
            '(usually a single\nfunction invocation). Use <#n> to ' +
            'reference actual arguments as shown.'
            );
};

//修正rename 無效的問題
BlockMorph.prototype.refactorThisVar = function (justTheTemplate) {
    // Rename all occurrences of the variable this block is holding,
    // taking care of its lexical scope

    var receiver = this.scriptTarget(),
            oldName = this.instantiationSpec || this.blockSpec,
            cpy = this.fullCopy();

    cpy.addShadow();

    new DialogBoxMorph(this, renameVarTo, this).prompt(
            'Variable name',
            oldName,
            this.world(),
            cpy.doWithAlpha(1, () => cpy.fullImage()), // pic
            InputSlotMorph.prototype.getVarNamesDict.call(this)
            );

    function renameVarTo(newName) {
        var block;

        if (this.parent instanceof SyntaxElementMorph) {

            if (this.parent instanceof BlockInputFragmentMorph) {
                this.doRefactorBlockParameter(
                        oldName,
                        newName,
                        justTheTemplate
                        );
            } else if (this.parent instanceof TemplateSlotMorph) {
                block = this.parent.parentThatIsA(BlockMorph);
                if (block instanceof RingMorph) {
                    this.doRefactorRingParameter(
                            oldName,
                            newName,
                            justTheTemplate
                            );
                    // 原來的 只有 doDeclareVariables 可以改名，多加在 else 其他的可以改名
                } else if (block.selector === 'doDeclareVariables') {
                    this.doRefactorScriptVar(oldName, newName, justTheTemplate);
                } else {
                    this.doRefactorScriptVar(oldName, newName, justTheTemplate);
                }
            }

        } else if (receiver.hasSpriteVariable(oldName)) {
            this.doRefactorSpriteVar(oldName, newName, justTheTemplate);
        } else {
            this.doRefactorGlobalVar(oldName, newName, justTheTemplate);
        }
    }
};

//轉code
BlockMorph.prototype.mappedCode = function (definitions) {
    var key = this.selector.substr(0, 5) === 'reify' ?
            'reify' : this.selector,
            code,
            codeLines,
            count = 1,
            header,
            headers,
            headerLines,
            body,
            bodyLines,
            defKey = this.isCustomBlock ? this.definition.spec : key,
            defs = definitions || {},
            parts = [];
    code = key === 'reportGetVar' ? this.blockSpec
            : this.isCustomBlock ? this.definition.codeMapping || ''
            : StageMorph.prototype.codeMappings[key] || '';

    // map header
    if (key !== 'reportGetVar' && !defs.hasOwnProperty(defKey)) {
        defs[defKey] = null; // create the property for recursive definitions
        if (this.isCustomBlock) {
            header = this.definition.codeHeader || '';
            if (header.indexOf('<body') !== -1) { // replace with def mapping
                body = '';
                if (this.definition.body) {
                    body = this.definition.body.expression.mappedCode(defs);
                }
                bodyLines = body.split('\n');
                headerLines = header.split('\n');
                headerLines.forEach((headerLine, idx) => {
                    var prefix = '',
                            indent;
                    if (headerLine.trimLeft().indexOf('<body') === 0) {
                        indent = headerLine.indexOf('<body');
                        prefix = headerLine.slice(0, indent);
                    }
                    headerLines[idx] = headerLine.replace(
                            new RegExp('<body>'),
                            bodyLines.join('\n' + prefix)
                            );
                    headerLines[idx] = headerLines[idx].replace(
                            new RegExp('<body>', 'g'),
                            bodyLines.join('\n')
                            );
                });
                header = headerLines.join('\n');
            }
            defs[defKey] = header;
        } else {
            defs[defKey] = StageMorph.prototype.codeHeaders[defKey];
        }
    }

    codeLines = code.split('\n');
    this.inputs().forEach(input =>
        parts.push(input.mappedCode(defs).toString())
    );
    parts.forEach(part => {
        var partLines = part.split('\n'),
                placeHolder = '<#' + count + '>',
                rx = new RegExp(placeHolder, 'g');
        codeLines.forEach((codeLine, idx) => {
            var prefix = '',
                    indent;
            if (codeLine.trimLeft().indexOf(placeHolder) === 0) {
                indent = codeLine.indexOf(placeHolder);
                prefix = codeLine.slice(0, indent);
            }
            codeLines[idx] = codeLine.replace(
                    new RegExp(placeHolder),
                    partLines.join('\n' + prefix)
                    );
            //處理參數的內容是<#n>時會重複取代的問題
            if (!(codeLines[idx].indexOf(placeHolder) !== -1 && part.indexOf(placeHolder) !== -1)) {
                codeLines[idx] = codeLines[idx].replace(rx, partLines.join('\n'));
            }
        });
        count += 1;
    });
    code = codeLines.join('\n');
    if (this.nextBlock && this.nextBlock()) { // Command
        code += ('\n' + this.nextBlock().mappedCode(defs));
    }
    if (!definitions) { // top-level, add headers
        headers = [];
        Object.keys(defs).forEach(each => {
            if (defs[each]) {
                headers.push(defs[each]);
            }
        });
        if (headers.length) {
            return headers.join('\n\n')
                    + '\n\n'
                    + code;
        }
    }
    return code;
};

CSlotMorph.prototype.mappedCode = function (definitions) {
    var code = StageMorph.prototype.codeMappings.reify || '<#1>',
            codeLines = code.split('\n'),
            nested = this.nestedBlock(),
            part = nested ? nested.mappedCode(definitions) : '',
            partLines = (part.toString()).split('\n'),
            rx = new RegExp('<#1>', 'g');

    codeLines.forEach((codeLine, idx) => {
        var prefix = '',
                indent;
        if (codeLine.trimLeft().indexOf('<#1>') === 0) {
            indent = codeLine.indexOf('<#1>');
            prefix = codeLine.slice(0, indent);
        }
        codeLines[idx] = codeLine.replace(
                new RegExp('<#1>'),
                partLines.join('\n' + prefix)
                );
//        console.log(codeLines[idx].indexOf('<#1>'));
//        console.log(partLines.indexOf('<#1>'));
        //處理參數的內容是<#1>時會重複取代的問題
        if (!(codeLines[idx].indexOf('<#1>') !== -1 && part.indexOf('<#1>') !== -1)) {
            codeLines[idx] = codeLines[idx].replace(rx, partLines.join('\n'));
        }
    });

    return codeLines.join('\n');
};

CommandBlockMorph.prototype.snap = function (hand) {
    var target = this.closestAttachTarget(),
            scripts = this.parentThatIsA(ScriptsMorph),
            before,
            next,
            offsetY,
            cslot,
            affected;

    scripts.clearDropInfo();
    scripts.lastDroppedBlock = this;
    if (target === null) {
        this.fixBlockColor();
        CommandBlockMorph.uber.snap.call(this); // align stuck comments
        if (hand) {
            scripts.recordDrop(hand.grabOrigin);
            CommandBlockMorph.prototype.runblock(scripts);
        }
        return;
    }

    scripts.lastDropTarget = target;

    if (target.loc === 'bottom') {
        if (target.type === 'slot') {
            this.removeHighlight();
            scripts.lastNextBlock = target.element.nestedBlock();
            target.element.nestedBlock(this);
        } else {
            scripts.lastNextBlock = target.element.nextBlock();
            target.element.nextBlock(this);
        }
        if (this.isStop()) {
            next = this.nextBlock();
            if (next) {
                scripts.add(next);
                next.moveBy(this.extent().floorDivideBy(2));
                affected = this.parentThatIsA(
                        CommandSlotMorph,
                        ReporterSlotMorph
                        );
                if (affected) {
                    affected.fixLayout();
                }
            }
        }
    } else if (target.loc === 'top') {
        target.element.removeHighlight();
        offsetY = this.bottomBlock().bottom() - this.bottom();
        this.setBottom(target.element.top() + this.corner - offsetY);
        this.setLeft(target.element.left());
        this.bottomBlock().nextBlock(target.element);
    } else if (target.loc === 'wrap') {
        cslot = detect(// this should be a method making use of caching
                this.inputs(), // these are already cached, so maybe it's okay
                each => each instanceof CSlotMorph
        );
        // assume the cslot is (still) empty, was checked determining the target
        before = (target.element.parent);
        scripts.lastWrapParent = before;

        // adjust position of wrapping block
        this.moveBy(target.point.subtract(cslot.slotAttachPoint()));

        // wrap c-slot around target
        cslot.nestedBlock(target.element);
        if (before instanceof CommandBlockMorph) {
            before.nextBlock(this);
        } else if (before instanceof CommandSlotMorph) {
            before.nestedBlock(this);
        } else if (before instanceof RingReporterSlotMorph) {
            before.add(this);
            before.fixLayout();
        }

        // fix zebra coloring.
        // this could probably be generalized into the fixBlockColor mechanism
        target.element.blockSequence().forEach(cmd =>
            cmd.fixBlockColor()
        );
    }
    this.fixBlockColor();
    CommandBlockMorph.uber.snap.call(this); // align stuck comments
    if (hand) {
        scripts.recordDrop(hand.grabOrigin);
        CommandBlockMorph.prototype.runblock(scripts);
    }
    if (this.snapSound) {
        this.snapSound.play();
    }
};

ReporterBlockMorph.prototype.snap = function (hand) {
    // passing the hand is optional (for when blocks are dragged & dropped)
    var scripts = this.parent,
            nb,
            target;

    this.cachedSlotSpec = null;
    if (!(scripts instanceof ScriptsMorph)) {
        CommandBlockMorph.prototype.runblock(scripts);
        return null;
    }

    scripts.clearDropInfo();
    scripts.lastDroppedBlock = this;

    target = scripts.closestInput(this, hand);
    if (target !== null) {
        scripts.lastReplacedInput = target;
        scripts.lastDropTarget = target.parent;
        if (target instanceof MultiArgMorph) {
            scripts.lastPreservedBlocks = target.inputs();
            scripts.lastReplacedInput = target.fullCopy();
        } else if (target instanceof CommandSlotMorph) {
            scripts.lastReplacedInput = target;
            nb = target.nestedBlock();
            if (nb) {
                nb = nb.fullCopy();
                scripts.add(nb);
                nb.moveBy(nb.extent());
                nb.fixBlockColor();
                scripts.lastPreservedBlocks = [nb];
            }
        }
        target.parent.replaceInput(target, this);
        if (this.snapSound) {
            this.snapSound.play();
        }
    }
    this.fixBlockColor();
    ReporterBlockMorph.uber.snap.call(this);
    if (hand) {
        scripts.recordDrop(hand.grabOrigin);
        CommandBlockMorph.prototype.runblock(scripts);
    }
};
var testscripts = null;

CommandBlockMorph.prototype.runblock = function (scripts) {
    if (scripts == "test") {
        scripts = testscripts;
    }
    if (scripts != null) {
        for (var index = 0; index < scripts.children.length; index++) {
            //開始同步執行run
            var commandBlockMorph = scripts.children[index];
            console.log("開始同步執行run")
            if (commandBlockMorph.blockSpec == "run %cmdRing") {
                var top = commandBlockMorph.topBlock(),
                        receiver = top.scriptTarget(),
                        stage;

                if (top instanceof PrototypeHatBlockMorph) {
                    return; // top.mouseClickLeft();
                }
                if (receiver) {
                    stage = receiver.parentThatIsA(StageMorph);
                    if (stage) {
                        stage.threads.toggleProcess(top, receiver);
                    }
                }
            }
        }
        testscripts = scripts
    }
}

InputSlotMorph.prototype.setContents = function (data) {
    // data can be a String, Float, or "wish" Block
    var cnts = this.contents(),
            dta = data,
            scripts = this.parentThatIsA(ScriptsMorph),
            isConstant = dta instanceof Array;

    if (this.selectedBlock) {
        this.selectedBlock = null;
    }
    if (this.symbol) {
        this.symbol.destroy();
        this.symbol = null;
    }

    if (isConstant) {
        if (dta[0] === '__shout__go__') {
            this.symbol = this.labelPart('%greenflag');
            this.add(this.symbol);
            dta = '';
        } else {
            dta = localize(dta[0]);
            cnts.isItalic = !this.isReadOnly;
        }
    } else if (dta instanceof BlockMorph) {
        this.selectedBlock = dta;
        dta = ''; // make sure the contents text emptied
    } else { // assume dta is a localizable choice if it's a key in my choices
        cnts.isItalic = false;
        if (!isNil(this.choices) && this.choices[dta] instanceof Array) {
            return this.setContents(this.choices[dta]);
        }
    }
    cnts.text = dta;
    if (isNil(dta)) {
        cnts.text = '';
    } else if (dta.toString) {
        cnts.text = dta.toString();
    }
    if (this.isReadOnly && !MorphicPreferences.isFlat) {
        cnts.shadowOffset = new Point(1, 1); // correct initial dimensions
    }
    cnts.fixLayout();

    // remember the constant, if any
    this.constant = isConstant ? data : null;

    // adjust to zebra coloring:
    if (this.isReadOnly && (this.parent instanceof BlockMorph)) {
        this.parent.fixLabelColor();
    }

    // run onSetContents if any
    if (this.onSetContents) {
        this[this.onSetContents](data);
    }
    CommandBlockMorph.prototype.runblock(scripts);
};

InputSlotMorph.prototype.reactToEdit = function () {
    var block = this.parentThatIsA(BlockMorph),
            scripts = this.parentThatIsA(ScriptsMorph),
            ide = this.parentThatIsA(IDE_Morph);
    this.contents().clearSelection();
    if (ide && !block.isTemplate) {
        ide.recordUnsavedChanges();
        CommandBlockMorph.prototype.runblock(scripts);
    }
};

BlockMorph.prototype.userSetSpec = function (spec) {
    var scripts = this.parentThatIsA(ScriptsMorph),
            tb = this.topBlock();
    tb.fullChanged();
    this.setSpec(spec);
    tb.fullChanged();
    setTimeout(() => {
        CommandBlockMorph.prototype.runblock(scripts);
    }, 100)
};

BlockMorph.prototype.destroy = function (justThis) {
    // private - use IDE_Morph.removeBlock() to first stop all my processes
    var scripts = this.parentThatIsA(ScriptsMorph);
    if (justThis) {
        if (!isNil(this.comment)) {
            this.comment.destroy();
        }
    } else {
        this.allComments().forEach(comment =>
            comment.destroy()
        );
    }
    BlockMorph.uber.destroy.call(this);
    CommandBlockMorph.prototype.runblock(scripts);
};

ScriptsMorph.prototype.undrop = function () {
    var scripts = this.parentThatIsA(ScriptsMorph);
    if (this.isAnimating) {
        return;
    }
    if (!this.dropRecord || !this.dropRecord.lastRecord) {
        return;
    }
    if (!this.dropRecord.situation) {
        this.dropRecord.situation =
                this.dropRecord.lastDroppedBlock.situation();
    }
    this.isAnimating = true;
    this.dropRecord.lastDroppedBlock.slideBackTo(
            this.dropRecord.lastOrigin,
            null,
            this.recoverLastDrop(),
            () => {
        this.updateToolbar();
        this.isAnimating = false;
    }
    );
    this.dropRecord = this.dropRecord.lastRecord;
    setTimeout(() => {
        CommandBlockMorph.prototype.runblock(scripts);
    }, 500)
};

ScriptsMorph.prototype.redrop = function () {
    var scripts = this.parentThatIsA(ScriptsMorph);
    if (this.isAnimating) {
        return;
    }
    if (!this.dropRecord || !this.dropRecord.nextRecord) {
        return;
    }
    this.dropRecord = this.dropRecord.nextRecord;
    if (this.dropRecord.action === 'delete') {
        this.recoverLastDrop(true);
        this.dropRecord.lastDroppedBlock.destroy();
        this.updateToolbar();
    } else {
        this.isAnimating = true;
        if (this.dropRecord.action === 'extract') {
            this.dropRecord.lastDroppedBlock.extract();
        }
        this.dropRecord.lastDroppedBlock.slideBackTo(
                this.dropRecord.situation,
                null,
                this.recoverLastDrop(true),
                () => {
            this.updateToolbar();
            this.isAnimating = false;
        }
        );
    }
    setTimeout(() => {
        CommandBlockMorph.prototype.runblock(scripts);
    }, 500)
};