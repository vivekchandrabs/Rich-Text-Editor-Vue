<template>
    <p      
        contenteditable=true
        data-placeholder="this is the heading"
        v-on:keyup="store_item_info($event, item_id)"
        draggable="true"
        v-on:dragstart="onDragStart($event, item_id)" 
        class="list-item" >
        {{item_info}}
    </p>
</template>

<script>
import store from "../../stores"

export default {
  name: "Quote",
  props:["item_id", "item_info"],

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
    p{
        border-left: 2px solid black;
    }
</style>
