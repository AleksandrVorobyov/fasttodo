<template lang="pug">
section.module-view(:class="viewClass", :id="viewId")
  slot
</template>
<script>
export default {
  name: 'module-view',
  props: {
    viewClass: String,
    viewId: String,
  },
};
</script>
<style scoped lang="scss">
.module-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7);
  opacity: 1;
}
</style>