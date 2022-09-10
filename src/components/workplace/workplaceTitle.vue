<template lang="pug">
h4.workplace__title {{ data.text }}
</template>
<script>
export default {
  props: {
    data: Object,
  },
};
</script>
<style scoped lang="scss">
.workplace__title {
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  text-align: center;

  &::before {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    content: "";
    background: var(--linearSectionMain);
    border-radius: 6px;
  }
}
</style>