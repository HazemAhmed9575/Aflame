import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gitSearchData } from "../redex/slices/search";

function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [search, setSearch] = useState("");
  const [searchpath, setSearchpath] = useState("serachSeries");
  const [searchCategore, setSearchCategore] = useState("movie");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.search);
  console.log(data);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    dispatch(gitSearchData({ search, searchCategore }));
  }, [search, searchCategore]);
  // navList Home, Movies , Series , Cpntact Us
  const navList = (
    <div className="mb-4 mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={NavLink}
        to={"/"}
        variant="small"
        className="p-1 font-medium text-base  hover:text-gray-400"
      >
        Home
      </Typography>
      <Typography
        as={NavLink}
        to={"/move"}
        variant="small"
        className="p-1 font-medium text-base  hover:text-gray-400 "
      >
        Movies
      </Typography>
      <Typography
        as={NavLink}
        to={"/series"}
        variant="small"
        className="p-1 font-medium text-base  hover:text-gray-400 "
      >
        Series
      </Typography>
      <Typography
        as={NavLink}
        to={"/contacus"}
        variant="small"
        className="p-1 font-medium text-base  hover:text-gray-400 "
      >
        Contact Us
      </Typography>
      <div className="hidden items-center gap-x-2 lg:flex">
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`${searchpath=="serachSeries"?"Search with movie":"Search with serach"}`}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
        <button
          className={`py-1.5 px-3 text-base  border-2 rounded-md  text-[#198754] border-[#198754] hover:bg-[#198754] hover:text-white ${
            search == "" && "pointer-events-none"
          }`}
        >
          Search
        </button>
        <button
          onClick={() => {
            if (searchpath === "serachSeries") {
              setSearchpath("searchMovies");
              setSearchCategore("tv");
            } else {
              setSearchpath("serachSeries");
              setSearchCategore("movie");
            }
          }}
          className={`py-1.5 px-3 text-base   border-2 rounded-md ${
            searchpath == "serachSeries"
              ? "text-[#dc3545] border-[#dc3545] hover:text-white hover:bg-[#dc3545]"
              : "text-blue-700 border-2 rounded-md border-blue-700 hover:bg-blue-700 hover:text-white"
          }`}
        >
          {searchpath}
        </button>
        <button className="py-1.5 px-3 text-base font-bold text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black ">
          Login
        </button>
      </div>
    </div>
  );
  // end  navList Home, Movies , Series , Cpntact Us
  return (
    <Navbar className=" max-w-full bg-[#212529] rounded-none border-0 p-2 sticky top-0 z-100  ">
      <div className=" w-full flex flex-wrap items-center justify-around font-mono ">
        {/* navList and  Redux Movies */}
        <div className=" flex gap-x-5">
          <Link to="/" href="#" className="font-medium text-white text-xl">
            Redux Movies
          </Link>

          <div className="hidden text-gray-500 lg:block  ">{navList}</div>
        </div>
        {/* end navList and  Redux Movies */}
        {/* Icon resbon */}
        <IconButton
          variant="text"
          className="lg:hidden text-gray-500  border-2 border-gray-700  "
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </IconButton>
        {/* end Icon resbon */}
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
            <div className=" w-full gap-2 md:w-max sm:w-1/2">
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`${searchpath=="serachSeries"?"Search with movie":"Search with series"}`}
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <button
              className={`py-1.5 px-3 text-base  border-2 rounded-md  text-[#198754] border-[#198754] hover:bg-[#198754] hover:text-white ${
                search == "" && "pointer-events-none"
              }`}
            >
              Search
            </button>
            <button
              onClick={() => {
                if (searchpath === "serachSeries") {
                  setSearchpath("searchMovies");
                  setSearchCategore("tv");
                } else {
                  setSearchpath("serachSeries");
                  setSearchCategore("movie");
                }
              }}
              className={`py-1.5 px-3 text-base   border-2 rounded-md ${
                searchpath == "serachSeries"
                  ? "text-[#dc3545] border-[#dc3545] hover:text-white hover:bg-[#dc3545]"
                  : "text-blue-700 border-2 rounded-md border-blue-700 hover:bg-blue-700 hover:text-white"
              }`}
            >
              {searchpath}
            </button>
            <button className="py-1.5 px-3 text-base font-bold text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black ">
              Login
            </button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
export default NavBar;
