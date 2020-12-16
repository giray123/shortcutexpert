<template>
  <v-list dark class="transparent pa-0">
    <v-list-item
      three-line
      v-for="(item, j) in list"
      :key="item.id"
      v-show="!item.hidden"
      @click="$emit('clickListItem', j)"
      class="shortcut_list_item"
      :class="{ 'blue-grey darken-2': item.selected }"
    >
      <v-list-item-content>
        <v-list-item-title style="white-space: normal;">{{
          item.name
        }}</v-list-item-title>
        <v-list-item-subtitle class="mt-1" style="white-space: normal;">{{
          item.description
        }}</v-list-item-subtitle>
        <v-list-item-subtitle style="overflow: visible;">
          <shortcut
            v-for="(shortcut, g) in item.shortcuts"
            :key="'shortcut' + g"
            :shortcut="shortcut"
            :extra-classes="'mt-2 mr-3 mb-2'"
            :symbol_display="symbol_display"
            @click.stop="$emit('clickShortcut', j, g)"
          />
        </v-list-item-subtitle>
      </v-list-item-content>

      <!-- <v-list-item-action>
        <v-btn icon>
          <v-icon
            :color="item.favorite ? 'amber accent-3' : 'grey darken-1'"
            @click.stop="item.favorite = !item.favorite"
            >{{ item.favorite ? "mdi-star" : "mdi-star-outline" }}</v-icon
          >
        </v-btn>
      </v-list-item-action> -->
    </v-list-item>
  </v-list>
</template>

<script>
import Shortcut from "./Shortcut";
export default {
  name: "shortcut-list",
  components: {
    Shortcut,
  },
  props: {
    list: { type: Array, default: () => [] },
    symbol_display: { type: Boolean, default: true },
  },
  data: () => ({}),
};
</script>
