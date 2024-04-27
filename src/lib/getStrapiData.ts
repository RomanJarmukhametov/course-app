/**
 * Fetches data from a Strapi API endpoint.
 *
 * This asynchronous function constructs a full URL using a base path to the Strapi API and
 * the specific endpoint provided in the `url` parameter. It makes an HTTP GET request to
 * this URL and returns the parsed JSON data. If the request fails, it throws an error with
 * the HTTP status code or a custom error message if catching a fetch-specific error.
 *
 * @param {string} url - The endpoint to append to the base Strapi URL for the GET request.
 * @returns {Promise<StrapiApiResponse>} A promise that resolves with the JSON data fetched from the API.
 * @throws {Error} Throws an error if the fetch request fails or if the response status is not 'ok'.
 *
 * @example
 * // Usage example to fetch 'courses' data from a Strapi backend
 * getStrapiData('courses?populate=deep').then(data => {
 *   console.log(data);
 * }).catch(error => {
 *   console.error('Failed to fetch courses:', error);
 * });
 */

import axios from "axios";
import { StrapiApiResponse } from "@/data/types";

async function getStrapiData(url: string): Promise<StrapiApiResponse> {
  try {
    // Constructing the full URL to the Strapi API.
    const strapiUrl = `http://localhost:1337/api/${url}`;

    // Using Axios to perform a GET request
    const response = await axios.get(strapiUrl);

    // Axios automatically checks if the response status is in the range of 2xx
    // Parse the JSON from the response and return it.
    return response.data;
  } catch (error) {
    // Axios wraps the original error, so we access `error.response` for details
    if (axios.isAxiosError(error)) {
      // Now we know error is of AxiosError type and can access error.response safely
      if (error.response) {
        console.error(`Error fetching data: ${error.response.status}`);
        throw new Error(`Error fetching data: ${error.response.status}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response received");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error(`Error setting up request: ${error.message}`);
      }
    } else {
      // Handle non-Axios errors here
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export default getStrapiData;
