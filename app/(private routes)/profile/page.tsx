import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile page - NoteHub App",
  description: "Profile page for authenticated users.",
  openGraph: {
    title: "Profile page - NoteHub App",
    description: "Profile page for authenticated users.",
    url: "https://notehub-api.goit.study",
    images: [
      {
        url: "https://notehub-api.goit.study",
        width: 1200,
        height: 630,
        alt: "Profile page - NoteHub App",
      },
    ],
    type: "website",
  },
};

export default async function ProfilePage() {
  const user = await getServerMe();
  return (
    <div>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p className={css.usernameWrapper}>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
