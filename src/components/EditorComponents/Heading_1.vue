<template>
    <div  style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">
      
      <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
      <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

        <h1 :ref="'focus_ref'+item_id"
            contenteditable=true
            data-text="Heading 1"
            class="heading-1"
            v-on:keydown.enter="addNewTextArea($event)"
            v-on:keyup="store_item_info($event, item_id)"
            v-html="local_item_info">
        </h1>

      <DropDownContextMenu  v-bind:display_dropdown="display_dropdown" v-bind:item_id="item_id"/>
    </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";
import ContextMenu from "./ContextMenu";
import DropDownContextMenu from "./DropDownContextMenu";

export default {
  name: "Heading_1",
  props: ["item_id", "item_info"],
  data() {
    return {
      displayDragger: 0,
      display_dropdown: 0,
      local_item_info:this.item_info
    };
  },
  components: {
    DraggerButton,
    ContextMenu,
    DropDownContextMenu
  },
  methods: {
    addNewTextArea(event) {
      event.preventDefault();

      let json_data = {};
      json_data["item_id"] = this.item_id;
      json_data["element_id"] = 1;
      json_data["info"] = null;

      this.$store.dispatch("addNewComponent", json_data);
    },

    // Gets triggered when the h1 tag is dragged
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },

    // Gets trigged when the h1 tag content is changes
    store_item_info(event, item_id) {
      if (event.target.innerText == "/") {
        this.display_dropdown = 1;
      } else {
        let json_data = {};
        json_data["item_id"] = item_id;
        json_data["info"] = event.target.innerHTML;
        this.display_dropdown = 0;

        this.$store.dispatch("on_info_change", json_data);
      }
    },
    closeDropMenu() {
      this.display_dropdown = 0;
    }
  },
  mounted() {
    let focus_element = `focus_ref${this.item_id}`;
    this.$refs[focus_element].focus();
  },
  created() {
    window.addEventListener("click", this.closeDropMenu);
  }
};
</script>

<style scoped>

[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
}

</style>