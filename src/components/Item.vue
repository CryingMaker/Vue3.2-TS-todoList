<template>
    <li class="list-group-item list-group-item-action d-flex align-items-center py-2">
        <div class="container-fuild d-flex align-items-center" @click.stop="handlerClick()">
            <div>
                <input class="form-check-input" type="checkbox" v-model="todo.isComplete" />
            </div>

            <label class="text-dark mx-3 py-1" v-show="!isEdit">{{ todo.title }}</label>
            <input class="form-control mx-3 py-1" type="text" ref="input" v-model="inputValue" v-show="isEdit"
                @blur="handleBlur()" @keydown.enter="handleBlur()" />
        </div>

        <div class="ms-auto hiddenContent">
            <button class="btn btn-success text-light btn-sm mx-1" @click="handlerEdit()">
                编辑内容
            </button>
            <button class="btn btn-danger text-light btn-sm" @click="delTodo()">
                删除任务
            </button>
        </div>
    </li>
</template>

<script lang="ts" setup>
import { ref, nextTick, inject } from 'vue';

const props = defineProps<{
    todo: { id: string, isComplete: boolean, title: string }
}>()



let input = ref(null) as any;
let isEdit = ref<boolean>(false);
let inputValue = ref<string>('');


const isAllSelectd: Function = inject('isAllSelectd') as Function;
const handlerClick = () => {
    props.todo.isComplete = !props.todo.isComplete;
    isAllSelectd();
}


const handlerEdit = () => {
    isEdit.value = true;
    inputValue.value = props.todo.title;
    nextTick(() => {
        input.value.focus();
    });
}

const handleBlur = () => {
    isEdit.value = false;
    props.todo.title = inputValue.value;
}


const delTodoFun: Function = inject('delTodo') as Function;

const delTodo = () => {
    if (confirm(`你确定要删除任务:${props.todo.title}`))
        delTodoFun(props.todo.id);
}




</script>

<style lang="scss" scoped>
.list-group-item .hiddenContent {
    visibility: hidden;
}

.list-group-item:hover .hiddenContent {
    visibility: visible;
    display: inline-table;
}
</style>