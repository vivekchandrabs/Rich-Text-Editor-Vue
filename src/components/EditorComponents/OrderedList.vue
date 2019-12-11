<template>
    <div>
        <div  
            v-on:keyup="store_item_info($event, item_id)"
            draggable="true"
            v-on:dragstart="onDragStart($event, item_id)" 
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
import store from "../../stores"

export default {
  name: "OrderedList",
  props:["item_id", "item_info"],

  data() {
    return {
      element_array: this.item_info
    };
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
    },
  }
};
</script>

<style>
</style>
