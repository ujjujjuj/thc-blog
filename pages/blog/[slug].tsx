import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import OtherBlogs from "../../components/OtherBlogs";
import useWindowWidth, { LG } from "../../hooks/useWindowWidth";

const Blog = () => {
  const router = useRouter();
  const width = useWindowWidth();

  return (
    <>
      <Nav />
      <div className="px-5 py-8 md:px-10">
        <div className="flex gap-20 w-full font-euclid">
          <div className="flex-1">
            <div className="relative h-80 md:h-[32rem]">
              <Image
                src="/blog1.png"
                alt="blog1"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex justify-between pt-6 w-full text-gray-600">
              <span>October 18, 2022</span>
              <div className="flex gap-2 items-center">
                <FaRegUserCircle />
                Ujjwal Dimri
              </div>
            </div>
          </div>
          {width >= LG ? (
            <>
              <div className="flex flex-col flex-1 gap-10">
                <p className="text-3xl font-bold font-euclid">
                  Editor picks just for you
                </p>
                <OtherBlogs />
                <OtherBlogs />
              </div>
            </>
          ) : null}
        </div>
        <div className="py-12 font-euclid">
          <span className="text-5xl font-bold">
            This is the title of your Blog Cover Story for real so please write
          </span>
          <p className="mt-4 text-lg font-medium text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            et tristique quam. Nulla facilisi. Curabitur risus quam, tincidunt
            quis ipsum eu, aliquam suscipit ex. Donec nec metus condimentum,
            venenatis odio at, scelerisque nibh. Nunc cursus nunc et nisl
            tristique, eu dictum nisi dapibus.
            <br />
            <br /> Vestibulum malesuada molestie dolor non dictum. Mauris
            mattis, sapien et commodo facilisis, nisi justo vestibulum arcu, ac
            lacinia ante lorem id mauris. Donec elementum ante orci, et sagittis
            libero sagittis at. Mauris finibus dapibus velit, quis auctor ipsum.
            Praesent efficitur efficitur est, ut viverra mauris vehicula eu.
            Integer sit amet nibh quis ex viverra mollis ac id lorem. Integer
            lorem purus, cursus sit amet
            <br />
            <br />
            pellentesque vitae, volutpat eu lorem. Ut eget orci scelerisque,
            pretium tellus a, varius magna. Sed tristique, arcu sit amet
            fringilla congue, enim ligula consectetur justo, a volutpat eros
            ipsum et libero. Integer felis lectus, semper in commodo ac, cursus
            a magna. Duis dapibus ipsum mauris, ut elementum magna interdum ut.
            Pellentesque egestas nunc ut est mattis finibus. Duis a placerat
            lectus, ut tincidunt enim. Vestibulum eu dolor et est elementum
            rhoncus. Etiam sed est tortor. Quisque et auctor est. Ut eget varius
            dolor. Fusce at mi vestibulum, blandit ex ac, consectetur felis.
            Vestibulum. Ut eget orci scelerisque, pretium tellus a, varius
            magna. Sed tristique, arcu sit amet fringilla congue, enim ligula
            consectetur justo, a volutpat eros ipsum et libero. Integer felis
            lectus, semper in commodo ac, cursus a magna. Duis dapibus ipsum
            mauris, ut elementum magna interdum ut. Pellentesque egestas nunc ut
            est mattis finibus. Duis a placerat lectus, ut tincidunt enim.
            Vestibulum eu dolor et est elementum rhoncus.
            <br />
            <br /> Etiam sed est tortor. Quisque et auctor est. Ut eget varius
            dolor. Fusce at mi vestibulum, blandit ex ac, consectetur felis.
            Vestibulum.
          </p>
          <p className="mt-6 font-bold">Authored by: Ujjwal Dimri</p>
        </div>
        {width < LG ? (
          <>
            <div className="flex flex-col flex-1 gap-10">
              <p className="text-3xl font-bold font-euclid">
                Editor picks just for you
              </p>
              <OtherBlogs />
              <OtherBlogs />
            </div>
          </>
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export default Blog;
