import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gitSearchData } from "../redex/slices/search";

function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [search, setSearch] = useState("");
  const [searchpath, setSearchpath] = useState("serachSeries");
  const [searchCategore, setSearchCategore] = useState("movie");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.search);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    dispatch(gitSearchData({ search, searchCategore }));
  }, [search, searchCategore]);
  // navList Home, Movies , Series , Cpntact Us
  const navList = (
    <div className="mb-4 mt-2 w-full flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-5 ">
      <div className="flex flex-col justify-start lg:flex-row   lg:items-center gap-x-5">
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
      </div>
      <div className="hidden items-center gap-x-2 lg:flex">
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`${
              searchpath == "serachSeries"
                ? "Search with movie"
                : "Search with serach"
            }`}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
          {data.length > 0 && search !== "" && (
            <Card className="w-96 absolute top-full left-0  bg-[#212529] overflow-y-scroll max-h-80  ">
                 <List>
                  {data.map((data, index) => (
                    <ListItem
                      onClick={() => {
                        navigate(
                          searchCategore === "movie"
                            ? `/movie/${data.id}/${data.title}`
                            : `/tv/${data.id}/${data.name}`
                        );
                        setSearch(""); // Clear the search input
                      }}
                      className="border border-[#0DCAF0]"
                      key={index}
                    >
                      <ListItemPrefix>
                        <Avatar
                          variant="circular"
                          alt="candice"
                          src={
                            data.poster_path == null
                              ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                              : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                          }
                        />
                      </ListItemPrefix>
                      <div>
                        <Typography variant="h6" color="white">
                          {searchCategore === "movie"
                            ? data.original_title
                            : data.name}
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
            </Card>
          )}
        </div>
        <button
          onClick={() => {
            navigate(`/searchwith/${search}/in/${searchCategore}`),
              setSearch("");
          }}
          className={`py-1.5 px-3 text-base  border-2 rounded-md  text-[#198754] border-[#198754] hover:bg-[#198754] hover:text-white ${
            search == "" && "pointer-events-none"
          } ${data.length == 0 && "pointer-events-none"}   `}
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
      <div className=" w-full flex  items-center  font-mono ">
        {/* navList and  Redux Movies */}
        <div className=" flex items-center w-full  ">
          <Link
            to="/"
            href="#"
            className="font-medium  text-white lg:w-1/5 text-center text-xl"
          >
            Redux Movies
          </Link>

          <div className="hidden text-gray-500 lg:block w-full ">{navList}</div>
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
      <Collapse
        className={`${openNav ? "overflow-visible" : "overflow-hidden"}`}
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          <div className=" relative flex flex-col gap-x-2 sm:flex-row sm:items-center">
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`${
                searchpath == "serachSeries"
                  ? "Search with movie"
                  : "Search with series"
              }`}
              className="!border  !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />

            {data.length > 0 && search !== "" && (
              <Card className=" absolute  left-0 top-full bg-[#212529] overflow-y-scroll max-h-80  ">
                <List>
                  {data.map((data, index) => (
                    <ListItem
                      onClick={() => {
                        navigate(
                          searchCategore === "movie"
                            ? `/movie/${data.id}/${data.title}`
                            : `/tv/${data.id}/${data.name}`
                        );
                        setSearch(""); // Clear the search input
                      }}
                      className="border border-[#0DCAF0]"
                      key={index}
                    >
                      <ListItemPrefix>
                        <Avatar
                          variant="circular"
                          alt="candice"
                          src={
                            data.poster_path == null
                              ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                              : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                          }
                        />
                      </ListItemPrefix>
                      <div>
                        <Typography variant="h6" color="white">
                          {searchCategore === "movie"
                            ? data.original_title
                            : data.name}
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Card>
            )}

            <button
              onClick={() => {
                navigate(`/searchwith/${search}/in/${searchCategore}`);
                setSearch("");
              }}
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
