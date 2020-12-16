<template>
  <Layout toolbar fullheight>
    <v-container
      fluid
      pa-0
      class="fill-height"
      v-shortkey="{
        up: ['arrowup'],
        down: ['arrowdown'],
        left: ['arrowleft'],
        right: ['arrowright'],
        space: ['space'],
      }"
      @shortkey="globalKeyPress"
    >
      <v-row no-gutters style="flex-wrap: nowrap;" class="fill-height">
        <!-- left column -->
        <v-col
          id="left_column"
          cols="3"
          class="blue-grey darken-3 flex-grow-0 flex-shrink-0 pa-3"
          style="overflow-y:auto; padding-bottom: 600px !important;"
        >
          <h2 class="grey--text text-sm-overline">OPERATING SYSTEM</h2>
          <v-select
            v-model="operating_system"
            :items="operating_systems"
            label="Select Your Operating System"
            dark
            outlined
            rounded
            single-line
            offset
            hide-details
            @change="changeOperatingSystem"
          >
            <template v-slot:item="{ item }">
              <div class="d-flex justify-start align-center">
                <v-avatar size="24" rounded tile>
                  <img
                    :src="require(`@/assets/img/${item}.svg`)"
                    :alt="`${item} logo`"
                  />
                </v-avatar>
                <span class="ml-3">{{ item }}</span>
              </div>
            </template>
            <template v-slot:selection="{ item }">
              <div class="d-flex justify-start align-center">
                <v-avatar size="24" rounded tile>
                  <img
                    :src="require(`@/assets/img/${item}.svg`)"
                    :alt="`${item} logo`"
                  />
                </v-avatar>
                <span class="ml-3">{{ item }}</span>
              </div>
            </template>
          </v-select>

          <div class="d-flex justify-between items-center mt-5 mb-1">
            <div class="flex-grow-1">
              <h2 class="grey--text text-sm-overline">FILTER</h2>
            </div>
            <div>
              <v-btn
                small
                text
                color="red"
                v-show="if_filtered"
                @click="clearFilters"
              >
                clear filters
              </v-btn>
            </div>
          </div>
          <v-text-field
            clearable
            solo
            label="Filter by Name"
            prepend-inner-icon="mdi-pen"
            append-icon="mdi-magnify"
            v-model="filter_name"
          />

          <v-text-field
            dark
            clearable
            label="Filter by Stroke"
            prepend-icon="mdi-keyboard"
            append-icon="mdi-magnify"
            v-model="filter_stroke"
          />

          <v-select
            prepend-icon="mdi-folder"
            v-model="filter_group"
            :items="shortcut_groups"
            label="Select Shortcut Group"
            dark
            single-line
          ></v-select>

          <v-checkbox
            dark
            v-model="filter_favorites"
            label="Filter favorites"
          ></v-checkbox>

          <div class="d-flex justify-between items-center mt-5">
            <div class="flex-grow-1">
              <h2 class="grey--text text-sm-overline">SHORTCUTS</h2>
            </div>
            <div>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon>
                    <v-icon
                      v-on="on"
                      color="grey darken-1"
                      @click="toggleListSymbols"
                      >{{
                        symbol_display
                          ? "mdi-format-size"
                          : "mdi-apple-keyboard-command"
                      }}</v-icon
                    >
                  </v-btn>
                </template>
                <span>{{
                  symbol_display ? "symbols to text" : "text to symbols"
                }}</span>
              </v-tooltip>
            </div>
          </div>

          <shortcut-list
            :list="list"
            :symbol_display="symbol_display"
            @clickListItem="clickListItem"
            @clickShortcut="clickShortcut"
          />
        </v-col>

        <!-- right column -->
        <v-col
          cols="9"
          style="min-width: 100px; max-width: 100%;"
          class="flex-grow-1 flex-shrink-0 py-10 px-10 d-flex flex-column"
        >
          <!-- heading -->
          <div class="d-flex align-strecth justify-start">
            <div class="d-flex align-center justify-center">
              <v-img
                alt="Excel Logo"
                contain
                :src="$page.app.url_logo"
                transition="scale-transition"
                width="80"
              />
            </div>
            <div class="pa-5">
              <h1>{{ $page.app.name }} Shortcuts</h1>
              <div class="d-flex align-center justify-start mt-1">
                <div class="text-sm-body-2">
                  <a
                    v-if="$page.app.url_app"
                    :href="$page.app.url_app"
                    target="_blank"
                    class="text-decoration-none mr-5"
                  >
                    <v-icon x-small color="blue darken-1">mdi-web</v-icon>
                    Application
                  </a>
                  <a
                    v-if="$page.app.url_shortcuts"
                    :href="$page.app.url_shortcuts"
                    target="_blank"
                    class="text-decoration-none mr-5"
                  >
                    <v-icon x-small color="blue darken-1">mdi-web</v-icon>
                    Official Shortcuts
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- keyboard -->
          <div class="flex-grow-1 d-flex justify-center align-center">
            <div class="keyboard_wrapper">
              <keyboard
                :pressed="pressed"
                @clickKey="clickKeyboardKey"
                :layout="operating_system.toLowerCase()"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>
  query App($path: String){
    app: applications(path: $path){
      name
      slug
      url_logo
      url_app
      url_shortcuts
      operating_systems{
        name
        list{
          name
          group
          description
          shortcuts {
            info
            distinct_keys
            strokes{
              mode
              text
            }
          }
        }
      }
    }
  }
</page-query>

<script>
const se = require("../helpers/shortcut-expert");
// import HelloWorld from './components/HelloWorld';
import Keyboard from "../components/Keyboard";
import ShortcutList from "../components/ShortcutList";
// var text_symbol = require('../data/text-symbol').text_symbol;
// var excel_shortcuts = require('../../mockdata/excel');
var all_shortcuts_display_text = "All Shortcuts";

var list_cached = null;
var pids = [];
var filter_name_pid = null;
var filter_stroke_pid = null;

export default {
  name: "Shortcuts",
  metaInfo() {
    return {
      title: `${this.$page.app.name} Shortcuts`,
      meta: [
        {
          key: "description",
          name: "description",
          content: `Learn ${
            this.$page.app.name
          } shortcuts fast with keyboard visualization and superior user experience. Filter shortcuts based on name, stroke and group. See shortcuts for different operating systems and keyboard layouts.`,
        },
      ],
    };
  },
  components: {
    Keyboard,
    ShortcutList,
  },
  mounted() {
    console.log(this.$page.app);
    // prepare operating systems
    this.operating_systems = this.$page.app.operating_systems.map(
      (v) => v.name
    );
    this.operating_system = this.operating_systems[0];

    this.setOperatingSystem();
  },
  data: () => ({
    operating_system: "macos",
    operating_systems: ["macos", "windows", "ios", "android"],
    list: [
      {
        id: "",
        group: "",
        name: "Example Shortcut",
        description: "",
        shortcuts: [
          {
            active: false,
            info: "",
            distinct_keys: ["SHIFT", "a", "b", "tab", "x", "y"],
            strokes: [
              { active: false, mode: "now", text: "SHIFT" },
              { active: false, mode: "now", text: "A" },
              { active: false, mode: "reset", text: "B" },
              { active: false, mode: "now", text: "tab" },
              { active: false, mode: "next", text: "X" },
              { active: false, mode: "next", text: "Y" },
            ],
          },
        ],
        hidden: false,
        selected: false,
        favorite: false, // adds random favorite,
      },
    ],
    shortcut_groups: [],
    filter_group: all_shortcuts_display_text,
    filter_name: "",
    filter_name2: "",
    filter_stroke: "",
    filter_favorites: false,
    keyboard_type: "QWERTY",
    keyboard_types: ["asd", "asdasadd"],
    pressed: ["s", "E"],
    symbol_display: true,
    activeKeyboard: "KeyboardWindows",
  }),
  methods: {
    setOperatingSystem() {
      console.log("setOperatingSystem");
      const op = this.$page.app.operating_systems.find(
        (op) => op.name == this.operating_system
      );
      this.shortcut_groups = [
        all_shortcuts_display_text,
        ...new Set(op.list.map((v) => v.group)),
      ];
      const list = op.list.map((v) => {
        return {
          id: v.id || null,
          name: v.name,
          group: v.group,
          description: v.description,
          shortcuts: v.shortcuts.map((v) => {
            return {
              active: false,
              info: v.info,
              distinct_keys: v.distinct_keys,
              strokes: v.strokes.map((k) => {
                return {
                  active: false,
                  mode: k.mode,
                  text: k.text,
                };
              }),
            };
          }),
          hidden: false,
          selected: false,
          favorite: Math.random() >= 0.5, // adds random favorite,
          pressed: [],
        };
      });
      this.list = list;
    },
    changeOperatingSystem() {
      this.clearFilters();
      this.setOperatingSystem();
    },
    filterShortcuts() {
      var filter_name_regexp = new RegExp(
        this.filter_name ? this.filter_name : "",
        "ig"
      ); // clear button makes it null
      this.list.forEach((item) => {
        const not_hidden =
          filter_name_regexp.test(item.name) && // filter name
          (this.filter_stroke === null ||
            this.filter_stroke == "" ||
            [
              ...new Set(
                item.shortcuts
                  .map((v) => v.distinct_keys.map((k) => k.toLowerCase()))
                  .flat()
              ),
            ].includes(this.filter_stroke.toLowerCase())) &&
          //  shortcut.strokes.map(stroke=>filter_stroke_regexp.test(stroke.name)).reduce((v,acc)=>acc||v, false) && // filter strokes
          (this.filter_group === all_shortcuts_display_text ||
            item.group == this.filter_group) && // filter group
          (this.filter_favorites ? item.favorite : true); // filter favorites
        item.hidden = !not_hidden;
      });
    },
    clearFilters() {
      this.filter_favorites = false;
      this.filter_group = all_shortcuts_display_text;
      this.filter_name = "";
      this.filter_stroke = "";
    },
    clickListItem(index) {
      this.unselectShortcuts();
      this.selectOneShortcut(this.list[index]);
    },
    unselectOneShortcut(item) {
      item.selected = false;
      item.shortcuts.forEach((shorcut) => (shorcut.active = false));
      item.shortcuts.forEach((shortcut) => {
        shortcut.active = false;
        shortcut.strokes.forEach((stroke) => {
          stroke.active = false;
        });
      });
    },
    unselectShortcuts() {
      this.list.forEach((item) => {
        item.selected = false;
        item.shortcuts.forEach((shortcut) => {
          shortcut.active = false;
          shortcut.strokes.forEach((stroke) => {
            stroke.active = false;
          });
        });
      });
    },
    selectOneShortcut(item, index_shortcut = 0) {
      // console.log("item", item, index_shortcut)
      item.selected = true;
      item.shortcuts.forEach((shortcut) => (shortcut.active = false));
      pids.forEach((v) => clearInterval(v));
      pids = [];
      item.shortcuts[index_shortcut].active = true;

      this.pressed = [];

      var t = 0;
      const interval = 300;
      const shortcut = item.shortcuts[index_shortcut];

      /**
       * We will use setTimeout to activate the strokes however "now" strokes need to be
       * activated at the same time, so we group "now" strokes in times array below
       */
      const times = shortcut.strokes.reduce((acc, stroke, i) => {
        if (i == 0) {
          acc.push({ mode: "now", strokes: [stroke] });
        } else {
          if (stroke.mode == "now") {
            acc[acc.length - 1].strokes.push(stroke);
          } else if (stroke.mode == "next") {
            acc.push({ mode: "next", strokes: [stroke] });
          } else if (stroke.mode == "reset") {
            acc.push({ mode: "reset", strokes: [stroke] });
          }
        }
        return acc;
      }, []);
      // console.log("times", times)

      for (let i = 0; i < times.length; i++) {
        const strokes = times[i].strokes;
        const mode = times[i].mode;
        // const text = stroke.text.toLowerCase()
        if (mode == "now") {
          pids.push(
            setTimeout(() => {
              this.pressed.push(...strokes.map((v) => v.text));
              strokes.forEach((v) => (v.active = true));
            }, t)
          );
        } else if (mode == "next") {
          t += 2 * interval;
          pids.push(
            setTimeout(() => {
              this.pressed.push(...strokes.map((v) => v.text));
              strokes.forEach((v) => (v.active = true));
            }, t)
          );
        } else if (mode == "reset") {
          t += 2 * interval;
          pids.push(
            setTimeout(() => {
              // reset previous active keys
              shortcut.strokes.forEach((key) => {
                key.active = false;
              });
              this.pressed = [];
              this.pressed.push(...strokes.map((v) => v.text));
              strokes.forEach((v) => (v.active = true));
            }, t)
          );
        }
      }
    },
    clickShortcut(index_item, index_shortcut) {
      // console.log("clickShortcut", index_item, index_shortcut)
      this.unselectShortcuts();
      this.selectOneShortcut(this.list[index_item], index_shortcut);
    },
    toggleListSymbols() {
      this.symbol_display = !this.symbol_display;
    },
    clickKeyboardKey(stroke) {
      this.clearFilters();
      this.filter_stroke = stroke.toLowerCase();
      this.pressed = [stroke.toLowerCase()];
    },
    globalKeyPress(event) {
      var shown_items,
        shown_selected_index,
        shortcut_selected_index,
        shortcut_count,
        list_index;
      // console.log('keyDown')
      switch (event.srcKey) {
        case "up":
          shown_items = this.list.filter((v) => !v.hidden);
          shown_selected_index = shown_items.findIndex((v) => v.selected);
          if (shown_selected_index == -1) {
            this.unselectShortcuts(); // there can selected shortcut hidden
            this.selectOneShortcut(shown_items[shown_items.length - 1]);
          } else if (shown_selected_index == 0) {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
          } else {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
            this.selectOneShortcut(shown_items[shown_selected_index - 1]);
          }
          //scroll
          list_index = this.list.findIndex((v) => v.selected);
          this.scrollToShortcutListItem(list_index);
          break;
        case "down":
          shown_items = this.list.filter((v) => !v.hidden);
          shown_selected_index = shown_items.findIndex((v) => v.selected);
          if (shown_selected_index == -1) {
            this.unselectShortcuts(); // there can selected shortcut hidden
            this.selectOneShortcut(shown_items[0]);
          } else if (shown_selected_index == shown_items.length - 1) {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
          } else {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
            this.selectOneShortcut(shown_items[shown_selected_index + 1]);
          }
          //scroll
          list_index = this.list.findIndex((v) => v.selected);
          this.scrollToShortcutListItem(list_index);
          break;
        case "left":
          shown_items = this.list.filter((v) => !v.hidden);
          shown_selected_index = shown_items.findIndex((v) => v.selected);
          if (shown_selected_index == -1) return;
          shortcut_count = shown_items[shown_selected_index].shortcuts.length;
          if (shortcut_count < 2) return;
          shortcut_selected_index = shown_items[
            shown_selected_index
          ].shortcuts.findIndex((v) => v.active);
          if (shortcut_selected_index == 0) {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
            this.selectOneShortcut(
              shown_items[shown_selected_index],
              shortcut_count - 1
            );
          } else {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
            this.selectOneShortcut(
              shown_items[shown_selected_index],
              shortcut_selected_index - 1
            );
          }
          break;
        case "right":
          shown_items = this.list.filter((v) => !v.hidden);
          shown_selected_index = shown_items.findIndex((v) => v.selected);
          if (shown_selected_index == -1) return;
          shortcut_count = shown_items[shown_selected_index].shortcuts.length;
          if (shortcut_count < 2) return;
          shortcut_selected_index = shown_items[
            shown_selected_index
          ].shortcuts.findIndex((v) => v.active);
          if (shortcut_selected_index == shortcut_count - 1) {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
            this.selectOneShortcut(shown_items[shown_selected_index], 0);
          } else {
            this.unselectOneShortcut(shown_items[shown_selected_index]);
            this.selectOneShortcut(
              shown_items[shown_selected_index],
              shortcut_selected_index + 1
            );
          }
          break;
        case "space":
          console.log("space");
          shown_items = this.list.filter((v) => !v.hidden);
          shown_selected_index = shown_items.findIndex((v) => v.selected);
          if (shown_selected_index == -1) return;
          shortcut_selected_index = shown_items[
            shown_selected_index
          ].shortcuts.findIndex((v) => v.active);
          this.unselectOneShortcut(shown_items[shown_selected_index]);
          this.selectOneShortcut(
            shown_items[shown_selected_index],
            shortcut_selected_index
          );
          break;
      }
    },
    scrollToShortcutListItem(index) {
      this.$vuetify.goTo(
        document.querySelectorAll(".shortcut_list_item")[index],
        {
          duration: 1000,
          easing: "easeInOutCubic",
          container: document.getElementById("left_column"),
          offset: 200,
        }
      );
    },
  },
  watch: {
    filter_name() {
      filter_name_pid && clearInterval(filter_name_pid);
      filter_name_pid = setTimeout(() => {
        this.filterShortcuts();
      }, 300);
    },
    filter_stroke() {
      filter_stroke_pid && clearInterval(filter_stroke_pid);
      filter_stroke_pid = setTimeout(() => {
        this.filterShortcuts();
      }, 300);
    },
    filter_group() {
      this.filterShortcuts();
    },
    filter_favorites() {
      this.filterShortcuts();
    },
    operating_system() {
      // this.pressStroke(null)
    },
  },
  computed: {
    if_filtered() {
      return (
        this.filter_favorites ||
        this.filter_group !== all_shortcuts_display_text ||
        (this.filter_name && this.filter_name != "") ||
        (this.filter_stroke && this.filter_stroke != "")
      );
    },
  },
};
</script>

<style>
.keyboard_wrapper {
  width: 100%;
  padding-top: 37%;
  position: relative;
}
</style>