import { 
  FormControlLabel,
  Checkbox
} from "@mui/material";

import styles from "./BookNowEitherOrCheckBox.module.css"

function BookNowEitherOrCheckBox({ 
  controlName = "",
  value = false,
  onChange=()=>{},
  option1 = "",
  option2 = ""

  }) {
  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={onChange} name={controlName} />}
        label={<span className={styles.formControlLabel}>{option1}</span>}
      />
      <FormControlLabel
        control={<Checkbox checked={!value} onChange={onChange} name={controlName} />}
        label={<span className={styles.formControlLabel}>{option2}</span>}
      />
    </>
  );
}

export default BookNowEitherOrCheckBox;
