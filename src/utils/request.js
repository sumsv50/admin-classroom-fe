import handleError from './handleError';

export async function sendData(method = 'POST', url = '', data = {}) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
      method,
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      handleError(response);
    }
    const dataRes = await response.json();
    return dataRes;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function getData(url = '') {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      handleError(response);
    }

    const dataRes = await response.json();
    return dataRes;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function authentication(data) {
  try {
    const response = await sendData('POST', `api/sign-in`, data);
    const token = response?.authorization;

    if (!response?.isSuccess || !token) {
      return null;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('adminInfo', JSON.stringify(response.admin));
    return response.admin;
  } catch (err) {
    console.log(err);
    return null;
  }
}
