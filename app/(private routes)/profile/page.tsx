import Link from 'next/link';
import Image from 'next/image';
import { getServerMe } from '@/lib/api/serverApi';
import css from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'View and manage your user profile.',
  openGraph: {
    title: 'Profile page',
    description:
      'Page for viewing and editing your user profile, including account information and avatar.',
    url: 'https://09-auth.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'My Profile',
      },
    ],
    type: 'website',
  },
};

export default async function Profile() {
  const user = await getServerMe();

  return (
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
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username || 'Not set'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
