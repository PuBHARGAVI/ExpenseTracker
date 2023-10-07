export const apiRequest = async (method, header = {}, body, endpoint) =>{
  const requestOptions = {
    method: method,
    headers: header
  }

  if(method === 'POST') {
    requestOptions.body = body
  }

  try {
    const url = `http://10.0.2.2:3000/${endpoint}`;
    const response = await fetch(url, requestOptions);
    const responseJson = await response.json();
    
    if (responseJson.status === 'please Authenticate yourself'){
      throw new Error('please Authenticate yourself');
    }
      return responseJson;
  } catch (error) {
      throw {status: error.message}
    }
  };