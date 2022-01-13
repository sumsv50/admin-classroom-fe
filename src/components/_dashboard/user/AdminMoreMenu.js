import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, IconButton } from '@mui/material';
import UserConfirmEditStatus from './UserConfirmEditStatus';

// ----------------------------------------------------------------------

AdminMoreMenu.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  avatar: PropTypes.string,
  status: PropTypes.string,
  handleUpdateStatus: PropTypes.func
};

export default function AdminMoreMenu({ id, email, avatar, status, handleUpdateStatus }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <UserConfirmEditStatus
          id={id}
          email={email}
          status={status}
          avatar={avatar}
          roleClass="admins"
          handleUpdateStatus={handleUpdateStatus}
        />
      </Menu>
    </>
  );
}
