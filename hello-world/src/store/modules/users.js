export default {
    state: {
        users: []
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        }

    },
    actions: {
        async fetchUsers(ctx) {
            const res = await fetch(
                localStorage.getItem("users")
            );
            const users = await res.json();
            ctx.commit('updateUsers', users)
        }
    },
    getters: {
        allUsers(state) {
            return state.users
        }
    }
}