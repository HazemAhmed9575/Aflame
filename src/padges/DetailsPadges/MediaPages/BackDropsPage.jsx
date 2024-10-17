import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMedia } from '../../../redex/slices/detailsSlices/media'

const BackDropsPage = () => {
  const {backdropsMidiaArranged}=useSelector((state)=>state.media)
  const {Subject,id}=useParams()
  const dispatch =useDispatch()
    console.log(backdropsMidiaArranged);
    useEffect(()=>{
      dispatch(getMedia({Subject,id}))
    },[id])
  return (
    <div>BackDropsPage</div>
  )
}

export default BackDropsPage