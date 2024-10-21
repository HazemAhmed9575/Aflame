import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ActorSocial from "./../../compont/DetailsComponant/ActorComponants/ActorSocial";
import ActorInformation from "./../../compont/DetailsComponant/ActorComponants/ActorInformation";
import { gitActorDetails } from "../../redex/slices/detailsSlices/actorSlices/actorSlice";
import { gitSocalLinks } from "../../redex/slices/detailsSlices/actorSlices/socalLinksSlice";
import Erorr from "./../../compont/Erorr";
import Loding from "./../../compont/Loding";

const ActorPage = () => {
  const { actorId } = useParams();

  const dispatch = useDispatch();
  const { actorLoading, actorError } = useSelector(
    (state) => state.actorDetails
  );
  const { socialLinksLoding, socialLinkserror } = useSelector(
    (state) => state.socalLinksReducer
  );

  useEffect(() => {
    dispatch(gitActorDetails(actorId));
    dispatch(gitSocalLinks(actorId));
  }, [actorId, dispatch]);
  if (actorError || socialLinkserror) {
    return <Erorr />;
  }
  return (
    <div className=" flex flex-col md:flex-row justify-center ">
      {(socialLinksLoding || actorLoading) && <Loding />}
      <ActorSocial />
      <ActorInformation />
    </div>
  );
};

export default ActorPage;
