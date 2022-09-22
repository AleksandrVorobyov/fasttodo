<template lang="pug">
ul.workplace__theme-list
  li.workplace__theme-list-item(v-for="item in list", :key="item")
    .workplace__theme-list-img
      img(
        :src="item.imgLoad == 'web' ? item.src : require('@/assets/img/' + item.src)"
      )
    h5.workplace__theme-list-title {{ item.title }}
    .workplace__theme-list-del(v-if="remove")
      buttonDelWithIcon(@clickAction="delTheme(item.id)")
    button.workplace__theme-list-rename(type="button", v-else) {{ rename.themeListRenameBtnText }}
</template>
<script>
import buttonDelWithIcon from "../parts/buttonDelWithIcon.vue";
export default {
  props: {
    list: Object,
    remove: Object,
    rename: Object,
  },
  components: {
    buttonDelWithIcon,
  },
  methods: {
    async delTheme(id) {
      await this.$store.dispatch("delTheme", id);
    },
  },
};
</script>
<style scoped lang="scss">
.workplace__theme-list {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  list-style: none;
}

.workplace__theme-list-item {
  position: relative;
  padding: 5px 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 2px solid transparent;
  transition: background 0.4s linear;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
      gray border-box;

    .workplace__theme-list-del,
    .workplace__theme-list-rename {
      opacity: 1;
    }

    .workplace__theme-list-rename {
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.workplace__theme-list-title {
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #fff;
  z-index: 10;
}

.workplace__theme-list-img {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  overflow: hidden;
  z-index: 10;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.workplace__theme-list-del {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  transition: opacity 0.5s linear;
  opacity: 0;
}

.workplace__theme-list-rename {
  position: absolute;
  padding: 10px 25px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background: var(--linearSectionMain);
  transition: all 0.5s linear;
  color: #fff;
  cursor: pointer;
  z-index: 20;
  overflow: hidden;
  border: 2px solid #fff;

  &:hover {
    border-color: #65b37a;
  }
}
</style>