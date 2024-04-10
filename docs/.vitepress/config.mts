import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '样例', link: '/markdown-examples' },
      { text: '学习笔记', link: '/study/studyNotes' }
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
