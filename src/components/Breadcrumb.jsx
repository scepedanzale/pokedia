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
            {slugs?.map((slug, index) => {
                const href = path.slice(0, path.indexOf(slug) + slug.length);
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
