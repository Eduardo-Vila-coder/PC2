import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { postLogin } from "../api";
import FormField from "../components/FormField";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const navigate = useNavigate();
    const { saveToken } = useContext(AuthContext);

    async function login(email: string, password: string) {
        setErrorMsg("");
        setErrorEmail("");
        setErrorPass("");
        let huboError = false;

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
            const { token } = await postLogin({ email, password });
            saveToken(token);
            navigate('/dashboard');
        } catch {
            setErrorMsg("Hubo error al iniciar sesion");
        }
    }

    return <>
        <h1>Log in</h1>
        {errorMsg && <p>{errorMsg}</p>}
        <form onSubmit={(e) => { e.preventDefault(); login(email, password) }}>
            <FormField label="Email" actualValue={email} onTyping={setEmail} typeField="email" errorMessage={errorEmail}></FormField>
            <FormField label="Password" actualValue={password} onTyping={setPassword} typeField="password" errorMessage={errorPass}></FormField>
            <button type="submit">Submit</button>
            <Link to="/register">Registrate</Link>
        </form>
    </>
}