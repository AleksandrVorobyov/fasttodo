<template lang="pug">
h3.module-view__title(:class="titleClass") {{ titleText }}
</template>
<script>
export default {
  props: {
    titleText: String,
    titleClass: String,
  },
};
</script>
<style scoped lang="scss">
.module-view__title {
  display: block;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 1px;
  font-weight: 700;
  color: white;

  @media (min-width: 540px) {
    font-size: 18px;
    line-height: 26px;
  }

  @media (min-width: 720px) {
    font-size: 26px;
    line-height: 34px;
  }
}
</style>