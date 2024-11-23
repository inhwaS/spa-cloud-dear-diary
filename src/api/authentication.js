import axios from 'axios';

const lambdaUrl = process.env.NEXT_PUBLIC_LAMBDA_URL;

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(lambdaUrl, {
      action: 'signup',
      email,
      password,
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};