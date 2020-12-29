<template>
  <div
    class="d-flex align-center"
    v-shortkey="{
      focus: ['a'],
    }"
    @shortkey="searchBarKeyPress"
  >
    <v-autocomplete
      :items="applications"
      v-model="search"
      v-bind="$attrs"
      label="Search Application (A)"
      nudge-top="100"
      single-line
      clearable
      hide-details
      prepend-inner-icon="mdi-magnify"
      auto-select-first
      item-text="name"
      item-value="name"
      @change="change"
      ref="searchbar"
      @keyup.esc="$refs.searchbar.blur()"
    >
      <template v-slot:item="data">
        <v-list-item-avatar tile size="35">
          <v-img contain :src="data.item.url_logo"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Not Found!
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<static-query>
  query {
    applications2: allApplications (sortBy: "name", order: ASC){
      edges{
        node{
          name
          url_logo
          slug
        }
      }
    }
  }
</static-query>

<script>
// import applications from "../data/applications.json";

export default {
  inheritAttrs: false,
  name: "SearchBar",
  mounted() {
    this.applications = JSON.parse(
      JSON.stringify(this.$static.applications2.edges.map((v) => v.node))
    );
  },
  data() {
    return {
      search: "",
      applications: [],
    };
  },
  methods: {
    change(value) {
      console.log(`change: ${value}`);
      if (!value) return;
      const app = this.applications.find((v) => v.name == value);
      if (!app) return;
      this.$router.push({ path: `/shortcuts/${app.slug}` });
    },
    searchBarKeyPress(event) {
      console.log("searchBarKeyPress");
      switch (event.srcKey) {
        case "focus":
          this.$refs.searchbar.focus();
          break;
      }
    },
    focus() {
      console.log("focus");
      // console.log(this.$refs.searchbar);
      // TODO: does not work
      this.$refs.searchbar.focus();
    },
  },
};
</script>
