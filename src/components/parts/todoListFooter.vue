<template lang="pug">
footer.todoList-footer
  h3.todoList-footer__title {{ footer.ttl }}
  h4.todoList-footer__subtitle {{ footer.subTtl }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["footer"]),
  },
};
</script>
<style scoped lang="scss">
.todoList-footer {
  position: relative;
  padding: 20px;
}

.todoList-footer__title {
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

.todoList-footer__subtitle {
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