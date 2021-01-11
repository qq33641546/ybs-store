import {
	https
} from './http.interceptor.js'

const index_url = 'index/index'

// 获取首页数据
export function getIndexData(params = {}) {
	return https(index_url, params, 'get')
}
//  获取首页显示的模块