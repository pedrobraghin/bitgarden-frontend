import { PublicUser } from "@/@types";
import { fetchWithCookies } from "@/utils";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username } = await params;

  const user = await fetchWithCookies<PublicUser>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${username}`
  );

  if (!user) return {};

  return {
    title: user.name ?? `Perfil de ${username}`,
    description: user.profile.bio,
    openGraph: {
      title: user.name,
      description: user.profile.bio,
      url: `${process.env.NEXT_PUBLIC_BASE_FRONT_URL}/profiles/${username}`,
      siteName: "BitGarden",
      images: [
        {
          url: user.avatarUrl,
          width: 800,
          height: 600,
          alt: user.name,
        },
      ],
      locale: "pt_BR",
      type: "profile",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
