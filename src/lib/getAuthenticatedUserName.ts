// @/app/lib/getAuthenticatedUserName.ts

/**
 * Fetches the username of an authenticated user from an API using the user's JWT.
 *
 * This function takes an object containing a JWT and makes an HTTP GET request to the API endpoint
 * that returns user data. It is designed to extract and return the username from the API's response.
 * If the JWT is not provided, or if any errors occur during the API call, it defaults to returning "User".
 *
 * @param {User} user - An object containing the JWT token of the authenticated user.
 * @returns {Promise<string>} A promise that resolves to the username of the authenticated user,
 * or "User" as a fallback in case of no JWT or an error.
 *
 * @example
 * // Example of using getAuthenticatedUserName
 * const user = { jwt: "your_jwt_token_here" };
 * getAuthenticatedUserName(user).then(username => {
 *   console.log(username); // Logs the username or "User" if an error occurred
 * }).catch(error => {
 *   console.error("Failed to fetch username:", error);
 * });
 *
 * @throws {Error} Throws an error if there is a problem fetching the user data.
 */

import axios from "axios";

interface User {
  jwt: string;
}

export const getAuthenticatedUserName = async (user: User): Promise<string> => {
  if (!user || !user.jwt) {
    return "User"; // Fallback if no user or jwt is provided
  }

  try {
    const response = await axios.get("http://localhost:1337/api/users/me", {
      headers: { Authorization: `Bearer ${user.jwt}` },
    });
    return response.data.username || "User"; // Return username or a default "User"
  } catch (error) {
    console.error("Error fetching user name:", error);
    return "User"; // Return fallback name on error
  }
};
