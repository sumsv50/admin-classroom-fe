import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import closeCircle from '@iconify/icons-eva/close-circle-fill';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
// material
import { ListItemIcon, ListItemText, MenuItem, Stack, Avatar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { sendData } from '../../../utils/request';

UserEditStudentId.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  studentId: PropTypes.string,
  avatar: PropTypes.string,
  handleUpdateStudentId: PropTypes.object
};

export default function UserEditStudentId({ id, email, studentId, avatar, handleUpdateStudentId }) {
  const [open, setOpen] = React.useState(false);
  const [inpStudentId, setInpStudentId] = React.useState(studentId);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveInp = () => {
    setInpStudentId('');
  };

  const handleSubmit = async () => {
    // If newId equal with currentId, do nothing.
    if (studentId === inpStudentId) {
      return handleClose();
    }
    setIsSubmitting(true);
    const dataRes = await sendData('PATCH', `api/users/${id}`, { student_id: inpStudentId });
    if (dataRes.isSuccess) {
      toast.success('Update Student Id successfully!');
      handleUpdateStudentId(id, inpStudentId);
    }
    setIsSubmitting(false);
    return handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen} sx={{ color: 'text.secondary' }}>
        <ListItemIcon>
          <Icon icon={editFill} width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary="Edit student Id" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit student Id for</DialogTitle>
        <DialogContent sx={{ minWidth: 450 }}>
          {/* <DialogContentText> Edit student Id for </DialogContentText> */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            <Avatar alt={email} src={avatar} />
            <Typography variant="subtitle2" noWrap>
              {email}
            </Typography>
          </Stack>
          <Typography variant="subtitle2" noWrap>
            Current Id: {studentId ?? '...'}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Id"
              type="text"
              variant="standard"
              value={inpStudentId}
              onChange={(e) => setInpStudentId(e.target.value.trim())}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            {inpStudentId !== '' ? (
              <Button onClick={handleRemoveInp} disabled={isSubmitting} color="error">
                <Icon icon={closeCircle} width={20} height={20} />
              </Button>
            ) : (
              ''
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting} sx={{ color: '#212B36' }}>
            Cancel
          </Button>
          <LoadingButton
            onClick={() => {
              handleSubmit();
            }}
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
