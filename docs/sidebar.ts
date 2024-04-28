import AlgorithmSidebar from "./Algorithm/sidebar";
import EngineeringSidebar from "./Engineering/sidebar";
import FlutterSidebar from "./Flutter/sidebar";
import HandWritingSidebar from "./HandWriting/sidebar";
import VueSidebar from "./Vue/sidebar";
import JavaScriptSidebar from "./JavaScript/sidebar";

const sidebar = {
  "/JavaScript/": JavaScriptSidebar,
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
  "/Vue/": VueSidebar,
  "/Flutter/": FlutterSidebar,
};

export default sidebar;
