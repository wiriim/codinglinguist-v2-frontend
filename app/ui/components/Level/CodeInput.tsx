"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { CompilerResp, UserLevel } from "@/app/lib/definitions";
import Link from "next/link";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function CodeInput({
  userId,
  courseName,
  levelId,
}: {
  userId: string;
  courseName: string;
  levelId: number;
}) {
  const [openNotice, setOpenNotice] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [finished, setFinished] = useState<boolean>(false);

  function showNotice() {
    setOpenNotice(!openNotice);
  }

  useEffect(() => {
    async function fetchUserAnswer() {
      if (!userId || finished) return;

      const levelData: UserLevel = await (
        await fetch(`${backendServer}/users/${userId}/levels/${levelId}`)
      ).json();

      if (levelData.status == 1) {
        setFinished(true);
      }
    }

    fetchUserAnswer();
  }, []);

  async function handleSubmit(e: React.MouseEvent) {
    const button = e.target as HTMLButtonElement;
    button.disabled = true;

    const response = await fetch(`${backendServer}/levels/${levelId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        courseName: courseName,
        script: input,
      }),
    });

    if (!response.ok) {
      setOutput(`Status ${response.status}: ${response.statusText}`);
      return;
    }
    const compilerResponse: CompilerResp = await response.json();
    setOutput(compilerResponse.result.output);

    if (compilerResponse.correct) {
      setFinished(true);
    } else {
      button.disabled = false;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Tab") {
      e.preventDefault();

      const textarea = e.currentTarget as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newText =
        textarea.value.substring(0, start) +
        "\t" +
        textarea.value.substring(end);

      setInput(newText);

      // Restore cursor position after state update
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      });
    }
  }

  return (
    <>
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
                If you are coding Java, remember to import any necessary
                package. e.g;{" "}
                <code className="text-black">import java.util.Scanner</code>
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>

        <h1>Output:</h1>
        <textarea
          name="code"
          id="code"
          className="border border-white p-2 min-h-[150px] mt-5 w-full"
          readOnly
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        ></textarea>
      </div>
      {finished ? (
        <Link
          href={`/course/${courseName}`}
          className="border border-[#00e622] rounded-[10px] text-[#00e622] px-8 py-2 mt-8 cursor-pointer block max-w-[140px] ml-auto hover:bg-[#00e622] hover:text-white"
        >
          Continue
        </Link>
      ) : (
        <button
          onClick={handleSubmit}
          className="border border-[#3E50DA] rounded-[10px] text-[#3E50DA] px-8 py-2 mt-8 cursor-pointer block max-w-[120px] text-center ml-auto hover:bg-[#3E50DA] hover:text-white"
        >
          Submit
        </button>
      )}
    </>
  );
}
