import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  value: { id: null, email: null, lastName: null, firstName: null, password: null, token: null, favProjects: [], favPlaces: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {    //addUser : Cette action ajoute currentUser au tableau users et réinitialise currentUser après l'ajout.
      const newUser = { ...action.payload, favProjects: [], favPlaces: []}; //un identifiant unique généré
      state.users.push(newUser);
      state.value = {...newUser};
      console.log(state);
    },// Action pour ajouter un utilisateur au tableau users et réinitialiser l'état utilisateur

      setProjectId: (state, action) => {
        state.value.projectId = action.payload;
      },

    resetUser: (state) => {
      state.value = initialState.value;
    },

    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
      // state.value.favPlaces = action.payload.favPlaces;
      // Optionally clear password field after login
      state.value.password = null;
    },


    updateSkills: (state, action) => {
      state.value.skills = action.payload.skills;
      state.value.pseudo = action.payload.pseudo;
    },

    addFavPlace: (state, action) => {
      state.value.favPlaces.push(action.payload);  
    },
    removeFavPlace: (state, action) => {
      state.value.favPlaces = state.value.favPlaces.filter(e => e.googleId !== action.payload.googleId);
    },
    addFavoriteProject: (state, action) => {
      state.value.favProjects.push(action.payload)
    },
    
    removeFavoriteProject: (state, action) => {
      state.value.favProjects = state.value.favProjects.filter(project => project._id !== action.payload);
    }
    
  },
})

export const {addUser, setProjectId, resetUser,login,  updateSkills, addFavPlace , removeFavPlace, addFavoriteProject, removeFavoriteProject } = userSlice.actions;
export default userSlice.reducer;

