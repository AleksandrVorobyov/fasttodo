export default {
    state: {
        notification: {
            visible: false,
            type: null,
            text: null
        },
    },
    getters: {
        notification(state) {
            return state.notification;
        },
    },
    mutations: {
    },
    actions: {
        getNotificationError({ state }, text) {
            state.notification.type = "notificationError"
            state.notification.text = text
            state.notification.visible = true
            setTimeout(() => {
                return state.notification.type, state.notification.text = null, state.notification.visible = false
            }, 4000);
        },
    }
}