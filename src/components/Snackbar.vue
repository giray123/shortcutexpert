<template>
  <v-snackbar v-model="open" :timeout="timeout">
    <div class="d-flex align-center justify-between">
      <v-icon class="d-inline-block" v-if="icon != ''" :color="icon">
        {{ icons[icon] }}
      </v-icon>
      <div v-html="html" class="ml-3 d-inline-block"></div>
      <!-- <v-btn color="pink" text @click="$emit('update:open', false)">
        Close
      </v-btn> -->
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="open = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",
  data() {
    return {
      icons: {
        success: "mdi-check",
        error: "mdi-alert-circle-outline",
        info: "mdi-information-outline",
      },
      open: false,
      timeout: 2000,
      icon: "",
      html: "",
    };
  },
  methods: {
    show({ icon, html, timeout = 5000 }) {
      console.log("activate");
      this.timeout = timeout;
      this.icon = icon;
      this.html = html;
      this.open = true;
    },
    hide() {
      this.open = false;
      this.timeout = 5000;
      this.icon = "";
      this.html = "false";
    },
  },
};
</script>
