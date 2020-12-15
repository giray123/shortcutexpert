<template>
  <v-app-bar app flat color="blue darken-1">
    <v-toolbar-title>
      <g-link to="/">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('@/assets/img/logo-light.svg')"
          width="250"
        />
      </g-link>
    </v-toolbar-title>

    <search-bar solo flat dense class="mx-10" />

    <v-spacer></v-spacer>

    <!-- keyboard layout selector -->

    <!-- provile button -->
    <v-toolbar-items>
      <v-btn dark text class="px-5" to="/contribute">
        CONTRIBUTE
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
  name: "Toolbar",
  components: { SearchBar },
  data() {
    return {};
  },
  mounted() {
    // this.searchClient.initIndex('dev_SHORTCUTS').search('shor', {
    //   attributesToRetrieve: ['owner', 'app'],
    //   hitsPerPage: 20,
    // }).then(({ hits }) => {
    //   console.log(hits);
    // });
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
