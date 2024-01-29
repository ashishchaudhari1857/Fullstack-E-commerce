 import axios from 'axios'

 //  finding proudcts of particular   user
 export   const GetProducts = async (userId) => {
    try {
      const response = await axios.get(`/api/product/admin/getproducts/${userId}`);
       return response.data;
    } catch (error) {
      throw error;
    }
  }

// delete   product by admin
  export   const DeleteProduct = async (id ,userId)  => {
    try {
      const response = await axios.delete(`/api/product/delete/${userId}/${id}`);
       return response.data;
    } catch (error) {
      throw error;
    }
  }
  //update  the status of a product

  export   const UpdateProduct = async (id ,formData ,userId) => {
    try {
      const response = await axios.put(`/api/product/update/${userId}/${id}` ,formData);
       return response;
    } catch (error) {
      throw error;
    }
  }

  // ALL PRODUCT
  
  export   const GetAllProducts = async () => {
    try {
      const response = await axios.get(`/api/product/`);
       return response.data;
    } catch (error) {
      throw error;
    }
  }
  //Get  single Product Api
  export   const GetProduct = async (productId) => {
    try {
      const response = await axios.get(`/api/product/${productId}`);
       return response.data;
    } catch (error) {
      throw error;
    }
  }