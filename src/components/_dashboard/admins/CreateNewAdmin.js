import PropTypes from 'prop-types';
import * as Yup from 'yup';
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import plusSquare from '@iconify/icons-eva/plus-square-outline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
// material
import { Stack, TextField, IconButton, InputAdornment, Grid, Avatar } from '@mui/material';
import { sendData } from '../../../utils/request';

CreateNewAdmin.propTypes = {
  handleAddAdmin: PropTypes.func
};

export default function CreateNewAdmin({ handleAddAdmin }) {
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);
  const inputRef = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
    avatar: Yup.mixed(),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be more than 6 characters')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      avatar: null,
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, actions) => {
      const fd = new FormData();
      if (avatar) {
        fd.append('avatar', avatar, avatar.name);
      }
      fd.append('name', values.name);
      fd.append('email', values.email);
      fd.append('password', values.password);
      const resData = await sendData('POST', 'api/admins', fd, true);
      if (!resData.isSuccess) {
        return;
      }
      const newAdmin = {
        id: resData.data.id,
        avatar: avatar?.preview,
        name: values.name,
        email: values.email,
        status: 'active',
        createdAt: resData.data.createdAt
      };
      handleAddAdmin(newAdmin);
      handleClose();
      actions.resetForm({
        values: {
          email: '',
          password: '',
          name: '',
          avatar: null,
          remember: true
        }
      });
      setAvatar(null);
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Icon icon={plusSquare} width={22} height={22} style={{ marginRight: '5px' }} />
        Create new Admin
      </Button>
      <Dialog fullWidth={!!true} open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            Create new Admin
            <DialogActions style={{ display: 'inline-block' }}>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Stack>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '5px' }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2} style={{ marginBottom: 50 }}>
                <Grid item xs={12} sm={5}>
                  <Avatar
                    alt=""
                    src={avatar?.preview}
                    sx={{ fontSize: '80px', width: 160, height: 160 }}
                    style={{ margin: 'auto', cursor: 'pointer' }}
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth={!!true}
                      autoComplete="username"
                      type="email"
                      label="Email address"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />

                    <TextField
                      fullWidth
                      autoComplete="name"
                      type="string"
                      label="Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />

                    <TextField
                      fullWidth
                      autoComplete="current-password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      {...getFieldProps('password')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                              <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={inputRef}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        file.preview = URL.createObjectURL(file);
                        setAvatar(file);
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Create
              </LoadingButton>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
