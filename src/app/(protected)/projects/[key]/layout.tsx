import { Project } from "@/@types";
import { fetchWithCookies } from "@/utils";

type Props = {
  params: Promise<{ key: string }>;
};

export async function generateMetadata({ params }: Props) {
  try {
    const { key } = await params;

    const project = await fetchWithCookies<Project>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/projects/${key}`
    );

    if (!project) return {};

    return {
      title: project.name,
      description: project.description,
      openGraph: {
        title: project.name,
        description: project.description,
        url: `${process.env.NEXT_PUBLIC_BASE_FRONT_URL}/projects/${key}`,
        siteName: "BitGarden",
        locale: "pt_BR",
        type: "website",
      },
    };
  } catch {
    return {};
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
