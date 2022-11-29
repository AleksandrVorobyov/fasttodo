<template lang="pug">
footer.footer
  h3.footer__title {{ footer.ttl }}
  h4.footer__subtitle {{ footer.subTtl }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "fast-footer",
  computed: {
    ...mapGetters(["footer"]),
  },
};
</script>
<style scoped lang="scss">
.footer {
  position: relative;
  padding: 20px;
}

.footer__title {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.3px;
  color: white;

  @media (min-width: 460px) {
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.5px;
  }
}

.footer__subtitle {
  font-size: 14px;
  line-height: 16px;
  color: white;

  @media (min-width: 460px) {
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.3px;
  }
}
</style>