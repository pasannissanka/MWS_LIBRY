import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const callService = async (
  BASE_URL: string,
  END_POINT: string | null,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  token: string | null,
  body: any,
  params?: object | null | undefined,
) => {
  let response_data = {};
  const URL = BASE_URL + END_POINT;

  try {
    return new Promise(async (resolve, reject) => {
      if (method === 'POST') {
        await axios
          .post(URL, body, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            response_data = response.data;
            resolve(response_data);
            console.log(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(`SERVICE_ERROR ${URL} =>`, error);
          });
      } else if (method === 'GET') {
        await axios
          .get(URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: params,
          })
          .then(response => {
            response_data = response.data;
            resolve(response_data);
            console.log(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(`SERVICE_ERROR ${URL} =>`, error);
          });
      } else if (method === 'DELETE') {
        await axios
          .delete(URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            response_data = response.data;
            resolve(response_data);
            console.log(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(`SERVICE_ERROR ${URL} =>`, error);
          });
      } else if (method === 'PUT') {
        // await axios
        //   .put(URL, {
        //     headers: {
        //       'Content-Type': 'image/jpeg',
        //     },
        //   })
        //   .then(response => {
        //     response_data = response.data;
        //     resolve(response_data);
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     reject(error);
        //     console.log(`SERVICE_ERROR ${URL} =>`, error);
        //   });
      }
    });
  } catch (error) {
    console.log(`SERVICE_ERROR ${URL} =>`, error);
  }
};

const callUpload = (url: string, data: string, mimeType: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', mimeType);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject('Could not upload image.');
      }
      resolve(xhr.response);
    };
    xhr.onerror = e => {
      reject('Could not upload image.');
    };
    xhr.send({uri: data});
  });
};

export {callService, callUpload};
