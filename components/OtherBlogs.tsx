import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import shimmerUrl from "../utils/shimmerUrl";

const OtherBlogs = () => {
  return (
    <div className="pb-10 font-bold border-b-2 border-gray-800 transition-transform cursor-pointer hover:scale-hover">
      <div className="flex gap-8 items-stretch w-full">
        <div className="relative w-4/12">
          <Image
            src="/blog2.png"
            alt="blog image"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={shimmerUrl}
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <span className="text-gray-600">October 18, 2022</span>
          <span className="text-xl md:text-2xl">
            This is the title of your Blog Cover Story, we get it boi lmao
            alright LOLLL
          </span>
          <div className="flex gap-2 items-center text-gray-600">
            <FaRegUserCircle />
            Ujjwal Dimri
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherBlogs;
