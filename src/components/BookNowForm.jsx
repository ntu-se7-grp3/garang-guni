import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Joi from "joi-browser";
import { 
    createTheme,
    ThemeProvider,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    TextField,
    Button
    } from "@mui/material";

import styles from "./BookNowForm.module.css"
import companyIcon from "../assets/logo.png"
import BookNowContentRow from "./BookNowContentRow";

const initBookNowForm = {
  uploadedFileName: "",
  description: "",
  isSameAddressAsHome: true,
  isCollectionFromHome: false,
  isPaymentByCash: true,
  remarks: "",
  checkBoxes: {}
};

const FORM_BANNER_TEXT = "Request A Booking";

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

const schema = {};

function BookNowForm({ 
  handleClose=()=>{},
  handleDateChange=()=>{},
  isSelectable=()=>{},
  handleLocationChange=()=>{},
  convertDateToUnixStr=()=>{},
  isDark=false,
  selectedDate, 
  listOfAvailDates=[],
  datesWithLocation=[],
  selectedLocation,
  listOfItems
 }) {
  const [form, setForm] = useState(initBookNowForm);
  const [errors, setErrors] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    updateCheckBoxes();
  },[]);

  const updateCheckBoxes = () => {
    setForm((prevForm) => {
      const states = listOfItems.reduce((acc, item) => {
                        acc[item] = false;
                        return acc; }, {});
      return {
        ...prevForm,
        checkBoxes: states
      };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleClose()};

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      if (value === "on") {
        return {
          ...prevForm,
          [name]: !prevForm[name]
        };
      }

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

  const handleOnCheckBoxChange = (e) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        checkBoxes: {
          ...prevForm.checkBoxes,
          [e.target.name]: e.target.checked
        }
      }
    });
  };

  return (
    <ThemeProvider theme={isDark && darkTheme}>
      <form onSubmit={handleOnSubmit} className={`${styles.form} ${isDark && styles.dark}`}>
        <div className={styles.banner}>
          <span className={styles.bannerText}>{FORM_BANNER_TEXT}</span>
          <div className={styles.companyLogoAndText}>
            <img className={styles.companyIcon} src={companyIcon} alt="Company icon" />
            <div className={styles.companyIconText}>
              <p>Garang</p>
              <p>Guni</p>
            </div>
          </div>
        </div>
        <div className={styles.bookNowFormContents}>
          <BookNowContentRow id="bookNowFLocDates">
            <div className={styles.chooseDate}>
                <p>Select a booking date</p>
                <DatePicker
                  showIcon
                  closeOnScroll={true}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  highlightDates={listOfAvailDates}
                  dateFormat="dd/MM/YYYY"
                  filterDate={isSelectable}
                  placeholderText="Choose a date!"
                  popperClassName={styles.popper}
                  wrapperClassName={styles.datePickerWrapper}
                  popperPlacement="bottom-end"
                />
            </div>
            <div className={styles.chooseLocation}>
              <p>Location</p>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {convertDateToUnixStr(selectedDate) && 
                    datesWithLocation[convertDateToUnixStr(selectedDate)]
                      .locations.map((location, i) => {
                    return (
                      <MenuItem key={i} value={location.name}>
                        {location.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </BookNowContentRow>
          <BookNowContentRow header="Upload Your Items:">

          </BookNowContentRow>
          <BookNowContentRow header="Describe your items:">
            <TextField
                name="description"
                InputProps={{className: styles.contactTextField}}
                label="Remarks"
                variant="filled"
                value={form.description}
                onChange={handleOnChange}
                disabled={isSuccessful}
                fullWidth 
                required
              />
          </BookNowContentRow>
          <BookNowContentRow id="bookNowCheckBoxs" 
                             header="Please pick items that match your description.">
            <FormGroup aria-label="position" row sx={{height: "10vh",overflowY: "auto"}}>
              {listOfItems.map((item, i) => {
                return <FormControlLabel key={i}  
                        control={
                          <Checkbox checked={form.checkBoxes.item}
                            onChange={handleOnCheckBoxChange} 
                            name={item} 
                            />} 
                        label={<span className={styles.formControlLabel}>
                                {item}
                               </span>}
                        />})}
            </FormGroup>
          </BookNowContentRow>
          <BookNowContentRow header="Is your collection address same as your registered address?">
            <FormControlLabel  
                control={<Checkbox checked={form.isSameAddressAsHome}
                            onChange={handleOnChange} 
                            name="isSameAddressAsHome" 
                        />} 
                label={<span className={styles.formControlLabel}>Yes</span>}
              />
              <FormControlLabel  
                control={<Checkbox checked={!form.isSameAddressAsHome}
                            onChange={handleOnChange} 
                            name="isSameAddressAsHome"
                        />} 
                label={<span className={styles.formControlLabel}>
                          No
                      </span>}
              />
          </BookNowContentRow>
          <BookNowContentRow header="Collection Point or Home:">
            <FormControlLabel  
              control={<Checkbox checked={!form.isCollectionFromHome}
                        onChange={handleOnChange} 
                        name="isCollectionFromHome" 
                      />} 
              label={<span className={styles.formControlLabel}>
                      Collection Point
                    </span>}
            />
            <FormControlLabel  
              control={<Checkbox checked={form.isCollectionFromHome}
                        onChange={handleOnChange} 
                        name="isCollectionFromHome" 
                      />} 
              label={<span className={styles.formControlLabel}>Home</span>}
            />
          </BookNowContentRow>
          <BookNowContentRow header="Payment by:">
            <FormControlLabel  
              control={<Checkbox checked={form.isPaymentByCash}
                          onChange={handleOnChange} 
                          name="isPaymentByCash" 
                      />} 
              label={<span className={styles.formControlLabel}>Cash</span>}
            />
            <FormControlLabel  
              control={<Checkbox checked={!form.isPaymentByCash}
                          onChange={handleOnChange} 
                          name="isPaymentByCash" 
                      />} 
              label={<span className={styles.formControlLabel}>
                        Credit Card / Visa / Master / Paynow / Paylah
                     </span>}
            />
          </BookNowContentRow>
          <BookNowContentRow header="Anything else / Remarks:">
            <TextField
              name="remarks"
              InputProps={{className: styles.contactTextField}}
              label="Remarks"
              variant="filled"
              value={form.remarks}
              onChange={handleOnChange}
              disabled={isSuccessful}
              multiline
              fullWidth 
            />
          </BookNowContentRow>  

          <div className={styles.formButtons}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="contained" onClick={handleClose} style={{ marginLeft: "10px" }}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </ThemeProvider>
  )

}

export default BookNowForm;