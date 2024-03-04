// src/api/utils.js
import axios from 'axios';
import { API_BASE_URL } from '@api/config';
import handleApiError from '../utils/handleApiError';

export const get = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error)
  }
};

export const post = async (endpoint, data = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error)
  }
};
