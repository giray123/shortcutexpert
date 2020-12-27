<script>
const se = require("../helpers/shortcut-expert");

export default {
  methods: {
    updateNameChange() {
      this.name = this.form_update.name;
      this.form_update.slug = se.slugify(this.form_update.name);
    },
    updateLogoChange() {
      this.url_logo = this.form_update.url_logo;
    },
    updateAppURLChange() {
      this.url_app = this.form_update.url_app;
    },
    updateAppShortcutsURLChange() {
      this.url_shortcuts = this.form_update.url_shortcuts;
    },
    restoreField(name) {
      this.form_update[name] = this.$page.app[name];
      this[name] = this.$page.app[name];
    },
    download() {
      const json = JSON.stringify(
        {
          name: this.form_update.name,
          slug: this.form_update.slug,
          url_logo: this.form_update.url_logo,
          url_app: this.form_update.url_app,
          url_shortcuts: this.form_update.url_shortcuts,
          url_google_sheets: this.form_update.url_google_sheets,
          operating_systems: this.$page.app.operating_systems,
        },
        null,
        2
      );
      var blob = new Blob([json], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.download = `${this.form_update.slug}.json`;
      a.href = url;
      a.textContent = "Download backup file";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
    },
  },
};
</script>
