import React from "react";
import MoveSweper from "../compont/homeComponant/MoveSweper";
import SriesSweper from "../compont/homeComponant/SriesSweper";
import TopMoves from "../compont/homeComponant/TopMoves";
import TopSeries from "../compont/homeComponant/TopSeries";


function Home() {
  return (
    <div >
      <h1 className=" text-[#0DCAF0] text-center text-3xl font-bold p-4 mt-4">
        Home
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:justify-around md:items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#FFFFFF] text-2xl font-medium mb-4">SORT BY</h1>
          <div className="flex flex-col sm:flex-row justify-evenly items-center gap-6">
            <button className="py-2 px-4 text-base text-[#FFFFFF] border-2 rounded-md border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black">
              Title
            </button>
            <button className="py-2 px-4 text-base text-[#FFFFFF] border-2 rounded-md border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black">
              Popularity
            </button>
            <button className="py-2 px-4 text-base text-[#FFFFFF] border-2 rounded-md border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black">
              Date
            </button>
            <button className="py-2 px-4 text-base text-[#FFFFFF] border-2 rounded-md border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black">
              Rating
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#FFFFFF] text-2xl font-medium mb-4">
            SORT ORDER
          </h1>
          <div className="flex justify-evenly items-center gap-6 flex-col sm:flex-row">
            <button className="py-2 px-4 text-base text-[#FFFFFF] border-2 rounded-md border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black">
              Descingin
            </button>
            <button className="py-2 px-4 text-base text-[#FFFFFF] border-2 rounded-md border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black">
              Ascending
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-8">
        <h1 className="text-[#0DCAF0] text-3xl font-bold p-4 mt-4" >MOVIES</h1>
         <MoveSweper/>
      </div>
      <div className="flex flex-col mx-8">
        <h1 className="text-[#0DCAF0] text-3xl font-bold p-4 mt-4" >SERIES</h1>
         <SriesSweper/>
      </div>
      <div className="flex flex-col mx-8">
        <h1 className="text-[#0DCAF0] text-3xl font-bold p-4 mt-4" >TOP MOVIES</h1>
         <TopMoves/>
      </div>
      <div className="flex flex-col mx-8">
        <h1 className="text-[#0DCAF0] text-3xl font-bold p-4 mt-4" >TOP SERIES</h1>
         <TopSeries/>
      </div>

     
    </div>
  );
}

export default Home;






