<template lang="pug">
section.login
  .container
    .login-wrap
      form.login__form(action="#")
        .login__form-avatar
          img(:src="require('@/assets/img/' + login.avatar.img)")
        h2.login__form-title(v-html="login.title")
        formInput(
          v-for="item in login.input",
          :key="item.id",
          :elId="item.id",
          :elType="item.type",
          :elClass="item.class",
          :elValue="item.value",
          :elPlaceholder="item.placeholder",
          @inputAction="loginInputSave(item.id)"
        )
        mainBtn(
          :elText="login.btnText",
          elClass="login__form-btn",
          @moveAction="mainBtnAnimMove($event)",
          @leaveAction="mainBtnAnimLeave($event)",
          @clickAction="loginFirebase()"
        )
        p.login__form-text
          span {{ login.btnRegister }}
          button.title-gradient(
            type="button",
            @click="(login.animSection = false), animLogin(), registrationTo()"
          ) Registration...
</template>
<script>
import { mapGetters } from "vuex";
import formInput from "./parts/formInput.vue";
import mainBtn from "./parts/mainBtn.vue";
export default {
  components: {
    formInput,
    mainBtn,
  },
  computed: {
    ...mapGetters(["login", "user"]),
  },
  methods: {
    animLogin() {
      this.$store.dispatch("animLogin");
    },
    registrationTo() {
      this.$store.dispatch("registrationTo");
    },
    mainBtnAnimMove(btn) {
      this.$store.commit("mainBtnAnimMove", btn);
    },
    mainBtnAnimLeave(btn) {
      this.$store.commit("mainBtnAnimLeave", btn);
    },
    loginInputSave(id) {
      this.$store.dispatch("loginInputSave", id);
    },
    async loginFirebase() {
      await this.$store.dispatch("loginFirebase", {
        email: this.login.input[0].value,
        password: this.login.input[1].value,
      });
    },
  },
  mounted() {
    this.login.animSection = true;
    this.animLogin();
  },
};
</script>
<style scoped lang="scss">
.login {
  position: relative;
  overflow: hidden;
  z-index: 500;
}

.login-wrap {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login__form {
  position: relative;
  display: inline-block;
  padding: 15px;
  width: 100%;
  background: linear-gradient(var(--bgMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 8px solid transparent;
  border-radius: 16px;
  z-index: 100;

  @media (min-width: 460px) {
    padding: 20px;
    width: 450px;
  }

  @media (min-width: 720px) {
    width: 600px;
    height: 800px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      background: var(--linearMain);
      width: 100%;
      height: 100%;
      border-radius: 16px;
      z-index: -2;
      opacity: 0.7;
      filter: blur(10px);
      transform: scale(1.1);
    }

    &::after {
      position: absolute;
      top: 8px;
      left: 8px;
      content: "";
      background: var(--bgMain);
      width: calc(100% - 16px);
      height: calc(100% - 16px);
      border-radius: 16px;
      z-index: -1;
      opacity: 1;
    }
  }
}

.login__form-avatar {
  position: relative;
  border-radius: 50%;
  background: var(--linearMain);
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow: hidden;

  @media (min-width: 720px) {
    margin-bottom: 30px;
  }

  img {
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
}

.login__form-title {
  display: block;
  margin-bottom: 20px;
  text-align: center;
  font-size: 32px;
  line-height: 42px;
  letter-spacing: 1px;
  font-weight: 700;
  color: white;

  @media (min-width: 720px) {
    margin-bottom: 30px;
    font-size: 36px;
    line-height: 46px;
  }
}

.login__form-btn {
  margin-bottom: 20px;
}

.login__form-text {
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #fff;

  button {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.5px;
    cursor: pointer;
    outline: none;
    margin-left: 5px;
    border: none;
  }
}
</style>