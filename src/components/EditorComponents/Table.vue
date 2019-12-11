<template>
    <div>
        <div
            v-on:keyup="store_item_info($event, item_id)"
            contenteditable=true
             draggable="true"
             v-on:dragstart="onDragStart($event, item_id)" >

            <button v-on:click="add_row()">Add Row</button>
            <button v-on:click="add_col()">Add Column</button>

           <table class="table">
               <tr v-for="(row, index) in table_matrix" 
                   v-if="index == 0"
                   :key="row.id">

                    <!-- First row first element -->
                   <td v-for="(col, col_index) in row" 
                   v-if="col_index == 0"
                   :key="col.id">
                        <a >
                            <img src="https://image.flaticon.com/icons/svg/1828/1828843.svg"
                            style="max-width:13px; cursor:pointer"
                            type="btn">
                        </a>
                   </td>

                    <!-- First row except the first element -->
                   <td v-for="(col, col_index) in row" 
                   v-if="col_index > 0"
                   :key="col.id">
                       <a >
                            <img src="https://image.flaticon.com/icons/svg/1828/1828843.svg"
                            style="max-width:13px; cursor:pointer"
                            ref="{{col_index}}"
                            v-on:click="remove_col(col_index)"
                            type="btn">
                        </a>
                   </td>
               </tr>

               <tr v-for="(row, index) in table_matrix" 
                   v-if="index != 0"
                   ref="{{index}}"
                   :key="row.id">

                    <!-- First element in the rows -->
                   <td v-for="(col, col_index) in row" 
                        v-if="col_index == 0"
                        :key="col.id">
                       <a >
                            <img src="https://image.flaticon.com/icons/svg/1828/1828843.svg"
                            style="max-width:13px; cursor:pointer"
                            ref="{{col_index}}"
                            v-on:click="remove_row(index)"
                            type="btn">
                        </a>
                   </td>

                    <!-- All elements in the rows -->
                   <td v-for="(col, col_index) in row" 
                        v-if="col_index != 0"
                        ref="{{col_index}}"
                        :key="col.id">
                       {{col}}
                   </td>

               </tr>

           </table>
        </div>
    </div>
</template>

<script>
import store from "../../stores";

export default {
  name: "Table",
  props: ["item_id", "item_info"],
  data(){
      return {
        //   table_matrix:[
        //       ["c1", "c2", "c3", "c4", "c5"],
        //       ["r1", "1", "First", "Last", "Handle"],
        //       ["r2", "2", "Mark", "Otto", "@mdo"],
        //       ["r3", "3", "Jacob", "Thornton", "@fat"],
        //       ["r4", "4", "Larry", "The Bird", "@twitter"]
        //   ]
        table_matrix : this.item_info
      }
  },
  methods: {

    // Update the table matrix in the store
    update_in_store(){
    let json_data = {};
    json_data["item_id"] = this.item_id;
    json_data["info"] = this.item_info;
    this.$store.dispatch("on_info_change", json_data)
    },

    onDragStart(event, item_id) {
      this.$store.dispatch("onDragStart", item_id);
    },
    store_item_info(event, item_id) {
       this.update_in_store()
    },

    // Removes the respective row
    remove_row(row_id){
        this.table_matrix.splice(row_id,1)
        this.update_in_store()
    },

    // Removes the respective column
    remove_col(col_id){
        for(let i=0; i<this.table_matrix.length; i++){
            this.table_matrix[i].splice(col_id,1)
        }
        this.update_in_store() 
    },

    // Adds the row at the end
    add_row(){
        let matrix_length = this.table_matrix[0].length - 1
        
        let last_row_first_element = Number(this.table_matrix[this.table_matrix.length-1][0][1])+1
            
        let new_row = []
        new_row.push(`r${last_row_first_element}`)

        for(let i=0; i<=matrix_length-1; i++){
            new_row.push("this is it")   
        }
        
        this.table_matrix.push(new_row)
        this.update_in_store()
    },

    // Adds the column at the last
    add_col(){
        let matrix_length = this.table_matrix.length - 1
        let first_row_last_element = Number(this.table_matrix[0][this.table_matrix[0].length-1])+1
        
        for(let i=0; i<=matrix_length; i++){
            if(i == 0){
                this.table_matrix[0].push(`c${first_row_last_element}`)                
            }
            else{
                this.table_matrix[i].push("this is it")
            }
        }    
        this.update_in_store() 
    },
  }
};
</script>

<style scoped>
</style>