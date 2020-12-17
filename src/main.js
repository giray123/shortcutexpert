// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Vuetify v2.0
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import DefaultLayout from "~/layouts/Default.vue";
import VueClipboard from "vue-clipboard2";
import { textToSymbol } from "./filters/textToSymbol";

export default function(Vue, { appOptions, head, router }) {
  head.link.push({
    rel: "stylesheet",
    href:
      "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
  });

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
  });

  const opts = {}; //opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify);

  appOptions.vuetify = new Vuetify(opts);

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.filter("textToSymbol", textToSymbol);

  Vue.use(VueClipboard);

  if (process.isClient) {
    const VueShortkey = require("vue-shortkey");
    Vue.use(VueShortkey, { prevent: ["input", "textarea"] });
  }

  head.meta.push({
    key: "og:image",
    name: "og:image",
    property: "og:image",
    content: `https://shortcutexpert.com/img/share.png`,
  });

  head.meta.push({
    key: "og:title",
    name: "og:title",
    property: "og:title",
    content: `Shortcut Expert | All Shortcuts in One Place`,
  });

  head.meta.push({
    key: "og:description",
    name: "og:description",
    property: "og:description",
    content:
      "Best way to learn application shortcuts. You can create your own shortcuts and keyboard layouts for your application. Completely open source!",
  });

  head.meta.push({
    key: "twitter:card",
    name: "twitter:card",,
    content: `summary_large_image`,
  });
  head.meta.push({
    key: "twitter:creator",
    name: "twitter:creator",
    content: `@giray123`,
  });
  head.meta.push({
    key: "twitter:title",
    name: "twitter:title",
    content: `Shortcut Expert | All Shortcuts in One Place`,
  });
  head.meta.push({
    key: "twitter:description",
    name: "twitter:description",
    content:
      "Best way to learn application shortcuts. You can create your own shortcuts and keyboard layouts for your application. Completely open source!",
  });
  head.meta.push({
    key: "twitter:image",
    name: "twitter:image",
    content: `https://shortcutexpert.com/img/share.png`,
  });

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: "og:url",
      property: "og:url",
      name: "og:url",
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    });
    next();
  });
}
