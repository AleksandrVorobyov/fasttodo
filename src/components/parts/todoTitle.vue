<template lang="pug">
h1.todolist__title(v-html="title")
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
  font-size: 28px;
  line-height: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;

  @media (min-width: 460px) {
    font-size: 36px;
    line-height: 42px;
  }

  @media (min-width: 540px) {
    font-size: 42px;
    line-height: 48px;
  }

  @media (min-width: 820px) {
    font-size: 48px;
    line-height: 56px;
  }
}
</style>