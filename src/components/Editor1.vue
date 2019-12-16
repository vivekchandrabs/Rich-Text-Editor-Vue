<template>
    <div class="editor_body container"> 
      <br><br>
            <transition-group name="list" 
                              tag="p"
                              v-if="loading">

              <!-- Main Editor Area -->
              <div v-for="item in Items"
                    :key="item.id" 
                    class="list-item">
                  <!-- Div todo drop the HTML elements -->
                  <div 
                  :class="hover ? 'slot-active ' : 'slot'" v-on:drop="on_drop($event, item.id, 0)" 
                        v-on:dragover="allowDrop($event, item.id)" :ref="'place-'+item.id"
                        v-on:dragleave="handleDragLeave($event, item.id)">               
                  </div>

                  <!-- Text Area Element -->
                  <TextArea v-if="item.element_id==1" 
                            v-bind:item_id="item.id" 
                            v-bind:item_info="item.info" 
                            :ref="'element-'+item.id" />

                  <!-- Heading 1, 2, 3 -->
                  <Heading_1 v-if="item.element_id==2" v-bind:item_id="item.id" v-bind:item_info="item.info" 
                             ref="item.id" />

                  <Heading_2 v-if="item.element_id==3" v-bind:item_id="item.id" v-bind:item_info="item.info"/>
                  <Heading_3 v-if="item.element_id==4" v-bind:item_id="item.id" v-bind:item_info="item.info" ref="thisisit"/>

                  <!-- Quote -->
                  <Quote v-if="item.element_id==5" v-bind:item_id="item.id" v-bind:item_info="item.info"/>

                  <!-- Horizontail line -->
                  <Divider v-if="item.element_id==6" v-bind:item_id="item.id" />

                  <!-- Lists -->
                  <UnOrderedList v-if="item.element_id==7" v-bind:item_id="item.id" v-bind:item_info="item.info"/>
                  <OrderedList v-if="item.element_id==8" v-bind:item_id="item.id" v-bind:item_info="item.info"/>
                  
                  <!-- Todo Lists -->
                  <TodoList v-if="item.element_id==9" 
                    v-bind:item_id="item.id"
                    v-bind:item_info="item.info"
                    v-bind:checked="item.info.checked"/>

                  <!-- Embed Video and Image -->
                  <EmbedVideo v-if="item.element_id==10" v-bind:item_id="item.id" v-bind:item_info="item.info"/>
                  <EmbedImage v-if="item.element_id == 11" v-bind:item_id="item.id" v-bind:item_info="item.info"/>
                  
                  <!-- Store BookMarks -->
                  <BookMark v-if="item.element_id == 12" v-bind:item_id="item.id" v-bind:item_info="item.info" />
                  
                  <!-- Table -->
                  <Table v-if="item.element_id == 13" v-bind:item_id="item.id" v-bind:item_info="item.info"/>
                
              </div>
            </transition-group>
        <br><br><br><br><br><br>
    </div>
</template>

<script>
import Vue from "vue";

import store from "../stores";
import { mapActions, mapGetters } from "vuex";

import Heading_1 from "./EditorComponents/Heading_1";
import Heading_2 from "./EditorComponents/Heading_2";
import Heading_3 from "./EditorComponents/Heading_3";
import TextArea from "./EditorComponents/TextArea";
import Quote from "./EditorComponents/Quote";
import Divider from "./EditorComponents/Divider";
import UnOrderedList from "./EditorComponents/UnOrderedList";
import OrderedList from "./EditorComponents/OrderedList";
import TodoList from "./EditorComponents/TodoList";
import EmbedVideo from "./EditorComponents/EmbedVideo";
import EmbedImage from "./EditorComponents/EmbedImage";
import BookMark from "./EditorComponents/BookMark";
import Table from "./EditorComponents/Table";

export default {
  name: "Editor1",
  computed: mapGetters(["Items", "hover"]),
  components: {
    Heading_1,
    Heading_2,
    Heading_3,
    TextArea,
    Quote,
    Divider,
    UnOrderedList,
    OrderedList,
    TodoList,
    EmbedVideo,
    EmbedImage,
    BookMark,
    Table
  },
  data() {
    return {
      loading: false
    };
  },

  methods: {
    addComponent(return_json_data) {
      let element_refs = `element-${return_json_data.res.id}`;
      console.log(this.$refs.thisisit[0].$el);
    },
    handleDragLeave(event, item_id) {
      let myref = `place-${item_id}`;
      let elem = this.$refs[myref][0];
      elem.style.backgroundColor = "#fff";
    },
    // Gets triggered when the Editor component is in the allow drop area.
    allowDrop(event, item_id) {
      this.$store.commit("commit_hover", true);
      this.$store.dispatch("allowDrop", event);
      let myref = `place-${item_id}`;
      let elem = this.$refs[myref][0];
      elem.style.backgroundColor = "#3498db";
    },

    // Gets triggered when the Editor Element in droped in the drop area.
    on_drop(event, item_id, place_id) {
      let json_data = {};
      json_data["item_id"] = item_id;
      json_data["place_id"] = place_id;

      this.$store
        .dispatch("on_drop", json_data)
        .then(this.$store.dispatch("reorder"));

      this.$store.commit("commit_hover", false);
      let myref = `place-${item_id}`;
      let elem = this.$refs[myref][0];
      console.log(elem);
      elem.style.backgroundColor = "#fff";
    }
  },
  created() {
    this.$store.dispatch("getAllItems").then(res => {
      console.log(res.data.editor_info.length);
      if (res.data.editor_info == 0) {
        res.data.editor_info.push({
          id: 1,
          info: "Enter the Text",
          element_id: 1
        });
      }
      this.$store.commit("commit_Items", res.data.editor_info),
        (this.loading = true);
    });
  }
};
</script>

<style>
.editor_body {
  cursor: auto;
  height: 100%;
}

.list-item {
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.7s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.slot {
  min-height: 5px;
  min-width: 100%;
}

.slot-active {
  min-height: 5px;
  background: #fff;
  min-width: 100%;
}

.block {
  width: 100%;
  border: none;
}

.block:focus {
  border: none;
  outline: none;
  background: #eee;
}

.block:hover {
  cursor: pointer;
}

.drag-button {
  border-radius: 40%;
}

.text-area {
  padding: 5px 10px 5px 10px;
  width: 100%;
  margin: 0;
}

.text-area:focus {
  outline-width: 0;
}

.heading-1 {
  outline-width: 0;
  white-space: nowrap;
  padding: 10px;
  width: 100%;
}

.heading-2 {
  padding: 10px;
  outline-width: 0;
  white-space: nowrap;
  width: 100%;
}

.heading-3 {
  padding: 10px;
  outline-width: 0;
  white-space: nowrap;
  width: 100%;
}

.quote {
  border-left: 2px solid black;
  padding: 10px;
  outline-width: 0;
  width: 100%;
}

.todo-list-label {
  outline-width: 0;
  width: 100%;
}

.ordered-list {
  padding: 5px;
  width: 100%;
  margin-left: 2%;
  outline-width: 0;
}

.unordered-list {
  padding: 5px;
  width: 100%;
  margin-left: 2%;
  outline-width: 0;
}
</style>