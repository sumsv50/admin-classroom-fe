import { toast } from 'react-toastify';

export default async function handleError(response) {
  let resJson = {};
  if (!response.oke) {
    switch (response.status) {
      case 401:
        try {
          resJson = await response.json();
        } catch (err) {
          // Ignore
        }
        toast.error(resJson.message ?? 'Please login!');
        setTimeout(() => {
          window.location.assign('/login');
        }, 1000);
        break;
      case 400:
        resJson = await response.json();
        toast.error(resJson.message ?? 'Error!');
        break;
      default:
        break;
    }
  }
}
