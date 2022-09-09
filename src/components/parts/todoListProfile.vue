<template lang="pug">
button#todolistProfile.todolist-profile(type="button")
  h5.todolist-profile__username {{ webUser.username }}
  .todolist-profile__img
    img#todolistProfileImg(
      :src="require('@/assets/img/' + (profile.avatarImg.userСhoice ? profile.avatarImg.userСhoice : profile.avatarImg.default))"
    )
    span 
      Icon(:name="'arrow-down'")
</template>

<script>
import { mapGetters } from "vuex";
import Icon from "@/components/SvgIcon.vue";
export default {
  components: {
    Icon,
  },
  computed: {
    ...mapGetters(["profile", "webUser"]),
  },
};
</script>
<style scoped lang="scss">
.todolist-profile {
  position: relative;
  display: flex;
  gap: 5px;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 0px;
  cursor: pointer;

  &:hover {
    img {
      opacity: 0.6;
    }

    span {
      opacity: 1;
    }
  }
}

.todolist-profile.todolist-profile--active {
  img {
    opacity: 0.6;
  }

  span {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(180deg);
  }
}

.todolist-profile__username {
  display: inline-block;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #fff;
}

.todolist-profile__img {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.5s linear;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    opacity: 0;
    transition: opacity 0.5s linear;
  }

  span svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    color: var(--clockLight);
  }
}
</style>