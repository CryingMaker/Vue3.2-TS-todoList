<template>
    <div class="container-fuild mt-4">
        <ul class="list-group">
            <Item v-for="(item, index) in todos" :key="index" :todo="item" />
        </ul>
    </div>
</template>

<script lang="ts" setup>
import Item from './Item.vue'
import { Todo } from '../types/todo';
defineProps<{
    todos: Array<Todo>
}>()


</script>

<style lang="scss" scoped></style>