const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

// The sign-up function (Stage 1)
const signUp = async (email, password) => {
  const params = {
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID, // Your Cognito App Client ID
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'false' }, // Ensure email is not verified
    ],
  };

  try {
    await cognito.signUp(params).promise();
    return { message: 'Sign up successful, verification code sent' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// The verify function (Stage 2)
const verifyCode = async (email, validationCode) => {
  const params = {
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID, // Your Cognito App Client ID
    Username: email,
    ConfirmationCode: validationCode,
  };

  try {
    await cognito.confirmSignUp(params).promise();
    return { message: 'Email verified successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Lambda handler function
exports.handler = async (event) => {
  const { action, email, password, validationCode } = JSON.parse(event.body);

  try {
    let response;
    
    // Based on action, either sign up or verify code
    if (action === 'signup') {
      response = await signUp(email, password);
    } else if (action === 'verify') {
      response = await verifyCode(email, validationCode);
    } else {
      throw new Error('Invalid action');
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
