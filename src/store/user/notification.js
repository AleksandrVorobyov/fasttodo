export default {
  state: {
    notification: {
      visible: false,
      type: null,
      text: null,
    },
  },
  getters: {
    notification(state) {
      return state.notification;
    },
  },
  mutations: {},
  actions: {
    getNotificationError({ state }, text) {
      if (!state.notification.visible) {
        state.notification.type = "error";
        state.notification.text = text;
        state.notification.visible = true;
        setTimeout(() => {
          return (
            state.notification.type,
            (state.notification.text = null),
            (state.notification.visible = false)
          );
        }, 4000);
      }
    },
    getNotificationSuccess({ state }, text) {
      if (state.notification.visible) {
        state.notification.type = "success";
        state.notification.text = text;
        state.notification.visible = true;
        setTimeout(() => {
          return (
            state.notification.type,
            (state.notification.text = null),
            (state.notification.visible = false)
          );
        }, 4000);
      }
    },
  },
};
