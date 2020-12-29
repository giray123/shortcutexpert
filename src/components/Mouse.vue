<template>
  <div id="wrapper">
    <div id="body">
      <div
        id="left"
        :class="{
          highlight: pressed.find((v) =>
            v.match(/(left mouse click|double click)/)
          ),
        }"
        @click="clickMouse('left mouse click')"
      ></div>
      <div
        id="right"
        :class="{
          highlight: pressed.find((v) => v.match(/right mouse click/)),
        }"
        @click="clickMouse('right mouse click')"
      ></div>
      <div id="bottom"></div>
      <div id="scroll_wrapper">
        <div id="scroll" @click.self="clickMouse('mouse scroll')">
          <div
            id="scroll_top"
            :class="{
              highlight:
                pressed.includes('mouse scroll') ||
                pressed.includes('mouse scroll up'),
            }"
            @click="clickMouse('mouse scroll up')"
          ></div>
          <div
            id="scroll_bottom"
            :class="{
              highlight:
                pressed.includes('mouse scroll') ||
                pressed.includes('mouse scroll down'),
            }"
            @click="clickMouse('mouse scroll down')"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mouse",
  props: {
    pressed: { type: Array, default: () => [] },
  },
  methods: {
    clickMouse(value) {
      console.log("clickMouse");
      this.$emit("clickMouse", value);
    },
  },
};
</script>

<style scoped>
#wrapper {
  /* background-color: orange; */
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 10px;
}
#body {
  height: 100%;
  padding: 10px;
  position: relative;
}
#left {
  position: absolute;
  width: 50%;
  height: 45%;
  top: 0;
  left: 0;
  border: 5px solid #c1c1c1;
  /* background-color: blue; */
  border-radius: 50% 0px 0px 0px;
  z-index: 1;
}
#right {
  position: absolute;
  width: 50%;
  height: 45%;
  top: 0;
  right: 0;
  border: 5px solid #c1c1c1;
  /* background-color: pink; */
  border-radius: 0px 50% 0px 0px;
  z-index: 1;
}
#left:hover,
#right:hover {
  background-color: whitesmoke;
  cursor: pointer;
}
#bottom {
  position: absolute;
  width: 100%;
  height: 57%;
  bottom: 0;
  left: 0;
  border-radius: 0px 0px 50% 50%;
  border: 5px solid #c1c1c1;
  border-top-color: transparent;
  /* background-color: cyan; */
}
#scroll_wrapper {
  /* background-color: green; */
  position: absolute;
  height: 18%;
  width: 16%;
  top: 10%;
  left: 42%;
  z-index: 2;
}
#scroll {
  background-color: #c1c1c1;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 30%;
  overflow: hidden;
  border: 5px solid #c1c1c1;
}
#scroll:hover {
  border-color: #afafaf;
  cursor: pointer;
}
#scroll_top {
  /* background-color: red; */
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0;
  left: 0;
}
#scroll_bottom {
  /* background-color: orange; */
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  left: 0;
}
#scroll_top:hover,
#scroll_bottom:hover {
  background-color: #b6b6b6;
  cursor: pointer;
}
.highlight {
  border-color: #42a1ec !important;
  background-color: #51a9ef !important;
}
.highlight:hover {
  border-color: #266ca1 !important;
  background-color: #4292d4 !important;
}
</style>
