export default [
    {
        text: "基础用法",
        collapsed: false,
        items: [
            {
                text: "Vue complier 的实现原理是什么样的?",
                link: "/markdown/webFrame/vue/base/Complier",
            },
            {
                text: "Transition在vue2和vue3的差异",
                link: "/markdown/webFrame/vue/base/TransitionDeferece",
            },
            {
                text: "new Image() 预加载 为什么比 <img>直接加载要好？",
                link: "/markdown/webFrame/vue/base/img_load",
            },
            {
                text: "整理多组件频繁导入公用组件",
                link: "/markdown/webFrame/vue/base/rollup_plugin_inject",
            },
            {
                text: "Vue的ref、shallowRef、reactive的使用",
                link: "/markdown/webFrame/vue/base/ref_shallowRef_reactive",
            },
            {
                text: "图片引入",
                collapsed: false,
                items: [
                    {
                        text: "通用图片引入",
                        link: "/markdown/webFrame/vue/base/introduce_pictures",
                    },
                    {
                        text: "vue2独有图片引入",
                        link: "/markdown/webFrame/vue/base/introduce_pictures_vue2",
                    },
                    {
                        text: "vue3独有图片引入",
                        link: "/markdown/webFrame/vue/base/introduce_pictures_vue3",
                    },
                ]
            },
            
        ],
    },
    {
        text: "VUE 2",
        collapsed: false,
        items: [
            {
                text: "Mixin 的使用",
                link: "/markdown/webFrame/vue/vue2/Mixin",
            },
            {
                text: "webpack 配置",
                items: [
                    {
                        text: "Loader 和 Plugin 的作用和区别",
                        link: "/markdown/webFrame/vue/webpack/LoaderPlugin",
                    }
                ],
            },
        ],
    },
    {
        text: "VUE 3",
        collapsed: false,
        items: [
            
            {
                text: "Teleport 的使用",
                link: "/markdown/webFrame/vue/vue3/Teleport",
            },
            {
                text: "Suspense 的使用",
                link: "/markdown/webFrame/vue/vue3/Suspense",
            },
            {
                text: "Composition API",
                link: "/markdown/webFrame/vue/vue3/Composition",
            },
            {
                text: "provide 和 inject",
                link: "/markdown/webFrame/vue/vue3/Provide_Inject",
            },
            
        ],
    },
];
