<template>
    <div style="height:auto">
        <div class="dragger" 
            @mousedown="startDrag" 
            :draggable="draggable" 
            v-on:dragstart="onDragStart($event, item_id)"
            :style="displayDragger ? 'opacity:1' : 'opacity:0'">

            <div style="background-image:url(https://image.flaticon.com/icons/svg/482/482620.svg); 
                        height:10px; width:10px; 
                        background-size:cover;"
                        class="popup"
                        v-on:click="popUpDialogBox(item_id)">

             <span class="popuptext" :ref="'delete_component'+item_id">
               <img src="https://image.flaticon.com/icons/svg/1/1570.svg" 
                    height="20px"
                    v-on:click=deleteComponent(item_id)>
             </span>

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
    popUpDialogBox(item_id){
      let pop_ref = `delete_component${item_id}`
      let popup = this.$refs[pop_ref]

      popup.classList.toggle("show");
    },

    deleteComponent(item_id){
      this.$store.dispatch("deleteComponent", item_id);
    },

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
  padding: 5px;
  border-radius: 5px;
}

.dragger:hover {
  background-color: #eee;
  cursor: grab;
}


/* Popup container - can be anything you want */
.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #eeee;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;} 
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}

</style>
