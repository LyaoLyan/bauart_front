export default {
    state: {
        username: {}
    },
    mutations: {
        updateUser(state, username) {
            state.username = username
        }

    },
    actions: {
      
        async fetchUsername(ctx) {
            const res = await fetch(
                localStorage.getItem("currentUser")
            );
            const username = await res.json().login;
            ctx.commit('updateUsername', username)
        }
    },
    getters: {
        username(state) {
            return state.username
        }
    }
}