<template>
    <div>

       <!-- Embeded video will be displayed here -->
        <div    
            v-if="item_info"  
            draggable="true"
            v-on:dragstart="onDragStart($event, item_id)"  
            v-html="iframe_link">
        </div>
        
        <div v-if="!item_info">

            <!-- Button to pop up the Embed video modal -->
            <button type="button" 
                    class="btn btn-primary list-item"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    draggable="true"
                    v-on:dragstart="onDragStart($event, item_id)">
                    Embed Video
            </button>

            <!-- Modal to accept the Embed video modal -->
            <div class="modal fade" 
                id="exampleModal" 
                tabindex="-1" 
                role="dialog" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true">

                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Embed Video</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="iframe_link" class="form-control">
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
import store from "../../stores"

export default {
  name: "EmbedVideo",
  props:["item_id", "item_info"],

  data(){
      return {
          iframe_link:this.item_info
      }
  },

  methods: {
    //   Gets triggered when the draggable element is dragged
    onDragStart(event, item_id) {
         this.$store.dispatch("onDragStart", item_id);
    },

    // Gets triggered when the save changes button is clicked.
    store_item_info(item_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["info"] = this.iframe_link

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

