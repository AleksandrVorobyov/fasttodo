<template lang="pug">
form.todolist__form-nav(
  :action="formAction",
  :method="formMethod",
  @submit.prevent
)
  main-input#todoFormInput.todolist__form-nav-search(
    :elPlaceholder="inputPlace",
    @keyup.enter="$emit('clickCreate')"
  )
  main-btn(
    :elText="btnText",
    :elClass="btnClass",
    @clickAction="$emit('clickCreate')"
  )
</template>
<script>
export default {
  props: {
    formMethod: {
      type: String,
      default: "get",
    },
    formAction: {
      type: String,
      default: "#",
    },
    inputPlace: String,
    btnText: String,
    btnClass: String,
  },
  emits: ["clickCreate"],
};
</script>
<style scoped lang="scss">
.todolist__form-nav {
  position: relative;
  padding: 0 10px;
  margin-bottom: 10px;
  display: grid;
  gap: 20px;
  overflow: hidden;
  border-radius: 2px;

  @media (min-width: 460px) {
    padding: 0 40px;
    margin-bottom: 20px;
  }
}

.todolist__form-nav-search {
  max-width: 500px;
  margin: 0 auto;
}

.todolist__form-nav-btn {
  width: 100%;
  margin: 0 auto;
  cursor: pointer;

  @media (min-width: 460px) {
    max-width: 300px;
  }
}
</style>