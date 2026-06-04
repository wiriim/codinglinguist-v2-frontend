import Image from "next/image";

export default function ImageCarousel() {
  return (
    <div className="flex items-end justify-evenly mt-30 lg:mt-60 gap-2 object-contain">
      <div>
        <Image
          src={"/stock-laptop.jpg"}
          width={276}
          height={413}
          alt="stock image 1"
          className="rounded-[10px]"
        />
      </div>
      <div>
        <Image
          src={"/stock-website.jpg"}
          width={414}
          height={276}
          alt="stock image 2"
          className="rounded-[10px]"
        />
      </div>
      <div>
        <Image
          src={"/stock-learning.jpg"}
          width={292}
          height={437}
          alt="stock image 3"
          className="rounded-[10px]"
        />
      </div>
      <div>
        <Image
          src={"/stock-code.png"}
          width={391}
          height={220}
          alt="stock image 4"
          className="rounded-[10px]"
        />
      </div>
      <div>
        <Image
          src={"/stock-teamwork.jpg"}
          width={429}
          height={286}
          alt="stock image 5"
          className="rounded-[10px]"
        />
      </div>
    </div>
  );
}
