import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex justify-center w-full items-center my-8">
      <div className="w-[70vw] min-h-[800px] flex">
        <div className="w-1/2 flex justify-center items-start">
          <Image
            src="/upscale-geo.png"
            width={579}
            height={763}
            alt=""
            className="object-contain"
          />
        </div>
        <div className="w-1/2 p-8">
          <Link href={"/"} className="flex gap-3 cursor-pointer">
            <Image
              src="/right-arrow.png"
              width={12}
              height={12}
              alt=""
              className="object-contain rotate-180"
            />
            Back to website
          </Link>

          <div className="mt-20 mb-10">
            <h1 className="text-[32px]">Welcome!</h1>
            <p className="text-[#918D8D]">
              Already have an account? &nbsp;
              <Link href={"/login"} className="underline text-black cursor-pointer">
                Login to your account
              </Link>
            </p>
          </div>

          <form action="">
            <div>
              <label htmlFor="username" className="block">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border border-[#D6D6D6] rounded-[10px] h-[36px] mt-2 w-full p-2"
              />
            </div>
            <div className="my-6">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-[#D6D6D6] rounded-[10px] h-[36px] mt-2 w-full p-2"
              />
            </div>
            <div className="my-6">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-[#D6D6D6] rounded-[10px] h-[36px] mt-2 w-full p-2"
              />
            </div>
            <div className="my-6">
              <label htmlFor="passwordconf" className="block">
                Password confirmation
              </label>
              <input
                type="password"
                id="passwordconf"
                name="passwordconf"
                className="border border-[#D6D6D6] rounded-[10px] h-[36px] mt-2 w-full p-2"
              />
            </div>
            <button className="bg-black text-white w-full rounded-[10px] mt-6 text-center p-2 cursor-pointer">
              Log in
            </button>
          </form>

          <div className="flex gap-3 justify-center border border-[#D6D6D6] w-full rounded-[10px] mt-10 p-2 cursor-pointer">
            <Image
              src="/google.png"
              width={18}
              height={18}
              alt=""
              className="object-contain"
            />
            Log in with Google
          </div>
          <div className="flex gap-3 justify-center border border-[#D6D6D6] w-full rounded-[10px] mt-5 text-center p-2 cursor-pointer">
            <Image
              src="/github.png"
              width={18}
              height={18}
              alt=""
              className="object-contain"
            />
            Log in with Github
          </div>
        </div>
      </div>
    </div>
  );
}
