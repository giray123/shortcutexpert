<template>
  <div>
    <v-app-bar app flat color="blue darken-1">
      <v-app-bar-nav-icon
        dark
        v-if="$vuetify.breakpoint.mobile && !mobile_search_active"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <template v-if="!mobile_search_active">
        <v-toolbar-title>
          <g-link to="/">
            <v-img
              alt="Shortcut Expert Logo"
              class="shrink mt-1"
              contain
              min-width="100"
              :src="require('@/assets/img/logo-light.svg')"
              :width="$vuetify.breakpoint.mobile ? '250' : '350'"
            />
          </g-link>
        </v-toolbar-title>
      </template>

      <div
        :class="
          !$vuetify.breakpoint.mobile || mobile_search_active
            ? 'd-flex justify-start align-center full-width'
            : 'd-none'
        "
      >
        <search-bar
          ref="searchbar"
          solo
          flat
          dense
          :style="{ width: $vuetify.breakpoint.mobile ? '100%' : '500px' }"
        />
        <v-btn
          icon
          dark
          large
          color="primary"
          class="d-lg-none blue ml-2"
          @click="mobile_search_active = false"
        >
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- keyboard layout selector -->

      <!-- provile button -->

      <v-toolbar-items>
        <template v-if="!$vuetify.breakpoint.mobile">
          <v-btn dark text class="px-5" to="/prepare-application">
            <v-icon class="mr-2">mdi-plus</v-icon> create
          </v-btn>
          <v-btn dark text class="px-5" to="/shortcuts/shortcut-expert">
            <v-icon>mdi-keyboard</v-icon>
          </v-btn>
          <v-btn dark text class="px-5" to="/favorites">
            <v-icon>mdi-star</v-icon>
          </v-btn>
          <v-btn
            dark
            text
            class="px-5"
            href="https://github.com/giray123/shortcutexpert"
            target="_blank"
          >
            <v-icon class="mr-2">mdi-github</v-icon> github
          </v-btn>
        </template>
        <template v-else-if="!mobile_search_active">
          <v-btn
            icon
            dark
            target="_blank"
            href="https://github.com/giray123/shortcutexpert"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn icon dark @click="mobileSearchClick">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mobile"
      v-model="drawer"
      absolute
      temporary
      dark
    >
      <v-list nav dark>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/prepare-application">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Create / Update</v-list-item-title>
            <v-list-item-subtitle>applications</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/shortcuts/shortcut-expert">
          <v-list-item-icon>
            <v-icon>mdi-keyboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Keyboard Shortcuts</v-list-item-title>
            <v-list-item-subtitle>for Shortcut Expert</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/favorites">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Favorites</v-list-item-title>
            <v-list-item-subtitle>backup and restore</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          target="_blank"
          href="https://github.com/giray123/shortcutexpert"
        >
          <v-list-item-icon>
            <v-icon>mdi-github</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Github</v-list-item-title>
            <v-list-item-subtitle>learn & contribute</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
  name: "Toolbar",
  components: { SearchBar },
  data() {
    return {
      drawer: false,
      mobile_search_active: false,
    };
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
    mobileSearchClick() {
      console.log("mobileSearchClick");
      this.mobile_search_active = true;
      this.$refs.searchbar.focus();
      // this.$refs.asdasd.$refs.searchbar.focus();
    },
  },
};
</script>
