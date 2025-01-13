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
  markdown: {
    container: {
      tipLabel: ' ',
      warningLabel: ' ',
      dangerLabel: ' ',
      infoLabel: ' ',
      detailsLabel: ' '
    }
  },
  appearance:"dark",
  themeConfig: {
    confetti: false,
    outlineTitle: '导航栏',
    outline: "deep",  // 表示显示 h2 和 h3 作为导航
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
          { text: 'Git', link: '/markdown/Git/' },
        ]
      },
      { text: "🔥 前端框架",
        items: [
          { text: 'Vue', link: '/markdown/webFrame/vue/' },
          { text: 'TypeScript', link: '/markdown/webFrame/TS/' },
          { text: 'JS', link: '/markdown/webFrame/JS/' },
          { text: 'CSS', link: '/markdown/webFrame/CSS/' },
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
