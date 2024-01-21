import axios from 'axios'
const userId =localStorage.getItem('userId');
const cartId =localStorage.getItem('cartId');
export   const addTocart = async (data) => {
    try {
      const response = await axios.get(`/api/product/admin/getproducts/${userId}`);
       return response.data;
    } catch (error) {
      throw error;
    }
  }
