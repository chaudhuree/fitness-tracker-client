import Layout from "../layout/Layout"
import Banner from "../components/Banner"
import Features from "../components/Features"

export default function Home() {
  return (
    <Layout>
      <div className=" text-white">
        <Banner />
        <Features />
      </div>
    </Layout>
  )
}
