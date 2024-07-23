// Ref: https://codesandbox.io/p/sandbox/colors-magic-gtyod?file=%2Fsrc%2Fcomponents%2FLogin.jsx
// Ref: https://www.geeksforgeeks.org/forgot-reset-password-feature-with-react-and-node-js/

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import {
  Avatar,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as CryptoJS from 'crypto-js';
import Joi from 'joi-browser';

import { UserContext } from '../../context/user-context';
import authApi from '../../services/auth-api';
import styles from './LoginForm.module.css';

const initialFormState = {
  email: '',
  password: '',
};

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

const key = import.meta.env.VITE_HASHING_KEY;

const Button = styled(BaseButton)(
  ({ theme }) => `
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:hover {
  cursor:pointer;
}

  &.${buttonClasses.active} {
    transform: scale(0.95);
  }

  &.${buttonClasses.focus} {
    outline: none;
  }

  // Responsive styles
  @media (max-width: 576px) {
    padding: 10px 30px;
  }
    `,
);

export default function LoginForm({ onLoad }) {
  const userCtx = useContext(UserContext);
  const [loginForm, setLoginForm] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setLoginForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    const errorMessage = validate(event);
    setError((prevState) => {
      const newError = { ...prevState };
      if (errorMessage) {
        newError[name] = errorMessage;
      } else {
        delete newError[name];
      }

      return newError;
    });
  };

  const validate = (event) => {
    const { name, value } = event.target;
    const objToCompare = { [name]: value };
    const fieldSchema = { [name]: schema[name] };

    const result = Joi.validate(objToCompare, fieldSchema);
    const { error } = result;

    return error ? transformErrorMessage(error.details[0].message) : null;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = Joi.validate(loginForm, schema, { abortEarly: false });
    const { error } = result;

    if (!error) {
      try {
        onLoad(true);
        const hashedPassword = CryptoJS.HmacSHA256(loginForm['password'], key).toString();
        const response = await authApi.post(`/login`, { ...loginForm, password: hashedPassword });
        console.log('Login user:', response.data);

        /* TODO:
        Refactor not to store token but using HTTP-only cookies method as the browser manages the cookie.
        The cookie will be automatically sent with each request to the server.
        Fetch user details using the token and store inside the authCtx
        //*/ //
        const userDetails = await getUserDetails(loginForm['email']);
        if (userDetails) {
          userCtx.handleLogin(userDetails);
          setLoginForm(initialFormState); // Clear the form
          navigate('..');
        }
      } catch (error) {
        console.error('Login error:', error.message);
      } finally {
        onLoad(false);
      }
    } else {
      const errorData = error.details.reduce((acc, currentItem) => {
        const name = currentItem.path[0];
        const message = transformErrorMessage(currentItem.message);
        const updatedMessage = acc[name] ? `${acc[name]}. ${message}` : message;
        acc[name] = updatedMessage;

        return acc;
      }, {});

      setError(errorData);
    }
  };

  const transformErrorMessage = (message) => {
    let transformedMessage = message.replace(/\"[^\"]*\"/, '').trim(); // Extract the part after the quoted text
    transformedMessage = transformedMessage.charAt(0).toUpperCase() + transformedMessage.slice(1); // Capitalize the first letter of the resulting string

    return transformedMessage;
  };

  const getUserDetails = async (email) => {
    try {
      const response = await authApi.get(`/user?email=${email}`);
      console.log('User details:', response.data);
      return response.data;
    } catch (error) {
      console.error('User details error:', error.message);
      return null;
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLogin} noValidate>
      <Avatar sx={{ margin: 0, background: '#ff4b2b' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
        Sign in
      </Typography>
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        variant="filled"
        margin="normal"
        size="small"
        // InputProps={{ className: styles.inputField }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        value={loginForm.email}
        onChange={handleFormChange}
        error={!!error.email}
        helperText={error.email}
        fullWidth
      />

      <FormControl variant="filled" margin="normal" size="small" fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <FilledInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          autoComplete="current-password"
          aria-describedby="filled-password-helper-text"
          // InputProps={{ className: styles.inputField }}
          value={loginForm.password}
          onChange={handleFormChange}
          error={!!error.password}
        />
        <FormHelperText id="filled-password-helper-text" error={!!error.password}>
          {error.password}
        </FormHelperText>
      </FormControl>

      <a style={{ color: '#333', fontSize: '14px', textDecoration: 'none', margin: '15px 0' }} href="#">
        Forgot your password?
      </a>

      <Button type="submit">Sign In</Button>
    </form>
  );
}
