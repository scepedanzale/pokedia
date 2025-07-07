import notfoundpage from '../imgs/notfoundpage.png'

export default function NotFoundPage() {
  return (
    <div className='not-found-page'>
        <img src={notfoundpage}/>
        <div>
            <h1>404 ERROR</h1>
            <p>Page Not Found</p>
        </div>
    </div>
  )
}
