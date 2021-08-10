export default {
    state: {
        currentUser: {}
    },
    mutations: {
        updateUser(state, currentUser) {
            state.currentUser = currentUser
        }

    },
    actions: {
      
        async fetchUser(ctx) {
            const res = await fetch(
                localStorage.getItem("currentUser")
            );
            const currentUser = await res.json();
            ctx.commit('updateUser', currentUser)
        }
    },
    getters: {
        currentUser(state) {
            return state.currentUser
        }
    }
}