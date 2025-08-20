import React from "react";

import Footer from "../component/Footer";

const About = () => {
  return (
    <>
    <div className="font-sans">

      {/* Header Section */}
      <header
        className="relative h-[450px] bg-green-600 text-white flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661900547591-80ee79e20d1c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold drop-shadow-lg">Empowering Growth from Soil to Success</h1>
          <p className="mt-4 text-lg font-medium max-w-3xl drop-shadow-md">
          Bridging farmers with technology, expertise, and opportunity for a thriving agricultural future.
          </p>
        </div>
      </header>

      {/* Mission and Vision Section */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-800 mb-8 text-left">
            Our mission & vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="p-8 bg-white shadow-lg border-l-4 border-green-600 text-center rounded-lg">
              <div className="text-5xl mb-4">🚩</div>
              <h3 className="text-xl font-bold text-green-700">MISSION</h3>
              <p className="text-gray-700 font-medium mt-2">
                Transforming the future of farmers by leveraging science, data, and technology.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 bg-white shadow-lg border-l-4 border-green-600 text-center rounded-lg">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-700">VISION</h3>
              <p className="text-gray-700 font-medium mt-2">
                To be an iconic global digital agriculture ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-100 py-12">
        <h2 className="text-3xl text-center font-semibold mb-8 text-green-700">Core values that AgriConnect lives by</h2>
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            "Think Big",
            "Customer First",
            "Act with Integrity",
            "Team on a Mission",
            "Excellence in Execution",
            "Accountability",
          ].map((value) => (
            <div
              key={value}
              className="text-center p-4 border-l-4 border-green-600 bg-white rounded-lg shadow hover:shadow-lg"
            >
              <h4 className="font-bold text-green-700">{value}</h4>
              <p className="mt-2 text-gray-700">Detailed description of {value}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Business Verticals Section */}
      <section className="py-16">
        <h2 className="text-3xl text-center font-semibold mb-8 text-green-700">AgriConnect's business verticals</h2>
        <div className="text-center">
          <p className="mb-4">Offering farmers the right information, agri-products, and market support.</p>
          <div className="flex flex-col md:flex-row justify-around gap-6 px-6 mt-6">
            <div className="md:w-1/3 p-4 border bg-white rounded shadow text-center">
              <h4 className="font-bold text-green-700">Learn</h4>
              <p className="mt-2 text-gray-700">Professional training and services.</p>
            </div>
            <div className="md:w-1/3 p-4 border bg-white rounded shadow text-center">
              <h4 className="font-bold text-green-700">Procure</h4>
              <p className="mt-2 text-gray-700">A wide range of top products.</p>
            </div>
            <div className="md:w-1/3 p-4 border bg-white rounded shadow text-center">
              <h4 className="font-bold text-green-700">Harvest</h4>
              <p className="mt-2 text-gray-700">Ensure quality with expert assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Strategies Section */}
      <section className="py-16 bg-green-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-green-700 text-left">
            Corporate strategies
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 text-left">
            <li>Diverse Growth Models</li>
            <li>Ever-Evolving Business Verticals</li>
            <li>Evaluate and Handle each vertical to enhance profitability</li>
            <li>Prioritise industry standards throughout the operation</li>
            <li>Establish strong leadership to strengthen roots</li>
            <li>Continuous optimization of strategies, events, SOPs, and processes</li>
          </ul>
        </div>
      </section>

      
    
    </div>
    <div>
      <Footer/>
    </div>

    </>
  );
};

export default About; 