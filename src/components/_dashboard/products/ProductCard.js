import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import Label from '../../Label';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '90%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  room: PropTypes.object,
  id: PropTypes.objectOf(PropTypes.number),
  name: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string),
  status: PropTypes.objectOf(PropTypes.string)
};
ShopProductCard.defaultProps = {
  room: {
    name: '',
    description: '',
    status: ''
  }
};

export default function ShopProductCard({ room }) {
  const { id, name, description, status } = room;
  const cover = 'https://res.cloudinary.com/dzhnjuvzt/image/upload/v1637768355/class_ayj0mh.jpg';

  return (
    <Card>
      <Box sx={{ pt: '60%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3, pt: 0 }}>
        <Link
          to={`/dashboard/classes/${id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
          state={{ className: name, description }}
        >
          <Typography variant="subtitle1"> {name} </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" color="#565656" noWrap>
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
