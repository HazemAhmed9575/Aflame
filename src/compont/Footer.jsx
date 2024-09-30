import { Typography } from "@material-tailwind/react";
 
 function Footer() {
  return (
    <footer className=" w-full  gap-y-1  py-6 text-center md:justify-between flex flex-col items-center ">
      <Typography color="blue-gray" className="font-normal text-white">
        &copy; 2024 <span className="text-2xl text-blue-500 font-medium">React Movies</span>, All Rights Reserved
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2  gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal text-red-700 transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal text-red-700 transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Terms of Use
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal text-red-700 transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Privacy
          </Typography>
        </li>
    
      </ul>
    </footer>
  );
}
export default Footer