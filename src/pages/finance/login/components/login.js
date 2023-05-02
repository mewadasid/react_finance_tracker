import React, { useEffect, useRef, useState } from 'react'
import '../css/loginStyle.css';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState(
        {
            userEmail: "",
            userPassword: "",
        }
    );
    const [errors, setError] = useState([]);
    const register = JSON.parse(localStorage.getItem('userRegister'));
    const email = register.userEmail;
    const password = register.userPassword;
    console.log(email)
    const stopFIrst = useRef(true);
    useEffect(() => {

        if (stopFIrst.current === true) {
            stopFIrst.current = false;
            return;
        }
        else {

            if (loginData['userEmail'].trim() !== "") {
                setError((c) => {
                    const { email_field_empty, ...rest } = c;
                    return rest;
                })
            }
            if (loginData.userPassword.trim() !== "") {
                setError((c) => {
                    const { password_field_empty, ...rest } = c;
                    return rest;
                })
            }

        }


    }, [loginData])

    const handleSubmit = (e) => {

        if (loginData.userEmail.trim() === "" && loginData.userPassword.trim() === "") {
            setError({ ...errors, email_field_empty: "Please Fill Email Field", password_field_empty: "Please Fill Password Field" });
            e.preventDefault();
        }
        else {
            if (loginData.userEmail.trim() === "") {
                setError({ ...errors, email_field_empty: "Please Fill Email Field", });
                e.preventDefault();
            }
            else if (loginData.userPassword.trim() === "") {
                setError({ ...errors, password_field_empty: "Please Fill Password Field" });
                e.preventDefault();
            }
            else {
                if (Object.keys(errors).length > 0) {
                    e.preventDefault();
                }
                else {
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let token;
                    for (let i = 0; i < 10; i++) {

                        token += characters.charAt(Math.floor(Math.random() * characters.length))
                    }
                    localStorage.setItem('loginToken', JSON.stringify(token));
                    navigate('/createTransaction');
                }
            }

            if (loginData.userEmail !== "" && loginData.userPassword !== "") {
                debugger
                if (loginData.userEmail !== email) {
                    setError({ ...errors, auhtenticate_email_error: "Entered EmailId is wrong" })
                    e.preventDefault();
                }
                else {
                    setError((c) => {
                        const { auhtenticate_email_error, ...rest } = c;
                        return rest;
                    })
                }
                if (loginData.userPassword !== password) {
                    setError({ ...errors, auhtenticate_password_error: "Entered Password is wrong" })
                    e.preventDefault();
                }
                else {
                    setError((c) => {
                        const { auhtenticate_password_error, ...rest } = c;
                        return rest;
                    })
                }
            }
        }

    }

    const handleChange = (e) => {
        setError((c) => {
            const { auhtenticate, ...rest } = c;
            return rest;
        });
        e.preventDefault();
        const { name, value } = e.target;
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        const regex_psw = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
        switch (name) {
            case 'userEmail':
                if (!regex.test(value)) {
                    setError({ ...errors, email_wrong: 'Email is not valid' })
                }
                else {
                    setError((c) => {
                        const { email_wrong, ...rest } = c;
                        return rest;
                    });
                }
                break;

            case 'userPassword':
                console.log(value);
                if (!regex_psw.test(value)) {
                    setError({ ...errors, password_wrong: 'Password must be Minimum eight characters, at least one Capital and Small letter, one number and one special character' })
                }
                else {
                    setError((c) => {
                        const { password_wrong, ...rest } = c
                        return rest;
                    })
                }
                break;
            default:

                break;

        }


        setLoginData({ ...loginData, [name]: value });
    }



    return (
        <div className='form_container'>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="text" name='userEmail' class="form-control" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='test@gmail.com' />
                    <div><span>{errors.email_wrong}</span></div>
                    <div><span>{errors.email_field_empty}</span></div>
                    <div><span>{errors.auhtenticate_email_error}</span></div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='userPassword' class="form-control" onChange={handleChange} id="exampleInputPassword1" placeholder='password' />
                    <div><span>{errors.password_wrong}</span></div>
                    <div><span>{errors.password_field_empty}</span></div>
                    <div><span>{errors.auhtenticate_password_error}</span></div>

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
