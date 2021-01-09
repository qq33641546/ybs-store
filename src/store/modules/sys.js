const sys = {
    state: {
        SYS_INFO: {},
    },
    mutations: {
        SET_SYS_INFO: (state, info) => {
            state.SYS_INFO = info
        }
    },
    actions: {
        getSysInfo({
            commit
        }) {
            const res = uni.getSystemInfoSync();
            if (res.system == 'ios') {
                res.navBarHeight = 44
            } else {
                res.navBarHeight = 48
            }
            console.info(`系统信息=>`, res);

            commit('SET_SYS_INFO', res)
        },

        // getInfo({
        //     commit,
        //     state
        // }) {
        //     this.$u.api.getInfo(state.token).then(res => {
        //         let data = res.data
        //         commit("SET_USER", data.user)
        //     })
        // }
    }
}
export default sys