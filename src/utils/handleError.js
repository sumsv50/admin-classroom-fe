import { toast } from 'react-toastify';

export default async function handleError(response) {
  let resJson;
  if (!response.oke) {
    switch (response.status) {
      case 401:
        window.location.assign('/login');
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
