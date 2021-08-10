export default {
    state: {
        colors: {}
    },
    mutations: {
        updateUser(state, colors) {
            state.colors = colors
        }

    },
    actions: {
      
        async fetchColors(ctx) {
            const res = await fetch(
                localStorage.getItem("colors")
            );
            const colors = await res.json();
            ctx.commit('updateColors', colors)
        }
    },
    getters: {
        colorsr(state) {
            return state.colors
        }
    }
}