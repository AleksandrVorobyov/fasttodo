<template lang="pug">
button.btn-del__trash(type="button", @click="$emit('clickAction', $event)")
  iconTrash
</template>
<script>
import iconTrash from "@/assets/img/iconVue/trash.vue";
export default {
  name: "btn-del-trash",
  components: {
    iconTrash,
  },
  props: {
    btn: Object,
  },
  emits: ["clickAction"],
};
</script>
<style scoped lang="scss">
.btn-del__trash {
  display: block;
  padding: 3px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 1;

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