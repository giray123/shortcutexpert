<template>
  <!-- <Layout>
    <g-image alt="Example image" src="~/favicon.png" width="135" />

    <h1>Home</h1>

    <h2>Applications</h2>
    <div v-for="edge in $page.applications.edges" :key="edge.node.appname">
      <g-link :to="'/shortcuts/' + edge.node.slug">{{ edge.node.name }}</g-link>
    </div>
  </Layout>  -->
  <Layout>
    <v-container fluid class="text-center pa-0">
      <v-row
        no-gutters
        style="height: 100vh;"
        class="d-flex flex-column justify-center align-center"
      >
        <div>
          <router-link to="/">
            <v-img
              alt="Vuetify Name"
              contain
              :src="require('@/assets/img/logo.svg')"
              width="400"
            />
          </router-link>
        </div>

        <div class="mt-10">
          <h1 class="text-h1">All Shortcuts in One Place</h1>
        </div>

        <div class="mt-10" style="width: 50%;">
          <search-bar solo class="mx-10" />
        </div>

        <div style="margin-top: 80px;">
          <keyboard :pressed="['s', 'E']" layout="macos" />
        </div>
      </v-row>

      <v-row
        no-gutters
        style="height: 100vh;"
        class="blue darken-1 d-flex justify-center align-stretch"
      >
        <v-col class="white--text d-flex justify-end align-center pa-10">
          <div>
            <h2 class="text-h2 mb-10">Users are happy!</h2>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60">mdi-rocket-launch-outline</v-icon>
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">Best User Experience</h3>
                  <p class="ma-0 mt-1">
                    because they can filter shortcuts by name, stroke or group
                  </p>
                </div>
              </div>
            </div>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60">mdi-brain</v-icon>
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">Easier to learn</h3>
                  <p class="ma-0 mt-1">
                    because graphical interface + animations is more memorable
                  </p>
                </div>
              </div>
            </div>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60">mdi-cloud-outline</v-icon>
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">Accessible</h3>
                  <p class="ma-0 mt-1">
                    because they can favorite shortcuts and reach all apps from
                    one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="d-flex justify-start align-center pa-10">
          <div>
            <v-img
              alt="Vuetify Name"
              contain
              :src="require('@/assets/img/home-user.svg')"
              width="500"
            />
          </div>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        style="height: 100vh;"
        class="d-flex justify-center align-stretch"
      >
        <v-col class="d-flex justify-end align-center pa-10">
          <div>
            <v-img
              alt="Vuetify Name"
              contain
              :src="require('@/assets/img/home-developer.svg')"
              width="500"
            />
          </div>
        </v-col>
        <v-col class="d-flex justify-start align-center pa-10">
          <div>
            <h2 class="text-h2 mb-10">Developers are happy!</h2>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60" color="blue darken-1"
                  >mdi-cloud-upload-outline</v-icon
                >
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">Easier to distribute</h3>
                  <p class="ma-0 mt-1">
                    because it takes 2 minutes to create a shortcuts page for
                    any application
                  </p>
                </div>
              </div>
            </div>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60" color="blue darken-1"
                  >mdi-archive-outline</v-icon
                >
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">Easier to maintain</h3>
                  <p class="ma-0 mt-1">
                    because they don't have to update documentation for each
                    change
                  </p>
                </div>
              </div>
            </div>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60" color="blue darken-1"
                  >mdi-chart-bell-curve</v-icon
                >
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">User Analytics</h3>
                  <p class="ma-0 mt-1">
                    beacuse they can check which shortcuts are in demand!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>
query {
  applications: allApplications {
    edges {
      node {
        name
        slug
      }
    }
  }
}
</page-query>

<script>
import Keyboard from "../components/Keyboard";
import SearchBar from "../components/SearchBar";

export default {
  name: "Index",
  metaInfo: {
    title: "Shortcut Expert | All Shortcuts in One Place",
    description:
      "Best way to learn application shortcuts. You can create your own shortcuts and keyboard layouts for your application. Completely open source!",
  },
  components: {
    Keyboard,
    SearchBar,
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
