import { defineConfigWithTheme } from 'vitepress'
import {  github, name, site } from './meta'
import sidebar from './sidebar/index'
import escookConfig from '@escook/vitepress-theme/config'
// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  extends: escookConfig,
  title: "Junlin Docs",
  lang: "zh-CN",
  description: "Front-end learning document collection",
  lastUpdated: true,
  locales: {
    root: { label: "简体中文", lang: "zh-CN" },
  },
  appearance:"dark",
  themeConfig: {
    confetti: false,
    outlineTitle: '导航栏',
    i18nRouting: true,
    lightModeSwitchTitle:"切换暗主题",
    darkModeSwitchTitle:"切换亮主题",
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "🔥 专栏",
        items: [
          { text: '面试专栏', link: '/markdown/interview/' },
        ]
      },
      { text: "🔥 前端框架",
        items: [
          { text: 'Vue', link: '/markdown/vue/' },
          { text: 'TypeScript', link: '/markdown/TS/' },
          { text: 'JS', link: '/markdown/JS/' },
        ]
      },
      { text: "总结",
        items: [
          { text: '2024总结', link: '/markdown/summary/2024/' },
        ]
      },
      { text: "编程",
        items: [
          { text: '实战', link: '/markdown/programming/actualCombat/' },
          { text: '学习', link: '/markdown/programming/study/' },
        ]
      },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    editLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: '在 GitHub 上编辑此页',
    },
    lastUpdatedText: '最后一次更新于',
    footer: {
      message: `记录个人发展`,
    },
  }
})
