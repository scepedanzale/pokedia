import { useEffect, useMemo, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

export default function Pagination({ recordSet, setVisibleList, limit, queryParam }) {
    const param = queryParam || "page";

    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get(param)) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const NAV_LIMIT_DEFAULT = 5;
    const pageLimit = limit || 20; // quanti dati
    const totalPages = Math.ceil(recordSet.length / pageLimit);


    const pageOffset = (currentPage - 1) * pageLimit; // dove inizia
    const end = pageOffset + pageLimit; // dove finisce

    const pageRecords = useMemo(() => recordSet.slice(pageOffset, end), [recordSet, pageOffset, end]);  // calcolo records da mostrare

    useEffect(() => setVisibleList(pageRecords), [pageRecords])  // aggiorno padre

    // Aggiorno la query string nell'URL quando cambia pagina
    useEffect(() => {
        searchParams.set(param, currentPage);
        setSearchParams(searchParams);
    }, [currentPage, queryParam, searchParams, setSearchParams]);

    const range = useMemo(() => {
        const max = Math.min(NAV_LIMIT_DEFAULT, totalPages);    // 
        let s = Math.max(1, currentPage - Math.floor(max / 2)); // inizio: pagina minima 1
        let e = s + max - 1;    // fine: inizio + max n 
        if (e > totalPages) { e = totalPages; s = Math.max(1, e - max + 1); }
        return Array.from({ length: e - s + 1 }, (_, i) => s + i);
    }, [currentPage, totalPages]);

    const go = (num) => num >= 1 && num <= totalPages && setCurrentPage(num);

    return (
        <div className='pagination-container'>
            {/* Freccia primo elemento */}
            <button
                onClick={() => go(1)}
                disabled={currentPage === 1}
                className='arrow-pagination'
            >
                <MdKeyboardDoubleArrowLeft />
            </button>

            {/* Freccia indietro */}
            <button
                onClick={() => go(currentPage - 1)}
                disabled={currentPage === 1}
                className='arrow-pagination'
            >
                <MdKeyboardArrowLeft />

            </button>

            {range.map((numPage, i) => (
                <button key={i} onClick={() => go(numPage)} className={numPage === currentPage && 'active'}>
                    {numPage}
                </button>
            ))}

            {/* Freccia avanti */}
            <button
                onClick={() => go(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='arrow-pagination'
            >
                <MdKeyboardArrowRight />
            </button>

            {/* Freccia ultimo elemento */}
            <button
                onClick={() => go(totalPages)}
                disabled={currentPage === totalPages}
                className='arrow-pagination'
            >
                <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    )
}
