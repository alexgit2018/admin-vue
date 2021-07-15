<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">后台管理系统登录</h3>
      </div>
      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input v-model="loginForm.username" name="username" type="text" tabindex="1" auto-complete="on" placeholder="管理员账户" />
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input  v-model="loginForm.password" :type="passwordType" name="password" auto-complete="on" tabindex="2" show-password placeholder="管理员密码" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading" type="primary" class="relative text-center width100 height40" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>

  </div>
</template>
<script type="text/javascript">

export default {
  name: "login",
  data() {
  const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('管理员密码长度应大于6'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '管理员账户不允许为空', trigger: 'blur' }],
        password: [
          { required: true, message: '管理员密码不允许为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  components: {},
  mounted() {
  },
  computed: {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  watch: {
    $route: {
      handler: function(to,old){
        this.redirect = to.query && to.query.redirect
      },
      deep: true,
      immediate: true
    }

  }
};
</script>
