import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------
ProductList.propTypes = {
  rooms: PropTypes.array
};

export default function ProductList({ rooms, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {rooms.map((room) => (
        <Grid key={room.id} item xs={12} sm={6} md={4}>
          <ShopProductCard room={room} />
        </Grid>
      ))}
    </Grid>
  );
}
