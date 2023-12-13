import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routes } from '../../utils';
// import {
//   AdminPanel,
//   SignInScreen,
//   ForgotPasswordScreen,
//   ChangePasswordScreen,
//   NotFoundScreen,
//   // MobileScreen,
//   SetPasswordScreen,
//   VerifyEmailSuccessScreen,
//   DashboardMobile
// } from '@screens';

import { AdminPanel, NotFoundScreen, SignInScreen } from '../../screens';
import AuthRequired from '../authorizedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.dashboard.root}
          element={
            <AuthRequired>
              <AdminPanel />
            </AuthRequired>
          }
        />
        <Route path={routes.signIn} element={<SignInScreen />} />
        <Route path={routes.notFound} element={<NotFoundScreen />} />
        <Route
          path={routes.root}
          element={<Navigate to={routes.dashboard.dishes} />}
        />
        <Route path="*" element={<Navigate to={routes.notFound} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
