import {
    wxQuickLogin
} from '@/common/http.api.js'
export default class WeiXin {
    async Login(detail) {
        return new Promise((resolve, reject) => {
            uni.login({
                provider: 'weixin',
                success: async function (loginRes) {
                    if (loginRes.errMsg === "login:ok") {
                        let code = loginRes.code;
                        const data = await wxQuickLogin({
                            encrypted_data: detail.encryptedData,
                            code: code,
                            iv: detail.iv
                        })
                        resolve(data);

                    }
                },
                fail: function (res) {
                    api('dev.debug', {
                        info: res
                    })
                }
            });
        })

    }
}