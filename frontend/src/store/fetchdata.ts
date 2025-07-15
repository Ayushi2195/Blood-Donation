import axios from 'axios';
import { baseUrl } from '../url.ts';

export const getFromBackend = async (link: string) => {
  try {
    const token = localStorage.getItem('token'); // Ensure token is retrieved
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const response = await axios.get(link, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response; // Return the full Axios response object
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request Error:', error.response ? error.response.data : error.message);
    } else {
      console.error('Request Error:', (error as Error).message);
    }
    throw error; // Rethrow to allow handling at the calling site
  }
};
export const postToBackend = async (link: string, data: any) => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is retrieved
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const response = await axios.post(link, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response; // Return the full Axios response object
    } catch (error) {
      if (axios.isAxiosError(error)) {
      console.error('Request Error:', error.response ? error.response.data : error.message);
    } else {
      console.error('Request Error:', (error as Error).message);
    }
    throw error; // Rethrow to allow handling at the calling site
  }
};

export const patchToBackend = async (link: string, data: any) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await axios.patch(link, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      return response; // Return the full Axios response object
    } catch (error) {
      if (axios.isAxiosError(error)) {
      console.error('Request Error:', error.response ? error.response.data : error.message);
    } else {
      console.error('Request Error:', (error as Error).message);
    }
    throw error; // Rethrow to allow handling at the calling site
  }
  };

  export const checkWarden = async () => {
    // const navigate = useNavigate();
    try {
      const result = await getFromBackend(`${baseUrl}/api/check/check-role`);
      console.log(result);
      // if (result.data.message === "access denied") {
      //     navigate("/AccessDenied");
      // }
      const message = await result.data.message;
      return message;
    } catch (error) {
      console.error("error while checking role", error);
      throw error;
    }
  }
