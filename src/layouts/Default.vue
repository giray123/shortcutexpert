<template>
  <v-app>
    <toolbar v-if="toolbar" />
    <v-main :class="{ fullheight: fullheight }">
      <slot />
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Toolbar from "../components/Toolbar";
export default {
  components: { Toolbar },
  props: {
    toolbar: { type: Boolean, default: false },
    fullheight: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
.fullheight {
  height: 100vh;
}
</style>
