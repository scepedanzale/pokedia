import notfoundpage from '../imgs/notfoundpage.jpeg'

export default function NotFoundPage() {
  return (
    <div>
        <img src={notfoundpage}/>
        <div>
            <p>404 ERROR</p>
            <p>Page Not Found</p>
        </div>
    </div>
  )
}
