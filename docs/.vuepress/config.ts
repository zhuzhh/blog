import {defineUserConfig, defaultTheme} from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'zzh blog',
  description: '这是我的第一个 VuePress 站点',
  theme: defaultTheme({
    navbar: [
      {
        text: '基础知识',
        link: '/basic/html'
      },
      {
        text: '浏览器',
        link: '/browser'
      },
      {
        text: 'vue源码',
        link: '/vue'
      },
      {
        text: '前端工程化',
        link: '/engine/summary'
      },
      {
        text: '编译原理',
        link: '/compile'
      },
      {
        text: '精选文章',
        link: '/glory'
      },
      {
        text: '面试题',
        link: '/interview/basic'
      }
    ],
    sidebar: {
      '/basic/': [
        '/basic/html',
        {
          text: 'Css',
          link: '/basic/css',
          children:[
            {
              text: 'css基础',
              link: '/basic/css'
            },
            {
              text: 'css动画',
              link: '/basic/css/animation'
            }
          ]
        },
        {
          text: 'JavaScript',
          link: '/basic/js',
          children: [
            {
              text: 'js基础',
              link: '/basic/js'
            },
            {
              text: 'es6',
              link: '/basic/js/es6'
            },
            {
              text: '迭代器',
              link: '/basic/js/iterator'
            }
          ]
        }
      ],
      '/engine/': [
        'summary',
        'webpack',
        'babel',
        'npm',
        'node'
      ],
      '/interview/': [
        'basic',
        'algorithm'
      ]
    },
    repo: 'https://github.com/zhuzhh/blog'
  })
})
