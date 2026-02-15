import Image from "next/image"
import { NeonButton } from "./NeonButton"

type HeroProps = {
  imageSrc?: string
  heading: string
  lead: string
  ctaLabel?: string
  redirectUrl?: string
}

const envRedirect = process.env.NEXT_PUBLIC_SITE_URL

export const Hero = ({ imageSrc, heading, lead, ctaLabel, redirectUrl }: HeroProps) => {
  const href = redirectUrl ?? envRedirect

  return (
    <div className="relative flex w-screen min-h-(--hero-min-h) overflow-hidden">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt=""
          quality={80}
          fill
          priority
          className="object-cover"
        />
      )}

      <div className="flex z-10 mx-auto w-full px-(--container-px) py-(--hero-py) text-(--text-on-dark) justify-end items-center">
        <div className="flex flex-col gap-(--hero-gap) sm:max-w-(--hero-content-max-w)">
          <h1 className="text-(length:--hero-title-size) font-semibold leading-tight">
            {heading}
          </h1>

          <h2 className="leading-relaxed opacity-(--hero-lead-opacity)">{lead}</h2>

          {ctaLabel && (
            <div>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <NeonButton>{ctaLabel}</NeonButton>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
