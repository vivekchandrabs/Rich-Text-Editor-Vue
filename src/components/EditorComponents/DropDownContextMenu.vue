<template>
    <div>
        <div class="dropdown">
          <div ref="myDropdown" :class="display_dropdown ? 'dropdown-show' : 'dropdown-hide'  ">
            <a v-on:click="changeComponent(item_id, 1, null)">Text Area</a>
            <a v-on:click="changeComponent(item_id, 2, null)">Heading 1</a>
            <a v-on:click="changeComponent(item_id, 3, null)">Heading 2</a>
            <a v-on:click="changeComponent(item_id, 4, null)">Heading 3</a>
            <a v-on:click="changeComponent(item_id, 5, null)">Quote</a>
            <a v-on:click="changeComponent(item_id, 6, '')">Divider</a>
            <a v-on:click="changeComponent(item_id, 7, '<li></li>')">Unordered List</a>
            <a v-on:click="changeComponent(item_id, 8, '<li></li>')">Ordered List</a>
            <a v-on:click="changeComponent(item_id, 9, 'TodoList')">TodoList</a>
            <a v-on:click="changeComponent(item_id, 10, null)">Embed Video</a>
            <a v-on:click="changeComponent(item_id, 11, null)">Embed image</a>
            <a v-on:click="changeComponent(item_id, 12, null)">Book Mark</a>
            <a v-on:click="changeComponent(item_id, 13, 'Table')">Table</a>      
          </div>
       </div>
    </div>
</template>

<script>
import store from "../../stores"

export default {
    name: "DropDownContextMenu",
    props:["display_dropdown", "item_id"],
    methods:{
        changeComponent(item_id, element_id, default_value){
            let json_data = {}
            json_data["item_id"] = item_id
            json_data["element_id"] = element_id
            json_data["info"] = default_value

            this.$store.dispatch("changeComponent", json_data)
        }
    }
}
</script>

<style scoped>

.dropdown {
  position: absolute;
  display: inline;
}

.dropdown-show{
  position: relative;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  left: 20;
}

.dropdown-hide {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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
