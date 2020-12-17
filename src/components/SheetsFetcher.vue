<template>
  <div class="d-flex">
    <div class="flex-grow-1">
      <v-text-field
        v-bind="$attrs"
        label="Google Sheets URL"
        outlined
        dense
        :value="url_google_sheets"
        @input="$emit('update:url_google_sheets', $event)"
        @keyup.enter="fetchGoogleSlides"
      ></v-text-field>
    </div>
    <div class="pl-4">
      <v-btn color="primary" :loading="fetching" @click="fetchGoogleSlides"
        >fetch</v-btn
      >
    </div>
  </div>
</template>

<script>
const se = require("../helpers/shortcut-expert");

export default {
  inheritAttrs: false,
  name: "SheetsFetcher",
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

        // do your validation here

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
      } catch (e) {
        this.fetching = false;
        console.log(e, "error");
      }
    },
  },
};
</script>
