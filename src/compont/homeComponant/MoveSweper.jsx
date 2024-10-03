import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { swiperMoveData } from "../../redex/slices/homeSlices/movePhotoSlice"; // Ensure this path is correct
import "../../index.css"; // Include your custom CSS file
import Loding from "../Loding";
import Erorr from "../Erorr";
import { useNavigate } from "react-router-dom";

const MoveSweper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Select the photos and status from Redux state
  const { photosSweper, error, loding } = useSelector(
    (state) => state.movePhotoReducer
  ); // Correct state reference

  // Dispatch swiperMoveData when the component is mounted
  useEffect(() => {
    dispatch(swiperMoveData());
  }, [dispatch]);
  if (error == true) {
    return <Erorr />;
  }
  return (
    <div className="swiper-container flex justify-center items-center">
      {loding && <Loding />}
      <Swiper
        loop={true} // Enable loop
        spaceBetween={30} // Add space between slides
        pagination={{ clickable: true }}
        navigation={true} // Add navigation arrows
        modules={[Navigation]} // Include only Navigation module
        className="mySwiper"
        breakpoints={{
          // Define breakpoints for responsiveness
          320: {
            slidesPerView: 1, // Show 1 slide for small screens
            spaceBetween: 10, // Space between slides
          },
          640: {
            slidesPerView: 2, // Show 2 slides for medium screens
            spaceBetween: 20, // Space between slides
          },
          1024: {
            slidesPerView: 3, // Show 3 slides for larger screens
            spaceBetween: 30, // Space between slides
          },
          1280: {
            slidesPerView: 4, // Show 4 slides for very large screens
            spaceBetween: 30, // Space between slides
          },
        }}>
        {photosSweper.map((photo) => (
          <SwiperSlide key={photo.id}>
            <div
              className="slide-content"
              onClick={() => navigate(`/movie/${photo.id}/${photo.title}`)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${photo.poster_path}`}
                alt={photo.title}
                className="movie-poster"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoveSweper;
