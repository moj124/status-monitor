import axios from "axios";

const fetchStatus = async (url_endpoints: string[]) => {
    const statusPromises = url_endpoints.map(async (endpoint) => {
      try {
        const response = await axios.get(endpoint);
        return { endpoint, data: response.data };
      } catch (error) {
        return { endpoint, error: (error as {message: string}).message };
      }
    });
  
    return Promise.all(statusPromises);
};
export default fetchStatus;
