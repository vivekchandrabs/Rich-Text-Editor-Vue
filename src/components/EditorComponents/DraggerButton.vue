<template>
    <div>
        <div class="dragger" 
            @mousedown="startDrag" 
            :draggable="draggable" 
            v-on:dragstart="onDragStart($event, item_id)"
            :style="displayDragger ? 'opacity:1' : 'opacity:0'">

            <div style="background-image:url(https://image.flaticon.com/icons/svg/482/482620.svg); 
                        height:10px; width:10px; 
                        background-size:cover;">
            </div>
        </div>
    </div>
</template>

<script>
import store from "../../stores";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DraggerButton",
  props: ["item_id", "displayDragger"],
  data() {
    return {
      draggable: false,
    };
  },
  methods: {
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },
    startDrag() {
      this.draggable = true;
    },
    stopDrag() {
      this.draggable = false;
    }
  },
  mounted() {
    window.addEventListener("mouseup", this.stopDrag);
  }
};
</script>

<style scoped>
.dragger {
  margin-right: 5px;
  padding: 10px;
  border-radius: 5px;
}

.dragger:hover {
  background-color: #eee;
  cursor: grabbing;
}
</style>
