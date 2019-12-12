<template>
    <div style="display: flex; justify-content:flex-startl align-items:center;"
        @mouseover="displayDragger=1" @mouseout="displayDragger=0">
        
        <DraggerButton v-bind:item_id="item_id" v-bind:displayDragger="displayDragger"/>

        <!-- Display Image -->
        <div class="resize-image" v-if="item_info">

            <img :src="image_link" alt="item_info" style="max-width:100%" 
            v-if="item_info"  
            class="list-item">

        </div>

        <div v-if="!item_info">
            <!-- Embed Image button to pop up the modal -->
            <button type="button" 
                    class="btn btn-primary list-item"
                    data-toggle="modal"
                    data-target="#imagemodel">
                    Embed Image
            </button>
            
            <!-- Modal to accept the Image url -->
            <div class="modal fade" 
                id="imagemodel" 
                tabindex="-1" 
                role="dialog" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true">

                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Embed Image</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="image_link" class="form-control">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" 
                            v-on:click="store_item_info(item_id)">Save changes</button>
                    </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import store from "../../stores";

import DraggerButton from "./DraggerButton";

export default {
  name: "Image",
  props: ["item_id", "item_info"],
  components: {
    DraggerButton
  },
  data() {
    return {
      image_link: this.item_info,
      displayDragger: 0
    };
  },

  methods: {
    //   Gets triggered when the draggable element is dragged
    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },

    // Gets triggered when the save button is clicked
    store_item_info(item_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["info"] = this.image_link;

      this.$store.dispatch("on_info_change", json_data);
    }
  }
};
</script>

<style scoped>
p {
  border-left: 2px solid black;
}
.resize-image {
  border: 2px solid;
  resize: both;
  overflow: hidden;
  height: auto;

  /* overflow-x: none;
        overflow-y: none;
        overflow: hidden; */
  object-fit: cover;
}
.resize-image img {
  position: relative;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>

