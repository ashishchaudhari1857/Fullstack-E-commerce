 import axios from 'axios'
 const userId =localStorage.getItem('userId');
 export   const GetProducts = async (data) => {
    try {
      const response = await axios.get(`/api/product/admin/getproducts/${userId}`);
       return response.data;
    } catch (error) {
      throw error;
    }
  }

// delete
  export   const DeleteProduct = async (id) => {
    try {
        
      const response = await axios.delete(`/api/product/delete/${userId}/${id}`);
       return response.data;
    } catch (error) {
      throw error;
    }
  }
  //update

  export   const UpdateProduct = async (id ,formData) => {
    try {
      const response = await axios.put(`/api/product/update/${userId}/${id}` ,formData);
       return response.data;
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