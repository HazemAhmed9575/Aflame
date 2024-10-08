import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loding from "../compont/Loding";
import { getSeries } from '../redex/slices/seriesSlice';
import Erorr from '../compont/Erorr';
import ReactStars from 'react-stars';
import { setPagin } from '../redex/slices/moviesSlice';
import Pagination from '../compont/Pagination';
import { useNavigate } from 'react-router-dom';

function Series() {
  const { loding,seriestv,error,padges } = useSelector(
    (state) => state.series
  );
const dispatch =useDispatch()
const navigate = useNavigate()


useEffect(()=>{
dispatch(getSeries())
dispatch(setPagin(false))
},[dispatch,padges])


  if (loding) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loding/>
      </div>
    );
  }

if (error) {
  return <Erorr/>
}
  return (
    <div className="flex flex-col justify-center items-center w-full px-4">

<h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold p-2">SERIES</h1>
  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold p-2">
  <span className="block sm:inline">PAGE NUMBER</span>
  <span className="block text-[#0DCAF0] text-info text-2xl sm:text-3xl md:text-4xl font-bold p-2 sm:inline">
    {padges}
  </span>
  <span className="block sm:inline">FROM</span>
  <span className="block text-[#0DCAF0] text-info text-2xl sm:text-3xl md:text-4xl font-bold p-2 sm:inline">
    500
  </span>
</h1>

    
    <div  className="flex flex-wrap justify-center gap-6 p-6 w-full">

    {seriestv?.map((data) => (
      <div key={data.id} className="flex flex-col max-w-sm sm:max-w-xs rounded overflow-hidden shadow-lg bg-[#212529] text-white w-full sm:w-auto">
        <img className="w-full" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name} />
        <div className="px-6 py-4">
          <p className="font-bold text-xl mb-2">TITLE: {data.name}</p>
          <p className="text-gray-400 text-base">OVERVIEW: {data.overview.slice(0,10)}...  </p>
          <div className="flex items-center justify-between">
            <p>RATE :{data.vote_average}</p>
            <ReactStars
              count={5}
              value={data.vote_average / 2} // Assuming the rating is out of 10
              size={24}
              color2={"#ffd700"} // Star color
              edit={false} // Disable editing, display only
              />
          </div>
        </div>
        <div className="px-6 py-4 text-center">
          <button onClick={()=>navigate(`/tv/${data.id}/${data.name}`)} className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            DETAILS
          </button>
        </div>
      </div>
    ))}
    </div>

    <Pagination />
  </div>
  )
}

export default Series