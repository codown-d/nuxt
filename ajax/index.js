/**
 * Created by for on 2018/11/22.
 */
/**
 * add user
 */
export const addUser = (addUserData = []) => {
  // 拿到数组处理一下把
  let id = addUserData.join('-')
  return axios.$post('/api/getadduser', {id})
}
