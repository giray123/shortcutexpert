<template>
  <div>
    <v-app-bar app flat color="blue darken-1">
      <template v-if="!mobile_search_active">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          v-if="$vuetify.breakpoint.mobile"
        ></v-app-bar-nav-icon>

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
          solo
          flat
          dense
          :style="{ width: $vuetify.breakpoint.mobile ? '100%' : '500px' }"
        />
        <v-btn
          text
          dark
          class="px-5 d-md-none"
          @click="mobile_search_active = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- keyboard layout selector -->

      <!-- provile button -->
      <v-toolbar-items>
        <template v-if="!$vuetify.breakpoint.mobile">
          <v-btn dark text class="px-5" to="/contribute">
            contribute
          </v-btn>
          <v-btn dark text class="px-5" to="/about">
            about
          </v-btn>
        </template>
        <template v-else-if="!mobile_search_active">
          <v-btn icon dark class="px-5" @click="mobile_search_active = true">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item to="/contribute">
          <v-list-item-title>Contribute</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-title>About</v-list-item-title>
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
  },
};
</script>
