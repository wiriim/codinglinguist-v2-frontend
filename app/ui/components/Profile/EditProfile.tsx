"use client";
import type { User } from "@/app/lib/definitions";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateSession } from "./updateSession";
import { update } from "./updateProfile";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function EditProfile({ user }: { user: User }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  async function handleUpdate(formData: FormData) {
    const result = await update(formData, user);

    if (result.success) {
      await updateSession(user);
      router.push(`/profile/${user.username}`);
      router.refresh();
      closeDialog();
    }
  }

  return (
    <div>
      <button onClick={openDialog}>
        <Image
          src={"/edit.png"}
          width={21}
          height={21}
          alt="edit profile"
          className="right-5 lg:right-10 top-60 absolute cursor-pointer"
        />
      </button>
      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        closedby="closerequest"
        className="m-auto p-5 rounded-[10px]"
      >
        <h1>Edit Profile</h1>
        <form action={handleUpdate} className="flex flex-col gap-4 mt-4">
          <div>
            <label htmlFor="username">Username: </label> <br />
            <input
              type="text"
              name="username"
              id="username"
              className="border rounded-[5px] p-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <br />
            <input
              type="text"
              name="bio"
              id="bio"
              className="border rounded-[5px] p-1"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="profilePicture">Profile: </label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              accept=".png, .jpg"
              className="hover:file:bg-[#e0e0e0] file:underline hover:file:cursor-pointer hover:file:rounded-[5px] hover:file:p-2 file:p-2 file:mr-5"
            />
          </div>
          <div>
            <label htmlFor="backgroundPicture">Background: </label>
            <input
              type="file"
              name="backgroundPicture"
              id="backgroundPicture"
              accept=".png, .jpg"
              className="hover:file:bg-[#e0e0e0] file:underline hover:file:cursor-pointer hover:file:rounded-[5px] hover:file:p-2 file:p-2 file:mr-5"
            />
          </div>
          <div className="flex gap-2 mt-5">
            <button
              onClick={closeDialog}
              type="button"
              className="h-fit px-3 py-1 text-red-500 border border-red-500 rounded-[10px] hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-fit px-3 py-1 text-green-500 border border-green-500 rounded-[10px] hover:bg-green-500 hover:text-white cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
