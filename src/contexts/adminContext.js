import { createContext, useState } from 'react';

const AdminContext = createContext();
const initAdminInfo = JSON.parse(localStorage.getItem('adminInfo'));

const AdminProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(initAdminInfo);
  return (
    <AdminContext.Provider value={{ adminInfo, setAdminInfo }}> {children} </AdminContext.Provider>
  );
};

export { AdminProvider, AdminContext };
