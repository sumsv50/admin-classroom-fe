import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'newest', label: 'Newest to Oldest' },
  { value: 'oldest', label: 'Oldest to Newest' }
];

ShopProductSort.propTypes = {
  sortList: PropTypes.func
};

export default function ShopProductSort({ sortList }) {
  const [open, setOpen] = useState(null);
  const [currCriteria, setCurrCriteria] = useState(SORT_BY_OPTIONS[0]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSort = (criteria) => {
    if (criteria.value === currCriteria.value) {
      handleClose();
      return;
    }
    setCurrCriteria(criteria);
    sortList(criteria.value);
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {currCriteria.label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currCriteria.value}
            onClick={() => handleSort(option)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
