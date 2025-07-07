import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { urlTypes } from '../../config/config'
import { typeImages } from '../../config/types';
import { Capitalize } from '../../functions/functions';

export default function ListTypes() {

  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    axios(urlTypes)
      .then(response => {
        setAllTypes(response.data.results);
        console.log(response.data)
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <section id='list-types'>
      {allTypes && allTypes.map((type, index) => (
        <Link to={`/types/${type.name}`}
          key={index}
          state={{urlType:type?.url, allTypes}}
          className={`text-${type.name}`}
        >
          <img src={typeImages[type.name]} />
          <p>{Capitalize(type.name)}</p>
        </Link>
      ))}
    </section>
  )
}
