import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Grid,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import LoadingComponent from '../components/_dashboard/app/LoadingComponent';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import { UserMoreMenu } from '../components/_dashboard/user';
import { ProductListHead } from '../components/_dashboard/products';
//
import { getData } from '../utils/request';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'className', label: 'Class name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'joinedAt', label: 'Joined at', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const { id: userId } = useParams();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userInfo, setUserInfo] = useState({ classes: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () =>
      (async () => {
        setIsLoading(true);
        const resData = await getData(`api/users/${userId}`);
        setUserInfo(resData.data);
        setIsLoading(false);
      })(),
    []
  );

  const handleUpdateStudentId = (id, studentId) => {
    setUserInfo((userInfo) => {
      const updatedUser = { ...userInfo };
      updatedUser.studentId = studentId;
      return updatedUser;
    });
  };

  const handleUpdateStatus = (id, newStatus) => {
    setUserInfo((userInfo) => {
      const updatedUser = { ...userInfo };
      updatedUser.status = newStatus;
      return updatedUser;
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userInfo.classes.length ?? 0) : 0;

  const filteredClasses = applySortFilter(
    userInfo.classes,
    getComparator(order, orderBy),
    filterName
  );

  const isClassNotFound = filteredClasses.length === 0;

  return (
    <Page title="User | FollClassroom">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User detail
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
                border: 'solid 3px #00ab55',
                fontSize: '14px'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                      Account&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    </Typography>
                    <Avatar alt="Alt" src={userInfo.avatar} />
                    <Typography variant="subtitle2" noWrap>
                      {userInfo.email}
                    </Typography>
                    <UserMoreMenu
                      id={userInfo.id}
                      email={userInfo.email}
                      studentId={userInfo.studentId}
                      avatar={userInfo.avatar}
                      status={userInfo.status}
                      handleUpdateStudentId={handleUpdateStudentId}
                      handleUpdateStatus={handleUpdateStatus}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                      Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    </Typography>
                    <Typography variant="subtitle3" noWrap>
                      {userInfo.name}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="row" alignItems="left" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                      Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    </Typography>
                    <Label
                      variant="ghost"
                      color={(userInfo.status === 'banned' && 'error') || 'success'}
                    >
                      {sentenceCase(userInfo.status)}
                    </Label>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                      Student Id:
                    </Typography>
                    <Typography variant="subtitle3" noWrap>
                      {userInfo.studentId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                      Created at:
                    </Typography>
                    <Typography variant="subtitle3" noWrap>
                      {new Date(userInfo.createdAt).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
            <Card style={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
                Classes attended
              </Typography>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <ProductListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={userInfo.classes.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {filteredClasses
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { classId, role, className } = row;
                          const joinedAt = new Date(row.joinedAt).toLocaleString();
                          const isItemSelected = selected.indexOf(className) !== -1;

                          return (
                            <TableRow
                              hover
                              key={classId}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox" />
                              <TableCell component="th" scope="row">
                                <Link
                                  style={{ textDecoration: 'none', color: '#212B36' }}
                                  to={`../../classes/${classId}`}
                                  target="_blank"
                                >
                                  <Typography variant="subtitle3" noWrap>
                                    {className}
                                  </Typography>
                                </Link>
                              </TableCell>

                              <TableCell align="left">
                                {role === 'teacher' ? (
                                  <Label variant="ghost" color="success">
                                    {sentenceCase(role)}
                                  </Label>
                                ) : (
                                  sentenceCase(role)
                                )}
                              </TableCell>

                              <TableCell align="left">{joinedAt}</TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isClassNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            No class
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userInfo.classes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </>
        )}
      </Container>
    </Page>
  );
}
