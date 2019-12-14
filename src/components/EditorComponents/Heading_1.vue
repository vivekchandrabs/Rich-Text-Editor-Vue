<template>
    <div  style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">
      
      <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
      <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

      <div contenteditable=true
         v-on:keydown.enter="addNewTextArea($event)"
          v-on:keyup="store_item_info($event, item_id)">
        <h1 
            data-placeholder="this is the heading"
           
            class="list-item">
            {{item_info}}
        </h1>
      </div>

    </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";
import ContextMenu from "./ContextMenu";

export default {
  name: "Heading_1",
  props: ["item_id", "item_info"],
  data(){
    return {
      displayDragger:0
    }
  },
  components: {
    DraggerButton,
    ContextMenu
  },
  methods: {    
    addNewTextArea(event){
      event.preventDefault();

      let json_data = {}
      json_data["item_id"] = this.item_id
      json_data["element_id"] = 1
      json_data["info"] = "Add Text Here"

      this.$store.dispatch("changeComponent", json_data)
      .then(res => {
        let return_json_data = {}
        return_json_data["res"] = res
        return_json_data["event"] = event
        this.$root.$emit('Editor1', return_json_data)
      })
    },
    // Gets triggered when the h1 tag is dragged
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },

    // Gets trigged when the h1 tag content is changes
    store_item_info(event, item_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["info"] = event.target.innerText;

      this.$store.dispatch("on_info_change", json_data);
    }
  }
};
</script>

<style scoped>
h1 {
     white-space: nowrap;
}

</style>