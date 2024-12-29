import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const auth = useAuth();

    const handleSubmitEvent = (e) => {
        e.preventDefault();

        if (input.email !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("please provide a valid input");
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="login-wrapper">
            <div className="login-form-container">
                <h2 className="login-title">Sistema Administrador Torah Ministerio Menorah</h2>
                <Form onSubmit={handleSubmitEvent}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="email"
                            id="user-email"
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
            </div>
        </div>
    );
}

export default Login;