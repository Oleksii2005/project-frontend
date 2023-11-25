import axios from 'axios';
import { setToken } from './ApiAuthUser';

export const instance = axios.create({
  baseURL: 'https://project-backend-7eyy.onrender.com/api',
});

export const setTokenUser = () => {
  localStorage.getItem('token');
  const a = localStorage.getItem('token');
  return (instance.defaults.headers.common['Authorization'] = `Bearer ${a}`);
};

export const portonWater = () => {};
export const getPortionOfWater = () => {};

export const addPortionOfWater = async body => {
  setTokenUser();
  console.log('body', body);
  const data = await instance.post('/water/add', body);
  console.log('data', data);
  return data;
};
export const apiDeleteWater = async id => {
  setTokenUser();
  console.log('id', id);
  const { data } = await instance.delete(`/water/delete/${id}`);
  console.log('data', data);
  return data;
};
