<template lang="pug">
section.footer
  .container-big
    .footer-wrap 
      h2.footer__title {{ title }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["footer"]),
  },
  data() {
    return {
      title: "© Alex(Voojaxx) - 2022",
    };
  },
};
</script>
<style scoped lang="scss">
.footer {
  position: relative;
  overflow: hidden;
  z-index: 500;
}

.footer-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 10px;
  width: 100%;
  height: 80px;
  background: var(--linearMain);
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 0px 6px var(--grayBorder);
}

.footer__title {
  display: inline-block;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: black;
  font-family: "Benae";
  margin: 0 auto;
}
</style>