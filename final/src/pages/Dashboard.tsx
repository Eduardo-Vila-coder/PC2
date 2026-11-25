import { useContext, useEffect, useState } from "react"
import type { MentorPage } from "../types"
import Pagination from "../components/Pagination";
import { AuthContext } from "../AuthContext";
import { getMentorsPage } from "../api";

export default function Dashboard() {
    const [mentorPage, setMentorPage] = useState<MentorPage>();
    const [actualPage, setActualPage] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const { token } = useContext(AuthContext);

    useEffect(() => {
        async function obtainPage() {
            try {
                const mentorPageAsy = await getMentorsPage(token, actualPage, 5);
                setMentorPage(mentorPageAsy);
            } catch {
                setErrorMsg("Hubo error al obtener la pagina de mentores");
            }
        }

        setErrorMsg("");
        obtainPage();
    }, [actualPage, token])

    return <>
        <h1>DashBoard</h1>
        {errorMsg && <p>{errorMsg}</p>}
        {mentorPage && mentorPage.items.map((m) => <div>
            <p>Nombre: {m.name}</p>
            <p>Especialidad: {m.specialty}</p>
            <p>Modalidad: {m.modality}</p>
            <p>Reservas disponibles: {m.availableSlots}</p>
            <p>Descripcion: {m.description}</p>
            <br />
        </div>)}

        {mentorPage && <Pagination actualPage={mentorPage.page} totalPages={mentorPage.totalPages}
            goNext={() => setActualPage(n => n + 1)} goPrev={() => setActualPage(n => n - 1)}></Pagination>}
    </>
}