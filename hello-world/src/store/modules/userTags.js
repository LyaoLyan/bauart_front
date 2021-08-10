export default {
    state: {
        tags: []
    },
    mutations: {
        updateTags(state, tags) {
            state.userTags = tags
        }

    },
    actions: {
        async fetchTags(ctx) {
            const res = await fetch(
                localStorage.getItem("currentUser")
            );
            const userTags = await res.json().tags;
            ctx.commit('updateUserTags', userTags)
        }
    },
    getters: {
        allTags(state) {
            return state.tags
        }
    }
}