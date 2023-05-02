import { React, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState(
        {
            userFullname: "",
            userEmail: "",
            userPassword: ""
        }
    );
    const [errors, setError] = useState([]);

    const stopFIrst = useRef(true);
    useEffect(() => {
        console.log(1);
        if (stopFIrst.current === true) {
            stopFIrst.current = false;
            return;
        }
        else {

            if (registerData['userFullname'].trim() !== "" || registerData['userEmail'].trim() !== "" || registerData.userPassword.trim() !== "") {
                setError((c) => {
                    const { field_email_empty, ...rest } = c;
                    return rest;
                })
                setError((c) => {
                    const { field_password_empty, ...rest } = c;
                    return rest;
                })
                setError((c) => {
                    const { field_username_empty, ...rest } = c;
                    return rest;
                })
            }
        }
    }, [registerData])

    const handleSubmit = (e) => {

        if (registerData.length === 0 || registerData['userFullname'].trim() === "" || registerData['userEmail'].trim() === "" || registerData.userPassword.trim() === "") {
            setError({ ...errors, field_email_empty: "Please Fill Email", field_password_empty: "Please Fill Password", field_username_empty: "Please Fill Username" });

            e.preventDefault();
        }
        else {
            if (Object.keys(errors).length > 0) {
                e.preventDefault();
            }
            else {
                e.preventDefault();
                localStorage.setItem("userRegister", JSON.stringify(registerData));
                navigate('/login');
            }
        }


    }
    console.log(errors.length)



    const handleChange = (e) => {
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


        setRegisterData({ ...registerData, [name]: value });
    }

    return (
        <div className='form_container'>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Fullname:</label>
                    <input type="text" name='userFullname' class="form-control" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Fullname' />
                    <div><span className='error_msg'>{errors.field_username_empty}</span></div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="text" name='userEmail' class="form-control" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='test@gmail.com' />
                    <div><span className='error_msg mb-3'>{errors.email_wrong}</span></div>
                    <div><span className='error_msg'>{errors.field_email_empty}</span></div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='userPassword' class="form-control" onChange={handleChange} id="exampleInputPassword1" placeholder='password' />
                    <div><span className='error_msg mb-3'>{errors.password_wrong}</span></div>
                    <div><span className='error_msg'>{errors.field_password_empty}</span></div>

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
