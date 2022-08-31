<template lang="pug">
.categories-card
  h4.categories-card__title.title-gradient {{ categoriesTitle }}
  .categories-card__img
    img(:src="require('@/assets/img/categories/' + categoriesImg)")
</template>
<script>
export default {
  props: {
    categoriesTitle: String,
    categoriesImg: String,
  },
};
</script>
<style scoped lang="scss">
.categories-card {
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
  transition: box-shadow 0.4s linear;

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
    background: rgba(0, 0, 255, 0.3);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
  }
}

.categories-card__img {
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

.categories-card__title {
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