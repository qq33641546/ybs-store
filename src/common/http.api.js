import {
	https
} from './http.interceptor.js'

const indexUrl = 'index/index'

// 获取首页数据
export function getIndexData(params = {}) {
	return https(indexUrl, params, 'get')
}
//  获取首页显示的模块