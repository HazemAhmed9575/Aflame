import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loding from "../compont/Loding";
import { getSeries } from '../redex/slices/seriesSlice';
import Erorr from '../compont/Erorr';
import ReactStars from 'react-stars';

function Series() {
  const { loding,seriestv,error,padges } = useSelector(
    (state) => state.series
  );
const dispatch =useDispatch()



useEffect(()=>{
dispatch(getSeries())
},[padges])

console.log(seriestv);

if (error) {
  return <Erorr/>
}
  return (
    <div className="flex p-10 flex-wrap justify-center gap-6">
    {loding&& <Loding/>}
    {seriestv?.map((data) => (
      <div key={data.id} className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 text-white">
        <img className="w-full" src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} alt={data.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">TITLE: {data.name}</div>
          <p className="text-gray-400 text-base">OVERVIEW: {data.overview.slice(0,10)}  </p>
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
        <div className="px-6 py-4">
          <button className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            DETAILS
          </button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Series