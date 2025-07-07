import error from '../imgs/error.gif';

export default function Error() {
  return (
    <div className='error-page'>
        <img src={error} />
      <p>Si è verificato un errore con il caricamento dei dati</p>
    </div>
  )
}
