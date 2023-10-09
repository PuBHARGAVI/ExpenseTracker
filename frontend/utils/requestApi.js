import { __DeviceId } from "../shared/GlobalVariables";

export const apiRequest = async (
  method,
  header = {},
  body,
  endpoint,
  queryParams,
) => {
  header['deviceId'] = __DeviceId.getDeviceId();
  const requestOptions = {
    method: method,
    headers: header,
  };

  if (method === 'POST') {
    requestOptions.body = body;
  }

  try {
    let url = `http://10.0.2.2:3000/${endpoint}`;

    if (queryParams) {
      url = url + '?' + queryParams;
    }
    const response = await fetch(url, requestOptions);
    const responseJson = await response.json();
    if (responseJson.status === 'please Authenticate yourself') {
      throw new Error('please Authenticate yourself');
    }
    return responseJson;
  } catch (error) {
    throw {status: error.message};
  }
};