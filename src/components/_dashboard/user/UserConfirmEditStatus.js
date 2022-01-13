import PropTypes from 'prop-types';
import * as React from 'react';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkMarkCircleFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { ListItemIcon, ListItemText, MenuItem, Stack, Avatar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { sendData } from '../../../utils/request';

ConfirmEditStatusDialog.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  avatar: PropTypes.string,
  status: PropTypes.string,
  roleClass: PropTypes.string,
  handleUpdateStatus: PropTypes.func
};

const photoAdminURL = '/static/mock-images/avatars/avatar_default.jpg';
export default function ConfirmEditStatusDialog({
  id,
  email,
  avatar,
  status,
  handleUpdateStatus,
  roleClass
}) {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isBanned = status === 'banned';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    const newIsBanned = !isBanned;
    const dataRes = await sendData('PATCH', `api/${roleClass}/${id}`, { isBanned: newIsBanned });
    if (dataRes.isSuccess) {
      toast.success('Update status successfully!');
      const newStatus = newIsBanned ? 'banned' : 'active';
      handleUpdateStatus(id, newStatus);
    }
    setIsSubmitting(false);
    return handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen} sx={{ color: 'text.secondary' }}>
        {!isBanned ? (
          <>
            <ListItemIcon>
              <Icon icon={alertTriangleFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Ban" primaryTypographyProps={{ variant: 'body2' }} />
          </>
        ) : (
          <>
            <ListItemIcon>
              <Icon icon={checkMarkCircleFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Active" primaryTypographyProps={{ variant: 'body2' }} />
          </>
        )}
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {' '}
          {!isBanned ? 'Ban' : 'Active'} this account?{' '}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 450 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            <Avatar alt={email} src={avatar ?? (roleClass === 'admins' && photoAdminURL)} />
            <Typography variant="subtitle2" noWrap>
              {email}
            </Typography>
          </Stack>
          <DialogContentText id="alert-dialog-description">
            {!isBanned
              ? 'Account will no longer be able to access the system'
              : 'Account will be able to access the system'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#212B36' }}>
            Cancel
          </Button>
          <LoadingButton onClick={handleConfirm} loading={isSubmitting} autoFocus>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
