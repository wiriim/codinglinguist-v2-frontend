"use client";
import { useState } from "react";
import Image from "next/image";

export default function CodeInput() {
  const [openNotice, setOpenNotice] = useState(false);

  function showNotice() {
    setOpenNotice(!openNotice);
  }

  return (
    <div className="mt-8 bg-[#323232] p-8 rounded-[10px] text-white">
      <h1>Input your code here:</h1>
      <button
        onClick={showNotice}
        className="mt-2 cursor-pointer flex gap-3 p-1 px-2 hover:bg-[#cacaca] hover:text-black rounded-[10px]"
      >
        <Image
          src={"/warning.png"}
          width={20}
          height={20}
          alt=""
          className="object-contain"
        />{" "}
        Important Note
      </button>
      {openNotice && (
        <div>
          <ul>
            <li>
              You program only needs satisfy "Example Input 1:" & "Expected
              Output 1:"
            </li>
            <li>
              If the input box is too small, you can resize the box on the
              bottom right corner
            </li>
            <li>
              If you are coding C, remember to{" "}
              <code className="text-black">#include &lt;stdio.h&gt;</code>
            </li>
            <li>
              If you are coding C, remember to wrap your main code in a proper{" "}
              <code className="text-black">int main() function</code>
            </li>
            <li>
              If you are coding Java, remember to import any necessary package.
              e.g; <code className="text-black">import java.util.Scanner</code>
            </li>
            <li>
              If you are coding Java, remember to wrap your code in a{" "}
              <code className="text-black">public Class Main</code> &{" "}
              <code className="text-black">
                public static void main(String[] args)
              </code>
            </li>
          </ul>
        </div>
      )}
      <textarea
        name="code"
        id="code"
        className="border border-white p-2 min-h-[500px] mt-5 w-full"
      ></textarea>

      <h1>Output:</h1>
      <textarea
        name="code"
        id="code"
        className="border border-white p-2 min-h-[150px] mt-5 w-full"
        readOnly
      ></textarea>
    </div>
  );
}
