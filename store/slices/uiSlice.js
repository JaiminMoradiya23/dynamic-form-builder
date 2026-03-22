import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFieldId: null,
  isPreviewMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedField(state, action) {
      state.selectedFieldId = action.payload;
    },
    togglePreviewMode(state) {
      state.isPreviewMode = !state.isPreviewMode;
    },
  },
});

export const { setSelectedField, togglePreviewMode } = uiSlice.actions;
export default uiSlice.reducer;
