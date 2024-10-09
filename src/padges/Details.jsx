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
import PartofCollection from "../compont/DetailsComponant/PartofCollection";
import Recommendations from "../compont/DetailsComponant/Recommendations";
import { getExternalIds } from "../redex/slices/detailsSlices/SocialLinks";

function Details() {
  const { Subject, id } = useParams();
  const { moveDetails } = useSelector((state) => state.details);

  const dispatch = useDispatch();
  // belongs_to_collection.id

  //   useEffect get data
  // ((((((((((((((((((((()))))))))))))))))))))
  useEffect(() => {
    dispatch(getDetalis({ Subject, id }));
    dispatch(getVideo({ Subject, id }));
    dispatch(getCredits({ Subject, id }));
    dispatch(gitMoveKeywords({ id }));
    dispatch(gitSriesKeywords({ id }));
    dispatch(getExternalIds({ id }));

  }, [dispatch, id]);
  // (((((((((((((((((((((())))))))))))))))))))))

  return (
    <div>
      <Move_SriesDetails />

      <div className="lg:relative flex flex-col gap-3 py-2 lg:md:px-12">
        {Subject == "movie" && moveDetails.belongs_to_collection && (
          <PartofCollection />
        )}
        <Recommendations />
        <RightDetails />
      </div>
    </div>
  );
}

export default Details;
