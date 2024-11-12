import axios from 'axios';

const LAMBDA_URL = process.env.REACT_APP_LAMBDA_URL;

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(LAMBDA_URL, {
      action: 'signup',
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const verifyCode = async (email, validationCode) => {
  try {
    const response = await axios.post(LAMBDA_URL, {
      action: 'verify',
      email,
      validationCode,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
