import { Dialog } from "@mui/material";

import ContactForm from "./ContactForm";

function ModalDialog({ isOpen=false, handleClose=()=>{}, isDark = false}) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <ContactForm handleClose={handleClose} isDark={isDark} />
    </Dialog>
  )
}

export default ModalDialog;