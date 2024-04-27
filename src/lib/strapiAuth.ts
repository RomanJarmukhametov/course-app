import axios from "axios";

/**
 * Represents the registration data for a user.
 */
interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

/**
 * Represents the data required for user login.
 */
interface LoginData {
  identifier: string; // Username or Email
  password: string;
}

/**
 * Registers a user using the provided registration data.
 * @param registrationData - The data required for user registration.
 * @returns A Promise that resolves to the response data from the registration API.
 * @throws An error if there is an error response from the registration API or if an unknown error occurs.
 */
export const registerUser = async (registrationData: RegistrationData) => {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      registrationData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle the error response from Strapi here

      throw new Error(error.response.data.error.message);
    } else {
      // Handle unknown errors
      throw new Error("An unknown error occurred during registration.");
    }
  }
};

/**
 * Logs in a user using the provided login data.
 * @param loginData - The login data containing the user's credentials.
 * @returns A Promise that resolves to the response data from the login request.
 * @throws If an error occurs during the login process.
 */
export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local",
      loginData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle the error response from Strapi here, often error.response.data.message
      throw new Error(error.response.data.error.message);
    } else {
      // Handle unknown errors
      throw new Error("An unknown error occurred during login.");
    }
  }
};
