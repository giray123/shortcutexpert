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
.keyboard-icon{
  width: 30%;
}
</style>
