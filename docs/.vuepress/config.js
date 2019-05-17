module.exports = {
  title: 'aliyun-logs',
  description: '',
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }],
  ],
  themeConfig: {
    nav: [
      { text: '接口文档', link: '/' },
      { text: 'Github', link: 'https://github.com/wittbulter/aliyun-logs' },
    ],
    sidebar: {
      '/': [{
        title: '接口文档',
        children: [
          'guide',
          'apis',
        ]
      }]
    }
  },
}
