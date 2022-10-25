import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import shimmerUrl from "../utils/shimmerUrl";


const BlogCard = () => {
  return (
    <div className="w-[80vw] sm:w-96 lg:pr-16 lg:border-r-2 border-gray-300 transition-transform cursor-pointer hover:scale-hover">
      <div className="relative w-full h-40">
        <Image
          src="/blog1.png"
          alt="blog image"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={shimmerUrl}
        />
      </div>
      <div className="flex flex-col gap-3 px-4 font-euclid">
        <span className="pt-4 font-bold text-gray-500">October 18, 2022</span>
        <p className="text-2xl font-bold">
          This is the title of your Blog Cover Story
        </p>
        <p className="text-lg font-medium text-gray-600">
          The Blog Description or thrity words something of random gibbrish i
          don&apos;t know man but just something here
        </p>
        <div className="flex gap-2 items-center text-gray-600">
          <FaRegUserCircle />
          Ujjwal Dimri
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
