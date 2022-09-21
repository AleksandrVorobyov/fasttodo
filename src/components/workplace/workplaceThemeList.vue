<template lang="pug">
ul.workplace__theme-list
  li.workplace__theme-list-item(v-for="item in list", :key="item")
    .workplace__theme-list-img
      img(
        :src="item.imgLoad == 'web' ? item.src : require('@/assets/img/' + item.src)"
      )
    h5.workplace__theme-list-title {{ item.title }}
    button.workplace__theme-list-del(type="button", @click="delTheme(item.id)")
      iconTrash
</template>
<script>
import iconTrash from "@/assets/img/iconVue/trash.vue";
export default {
  props: {
    list: Object,
    remove: Object,
  },
  components: {
    iconTrash,
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

  &:hover {
    background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
      gray border-box;
    .workplace__theme-list-del {
      opacity: 1;
    }
  }
}

.workplace__theme-list-title {
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #fff;
}

.workplace__theme-list-img {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  overflow: hidden;

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
  padding: 3px;
  top: 50%;
  right: 5px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
  transform: translateY(-50%);
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0;

  svg {
    object-fit: contain;
    transition: fill 0.4s linear;
    pointer-events: none;
  }

  &:hover svg {
    fill: red;
  }
}
</style>