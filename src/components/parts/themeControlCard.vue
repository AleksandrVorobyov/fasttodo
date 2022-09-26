<template lang="pug">
.theme-control-card(@click="$emit('actionClick', $event)")
  h4.theme-control-card__title.title-gradient {{ themeControlTitle }}
  .theme-control-card__img
    img(:src="require('@/assets/img/categories/' + themeControlImg)")
</template>
<script>
export default {
  props: {
    themeControlTitle: String,
    themeControlImg: String,
  },
  emits: ["actionClick"],
};
</script>
<style scoped lang="scss">
.theme-control-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 150px;
  gap: 15px;
  border-radius: 16px;
  padding: 15px;
  overflow: hidden;
  background: rgba(233, 228, 228, 0.3);
  cursor: pointer;
  transition: box-shadow 0.4s linear, all 0.4s linear;

  * {
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0px 0px 12px var(--activeMain);

    .categories-card__img {
      opacity: 1;
    }

    &::before {
      width: 100%;
      opacity: 1;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    content: "";
    background: var(--bgMain);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
  }
}

.theme-control-card.theme-control-card--active {
  box-shadow: 0px 0px 12px var(--activeMain);

  .categories-card__img {
    opacity: 1;
  }

  &::before {
    width: 100%;
    opacity: 1;
  }
}

.theme-control-card[data-disabled="true"] {
  opacity: 0.7;

  &:hover {
    box-shadow: 0;

    &::before {
      opacity: 0;
      width: 0;
    }
    .categories-card__img {
      opacity: 0.4;
    }
  }
}

.theme-control-card__img {
  position: relative;
  width: 60px;
  height: 60px;
  z-index: 30;
  opacity: 0.4;
  transition: opacity 0.4s linear;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
    object-position: center;
  }
}

.theme-control-card__title {
  position: relative;
  z-index: 40;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.5px;
  color: #fff;
  margin: 0;
  text-align: center;
  transition: opacity 0.4s linear;
}
</style>