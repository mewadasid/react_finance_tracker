import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Protected({ Cmp }) {
    const getRegister = localStorage.getItem('userRegister');
    const token = localStorage.getItem('loginToken');
    const navigate = useNavigate();
    useEffect(() => {
        switch (true) {
            case !getRegister:
                navigate("/register");
                break;
            case !token:
                navigate("/login");
                break;
            default:
                break;
        }

    }, [])


    return <Cmp />



}

