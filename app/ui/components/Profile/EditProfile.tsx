"use client";
import type { User } from "@/app/lib/definitions";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateSession } from "./updateSession";

const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function EditProfile({ user }: { user: User }) {
  const { update } = useSession();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");

  const openDialog = () => {
    dialogRef.current?.showModal(); // Opens the native modal backdrop
    setIsOpen(true);
  };

  const closeDialog = () => {
    dialogRef.current?.close(); // Closes the dialog
    setIsOpen(false);
  };

  async function handleUpdate(formData: FormData) {
    const profilePicture = formData.get("profilePicture") as File;
    const backgroundPicture = formData.get("backgroundPicture") as File;
    const response = await fetch(`${backendServer}/users/${user.id}`, {
      method: "PUT",
      body: (() => {
        const data = new FormData();

        const usernameValue = formData.get("username");
        const bioValue = formData.get("bio");

        data.append(
          "username",
          typeof usernameValue === "string" ? usernameValue : ""
        );
        data.append("bio", typeof bioValue === "string" ? bioValue : "");

        if (profilePicture && profilePicture.size > 0) {
          data.append("profile", profilePicture);
        }
        if (backgroundPicture && backgroundPicture.size > 0) {
          data.append("background", backgroundPicture);
        }

        data.append("email", user.email);
        data.append("picture", user.picture);
        data.append("background", user.background);
        return data;
      })(),
    });

    if (response.ok) {
      const user: User = await response.json();
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
          className="right-10 top-60 absolute cursor-pointer"
        />
      </button>
      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        closedby="any"
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
            />
          </div>
          <div>
            <label htmlFor="backgroundPicture">Background: </label>
            <input
              type="file"
              name="backgroundPicture"
              id="backgroundPicture"
              accept=".png, .jpg"
            />
          </div>
          <div className="flex gap-2 mt-5">
            <button
              onClick={closeDialog}
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
