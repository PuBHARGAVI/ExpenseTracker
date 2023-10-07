export const apiRequest = async (method, header, body, endpoint) =>{
  const requestOptions = {
    method: method,
    headers: header,
    body: body,
  }
  try {
    const url = `http://10.0.2.2:3000/${endpoint}`;
    const response = await fetch(url, requestOptions);
    const responseJson = await response.json();
    
    return responseJson
  } catch (error) {
      console.error('Fetch error:', error);
      throw new Error(error)
    }
  };