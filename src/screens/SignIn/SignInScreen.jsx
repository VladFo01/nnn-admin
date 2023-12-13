import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../../utils';
import { useValidatedField } from '../../hooks';
import { EMAIL_FIELD, STORE_NAMES } from '../../constants';
import { login } from '../../store';

import { Container, Box, InputAdornment, IconButton } from '@mui/material';
import { Buttons, Flex, Input, Loader, Typography } from '../../components';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { setToken, clearToken } from '../../utils/storage';

const SignInScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPasswordShown, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const { isPending } = useSelector(store => store[STORE_NAMES.AUTH]);

  const [, emailValue, setEmailValue, , validateEmail] = useValidatedField('', EMAIL_FIELD);
  const [passwordValue, setPasswordValue] = useState('');

  const handleChangePassword = e => setPasswordValue(e.target.value);
  const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

  const handleCheckFields = () => {
    setEmailError(null);
    setPasswordError(null);

    if (validateEmail() && emailValue.length > 0 && passwordValue.length > 0) {
      setEmailError(null);
      setPasswordError(null);
      return true;
    }

    if (emailValue === '') setEmailError('Empty field');
    if (passwordValue === '') setPasswordError('Empty field');
    if (!validateEmail()) {
      setEmailError('Invalid email');
    }
    return false;
  };

  const handleLogin = async result => {
    setLoginError(null);
    const { token } = result.payload;
    clearToken();
    setToken(token);

    navigate(routes.root);
  };

  const handleEmailLogin = async () => {
    if (handleCheckFields()) {
      const loginData = {
        email: emailValue,
        password: passwordValue,
      };

      const result = await dispatch(login(loginData));

      if (!result.error) {
        handleLogin(result);
      } else {
        setLoginError(result.payload.data);
      }
    }
  };

  const renderErrorMessage = () => (
    <Flex mt="-14px" mb="5px">
      <Typography color="error" variant="caption" align="center">
        {'Invalid email or password'}
      </Typography>
    </Flex>
  );

  if (isPending) return <Loader />;

  return (
    <>
      <Container maxWidth="sm">
        <Flex justifyContent="center" height="100vh">
          <Flex alignItems="center" pb="40px">
            <Typography variant="h4">NomNomNavigator</Typography>
          </Flex>
          <Box
            bgcolor="white"
            px="32px"
            py="48px"
            borderRadius="4px"
            border={1}
            sx={{ borderColor: 'grey.200' }}>
            <Typography variant="h6" mb="24px" bgcolor="white" align="center">
              {'Sign In'}
            </Typography>
            <Flex spacing={4}>
              <Input
                error={emailError}
                variant="filled"
                label="Email"
                type="email"
                fullWidth
                helperText={emailError || ' '}
                value={emailValue}
                onChange={setEmailValue}
              />
              <Input
                variant="filled"
                label="Password"
                type={isPasswordShown ? 'text' : 'password'}
                fullWidth
                error={passwordError}
                helperText={passwordError || ' '}
                value={passwordValue}
                onChange={handleChangePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Flex>
            {loginError && renderErrorMessage()}
            <Flex spacing={2}>
              <Buttons.PrimaryContainedBtn title={'Sign In'} onClick={handleEmailLogin} />
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default SignInScreen;
