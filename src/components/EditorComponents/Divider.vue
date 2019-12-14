<template>
    <div style="display:flex; justify-content:flex-start; align-items:center"
         @mouseover="displayDragger=1" @mouseout="displayDragger=0">
        
         <ContextMenu v-bind:item_id="item_id"  v-bind:displayDragger="displayDragger"/>
        <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

        <div style="width:100%">
            <!-- Horizontal Divider  -->
            <hr class="list-item">
        </div>

    </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";
import ContextMenu from "./ContextMenu";

export default {
  name: "Divider",
  props: ["item_id"],
  data() {
    return {
      displayDragger: 0
    };
  },
  components: {
    DraggerButton,
    ContextMenu
  },

  methods: {
    startDrag() {
      this.draggable = true;
    },
    stopDrag() {
      this.draggable = false;
    },

    // Gets triggered when Horizontal Divider is dragged.
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    }
  }
};
</script>

<style scoped>
hr {
  border: 1px solid #ddd;
}
</style>
