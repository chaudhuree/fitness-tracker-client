import Layout from "../layout/Layout"
import Spinner from "../components/Spinner"
import Banner from "../components/Banner"
import Features from "../components/Features"
import About from "../components/About"
import JoinUs from "../components/JoinUs"
import {useAuthStatus} from "../hooks/useAuthStatus"
import NewsLetter from "../components/NewsLetter"

export default function Home() {
  const { checkingStatus} = useAuthStatus()
  if (checkingStatus) {
    return <Spinner />
  }
  return (
    <Layout>
      <div className=" text-white">
        <Banner />
        <Features />
        <About />
        <JoinUs />
        <NewsLetter />
      </div>
    </Layout>
  )
}
