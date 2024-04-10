import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Acid的博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTMl&CSS', link: '/htmlCss/index' },
      { text: '算法', link: '/study/studyNotes' },
      { text: 'Vue', link: '/study/studyNotes' },
      { text: 'React', link: '/study/studyNotes' },
      { text: '性能优化', link: '/study/studyNotes' },
      { text: '手写', link: '/study/studyNotes' },

    ],

    sidebar: [
      {
        items: [
          {
            text: '学习笔记',
            // 开启折叠按钮
            collapsed: false,
            items: [
              { text: 'Vue学习笔记', link: '/study/vue.md' },
              { text: 'Node学习笔记', link: '/study/node.md' },
              { text: 'React学习笔记', link: '/study/react.md' }
            ]
          },
          { text: 'Markdown Examples', link: '/markdown-examples'},
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Aicdx' }
    ],
  }
})
