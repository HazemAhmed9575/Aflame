import React, { useEffect } from "react";
import Move_SriesDetails from "../compont/DetailsComponant/Move_SriesDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Erorr from "../compont/Erorr";
import Loding from "../compont/Loding";

import RightDetails from "../compont/DetailsComponant/RightDetails";
import { getDetalis } from "../redex/slices/detailsSlices/detalis";
import { getVideo } from "../redex/slices/detailsSlices/video";
import { getCredits } from "../redex/slices/detailsSlices/cradits";
import { gitMoveKeywords } from "../redex/slices/detailsSlices/kayWordes/moveKayWordes";
import { gitSriesKeywords } from "../redex/slices/detailsSlices/kayWordes/sriesKaywordes";



function Details() {
  const { Subject, id } = useParams();
  const dispatch = useDispatch();
  //   useEffect get data
// ((((((((((((((((((((()))))))))))))))))))))
  useEffect(() => {
    dispatch(getDetalis({ Subject, id }));
    dispatch(getVideo({ Subject, id }));
    dispatch(getCredits({ Subject, id }));
    dispatch(gitMoveKeywords({id}));
    dispatch(gitSriesKeywords({id}))
  }, [dispatch, id]);
// (((((((((((((((((((((())))))))))))))))))))))
  return (
    <div>
      <Move_SriesDetails />
   


    <RightDetails/>

    </div>
  );
}

export default Details;
