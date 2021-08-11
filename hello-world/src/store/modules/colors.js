import colorsList from '../../assets/colors.json'

export default {
    state: {
        colors: []
    },
    mutations: {
        setColors(state, colors) {
            state.colors = colors
        }

    },
    actions: {
        async fetchColors(ctx) {
            
            const colors = colorsList
            ctx.commit('setColors', colors)
        },
        // async fetchUCurrentUser(ctx) {
        //     user = 
        //     ctx.commit('setCurrentUser', user)
        // }
        
    },
    getters: {
        getColors(state) {
            return state.colors
        }
    }
}