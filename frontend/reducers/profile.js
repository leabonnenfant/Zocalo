/*import { createSlice } from '@reduxjs/toolkit';

const initialState  = {
  profile: [],
  value: { id: null, pseudo: null, nationality:  null, picture: null, bio: null, position: null},
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createid: (state, action) => {
      state.value.id = action.payload;
    }, 
    createPseudo: (state, action) => {
        state.value.pseudo = action.payload;
        state.value.id = action.payload;
    },
    createNationality: (state, action) => {
      state.value.nationality= action.payload;
  },
  createPicture: (state, action) => {
    state.value.picture= action.payload;
},
    addProfile: (state, action) => {    //addUser : Cette action ajoute currentUser au tableau users et réinitialise currentUser après l'ajout.
      const newProfile = { ...action.payload, id: Date.now().toString()}; //un identifiant unique généré
      state.profile.push(newProfile);
      state.value = { id: null, pseudo: null, nationality:  null, picture: null, bio: null, position: null};
    },// Action pour ajouter un utilisateur au tableau users et réinitialiser l'état utilisateur
    resetUser: (state) => {// Ajouter le nouvel utilisateur au tableau users
      state.value = initialState.value; //Pour réinitialiser l'état utilisateur à sa valeur
    }, // Action pour réinitialiser l'état utilisateur à sa valeur initiale
  },
});

export const { createid, createPseudo, createFirstName,createNationality, addProfile, createPicture} = profileSlice.actions;
export default profileSlice.reducer;*/
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
 profiles: [],
};


export const profileSlice = createSlice({
 name: 'profile',
 initialState,
 reducers: {
   addProfile: (state, action) => {
     state.profiles.push(action.payload);
   },
   updateSkills: (state, action) => {
     const index = state.profiles.findIndex(profile => profile.pseudo === action.payload.pseudo);
     if (index !== -1) {
       state.profiles[index].skills = action.payload.skills;
     }
   },
 },
});


export const { addProfile, updateSkills } = profileSlice.actions;
export default profileSlice.reducer;

