import axios from "axios"
import { reject } from "q"
// var SITE_PREFIX = "http://127.0.0.1:8000/api"
var SITE_PREFIX = "https://editor-backend.herokuapp.com/api"

var TABLE_MATRIX =[
    ["c1", "c2", "c3", "c4", "c5"],
    ["r1", "1", "First", "Last", "Handle"],
    ["r2", "2", "Mark", "Otto", "@mdo"],
    ["r3", "3", "Jacob", "Thornton", "@fat"],
    ["r4", "4", "Larry", "The Bird", "@twitter"]
  ]

const state = {
    Items: [
        { id: 2, info: "Heading 1" , element_id: 2},
        { id: 3, info: "Heading 2" , element_id: 3},
        { id: 4, info: "Heading 3" , element_id: 4},
        { id: 1, info: "Text Area" , element_id: 1},
        { id: 5, info: "Quote" , element_id: 5},
        { id: 6, info: "", element_id: 6},
        { id: 7, info: "", element_id: 7, },
        { id: 8, info: "", element_id: 8, },
        { id: 9, info: {"checked":true, "label": "this is the label"}, element_id: 9},
        { id: 10, info: null , element_id: 10},
        { id: 11, info: null , element_id: 11},
        { id: 12, info: null , element_id: 12},
        { id: 13, info: TABLE_MATRIX,  element_id: 13},
    ],
    // Items: [],
    initial_index: -1,
    final_index: -1,
    hover: false,
}

const getters = {
    Items: state => state.Items,
    initial_index: state => state.initial_index,
    final_index: state => state.final_index,
    hover: state => state.hover,

}

const actions = {

    getAllItems: (store) => new Promise((resolve, reject) => {

      axios.get(SITE_PREFIX+`/editor_info/1/`)
      .then(res => resolve(res))
        
    }),

    reorder: (store) => {
      console.log("here in reorder vuex store")  
      let initial_index = state.initial_index;
      let final_index = state.final_index;

    //   console.log(final_index)
    //   console.log(initial_index)

      let element = state.Items[initial_index];

      let element_index = state.Items.indexOf(element);

      state.Items.splice(final_index, 0, element);

      if (initial_index > final_index) {
        state.Items.splice(element_index + 1, 1);
      } else {
        state.Items.splice(element_index, 1);
      }
    },

    allowDrop: (store, ev, item_id) => {
        // console.log("here in allowDrop")
        ev.preventDefault();  
    },

    onDragStart: (store, item_id) => {
      console.log("here in the vuex store")
      let element_dragged = state.Items.filter(Items => Items.id === item_id)[0];

      let draggable_element_index = state.Items.indexOf(element_dragged);
      state.initial_index = draggable_element_index;
    },

    on_drop: (store, json_data) => new Promise((resolve, reject) => {
      
        console.log("here in on_drop vuex store")
        let element_in_div = state.Items.filter(Items => Items.id === json_data["item_id"])[0];
        let drop_index = state.Items.indexOf(element_in_div);
        console.log(drop_index);

        if (json_data["place_id"] == 1) {
            state.final_index = drop_index + json_data["place_id"];
        } else if (json_data["place_id"] == 0) {
            state.final_index = drop_index - json_data["place_id"];
        }

        let editor_info = {}
        editor_info["editor_info"] = state.Items

        axios.patch(SITE_PREFIX+`/editor_info/1/`, editor_info)
        .then(res => console.log(res))
        
        resolve();
      }),

    on_info_change: (store, json_data) => {
      console.log(json_data)
      let item_id = json_data["item_id"]
      let item_info = json_data["info"]

      state.Items.filter(Items => Items.id === item_id)[0].info = item_info    
      
      let editor_info = {}
      editor_info["editor_info"] = state.Items

      axios.patch(SITE_PREFIX+`/editor_info/1/`, editor_info)
        .then(res => console.log("done"))
        
    },

    add_new_area: (store) => {
      let new_element_id = state.Items[state.Items.length - 1].id + 1
      
      let json_data = {}
      json_data["id"] = new_element_id
      json_data["info"] = ""
      json_data["element_id"] = 1

      state.Items.push(json_data)
    },

    change_state: (store, json_data) => {
      let item_id = json_data["item_id"]
      let checked = json_data["checked"]

      state.Items.filter(Items => Items.id === item_id)[0].info.checked = checked
      
      let editor_info = {}

      editor_info["editor_info"] = state.Items

      axios.patch(SITE_PREFIX+`/editor_info/1/`, editor_info)
        .then(res => console.log(res.data))
    },

    deleteComponent: (store, item_id) => {
      let element_to_delete = state.Items.filter(Items => Items.id === item_id)[0];
      let element_index = state.Items.indexOf(element_to_delete);
      
      state.Items.splice(element_index, 1)
    },

    changeComponent: (store, json_data) => new Promise((resolve, reject) => {
      
        if(json_data.element_id == 9){
          json_data.info = {"checked":false, "label": "this is the label"}
        }
        else if (json_data.element_id == 13){
          json_data.info = TABLE_MATRIX
        }
        
        let new_element = {}
        new_element["info"] = json_data.info
        new_element["element_id"] = json_data.element_id

        let max_id = 0

        for (let i of state.Items){
          if (i.id > max_id){
            max_id = i.id
          }
        }

        new_element["id"] = max_id + 1

        let current_element = state.Items.filter(Items => Items.id === json_data.item_id)[0];
        let new_element_index = state.Items.indexOf(current_element) + 1
                
        state.Items.splice(new_element_index, 0, new_element)

        resolve(new_element)
    })
}

const mutations = {
    commit_Items : (state, new_items) => (state.Items = new_items),
    commit_initial_index: (state, new_initial_index) => (state.initial_index = new_initial_index),
    commit_final_index: (state, new_final_index) => (state.final_index = new_final_index),
    commit_hover: (state, hover) => (state.hover = hover),
}

export default {
    state,
    getters,
    actions,
    mutations
}
