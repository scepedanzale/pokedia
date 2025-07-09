import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
import { urlTypes } from '../../config/config'
import { typeImages } from '../../config/types';
import { Capitalize } from '../../functions/functions';
import Breadcrumb from '../Breadcrumb';

export default function ListTypes() {

  const [allTypes, setAllTypes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios(urlTypes)
      .then(response => {
        setAllTypes(response.data.results);
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <section>
      <Breadcrumb path={location.pathname} />
      <div id='list-types'>
        {allTypes && allTypes.map((type, index) => (
          <Link to={`/types/${type.name}`}
            key={index}
            state={{ urlType: type?.url, allTypes }}
            className={`text-${type.name}`}
          >
            <img src={typeImages[type.name]} />
            <p>{Capitalize(type.name)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
