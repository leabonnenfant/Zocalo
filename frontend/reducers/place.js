import { createSlice } from '@reduxjs/toolkit';

const initialState  = {
  value: [{
    placeGoolgeId: null,
    name: null,
    phone: null,
    address: null,
    latitude: null,
    longitude: null,
    rating: null,
    website: null,
    openingInfo: null,
    accessibility: null,
    //isFav:null,
    }]
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    addFavPlace: (state, action) => {
        state.value.push(action.payload);  
      },
    removeFavPlace: (state, action) => {
        state.value = state.value.filter(e => e.name !== action.payload);
      },
  },
});

export const { addFavPlace, removeFavPlace } = placeSlice.actions;
export default placeSlice.reducer;



