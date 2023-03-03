<template>
    <div class="container-fuild">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入你的用户名称,按回车确认" @keydown.enter="add()"
                v-model="inputValue" />
            <button type="button" class="btn btn-dark" @click="add()">添加任务</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['addTodo']);

let inputValue = ref<string>('');

const add = () => {
    if (inputValue.value.trim()) {
        emit('addTodo', inputValue.value);
        inputValue.value = '';
    }
}




</script>

<style lang="scss" scoped></style>