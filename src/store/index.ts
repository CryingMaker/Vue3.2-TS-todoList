
import { defineStore } from 'pinia'
import { Todo } from '../types/todo';
export const globalStore = defineStore('global', {
    state: () => {
        let count = 0;//计算是否全选

        return {
            count
        }
    },

    actions: {
        countCompleted(todo: Todo[]) {
            todo.forEach((e) => {
                if (e.isComplete)
                    this.count++
            })
            console.log(this.count);
        }
    },

    getters: {

    }
});
