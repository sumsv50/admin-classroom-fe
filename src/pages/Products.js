import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductFilterSidebar } from '../components/_dashboard/products';
import LoadingComponent from '../components/_dashboard/app/LoadingComponent';
import { getData } from '../utils/request';

// ----------------------------------------------------------------------

const checkSort = (criteria, date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  if (criteria === 'oldest') {
    return date1 - date2;
  }
  return date2 - date1;
};

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () =>
      (async () => {
        setIsLoading(true);
        const resData = await getData('api/classes');
        if (!resData.isSuccess) {
          return;
        }
        // Sort with default criteria 'newest'
        resData.classes?.sort((room1, room2) =>
          checkSort('newest', room1.createdAt, room2.createdAt)
        );
        setRooms(resData.classes ?? []);
        setIsLoading(false);
      })(),
    []
  );

  const sortList = (criteria) => {
    const newRooms = rooms.slice();
    newRooms.sort((room1, room2) => checkSort(criteria, room1.createdAt, room2.createdAt));
    setRooms(newRooms);
  };

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Dashboard: Classes | FollClassroom">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Classes
        </Typography>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilterSidebar
                formik={formik}
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort sortList={sortList} />
            </Stack>
          </Stack>
        )}
        <ProductList rooms={rooms} />
      </Container>
    </Page>
  );
}
