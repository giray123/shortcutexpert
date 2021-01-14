<template>
  <router-view :key="$route.path" />
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
};
</script>

<style>
.full-width {
  width: 100%;
}
#nprogress .bar {
  background: rgb(238, 47, 47) !important;
}
.keyboard-icon {
  width: 30%;
}

/* https://codepen.io/devstreak/pen/dMYgeO */

/* style-2 */

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #ffffff;
}

*::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  background-color: #ffffff;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #888;
}
</style>
