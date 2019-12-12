<template>
  <div style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">

       <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

      <p      
          contenteditable=true
          data-placeholder="this is the heading"
          v-on:keyup="store_item_info($event, item_id)"
          class="list-item" >
          {{item_info}}
      </p>
  </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";

export default {
  name: "Quote",
  props: ["item_id", "item_info"],
  data() {
    return {
      element_array: this.item_info,
      displayDragger: 0
    };
  },
  components: {
    DraggerButton
  },
  methods: {
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },
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
p {
  border-left: 2px solid black;
}
</style>
