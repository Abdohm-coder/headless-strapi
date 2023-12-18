import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { getGlobal, getNavbar } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return metadata
    ? {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        icons: {
          icon: [new URL(url, getStrapiURL())],
        },
      }
    : {
        title: "No SEO Meta Data",
      };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;
  const navbar = await getNavbar(params.lang);

  const { notificationBanner, footer } = global.data.attributes;
  const { logo, links } = navbar.data.attributes;

  const navbarLogoUrl = getStrapiMedia(logo?.data?.attributes?.url);

  const footerLogoUrl = getStrapiMedia(
    footer?.footerLogo?.logoImg?.data?.attributes?.url
  );

  return (
    <html lang={params.lang}>
      <body className="overflow-x-hidden">
        <Navbar links={links} logoUrl={navbarLogoUrl} />

        <main className=" min-h-screen max-w-full overflow-x-hidden flex flex-col gap-y-36 py-7">
          {children}
        </main>

        <Banner data={notificationBanner} />

        {/* <Footer
          logoUrl={footerLogoUrl}
          logoText={footer?.footerLogo?.logoText}
          menuLinks={footer?.menuLinks}
          categoryLinks={footer?.categories.data}
          legalLinks={footer?.legalLinks}
          socialLinks={footer?.socialLinks}
        /> */}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
