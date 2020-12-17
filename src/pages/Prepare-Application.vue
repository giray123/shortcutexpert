<template>
  <Layout toolbar>
    <v-container>
      <v-row no-gutters style="padding-bottom: 400px;">
        <v-col cols="12" md="6" class="offset-md-3">
          <div class="mt-10">
            <h1 class="text-h4 mb-5 text-center">Prepare Application</h1>
            <p class="text-center mb-10">
              Here you can prepare a JSON file from your Google Sheets file.
              Details are on the
              <a
                href="https://github.com/giray123/shortcutexpert"
                target="_blank"
                >Github README</a
              >.
            </p>

            <h2 class="mt-10 mb-5">Input Data</h2>
            <v-text-field
              label="Application Name"
              outlined
              dense
              clearable
              class="mb-3"
              v-model="name"
              @input="nameChange"
              hint="Original application name, case sensitive"
              persistent-hint
              append-icon="mdi-restore"
              @click:append="restoreField('name')"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              clearable
              class="mb-3"
              prefix="https://shortcutexpert.com/shortcuts/"
              v-model="slug"
              hint="This will be the url of the application, you can fix it if necessary"
              persistent-hint
              append-icon="mdi-restore"
              @click:append="restoreField('slug')"
            ></v-text-field>
            <v-text-field
              label="Logo URL"
              outlined
              dense
              clearable
              class="mb-3"
              v-model="url_logo"
              hint="SVG is preffered, PNG and JPG is fine, no more than 20 KB please."
              persistent-hint
              append-icon="mdi-restore"
              @click:append="restoreField('url_logo')"
            ></v-text-field>
            <v-text-field
              v-model="url_app"
              label="Official Application URL (optional)"
              outlined
              dense
              clearable
              class="mb-3"
              hint="Application home page"
              persistent-hint
              append-icon="mdi-restore"
              @click:append="restoreField('url_app')"
            ></v-text-field>
            <v-text-field
              v-model="url_shortcuts"
              label="Official Application Shortcuts URL (optional)"
              outlined
              dense
              clearable
              class="mb-3"
              hint="Official shortcuts page of the application"
              persistent-hint
              append-icon="mdi-restore"
              @click:append="restoreField('url_shortcuts')"
            ></v-text-field>

            <sheets-fetcher
              class="mt-4"
              dense
              clearable
              :url_google_sheets.sync="url_google_sheets"
              @fetched="fetched"
              @clickRestore="restoreField('url_google_sheets')"
            ></sheets-fetcher>

            <p class="text-body-2 mt-5">
              You can test your Google Sheets file on
              <g-link to="/shortcuts/test-application"
                >Test Application Page
              </g-link>
            </p>

            <h2 class="mt-10 mb-5">JSON Output</h2>
            <p>
              Once your JSON file is ready, add it to
              <code>src/data/applications</code> and create a pull request on
              GitHub.
            </p>
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
var backup = {
  name: "",
  slug: "",
  url_logo: "",
  url_app: "",
  url_shortcuts: "",
  url_google_sheets:
    "https://docs.google.com/spreadsheets/d/1nAUtccgZI0IWuQCrGa5aIbspxoUEN8uTanRYJMI2PLE/edit?usp=sharing",
  operating_systems: [],
  copy_button_text: "",
};

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
  async mounted() {
    console.log(this.$route, "this.$route");
    if (this.$route.hash != "") {
      const slug = this.$route.hash.slice(1);
      try {
        const results = await this.$fetch(`/shortcuts/${slug}`);
        console.log(results, "results");

        backup = results.data.app;

        this.name = backup.name;
        this.slug = backup.slug;
        this.url_logo = backup.url_logo;
        this.url_app = backup.url_app;
        this.url_shortcuts = backup.url_shortcuts;
        this.url_google_sheets = backup.url_google_sheets;
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    nameChange() {
      if (!this.name || this.name == "") return;
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
    restoreField(field) {
      this[field] = backup[field];
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
