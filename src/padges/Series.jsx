import React from 'react'
import Loding from '../compont/Loding'

function Series() {
  const { loding } = useSelector(
    (state) => state.movePhotoReducer
  );




  
  return (
    <div>
      {loding && <Loding />}



    </div>
  )
}

export default Series