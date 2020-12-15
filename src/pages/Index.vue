<template>
  <Layout>
    <v-container fluid class="text-center pa-0">
      <v-row
        no-gutters
        style="min-height:100vh;
        background-image: url(http://localhost:8080/assets/img/home-main.svg);
        background-position: right bottom;"
      >
        <v-col cols="12" class="text-center">
          <div class="mt-10">
            <router-link to="/">
              <v-img
                alt="Vuetify Name"
                class="mx-auto"
                contain
                :src="require('@/assets/img/logo.svg')"
                width="400"
              />
            </router-link>
          </div>

          <div class="mt-10">
            <h1 class="text-xs-h4 text-sm-h3 text-md-h2 text-lg-h1 text-center">
              All Shortcuts in One Place
            </h1>
          </div>

          <div class="mt-10" style="position: relative;">
            <search-bar
              solo
              style="width:500px; max-width:90%;"
              class="mx-auto"
            />
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters class="blue darken-1" style="min-height:100vh;">
        <v-col
          cols="12"
          md="6"
          order="2"
          order-md="1"
          class="white--text d-flex justify-end align-center pa-10"
        >
          <div>
            <h2 class="text-xs-h4 text-sm-h3 text-md-h2 mb-10">
              Users are happy!
            </h2>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60">mdi-rocket-launch-outline</v-icon>
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">Best User Experience</h3>
                  <p class="ma-0 mt-1">
                    because they can find shortcuts very fast
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
                    because UI & standardization matters
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
                    because they can favorite shortcuts and reach all app
                    shortcuts from one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          order="1"
          order-md="2"
          class="d-flex justify-start align-center pa-10"
        >
          <v-img
            :position="$vuetify.breakpoint.mobile ? 'center' : 'left'"
            alt="Vuetify Name"
            contain
            max-height="500px"
            :src="require('@/assets/img/character-7.svg')"
          />
        </v-col>
      </v-row>

      <v-row no-gutters style="min-height:100vh;">
        <v-col
          cols="12"
          md="6"
          class="white--text d-flex justify-end align-center pa-10"
        >
          <v-img
            :position="$vuetify.breakpoint.mobile ? 'center' : 'right'"
            alt="developer"
            contain
            max-height="500px"
            :src="require('@/assets/img/home-developer.svg')"
          />
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-start align-center pa-10">
          <div>
            <h2 class="text-xs-h4 text-sm-h3 text-md-h2 mb-10">
              Developers are happy!
            </h2>

            <div class="d-flex justify-start align-center text-left">
              <div class="d-flex justify-center align-center pa-8">
                <v-icon size="60" color="blue darken-1"
                  >mdi-cloud-upload-outline</v-icon
                >
              </div>
              <div class="d-flex justify-center align-center">
                <div>
                  <h3 class="text-h5">Easier to create</h3>
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
                  <h3 class="text-h5">Fast & SEO Friendly</h3>
                  <p class="ma-0 mt-1">
                    beacuse each app page is distributed completely static with
                    CDNs
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
import SearchBar from "../components/SearchBar";

export default {
  name: "Index",
  metaInfo: {
    title: "Shortcut Expert | All Shortcuts in One Place",
    description:
      "Best way to learn application shortcuts. You can create your own shortcuts and keyboard layouts for your application. Completely open source!",
  },
  components: {
    SearchBar,
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
