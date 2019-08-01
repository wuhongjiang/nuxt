// 保存数据的属性state
// 如果不使用函数的方式会报警告
export const state = ()=>{
  return {
    userInfo:{
      token:"",
      user:{}
    }
  }
}
// 同步修改数据
export const mutations = {
  // state就是上面的state，这个参数是固定默认的
  // data 使用调用该方法的时候传人的数据
  setUseerInfo(state,data){
    state.userInfo = data;
  },
  // 清除用户数据
  clearUserInfo(state){
    state.userInfo={
      token:"",
      user:{}
    }
  }
}
// 异步修改数据actions
export const actions={
  
}