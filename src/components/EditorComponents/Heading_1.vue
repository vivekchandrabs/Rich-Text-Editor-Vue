<template>
    <div>
        <h1 contenteditable=true
            data-placeholder="this is the heading"
            v-on:keyup="store_item_info($event, item_id)"
            draggable="true"
            v-on:dragstart="onDragStart($event, item_id)" 
            class="list-item" 
            >
            {{item_info}}
        </h1>
    </div>
</template>

<script>
import store from "../../stores"

export default {
  name: "Heading_1",
  props:["item_id", "item_info"],

  methods: {
    // Gets triggered when the h1 tag is dragged
    onDragStart(event, item_id) {
         this.$store.dispatch("onDragStart", item_id);
    },

    // Gets trigged when the h1 tag content is changes
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
</style>