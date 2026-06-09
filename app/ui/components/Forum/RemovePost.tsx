"use client";
import { Forum } from "@/app/lib/definitions";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function RemovePost({
  session,
  forum,
}: {
  session: Session;
  forum: Forum;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  async function removePost() {
    const response = await fetch(`${backendServer}/forums/${forum.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/forums");
    }
  }

  const openDialog = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="cursor-pointer min-w-[25px] h-[25px] relative"
        onClick={openDialog}
      >
        <Image src={"/recycle-bin.png"} fill alt="Remove Post" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        closedby="any"
        className="m-auto p-5 rounded-[10px]"
      >
        <h1 className="text-red-500">
          Are you sure you want to delete your post?
        </h1>

        <button
          onClick={closeDialog}
          className="mt-4 mr-4 h-fit px-3 py-1 text-red-500 border border-red-500 rounded-[10px] hover:bg-red-500 hover:text-white cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={removePost}
          className="mt-4 h-fit px-3 py-1 text-green-500 border border-green-500 rounded-[10px] hover:bg-green-500 hover:text-white cursor-pointer"
        >
          Confirm
        </button>
      </dialog>
    </>
  );
}
