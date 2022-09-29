<template lang="pug">
h3.nav-time {{ fastToDoList.time }}
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["fastToDoList"]),
  },
};
</script>
<style scoped lang="scss">
.nav-time {
  position: relative;
  display: inline-block;
  color: white;
  font-size: 14px;
  line-height: 16px;

  @media (min-width: 720px) {
    display: none;
  }
}
</style>