<template lang="pug">
section.todolist__theme
  .container
    .todolist__theme-wrap
      h3.todolist__theme-title {{ theme.title }}
      .todolist__theme-cards
        .todolist__theme-cards-item(
          v-for="(item, index) in theme.themeCards",
          :key="item",
          :data-theme="item.idx",
          :style="{ left: item.style.left, opacity: item.style.opacity, zIndex: item.style.zIndex }"
        )
          h4.todolist__theme-cards-item-title {{ item.title }}
          .todolist__theme-cards-item-img
            img(
              :src="item.imgLoad == 'web' ? item.src : require('@/assets/img/' + item.src)"
            )
        button.todolist__theme-cards-next.arrow(
          :class="theme.btnDisabled == 'next-theme' ? 'todolist__theme-cards-btn--disabled' : ''",
          @click="activeThemeNext()"
        ) 
          arrow
        button.todolist__theme-cards-prev.arrow(
          :class="theme.btnDisabled == 'prev-theme' ? 'todolist__theme-cards-btn--disabled' : ''",
          @click="activeThemePrev()"
        ) 
          arrow
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import arrow from "@/assets/img/iconVue/arrow.vue";
export default {
  name: "list-theme-section",
  components: {
    arrow,
  },
  setup() {
    const store = useStore();

    return {
      theme: computed(() => store.getters.theme),
      activeThemeNext: async () => await store.dispatch("activeThemeNext"),
      activeThemePrev: async () => await store.dispatch("activeThemePrev"),
    };
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
  margin-bottom: 10px;
}

.todolist__theme-title {
  margin-bottom: 10px;
  color: white;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.5px;
  text-align: center;

  @media (min-width: 540px) {
    font-size: 30px;
    line-height: 34px;
  }

  @media (min-width: 820px) {
    font-size: 34px;
    line-height: 38px;
  }
}

.todolist__theme-cards {
  position: relative;
  width: 100%;
  height: 230px;

  @media (min-width: 540px) {
    height: 260px;
  }
}

.todolist__theme-cards-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 230px;
  height: 160px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  z-index: 50;
  transition: all 0.4s ease;

  @media (min-width: 460px) {
    width: 260px;
    height: 180px;
  }

  @media (min-width: 820px) {
    width: 300px;
    height: 200px;
  }
}

.todolist__theme-cards-item-title {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px 0px 5px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 22px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
  transition: opacity 0.4s ease;

  @media (min-width: 820px) {
    font-size: 24px;
    line-height: 26px;
  }
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
  transition: opacity 0.3s linear;
}

.todolist__theme-cards-next {
  right: 0;
}

.todolist__theme-cards-prev {
  transform: translateY(-50%) rotate(180deg);
  left: 0;
}

.todolist__theme-cards-btn--disabled {
  opacity: 0.5;
  pointer-events: none;
}

@import url("~@/assets/css/parts/arrowTheme.css");
</style>