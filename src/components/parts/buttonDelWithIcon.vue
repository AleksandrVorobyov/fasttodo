<template lang="pug">
button.btn-del__icon(type="button", @click="$emit('clickAction', $event)")
  iconTrash
</template>
<script>
import iconTrash from "@/assets/img/iconVue/trash.vue";
export default {
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
.btn-del__icon {
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