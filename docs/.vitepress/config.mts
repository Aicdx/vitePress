import { defineConfig } from 'vitepress'
import sidebar from '../sidebar'

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
      { text: '工程化', link: '/Engineering/index' },
      { text: '算法', link: '/Algorithm/index' },
      { text: 'Vue', link: '/study/studyNotes' },
      { text: 'React', link: '/study/studyNotes' },
      { text: '性能优化', link: '/study/studyNotes' },
      { text: '手写', link: '/study/studyNotes' },

    ],

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Aicdx' }
    ],
  }
})
