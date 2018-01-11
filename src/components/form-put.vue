<template>
<div>
  <div class="form-div">
       <div class="form-field">
        <label for="mobile">手机号</label>
        <!-- 用户名 -->
        <input type="text" name="mobile" class="f-text mobile" maxlength="11"
        v-model="username"
        @blur="inputBlur('username')"
        @focus="inputFocus('username')"
        :class="{'input-empty':error.username.bol&&error.username.opinfo}"
        >
        <span class="inline-tip" v-show="error.username.bol">
            <i class="tip-status tip-status-success" v-show="!error.username.opinfo"></i>
            <span v-show="error.username.opinfo">
              <i class="tip-status tip-status-opinfo"></i>
              {{error.username.msg}}
            </span>
        </span>
      </div>
        <div class="form-field">
        <label for="code">验证码</label>
          <!-- 重复密码 -->
        <input type="code" name="code" class="f-text code" maxlength="6"
        v-model="code"
        @blur="inputBlur('code')"
        @focus="inputFocus('code')"
        :class="{'input-empty':error.code.bol&&error.code.opinfo}"
        >
        <button class="btn" @click="getCode()" v-text="codeText" :disabled="codeTextDisabled"></button>
          <span class="inline-tip" v-show="error.code.bol">
            <i class="tip-status tip-status-success" v-show="!error.code.opinfo"></i>
            <span v-show="error.code.opinfo">
              <i class="tip-status tip-status-opinfo"></i>
              {{error.code.msg}}
            </span>
          </span>
        </div>

      <div class="form-field pwd">
        <label for="password">新的密码</label>
        <!-- 密码 -->
        <input type="password" maxlength="16"
        v-model="password"
        @keyup="getStrength()"
        @blur="inputBlur('password')"
        @focus="inputFocus('password')"
        :class="{'input-empty':error.password.bol&&error.password.opinfo}"
        name="password" class="f-text password">
        <div class="pw-strength">
            <div class="pw-strength__bar"
            :class="strength"
            id="J-pw-strength__bar"></div>
            <div class="pw-strength__letter">
                <span class="pw-strength__label">弱</span>
                <span class="pw-strength__label">中</span>
                <span class="pw-strength__label pw-strength__label--noborder">强</span>
            </div>
           </div>
          <span class="inline-tip" v-show="error.password.bol">
            <i class="tip-status tip-status-success" v-show="!error.password.opinfo"></i>
            <span v-show="error.password.opinfo">
              <i class="tip-status tip-status-opinfo"></i>
              {{error.password.msg}}
            </span>
          </span>
      </div>
      <div class="form-field">
        <label for="password2">重复密码</label>
        <!-- 重复密码 -->
        <input type="password" name="password2" class="f-text password2"
        v-model="password2"
        :class="{'input-empty':error.password2.bol&&error.password2.opinfo}"
        @blur="inputBlur('password2')"
        @focus="inputFocus('password2')"
        >
        <span class="inline-tip" v-show="error.password2.bol">
          <i class="tip-status tip-status-success" v-show="!error.password2.opinfo"></i>
          <span v-show="error.password2.opinfo">
            <i class="tip-status tip-status-opinfo"></i>
            {{error.password2.msg}}
          </span>
        </span>
      </div>
        <!-- 提交注册 -->
      <div class="form-field">
        <button class="btn" @click="registerSubmit()">修改密码</button>
      </div>
    </div>
</div>
</template>

<script>
export default{
  data () {
    return {
      username: "",
      code: "",
      password: "",
      password2: "",
      apiCode: "",
      codeText: "获取验证码",
      codeTextDisabled: false,
      strength: {},
      error: {
        username: {
          bol:false,
          opinfo:false,
          msg:""
        },
        code: {
          bol:false,
          opinfo:false,
          msg:""
        },
        password: {
          bol:false,
          opinfo:false,
          msg:""
        },
        password2: {
          bol:false,
          opinfo:false,
          msg:""
        },
      }
    }
  },
  methods: {
    getStrength () {
      let password = this.password;
      var modes = 0;
      if (/\d/.test(password)) modes++;
      if (/[a-z]/.test(password)) modes++;
      if (/[A-Z]/.test(password)) modes++;
      if (/\W/.test(password)) modes++;
      this.strength = password.length == 0? {} : modes == 3?
      {"bar-strong": true} : modes == 2 ?
      {"bar-normal": true} : {"bar-weak": true};
    },
    getCode () {
      if(this.username===''||this.username.length!=11) {
        this.$message({
            message: '请填写完手机号',
            type: 'warning'
        });
        return false
      }
      this.$api.post('user/yzCode.shtml',{phone:this.username},res=>{
        this.apiCode = res;
        this.$message({
            message: '发送成功',
            type: 'success'
        });
      },res=>{
        this.$message({
            message: res.msg,
            type: 'error'
        });
      });

      this.codeTextDisabled = true;
      this.codeText = 60
      var time = setInterval(()=>{
        if(this.codeText>1){
          this.codeText = this.codeText - 1
        }else{
          this.codeText = "获取验证码"
          this.codeTextDisabled = false
          clearInterval(time);
        }
      },1e3);
    },
    inputFocus (name) {
      this.error[name].bol = false;
    },
    inputBlur (name) {
      var value = event.currentTarget.value
       this.error[name].bol = true
      if(name == 'username'){
          this.error[name].opinfo = value.length != 11
        if(value.length == 0){
          this.error[name].msg = "请输入您的手机号"
        }else if(value.length < 11){
          this.error[name].msg = "请输入11位的手机号"
        }
      }
      if(name == 'code'){
          this.error[name].opinfo = this.code == "" ? true : this.code !== this.apiCode
        if(value.length == 0){
          this.error[name].msg = "请输入验证码"
        }else if(value < 6){
          this.error[name].msg = "请输入6位验证码"
        }else if(value !== this.apiCode){
          this.error[name].msg = "您的验证码验证错误，请重新获取验证"
        }
      }
      if(name == 'password'){
         this.error[name].opinfo = value.length<6
        if(value.length == 0){
          this.error[name].msg = "请填写密码"
        }else if(value.length < 6){
          this.error[name].msg = "密码太短，至少6个字符"
        }
      }
      if(name == 'password2'){
         this.error[name].opinfo = this.password2 == "" ? true : this.password !== this.password2
        if(value.length == 0){
          this.error[name].msg = "请再次输入密码"
        }else if(this.password!=this.password2){
          this.error[name].msg = "两次输入的密码不一致，请重新输入"
        }
      }
    },
    registerSubmit () {
      for(let i in this.error){
        if(this.error[i].bol){

          if(this.error[i].opinfo){
            this.$message({
              message: '资料请填写完整',
              type: 'warning'
            });
            return false;
          }
        }else{
          this.$message({
            message: '资料请填写完整',
            type: 'warning'
          });
          return false;
        }
      }
      this.$api.post('user/editUser.shtml', {
        username: this.$store.state.user.id,
        password: this.password
      }, res => {
        this.$message({
            message: '修改成功',
            type: 'success'
        });
      }, res => {
        this.$message({
            message: res.msg,
            type: 'error'
        });
      })
    }

  }
}
</script>

<style lang="scss">
 .form-div{
    margin-top:20px;
  }
  .pwd{
    padding-bottom: 27px;
  }
</style>