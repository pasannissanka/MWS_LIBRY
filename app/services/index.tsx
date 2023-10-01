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
      } else if (method === 'PATCH') {
        await axios
          .patch(URL, body, {
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

        console.log('Service idex->', body);
        RNFetchBlob.fetch(
          'PUT',
          URL,
          {},
          RNFetchBlob.wrap(
            '/Users/hasitha/Library/Developer/CoreSimulator/Devices/35EA73C5-AD8A-4FDD-AC74-D5DC30005C31/data/Media/DCIM/100APPLE/IMG_0001.JPG',
          ),
        )
          .then(response => {
            console.log(resolve);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(`SERVICE_ERROR ${URL} =>`, error);
          });
        // await fetch(URL, {
        //   method: 'PUT',
        //   body: body,
        //   headers: {'Content-Type': 'image/jpeg'},
        // })
        //   .then(response => {
        //     resolve(response);
        //     console.log(resolve);
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

export {callService};
