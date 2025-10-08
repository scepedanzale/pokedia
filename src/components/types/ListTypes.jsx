import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { urlTypes } from '../../config/config'
import Breadcrumb from '../Breadcrumb';
import Wrapper from '../layout/Wrapper';
import { formatString } from '../../utils/string';
import { pokemonTypes } from '../../data/pokemonTypes';

export default function ListTypes() {

  return (
    <Wrapper>
      <Breadcrumb />
      <section>
        <div id='list-types'>
          {pokemonTypes.map((type, index) => (
              <Link to={`/types/${type.name}`}
                key={index}
                className={`text-${type.name}`}
              >
                <img src={type.icon} />
                <p>{formatString(type.name)}</p>
              </Link>
            ))
          }
        </div>
      </section>
    </Wrapper>
  )
}
