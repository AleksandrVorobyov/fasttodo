<template lang="pug">
.theme-control-card(@click="$emit('actionClick', $event)")
  h4.theme-control-card__title.title-gradient {{ themeControlTitle }}
  .theme-control-card__img
    img(:src="require('@/assets/img/categories/' + themeControlImg)")
</template>
<script>
export default {
  name: "theme-control-card",
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 70px;
  gap: 10px;
  border-radius: 16px;
  padding: 10px;
  overflow: hidden;
  background: rgba(233, 228, 228, 0.3);
  cursor: pointer;
  transition: box-shadow 0.4s linear, all 0.4s linear;

  @media (min-width: 540px) {
    justify-content: space-between;
    height: 110px;
  }

  @media (min-width: 720px) {
    gap: 15px;
    padding: 15px;
    height: 140px;
    width: 180px;
  }

  @media (min-width: 820px) {
    width: 200px;
    height: 150px;
  }

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
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  z-index: 30;
  opacity: 0.4;
  transition: opacity 0.4s linear;

  @media (min-width: 540px) {
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0);
  }

  @media (min-width: 720px) {
    width: 60px;
    height: 60px;
  }

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
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #fff;
  margin: 0;
  text-align: center;
  transition: opacity 0.4s linear;

  @media (min-width: 820px) {
    font-size: 22px;
    line-height: 26px;
  }
}
</style>