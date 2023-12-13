import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { STORE_NAMES } from '../../constants';
import { Sidebar } from './Components';
import { routes } from '../../utils';
import { Flex } from '../../components';
import { Navigate, Route, Routes } from 'react-router-dom';

const ChangeTitleHOC = ({ title, setPageTitle, children }) => {
  useEffect(() => {
    setPageTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return <>{children}</>;
};

const menuItems = [
  {
    id: 1,
    title: 'Dishes',
    path: '/dishes',
    component: <Typography>You are Dishes</Typography>,
  },
  {
    id: 2,
    title: 'Orders',
    path: '/orders',
    component: <Typography>You are Orders</Typography>,
  },
  {
    id: 3,
    title: 'Feedback',
    path: '/feedback',
    component: <Typography>You are Feedback</Typography>,
  },
  {
    id: 4,
    title: 'Booking',
    path: '/booking',
    component: <Typography>You are Booking</Typography>,
  },
];

const AdminPanelScreen = () => {
  const { worker_info } = useSelector(store => store[STORE_NAMES.AUTH]);

  const [pageTitle, setPageTitle] = useState('NomNomNavigator');

  return (
    <>
      <Sidebar
        fullName={`${worker_info?.first_name} ${worker_info?.last_name}`}
        role={worker_info?.role.title}
        pageTitle={pageTitle}
      />
      <Flex paddingTop="80px" paddingLeft="250px" width="100vw" height="100vh">
        <Flex>
          <Routes>
            {menuItems.map(({ id, title, path, component }) => (
              <Route
                key={id}
                path={path}
                element={
                  <ChangeTitleHOC title={title} setPageTitle={setPageTitle}>
                    {component}
                  </ChangeTitleHOC>
                }
              />
            ))}
            <Route path="*" element={<Navigate to={routes.notFound} />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminPanelScreen;
