import Layout from "../layout/Layout"
import Banner from "../components/Banner"

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen text-white">
        <Banner />
      </div>
    </Layout>
  )
}
