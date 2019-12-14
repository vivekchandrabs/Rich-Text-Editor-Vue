<template>
    <div style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">

         <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
         <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

        <div class="custom-control custom-switch list-item">

          <input type="checkbox" 
          class="custom-control-input custom-switch" 
          v-on:change="change_status(item_id)" id="customSwitch1" :checked="component_checked">

          <label class="custom-control-label" 
          contenteditable=true
          v-on:keyup="store_item_info($event, item_id)"
          for="customSwitch1"
          style="font-weight:bold">

          {{item_info.label}}

          </label>
          
        </div>
    </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";
import ContextMenu from "./ContextMenu";

export default {
  name: "TodoList",
  props: ["item_id", "item_info", "checked"],
  data() {
    return {
      component_checked: this.checked,
      displayDragger: 0
    };
  },
  components: {
    DraggerButton,
    ContextMenu
  },
  methods: {
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },

    store_item_info(event, item_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["info"] = {};
      json_data["info"]["checked"] = this.component_checked;
      json_data["info"]["label"] = event.target.innerText;

      this.$store.dispatch("on_info_change", json_data);
    },

    change_status(item_id) {
      this.component_checked = !this.component_checked;

      let json_data = {};
      json_data["checked"] = !this.component_checked;
      json_data["item_id"] = item_id;

      this.$store.dispatch("change_state", json_data);
    }
  }
};
</script>

<style>
</style>
