import Image from "next/image";

export default function CourseCard({
  title,
  price,
  img,
}: {
  title: string;
  price: string;
  img: string;
}) {
  return (
    <div className="bg-neutral-50 rounded-xl shadow-md p-4 border border-neutral-200">

      <Image
        src={img}
        alt="course"
        width={150}
        height={120}
        className="rounded mx-auto  h-32 object-cover"
      />

      <h3 className="font-bold mt-3 text-[#264653]">
        {title}
      </h3>

      <p className="text-orange-500 font-bold mt-2">
        {price}
      </p>

      <button className="mt-3 w-full border border-[#264653] py-2 text-[#264653] rounded hover:bg-orange-500 hover:text-white transition">
        View Course
      </button>

    </div>
  );
}