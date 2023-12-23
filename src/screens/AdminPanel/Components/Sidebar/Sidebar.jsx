import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import TableBarIcon from '@mui/icons-material/TableBar';
import { Flex } from '../../../../components';

import { routes } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../store/authorization/duck';
import { useDispatch } from 'react-redux';
import { ROLES } from '../../../../constants/common';

const drawerWidth = 250;

const links = workerRole => {
  const allowedLinks = [
    {
      id: 2,
      title: 'Orders',
      to: routes.dashboard.orders,
      icon: <EditNoteIcon />,
    },
  ];

  if ([ROLES.ADMIN, ROLES.CHEF].includes(workerRole)) {
    allowedLinks.push({
      id: 1,
      title: 'Dishes',
      to: routes.dashboard.dishes,
      icon: <LocalDiningIcon />,
    });
  }

  if ([ROLES.ADMIN].includes(workerRole)) {
    allowedLinks.push({
      id: 3,
      title: 'Feedback',
      to: routes.dashboard.feedback,
      icon: <MapsUgcIcon />,
    });
    allowedLinks.push({
      id: 4,
      title: 'Booking',
      to: routes.dashboard.booking,
      icon: <TableBarIcon />,
    });
  }

  return allowedLinks;
};

const Sidebar = ({ fullName, role, pageTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuButtonClick = path => {
    navigate(path);
  };

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (!res.error) {
      navigate(routes.signIn);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar sx={{ height: '80px' }}>
          <Typography variant="h6" noWrap component="div" margin="0 auto">
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left">
        <Toolbar sx={{ height: '80px' }}>
          <Flex flexDirection="column">
            <Typography variant="h6" component="p">
              {fullName}
            </Typography>
            <Typography variant="h7" component="p" color="#1976d2">
              {role}
            </Typography>
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={handleLogout}
              variant="h7"
              component="p"
              color="red">
              Logout
            </Typography>
          </Flex>
        </Toolbar>
        <Divider />
        <List>
          {role &&
            links(role).map(link => (
              <ListItem key={link.id} disablePadding>
                <ListItemButton onClick={() => handleMenuButtonClick(link.to)}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
