type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const res = await fetch(`http://localhost:8081/api/v1/users/${username}`);
  const user = await res.json();

  return {
    title: user.name ?? `Perfil de ${username}`,
    description: user.bio,
    openGraph: {
      title: user.name,
      description: user.bio,
      url: `https://localhost:3000/profiles/${username}`,
      siteName: "Bitgarden",
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
