<template>
    <div style="display:flex; justify-content:flex-start; align-items:center;" 
          @mouseover="displayDragger=1" @mouseout="displayDragger=0">

         <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
         <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

       
          <input type="checkbox" 
                v-on:change="change_status(item_id)" 
                :checked="component_checked">

          <p
            contenteditable=true
            v-on:keyup="store_item_info($event, item_id)"
            v-on:keydown.enter="addNewTextArea($event)"         
            :ref="'focus_ref'+item_id"
            data-text="Todo List"
            class="todo-list-label"
            v-html="local_item_info">
          </p>
          
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
      component_checked: this.item_info.checked,
      displayDragger: 0,
      local_item_info: this.item_info.label
    };
  },
  components: {
    DraggerButton,
    ContextMenu
  },
  methods: {
    addNewTextArea(event) {
      event.preventDefault();

      let json_data = {};
      json_data["item_id"] = this.item_id;
      json_data["info"] = "Add Text Here";
      if (event.target.innerText == "") {
        json_data["element_id"] = 1;
        this.$store.dispatch("changeComponent", json_data);
      } else {
        json_data["element_id"] = 9;
        this.$store.dispatch("addNewComponent", json_data);
      }
    },
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
  },
  mounted() {
    let focus_element = `focus_ref${this.item_id}`;
    this.$refs[focus_element].focus();
  }
};
</script>

<style scoped>
[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
}

p {
  margin-bottom: 0;
  margin-left:10px;
  margin-top:3px;
}
</style>
