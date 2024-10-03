import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { decremintPage, incremintPage, toMax, toMini } from "../redex/slices/moviesSlice";

const Pagination = () => {
  const { pageNumber } = useSelector((state) => state.moves);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between gap-4 sm:gap-8 flex-wrap">
      {/* Go to first page */}
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => dispatch(toMini())}
        disabled={pageNumber === 1}
        className="hidden sm:flex" // Hidden on small screens
        color="white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>
      </IconButton>

      {/* Go to previous page */}
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => dispatch(decremintPage())}
        disabled={pageNumber === 1}
        color="white"
        className="flex"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>

      {/* Page number display */}
      <Typography color="gray" className="font-normal text-sm sm:text-base">
        Page <strong className="text-white">{pageNumber}</strong> of{" "}
        <strong className="text-white">500</strong>
      </Typography>

      {/* Go to next page */}
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => dispatch(incremintPage())}
        disabled={pageNumber === 500}
        color="white"
        className="flex"
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>

      {/* Go to last page */}
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => dispatch(toMax())}
        disabled={pageNumber === 500}
        className="hidden sm:flex" // Hidden on small screens
        color="white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      </IconButton>
    </div>
  );
};

export default Pagination;
