<template>
  <Layout>
    <v-container>
      <v-row no-gutters fill-height>
        <v-col cols="12" md="6" class="offset-md-3">
          <div class="mt-10">
            <div class="mt-10 mb-5">
              <router-link to="/">
                <v-img
                  alt="Shortcut Expert Logo"
                  class="mx-auto"
                  contain
                  :src="require('@/assets/img/logo.svg')"
                  width="400"
                />
              </router-link>
            </div>

            <v-card elevation="5" shaped max-width="400" class="mx-auto">
              <v-img
                alt="Shortcut Expert Logo"
                class="mx-auto"
                contain
                :src="require('@/assets/img/404.jpg')"
                width="100%"
              />
            </v-card>
            <h1 class="text-h4 text-center mt-10 mb-3">404 | Not Found</h1>
            <p class="mb-10 text-center text-body-2 grey--text">
              The page you are looking for does not exist.
            </p>
            <div class="text-center">
              <v-btn text color="primary" to="/">
                <v-icon class="mr-2">mdi-arrow-left</v-icon> go home
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
export default {
  name: "Not Found 404 ",
  metaInfo() {
    return {
      title: `404 Not Found`,
      meta: [
        {
          key: "title",
          name: "title",
          content: `404 Not Found`,
        },
        {
          key: "og:title",
          name: "og:title",
          content: `404 Not Found`,
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: `404 Not Found`,
        },
        {
          key: "description",
          name: "description",
          content: `The page you are looking for does not exist.`,
        },
        {
          key: "og:description",
          name: "og:description",
          content: `The page you are looking for does not exist.`,
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: `The page you are looking for does not exist.`,
        },
      ],
    };
  },
};</script
>script
