<template>
    <div>
        <!-- Displays the bookmark_link -->
        <div    
            v-if="item_info"  
            draggable="true"
            v-on:dragstart="onDragStart($event, item_id)">
            {{bookmark_link}}
        </div>
        
        <div v-if="!item_info">

            <!-- Modal button for storing the BookMark -->
            <button type="button" 
                    class="btn btn-primary list-item"
                    data-toggle="modal"
                    data-target="#bookmark"
                    draggable="true"
                    v-on:dragstart="onDragStart($event, item_id)">
                    BookMark
            </button>

            <!-- Modal for entering the link -->
            <div class="modal fade" 
                id="bookmark" 
                tabindex="-1" 
                role="dialog" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true">

                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Book Mark</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="bookmark_link" class="form-control">
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
import axios from "axios"

export default {
  name: "BookMark",
  props:["item_id", "item_info"],

  data(){
      return {
          bookmark_link:this.bookmark_link
      }
  },
  
  methods: {
    // Gets triggered when the Editor Element is Dragged
    onDragStart(event, item_id) {
         this.$store.dispatch("onDragStart", item_id);
    },

    // Gets triggered when the save changes button is clicked
    store_item_info(item_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["info"] = this.bookmark_link

      this.$store.dispatch("on_info_change", json_data);
    }   
  },

  created(){
      if (this.item_info){
          axios.get(this.item_info)
          .then(res => console.log(res))
      }
  }
};
</script>

<style scoped>
    
</style>

