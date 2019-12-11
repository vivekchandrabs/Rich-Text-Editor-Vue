import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from "../components/HelloWorld"
import Editor1 from "../components/Editor1.vue"

Vue.use(Router)

export default new Router({
    mode:"history",
    routes:[
        {
            path:"/",
            name: "Editor1",
            component: Editor1
        },
    ]
})