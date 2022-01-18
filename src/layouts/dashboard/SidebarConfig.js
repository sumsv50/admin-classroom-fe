import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import roomFill from '@iconify/icons-eva/book-fill';
import shieldFill from '@iconify/icons-eva/shield-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'classes',
    path: '/dashboard/classes',
    icon: getIcon(roomFill)
  },
  {
    title: 'user',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'admin',
    path: '/dashboard/admins',
    icon: getIcon(shieldFill)
  }
];

export default sidebarConfig;
