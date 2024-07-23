import { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import { useDropzone } from 'react-dropzone'
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
    Button,
    Alert
    } from "@mui/material";

import styles from "./BookNowForm.module.css"
import companyIcon from "../assets/logo.png"
import BookNowContentRow from "./BookNowContentRow";
import BookNowEitherOrCheckBox from "./BookNowEitherOrCheckBox";
import ModalDialog from "./ModalDialog";

const initBookNowForm = {
  description: "",
  isSameAddressAsHome: true,
  isCollectingFromCP: true,
  isPaymentByCash: true,
  remarks: "",
  itemsCheckBoxes: {}
};

const FORM_BANNER_TEXT = "Request A Booking";

const FORM_QUESTION_DATA = [
  {
    id:"bookNowFHomeQn",
    header: "Is your collection address same as your registered address?",
    controlName: "isSameAddressAsHome",
    option1Text: "Yes",
    option2Text: "No"
  },
  {
    id:"bookNowFCpQn",
    header: "Which collection point do you want to choose?",
    controlName: "isCollectingFromCP",
    option1Text: "Designated Collection Point",
    option2Text: "Home"
  },
  {
    id:"bookNowFPaymentQn",
    header: "Payment Method",
    controlName: "isPaymentByCash",
    option1Text: "Cash",
    option2Text: "Credit Card / Visa / Master / Paynow / Paylah"
  }
];

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

const schema = {
  description: Joi.string().min(3),
  isSameAddressAsHome: Joi.boolean(),
  isCollectingFromCP: Joi.boolean(),
  isPaymentByCash: Joi.boolean(),
  remarks: Joi.string().empty(''),
  itemsCheckBoxes: Joi.object(),

};

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
  const [preview, setPreview] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isErrorPageOpen, setIsErrorPageOpen] = useState(false);
  
  const onDrop = useCallback(acceptedFiles => {
    const file = new FileReader;
    file.onload = () => { setPreview(file.result);}
    file.readAsDataURL(acceptedFiles[0]);
  }, [])
  
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  useEffect(() => {
    updateCheckBoxes();
  },[]);
  
  const updateCheckBoxes = () => {
    setForm((prevForm) => {
      const states = listOfItems.reduce((acc, item) => {
        acc[item] = false;
        return acc; 
      }, {});
      return {
        ...prevForm,
        itemsCheckBoxes: states
      };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const result = Joi.validate(form, schema, { abortEarly: false });
    const { error } = result;
    
    if (!error) {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      /* Waiting for backend + storage 
      // formData.append('upload_preset', '<Your Upload Preset>');
      //formData.append('api_key', import.meta.env.VITE_API_KEY);
  
      const results = await fetch('', {
        method: 'POST',
        body: formData
      }).then(r => r.json());
      */
      // Call the api after the api is created.
      setIsSuccessful(true);
      alert("Success");
    } else {
      const errorData = error.details.reduce((acc, curItem) => {
        const name = curItem.path[0];
        const message = curItem.message;
        const updatedMessage = acc[name] ? acc[name] + "," + message : message;
        acc[name] = updatedMessage;
        
        return acc;
      }, {});

      setErrors(errorData);
      setIsErrorPageOpen((prevState) => !prevState);
    }
  };

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
        itemsCheckBoxes: {
          ...prevForm.itemsCheckBoxes,
          [e.target.name]: e.target.checked
        }
      }
    });
  };

  const togglePreviewPicture = () => {
    setIsPreviewOpen((prevState) => !prevState);
  };

  const toggleErrorPage = () => {
    setIsErrorPageOpen((prevState) => !prevState);
  };


  return (
    <>
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
                    disabled={isSuccessful}
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
                    disabled={isSuccessful}
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
              {!isSuccessful && <div {...getRootProps()} className={`${styles.upload} ${isDragActive ?
                styles.uploadAfter : styles.uploadBefore}`}>
                <input {...getInputProps()} />
                { isDragActive ?
                  <div>Drop the files here ...</div> :
                  <div>Drag &amp; Drop files here or click to select. Click on picture to expand.</div>
                }
              </div>
              }
              <div>
                {preview && (
                  <p>
                    <img className={styles.previewPicture} src={preview} alt="Upload preview"
                        onClick={togglePreviewPicture} />
                  </p>
                )}
              </div>
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
                            <Checkbox checked={form.itemsCheckBoxes.item}
                              onChange={handleOnCheckBoxChange} 
                              name={item} 
                              disabled={isSuccessful}
                              />} 
                          label={<span className={styles.formControlLabel}>
                                  {item}
                                </span>}
                          />})}
              </FormGroup>
            </BookNowContentRow>
            {FORM_QUESTION_DATA.map((data) => {
              return (
              <BookNowContentRow key={data.id} id={data.id} 
                header={data.header}>
                <BookNowEitherOrCheckBox controlName={data.controlName}
                  disabled={isSuccessful} 
                  value = {form[data.controlName]}
                  onChange = {handleOnChange}
                  option1 = {data.option1Text}
                  option2 = {data.option2Text}
                />
              </BookNowContentRow>
              );
            })}
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
      <ModalDialog isOpen={isPreviewOpen} handleClose={togglePreviewPicture}>
        <div>
          <img className={styles.enlargedBiggerPic} src={preview} alt="Upload preview" />
        </div>
      </ModalDialog>
      <ModalDialog isOpen={isErrorPageOpen} handleClose={toggleErrorPage}>
        <div>
          <Alert severity="error">{Object.entries(errors).map(error => error[1])}</Alert>
        </div>
      </ModalDialog> 
    </>
  )

}

export default BookNowForm;