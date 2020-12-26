<template>
  <div class="d-flex align-stretch">
    <div class="flex-grow-1">
      <v-text-field
        v-bind="$attrs"
        label="Google Sheets URL"
        outlined
        :value="url_google_sheets"
        @input="$emit('update:url_google_sheets', $event)"
        @keyup.enter="fetchGoogleSlides"
        hide-details
        single-line
        append-icon="mdi-restore"
        @click:append="$emit('clickRestore')"
      ></v-text-field>
    </div>
    <div class="pl-1" style="white-space: nowrap;">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ml-2"
            v-on="on"
            icon
            color="orange"
            target="_blank"
            :href="url_google_sheets"
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </template>
        <span>go to</span>
      </v-tooltip>

      <v-btn
        class="ml-2"
        color="primary"
        :loading="fetching"
        @click="fetchGoogleSlides"
        style="height: 100%;"
      >
        fetch
      </v-btn>
    </div>

    <snackbar ref="snackbar" />
  </div>
</template>

<script>
import Snackbar from "../components/Snackbar";
const se = require("../helpers/shortcut-expert");

export default {
  inheritAttrs: false,
  name: "SheetsFetcher",
  components: { Snackbar },
  props: {
    url_google_sheets: { type: String, default: "macos" },
  },
  data() {
    return {
      fetching: false,
    };
  },
  methods: {
    async fetchGoogleSlides() {
      try {
        this.fetching = true;
        let raw_file = await se.fetchGoogleSlide(this.url_google_sheets);
        this.fetching = false;
        console.log("raw_file", raw_file);

        var operating_systems = [];

        raw_file.ops.forEach((op) => {
          operating_systems.push({
            name: op.name,
            list: op.table.rows.map((v) => {
              return {
                name: v.name,
                group: v.group,
                description: v.description,
                shortcuts: se.parseShortcutCell(v.shortcuts),
              };
            }),
          });
        });
        console.log("operating_systems", operating_systems);
        this.$emit("fetched", operating_systems);
        this.$refs.snackbar.show({
          icon: "success",
          html: "Fetched!",
          timeout: 3000,
        });
      } catch (e) {
        console.error(e);
        this.$refs.snackbar.show({
          icon: "error",
          html: `Error: Please make sure to follow <a href="https://github.com/giray123/shortcutexpert#google-sheet-files" target="_blank">instructions</a> for you Google Sheets file`,
          timeout: 10000,
        });
        this.fetching = false;
      }
    },
  },
};
</script>
