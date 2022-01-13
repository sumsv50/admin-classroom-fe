import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Card, Stack, Grid, Avatar, Container, Typography } from '@mui/material';
// components
import LoadingComponent from '../components/_dashboard/app/LoadingComponent';
import Page from '../components/Page';
import Label from '../components/Label';
import { AdminMoreMenu } from '../components/_dashboard/user';
//
import useAdminHook from '../contexts/adminHook';
import { getData } from '../utils/request';

// ----------------------------------------------------------------------

const photoURL = '/static/mock-images/avatars/avatar_default.jpg';
export default function AdminDetail() {
  const { id: adminId } = useParams();
  const [adminInfo, setAdminInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { adminInfo: me } = useAdminHook();

  useEffect(
    () =>
      (async () => {
        setIsLoading(true);
        const resData = await getData(`api/admins/${adminId}`);
        if (!resData.isSuccess) {
          return;
        }
        setAdminInfo(resData.data);
        setIsLoading(false);
      })(),
    [adminId]
  );

  const handleUpdateStatus = (id, newStatus) => {
    setAdminInfo((adminInfo) => {
      const updatedAdmin = { ...adminInfo };
      updatedAdmin.status = newStatus;
      return updatedAdmin;
    });
  };

  return (
    <Page title="Admin | FollClassroom">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admin detail
          </Typography>
        </Stack>

        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <Card
              style={{
                textAlign: 'center',
                marginBottom: '50px',
                padding: '20px',
                fontSize: '16px',
                maxWidth: '900px',
                border: 'solid 3px #00ab55'
              }}
            >
              <Grid container spacing={3}>
                {me.id === Number(adminId) ? (
                  ''
                ) : (
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <AdminMoreMenu
                      id={adminInfo.id}
                      email={adminInfo.email}
                      status={adminInfo.status}
                      avatar={adminInfo.avatar}
                      handleUpdateStatus={handleUpdateStatus}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={5}>
                  <Stack direction="row" alignItems="center" spacing={5}>
                    <Avatar
                      alt={adminInfo.name}
                      src={adminInfo.avatar ?? photoURL}
                      sx={{ fontSize: '80px', width: 120, height: 120 }}
                      style={{ margin: 'auto', cursor: 'pointer' }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ pb: 1.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    </Typography>
                    <Typography variant="subtitle3" noWrap>
                      {adminInfo.email}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ pb: 1.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    </Typography>
                    <Typography variant="subtitle3" noWrap>
                      {adminInfo.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="left" spacing={2} sx={{ pb: 1.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    </Typography>
                    <Label
                      variant="ghost"
                      color={(adminInfo.status === 'banned' && 'error') || 'success'}
                    >
                      {sentenceCase(adminInfo.status)}
                    </Label>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                      Created at:
                    </Typography>
                    <Typography variant="subtitle3" noWrap>
                      {new Date(adminInfo.createdAt).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
            <Card style={{ textAlign: 'center', paddingBottom: '10px' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
                Activities
              </Typography>
              <Typography variant="subtitle3" gutterBottom sx={{ mb: 2, mt: 2 }}>
                Coming soon!
              </Typography>
            </Card>
          </>
        )}
      </Container>
    </Page>
  );
}
