import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import dotenv from 'dotenv';
import emailjs from 'emailjs';

emailjs.init(process.env.REACT_APP_EMAILJS_USERID);

function ContactForm(props) {
  const {
    REACT_APP_EMAILJS_RECEIVER: emailJsReceiver,
    REACT_APP_EMAILJS_TEMPLATEID: emailJsTemplate,
    REACT_APP_EMAILJS_USERID: emailJsUserId
  } = props.env

  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msgBody, setMsgBody] = useState("");
  const [emailSent, setEmailSent]

  const handleChange = (e, stateSetter) => {
    stateSetter(e.target.value);
  };

  const handleSubjectChange = handleChange.bind(null, setSubject);
  const handleNameChange = handleChange.bind(null, setName);
  const handleEmailChange = handleChange.bind(null, setEmail);
  const handleMsgBodyChange = handleChange.bind(null, setMsgBody);

  const handleSubmit = (e) => {

    sendFeedback (templateId, senderEmail, receiverEmail, feedback, user) {
      window.emailjs.send(
        'default_service', // default email provider in your EmailJS account
        templateId,
        {
          senderEmail,
          receiverEmail,
          feedback
        },
        user
      )
        .then(res => {
          this.setState({ formEmailSent: true })
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Failed to send feedback. Error: ', err))
    }

  }

  return (
    <form>
      <TextField
        label="Subject"
        variant="filled"
        required
        margin="dense"
        fullWidth
        value={subject}
        onChange={handleSubjectChange}
      />
      <TextField
        label="Name"
        variant="filled"
        required
        margin="normal"
        fullWidth
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        margin="dense"
        fullWidth
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        required
        variant="filled"
        // variant="outlined"
        margin="normal"
        fullWidth
        rows={8}
        multiline
        rowsMax={15}
        placeholder="Have some feedback? A question? Looking for help with a project? Let me know here"
        value={msgBody}
        onChange={handleMsgBodyChange}
      />
      <Button variant="outlined">Submit</Button>
    </form>
  );
}

export default ContactForm;
