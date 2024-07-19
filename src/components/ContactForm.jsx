import { useState } from "react";
import Joi from "joi-browser";
import { Alert, Button, TextField, Typography } from "@mui/material";

import styles from "./ContactForm.module.css";

const initFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  subject: "",
  messageBody: "",
};

const schema = {
  firstName: 
  Joi.string().min(1).max(60)
  .regex(/^[a-zA-Z]+$/).empty(''),
  lastName: Joi.string().min(1).max(60)
  .regex(/^[a-zA-Z]+$/).empty(''),
  phone: Joi.string().regex(/^[0-9]{8}$/).empty(''),
  email: Joi.string().email().empty(''),
  subject: Joi.string().min(1).required(),
  messageBody: Joi.string().min(1).required(),
};

const cFrmErrorMessage =  {
  firstNameError: "Invalid first name! Please enter a valid name. (Alpha only)",
  lastNameError: "Invalid last name! Please enter a valid name. (Alpha only)",
  phoneError: "Invalid phone number! Please enter a valid phone. (8 Digits)",
  emailError: "Invalid email! Plesae enter a valid Email address.",
  subjectError: "Please enter a subject.",
  messageBodyError: "Please enter a message."
};

const MISSING_REQUIRED_FIELD_FROM_FIELD = "Missing one of the required field";
const SUCCESS_MESSAGE = "Thanks for your enquiry form, we will try to response" +
                        "to you within 3 days based on the number/email provided."

const getTextInBrackets = (str) => {
  const re = /\[(.*?)\]$/
  return re.exec(str);
}

const printErrorMessage = (errors) => {
  const readableErrorsForUsers = Object.entries(errors).map(item => {
    switch(item[0]) {
      case "firstName":
        return <p>{cFrmErrorMessage.firstNameError}</p>;
      case "lastName":
        return <p>{cFrmErrorMessage.lastNameError}</p>;
      case "phone":
        return <p>{cFrmErrorMessage.phoneError}</p>;
      case "email":
        return <p>{cFrmErrorMessage.emailError}</p>;
      case "subject":
        return <p>{cFrmErrorMessage.subjectError}</p>;
      case "messageBody":
        return <p>{cFrmErrorMessage.messageBodyError}</p>;
      case MISSING_REQUIRED_FIELD_FROM_FIELD:
        return item[1].split("value")
                      .fiter(match => match)
                      .map((error,i) => 
                            <p key={i}>{getTextInBrackets(error)}</p>);
      default:
        throw new Error('Unknown Error has been caught in printErrorMessage.');
    }
  });
  return readableErrorsForUsers;
};

function ContactForm({ handleClose = () => {} }) {
  const [form, setForm] = useState(initFormState);
  const [errors, setErrors] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });

    const errorMessage = validate(e);
    setErrors((errors) => {
      const newError = { ...errors };
      if (errorMessage) {
        newError[name] = errorMessage;
      } else {
        delete newError[name];
      }

      return newError;
    });
  };

  const validate = (e) => {
    const { name, value } = e.target;
    const objToCompare = { [name]: value };
    const fieldSchema = { [name]: schema[name] };

    const result = Joi.validate(objToCompare, fieldSchema);

    const { error } = result;

    if (error) return error.details[0].message;
    else return null;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const allSchema = Joi.object(schema)
                          .or("firstName", "lastName")
                          .or("email", "phone");
    const result = Joi.validate(form, allSchema, { abortEarly: false });

    const { error } = result;

    if (!error) {
      // Call the api after the api is created.
      setForm(initFormState);
      setIsSuccessful(true);
      alert("Success");
    } else {
      const errorData = error.details.reduce((acc, curItem) => {
        const name = curItem.path[0] ? curItem.path[0] : MISSING_REQUIRED_FIELD_FROM_FIELD;
        const message = curItem.message;
        const updatedMessage = acc[name] ? acc[name] + "," + message : message;
        acc[name] = updatedMessage;
        
        return acc;
      }, {});

      setErrors(errorData);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.form}>
      <Typography gutterBottom variant="h5">
        Contact Form
      </Typography>
      <Typography variant="body2" component="p">
        Fill up this form and our team will get back to you within 24 years.
      </Typography>
      <div className={styles.nameField}>
        <TextField
          name="firstName"
          InputProps={{className: styles.contactTextField}}
          style={{ paddingRight: "5px", width:"50%" }}
          label="First Name"
          variant="filled"
          value={form.firstName}
          onChange={handleOnChange}
        />
        <TextField
          name="lastName"
          InputProps={{className: styles.contactTextField}}
          style={{ paddingLeft: "5px", width:"50%"}}
          label="Last Name"
          variant="filled"
          value={form.lastName}
          onChange={handleOnChange}
        />
      </div>
      <TextField
        name="phone"
        InputProps={{className: styles.contactTextField}}
        label="Phone"
        type="tel"
        variant="filled"
        value={form.phone}
        onChange={handleOnChange}
      />
      <TextField
        name="email"
        InputProps={{className: styles.contactTextField}}
        label="Email"
        type="email"
        variant="filled"
        value={form.email}
        onChange={handleOnChange}
      />
      <TextField
        name="subject"
        InputProps={{className: styles.contactTextField}}
        label="Subject"
        variant="filled"
        value={form.subject}
        onChange={handleOnChange}
        required
      />
      <TextField
        name="messageBody"
        InputProps={{className: styles.contactTextField}}
        label="Message Content"
        multiline
        variant="filled"
        value={form.messageBody}
        onChange={handleOnChange}
        required
      />

      <div className={styles.formButtons}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button variant="contained" onClick={handleClose} style={{ marginLeft: "10px" }}>
          Cancel
        </Button>
      </div>
      { Object.keys(errors).length !== 0 && (
        <Alert className={styles.alertBox} sx={{ mb: 4 }} severity="error">
          {printErrorMessage(errors)}
        </Alert>
      )}
      { isSuccessful && (
        <Alert className={styles.alertBox} sx={{ mb: 4 }} severity="success">
          {SUCCESS_MESSAGE}
        </Alert>
      )}
    </form>
  );
}

export default ContactForm;
