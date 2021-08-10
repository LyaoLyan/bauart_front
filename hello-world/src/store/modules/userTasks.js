export default {
    state: {
        userTasks: []
    },
    mutations: {
        updateUsers(state, userTasks) {
            state.userTasks = userTasks
        }

    },
    actions: {
        async fetchUserTasks(ctx) {
            const res = await fetch(
                localStorage.getItem("currentUser")
            );
            const userTasks = await res.json().tasks;
            ctx.commit('updateUserTasks', userTasks)
        }
    },
    getters: {
        allTasks(state) {
            return state.userTasks
        }
    }
}