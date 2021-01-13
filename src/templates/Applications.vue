<template>
  <Layout :toolbar="!iframe" fullheight>
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
        focus_by_name: ['n'],
        open_groups: ['g'],
        toggle_favorite: ['s'],
        filter_favorites: ['f'],
        clear_filter: ['c'],
        text_symbol: ['t'],
      }"
      @shortkey="globalKeyPress"
    >
    <v-row class="blue darken-1 text-right justify-end align-center" v-if="iframe" style="height: 35px;" flex>
      <a :href="'https://shortcutexpert.com/shortcuts/'+$page.app.slug" target="_blank" class="mx-3">
        <img :src="require('@/assets/img/logo-light.svg')" alt="Shortcut Expert Logo" width="150">
      </a>
    </v-row>
      <v-row
        no-gutters
        style="flex-wrap: nowrap; width: 100%;"
        class="fill-height"
      >
        <div class="box_main">
          <div class="box_heading" v-if="!iframe">
            <!-- heading -->
            <div class="d-flex align-strecth justify-start">
              <div class="d-flex align-center justify-center">
                <v-img
                  alt="Excel Logo"
                  contain
                  :src="url_logo"
                  transition="scale-transition"
                  width="80"
                />
              </div>
              <div class="pa-2 pa-lg-5">
                <h1>{{ name }} Shortcuts</h1>
                <div class="d-flex align-center justify-start mt-1">
                  <div class="text-sm-body-2">
                    <a
                      @click.prevent="dialog_update = true"
                      class="text-decoration-none mr-2 mr-lg-5 orange--text text--darken-1"
                    >
                      <v-icon x-small color="orange darken-1">mdi-pen</v-icon>
                      Update
                    </a>
                    <a
                      v-if="url_app"
                      :href="url_app"
                      target="_blank"
                      class="text-decoration-none mr-2 mr-lg-5"
                    >
                      <v-icon x-small color="blue darken-1">mdi-web</v-icon>
                      <span class="hidden-md-and-down">Application</span>
                      <span class="hidden-lg-and-up">App</span>
                    </a>
                    <a
                      v-if="url_shortcuts"
                      :href="url_shortcuts"
                      target="_blank"
                      class="text-decoration-none mr-2 mr-lg-5"
                    >
                      <v-icon x-small color="blue darken-1">mdi-web</v-icon>

                      <span class="hidden-md-and-down">Official Shortcuts</span>
                      <span class="hidden-lg-and-up">Official</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="blue-grey darken-3 box_list">
            <h2 class="grey--text text-overline">OPERATING SYSTEM</h2>
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
                <h2 class="grey--text text-overline">FILTER</h2>
              </div>
              <div>
                <v-btn
                  small
                  text
                  color="red"
                  v-show="if_filtered"
                  @click="clearFilters"
                >
                  clear filters (C)
                </v-btn>
              </div>
            </div>
            <v-text-field
              ref="filter_by_name"
              clearable
              solo
              label="Filter by Name (N)"
              class="sticked_search"
              prepend-inner-icon="mdi-pen"
              append-icon="mdi-magnify"
              v-model="filter_name"
              @keyup.esc="$refs.filter_by_name.blur()"
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
              ref="filter_group"
              @keyup.esc="$refs.filter_group.blur()"
            ></v-select>

            <v-checkbox
              dark
              v-model="filter_favorites"
              label="Filter favorites (F)"
            ></v-checkbox>

            <div class="d-flex justify-between items-center mt-5">
              <div class="flex-grow-1">
                <h2 class="grey--text text-overline">SHORTCUTS</h2>
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
                    symbol_display
                      ? "symbols to text (T)"
                      : "text to symbols (T)"
                  }}</span>
                </v-tooltip>
              </div>
            </div>

            <shortcut-list
              :list="list"
              :symbol_display="symbol_display"
              @clickListItem="clickListItem"
              @clickShortcut="clickShortcut"
              @clickFavorite="clickFavorite"
            />
          </div>
          <div class="box_keyboard" :style="iframe ? 'grid-area: 1 / 2 / span 2 / span 2;' : ''">
            <div
              class="keyboard_section"
              v-show="!$vuetify.breakpoint.mobile || mobile_keyboard_active"
            >
              <!-- keyboard -->
              <div class="flex-grow-1 d-flex justify-center align-center">
                <div class="keyboard_wrapper">
                  <keyboard
                    :pressed="pressed"
                    @clickKey="clickKeyboardMouse"
                    :layout="operating_system.toLowerCase()"
                    :highlight="filtered_distinct_keys"
                  />
                </div>
              </div>
              <!-- mouse -->
              <div class="hidden-sm-and-down">
                <div class="mouse_wrapper">
                  <mouse
                    v-show="!$vuetify.breakpoint.mobile"
                    :pressed="pressed"
                    @clickMouse="clickKeyboardMouse"
                  />
                </div>
              </div>
              <!-- mobile close -->
              <v-btn
                icon
                color="orange"
                style="position: absolute; top: -30px; right: 10px;"
                v-show="$vuetify.breakpoint.mobile && mobile_keyboard_active"
                @click="mobile_keyboard_active = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <div class="comments_section">
              <Disqus :identifier="$page.app.slug" />
            </div>
          </div>

          <v-btn
            style="position: fixed; bottom: 15px; right: 15px;z-index:1;"
            fab
            dark
            color="orange"
            v-show="$vuetify.breakpoint.mobile && !mobile_keyboard_active"
            @click="mobile_keyboard_active = true"
          >
            <v-icon dark large>
              mdi-keyboard
            </v-icon>
          </v-btn>
        </div>
      </v-row>

      <!-- update modal -->
      <v-dialog v-model="dialog_update" width="500">
        <v-card>
          <v-card-title
            class="headline blue darken-1 white--text justify-space-between"
          >
            Update Application
            <v-btn icon dark @click="dialog_update = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <div class="text-overline mt-5 mb-3">Meta Data</div>
            <p class="mb-0 font-weight-bold text-heading-1">
              Application Name
            </p>
            <p class="mb-2">
              case sensitive
            </p>
            <v-text-field
              placeholder="Application Name"
              outlined
              dense
              clearable
              hide-details
              v-model="form_update.name"
              @input="updateNameChange"
              append-icon="mdi-restore"
              @click:append="restoreField('name')"
            ></v-text-field>

            <p class="mb-0 mt-5 font-weight-bold text-heading-1">
              Shortcut Expert URL
            </p>
            <p class="mb-2">
              optional
            </p>
            <v-text-field
              outlined
              dense
              clearable
              hide-details
              class="mb-3"
              prefix="/shortcuts/"
              v-model="form_update.slug"
              append-icon="mdi-restore"
              @click:append="restoreField('slug')"
            ></v-text-field>

            <p class="mb-0 mt-5 font-weight-bold text-heading-1">
              Application Logo URL
            </p>
            <p class="mb-2">
              Must be square. SVG is preffered, PNG and JPG is fine, no more
              than 20 KB please.
            </p>
            <v-text-field
              placeholder="Logo URL"
              outlined
              dense
              clearable
              hide-details
              class="mb-3"
              v-model="form_update.url_logo"
              append-icon="mdi-restore"
              @click:append="restoreField('url_logo')"
              @change="updateLogoChange"
            ></v-text-field>

            <p class="mb-0 mt-5 font-weight-bold text-heading-1">
              Application Home URL
            </p>
            <p class="mb-2">
              optional
            </p>
            <v-text-field
              v-model="form_update.url_app"
              placeholder="Ex: https://shortcutexpert.com"
              outlined
              dense
              clearable
              hide-details
              class="mb-3"
              append-icon="mdi-restore"
              @click:append="restoreField('url_app')"
              @input="updateAppURLChange"
            ></v-text-field>

            <p class="mb-0 mt-5 font-weight-bold text-heading-1">
              Official Application Shortcuts URL
            </p>
            <p class="mb-2">
              optional
            </p>
            <v-text-field
              v-model="form_update.url_shortcuts"
              placeholder="Ex: https://shortcutexpert.com/shortcuts/shortcut-expert"
              outlined
              dense
              clearable
              append-icon="mdi-restore"
              @click:append="restoreField('url_shortcuts')"
              @input="updateAppShortcutsURLChange"
            ></v-text-field>
            <v-divider></v-divider>

            <div class="text-overline mt-5 mb-3">Shortcuts</div>
            <p class="mb-2">
              Please make sure to prepare your Google Sheets file according to
              the
              <a target="_blank" href="/how-it-works">instructions</a>. When you
              click FETCH, Shortcut Expert will grab the data from your Google
              Sheets file and process it for the display.
            </p>
            <sheets-fetcher
              class="mt-4"
              dense
              clearable
              :url_google_sheets.sync="form_update.url_google_sheets"
              @fetched="fetched"
              @clickRestore="restoreField('url_google_sheets')"
            ></sheets-fetcher>
            <v-divider class="mt-8"></v-divider>

            <div class="text-overline mt-5 mb-3">Submit</div>
            <p>
              When it is ready, you need to download the JSON file below and add
              it to
              <a
                target="_blank"
                href="https://github.com/giray123/shortcutexpert/tree/main/src/data/applications"
                class="text-decoration-none"
                ><code>src/data/applications</code></a
              >
              in the GitHub repo. Create a pull request afterwards. Note that,
              if you are updating an existing application, make sure that the
              name of the JSON file does not change.
            </p>

            <v-btn color="primary" block large class="my-6" @click="download">
              <v-icon class="mr-3">mdi-download</v-icon> Download JSON
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
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
      url_google_sheets
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
import Mouse from "../components/Mouse";
import ShortcutList from "../components/ShortcutList";
import SheetsFetcher from "../components/SheetsFetcher";
// var text_symbol = require('../data/text-symbol').text_symbol;
// var excel_shortcuts = require('../../mockdata/excel');
import updateForm from "../mixins/updateForm";
var all_shortcuts_display_text = "All Shortcuts";

var list_cached = null;
var pids = [];
var filter_name_pid = null;
var filter_stroke_pid = null;

export default {
  name: "Applications",
  metaInfo() {
    return {
      title: `${this.$page.app.name} Shortcuts`,
      meta: [
        {
          key: "title",
          name: "title",
          content: `${this.$page.app.name} Shortcuts`,
        },
        {
          key: "og:title",
          name: "og:title",
          content: `${this.$page.app.name} Shortcuts`,
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: `${this.$page.app.name} Shortcuts`,
        },
        {
          key: "description",
          name: "description",
          content: `Learn ${
            this.$page.app.name
          } shortcuts fast with keyboard visualization and superior user experience. Filter shortcuts based on name, stroke and group. See shortcuts for different operating systems and keyboard layouts.`,
        },
        {
          key: "og:description",
          name: "og:description",
          content: `Learn ${
            this.$page.app.name
          } shortcuts fast with keyboard visualization and superior user experience. Filter shortcuts based on name, stroke and group. See shortcuts for different operating systems and keyboard layouts.`,
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: `Learn ${
            this.$page.app.name
          } shortcuts fast with keyboard visualization and superior user experience. Filter shortcuts based on name, stroke and group. See shortcuts for different operating systems and keyboard layouts.`,
        },
      ],
    };
  },
  components: {
    Keyboard,
    Mouse,
    ShortcutList,
    SheetsFetcher,
  },
  mixins: [updateForm],
  created() {
    // heading & meta data
    // fill update form
    this.name = this.$page.app.name;
    this.url_logo = this.$page.app.url_logo;
    this.url_app = this.$page.app.url_app;
    this.url_shortcuts = this.$page.app.url_shortcuts;

    // console.log(this.$page.app);
    console.log(this.$route, "this.$route");
    // prepare operating systems
    this.operating_systems = this.$page.app.operating_systems.map(
      (v) => v.name
    );
    this.operating_system = this.operating_systems[0];

    this.setOperatingSystem();
  },
  mounted() {
    // check iframe
    this.iframe = this.$route.query.iframe == "true"
    // mark favorites
    var local_favorites = localStorage.getItem("favorites");
    if (local_favorites) {
      local_favorites = JSON.parse(local_favorites);
      if (
        local_favorites[this.$page.app.slug] &&
        local_favorites[this.$page.app.slug] != []
      ) {
        this.list.forEach((item) => {
          if (
            local_favorites[this.$page.app.slug].includes(se.slugify(item.name))
          ) {
            item.favorite = true;
          }
        });
      }
    }

    // fill update form
    this.form_update.name = this.$page.app.name;
    this.form_update.slug = this.$page.app.slug;
    this.form_update.url_logo = this.$page.app.url_logo;
    this.form_update.url_app = this.$page.app.url_app;
    this.form_update.url_shortcuts = this.$page.app.url_shortcuts;
    this.form_update.url_google_sheets = this.$page.app.url_google_sheets;
  },
  data: () => ({
    iframe: false,
    name: "",
    url_logo: "",
    url_app: "",
    url_shortcuts: "",
    mobile_keyboard_active: true,
    operating_system: "macos",
    operating_systems: ["macos", "windows", "ios", "android"],
    favorites: [],
    list: [
      {
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
    dialog_update: false,
    form_update: {
      name: "",
      slug: "",
      url_logo: "",
      url_app: "",
      url_shortcuts: "",
      url_google_sheets: "",
    },
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
              distinct_keys: v.strokes.map((g) => se.parseKey(g.text)).flat(),
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
          favorite: false,
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
              this.pressed.push(
                ...strokes.map((v) => se.parseKey(v.text)).flat()
              );
              strokes.forEach((v) => (v.active = true));
            }, t)
          );
        } else if (mode == "next") {
          t += 2 * interval;
          pids.push(
            setTimeout(() => {
              this.pressed.push(
                ...strokes.map((v) => se.parseKey(v.text)).flat()
              );
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
              this.pressed.push(
                ...strokes.map((v) => se.parseKey(v.text)).flat()
              );
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
    clickKeyboardMouse(stroke) {
      this.clearFilters();
      this.filter_stroke = stroke;
      this.pressed = [stroke];
    },
    globalKeyPress(event) {
      console.log("globalKeyPress");
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
        case "focus_by_name":
          console.log("focus_by_name");
          this.$refs.filter_by_name.focus();
          break;
        case "open_groups":
          console.log("open_groups");
          this.$refs.filter_group.focus();
          this.$refs.filter_group.activateMenu();
          break;
        case "toggle_favorite":
          console.log("toggle_favorite");
          const selected_item = this.list.find((v) => v.selected);
          if (!selected_item) return console.error("No shortcut is selected");
          this.clickFavorite(selected_item.name, !selected_item.favorite);
          break;
        case "filter_favorites":
          console.log("filter_favorites");
          this.filter_favorites = !this.filter_favorites;
          break;
        case "clear_filter":
          console.log("clear_filter");
          this.clearFilters();
          break;
        case "text_symbol":
          console.log("text_symbol");
          this.toggleListSymbols();
          break;
      }
    },
    scrollToShortcutListItem(index) {
      this.$vuetify.goTo(
        document.querySelectorAll(".shortcut_list_item")[index],
        {
          duration: 1000,
          easing: "easeInOutCubic",
          container: document.querySelector(".box_list"),
          offset: 200,
        }
      );
    },
    fetched(value) {
      console.log(value, "fetched");
      this.$page.app.operating_systems = value;
      this.operating_systems = this.$page.app.operating_systems.map(
        (v) => v.name
      );
      this.operating_system = this.operating_systems[0];

      this.setOperatingSystem();
    },
    clickFavorite(name, value) {
      // console.log(name, value);
      // console.log(value);
      var name_slug = se.slugify(name);
      var item = this.list.find((v) => v.name == name);
      // console.log(item);
      if (item) {
        item.favorite = value;

        // save to localStorage
        var local_favorites = localStorage.getItem("favorites");
        if (local_favorites) {
          local_favorites = JSON.parse(local_favorites);
          if (local_favorites[this.$page.app.slug]) {
            var index = local_favorites[this.$page.app.slug].indexOf(name_slug);
            if (value && index == -1) {
              local_favorites[this.$page.app.slug].push(name_slug);
            } else if (index != -1) {
              local_favorites[this.$page.app.slug].splice(index, 1);
            }
          } else {
            local_favorites[this.$page.app.slug] = [name_slug];
          }
        } else {
          local_favorites = {
            [this.$page.app.slug]: [name_slug],
          };
        }
        localStorage.setItem("favorites", JSON.stringify(local_favorites));
      }
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
    filtered_distinct_keys() {
      const arr = [
        ...new Set(
          this.list
            .filter((v) => !v.hidden)
            .map((v) => v.shortcuts.map((k) => k.distinct_keys))
            .flat()
            .flat()
        ),
      ];
      // console.log(arr, "arr");
      return arr;
    },
  },
};
</script>

<style>
.box_main {
  width: 100%;
}
.box_heading {
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  min-width: 0;
  max-width: 100%;
}
.box_list {
  min-width: 0;
  padding: 10px 10px 100px 10px;
}
.box_keyboard {
}
.keyboard_section {
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.comments_section {
  padding: 20px 20px 300px 20px;
}
.sticked_search {
  z-index: 1;
  position: sticky;
  position: -webkit-sticky;
  top: 65px;
}
.keyboard_wrapper {
  width: 100%;
  padding-top: 37%;
  position: relative;
}
.mouse_wrapper {
  width: 100%;
  padding-top: 160%;
  position: relative;
}
@media only screen and (min-width: 1264px) {
  .box_main {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 5fr 3fr;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr 5fr;
  }

  .box_heading {
    padding: 10px 40px;
    grid-area: 1 / 2 / span 1 / span 2;
  }
  .box_list {
    overflow: auto;
    grid-area: 1 / 1 / span 2 / span 1;
  }
  .box_keyboard {
    position: relative;
    grid-area: 2 / 2 / span 1 / span 2;
    overflow-y: auto;
  }
  .keyboard_section {
    position: initial;
    height: 100%;
    display: grid;
    flex-direction: row;
    grid-template-columns: 5fr 1fr;
    grid-template-rows: 1fr;
  }
  .keyboard_section div {
    flex-grow: 1;
  }
  .sticked_search {
    top: 0px;
  }
}
</style>
