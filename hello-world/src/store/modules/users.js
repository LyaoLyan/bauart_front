import usersList from '../../assets/users.json'

export default {
    state: {
        users: []
     
    },
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        updateUsers(state, user) {
            state.users.splice(user.id, 1, user);
        },
        addUsers(state, user) {
            state.users.push(user);
        },
        
        

    },
    actions: {
        async fetchUsers(ctx) {
            const users = usersList
            ctx.commit('setUsers', users)
        },
        // async fetchUCurrentUser(ctx) {
        //     user = 
        //     ctx.commit('setCurrentUser', user)
        // }
        
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getNewId(state) {
            return state.users[state.users.length-1].id+1
        }
    }
}