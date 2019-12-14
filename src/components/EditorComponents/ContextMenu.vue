<template>
    <div>
        <div class="dropdown mr-1">

         <div :id="item_id" 
              data-toggle="dropdown" 
              aria-haspopup="true"
              aria-expanded="false"
              class="context-menu"
              :style="displayDragger ? 'opacity:1' : 'opacity:0'">

             <img src="https://image.flaticon.com/icons/svg/61/61183.svg" 
                  style="height:17px; width:17px" >

         </div>

            <div class="dropdown-menu" :aria-labelledby="item_id">
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 1, 'Text Area')">Text Area</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 2, 'Heading 1')">Heading 1</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 3, 'Heading 2')">Heading 2</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 4, 'Heading 3')">Heading 3</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 5, 'Quote')">Quote</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 6, '')">Divider</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 7, '')">Unordered List</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 8, '')">Ordered List</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 9, 'TodoList')">TodoList</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 10, null)">Embed Video</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 11, null)">Embed image</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 12, null)">Book Mark</a>
                <a class="dropdown-item" v-on:click="changeComponent(item_id, 13, 'Table')">Table Matrix</a>                       
            </div>
        </div>
    </div>
</template>

<script>
import stores from "../../stores"

export default {
    name:"ContextMenu",
    props:["item_id", "displayDragger"],
    methods:{
        changeComponent(item_id, element_id, default_value){
            let json_data = {}
            json_data["item_id"] = item_id
            json_data["element_id"] = element_id
            json_data["info"] = default_value

            this.$store.dispatch("changeComponent", json_data)
        }
    }
}
</script>

<style scoped>
    .context-menu{
        margin-right: 1px;
        padding: 10px;
        border-radius: 5px;
    }

    .context-menu:hover{
        background-color: #eee;
        cursor: pointer;
    }
    
    a{
        cursor: pointer;
    }
</style>
