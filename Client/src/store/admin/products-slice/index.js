import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin/products/get`
    );

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    // console.log("Editing product with id:", id, "and data:", formData);
    const result = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

export const postProductToShoppingHome = createAsyncThunk(
  "/products/postToShoppingHome",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/products/shoppinghome/add`, // Ensure this API exists
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);


const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
  .addCase(postProductToShoppingHome.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(postProductToShoppingHome.fulfilled, (state, action) => {
    state.isLoading = false;
    // Handle successful posting (maybe update UI or show a message)
  })
  .addCase(postProductToShoppingHome.rejected, (state) => {
    state.isLoading = false;
  });

  },
});

export default AdminProductsSlice.reducer;
