import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import {
  Avatar,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
import * as CryptoJS from 'crypto-js';
import Joi from 'joi-browser';

import { UserContext } from '../../context/user-context';
import authApi from '../../services/auth-api';
import styles from './RegisterForm.module.css';

const initialFormState = {
  firstName: '',
  lastName: '',
  // gender: '',
  email: '',
  password: '',
  confirmPassword: '',
  // mobileNo: '',
  // postalCode: null,
  // address: '',
  // floor: null,
  // unitNumber: null,
};

const schema = {
  firstName: Joi.string()
    .min(1)
    .max(60)
    .regex(/^[a-zA-Z]+$/)
    .required(),
  lastName: Joi.string()
    .min(1)
    .max(60)
    .regex(/^[a-zA-Z]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .options({
      language: {
        any: {
          allowOnly: 'must match password',
        },
      },
    }),
};

const key = import.meta.env.VITE_HASHING_KEY;

const Button = styled(BaseButton)(
  ({ _ }) => `
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    margin-top: 8px;
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

const getErrorMessage = (field, errorType) => {
  let message = '';
  switch (field) {
    case 'firstName':
      if (errorType === 'any.empty') {
        message = 'First name is required';
      } else if (errorType === 'string.regex.base') {
        message = 'Please enter a valid first name';
      }
      break;
    case 'lastName':
      if (errorType === 'any.empty') {
        message = 'Last name is required';
      } else if (errorType === 'string.regex.base') {
        message = 'Please enter a valid last name';
      }
      break;
    case 'email':
      if (errorType === 'any.empty') {
        message = 'Email is required';
      } else if (errorType === 'string.email') {
        message = 'Please enter a valid email';
      }
      break;
    case 'password':
      if (errorType === 'any.empty') {
        message = 'Password is required';
      } else if (errorType === 'string.regex.base') {
        message =
          'Password must be at least 8 characters long with a combination of uppercase letters, lowercase letters, numbers, and symbols';
      }
      break;
    case 'confirmPassword':
      if (errorType === 'any.allowOnly') {
        message = 'Passwords must match';
      }
      break;
  }

  return message;
};

export default function RegisterForm({ onLoad }) {
  const userCtx = useContext(UserContext);
  const [registerForm, setRegisterForm] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showCfmPassword, setShowCfmPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setRegisterForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    validateField(name, value);

    /*
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
    //*/ //
  };

  const validateField = (name, value) => {
    let fieldSchema;
    let objToValidate;

    if (name === 'password' || name === 'confirmPassword') {
      fieldSchema = {
        password: schema.password,
        confirmPassword: schema.confirmPassword,
      };
      objToValidate = {
        password: name === 'password' ? value : registerForm.password,
        confirmPassword: name === 'confirmPassword' ? value : registerForm.confirmPassword,
      };
    } else {
      fieldSchema = { [name]: schema[name] };
      objToValidate = { [name]: value };
    }

    const result = Joi.validate(objToValidate, fieldSchema, { abortEarly: false });
    const { error } = result;

    if (!error) {
      setError((prevState) => {
        const newError = { ...prevState };
        delete newError[name];
        if (name === 'password' || name === 'confirmPassword') {
          delete newError['confirmPassword'];
        }
        return newError;
      });
      // return null;
    } else {
      const errorData = {};
      for (const item of error.details) {
        const errorField = item.path[0];
        const message = getErrorMessage(errorField, item.type);
        errorData[errorField] = message;
      }

      setError((prevState) => ({ ...prevState, ...errorData }));
    }
  };

  /*
  const validate = (event) => {
    const { name, value } = event.target;
    const objToCompare = { [name]: value };
    const fieldSchema = { [name]: schema[name] };

    const result = Joi.validate(objToCompare, fieldSchema);
    const { error } = result;
    if (error) {
      error.details[0].message = getErrorMessage(name, error.details[0].type);
    }

    return error ? error.details[0].message : null;
  };
  //*/ //

  const handleRegister = async (event) => {
    event.preventDefault();

    const result = Joi.validate(registerForm, schema, { abortEarly: false });
    const { error } = result;

    if (!error) {
      try {
        onLoad(true);
        const hashedPassword = CryptoJS.HmacSHA256(registerForm['password'], key).toString();
        delete registerForm['confirmPassword'];
        const updatedForm = {
          ...registerForm,
          mobileNumber: null,
          dob: null,
          gender: null,
          postalCode: null,
          address: null,
          floor: null,
          unitNumber: null,
          password: hashedPassword,
        };
        const response = await authApi.post(`/user`, updatedForm);
        console.log('New user:', response.data);

        /* TODO:
        Refactor not to store token but using HTTP-only cookies method as the browser manages the cookie.
        The cookie will be automatically sent with each request to the server.
        Fetch user details using the token and store inside the authCtx
        //*/ //
        const userDetails = await getUserDetails(registerForm['email']);
        if (userDetails) {
          userCtx.handleLogin(userDetails);
          setRegisterForm(initialFormState); // Clear the form
          navigate('..');
        }
      } catch (error) {
        console.error('Register error:', error.message);
      } finally {
        onLoad(false);
      }
    } else {
      const errorData = {};
      for (const item of error.details) {
        const name = item.path[0];
        const message = getErrorMessage(name, item.type);
        errorData[name] = message;
      }

      setError(errorData);

      /*
      const errorData = error.details.reduce((acc, currentItem) => {
        const name = currentItem.path[0];
        const message = getErrorMessage(name, currentItem.type); //currentItem.message;
        const updatedMessage = acc[name] ? `${acc[name]} ${message}` : message;
        acc[name] = updatedMessage;

        return acc;
      }, {});

      setError(errorData);
      //*/ //
    }
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
    <form className={styles.registerForm} onSubmit={handleRegister} noValidate>
      <Avatar sx={{ margin: 0, background: '#ff4b2b' }}>
        <AppRegistrationOutlinedIcon />
      </Avatar>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
        Create Account
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            variant="filled"
            margin="dense"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={registerForm.firstName}
            onChange={handleFormChange}
            error={!!error.firstName}
            helperText={error.firstName}
            FormHelperTextProps={{ className: styles.helperText }}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="lastName"
            name="lastName"
            type="text"
            label="Last Name"
            variant="filled"
            margin="dense"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={registerForm.lastName}
            onChange={handleFormChange}
            error={!!error.lastName}
            helperText={error.lastName}
            FormHelperTextProps={{ className: styles.helperText }}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        variant="filled"
        margin="dense"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        value={registerForm.email}
        onChange={handleFormChange}
        error={!!error.email}
        helperText={error.email}
        FormHelperTextProps={{ className: styles.helperText }}
        fullWidth
        required
      />
      <FormControl variant="filled" margin="dense" size="small" fullWidth required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <FilledInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          autoComplete="current-password"
          aria-describedby="filled-password-helper-text"
          value={registerForm.password}
          onChange={handleFormChange}
          error={!!error.password}
        />
        <FormHelperText
          id="filled-password-helper-text"
          error={!!error.password}
          sx={{ lineHeight: 'unset !important', margin: '4px 10px 0 !important', fontSize: '0.7rem !important' }}
        >
          {error.password}
        </FormHelperText>
      </FormControl>
      <FormControl variant="filled" margin="dense" size="small" fullWidth required>
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <FilledInput
          id="confirmPassword"
          name="confirmPassword"
          type={showCfmPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowCfmPassword((show) => !show)}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
              >
                {showCfmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          autoComplete="current-confirm-password"
          aria-describedby="filled-confirm-password-helper-text"
          value={registerForm.confirmPassword}
          onChange={handleFormChange}
          error={!!error.confirmPassword}
        />
        <FormHelperText
          id="filled-confirm-password-helper-text"
          error={!!error.confirmPassword}
          sx={{ lineHeight: 'unset !important', margin: '4px 10px 0 !important', fontSize: '0.7rem !important' }}
        >
          {error.confirmPassword}
        </FormHelperText>
      </FormControl>
      <Button type="submit">Sign Up</Button>
      {/* <TextField
        id="mobileNo"
        name="mobileNo"
        type="tel"
        label="Mobile Number"
        variant="filled"
        margin="normal"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
        value={registerForm.mobileNo}
        onChange={handleFormChange}
        error={!!error.mobileNo}
        helperText={error.mobileNo}
        FormHelperTextProps={{ className: styles.helperText }}
        fullWidth
      /> */}
      {/* gender */}
      {/* postalCode */} {/* Search */}
      {/* <input
        type="text"
        name="address"
        id="address"
        placeholder="Address"
        className={styles.inputField}
        value={registerForm.address}
        onChange={handleFormChange}
      />
      <input
        type="number"
        name="floor"
        id="floor"
        placeholder="Floor"
        className={styles.inputField}
        value={registerForm.floor}
        onChange={handleFormChange}
      />
      <input
        type="number"
        name="unitNumber"
        id="unitNumber"
        placeholder="Unit Number"
        className={styles.inputField}
        value={registerForm.unitNumber}
        onChange={handleFormChange}
      /> */}
    </form>
  );
}
