export default {
    state: {
        user: {},
       
        oldTag: {},
        oldTask: {},
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        updateTask(state, index, task) {
            state.user.tasks.splice(index, 1, task);
        },
        deleteTask(state, index) {
            state.user.tasks.splice(index, 1);
        },
        updateTag(state, index, tag) {
            state.user.tags.splice(index, 1, tag);
        },
        deleteTag(state, index) {
            state.user.tags.splice(index, 1);
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
        updateTaskFlag(state, taskId) {
            console.log(state.user.tasks[taskId])
            
        },
        setOldTag(state, tag) {
            state.oldTag = tag
        },
        setOldTask(state, task) {
            state.oldTask = task
        },
        setFlagTask(state, flag, index) {
state.user.tasks[index].flag = flag
        }
    },
    actions: {
        async fetchOldTag(ctx, tag) {
            const oldTag = tag
            ctx.commit('setOldTag', oldTag)
        },
        async fetchOldTask(ctx, task) {
            const oldTask = task
            ctx.commit('setOldTask', oldTask)
        },
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
        getOldTag(state) {
            return state.oldTag
        },
        getOldTask(state) {
            return state.oldTask
        },
        getTaskFlag(state, id = 0) {
            return state.user.tasks[id].flag
        }
    }
}