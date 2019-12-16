<template>
    <div style="height:auto">
         <div @click="toogleDropDown()"
              class="context-menu"
              :style="displayDragger ? 'opacity:1' : 'opacity:0'">

             <img src="https://image.flaticon.com/icons/svg/61/61183.svg" 
                  style="height:17px; width:17px">

         </div>

        <div class="dropdown">
            <div ref="myDropdown" :class="display_dropdown ? 'dropdown-show' : 'dropdown-hide'  ">
                <a v-on:click="addNewComponent(item_id, 1, null)">Text Area</a>
                <a v-on:click="addNewComponent(item_id, 2, null)">Heading 1</a>
                <a v-on:click="addNewComponent(item_id, 3, null)">Heading 2</a>
                <a v-on:click="addNewComponent(item_id, 4, null)">Heading 3</a>
                <a v-on:click="addNewComponent(item_id, 5, null)">Quote</a>
                <a v-on:click="addNewComponent(item_id, 6, '')">Divider</a>
                <a v-on:click="addNewComponent(item_id, 7, '<li></li>')">Unordered List</a>
                <a v-on:click="addNewComponent(item_id, 8, '<li></li>')">Ordered List</a>
                <a v-on:click="addNewComponent(item_id, 9, 'TodoList')">TodoList</a>
                <a v-on:click="addNewComponent(item_id, 10, null)">Embed Video</a>
                <a v-on:click="addNewComponent(item_id, 11, null)">Embed image</a>
                <a v-on:click="addNewComponent(item_id, 12, null)">Book Mark</a>
                <a v-on:click="addNewComponent(item_id, 13, 'Table')">Table</a>                       
            </div>
        </div>

    </div>
</template>

<script>
import stores from "../../stores";

export default {
  name: "ContextMenu",
  props: ["item_id", "displayDragger"],
  data() {
    return {
      display_dropdown: 0
    };
  },
  methods: {
    addNewComponent(item_id, element_id, default_value) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["element_id"] = element_id;
      json_data["info"] = default_value;

      this.display_dropdown = 0;
      this.$store.dispatch("addNewComponent", json_data);
    },
    toogleDropDown() {
      this.display_dropdown = !this.display_dropdown;
    }
  }
};
</script>

<style scoped>
.context-menu {
  margin-right: 1px;
  padding: 5px;
  border-radius: 5px;
}

.context-menu:hover {
  background-color: #eee;
  cursor: pointer;
}

a {
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: block;
}

.dropdown-show {
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-hide {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-show a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}
</style>
