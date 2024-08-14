import axios from "axios";

const fetchStatus = async (urlEndpoints: string[]) => {
    const statusPromises = urlEndpoints.map(async (endpoint) => {
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