import { toast } from 'react-toastify';

export default async function handleError(response) {
  const resJson = await response.json();
  if (!response.oke) {
    switch (response.status) {
      case 401:
        window.location.assign('/sign-in');
        break;
      case 400:
        toast.error(resJson.message ?? 'Error!');
        break;
      default:
        break;
    }
  }
}
