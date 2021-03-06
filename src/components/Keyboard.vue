<template>
  <div id="keyboard" :class="`keyboard_${layout}`">
    <div
      v-for="(rows, i) in keyboard"
      :key="'rows' + i"
      :class="'key-row row' + (parseInt(i) + 1)"
    >
      <!-- prettier-ignore-attribute -->
      <div
        v-for="(key, j) in rows.keys"
        :key="'key' + j"
        :class="
          `key ${key.class || ''} 
          ${highlight.includes(key.stroke) ? 'highlight' : ''}
          ${pressed.includes(key.stroke) ? 'pressed' : ''} 
          ${pressed.includes(key.stroke_shift) ? 'shift-pressed' : ''} 
          `
        "
        :style="`${key.style || ''}`"
        @click="clickKey(key || null, $event)"
      >
        <div
          v-for="(text, g) in key.texts"
          :key="'text' + g"
          :class="text.class"
          v-html="text.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
var layouts = {
  windows: require("../data/keyboards/keyboard-windows").layout,
  macos: require("../data/keyboards/keyboard-macos").layout,
  linux: require("../data/keyboards/keyboard-linux").layout,
};

export default {
  name: "keyboard",
  props: {
    pressed: { type: Array, default: () => [] },
    layout: { type: String, default: "macos" },
    highlight: { type: Array, default: () => [] },
  },
  watch: {
    layout: {
      immediate: true,
      handler() {
        this.changeLayout();
      },
    },
  },
  methods: {
    changeLayout() {
      this.keyboard = Object.assign({}, layouts[this.layout]);
    },
    clickKey(key, e) {
      if (e.shiftKey) {
        this.$emit("clickKey", key.stroke_shift || key.stroke);
      } else {
        this.$emit("clickKey", key.stroke);
      }
    },
  },
  data: () => ({
    keyboard: [
      {
        row: 6,
        keys: [
          { stroke: "ctrl2", texts: [{ name: "Ctrl", class: "key-text-sm" }] },
          { subkeys: [{}, { stroke: "▼", name: "▼", class: "key-text-sm" }] },
        ],
      },
    ],
  }),
};
</script>

<style scoped lang="scss">
$key-width: 6.3%;
$key-width-small: 5%;

#keyboard {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #c1c1c1;
  display: grid;
  grid-template-columns: 100%;
}
.keyboard_windows,
.keyboard_linux {
  grid-template-rows: 1fr, repeat(5, 2fr);
  grid-gap: 0.6vw;
  padding: 0.8%;
}
.keyboard_macos {
  grid-template-rows: repeat(5, 2fr) repeat(2, 1fr);
  grid-gap: 0.4vw;
  padding: 0.8%;
}
.key-row {
  display: grid;
}
.keyboard_windows .key-row,
.keyboard_linux .key-row {
  grid-gap: 0.8%;
  grid-template-rows: 1fr;
}
.keyboard_macos .key-row {
  grid-gap: 0.7%;
  grid-template-rows: 1fr;
}
.keyboard_windows .row1,
.keyboard_linux .row1 {
  grid-template-columns: repeat(16, 1fr);
}
.keyboard_windows .row2,
.keyboard_linux .row2 {
  grid-template-columns: repeat(13, $key-width) auto;
}
.keyboard_windows .row3,
.keyboard_linux .row3 {
  grid-template-columns: auto repeat(12, $key-width) $key-width-small;
}
.keyboard_windows .row4,
.keyboard_linux .row4 {
  grid-template-columns: auto repeat(11, $key-width) auto;
}
.keyboard_windows .row5,
.keyboard_linux .row5 {
  grid-template-columns: auto repeat(10, $key-width) auto;
}
.keyboard_windows .row6,
.keyboard_linux .row6 {
  grid-template-columns: repeat(3, $key-width) 7% auto 7% repeat(4, $key-width);
}

.keyboard_macos .row1 {
  grid-template-columns: auto repeat(13, $key-width);
}
.keyboard_macos .row2 {
  grid-template-columns: repeat(13, $key-width) auto;
}
.keyboard_macos .row3 {
  grid-template-columns: auto repeat(13, $key-width);
}
.keyboard_macos .row4 {
  grid-template-columns: auto repeat(11, $key-width) auto;
}
.keyboard_macos .row5 {
  grid-template-columns: auto repeat(10, $key-width) auto;
}
.keyboard_macos .row6,
.keyboard_windows .row6,
.keyboard_linux .row6 {
  grid-template-columns: repeat(3, $key-width) 7% auto 7% repeat(4, $key-width);
  /* span 2 row on parent */
  grid-row-end: span 2;
  /* divide into 2 rows for childs */
  grid-template-rows: 1fr 1fr;
}
.keyboard_macos .row6 .key,
.keyboard_windows .row6 .key,
.keyboard_linux .row6 .key {
  /* last row has two rows make all default keys span 2 rows */
  grid-row-end: span 2;
}

.key {
  font-family: Helvetica;
  // font-weight: bold;
  display: flex;
  align-items: stretch;
  justify-content: center;
  color: #c1c1c1;
  text-align: center;
  border-radius: 6px;
  padding: 0.1vw 0.3vw;
  flex-flow: column;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.key .div {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.keyboard_windows .key-row .key,
.keyboard_linux .key-row .key {
  border: 1px solid #000000;
  background-color: rgb(49, 49, 49);
  font-size: 1vw;
}
.keyboard_macos .key-row .key {
  border: 1px solid #d2d2d2;
  background-color: white;
  font-size: 1vw;
}
.keyboard_windows .key-row .key:hover,
.keyboard_linux .key-row .key:hover {
  background-color: black;
  cursor: pointer;
}
.keyboard_macos .key-row .key:hover {
  background-color: whitesmoke;
  cursor: pointer;
}
.key > div {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.keyboard_macos .key-row .key.highlight {
  background-color: #dddddd;
  border-color: #b9b9b9;
  color: #ffffff;
}
.keyboard_windows .key-row .key.highlight,
.keyboard_linux .key-row .key.highlight {
  background-color: rgb(110, 110, 110);
  border-color: rgb(65, 65, 65);
}
.keyboard_windows .key-row .key.pressed,
.keyboard_linux .key-row .key.pressed {
  font-weight: bold;
  border-color: #128ef1;
  background-color: #2196f3;
}
.keyboard_windows .key-row .key.pressed:hover,
.keyboard_linux .key-row .key.pressed:hover {
  border-color: #266ca1;
  background-color: #4292d4;
}
.keyboard_macos .key-row .key.pressed {
  font-weight: bold !important;
  border-color: #42a1ec !important;
  background-color: #51a9ef !important;
}
.keyboard_macos .key-row .key.pressed:hover {
  border-color: #266ca1 !important;
  background-color: #4292d4 !important;
}
.key-row .key.pressed > div:nth-child(1) {
  color: #9cd0f8;
}
.key-row .key.pressed > div:nth-child(2),
.key-row .key.pressed > div:only-child {
  font-weight: bold;
  color: white;
}
.key-row .key.shift-pressed {
  font-weight: bold !important;
  border-color: #dfa151 !important;
  background-color: #e0a455 !important;
  color: white !important;
}
.key-row .key.shift-pressed:hover {
  border-color: #b4803b !important;
  background-color: #d4994b !important;
}
.key-row .key.shift-pressed > div:nth-child(1) {
  color: white;
}
.key-row .key.shift-pressed > div:nth-child(2) {
  font-weight: bold;
  color: #f5cb94;
}
.key-row .key.pressed:hover {
  background-color: #409ce7;
  color: white;
}
.key-row .key.shift-pressed:hover {
  background-color: #d69a4c;
  color: white;
}

.key-text-sm {
  font-size: 0.7vw;
}
.key-text-xs {
  font-size: 0.5vw;
}
.key-text-top {
  align-items: flex-start !important;
}
.key-text-bottom {
  align-items: flex-end !important;
}
.key-text-right {
  justify-content: flex-end !important;
}
.key-text-left {
  justify-content: flex-start !important;
}
.border-radius-bottom-none {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.border-radius-top-none {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

@media only screen and (max-width: 1264px) {
  #keyboard {
    border-radius: 5px;
    height: auto;
  }
  .key {
    border-radius: 3px;
  }
  .key-row .key {
    font-size: 1.6vw !important;
  }
  .key-text-sm {
    font-size: 1.2vw !important;
  }
  .key-text-xs {
    font-size: 0.8vw !important;
  }
}
</style>
