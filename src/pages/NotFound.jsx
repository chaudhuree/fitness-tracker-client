import {useEffect} from 'react'
import notFound from '/notfound.svg'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found '
  }, [])

  return (
    <div className='h-dvh  w-full grid place-items-center mt-5'>
      <img src={notFound} alt="not found" className='object-cover w-1/2 h-3/4'/>
      <Link to="/" className='text-[40px] max-md:text-[30px] font-semibold font-poppins text-sky-600'>Go To Home</Link>
    </div>
  )
}
