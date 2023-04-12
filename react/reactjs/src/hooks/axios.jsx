import { API_URL } from '../pages/Landing';
import axios from 'axios';
import Cookies from 'js-cookie';

export const GetDashboard = async (setData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};


export const GetProject = async (setUserData, setProjectData, setTaskData) => {
  try {
    const result = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${document.cookie.access_token_cookie}`
      }
    });
    console.log(result.data);
    setUserData(result.data.user);
    setProjectData(result.data.projects[0]);
    setTaskData(result.data.projects[0].tasks);
  } catch (error) {
    console.log(error);
  }

  const intervalId = setInterval(async () => {
    try {
      const result = await axios.get(`${API_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${document.cookie.access_token_cookie}`
        }
      });
      console.log(result.data);
      setUserData(result.data.user);
      setProjectData(result.data.projects[0]);
      setTaskData(result.data.projects[0].tasks);
    } catch (error) {
      console.log(error);
    }
  }, 10000);

  return () => clearInterval(intervalId);
};

export const setAccessTokenCookie = (token, expirationDate) => {
  document.cookie = `access_token_cookie=${encodeURIComponent(token)}; expires=${expirationDate.toUTCString()}; path=/`;
};
