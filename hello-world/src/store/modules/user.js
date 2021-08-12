export default {
    state: {
        user: {},

    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        updateTask(state, data) {
            state.user.tasks.splice(data.index, 1, data.task);
        },
        addTaskV(state, task) {
            state.user.tasks.push(task);
        },
        deleteTask(state, index) {
            state.user.tasks.splice(index, 1);
        },
        updateTag(state, tag) {
            function checkIndex(element) {
                return element.id == tag.id;
            }
            state.user.tags.splice(state.user.tags.findIndex(checkIndex), 1, tag);
        },
        addTag(state, tag) {
            state.user.tags.push(tag);
        },
        deleteTag(state, tag) {
            function checkIndex(element) {
                return element.id == tag.id;
            }
            state.user.tags.splice(state.user.tags.findIndex(checkIndex), 1);
        },
        clearTagsFromTasks(state, index) {
            state.user.tasks = state.user.tasks.map(function (task) {
                if (task.tags[task.tags.findIndex(index)]) {

                    task.tags.splice(task.tags.findIndex(index), 1);
                    return task;
                }
                return task;
            });
        },
        changeTagsFromTasks(state, index, tag) {
            state.user.tasks = state.user.tasks.map(function (task) {
                if (task.tags[task.tags.findIndex(index)]) {

                    task.tags.splice(task.tags.findIndex(index), 1, tag);
                    return task;
                }
                return task;
            });
        },
        updateTaskFlag(state, data) {
            state.user.tasks[data.taskID].flag = data.flag

        },
       
        

    },
    actions: {
        
        async fetchTaskFlag(ctx, f, index) {
            const flag = f
            ctx.commit('setTaskFlag', flag, index)
        }

    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUsername(state) {
            return state.user.login
        },
        getId(state) {
            return state.user.id
        },
        getTags(state) {
            return state.user.tags
        },
        getTasks(state) {
            return state.user.tasks
        },
       
    }
}