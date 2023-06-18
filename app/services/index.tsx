import axios from 'axios';

const callService = async (
  BASE_URL: string,
  END_POINT: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  token: string | null,
  body: object,
) => {
  let response_data = {};
  const URL = BASE_URL + END_POINT;

  try {
    return new Promise(async (resolve, reject) => {
      if (method === 'POST') {
        await axios
          .post(URL, body)
          .then(response => {
            response_data = response.data.data;
            resolve(response_data);
            console.log(response.data);
          })
          .catch(error => {
            console.log(`SERVICE_ERROR ${URL} =>`, error);
            reject(error);
          });
      }
    });
  } catch (error) {
    console.log(`SERVICE_ERROR ${URL} =>`, error);
  }
};

export {callService};
