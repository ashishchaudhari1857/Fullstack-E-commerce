import axios from 'axios'
export   const addTocart = async (id,cartId) => {
    try {
      const response = await axios.post(`/api/cart/add_To_cart`, {productId:id ,cartId:cartId});
       return response.data;
    } catch (error) {
      throw error;
    }
  }

  //get all products

  export   const getCartProducts = async (cartId) => {
    try {
      const response = await axios.get(`/api/cart/getcart/${cartId}`);
       return response.data.result;
    } catch (error) {
      throw error;
    }
  }
  // remove from cart

  // export   const getCartProducts = async (id,cartId) => {
  //   try {
  //     const response = await axios.get(`/api/cart/getcart/${cartId}`);
  //      return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
