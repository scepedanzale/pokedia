import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { urlTypes } from '../../config/config'
import { typeImages } from '../../config/types';
import Breadcrumb from '../Breadcrumb';
import Wrapper from '../layout/Wrapper';
import { formatString } from '../../utils/string';

export default function ListTypes() {

  const [allTypes, setAllTypes] = useState([]);

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
    <Wrapper>
      <Breadcrumb />

      <section>
        <div id='list-types'>
          {allTypes && allTypes.map((type, index) => (
           (type.name !== 'unknown' && type.name !== 'stellar') &&
            <Link to={`/types/${type.name}`}
              key={index}
              state={{ urlType: type?.url, allTypes }}
              className={`text-${type.name}`}
            >
              <img src={typeImages[type.name]} />
              <p>{formatString(type.name)}</p>
            </Link>
          ))}
        </div>
      </section>
    </Wrapper>
  )
}
