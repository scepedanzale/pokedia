import { useEffect, useState } from 'react'
import { formatString } from '../functions/functions';
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';


export default function Breadcrumb({ path }) {
    const [slugs, setSlugs] = useState([]);

    useEffect(() => {
        if (path) {
            const result = path.split('/').slice(1);
            setSlugs(result);
        }
    }, [path])

    return (
        <div className='breadcrumb'>
            {slugs?.map((slug, index) => (
                <>
                    <Link to={`/${slug}`} className={`slug ${index === slugs.length - 1 && 'active'}`}>{formatString(slug)}</Link>
                    {index !== slugs.length - 1 && <MdArrowForwardIos />}
                </>
            ))}
        </div>
    )
}
