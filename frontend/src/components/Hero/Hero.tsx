import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { ButtonType, IHero } from "@/types/generated";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../ui/button";

export const Hero: FC<{ heroSection: IHero }> = ({ heroSection }) => {
  const { featured_image, wordmark, title, description, buttons } = heroSection;
  const featuredImage = getStrapiMedia(featured_image?.data?.attributes.url);
  const wordmarkImage = getStrapiMedia(wordmark?.data?.attributes.url);

  return (
    <section className="pt-8 sm:pt-0">
      <div className="container">
        <div className="hero_image">
          {featuredImage && (
            <Image
              src={featuredImage!}
              alt={title}
              width={2880}
              height={1584}
              className="w-full"
            />
          )}
        </div>
        <div className="flex flex-col items-center w-full gap-8 relative max-w-[800px] mx-auto">
          {wordmarkImage && (
            <Image
              src={wordmarkImage}
              alt={"wordmark"}
              width={266}
              height={25}
            />
          )}
          <h2 className="text-6xl font-medium">{title}</h2>
          <p className="text-white/60 text-center text-xl tracking-tight">
            {description}
          </p>
          {/* <span className="text-xl font-medium">{heroAvailable}</span> */}
          <div className="flex items-center justify-center gap-4">
            {buttons.map(({ url, id, text, type, newTab }) => (
              <Link target={newTab ? "_blank" : undefined} key={id} href={url}>
                <Button
                  variant={
                    type === ButtonType.SECONDARY ? "secondary" : "primary"
                  }
                  size={"sm"}
                  className="bg-neutral-800 uppercase font-medium px-5 text-sm"
                >
                  {text}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
