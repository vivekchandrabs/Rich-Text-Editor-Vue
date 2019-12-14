<template>
    <div style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">

       <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
      <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

        <div  
            v-on:keyup="store_item_info($event, item_id)" 
            class="list-item">
            <ol
                contenteditable=true
                data-placeholder="this is the heading">
                <li>{{element_array}}</li>
            </ol>
        </div>
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
      element_array: this.item_info,
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
  }
};
</script>

<style>
</style>
