import AlgorithmSidebar from "./Algorithm/sidebar";
import EngineeringSidebar from "./Engineering/sidebar";
import HandWritingSidebar from "./HandWriting/sidebar";

const sidebar = {
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
  "/HandWriting/": HandWritingSidebar
};

export default sidebar;
