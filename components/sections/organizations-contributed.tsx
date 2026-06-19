"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/fade-in";
import {
  contributedOrganizationIds,
  contributedOrganizations,
  type ContributedOrganizationId,
} from "@/lib/data";
import { richHighlight } from "@/lib/design-system";
import { cn } from "@/lib/utils";

function OrganizationLogo({ id }: { id: ContributedOrganizationId }) {
  const org = contributedOrganizations[id];
  const [hasError, setHasError] = useState(false);
  const showLogo = Boolean(org.logo) && !hasError;

  return (
    <div
      className={cn(
        "group flex h-[4.5rem] items-center justify-center rounded-xl border border-border px-4",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:border-border dark:border-white/[0.06] dark:hover:border-white/[0.1]"
      )}
    >
      {showLogo ? (
        <Image
          src={org.logo!}
          alt={org.name}
          width={120}
          height={40}
          className="max-h-8 w-auto max-w-[7.5rem] object-contain grayscale opacity-60 transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
          onError={() => setHasError(true)}
        />
      ) : (
        <span
          className={cn(
            "text-center text-[13px] font-semibold tracking-tight text-muted-foreground/70",
            "transition-all duration-300 group-hover:scale-105 group-hover:text-foreground"
          )}
        >
          {org.name}
        </span>
      )}
    </div>
  );
}

export function OrganizationsContributed() {
  const t = useTranslations("organizations");

  return (
    <section id="organizations" className="section-padding">
      <div className="page-container">
        <FadeIn>
          <SectionHeader
            label={t("label")}
            title={t.rich("title", richHighlight)}
            description={t("description")}
          />
        </FadeIn>

        <StaggerContainer className="mt-2 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {contributedOrganizationIds.map((id) => (
            <StaggerItem key={id}>
              <OrganizationLogo id={id} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.12}>
          <p className="text-caption mt-10 text-center md:mt-12">{t("footer")}</p>
        </FadeIn>
      </div>
    </section>
  );
}
