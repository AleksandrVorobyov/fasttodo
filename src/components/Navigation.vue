<template lang="pug">
section.navigation
  .container-big
    .navigation-wrap
      .navigation__logo
        router-link.navigation__logo-link(to="/")
          img.navigation__logo-img(
            :src="require('@/assets/img/' + navigation.logo.img)"
          )
          h1.navigation__logo-title 
            span(v-for="title in navigation.logo.title", :key="title") {{ title }}
      button.navigation__btn(
        v-if="login.userSelected !== true",
        type="button",
        @click="this.$router.push('/login')"
      )
        span {{ login.navBtn.text }}
        SvgIcon(:name="login.navBtn.iconName")
      button.navigation__menu(v-else, type="button")
        span {{ login.name }}
        img.navigation__menu-img(
          :src="require('@/assets/img/' + login.avatar)"
        )
</template>

<script>
import { mapGetters } from "vuex";
import SvgIcon from "./SvgIcon.vue";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["navigation", "login"]),
  },
  components: {
    SvgIcon,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.navigation {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 2000;
}

.navigation-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  height: 80px;
  background: var(--linearMain);
  border-radius: 0px 0px 16px 16px;
  box-shadow: 0px 0px 6px var(--grayBorder);
}

.navigation__logo-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  &:hover {
    .navigation__logo-title {
      color: var(--redMain);
    }
  }
}

.navigation__logo-img,
.navigation__menu-img {
  height: 60px;
  width: 60px;
}

.navigation__menu-img {
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.navigation__logo-title {
  display: inline-grid;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: black;
  font-family: "Benae";
  transition: color 0.4s linear;
}

.navigation__btn,
.navigation__menu {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;

  span {
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: black;
    font-family: "Benae";
    transition: color 0.4s linear;
  }

  svg {
    transition: fill 0.4s linear;
  }

  &:hover {
    span {
      color: var(--redMain);
    }
    svg {
      fill: var(--redMain);
    }
  }
}
</style>
