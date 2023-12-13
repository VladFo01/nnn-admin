import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { storage, routes } from '../../utils';

const AuthRequired = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(!!storage.getToken());

  useEffect(() => {
    storage.addChangeListener(checkOnAuthorization);

    return () => {
      storage.removeChangeListener(checkOnAuthorization);
    };
  }, []);

  const checkOnAuthorization = () => {
    setIsAuthorized(!!storage.getToken());
  };

  return isAuthorized ? children : <Navigate to={routes.signIn} />;
};

export default AuthRequired;
