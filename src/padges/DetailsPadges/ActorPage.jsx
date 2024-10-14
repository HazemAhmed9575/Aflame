import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ActorSocial from './../../compont/DetailsComponant/ActorComponants/ActorSocial';
import ActorInformation from './../../compont/DetailsComponant/ActorComponants/ActorInformation';
import { gitActorDetails } from "../../redex/slices/detailsSlices/actorSlices/actorSlice";
import { gitSocalLinks } from "../../redex/slices/detailsSlices/actorSlices/socalLinksSlice";
import { gitActorCredits } from "../../redex/slices/detailsSlices/actorSlices/actorCredits";

const ActorPage = () => {
  const { actorId } = useParams();

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(gitActorDetails(actorId));
    dispatch(gitSocalLinks(actorId))
    dispatch(gitActorCredits(actorId))
  }, [actorId, dispatch]);

  return <div className=" flex flex-col md:flex-row justify-center ">
    <ActorSocial />
    <ActorInformation />
  </div>;
};

export default ActorPage;
