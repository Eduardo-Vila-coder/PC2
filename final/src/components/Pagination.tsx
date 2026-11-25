interface PaginationProps {
    actualPage: number,
    totalPages: number,
    goNext:() => void,
    goPrev:() => void,
}

export default function Pagination({actualPage, totalPages, goNext, goPrev} : PaginationProps) {
    return <div>
        <button onClick={() => goPrev()} disabled={actualPage==1}>Anterior</button>
        <p>Pagina {actualPage} de {totalPages}</p>
        <button onClick={() => goNext()} disabled={actualPage==totalPages}>Siguiente</button>
    </div>
}