<template>
    <div style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">

        <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
        <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

        <h3 contenteditable=true
            data-placeholder="this is the heading"
            v-on:keyup="store_item_info($event, item_id)"
            class="list-item" 
            >
            {{item_info}}
        </h3>
    </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";
import ContextMenu from "./ContextMenu";

export default {
  name: "Heading_3",
  props: ["item_id", "item_info"],
  data() {
    return {
      displayDragger: 0
    };
  },
  components: {
    DraggerButton,
    ContextMenu
  },

  methods: {
    // Gets triggered when the h3 tag is dragged
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },

    // Gets triggered when the h3 tag content is changed
    store_item_info(event, item_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["info"] = event.target.innerHTML;

      this.$store.dispatch("on_info_change", json_data);
    }
  }
};
</script>

<style scoped>
</style>