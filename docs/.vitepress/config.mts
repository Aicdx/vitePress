import { defineConfig } from "vitepress";
import sidebar from "../sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Acid的博客",
  description: "A VitePress Site",
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outline: {
      level: [2, 3],
      label: "目录",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "JavaScript", link: "/MyJavaScript/index" },
      { text: "设计模式", link: "/DesignPatterns/index" },
      { text: "HTMl&CSS", link: "/htmlCss/index" },
      { text: "工程化", link: "/Engineering/index" },
      { text: "算法", link: "/Algorithm/index" },
      { text: "Vue", link: "/MyVue/index" },
      { text: "React", link: "/study/studyNotes" },
      { text: "性能优化", link: "/study/studyNotes" },
      { text: "手写", link: "/HandWriting/index" },
      { text: "Flutter", link: "/Flutter/index" },
    ],

    sidebar: sidebar,

    socialLinks: [{ icon: "github", link: "https://github.com/Aicdx" }],
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
  },
});
