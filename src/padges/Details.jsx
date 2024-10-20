import React, { useEffect } from "react";
import Move_SriesDetails from "../compont/DetailsComponant/Move_SriesDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RightDetails from "../compont/DetailsComponant/RightDetails";
import { getVideo } from "../redex/slices/detailsSlices/video";
import { getCredits } from "../redex/slices/detailsSlices/cradits";
import PartofCollection from "../compont/DetailsComponant/PartofCollection";
import Recommendations from "../compont/DetailsComponant/Recommendations";
import { getExternalIds } from "../redex/slices/detailsSlices/SocialLinks";
import Cast from "../compont/DetailsComponant/Cast";
import MediaComponant from "../compont/DetailsComponant/MediaComponant";
import { getMedia } from "../redex/slices/detailsSlices/media";
import Social from "../compont/DetailsComponant/Social";
import { gitSocial } from "../redex/slices/detailsSlices/Social";
import LastSeasonComponant from "../compont/DetailsComponant/LastSeasonComponant";
import { gitKeywords } from "../redex/slices/detailsSlices/kayWords";
import { getDetalis } from "./../redex/slices/detailsSlices/detalis";

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
    dispatch(getExternalIds({ Subject, id }));
    dispatch(gitSocial({ Subject, id }));
    dispatch(gitKeywords({ Subject, id }));
    dispatch(getMedia({ Subject, id }));
  }, [dispatch, Subject, id]);
  // (((((((((((((((((((((())))))))))))))))))))))

  return (
    <div>
      <Move_SriesDetails />

      <div className="lg:relative flex flex-col gap-y-12 py-2 lg:md:px-12">
        <Cast />
        {Subject == "tv" && <LastSeasonComponant />}

        <Social />
        <MediaComponant />
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
