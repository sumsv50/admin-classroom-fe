import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, IconButton } from '@mui/material';
import UserEditStudentId from './UserEditStudentId';
import UserConfirmEditStatus from './UserConfirmEditStatus';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  studentId: PropTypes.string,
  avatar: PropTypes.string,
  status: PropTypes.string,
  handleUpdateStudentId: PropTypes.object,
  handleUpdateStatus: PropTypes.object
};

export default function UserMoreMenu({
  id,
  email,
  studentId,
  avatar,
  status,
  handleUpdateStudentId,
  handleUpdateStatus
}) {
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
        <UserEditStudentId
          id={id}
          email={email}
          studentId={studentId}
          avatar={avatar}
          handleUpdateStudentId={handleUpdateStudentId}
        />
        <UserConfirmEditStatus
          id={id}
          email={email}
          status={status}
          avatar={avatar}
          handleUpdateStatus={handleUpdateStatus}
        />
      </Menu>
    </>
  );
}
