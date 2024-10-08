
// base info
export const name = 'Junlin'
export const site = 'https://chodocs.cn/'
export const logo = 'https://chodocs.cn/chodocs-logo.svg'

// social link
export const bilibili = 'https://space.bilibili.com/351534170'
export const github = 'https://github.com/chodocs/chodocs'

// docs version

/* PWA runtime caching urlPattern regular expressions */
/* eslint-disable prefer-regex-literals */
export const githubSourceContentRegex = new RegExp('^https://(((raw|user-images|camo).githubusercontent.com))/.*', 'i')
export const googleFontRegex = new RegExp('^https://fonts.googleapis.com/.*', 'i')
export const googleStaticFontRegex = new RegExp('^https://fonts.gstatic.com/.*', 'i')
export const jsdelivrCDNRegex = new RegExp('^https://cdn.jsdelivr.net/.*', 'i')
