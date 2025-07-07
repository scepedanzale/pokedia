import error from '../imgs/error.gif';

export default function Error() {
  return (
    <div>
      <div>
        <img src={error} />
      </div>
      <p>Si è verificato un errore con il caricamento dei dati</p>
    </div>
  )
}
