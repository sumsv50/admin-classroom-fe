import { useState, useEffect } from 'react';
// material
import { Grid } from '@mui/material';
import LoadingComponent from '../app/LoadingComponent';
import ShopProductCard from './ProductCard';
import { getData } from '../../../utils/request';

// ----------------------------------------------------------------------

export default function ProductList({ ...other }) {
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
        setRooms(resData.classes ?? []);
        setIsLoading(false);
      })(),
    []
  );

  return (
    <Grid container spacing={3} {...other}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        rooms.map((room) => (
          <Grid key={room.id} item xs={12} sm={6} md={4}>
            <ShopProductCard room={room} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
