<template lang="pug">
section.theme-dropdown
  .container
    .theme-dropdown-wrap
      button.theme-dropdown-btn(@click="activeThemeBtn") {{ theme.activeTheme }}
      ul#theme-drop-list.theme-dropdown__list.theme-dropdown__list--hidden
        li.theme-dropdown__list-item(
          v-for="item in theme.themeDropList",
          @click="chengeThemeBtn(item)"
        ) {{ item }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["theme"]),
  },
  methods: {
    activeThemeBtn() {
      this.$store.commit("activeThemeBtn");
    },
    chengeThemeBtn(theme) {
      this.$store.dispatch("chengeThemeBtn", theme);
    },
  },
};
</script>
<style scoped lang="scss">
.theme-dropdown {
  position: relative;
  padding: 30px 0;
  overflow: hidden;
  z-index: 500;
}

.theme-dropdown-wrap {
  position: relative;
}

.theme-dropdown-btn {
  background: transparent;
  border: 2px solid rgb(189, 181, 181);
  width: 100%;
  height: 60px;
  cursor: pointer;
  outline: none;
  color: white;
  line-height: 28px;
  letter-spacing: 0.5px;
  font-size: 24px;
}

.theme-dropdown__list {
  height: auto;
  transition: height 0.5s linear;
}

.theme-dropdown__list > .theme-dropdown__list-item {
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  color: white;
  background: linear-gradient(
      rgba(214, 237, 255, 0.3),
      rgba(214, 237, 255, 0.3)
    ),
    linear-gradient(
      89.96deg,
      rgba(203, 71, 160, 0.5) 0.02%,
      rgba(105, 71, 203, 0.5) 49.47%,
      rgba(0, 255, 133, 0.5) 99.97%
    );
  padding: 10px;
  border-bottom: 2px solid white;
  cursor: pointer;
}

.theme-dropdown__list--hidden {
  display: none;
  height: 0;
}

.theme-dropdown__list > .theme-dropdown__list-item:last-child {
  border-bottom: 0px solid white;
}
</style>