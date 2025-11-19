import API from './axios';

// GET with params
export const get = async (url, params = {}) => {
  const response = await API.get(url, { params });
  return response.data;
};


// GET without params
export const getWithoutParams = async (url) => {
  const response = await API.get(url);
  return response.data;
};

// POST
export const post = async (url, data = {}, config = {}) => {
  const response = await API.post(url, data, config);
  return response.data;
};

// PUT
export const put = async (url, data = {}) => {
  const response = await API.put(url, data);
  return response.data;
};

// DELETE
export const del = async (url) => {
  const response = await API.delete(url);
  return response.data;
};
