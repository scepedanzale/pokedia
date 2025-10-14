import { useEffect, useMemo, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

export default function Pagination({ pageLimit = 20, totalCount, queryParam = "page", onPageChange }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get(queryParam)) || 1;    // pag da url
    const [currentPage, setCurrentPage] = useState(initialPage);

    const NAV_LIMIT_DEFAULT = 5;    // numeri di pag mostrati
    const totalPages = Math.ceil(totalCount / pageLimit);   // num pag tot

    useEffect(()=>{
        console.log('QUERY', queryParam)
        console.log('SEARCHPARAMS', searchParams)
        console.log('INITIAL PAGE', initialPage)
        console.log('TOTALPAG', totalPages)
        console.log('PAGELIMIT', pageLimit)
        console.log('TOTALCO', totalCount)
    }, [searchParams, initialPage, queryParam, totalCount])

    // Aggiorno la query string nell'URL quando cambia pagina
    useEffect(() => {
        const currentParam = parseInt(searchParams.get(queryParam)) || 1;
        if (currentParam !== currentPage) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(queryParam, currentPage);
            setSearchParams(newParams, { replace: true }); 
            onPageChange(currentPage)
            console.log('OKKK')
        }
    }, [currentPage]);


    const range = useMemo(() => {
        const max = Math.min(NAV_LIMIT_DEFAULT, totalPages);
        let s = Math.max(1, currentPage - Math.floor(max / 2)); // inizio: pagina minima 1
        let e = s + max - 1;    // fine: inizio + max n 
        if (e > totalPages) { e = totalPages; s = Math.max(1, e - max + 1); }
        return Array.from({ length: e - s + 1 }, (_, i) => s + i);
    }, [currentPage, totalPages]);

    const go = (num) => {
        if (num >= 1 && num <= totalPages) setCurrentPage(num);
    }

    if (totalPages <= 1) return null

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
