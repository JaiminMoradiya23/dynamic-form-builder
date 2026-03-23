import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFields(state, action) {
      state.fields = action.payload;
    },
    clearFields(state) {
      state.fields = [];
    },
    addField(state, action) {
      state.fields.push(action.payload);
    },
    removeField(state, action) {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
    },
    updateField(state, action) {
      const { id, updates } = action.payload;
      const field = state.fields.find((f) => f.id === id);
      if (field) Object.assign(field, updates);
    },
    reorderFields(state, action) {
      state.fields = action.payload;
    },
  },
});

export const {
  setFields,
  clearFields,
  addField,
  removeField,
  updateField,
  reorderFields,
} = formSlice.actions;
export default formSlice.reducer;
