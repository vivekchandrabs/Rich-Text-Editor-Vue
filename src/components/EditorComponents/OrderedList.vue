<template>
    <div style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">

       <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
      <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

          <ol
              v-on:keyup="store_item_info($event, item_id)" 
              :ref="'focus_ref'+item_id"
              v-html="local_item_info"
              class="ordered-list"
              contenteditable=true>
          </ol>
      
    </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";
import ContextMenu from "./ContextMenu";

export default {
  name: "OrderedList",
  props: ["item_id", "item_info"],

  data() {
    return {
      local_item_info: this.item_info,
      displayDragger: 0
    };
  },
  components: {
    DraggerButton,
    ContextMenu
  },
  methods: {
    store_item_info(event, item_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["info"] = event.target.innerHTML;

      this.$store.dispatch("on_info_change", json_data);
    },

    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    }
  },
  mounted() {
    let focus_element = `focus_ref${this.item_id}`;
    this.$refs[focus_element].focus();
  }
};
</script>

<style scoped>

</style>
