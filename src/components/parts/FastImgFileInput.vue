<template lang="pug">
.image-file
  input.image-file-input(
    :class="inputClass",
    :id="inputId",
    type="file",
    :name="inputName",
    accept="image/*",
    @change="$emit('changeAction', $event)"
  )
  label.image-file-input__label.label-fire(
    :for="inputId",
    :class="labelClass",
    :id="labelId"
  )
    fileLoadSvg
    span {{ inputLoad ? inputFileSucess : inputFile }}
</template>
<script>
import fileLoadSvg from "@/assets/img/iconVue/file-load.vue";
export default {
  name: "img-file-input",
  components: {
    fileLoadSvg,
  },
  props: {
    inputClass: String,
    inputId: String,
    inputName: String,
    labelClass: String,
    labelId: String,
    inputLoad: Boolean,
    inputFileSucess: String,
    inputFile: String,
  },
  emits: ["changeAction"],
};
</script>
<style scoped lang="scss">
.image-file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.image-file-input + .label-fire {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 20px 10px;
  cursor: pointer;
}

.image-file-input__label {
  padding: 0;
  width: 100%;
  margin: auto;
  display: block;
  border: 2px solid #555;
  transition: border 0.4s linear;
}

.image-file-input__label.image-file-input__label--sucess {
  border: 2px solid rgb(52, 243, 61);
}

.image-file-input__label:hover,
.image-file-input__label:focus {
  border-color: #888;
}

.image-file-input__label.label-fire {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  span {
    color: rgb(243, 243, 243);
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.3px;
  }

  @media (min-width: 540px) {
    span {
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.5px;
    }
  }

  svg {
    width: 60px;
    height: 60px;
    fill: #fff;
  }
}
</style>