<template lang="pug">
input.main-input(
  :type="elType",
  :value="elValue",
  :placeholder="elPlaceholder",
  :class="elClass",
  :id="elId",
  @input="$emit('inputAction')"
)
</template>
<script>
export default {
  name: 'main-input',
  props: {
    elType: {
      type: String,
      default: 'text'
    },
    elValue: String,
    elPlaceholder: String,
    elClass: String,
    elId: String,
  },
  emits: ["inputAction"],
};
</script>
<style scoped lang="scss">
.main-input {
  position: relative;
  padding: 5px 10px;
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: inset 0px 0px 3px 3px #0000007a;
  border-radius: 6px;
  outline: none;
  border: none;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.5px;
  font-weight: 400;

  &:focus::placeholder {
    color: transparent;
  }

  &::placeholder {
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.5px;
    font-weight: 400;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: var(--linearMain);
    font-family: "Pixel";
    transition: opacity 0.4s linear;
  }
}

.main-input.login__main-input.login__main-input--true {
  box-shadow: inset 0px 0px 3px 3px #1bff5fb4;
}

.main-input:focus::placeholder {
  opacity: 0;
}
</style>