<template>
<el-form :model="form" ref="form" :rules="rules" class="form">
  <el-form-item class="form-item">
    <el-input v-model="form.username" placeholder="用户手机"></el-input>
  </el-form-item>
  <el-form-item class="form-item">
    <el-input v-model="form.captcha" placeholder="验证码">
      <template slot="append">
        <el-button @click="handleSendCaptcha">发送验证码</el-button>
      </template>
    </el-input>
  </el-form-item>
  <el-form-item class="form-item">
    <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
  </el-form-item>
  <el-form-item class="form-item">
    <el-input v-model="form.password" placeholder="密码"></el-input>
  </el-form-item>
  <el-form-item class="form-item">
    <el-input v-model="form.checkPassword" placeholder="确定密码" type="password"></el-input>
  </el-form-item>
  <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
</el-form>
</template>

<script>
export default {
  data() {

    // 验证再输入密码
    // rule当前的规则
    // value输入框的值
    // callback回调函数，必须要调用，不调用就不会验证
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('再次输入密码不一致！'));
      } else {
        callback();
      }
    }
    return {
      form: {
        username: "",
        captcha: "", //验证码
        nickname: "", //  昵称
        password: "",
        checkPassword: "" //确定密码
      },
      rules: {
        username: [{
          required: true,
          message: "用户名不能为空",
          trigger: "blur"
        }],
        captcha: [{
          required: true,
          message: "手机验证码不能为空",
          trigger: "blur"
        }],
        nickname: [{
          required: true,
          message: "昵称不能为空",
          trigger: "blur"
        }],
        password: [{
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }],
        // 自定义校验规则
        checkPassword: [{
          validator: validatePass,
          trigger: 'blur'
        }, ],
      }
    }
  },
  methods: {
    // 手机发送验证码
    handleSendCaptcha() {
      // 判断手机号码是否为空
      if (!this.form.username) {
        this.$message.warning('手机号码不能为空');
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const {
          code
        } = res.data;
        this.$alert(`模拟手机验证码为:${code}`, "提示", {
          type: "warning"
        })
      })
    },
    // 注册
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const {
            checkPassword,
            ...props
          } = this.form;

          // ES6的标准语法，结构出特写的属性后，剩余的才能使用...+变量lsyong
          // 调用注册的接口
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res => {
            this.$store.commit('user/setUserInfo', res.data)
            this.$router.push("/")
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409EFF;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
