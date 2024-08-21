import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Options, Quiz } from "../Types/Quize";
type Props = {};

function useApiClient() {
  const apiClient = axios.create({
    baseURL: BASE_URL, // Set your baseURL here
  });

  // Add a request interceptor to automatically include the token in headers
  apiClient.interceptors.request.use(
    (config) => {
      // Get the token from localStorage
      const token = String(localStorage.getItem("quiz_builder"));

      // If a token exists, add it to the Authorization header
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      // Handle the error
      return Promise.reject(error);
    }
  );

  async function createQuiz(data: Quiz) {
    try {
      let res = await apiClient.post("/api/quiz", data);
     
      if (res.status == 201) {
        return true;
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
      return false;
    }
  }

  async function getMyStats(){
    try {
      let res = await apiClient.get("/api/user/getstats");
     
      if (res.status == 200) {
        return res.data.data;
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
      return false;
    }
  }

  return {
    createQuiz,
    apiClient,
    getMyStats,
  };
}

export default useApiClient;
