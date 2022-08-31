<template lang="pug">
section.todolist__theme
  .container
    .todolist__theme-wrap
      h3.todolist__theme-title {{ theme.title }}
      .todolist__theme-cards
        .todolist__theme-cards-item(
          v-for="(item, index) in theme.themeCardsDefault",
          :key="item",
          :data-theme="item.idx"
        )
          h4.todolist__theme-cards-item-title {{ item.title }}
          .todolist__theme-cards-item-img
            img(:src="require('@/assets/img/' + item.src)")
        button.todolist__theme-cards-next.arrow(@click="themeIndexPlus") 
          arrow
        button.todolist__theme-cards-prev.arrow(@click="themeIndexmin") 
          arrow
</template>
<script>
import { mapGetters } from "vuex";
import arrow from "@/assets/img/iconVue/arrow.vue";
export default {
  computed: {
    ...mapGetters(["theme", "webUser"]),
  },
  components: {
    arrow,
  },
  methods: {
    getThemeStyle() {
      this.$store.commit("getThemeStyle");
    },
    themeIndexPlus() {
      this.$store.dispatch("themeIndexPlus");
    },
    themeIndexmin() {
      this.$store.dispatch("themeIndexmin");
    },
  },
  mounted() {
    this.getThemeStyle();
  },
};
</script>
<style scoped lang="scss">
.todolist__theme {
  position: relative;
  padding: 10px 0;
  overflow: hidden;
  z-index: 500;
}

.todolist__theme-wrap {
  position: relative;
}

.todolist__theme-title {
  margin-bottom: 30px;
  color: white;
  font-size: 34px;
  line-height: 38px;
  letter-spacing: 0.5px;
  text-align: center;
}

.todolist__theme-cards {
  position: relative;
  width: 100%;
  height: 300px;
}

.todolist__theme-cards-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  z-index: 50;
  transition: all 0.4s ease;
}

.todolist__theme-cards-item-title {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px 0px 5px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  line-height: 26px;
  z-index: 10;
  background: #fff;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.todolist__theme-cards-item[data-theme="0"] .todolist__theme-cards-item-title {
  opacity: 1;
}

.todolist__theme-cards-item-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.todolist__theme-cards-next,
.todolist__theme-cards-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  z-index: 100;
}

.todolist__theme-cards-next {
  right: 0;
}

.todolist__theme-cards-prev {
  transform: translateY(-50%) rotate(180deg);
  left: 0;
}

@import url("~@/assets/scss/parts/arrowTheme.scss");
</style>