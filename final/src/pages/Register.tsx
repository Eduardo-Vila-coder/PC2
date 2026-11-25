import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "../api";
import FormField from "../components/FormField";

export default function Register () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [errorName, setErrorName] = useState("");
    const navigate = useNavigate();

    async function register(email:string, password:string, name:string) {
        setErrorEmail("");
        setErrorName("");
        setErrorPass("");
        setErrorMsg("");
        let huboError = false;

        if (name.trim() == "" || name.length > 100) {
            setErrorName("Inserte un nombre valido");
            huboError = true;
        }
        if (!email.includes("@")) {
            setErrorEmail("Inserte un correo valido");
            huboError = true;
        }
        if (password.length < 8 || password.length > 72) {
            setErrorPass("Inserte una contraseña valida");
            huboError = true;
        }
        if (huboError) {
            return
        }

        try {
            await postRegister({email, password, name});
            navigate('/login');
        } catch {
            setErrorMsg("Hubo error")
        }
        
    }

    return <>
        <h1>Register</h1>
        {errorMsg && <p>{errorMsg}</p>}
        <form onSubmit={(e) => {e.preventDefault(); register(email, password, name)}}>
            <FormField label="Email" actualValue={email} onTyping={setEmail} typeField="email" errorMessage={errorEmail}></FormField>
            <FormField label="Password" actualValue={password} onTyping={setPassword} typeField="password" errorMessage={errorPass}></FormField>
            <FormField label="Name" actualValue={name} onTyping={setName} typeField="text" errorMessage={errorName}></FormField>
            <button type="submit">Submit</button>
            <Link to="/login">Inicia sesion</Link>
        </form>
    </>
}