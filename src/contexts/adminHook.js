import { useContext } from 'react';
import { AdminContext } from './adminContext';

const useAdminHook = () => {
  const { adminInfo, setAdminInfo } = useContext(AdminContext);
  return { adminInfo, setAdminInfo };
};

export default useAdminHook;
