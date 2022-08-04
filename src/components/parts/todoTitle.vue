<template lang="pug">
h2.todolist__title(v-html="title")
</template>
<script>
export default {
  props: { title: String },
};
</script>
<style lang="scss">
.todolist__title {
  position: relative;
  text-align: center;
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>