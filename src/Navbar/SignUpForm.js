import React, { useState } from "react"
import { Button, FormFeedback, FormText,FormGroup,Label,Input, ModalFooter, ModalBody, ModalHeader } from "reactstrap";
import axios from 'axios'

const SignUpForm = ({toggle,toggleForm}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [delay, setDelay] = useState(null)
  const [usernameValid, setUsernameValid] = useState(null)

  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const handleInput = (e) =>{
    if (e.target.name === "username"){
      clearTimeout(delay)
      let newUsername = e.target.value
      setUsername(newUsername)
      const newDelay = setTimeout(() => {
        checkUsername(newUsername)
      }, 1000);
      setDelay(newDelay)
    }
    if (e.target.name === "password"){
      setPassword(e.target.value)
    }
    if (e.target.name === "email"){
      setEmail(e.target.value)
    }
  }
  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };
  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };
  return (
    <>
      <ModalHeader toggle={toggle}>Sign Up Form</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            onChange={handleInput}
            value={username}
            {...getInputProp()}
          />
          {getFormFeedback()}
          <FormText>Enter a username between 6 and 20 characters</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={!usernameValid} >Sign Up</Button>{' '}
        <Button color="secondary" onClick={toggleForm}>Login now</Button>
      </ModalFooter>
    </>
  );
};
export default SignUpForm