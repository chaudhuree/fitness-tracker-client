import Layout from "../layout/Layout"
import Banner from "../components/Banner"
import Features from "../components/Features"
import {useAuthStatus} from "../hooks/useAuthStatus"
import Spinner from "../components/Spinner"

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
      </div>
    </Layout>
  )
}
