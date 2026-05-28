"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handler } from "./loginHandler";

export default function Login() {
  const [error, setError] = useState(false);

  async function loginHandler(formData: FormData) {
    const result = await handler(formData);
    if (result) {
      setError(result);
    } 
  }

  return (
    <div className="flex justify-center w-full items-center my-8">
      <div className="w-[70vw] h-[800px] flex">
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
          <Link href={"/"} className="flex gap-3 cursor-pointer w-fit rounded-[10px] p-1 px-2 hover:bg-[#ebeaea]">
            <Image
              src="/right-arrow.png"
              width={12}
              height={12}
              alt=""
              className="object-contain rotate-180"
            />
            Back to website
          </Link>

          <div className="mt-20 mb-15">
            <h1 className="text-[32px]">Welcome!</h1>
            <p className="text-[#918D8D]">
              <Link
                href={"/signup"}
                className="underline text-black cursor-pointer"
              >
                Create a free account
              </Link>
              &nbsp; or login to your existing one
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-[16px] my-2">
              Invalid credentials.
            </div>
          )}

          <form action={loginHandler}>
            <div>
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
            <button className="bg-black text-white w-full rounded-[10px] mt-10 text-center p-2 cursor-pointer">
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
