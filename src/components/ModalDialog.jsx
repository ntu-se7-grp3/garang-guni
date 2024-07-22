import { Dialog } from "@mui/material";

function ModalDialog({ isOpen=false, handleClose=()=>{}, isDark = false, children}) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {children}
    </Dialog>
  )
}

export default ModalDialog;