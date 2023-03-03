<template>
    <div class="container-fuild mt-3 d-flex justify-content-between align-items-center">
        <div class="col-auto col-form-label" @click="handleClick()">
            <input class="form-check-input mx-3" type="checkbox" :checked="isAllSelectd" />
            <label>
                已经完成
                <i class="text-success">{{ countCompleted }}</i>
                / 全部
                <i class="text-danger">{{ todos.length }}</i>
            </label>
        </div>

        <div class="col-auto">
            <button class="btn btn-danger text-light" @click="emit('clearCompleted')">
                清除已完成任务
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, watch } from 'vue';
import { Todo } from '../types/todo';


const props = defineProps<{
    todos: Array<Todo>,
    isCompleted: boolean,
    countCompleted: number
}>()
let isAllSelectd = ref<boolean>(false);
const emit = defineEmits(['clearCompleted'])


const handleClick = () => {
    isAllSelectd.value = !isAllSelectd.value;
    props.todos.forEach((e) => e.isComplete = isAllSelectd.value)
}

watch(() => props.isCompleted, () => {
    isAllSelectd.value = props.isCompleted
})

onMounted(() => {
    isAllSelectd.value = props.isCompleted
})




</script>

<style lang="scss" scoped></style>