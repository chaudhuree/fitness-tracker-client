import Navbar from "../components/Navbar"
export default function ({children}) {
  return (
    <>
    <Navbar />
    <div className='container px-5 md:px-10 mx-auto'>
      {children}
    </div>
    </>
  )
}
