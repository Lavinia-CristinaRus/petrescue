import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    verificationRequest: (state) => {
      state.loading = true;
    },
    verificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    verificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const messageReducer = createReducer(
  {},
  {
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    forgetPasswordRequest: (state) => {
      state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const reportReducer = createReducer(
  {},
  {
    allReportsRequest: (state) => {
      state.loading = true;
    },
    allReportsSuccess: (state, action) => {
      state.loading = false;
      // state.isAuthenticated = true;
      state.post = action.payload;
      // state.message = action.payload.message;
    },
    allReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    seenPetRequest: (state) => {
      state.loading = true;
    },
    seenPetSuccess: (state, action) => {
      // const postId = action.payload.postId;
      // const postToUpdate = state.post.find((p) => p._id === postId);
      // postToUpdate.likes += 1;
    },    
    seenPetFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    unseenPetRequest: (state) => {
      state.loading = true;
    },
    unseenPetSuccess: (state, action) => {
      // const postId = action.payload.postId;
      // const postToUpdate = state.post.find((p) => p._id === postId);
      // postToUpdate.likes -= 1;
    },    
    unseenPetFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

  },
);

export const petReducer = createReducer(
  {},
  {
    allPetsRequest: (state) => {
      state.loading = true;
    },
    allPetsSuccess: (state, action) => {
      state.loading = false;
      // state.isAuthenticated = true;
      state.post = action.payload;
      // state.message = action.payload.message;
    },
    allPetsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    savePetRequest: (state) => {
      state.loading = true;
    },
    savePetSuccess: (state, action) => {
      // const postId = action.payload.postId;
      // const postToUpdate = state.post.find((p) => p._id === postId);
      // postToUpdate.likes += 1;
    },    
    savePetFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    unsavePetRequest: (state) => {
      state.loading = true;
    },
    unsavePetSuccess: (state, action) => {
      // const postId = action.payload.postId;
      // const postToUpdate = state.post.find((p) => p._id === postId);
      // postToUpdate.likes -= 1;
    },    
    unsavePetFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

  },
);
