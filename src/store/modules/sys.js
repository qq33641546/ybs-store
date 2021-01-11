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
    }
}
export default sys