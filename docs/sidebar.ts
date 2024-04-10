import AlgorithmSidebar from "./Algorithm/sidebar";

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
  "/Algorithm/": AlgorithmSidebar
};

export default sidebar;
