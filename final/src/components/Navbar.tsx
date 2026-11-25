import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const {saveToken}= useContext(AuthContext);
    const navigate = useNavigate();

    return <nav>
        <Link to="\register">Registrate</Link>
        <Link to="\login">Log in</Link>
        <button onClick={() => {saveToken(""); navigate("/login")}}>Log out</button>
    </nav>
}