import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
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
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, AdminMoreMenu } from '../components/_dashboard/user';
import CreateNewAdmin from '../components/_dashboard/admins/CreateNewAdmin';
//
import { getData } from '../utils/request';
import useAdminHook from '../contexts/adminHook';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'createdAt', label: 'Created at', alignRight: false },
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
    return filter(
      array,
      (_user) =>
        _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        (_user.name && _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Admin() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { adminInfo } = useAdminHook();

  useEffect(
    () =>
      (async () => {
        setIsLoading(true);
        const resData = await getData('api/admins');
        if (!resData.isSuccess) {
          return;
        }
        setAdminList(resData.admins ?? []);
        setIsLoading(false);
      })(),
    []
  );

  const handleUpdateStatus = (id, newStatus) => {
    setAdminList((userList) => {
      const updatedStudentList = userList.slice();
      const updatedStudent = updatedStudentList.find((student) => student.id === id);
      updatedStudent.status = newStatus;
      return updatedStudentList;
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = adminList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleAddAdmin = (newAdmin) => {
    setAdminList((currentList) => {
      const newList = currentList.slice();
      newList.push(newAdmin);
      return newList;
    });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adminList.length) : 0;

  const filteredAdmins = applySortFilter(adminList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredAdmins.length === 0;

  return (
    <Page title="Admin | FollClassroom">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admins
          </Typography>
        </Stack>

        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <CreateNewAdmin handleAddAdmin={handleAddAdmin} />
            </Stack>
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={adminList.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredAdmins
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { id, name, email, status } = row;
                          const avatar =
                            row.avatar ?? '/static/mock-images/avatars/avatar_default.jpg';
                          const createdAt = new Date(row.createdAt).toLocaleString();
                          const isItemSelected = selected.indexOf(name) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, name)}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={email} src={avatar} />
                                  <Link
                                    to={`./${id}`}
                                    style={{ textDecoration: 'none', color: '#212B36' }}
                                  >
                                    <Typography variant="subtitle2" noWrap>
                                      {email}
                                    </Typography>
                                  </Link>
                                  {email === adminInfo?.email ? (
                                    <Label variant="ghost">Me</Label>
                                  ) : (
                                    ''
                                  )}
                                </Stack>
                              </TableCell>

                              <TableCell align="left">{name}</TableCell>

                              <TableCell align="left">
                                <Label
                                  variant="ghost"
                                  color={(status === 'banned' && 'error') || 'success'}
                                >
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>

                              <TableCell align="left">{createdAt}</TableCell>

                              <TableCell align="right">
                                {email === adminInfo?.email ? (
                                  ''
                                ) : (
                                  <AdminMoreMenu
                                    id={id}
                                    email={email}
                                    avatar={avatar}
                                    status={status}
                                    handleUpdateStatus={handleUpdateStatus}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
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
                count={adminList.length}
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
