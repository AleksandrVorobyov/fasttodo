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
      errors: {
        inputErrorEmpty: "Поле для ваших задач пустое! Заполните его!",
        duble: "Такая задача уже существует!",
      },
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
  mutations: {
    updatePersonRecord(state, newPersonList) {
      state.personRecord = newPersonList;
    },
  },
  actions: {
    getUpperFirstletter(state, text) {
      const splitted = text.split("");
      const first = splitted[0].toUpperCase();
      const rest = [...splitted];
      rest.splice(0, 1);
      const result = [first, ...rest].join("");
      return result;
    },
    checkingForDuplicationRecord({ state }, title) {
      let error = true;
      state.personRecord.forEach((item) => {
        if (item.text == title) {
          return (error = false);
        }
      });
      return error;
    },
    async getNewRecord({ state, getters, commit, dispatch }, message) {
      try {
        const validDublicate = await dispatch(
          "checkingForDuplicationRecord",
          message
        );

        if (message === "") {
          throw new SyntaxError(state.todoForm.errors.inputErrorEmpty);
        }

        if (!validDublicate) {
          throw new SyntaxError(state.todoForm.errors.duble);
        }

        const productInput = document.getElementById("todoFormInput");
        const yourMessage = await dispatch("getUpperFirstletter", message);
        const db = getDatabase();
        const uid = await dispatch("getUid");

        const newPostKey = push(child(ref(db), "recordList")).key;
        const updates = {};
        const idTheme = await getters.theme.activeTheme;

        updates[`users/${uid}/info/recordList/${idTheme}/${newPostKey}`] =
          yourMessage;

        let item = {
          id: newPostKey,
          text: yourMessage,
        };

        productInput.value = "";
        state.personRecord.push(item);
        return update(ref(db), updates);
      } catch (err) {
        return await dispatch("getNotificationError", err.message);
      }
    },
    async dragRecordSave({ state, getters, dispatch }) {
      try {
        let newRecordList = state.personRecord;
        const db = getDatabase();
        const uid = await dispatch("getUid");
        const idTheme = await getters.theme.activeTheme;
        await set(ref(db, `users/${uid}/info/recordList/${idTheme}`), {
          item: null,
        });

        await newRecordList.forEach((item, index) => {
          let updates = {};
          let newPostKey = push(child(ref(db), "recordList")).key;
          updates[`users/${uid}/info/recordList/${idTheme}/${newPostKey}`] =
            item.text;
          return update(ref(db), updates);
        });
        await dispatch("loadPersonRecord");
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async delRecord({ state, getters, dispatch }, record) {
      try {
        const db = getDatabase();
        const uid = await dispatch("getUid");
        const idTheme = await getters.theme.activeTheme;
        const delElem = state.personRecord[record].id;
        state.personRecord.splice(record, 1);

        const updates = {};
        updates[`users/${uid}/info/recordList/${idTheme}/${delElem}`] = {};
        await update(ref(db), updates);
      } catch (err) {
        return await dispatch("getNotificationError", err);
      }
    },
    async loadPersonRecord({ state, getters, dispatch }) {
      const uid = await dispatch("getUid");
      const dbRef = ref(getDatabase());
      const idTheme = await getters.theme.activeTheme;

      await get(child(dbRef, `users/${uid}/info/recordList/${idTheme}/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let allTheme = snapshot.val();
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
            return (
              (state.personRecord = new Array()),
              console.log("No data available")
            );
          }
        })
        .catch((error) => {
          return dispatch("getNotificationError", error);
        });
    },
  },
};
