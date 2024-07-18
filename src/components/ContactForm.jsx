import { useState, useRef, useEffect } from "react";
import Joi from "joi-browser"
import { Button, styled, TextField, Typography } from "@mui/material";

import styles from "./ContactForm.module.css";

const initFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  subject: "",
  messageBody: ""
};

const schema = {
  firstName: Joi.string().min(1).max(60),
  lastName: Joi.string().min(1).max(60),
  phone: Joi.string().regex(/^[0-9]{8}$/),
  email: Joi.string().email(),
  subject: Joi.string().min(1).required(),
  messageBody: Joi.string().min(1).required()
};

function ContactForm({ handleClose=()=>{} } ) {
  const [form, setForm] = useState(initFormState);
  const [currentFocus, setCurrentFocus] = useState("");
  const [error, setError] = useState({});
  
  const inpRef = useRef("");
  
  useEffect(() => {
    if (inpRef.current !== "") inpRef.current.focus();
   },[form]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      }
    });

    const errorMessage = validate(e);
    setError((error) => {
      const newError = {...error};
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
    const allSchema = Joi.object(schema).or("firstName","lastName").or("email","phone");
    const result = Joi.validate(form, allSchema, { abortEarly: false });

    const { error } = result;
    console.log(error);

    if(!error) {
      // Call the api after the api is created.
      alert("Success");
    } else {
      const errorData = error.details.reduce((acc, curItem) => {
        const name = curItem.path[0];
        const message = curItem.message;
        const updatedMessage = acc[name] ? acc[name] + "," + message : message;
        acc[name] = updatedMessage;

        return acc;
      },{});

      setError(errorData);
    }
  };

  const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    padding: "10px 0px 10px 0px"
  }));

  return (
    <form onSubmit={handleOnSubmit} className={styles.form}>
      <Typography gutterBottom variant="h5">Contact Form</Typography>
      <Typography variant="body2" component="p">
        Fill up this form and our team will get back to you within 24 years.
      </Typography>
      <div className={styles.nameField}>
        <StyledTextField name="firstName"
                         inputRef={currentFocus === "firstName" ? inpRef: null}
                         style={{paddingRight: "5px"}} 
                         label="First Name" 
                         variant="filled" 
                         value={form.firstName}
                         onChange={handleOnChange}
                         onFocus={() => setCurrentFocus("firstName")}
                         />
        <StyledTextField name="lastName"
                         inputRef={currentFocus === "lastName" ? inpRef : null}
                         style={{paddingLeft: "5px"}} 
                         label="Last Name" 
                         variant="filled" 
                         value={form.lastName}
                         onFocus={() => setCurrentFocus("lastName")}
                         onChange={handleOnChange}/>
      </div>
      <StyledTextField name="phone"
                       inputRef={currentFocus === "phone" ? inpRef : null}
                       label="Phone" 
                       type="tel" 
                       variant="filled" 
                       value={form.phone}
                       onFocus={() => setCurrentFocus("phone")}
                       onChange={handleOnChange}/>
      <StyledTextField name="email"
                       inputRef={currentFocus === "email" ? inpRef : null}
                       label="Email" 
                       type="email" 
                       variant="filled" 
                       value={form.email}
                       onFocus={() => setCurrentFocus("email")}
                       onChange={handleOnChange}/>
      <StyledTextField name="subject"
                       inputRef={currentFocus === "subject" ? inpRef : null}
                       label="Subject" 
                       variant="filled"
                       value={form.subject}
                       onFocus={() => setCurrentFocus("subject")}
                       onChange={handleOnChange}
                       required/>
      <StyledTextField name="messageBody"
                       inputRef={currentFocus === "messageBody" ? inpRef : null}
                       label="Message Content" 
                       multiline 
                       variant="filled" 
                       value={form.messageBody}
                       onFocus={(e) => {
                        setCurrentFocus("messageBody");
                        return e.currentTarget.setSelectionRange(
                          e.currentTarget.value.length,
                          e.currentTarget.value.length
                        );
                      }}
                       onChange={handleOnChange}
                       required/>

      <div className={styles.formButtons}>
        <Button type="submit" variant="contained" color="primary" >Submit</Button>
        <Button variant="contained" 
                onClick={handleClose}
                style={{marginLeft:"10px"}}
                >Cancel</Button>
      </div>
    </form>
  )
}

export default ContactForm;