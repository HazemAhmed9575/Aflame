import React, { useEffect } from "react";
import Move_SriesDetails from "../compont/DetailsComponant/Move_SriesDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Erorr from "../compont/Erorr";
import Loding from "../compont/Loding";
import {
  getCredits,
  getDetalis,
  getVideo,
} from "../redex/slices/detailsSlices/detailsHome";
import ExtraDetails from "../compont/DetailsComponant/extraDetails";



function Details() {
  const { Subject, id } = useParams();
  const { error, loading } = useSelector((state) => state.DetailsHome);
  const dispatch = useDispatch();
  //   useEffect get data
// ((((((((((((((((((((()))))))))))))))))))))
  useEffect(() => {
    dispatch(getDetalis({ Subject, id }));
    dispatch(getVideo({ Subject, id }));
    dispatch(getCredits({ Subject, id }));
  }, [dispatch, id]);
// (((((((((((((((((((((())))))))))))))))))))))

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loding />
      </div>
    );
  }
  
  if (error) {
    return <Erorr />;
  }
  return (
    <div>
      <Move_SriesDetails />
   


    <ExtraDetails/>

    </div>
  );
}

export default Details;
