import Layout from "../layout/Layout";

export default function ClassItem() {
  return (
    <Layout>
      <section className="text-white font-poppins py-5 lg:py-10 mx-auto relative">
        <span className="bg__blur"></span>
        <span className="bg__blur bottom__blur__two"></span>
        <div className=" px-2 lg:px-6 py-5 ">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            Our <span className="text-amber-500">Class</span>
          </h1>
        </div>
      </section>
    </Layout>
  );
}
