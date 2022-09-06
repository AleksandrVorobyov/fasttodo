<template lang="pug">
section.registration
  .container
    .registration-wrap
      form.registration__form(action="#") 
        .registration__form-avatar
          img(:src="require('@/assets/img/' + registration.avatarImg)")
        h2.registration__form-title(v-html="registration.title")
        .registration__form-input-row
          formInput(
            v-for="item in registration.input",
            :key="item.id",
            :elId="item.id",
            :elType="item.type",
            :elClass="item.class",
            :elValue="item.value",
            :elPlaceholder="item.placeholder",
            @inputAction="registrationinputSave(item.id)"
          )
          mainBtn(
            :elText="registration.btnText",
            elClass="registration__form-btn",
            @clickAction="registerPerson()"
          )
        p.registration__form-text
          span {{ registration.question }}
          button.title-gradient(
            type="button",
            @click="(registration.animSection = false), animRegistration(), loginToRouter()"
          ) Login...
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
    ...mapGetters(["registration", "user"]),
  },
  methods: {
    animRegistration() {
      this.$store.dispatch("animRegistration");
    },
    loginToRouter() {
      this.$store.dispatch("loginToRouter");
    },
    registrationinputSave(id) {
      this.$store.commit("registrationinputSave", id);
    },
    async registerPerson() {
      await this.$store.dispatch("registerPerson", {
        name: this.registration.input[0].value,
        email: this.registration.input[1].value,
        password: this.registration.input[2].value,
        passwordConfirm: this.registration.input[3].value,
      });
    },
  },
  mounted() {
    this.registration.animSection = true;
    this.animRegistration();
  },
};
</script>
<style scoped lang="scss">
.registration {
  position: relative;
  overflow: hidden;
  z-index: 500;
}

.registration-wrap {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.registration__form {
  position: relative;
  display: grid;
  gap: 20px;
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
    padding: 40px 20px;
    width: 600px;
    gap: 30px;

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

.registration__form-avatar {
  position: relative;
  border-radius: 50%;
  background: var(--linearMain);
  width: 200px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;

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

.registration__form-input-row {
  display: grid;
  gap: 15px;
}

.registration__form-title {
  display: block;
  text-align: center;
  font-size: 32px;
  line-height: 42px;
  letter-spacing: 1px;
  font-weight: 700;
  color: white;

  @media (min-width: 720px) {
    font-size: 36px;
    line-height: 46px;
  }
}

.registration__form-text {
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