import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { STORE_NAMES } from '../../constants';
import { Sidebar } from './Components';
import { routes } from '../../utils';
import { Flex } from '../../components';
import { Navigate, Route, Routes } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Dishes from './pages/Dishes';
import Orders from './pages/Orders';
import { ROLES } from '../../constants/common';

const ChangeTitleHOC = ({ title, setPageTitle, children }) => {
  useEffect(() => {
    setPageTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return <>{children}</>;
};

const menuItems = workerRole => {
  const tabs = [
    {
      id: 2,
      title: 'Orders',
      path: '/orders',
      component: <Orders />,
    },
  ];

  if ([ROLES.ADMIN, ROLES.CHEF].includes(workerRole)) {
    tabs.push({
      id: 1,
      title: 'Dishes',
      path: '/dishes',
      component: <Dishes />,
    });
  }

  if ([ROLES.ADMIN].includes(workerRole)) {
    tabs.push({
      id: 3,
      title: 'Feedback',
      path: '/feedback',
      component: <Feedback />,
    });
    tabs.push({
      id: 4,
      title: 'Booking',
      path: '/booking',
      component: <Typography>You are Booking</Typography>,
    });
  }

  return tabs;
};

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
            {worker_info &&
              menuItems(worker_info.role.title).map(({ id, title, path, component }) => (
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
