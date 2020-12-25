<template>
  <Layout toolbar>
    <v-container fluid class="pa-0">
      <v-row no-gutters :style="{ 'min-height': '100vh' }">
        <v-col
          cols="12"
          md="8"
          offset-md="2"
          lg="6"
          offset-lg="3"
          xl="4"
          offset-xl="4"
          class="pa-3"
        >
          <div class="mt-10">
            <h1 class="text-xs-h4 text-sm-h3 text-center mb-10 text-center">
              Favorites
            </h1>

            <div>
              <p class="text-justify">
                Shortcut Expert does not have a user login system. It saves user
                favorites to the browser memory. Therefore, favorites can not be
                synced between different browsers and devices.
              </p>
              <p class="text-justify">
                However, you can download your favorites as a JSON file, and
                upload it to another browser / device. When you upload it to
                another browser / device, the existing shortcuts in the memory
                will be merged with the uploaded favorites. So, if you want a
                clean start, do not forget to clear the memory before the
                upload.
              </p>

              <div class="text-center">
                <v-btn
                  color="primary"
                  block
                  large
                  class="my-6"
                  @click="download"
                  >download favorites</v-btn
                >
                <v-btn color="success" block large class="my-6" @click="upload"
                  >upload & merge favorites</v-btn
                >
                <input
                  ref="file_upload"
                  class="d-none"
                  type="file"
                  accept=".json"
                  @change="onFileChanged"
                />

                <v-dialog v-model="dialog" max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="error"
                      v-bind="attrs"
                      v-on="on"
                      text
                      block
                      large
                      class="my-6"
                      >clear browser memory
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      Are you sure?
                    </v-card-title>
                    <v-card-text>
                      This will permenantly delete all saved favorites from the
                      memory of your browser.
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" text @click="dialog = false">
                        NO
                      </v-btn>
                      <v-btn color="success" text @click="clear">
                        YES
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <snackbar ref="snackbar" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Snackbar from "../components/Snackbar";

export default {
  name: "Favorites",
  metaInfo: {
    title: "Shortcut Expert | Favorites",
    description:
      "Learn how shortcut favorites work in Shortcit Expert. You can download your shortcuts to upload & merge into another browser / device. Additionally, you can clear the memory of all favorites.",
  },
  components: { Snackbar },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    download() {
      var local_favorites = localStorage.getItem("favorites");
      if (!local_favorites) {
        console.error("No local favorites found!");
        return;
      }
      var local_favorites = JSON.parse(local_favorites);
      var file_text = JSON.stringify(local_favorites, null, 2);

      var blob = new Blob([file_text], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.download = `deneme.json`;
      a.href = url;
      a.textContent = "Download backup file";
      a.classList.add("d-none");
      document.body.appendChild(a);
      a.click();
    },
    upload() {
      this.$refs.file_upload.click();
    },
    onFileChanged(e) {
      let file = this.$refs.file_upload.files[0];
      console.log(file.type, "file.type");
      if (!file || file.type !== "application/json") {
        console.error("No file found");
        return;
      }

      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = (evt) => {
        let json = JSON.parse(evt.target.result);
        console.log(json, "file contents");

        // merge with local memory
        var local_favorites = localStorage.getItem("favorites");
        if (local_favorites) {
          local_favorites = JSON.parse(local_favorites);
          for (const key in json) {
            if (!local_favorites[key] || local_favorites[key] == []) {
              local_favorites[key] = json[key];
            } else {
              local_favorites[key] = [
                ...new Set(local_favorites[key].concat(json[key])),
              ];
            }
          }
        } else {
          local_favorites = json;
        }
        localStorage.setItem("favorites", JSON.stringify(local_favorites));
        this.$refs.snackbar.show({
          icon: "success",
          html: "Saved!",
        });

        // if we dont do this it will not trigger if same file is selected twice
        this.$refs.file_upload.value = "";
      };

      reader.onerror = (evt) => {
        console.error(evt);
      };
    },
    clear() {
      localStorage.removeItem("favorites");
      this.dialog = false;
      this.$refs.snackbar.show({
        icon: "success",
        html: "Cleared!",
      });
    },
  },
};
</script>
