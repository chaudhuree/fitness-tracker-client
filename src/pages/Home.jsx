import Layout from "../layout/Layout"
import Spinner from "../components/Spinner"
import Banner from "../components/Banner"
import Features from "../components/Features"
import About from "../components/About"
import JoinUs from "../components/JoinUs"
import {useAuthStatus} from "../hooks/useAuthStatus"
import NewsLetter from "../components/NewsLetter"
import LatestForums from "../components/LatestForums"
import Teams from "../components/Teams"
import FeaturedClasses from "../components/FeaturedClasses"
import TestimonialSlider from "../components/TestimonialSlider"
import { axiosDefault } from "../hooks/useAxiosHook"

import { useQuery } from "@tanstack/react-query"
export default function Home() {
  
  const { checkingStatus} = useAuthStatus()
  if (checkingStatus) {
    return <Spinner />
  }


  // console.log('data', data);
  
  return (
    <Layout>
      <div className=" text-white">
        <Banner />
        <Features />
        <About />
        <JoinUs />
        <NewsLetter />
        <LatestForums />
        <Teams />
        <FeaturedClasses />
       
         <TestimonialSlider  />
      
       
      </div>
    </Layout>
  )
}
