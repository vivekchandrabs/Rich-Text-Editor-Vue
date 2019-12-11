<template>
    <div>
      <!-- Editable Div -->
        <div
            contenteditable=true
            data-placeholder="this is it"
            v-on:keyup="store_item_info($event, item_id)"
            draggable="true"
            v-on:dragstart="onDragStart($event, item_id)" 
            class="list-item"                
            >
            {{item_info}}
        </div>
    </div>
</template>

<script>
import store from "../../stores"

export default {
  name: "Heading_1",
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
      
    },
  }
};
</script>

<style scoped>
</style>