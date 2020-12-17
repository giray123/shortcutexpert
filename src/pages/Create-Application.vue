<template>
  <Layout toolbar>
    <v-container>
      <v-row no-gutters style="padding-bottom: 400px;">
        <v-col cols="12" md="6" class="offset-md-3">
          <div class="mt-10">
            <h1 class="text-h4 mb-5 text-center">Create Application</h1>
            <p class="text-center mb-10">
              Here you can create a JSON file from your Google Sheets file.
              Details are on the
              <a
                href="https://github.com/giray123/shortcutexpert"
                target="_blank"
                >Github README</a
              >
            </p>

            <h2 class="mt-10 mb-5">Input Data</h2>
            <v-text-field
              label="Application Name"
              outlined
              v-model="name"
              @input="nameChange"
              hint="Original application name, case sensitive"
              persistent-hint
            ></v-text-field>
            <v-text-field
              outlined
              prefix="https://shortcutexpert.com/shortcuts/"
              v-model="slug"
              hint="This will be the url of the application, you can fix it if necessary"
              persistent-hint
            ></v-text-field>
            <v-text-field
              label="Logo URL"
              outlined
              v-model="url_logo"
              hint="SVG is preffered, PNG and JPG is fine, no more than 20 KB please."
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="url_app"
              label="Official Application URL (optional)"
              outlined
              hint="Application home page"
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="url_shortcuts"
              label="Official Application Shortcuts URL (optional)"
              outlined
              hint="Official shortcuts page of the application"
              persistent-hint
            ></v-text-field>

            <sheets-fetcher
              class="mt-4"
              :url_google_sheets.sync="url_google_sheets"
              @fetched="fetched"
            ></sheets-fetcher>

            <h2 class="mt-10 mb-5">JSON Output</h2>
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
