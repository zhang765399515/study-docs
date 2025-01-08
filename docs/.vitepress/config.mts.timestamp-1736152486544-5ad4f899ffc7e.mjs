// docs/.vitepress/config.mts
import { defineConfigWithTheme } from "file:///D:/personal/study-docs/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/meta.ts
var github = "https://github.com/chodocs/chodocs";
var githubSourceContentRegex = new RegExp("^https://(((raw|user-images|camo).githubusercontent.com))/.*", "i");
var googleFontRegex = new RegExp("^https://fonts.googleapis.com/.*", "i");
var googleStaticFontRegex = new RegExp("^https://fonts.gstatic.com/.*", "i");
var jsdelivrCDNRegex = new RegExp("^https://cdn.jsdelivr.net/.*", "i");

// docs/.vitepress/sidebar/webFrame/vue/config.ts
var config_default = [
  {
    text: "\u57FA\u7840\u7528\u6CD5",
    collapsed: false,
    items: [
      {
        text: "new Image() \u9884\u52A0\u8F7D \u4E3A\u4EC0\u4E48\u6BD4 <img>\u76F4\u63A5\u52A0\u8F7D\u8981\u597D\uFF1F",
        link: "/markdown/webFrame/vue/img_load"
      },
      {
        text: "\u6574\u7406\u591A\u7EC4\u4EF6\u9891\u7E41\u5BFC\u5165\u516C\u7528\u7EC4\u4EF6",
        link: "/markdown/webFrame/vue/rollup_plugin_inject"
      },
      {
        text: "Vue\u7684ref\u3001shallowRef\u3001reactive\u7684\u4F7F\u7528",
        link: "/markdown/webFrame/vue/ref_shallowRef_reactive"
      },
      {
        text: "\u901A\u7528\u56FE\u7247\u5F15\u5165",
        link: "/markdown/webFrame/vue/introduce_pictures"
      },
      {
        text: "vue2\u72EC\u6709\u56FE\u7247\u5F15\u5165",
        link: "/markdown/webFrame/vue/introduce_pictures_vue2"
      },
      {
        text: "vue3\u72EC\u6709\u56FE\u7247\u5F15\u5165",
        link: "/markdown/webFrame/vue/introduce_pictures_vue3"
      }
    ]
  }
];

// docs/.vitepress/sidebar/webFrame/TS/config.ts
var config_default2 = [
  {
    text: "\u57FA\u7840\u7528\u6CD5",
    collapsed: false,
    items: [
      {
        text: "TypeScript\u7684\u57FA\u7840\u4F7F\u7528",
        link: "/markdown/webFrame/ts/base"
      },
      {
        text: "\u51FD\u6570\u91CD\u8F7D",
        link: "/markdown/webFrame/ts/overload"
      }
    ]
  }
];

// docs/.vitepress/sidebar/webFrame/JS/config.ts
var config_default3 = [
  {
    text: "\u57FA\u7840\u7528\u6CD5",
    collapsed: false,
    items: [
      {
        text: "\u9AD8\u7EA7\u524D\u7AEF\u5F00\u53D1\u9700\u8981\u77E5\u9053\u7684 25 \u4E2A JavaScript \u5355\u884C\u4EE3\u7801",
        link: "/markdown/webFrame/JS/advancedUsage"
      }
    ]
  },
  {
    text: "\u8BBE\u8BA1\u6A21\u5F0F",
    collapsed: false,
    items: [
      {
        text: "\u5355\u4F8B\u6A21\u5F0F",
        link: "/markdown/webFrame/JS/designPatterns/singletonPattern"
      },
      {
        text: "\u5DE5\u5382\u6A21\u5F0F",
        link: "/markdown/webFrame/JS/designPatterns/factoryPattern"
      },
      {
        text: "\u72B6\u6001\u6A21\u5F0F",
        link: "/markdown/webFrame/JS/designPatterns/statePattern"
      },
      {
        text: "\u9002\u914D\u5668\u6A21\u5F0F",
        link: "/markdown/webFrame/JS/designPatterns/adapterPattern"
      },
      {
        text: "\u9002\u914D\u5668\u6A21\u5F0F\u548C\u5DE5\u5382\u6A21\u5F0F\u7684\u5DEE\u5F02",
        link: "/markdown/webFrame/JS/designPatterns/AdaptersAndFactories"
      }
    ]
  }
];

// docs/.vitepress/sidebar/webFrame/CSS/config.ts
var config_default4 = [
  {
    text: "\u5E38\u7528css",
    collapsed: false,
    items: [
      {
        text: "\u6807\u7B7E\u5305\u542B\u503C",
        link: "/markdown/webFrame/CSS/commonly/index"
      },
      {
        text: "\u56FE\u7247\u6587\u5B57\u540C\u65F6\u5C45\u4E2D",
        link: "/markdown/webFrame/CSS/imgAndFontCenter/index"
      }
    ]
  },
  {
    text: "\u8FDB\u9636",
    collapsed: false,
    items: [
      {
        text: "JPG \u548C png \u7684\u533A\u522B",
        link: "/markdown/webFrame/CSS/JPGandPNG"
      }
    ]
  }
];

// docs/.vitepress/sidebar/actualCombat/index.ts
var actualCombat_default = [
  {
    text: "\u{1F4BB} \u5B9E\u6218\u64CD\u4F5C",
    collapsed: false,
    items: [
      {
        text: "drag \u62D6\u62FD",
        link: "/markdown/programming/actualCombat/drag"
      }
    ]
  },
  {
    text: "\u8FDB\u9636",
    collapsed: false,
    items: [
      {
        text: "\u4F7F\u7528jsDelivr\u6258\u7BA1GitHub\u56FE\u7247",
        link: "/markdown/programming/actualCombat/advance/jsDelivr"
      }
    ]
  }
];

// docs/.vitepress/sidebar/study/index.ts
var study_default = [
  {
    text: "\u4E2A\u4EBA\u7F16\u7A0B\u8BB0\u5F55",
    collapsed: false,
    items: [
      {
        text: "Call\u7406\u89E3",
        link: "/markdown/programming/study/call-learn"
      },
      {
        text: "npm \u53D1\u5E03\u5305",
        link: "/markdown/programming/study/npm"
      },
      {
        text: "nginx \u7684\u4F5C\u7528",
        link: "/markdown/programming/study/nginx"
      }
    ]
  }
];

// docs/.vitepress/sidebar/summary/2024/index.ts
var __default = [
  {
    text: "\u6708\u5EA6\u603B\u7ED3",
    collapsed: false,
    items: [
      {
        text: "\u4E8C\u6708(February)",
        link: "/markdown/summary/2024/February"
      },
      {
        text: "\u516D\u6708(June)",
        link: "/markdown/summary/2024/June"
      },
      {
        text: "\u5341\u6708(Octorber)",
        link: "/markdown/summary/2024/Octorber"
      },
      {
        text: "\u5341\u4E00\u6708(November)",
        link: "/markdown/summary/2024/November"
      }
    ]
  }
];

// docs/.vitepress/sidebar/interview/index.ts
var interview_default = [
  {
    text: "\u7B97\u6CD5\u7CFB\u5217",
    collapsed: false,
    items: [
      {
        text: "\u6570\u5B57\u7C7B\u578B\u5EA6\u9650\u5236",
        link: "/markdown/interview/algorithm/numberLength"
      }
    ]
  }
];

// docs/.vitepress/sidebar/Git/index.ts
var Git_default = [
  {
    text: "GitHub",
    collapsed: false,
    items: [
      {
        text: "\u5173\u4E8E\u4F7F\u7528git\u4EE3\u7406\u540E\u65E0\u6CD5\u63D0\u4EA4\u4EE3\u7801\u5230GitHub",
        link: "/markdown/Git/GitHub"
      }
    ]
  }
];

// docs/.vitepress/sidebar/index.ts
var sidebar_default = {
  "/markdown/": [],
  "/markdown/interview/": interview_default,
  "/markdown/Git/": Git_default,
  "/markdown/summary/2024/": __default,
  //总结
  "/markdown/programming/actualCombat/": actualCombat_default,
  "/markdown/programming/study/": study_default,
  "/markdown/webFrame/vue/": config_default,
  "/markdown/webFrame/TS/": config_default2,
  "/markdown/webFrame/JS/": config_default3,
  "/markdown/webFrame/CSS/": config_default4
};

// docs/.vitepress/config.mts
import escookConfig from "file:///D:/personal/study-docs/node_modules/@escook/vitepress-theme/dist/config.js";
var config_default5 = defineConfigWithTheme({
  extends: escookConfig,
  title: "Junlin Docs",
  lang: "zh-CN",
  description: "Front-end learning document collection",
  lastUpdated: true,
  locales: {
    root: { label: "\u7B80\u4F53\u4E2D\u6587", lang: "zh-CN" }
  },
  appearance: "dark",
  themeConfig: {
    confetti: false,
    outlineTitle: "\u5BFC\u822A\u680F",
    outline: [2, 3],
    // 表示显示 h2 和 h3 作为导航
    i18nRouting: true,
    lightModeSwitchTitle: "\u5207\u6362\u6697\u4E3B\u9898",
    darkModeSwitchTitle: "\u5207\u6362\u4EAE\u4E3B\u9898",
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "\u641C\u7D22\u6587\u6863",
                buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
              },
              modal: {
                noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                footer: {
                  selectText: "\u9009\u62E9",
                  navigateText: "\u5207\u6362"
                }
              }
            }
          }
        }
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "\u4E3B\u9875", link: "/" },
      {
        text: "\u{1F525} \u4E13\u680F",
        items: [
          { text: "\u9762\u8BD5\u4E13\u680F", link: "/markdown/interview/" },
          { text: "Git", link: "/markdown/Git/" }
        ]
      },
      {
        text: "\u{1F525} \u524D\u7AEF\u6846\u67B6",
        items: [
          { text: "Vue", link: "/markdown/webFrame/vue/" },
          { text: "TypeScript", link: "/markdown/webFrame/TS/" },
          { text: "JS", link: "/markdown/webFrame/JS/" },
          { text: "CSS", link: "/markdown/webFrame/CSS/" }
        ]
      },
      {
        text: "\u603B\u7ED3",
        items: [
          { text: "2024\u603B\u7ED3", link: "/markdown/summary/2024/" }
        ]
      },
      {
        text: "\u7F16\u7A0B",
        items: [
          { text: "\u5B9E\u6218", link: "/markdown/programming/actualCombat/" },
          { text: "\u5B66\u4E60", link: "/markdown/programming/study/" }
        ]
      }
    ],
    sidebar: sidebar_default,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" }
    ],
    editLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
    },
    lastUpdatedText: "\u6700\u540E\u4E00\u6B21\u66F4\u65B0\u4E8E",
    footer: {
      message: `\u8BB0\u5F55\u4E2A\u4EBA\u53D1\u5C55`
    }
  }
});
export {
  config_default5 as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL21ldGEudHMiLCAiZG9jcy8udml0ZXByZXNzL3NpZGViYXIvd2ViRnJhbWUvdnVlL2NvbmZpZy50cyIsICJkb2NzLy52aXRlcHJlc3Mvc2lkZWJhci93ZWJGcmFtZS9UUy9jb25maWcudHMiLCAiZG9jcy8udml0ZXByZXNzL3NpZGViYXIvd2ViRnJhbWUvSlMvY29uZmlnLnRzIiwgImRvY3MvLnZpdGVwcmVzcy9zaWRlYmFyL3dlYkZyYW1lL0NTUy9jb25maWcudHMiLCAiZG9jcy8udml0ZXByZXNzL3NpZGViYXIvYWN0dWFsQ29tYmF0L2luZGV4LnRzIiwgImRvY3MvLnZpdGVwcmVzcy9zaWRlYmFyL3N0dWR5L2luZGV4LnRzIiwgImRvY3MvLnZpdGVwcmVzcy9zaWRlYmFyL3N1bW1hcnkvMjAyNC9pbmRleC50cyIsICJkb2NzLy52aXRlcHJlc3Mvc2lkZWJhci9pbnRlcnZpZXcvaW5kZXgudHMiLCAiZG9jcy8udml0ZXByZXNzL3NpZGViYXIvR2l0L2luZGV4LnRzIiwgImRvY3MvLnZpdGVwcmVzcy9zaWRlYmFyL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbmFsL3N0dWR5LWRvY3MvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWdXaXRoVGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgeyAgZ2l0aHViLCBuYW1lLCBzaXRlIH0gZnJvbSAnLi9tZXRhJ1xuaW1wb3J0IHNpZGViYXIgZnJvbSAnLi9zaWRlYmFyL2luZGV4J1xuaW1wb3J0IGVzY29va0NvbmZpZyBmcm9tICdAZXNjb29rL3ZpdGVwcmVzcy10aGVtZS9jb25maWcnXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWdXaXRoVGhlbWUoe1xuICBleHRlbmRzOiBlc2Nvb2tDb25maWcsXG4gIHRpdGxlOiBcIkp1bmxpbiBEb2NzXCIsXG4gIGxhbmc6IFwiemgtQ05cIixcbiAgZGVzY3JpcHRpb246IFwiRnJvbnQtZW5kIGxlYXJuaW5nIGRvY3VtZW50IGNvbGxlY3Rpb25cIixcbiAgbGFzdFVwZGF0ZWQ6IHRydWUsXG4gIGxvY2FsZXM6IHtcbiAgICByb290OiB7IGxhYmVsOiBcIlx1N0I4MFx1NEY1M1x1NEUyRFx1NjU4N1wiLCBsYW5nOiBcInpoLUNOXCIgfSxcbiAgfSxcbiAgYXBwZWFyYW5jZTpcImRhcmtcIixcbiAgdGhlbWVDb25maWc6IHtcbiAgICBjb25mZXR0aTogZmFsc2UsXG4gICAgb3V0bGluZVRpdGxlOiAnXHU1QkZDXHU4MjJBXHU2ODBGJyxcbiAgICBvdXRsaW5lOiBbMiwgM10sICAvLyBcdTg4NjhcdTc5M0FcdTY2M0VcdTc5M0EgaDIgXHU1NDhDIGgzIFx1NEY1Q1x1NEUzQVx1NUJGQ1x1ODIyQVxuICAgIGkxOG5Sb3V0aW5nOiB0cnVlLFxuICAgIGxpZ2h0TW9kZVN3aXRjaFRpdGxlOlwiXHU1MjA3XHU2MzYyXHU2Njk3XHU0RTNCXHU5ODk4XCIsXG4gICAgZGFya01vZGVTd2l0Y2hUaXRsZTpcIlx1NTIwN1x1NjM2Mlx1NEVBRVx1NEUzQlx1OTg5OFwiLFxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICdsb2NhbCcsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgICB6aDoge1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zOiB7XG4gICAgICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIGJ1dHRvblRleHQ6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkFyaWFMYWJlbDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MydcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbW9kYWw6IHtcbiAgICAgICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiAnXHU2NUUwXHU2Q0Q1XHU2MjdFXHU1MjMwXHU3NkY4XHU1MTczXHU3RUQzXHU2NzlDJyxcbiAgICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcbiAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdFRleHQ6ICdcdTkwMDlcdTYyRTknLFxuICAgICAgICAgICAgICAgICAgbmF2aWdhdGVUZXh0OiAnXHU1MjA3XHU2MzYyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lLWNvbmZpZ1xuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiBcIlx1NEUzQlx1OTg3NVwiLCBsaW5rOiBcIi9cIiB9LFxuICAgICAgeyB0ZXh0OiBcIlx1RDgzRFx1REQyNSBcdTRFMTNcdTY4MEZcIixcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdcdTk3NjJcdThCRDVcdTRFMTNcdTY4MEYnLCBsaW5rOiAnL21hcmtkb3duL2ludGVydmlldy8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnR2l0JywgbGluazogJy9tYXJrZG93bi9HaXQvJyB9LFxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyB0ZXh0OiBcIlx1RDgzRFx1REQyNSBcdTUyNERcdTdBRUZcdTY4NDZcdTY3QjZcIixcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdWdWUnLCBsaW5rOiAnL21hcmtkb3duL3dlYkZyYW1lL3Z1ZS8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVHlwZVNjcmlwdCcsIGxpbms6ICcvbWFya2Rvd24vd2ViRnJhbWUvVFMvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0pTJywgbGluazogJy9tYXJrZG93bi93ZWJGcmFtZS9KUy8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ1NTJywgbGluazogJy9tYXJrZG93bi93ZWJGcmFtZS9DU1MvJyB9LFxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyB0ZXh0OiBcIlx1NjAzQlx1N0VEM1wiLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJzIwMjRcdTYwM0JcdTdFRDMnLCBsaW5rOiAnL21hcmtkb3duL3N1bW1hcnkvMjAyNC8nIH0sXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7IHRleHQ6IFwiXHU3RjE2XHU3QTBCXCIsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1QjlFXHU2MjE4JywgbGluazogJy9tYXJrZG93bi9wcm9ncmFtbWluZy9hY3R1YWxDb21iYXQvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1NUI2Nlx1NEU2MCcsIGxpbms6ICcvbWFya2Rvd24vcHJvZ3JhbW1pbmcvc3R1ZHkvJyB9LFxuICAgICAgICBdXG4gICAgICB9LFxuICAgIF0sXG4gICAgc2lkZWJhcixcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92aXRlcHJlc3MnIH1cbiAgICBdLFxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtnaXRodWJ9L3RyZWUvbWFpbi9kb2NzLzpwYXRoYCxcbiAgICAgIHRleHQ6ICdcdTU3MjggR2l0SHViIFx1NEUwQVx1N0YxNlx1OEY5MVx1NkI2NFx1OTg3NScsXG4gICAgfSxcbiAgICBsYXN0VXBkYXRlZFRleHQ6ICdcdTY3MDBcdTU0MEVcdTRFMDBcdTZCMjFcdTY2RjRcdTY1QjBcdTRFOEUnLFxuICAgIGZvb3Rlcjoge1xuICAgICAgbWVzc2FnZTogYFx1OEJCMFx1NUY1NVx1NEUyQVx1NEVCQVx1NTNEMVx1NUM1NWAsXG4gICAgfSxcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXG1ldGEudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbmFsL3N0dWR5LWRvY3MvZG9jcy8udml0ZXByZXNzL21ldGEudHNcIjtcclxuLy8gYmFzZSBpbmZvXHJcbmV4cG9ydCBjb25zdCBuYW1lID0gJ0p1bmxpbidcclxuZXhwb3J0IGNvbnN0IHNpdGUgPSAnaHR0cHM6Ly9jaG9kb2NzLmNuLydcclxuZXhwb3J0IGNvbnN0IGxvZ28gPSAnaHR0cHM6Ly9jaG9kb2NzLmNuL2Nob2RvY3MtbG9nby5zdmcnXHJcblxyXG4vLyBzb2NpYWwgbGlua1xyXG5leHBvcnQgY29uc3QgYmlsaWJpbGkgPSAnaHR0cHM6Ly9zcGFjZS5iaWxpYmlsaS5jb20vMzUxNTM0MTcwJ1xyXG5leHBvcnQgY29uc3QgZ2l0aHViID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9jaG9kb2NzL2Nob2RvY3MnXHJcblxyXG4vLyBkb2NzIHZlcnNpb25cclxuXHJcbi8qIFBXQSBydW50aW1lIGNhY2hpbmcgdXJsUGF0dGVybiByZWd1bGFyIGV4cHJlc3Npb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1yZWdleC1saXRlcmFscyAqL1xyXG5leHBvcnQgY29uc3QgZ2l0aHViU291cmNlQ29udGVudFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXmh0dHBzOi8vKCgocmF3fHVzZXItaW1hZ2VzfGNhbW8pLmdpdGh1YnVzZXJjb250ZW50LmNvbSkpLy4qJywgJ2knKVxyXG5leHBvcnQgY29uc3QgZ29vZ2xlRm9udFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXmh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vLionLCAnaScpXHJcbmV4cG9ydCBjb25zdCBnb29nbGVTdGF0aWNGb250UmVnZXggPSBuZXcgUmVnRXhwKCdeaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS8uKicsICdpJylcclxuZXhwb3J0IGNvbnN0IGpzZGVsaXZyQ0ROUmVnZXggPSBuZXcgUmVnRXhwKCdeaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0Ly4qJywgJ2knKVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXJcXFxcd2ViRnJhbWVcXFxcdnVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwZXJzb25hbFxcXFxzdHVkeS1kb2NzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxzaWRlYmFyXFxcXHdlYkZyYW1lXFxcXHZ1ZVxcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbmFsL3N0dWR5LWRvY3MvZG9jcy8udml0ZXByZXNzL3NpZGViYXIvd2ViRnJhbWUvdnVlL2NvbmZpZy50c1wiO2V4cG9ydCBkZWZhdWx0IFtcclxuICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NTdGQVx1Nzg0MFx1NzUyOFx1NkNENVwiLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJuZXcgSW1hZ2UoKSBcdTk4ODRcdTUyQTBcdThGN0QgXHU0RTNBXHU0RUMwXHU0RTQ4XHU2QkQ0IDxpbWc+XHU3NkY0XHU2M0E1XHU1MkEwXHU4RjdEXHU4OTgxXHU1OTdEXHVGRjFGXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9tYXJrZG93bi93ZWJGcmFtZS92dWUvaW1nX2xvYWRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTY1NzRcdTc0MDZcdTU5MUFcdTdFQzRcdTRFRjZcdTk4OTFcdTdFNDFcdTVCRkNcdTUxNjVcdTUxNkNcdTc1MjhcdTdFQzRcdTRFRjZcIixcclxuICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL3dlYkZyYW1lL3Z1ZS9yb2xsdXBfcGx1Z2luX2luamVjdFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlZ1ZVx1NzY4NHJlZlx1MzAwMXNoYWxsb3dSZWZcdTMwMDFyZWFjdGl2ZVx1NzY4NFx1NEY3Rlx1NzUyOFwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvdnVlL3JlZl9zaGFsbG93UmVmX3JlYWN0aXZlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU5MDFBXHU3NTI4XHU1NkZFXHU3MjQ3XHU1RjE1XHU1MTY1XCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9tYXJrZG93bi93ZWJGcmFtZS92dWUvaW50cm9kdWNlX3BpY3R1cmVzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwidnVlMlx1NzJFQ1x1NjcwOVx1NTZGRVx1NzI0N1x1NUYxNVx1NTE2NVwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvdnVlL2ludHJvZHVjZV9waWN0dXJlc192dWUyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwidnVlM1x1NzJFQ1x1NjcwOVx1NTZGRVx1NzI0N1x1NUYxNVx1NTE2NVwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvdnVlL2ludHJvZHVjZV9waWN0dXJlc192dWUzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbl07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclxcXFx3ZWJGcmFtZVxcXFxUU1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclxcXFx3ZWJGcmFtZVxcXFxUU1xcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbmFsL3N0dWR5LWRvY3MvZG9jcy8udml0ZXByZXNzL3NpZGViYXIvd2ViRnJhbWUvVFMvY29uZmlnLnRzXCI7ZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU1N0ZBXHU3ODQwXHU3NTI4XHU2Q0Q1XCIsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlR5cGVTY3JpcHRcdTc2ODRcdTU3RkFcdTc4NDBcdTRGN0ZcdTc1MjhcIixcclxuICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL3dlYkZyYW1lL3RzL2Jhc2VcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTUxRkRcdTY1NzBcdTkxQ0RcdThGN0RcIixcclxuICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL3dlYkZyYW1lL3RzL292ZXJsb2FkXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbl07IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwZXJzb25hbFxcXFxzdHVkeS1kb2NzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxzaWRlYmFyXFxcXHdlYkZyYW1lXFxcXEpTXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwZXJzb25hbFxcXFxzdHVkeS1kb2NzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxzaWRlYmFyXFxcXHdlYkZyYW1lXFxcXEpTXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcGVyc29uYWwvc3R1ZHktZG9jcy9kb2NzLy52aXRlcHJlc3Mvc2lkZWJhci93ZWJGcmFtZS9KUy9jb25maWcudHNcIjtleHBvcnQgZGVmYXVsdCBbXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTU3RkFcdTc4NDBcdTc1MjhcdTZDRDVcIixcclxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU5QUQ4XHU3RUE3XHU1MjREXHU3QUVGXHU1RjAwXHU1M0QxXHU5NzAwXHU4OTgxXHU3N0U1XHU5MDUzXHU3Njg0IDI1IFx1NEUyQSBKYXZhU2NyaXB0IFx1NTM1NVx1ODg0Q1x1NEVFM1x1NzgwMVwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvSlMvYWR2YW5jZWRVc2FnZVwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcclxuICAgIH0se1xyXG4gICAgICAgIHRleHQ6IFwiXHU4QkJFXHU4QkExXHU2QTIxXHU1RjBGXCIsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NTM1NVx1NEY4Qlx1NkEyMVx1NUYwRlwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvSlMvZGVzaWduUGF0dGVybnMvc2luZ2xldG9uUGF0dGVyblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NURFNVx1NTM4Mlx1NkEyMVx1NUYwRlwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvSlMvZGVzaWduUGF0dGVybnMvZmFjdG9yeVBhdHRlcm5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTcyQjZcdTYwMDFcdTZBMjFcdTVGMEZcIixcclxuICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL3dlYkZyYW1lL0pTL2Rlc2lnblBhdHRlcm5zL3N0YXRlUGF0dGVyblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1OTAwMlx1OTE0RFx1NTY2OFx1NkEyMVx1NUYwRlwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvSlMvZGVzaWduUGF0dGVybnMvYWRhcHRlclBhdHRlcm5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTkwMDJcdTkxNERcdTU2NjhcdTZBMjFcdTVGMEZcdTU0OENcdTVERTVcdTUzODJcdTZBMjFcdTVGMEZcdTc2ODRcdTVERUVcdTVGMDJcIixcclxuICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL3dlYkZyYW1lL0pTL2Rlc2lnblBhdHRlcm5zL0FkYXB0ZXJzQW5kRmFjdG9yaWVzXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgfVxyXG5dOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclxcXFx3ZWJGcmFtZVxcXFxDU1NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXJcXFxcd2ViRnJhbWVcXFxcQ1NTXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcGVyc29uYWwvc3R1ZHktZG9jcy9kb2NzLy52aXRlcHJlc3Mvc2lkZWJhci93ZWJGcmFtZS9DU1MvY29uZmlnLnRzXCI7ZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU1RTM4XHU3NTI4Y3NzXCIsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjgwN1x1N0I3RVx1NTMwNVx1NTQyQlx1NTAzQ1wiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvQ1NTL2NvbW1vbmx5L2luZGV4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU1NkZFXHU3MjQ3XHU2NTg3XHU1QjU3XHU1NDBDXHU2NUY2XHU1QzQ1XHU0RTJEXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9tYXJrZG93bi93ZWJGcmFtZS9DU1MvaW1nQW5kRm9udENlbnRlci9pbmRleFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU4RkRCXHU5NjM2XCIsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkpQRyBcdTU0OEMgcG5nIFx1NzY4NFx1NTMzQVx1NTIyQlwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vd2ViRnJhbWUvQ1NTL0pQR2FuZFBOR1wiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbl07IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwZXJzb25hbFxcXFxzdHVkeS1kb2NzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxzaWRlYmFyXFxcXGFjdHVhbENvbWJhdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclxcXFxhY3R1YWxDb21iYXRcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbmFsL3N0dWR5LWRvY3MvZG9jcy8udml0ZXByZXNzL3NpZGViYXIvYWN0dWFsQ29tYmF0L2luZGV4LnRzXCI7ZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHVEODNEXHVEQ0JCIFx1NUI5RVx1NjIxOFx1NjRDRFx1NEY1Q1wiLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJkcmFnIFx1NjJENlx1NjJGRFwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vcHJvZ3JhbW1pbmcvYWN0dWFsQ29tYmF0L2RyYWdcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1OEZEQlx1OTYzNlwiLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdTRGN0ZcdTc1Mjhqc0RlbGl2clx1NjI1OFx1N0JBMUdpdEh1Ylx1NTZGRVx1NzI0N1wiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vcHJvZ3JhbW1pbmcvYWN0dWFsQ29tYmF0L2FkdmFuY2UvanNEZWxpdnJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuXTsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXJcXFxcc3R1ZHlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXJcXFxcc3R1ZHlcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbmFsL3N0dWR5LWRvY3MvZG9jcy8udml0ZXByZXNzL3NpZGViYXIvc3R1ZHkvaW5kZXgudHNcIjtleHBvcnQgZGVmYXVsdCBbXHJcbiAgICBcclxuICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NEUyQVx1NEVCQVx1N0YxNlx1N0EwQlx1OEJCMFx1NUY1NVwiLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJDYWxsXHU3NDA2XHU4OUUzXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9tYXJrZG93bi9wcm9ncmFtbWluZy9zdHVkeS9jYWxsLWxlYXJuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwibnBtIFx1NTNEMVx1NUUwM1x1NTMwNVwiLFxyXG4gICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vcHJvZ3JhbW1pbmcvc3R1ZHkvbnBtXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwibmdpbnggXHU3Njg0XHU0RjVDXHU3NTI4XCIsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9tYXJrZG93bi9wcm9ncmFtbWluZy9zdHVkeS9uZ2lueFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG5dO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXJcXFxcc3VtbWFyeVxcXFwyMDI0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwZXJzb25hbFxcXFxzdHVkeS1kb2NzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxzaWRlYmFyXFxcXHN1bW1hcnlcXFxcMjAyNFxcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcGVyc29uYWwvc3R1ZHktZG9jcy9kb2NzLy52aXRlcHJlc3Mvc2lkZWJhci9zdW1tYXJ5LzIwMjQvaW5kZXgudHNcIjtleHBvcnQgZGVmYXVsdCBbXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTY3MDhcdTVFQTZcdTYwM0JcdTdFRDNcIixcclxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NEU4Q1x1NjcwOChGZWJydWFyeSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vc3VtbWFyeS8yMDI0L0ZlYnJ1YXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU1MTZEXHU2NzA4KEp1bmUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL3N1bW1hcnkvMjAyNC9KdW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU1MzQxXHU2NzA4KE9jdG9yYmVyKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9tYXJrZG93bi9zdW1tYXJ5LzIwMjQvT2N0b3JiZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTUzNDFcdTRFMDBcdTY3MDgoTm92ZW1iZXIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL3N1bW1hcnkvMjAyNC9Ob3ZlbWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuXTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwZXJzb25hbFxcXFxzdHVkeS1kb2NzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxzaWRlYmFyXFxcXGludGVydmlld1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclxcXFxpbnRlcnZpZXdcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbmFsL3N0dWR5LWRvY3MvZG9jcy8udml0ZXByZXNzL3NpZGViYXIvaW50ZXJ2aWV3L2luZGV4LnRzXCI7ZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU3Qjk3XHU2Q0Q1XHU3Q0ZCXHU1MjE3XCIsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTY1NzBcdTVCNTdcdTdDN0JcdTU3OEJcdTVFQTZcdTk2NTBcdTUyMzZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvbWFya2Rvd24vaW50ZXJ2aWV3L2FsZ29yaXRobS9udW1iZXJMZW5ndGhcIixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbl07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclxcXFxHaXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHBlcnNvbmFsXFxcXHN0dWR5LWRvY3NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXJcXFxcR2l0XFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wZXJzb25hbC9zdHVkeS1kb2NzL2RvY3MvLnZpdGVwcmVzcy9zaWRlYmFyL0dpdC9pbmRleC50c1wiO2V4cG9ydCBkZWZhdWx0IFtcclxuICAgIHtcclxuICAgICAgICB0ZXh0OiBcIkdpdEh1YlwiLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU1MTczXHU0RThFXHU0RjdGXHU3NTI4Z2l0XHU0RUUzXHU3NDA2XHU1NDBFXHU2NUUwXHU2Q0Q1XHU2M0QwXHU0RUE0XHU0RUUzXHU3ODAxXHU1MjMwR2l0SHViXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL21hcmtkb3duL0dpdC9HaXRIdWJcIixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbl07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccGVyc29uYWxcXFxcc3R1ZHktZG9jc1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2lkZWJhclxcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcGVyc29uYWwvc3R1ZHktZG9jcy9kb2NzLy52aXRlcHJlc3Mvc2lkZWJhci9pbmRleC50c1wiO2ltcG9ydCB2dWVDb25maWcgZnJvbSBcIi4vd2ViRnJhbWUvdnVlL2NvbmZpZ1wiO1xyXG5pbXBvcnQgVFMgZnJvbSBcIi4vd2ViRnJhbWUvVFMvY29uZmlnXCI7XHJcbmltcG9ydCBKUyBmcm9tIFwiLi93ZWJGcmFtZS9KUy9jb25maWdcIjtcclxuaW1wb3J0IENTUyBmcm9tIFwiLi93ZWJGcmFtZS9DU1MvY29uZmlnXCI7XHJcbmltcG9ydCBhY3R1YWxDb21iYXQgZnJvbSBcIi4vYWN0dWFsQ29tYmF0L2luZGV4XCI7XHJcbmltcG9ydCBzdHVkeSBmcm9tIFwiLi9zdHVkeS9pbmRleFwiO1xyXG5pbXBvcnQgc3VtbWFyeTIwMjQgZnJvbSBcIi4vc3VtbWFyeS8yMDI0L2luZGV4XCI7XHJcbmltcG9ydCBpbnRlcnZpZXcgZnJvbSBcIi4vaW50ZXJ2aWV3L2luZGV4XCI7Ly9cdTk3NjJcdThCRDVcdTk4OThcclxuaW1wb3J0IEdpdCBmcm9tIFwiLi9HaXQvaW5kZXhcIjsvL0dpdFxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBcIi9tYXJrZG93bi9cIjogW10sXHJcbiAgICBcIi9tYXJrZG93bi9pbnRlcnZpZXcvXCI6IGludGVydmlldyxcclxuICAgIFwiL21hcmtkb3duL0dpdC9cIjogR2l0LFxyXG4gICAgXCIvbWFya2Rvd24vc3VtbWFyeS8yMDI0L1wiOiBzdW1tYXJ5MjAyNCwgLy9cdTYwM0JcdTdFRDNcclxuICAgIFwiL21hcmtkb3duL3Byb2dyYW1taW5nL2FjdHVhbENvbWJhdC9cIjogYWN0dWFsQ29tYmF0LFxyXG4gICAgXCIvbWFya2Rvd24vcHJvZ3JhbW1pbmcvc3R1ZHkvXCI6IHN0dWR5LFxyXG4gICAgXCIvbWFya2Rvd24vd2ViRnJhbWUvdnVlL1wiOiB2dWVDb25maWcsXHJcbiAgICBcIi9tYXJrZG93bi93ZWJGcmFtZS9UUy9cIjogVFMsXHJcbiAgICBcIi9tYXJrZG93bi93ZWJGcmFtZS9KUy9cIjogSlMsXHJcbiAgICBcIi9tYXJrZG93bi93ZWJGcmFtZS9DU1MvXCI6IENTUyxcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLDZCQUE2Qjs7O0FDUXJVLElBQU0sU0FBUztBQU1mLElBQU0sMkJBQTJCLElBQUksT0FBTyxnRUFBZ0UsR0FBRztBQUMvRyxJQUFNLGtCQUFrQixJQUFJLE9BQU8sb0NBQW9DLEdBQUc7QUFDMUUsSUFBTSx3QkFBd0IsSUFBSSxPQUFPLGlDQUFpQyxHQUFHO0FBQzdFLElBQU0sbUJBQW1CLElBQUksT0FBTyxnQ0FBZ0MsR0FBRzs7O0FDakIyUixJQUFPLGlCQUFRO0FBQUEsRUFDcFg7QUFBQSxJQUNJLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxNQUNIO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxR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QUF5QjtBQUFBLFVBQzdDLEVBQUUsTUFBTSxPQUFPLE1BQU0sMEJBQTBCO0FBQUEsUUFDakQ7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQUUsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBRSxNQUFNLG9CQUFVLE1BQU0sMEJBQTBCO0FBQUEsUUFDcEQ7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQUUsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBRSxNQUFNLGdCQUFNLE1BQU0sc0NBQXNDO0FBQUEsVUFDMUQsRUFBRSxNQUFNLGdCQUFNLE1BQU0sK0JBQStCO0FBQUEsUUFDckQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLGFBQWE7QUFBQSxNQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0scUNBQXFDO0FBQUEsSUFDL0Q7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFNBQVMsR0FBRyxNQUFNO0FBQUEsTUFDbEIsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLGlCQUFpQjtBQUFBLElBQ2pCLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImNvbmZpZ19kZWZhdWx0IiwgImNvbmZpZ19kZWZhdWx0IiwgImNvbmZpZ19kZWZhdWx0IiwgImNvbmZpZ19kZWZhdWx0IiwgImNvbmZpZ19kZWZhdWx0Il0KfQo=
