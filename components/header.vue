<template>
<div class="header">
  <div class="main">
    <el-row type="flex" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
      </div>
      <!-- 菜单 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登陆注册 -->
      <div v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span><i class="el-icon-bell"></i></span>
              信息<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </nuxt-link>
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
            无敌银河系
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
             <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  mounted(){

  },
  methods:{
    handleLogut(){
      // 清除userinfo的数据、
      this.$store.commit("user/clearUserInfo");
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ccc solid;
  box-shadow: 0 3px 3px #eee;
}

.main {
  width: 1200px;
  margin: 0 auto;
}

.logo {
  margin-top: 9px;

  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}

.navs {
  flex: 1;
  margin-left: 20px;

  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;

    &:hover {
      color: #409eff;
      border-bottom: 5px #409eff solid;
    }
  }
}

//  nuxt会通过url匹配每个nuxt-link标签的链接，如果匹配上默认会加上nuxt-link-exact-active样式
.nuxt-link-exact-active {
  background: #409eff;
  color: #fff;

  &:hover {
    color: #fff;
  }
}

.el-dropdown-link {
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
