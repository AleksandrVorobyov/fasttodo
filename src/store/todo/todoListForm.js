import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
} from "firebase/database";
export default {
  state: {
    todoForm: {
      title: "Список задач в данной теме пуст! Добавьте новую задачу!",
      inputPlaceholder: "Поле для ваших задач...",
      btnText: "Добавить",
      inputErrorEmpty: "Поле для ваших задач пустое! Заполните его!",
    },
    personRecord: [],
  },
  getters: {
    todoForm(state) {
      return state.todoForm;
    },
    personRecord(state) {
      return state.personRecord;
    },
  },
  mutations: {},
  actions: {
    getUpperFirstletter(state, text) {
      const splitted = text.split("");
      const first = splitted[0].toUpperCase();
      const rest = [...splitted];
      rest.splice(0, 1);
      const result = [first, ...rest].join("");
      return result;
    },
    async getNewRecord({ state, dispatch, commit }, message) {
      const productInput = document.getElementById("todoFormInput");
      if (productInput.value != "") {
        const yourMessage = await dispatch("getUpperFirstletter", message);
        const db = getDatabase();
        const uid = await dispatch("getUid");

        const newPostKey = push(child(ref(db), "recordList")).key;
        const updates = {};

        updates[`users/${uid}/info/recordList/${newPostKey}`] = yourMessage;

        let item = {
          id: newPostKey,
          text: yourMessage,
        };

        productInput.value = "";
        state.personRecord.push(item);
        return update(ref(db), updates);
      } else {
        return await dispatch(
          "getNotificationError",
          state.todoForm.inputErrorEmpty
        );
      }
    },
    async dragRecordSave({ state, dispatch }) {
      try {
        let newRecordList = state.personRecord;
        const db = getDatabase();
        const uid = await dispatch("getUid");
        await set(ref(db, `users/${uid}/info/recordList/`), {
          item: null,
        });

        await newRecordList.forEach((item, index) => {
          let updates = {};
          let newPostKey = push(child(ref(db), "recordList")).key;
          updates[`users/${uid}/info/recordList/${newPostKey}`] = item.text;
          return update(ref(db), updates);
        });
        await dispatch("loadPersonRecord");
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async delRecord({ state, dispatch }, record) {
      try {
        const db = getDatabase();
        const uid = await dispatch("getUid");
        const delElem = state.personRecord[record].id;
        state.personRecord.splice(record, 1);

        const updates = {};
        updates[`users/${uid}/info/recordList/${delElem}`] = {};
        await update(ref(db), updates);
      } catch (error) {
        return await dispatch("getNotificationError", error);
      }
    },
    async loadPersonRecord({ state, dispatch }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(getDatabase());

      await get(child(dbRef, `users/${uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let allTheme = snapshot.val().info.recordList;
            let result = Object.entries(allTheme);
            let keys = [];

            for (let idx = 0; idx < result.length; idx++) {
              let obj = Object.assign({}, result[idx]);
              keys.push(obj);
            }

            keys = keys.map(function (obj) {
              obj["id"] = obj["0"];
              obj["text"] = obj["1"];
              delete obj["0"];
              delete obj["1"];
              return obj;
            });

            return (state.personRecord = keys);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          return false;
        });
    },
  },
};
