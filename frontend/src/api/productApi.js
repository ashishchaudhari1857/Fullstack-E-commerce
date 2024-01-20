 import axios from 'axios'
 
 export const GetProducts = async (data) => {
    try {
      const response = await axios.get(``);
      return response.data;
    } catch (error) {
      throw error;
    }
  }