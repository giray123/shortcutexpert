<template>
  <Layout toolbar>
    <v-container>
      <v-row no-gutters class="text-center">
        <v-col cols="12" md="6" class="offset-md-3">
          <div class="mt-10">
            <h1 class="text-h4 mb-10">Contribute</h1>

            <v-text-field
              label="Application Name"
              outlined
              dense
              v-model="name"
              @input="nameChange"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              prefix="https://shortcutexpert.com/shortcuts/"
              v-model="slug"
            ></v-text-field>
            <v-text-field
              label="Logo URL"
              outlined
              dense
              v-model="url_logo"
            ></v-text-field>
            <v-text-field
              v-model="url_app"
              label="Official Application URL (optional)"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="url_shortcuts"
              label="Official Application Shortcuts URL (optional)"
              outlined
              dense
            ></v-text-field>

            <sheets-fetcher
              :url_google_sheets.sync="url_google_sheets"
              @fetched="fetched"
            ></sheets-fetcher>

            <div
              class="blue-grey darken-3 white--text rounded-lg"
              style="position: relative;"
            >
              <div class="d-flex justify-space-between align-center pa-3">
                <div class="grey--text text-caption">{{ slug }}.json</div>
                <div>
                  <v-btn
                    :text="!!copy_button_text"
                    :icon="!copy_button_text"
                    dark
                    @click="copy"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                    <span v-show="!!copy_button_text" class="ml-2">{{
                      copy_button_text
                    }}</span>
                  </v-btn>
                  <v-btn icon dark @click="download" class="ml-2">
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </div>
              </div>
              <pre
                v-text="json"
                class="text-left px-10 pb-10"
                style="max-height: 500px; overflow: auto;"
              ></pre>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import SheetsFetcher from "../components/SheetsFetcher";
const se = require("../helpers/shortcut-expert");

export default {
  name: "Submit",
  metaInfo: {
    title: "Shortcut Expert | Contribute",
    description:
      "Add your application shortcuts, create different operating systems or keyboard layouts. Completely open source!",
  },
  components: { SheetsFetcher },
  data() {
    return {
      name: "",
      slug: "",
      url_logo: "",
      url_app: "",
      url_shortcuts: "",
      url_google_sheets:
        "https://docs.google.com/spreadsheets/d/1xGfSrETQto0kA-FGxeooDb08nuwHcO_THZ8H0DcyCQE/edit#gid=1240391001",
      operating_systems: [],
      copy_button_text: "",
    };
  },
  methods: {
    nameChange() {
      this.slug = se.slugify(this.name);
    },
    fetched(operating_systems) {
      this.operating_systems = operating_systems;
    },
    copy() {
      this.$copyText(this.json).then(
        (e) => {
          this.copy_button_text = "Copied!";
          setTimeout(() => {
            this.copy_button_text = null;
          }, 1000);
          console.log(e);
        },
        (e) => {
          console.log(e);
        }
      );
    },
    download() {
      var blob = new Blob([this.json], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.download = `${this.slug}.json`;
      a.href = url;
      a.textContent = "Download backup file";
      a.classList.add("d-none");
      document.body.appendChild(a);
      a.click();
    },
  },
  computed: {
    json() {
      return JSON.stringify(
        {
          name: this.name,
          slug: this.slug,
          url_logo: this.url_logo,
          url_app: this.url_app,
          url_shortcuts: this.url_shortcuts,
          url_google_sheets: this.url_google_sheets,
          operating_systems: this.operating_systems,
        },
        null,
        2
      );
    },
  },
};
</script>
