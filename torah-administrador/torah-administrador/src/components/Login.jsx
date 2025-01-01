import React, { useState } from 'react';
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const { loading, login } = useAuth(); // Consumimos el contexto
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });


  const handleLogin = async (e) => {
    e.preventDefault();
    let response = await login(input);

    console.log(response);

    if (response.authenticated) {
      navigate('/');
    } else {
      toast.error(response.message, { position: "bottom-right" });
    }


  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <ToastContainer />
      <Container>
        <Row>
          <h2 className="login-title">Sistema Administrador Torah Ministerio Menorah</h2>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          {loading ? (<Spinner animation="border" variant="primary" />) :
            (
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleInput}
                    placeholder="example@yahoo.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid username. It must contain at least 6 characters.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="Enter your password"
                  />
                  <Form.Control.Feedback type="invalid">
                    your password should be more than 6 character
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            )}
        </Row>
      </Container>
    </div>
  );
};

export default Login;
