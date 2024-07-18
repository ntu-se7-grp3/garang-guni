import { Dialog } from "@mui/material";

import ContactForm from "./ContactForm";

function ModalDialog({ isOpen=false, handleClose=()=>{}, handleSubmit=()=>{} }) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <ContactForm handleClose={handleClose} />
    </Dialog>
  )
}

export default ModalDialog;