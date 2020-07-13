import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import emailjs from "emailjs-com";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useStyles from "./ContactForm.styles.js";

emailjs.init(process.env.REACT_APP_EMAILJS_USERID);

function ContactFormWithFormik() {
  const classes = useStyles();
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATEID;

  const fieldVariant = "outlined";

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    // change state to reflect form submit
    setLoading(true);
    // send email and change state to reflect
    try {
      await emailjs.send("default_service", templateId, values);
      setLoading(false);
      setEmailSent(true);
    } catch (err) {
      console.error("Failed to send email. Error: ", err);
      setLoading(false);
      setError({
        error: true,
        message:
          "It looks like something isn't working! Please try again later or contact me through one of the platforms listed in the nav.",
      });
    }
  };

  const form = () => {
    return (
      <Formik
        initialValues={{
          emailSubject: "",
          senderName: "",
          senderEmail: "",
          emailMessageBody: "",
        }}
        onSubmit={handleFormSubmit}
        validationSchema={Yup.object().shape({
          emailSubject: Yup.string().required("Required"),
          senderName: Yup.string().required("Required"),
          senderEmail: Yup.string().email().required("Required"),
          emailMessageBody: Yup.string().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                name="emailSubject"
                error={errors.emailSubject && touched.emailSubject}
                helperText={
                  errors.emailSubject &&
                  touched.emailSubject &&
                  errors.emailSubject
                }
                value={values.emailSubject}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Subject"
                variant={fieldVariant}
                margin="normal"
                fullWidth
                disabled={loading}
              />
              <TextField
                name="senderName"
                error={errors.senderName && touched.senderName}
                helperText={
                  errors.senderName && touched.senderName && errors.senderName
                }
                value={values.senderName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Name"
                variant={fieldVariant}
                margin="normal"
                fullWidth
                disabled={loading}
              />
              <TextField
                name="senderEmail"
                error={errors.senderEmail && touched.senderEmail}
                helperText={
                  errors.senderEmail &&
                  touched.senderEmail &&
                  errors.senderEmail
                }
                value={values.senderEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                variant={fieldVariant}
                type="email"
                margin="normal"
                fullWidth
                disabled={loading}
              />
              <TextField
                name="emailMessageBody"
                error={errors.emailMessageBody && touched.emailMessageBody}
                helperText={
                  errors.emailMessageBody &&
                  touched.emailMessageBody &&
                  errors.emailMessageBody
                }
                value={values.emailMessageBody}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Message Body"
                placeholder="Feedback, comments, and proposals all welcome"
                variant={fieldVariant}
                margin="normal"
                fullWidth
                rows={8}
                multiline
                rowsMax={15}
                disabled={loading}
              />
              <ButtonGroup variant="text">
                <Button classes={{ root: classes.submitButton }} type="submit">
                  Submit
                </Button>
                <Button
                  classes={{ root: classes.clearButton }}
                  disabled={!dirty}
                  onClick={handleReset}
                >
                  Clear
                </Button>
              </ButtonGroup>
            </form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div>
      {!loading && !emailSent && form()}
      {(loading || emailSent) && (
        <div className={classes.spinnerContainer}>
          {loading ? (
            <CircularProgress classes={classes.spinner} />
          ) : (
            <div className={classes.sendConfirmationContainer}>
              <div>
                <CheckCircleSharpIcon
                  classes={{ root: classes.confirmIcon }}
                  fontSize="large"
                />
                <h2>Email Sent</h2>
              </div>
              <p>I'll be in touch in the next day or two</p>
            </div>
          )}
        </div>
      )}
      {error.error && <p className={classes.errorMessage}>{error.message}</p>}
    </div>
  );
}

export default ContactFormWithFormik;
