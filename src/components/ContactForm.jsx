import { Button, styled, TextField, Typography } from "@mui/material";
import styles from "./ContactForm.module.css";

function ContactForm({ handleClose=()=>{}, handleSubmit=()=>{} } ) {

  const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    padding: "10px 0px 10px 0px"
  }));

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Typography gutterBottom variant="h5">Contact Form</Typography>
      <Typography variant="body2" component="p">
        Fill up this form and our team will get back to you within 24 years.
      </Typography>
      <div className={styles.nameField}>
        <StyledTextField style={{paddingRight: "5px"}} 
                         label="First Name" 
                         variant="filled" 
                         required/>
        <StyledTextField style={{paddingLeft: "5px"}} 
                         label="Last Name" 
                         variant="filled" 
                         required/>
      </div>
      <StyledTextField label="Phone" type="tel" variant="filled" required/>
      <StyledTextField label="Email" type="email" variant="filled" required/>
      <StyledTextField label="Subject" variant="filled" required/>
      <StyledTextField label="Message Content" multiline variant="filled" required/>
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