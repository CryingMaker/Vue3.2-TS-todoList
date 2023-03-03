<template>
    <div class="container-fuild p-2 m-3 Myborder user-select">
        <div class="contianer my-3">
            <MyHeader @addTodo="addTodo" />
            <List :todos="todos" />
            <MyFooter :todos="todos" :isCompleted="isCompleted" :countCompleted="countCompleted"
                :class="{ dis: !todos.length }" @clearCompleted="clearCompleted" />
        </div>
    </div>
</template>

<!-- <script lang="ts" setup>

interface IPerson {
    readonly id: number,
    name: string,
    age: number,
    sex?: '男' | '女'
}
const person: IPerson = {
    id: 999,
    name: 'CryingMaker',
    age: 22,
    // sex: '男'
}

person.age = 20
console.log(person);

console.log('=======================');


interface ISearchFunc {
    (source: string, subString: string): boolean
}

const searchString: ISearchFunc = (source: string, subString: string): boolean => {
    return source.search(subString) > -1
}

console.log(searchString('CryingMaker', 'Crying'));

console.log('=======================');


//函数重载
function add(x: string, y: string): string;
function add(x: number, y: number): number;

function add(x: string | number, y: string | number) {
    if (typeof x == 'string' && typeof y == 'string')
        return x + y
    else if (typeof x == 'number' && typeof y == 'number')
        return x + y
}

console.log(add('Crying', 'Maker'));
console.log(add(1, 2));

console.log('=======================');


// 泛型 (重点)

function getArray<T>(value: T, count: number): T[] {
    let arr: Array<T> = [];

    for (let i = 0; i < count; i++) {
        arr.push(value)
    }
    return arr
}

const arr1 = getArray<number>(200.1234, 7);
const arr2 = getArray<string>("CryingMaker", 3);

console.log(arr1[0].toFixed(2));
console.log(arr2[0].concat('123'));










</script> -->


<script lang="ts" setup>
import MyHeader from './components/MyHeader.vue'
import List from './components/List.vue'
import MyFooter from './components/MyFooter.vue'

import { ref, provide, onMounted } from 'vue';
import { Todo } from './types/todo';
import { nanoid } from 'nanoid';

let todos = ref<Array<Todo>>(JSON.parse(localStorage.getItem('todos') || '[]'));
if (!todos.value)
    todos.value = []


const addTodo = (title: string) => {
    todos.value.unshift({ id: nanoid(), isComplete: false, title: title });
}

const delTodo = (id: string) => {
    todos.value.splice(todos.value.findIndex((e) => e.id == id), 1);
}
provide('delTodo', delTodo)


const clearCompleted = () => {
    todos.value = todos.value.filter((e: Todo) => !e.isComplete);
}

let isCompleted = ref<boolean>(false);
let countCompleted = ref<number>(0);
const isAllSelectd = () => {
    if (!todos.value.find((e) => e.isComplete == false))
        isCompleted.value = true;
    else
        isCompleted.value = false;

    countCompleted.value = todos.value.reduce((p, c) => {
        if (c.isComplete)
            p++
        return p
    }, 0)
}
provide('isAllSelectd', isAllSelectd)



onMounted(() => {
    if (!todos.value.find((e) => e.isComplete == false))
        isCompleted.value = true;


    countCompleted.value = todos.value.reduce((p, c) => {
        if (c.isComplete)
            p++
        return p
    }, 0)
})

// 在浏览器关闭前 存储todo
window.onbeforeunload = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
}


</script>

<style lang="scss" scoped>
.Myborder {
    border: 1px solid #888;
    border-radius: 10px;
}

.user-select {
    user-select: none;
}

.dis {
    display: none !important;
}
</style>