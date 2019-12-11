import Vue from "vue"
import Vuex from "vuex";
import Editor from "./modules/Editor"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        Editor
    }
})