import axios from 'axios'
const cartId =localStorage.getItem('cartId');
export   const addTocart = async (id) => {
    try {
      const response = await axios.post(`/api/cart/add_To_cart`, {productId:id ,cartId:cartId});
       return response.data;
    } catch (error) {
      throw error;
    }
  }

  //get all products

  export   const getCartProducts = async (id) => {
    try {
      const response = await axios.get(`/api/cart/getcart/${cartId}`);
       return response.data.result;
    } catch (error) {
      throw error;
    }
  }
  // remove from cart

  // export   const getCartProducts = async (id) => {
  //   try {
  //     const response = await axios.get(`/api/cart/getcart/${cartId}`);
  //      return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
