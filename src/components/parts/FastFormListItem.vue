<template lang="pug">
li.todolist__form-body-item.list-group-item
  span {{ idx + 1 + ')' }}
  span {{ text }}
  button.todolist__form-body-drag.handle(type="button")
    span
  .todolist__form-body-del
    btn-del-trash(@clickAction="$emit('delItem', idx)")
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  emits: ["delItem"],
};
</script>
<style scoped lang="scss">
.todolist__form-body-item {
  position: relative;
  padding: 10px 50px 10px 5px;
  width: 100%;
  background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
    var(--linearMain) border-box;
  border: 2px solid transparent;
  z-index: 10;

  span {
    color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 18px;
    font-family: "Benae";
    font-weight: 400;
  }

  @media (min-width: 540px) {
    span {
      font-size: 18px;
      line-height: 22px;
    }
  }

  span + span {
    margin-left: 8px;
  }

  &:hover {
    background: linear-gradient(var(--bgInputMain) 0 0) padding-box,
      gray border-box;

    .todolist__form-body-drag,
    .todolist__form-body-del {
      opacity: 1;
    }
  }
}

.todolist__form-body-del {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}

.todolist__form-body-del,
.todolist__form-body-drag {
  opacity: 0;
  transition: opacity 0.5s linear;
}

.todolist__form-body-drag {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 16px;
  width: 32px;
  background: transparent;
  border: none;
  cursor: move;
  padding: 5px;

  &::before,
  &::after,
  span::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: grey;
    pointer-events: none;
    user-select: none;
  }

  span {
    pointer-events: none;
    user-select: none;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  span::before {
    top: 50%;
    transform: translateY(-50%);
  }
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>