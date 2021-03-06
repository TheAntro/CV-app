import axios from 'axios';

import {
  GET_PROFILE
} from './types';

// Get profile
export const getProfileById = profileId => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profiles/${profileId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};