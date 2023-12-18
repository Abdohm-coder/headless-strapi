import { getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { cn } from "@/lib/utils";
import { Picture } from "@/types/generated";
import Image from "next/image";
import Link from "next/link";

interface FeaturesProps {
  data: {
    features: Feature[];
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  url: string;
  media: Picture;
  index: number;
  is_text_white: boolean | null;
}

function Feature({
  title,
  description,
  media,
  url,
  index,
  is_text_white,
}: Feature) {
  const source = getStrapiMedia(media.data?.attributes.url);
  return (
    <div
      className={cn("col-span-12", {
        "md:col-span-7 lg:h-[480px] md:h-[356px] sm:h-[395px] h-[90vw]": [
          0, 4,
        ].includes(index),
        "md:col-span-5 lg:h-[480px] md:h-[356px] sm:h-[395px] h-[90vw]": [
          1,
        ].includes(index),
        "md:col-span-12 lg:h-[480px] md:h-[356px] sm:h-[395px] h-[90vw]": [
          5,
        ].includes(index),
        "md:h-full sm:h-[356px] h-[90vw]": [
          2, 3,
        ].includes(index),
      })}
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer rounded-md relative overflow-hidden w-full h-full block hover:scale-[1.01] transition-all duration-300 ease-out"
      >
        <div
          className={`${
            is_text_white ? "text-white" : "text-black"
          } w-full h-full p-8 flex flex-col relative z-[2]`}
        >
          <p
            className={`${
              is_text_white ? "text-gray-400" : "text-gray-700"
            }  font-medium uppercase text-xs tracking-wide`}
          >
            {description}
          </p>
          <h2 className="lg:text-3xl md:text-2xl text-2xl font-medium max-w-[300px]">{title}</h2>
        </div>
        <div className="absolute inset-0 w-full h-full z-[1]">
          {source?.includes("mp4") ? (
            <video
              src={source}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full min-h-full min-w-full object-cover"
            >
              <source src={source} type="video/mp4; codecs=hvc1" />
            </video>
          ) : (
            source && (
              <Image
                src={source}
                alt={title}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            )
          )}
        </div>
      </a>
    </div>
  );
}

const AREAS = 6;

export function Features({ data }: FeaturesProps) {
  return (
    <section className="w-full">
      <div className="container mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl overflow-y-hidden">
        <div className="grid grid-cols-12 md:gap-8 gap-y-8 gap-x-0">
          {data.features.map((feature: Feature, index: number) =>
            index % AREAS === 2 ? (
              <div className={`flex flex-col gap-8 col-span-12 md:col-span-5`}>
                <Feature key={index} {...feature} index={2} />
                <Feature
                  key={index + 1}
                  {...data.features[index + 1]}
                  index={3}
                />
              </div>
            ) : index % AREAS === 3 ? (
              <></>
            ) : (
              <Feature key={index} {...feature} index={index % AREAS} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
