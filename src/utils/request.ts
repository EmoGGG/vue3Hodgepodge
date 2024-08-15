import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '网络错误，请联系开发人员'

export function createRequest(baseUrl: string) {
  const request = axios.create({
    baseURL: baseUrl,
    timeout: 10 * 1000 // 请求超时时间设置为300秒
  })
  /**
   * 请求拦截器
   */
  request.interceptors.request.use(
    (req: any) => {
      // let UserStore = useUserStore()
      // UserStore.setToken('Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ4ZHEtcG9sYXJpcy1hdXRoIiwiZXhwIjoxNzEzNTM2MzI4LCJ1c2VyQ29kZSI6InVzZXIyIiwiYmluZElEIjoyNywib3JnQ29kZSI6IumVv-Wym-S5i-aYpeWwj-WMuuS4muWnlOS8miIsInJvbGVDb2RlIjoi5Lia5aeU5Lya5oiQ5ZGYIn0.Kl-aNBvZdjToYkw9mjfRdjw3IwAmcWMNUd7tO7MP50Q')
      // if (UserStore.token) {
      //   req.headers.Authorization = UserStore.token
      // }

      req.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
      return req
    },
    (error: Error) => {
      return Promise.reject(error)
    }
  )

  /**
   * 响应拦截器
   */
  request.interceptors.response.use(
    function (res: AxiosResponse<any, any>) {
      if (res.status === 200) {
        return res
      } else {
        ElMessage.error(NETWORK_ERROR)
        return Promise.reject(NETWORK_ERROR)
      }
    },
    (error: Error) => {
      ElMessage.error(error.message || '服务异常')
      return Promise.reject(error)
    }
  )
  return request
}
