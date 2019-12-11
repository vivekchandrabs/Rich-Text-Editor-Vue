<template>
    <!-- Horizontal Divider  -->
    
    <hr contenteditable=true draggable="true" v-on:dragstart="onDragStart($event, item_id)" class="list-item">
</template>

<script>
import store from "../../stores"

export default {
    name: "Divider",
    props: ["item_id"],

    methods: {
        // Gets triggered when Horizontal Divider is dragged.
        onDragStart(event, item_id) {
            this.$store.dispatch("onDragStart", item_id);
        }
    }
};
</script>

<style scoped>
hr {
    border: 1px solid #ddd;
}
</style>
