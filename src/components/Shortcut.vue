<template>
  <v-tooltip top :disabled="!shortcut.info">
    <template v-slot:activator="{ on, attrs }">
      <div
        class="shortcut mx-1"
        :class="[shortcut.active ? 'active' : '', extraClasses]"
        v-bind="attrs"
        v-on="{ ...on, ...$listeners }"
      >
        <div
          v-for="(stroke, i) in shortcut.strokes"
          :key="'stroke' + i"
          class="time"
          :class="{ active: stroke.active }"
        >
          <v-icon
            small
            color="light-blue lighten-1"
            v-if="i !== 0 && stroke.mode == 'now'"
            >mdi-plus</v-icon
          >
          <v-icon
            small
            color="green"
            v-else-if="i !== 0 && stroke.mode == 'next'"
            class="mx-1"
            >mdi-arrow-right</v-icon
          >
          <v-icon
            small
            color="pink lighten-2"
            v-else-if="i !== 0 && stroke.mode == 'reset'"
            class="mx-2"
            >mdi-arrow-expand-right</v-icon
          >

          <div class="key">
            {{ stroke.text | textToSymbol(symbol_display) }}
          </div>
        </div>
        <v-avatar
          v-if="shortcut.info"
          class="shortcut-info"
          color="red lighten-2"
          size="20"
          top
          right
        >
          <v-icon small color="white">mdi-information-variant</v-icon></v-avatar
        >
      </div>
    </template>
    <span>{{ shortcut.info }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "shortcut",
  inheritAttrs: false,
  props: {
    shortcut: { type: Object, required: true },
    extraClasses: { type: String, default: "" },
    symbol_display: { type: Boolean, default: true },
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.shortcut {
  background-color: white;
  display: inline-block;
  position: relative;
  border-radius: 5px;
  color: gray;
  padding: 0px 2px;
  font-weight: bold;
  border: 5px solid transparent;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.shortcut.active {
  box-shadow: 0px 0px 0px 4px rgb(66, 199, 66);
}
.shortcut:hover {
  cursor: pointer;
  background-color: rgb(219, 219, 219);
}
.time {
  display: inline-block;
}
.key {
  display: inline-block;
  border-radius: 3px;
  padding: 3px 10px;
  background-color: rgb(65, 65, 65);
  color: white;
  margin: 0px 3px;
}
.time.active .key {
  background-color: rgb(89, 212, 89);
  color: white;
}
.shortcut-info {
  position: absolute;
  top: -14px;
  right: -14px;
}
</style>
