import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const AdminContext = createContext();
const initAdminInfo = JSON.parse(localStorage.getItem('adminInfo')) ?? {};

const AdminProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(initAdminInfo);
  return (
    <AdminContext.Provider value={{ adminInfo, setAdminInfo }}> {children} </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export { AdminProvider, AdminContext };
