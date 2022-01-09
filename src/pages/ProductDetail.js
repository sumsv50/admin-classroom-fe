import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// material
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Container,
  Typography,
  Stack
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
// components
import Page from '../components/Page';
import LoadingComponent from '../components/_dashboard/app/LoadingComponent';
import { getData } from '../utils/request';
// ----------------------------------------------------------------------

export default function ProductDetail() {
  const location = useLocation();
  const { id: classId } = useParams();
  // let { className, description } = location.state ?? {};
  const [classInfo, setClassInfo] = useState({
    className: location.state?.className,
    description: location.state?.description
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const dataRes = await getData(`api/classes/${classId}`);
      if (!dataRes.isSuccess) {
        return;
      }
      setClassInfo(dataRes.data);
      setIsLoading(false);
    })();
  }, [classId]);

  return (
    <Page title="Dashboard: Classes | FollClassroom">
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Classes /{' '}
          {classInfo.className ? (
            classInfo.className
          ) : (
            <Skeleton style={{ display: 'inline-block', width: '200px' }} />
          )}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          {classInfo.description ? (
            classInfo.description
          ) : (
            <Skeleton style={{ display: 'inline-block', width: '250px' }} />
          )}
        </Typography>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Card>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                    Teachers
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {classInfo.teachers?.map((teacher) => (
                          <TableRow hover key={teacher.id} tabIndex={-1}>
                            <TableCell component="th" scope="row">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt="avatar" src={teacher.avatar} />
                                <Typography variant="subtitle2" noWrap>
                                  {teacher.email}
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Card>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                    Students
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {classInfo.students?.map((student) => (
                          <TableRow hover key={student.id} tabIndex={-1}>
                            <TableCell component="th" scope="row">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt="avatar" src={student.avatar} />
                                <Typography variant="subtitle2" noWrap>
                                  {student.email}
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      {classInfo.students?.length === 0 && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                              No student
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Page>
  );
}
