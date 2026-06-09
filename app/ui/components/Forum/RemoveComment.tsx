"use client";
import { Comment } from "@/app/lib/definitions";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function RemoveComment({
  comment,
}: {
  comment: Comment;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  async function removeComment() {
    const response = await fetch(`${backendServer}/comments/${comment.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        className="cursor-pointer min-w-[25px] h-[25px] relative"
        onClick={openDialog}
      >
        <Image src={"/recycle-bin.png"} fill alt="Remove Comment" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        closedby="any"
        className="m-auto p-5 rounded-[10px]"
      >
        <h1 className="text-red-500">
          Are you sure you want to delete your comment?
        </h1>

        <button
          onClick={closeDialog}
          className="mt-4 mr-4 h-fit px-3 py-1 text-red-500 border border-red-500 rounded-[10px] hover:bg-red-500 hover:text-white cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={removeComment}
          className="mt-4 h-fit px-3 py-1 text-green-500 border border-green-500 rounded-[10px] hover:bg-green-500 hover:text-white cursor-pointer"
        >
          Confirm
        </button>
      </dialog>
    </>
  );
}
