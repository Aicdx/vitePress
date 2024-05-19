import AlgorithmSidebar from "./Algorithm/sidebar";
import EngineeringSidebar from "./Engineering/sidebar";
import FlutterSidebar from "./Flutter/sidebar";
import HandWritingSidebar from "./HandWriting/sidebar";
import VueSidebar from "./MyVue/sidebar";
import JavaScriptSidebar from "./MyJavaScript/sidebar";

const sidebar = {
  "/MyJavaScript/": JavaScriptSidebar,
  "/htmlCss/": [
    {
      text: "Guide",
      items: [
        { text: "Index", link: "/guide/" },
        { text: "One", link: "/guide/one" },
        { text: "Two", link: "/guide/two" },
      ],
    },
  ],
  "/Algorithm/": AlgorithmSidebar,
  "/Engineering/": EngineeringSidebar,
  "/HandWriting/": HandWritingSidebar,
  "/MyVue/": VueSidebar,
  "/Flutter/": FlutterSidebar,
};

export default sidebar;
