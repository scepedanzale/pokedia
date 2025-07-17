import { useEffect, useState } from 'react'
import { formatString } from '../functions/functions';
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';


export default function Breadcrumb() {
    const [slugs, setSlugs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location) {
            const result = location.pathname.split('/').slice(1);
            setSlugs(result);
        }
    }, [location])

    return (
        <div className='breadcrumb'>
            {slugs?.map((slug, index) => {
                const href = location.pathname.slice(0, location.pathname.indexOf(slug) + slug.length);
                return (
                    <>
                        <Link to={`${href}`} className={`slug ${index === slugs.length - 1 && 'active'}`}>{formatString(slug)}</Link>
                        {index !== slugs.length - 1 && <MdArrowForwardIos />}
                    </>
                )
            })}
        </div>
    )
}
