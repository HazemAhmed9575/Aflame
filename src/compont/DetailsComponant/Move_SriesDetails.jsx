import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loding from '../Loding'
import { getDetalis } from '../../redex/slices/detailsSlices/move_sriesDetails'

function Move_SriesDetails() {
  const {Subject,id}= useParams()
  const { error,loading, detais} = useSelector(
    (state) => state.DetailsMoveSriesSlices
  )
  const dispatch = useDispatch();



console.log(detais);

useEffect(()=>{

dispatch(getDetalis({Subject,id}))


},[id])

let background = {
 
  backgroundImage:`url("https://image.tmdb.org/t/p/w500${detais.backdrop_path}")`
}

  if (error) {
    return <Erorr/>
  }
  return (
    <div  style={background} className="w-full h-screen bg-cover bg-center">
{loading&& <Loding/>}





      
    </div>
  )
}

export default Move_SriesDetails