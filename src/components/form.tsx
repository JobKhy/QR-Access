import React from "react";
import styles from "@/components/form.module.css";
import { useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { baseUrl } from "@/config/API";

type Props = {};

export const Formi = (props: Props) => {
    const [userTicket, setUserTicket] = useState<number>(0);
    const [src, setSrc] = useState<string>("");

    const genQR = () => {
        console.log("generando");
        QRCode.toDataURL( `${baseUrl}/${(userTicket).toString()}` ).then(setSrc);
    };

    const [student, setStudent] = useState({
        name: "",
        appPat: "",
        appMat: "",
        email: "",
        role: "",
        ticket: -1
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        const res = await axios.post("http://localhost:3000/api/students", { data: student });
        // console.log(res);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });

        if (name === "ticket") {
            setUserTicket(parseInt(value));
        }
    };
    
    return (
        <>
        <div>
            <form onSubmit={handleSubmit} className={ styles.title }>
            <input
            type="number"
            name="ticket"
            id="ticket"
            // value={userTicket}
            // onChange={(e) => setUserTicket(parseInt(e.target.value))}\
            onChange={handleChange} 
            />
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name"  onChange={handleChange}/>
            <label htmlFor="appPat">Apellido Paterno: </label>
            <input type="text" name="appPat" id="appPat"  onChange={handleChange}/>
            <label htmlFor="appMat">Apellido Materno: </label>
            <input type="text" name="appMat" id="appMat"  onChange={handleChange}/>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email"  onChange={handleChange}/>
            <label htmlFor="role">Role: </label>
            <input type="text" name="role" id="role"  onChange={handleChange}/>
            <button type="submit" onClick={() => genQR()} >save and generate qr</button>
            </form>
        </div>

        <p>{userTicket}</p>
        <img src={src}></img>
        </>
    );
};
