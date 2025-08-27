import { Heart, Users } from 'lucide-react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const teamMembers = [
  {
    name: 'Rob Austin',
    role: 'Founder',
    company: 'Zerostatic',
    image: '/images/blog/authors/robert-austin.webp',
    github: '#',
    linkedin: '#',
    twitter: '#',
    bio: 'Writes the core and builds the APIs. Loves fast systems, clean code, and black coffee.',
  },
  {
    name: 'Fedir Davydov',
    role: 'Co-founder',
    company: 'Zerostatic',
    image: '/images/blog/authors/fedir-davydov.webp',
    github: '#',
    linkedin: '#',
    twitter: '#',
    bio: 'Shapes the UI, crafts the experience, and makes sure it feels right.',
  },
];

export function AboutMissionTeam() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 divide-y border border-t-0 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Mission Section */}
        <div className="bordered-div-padding space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Heart className="size-5" />
              Mission
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              <span className="text-foreground font-medium">
                The modern content stack is bloated, slow, and often closed.
              </span>{' '}
              Scalar started as a simple idea: what if you could have a fast,
              developer-first content layer that worked out of the box — but
              didn’t lock you in?
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              We built Scalar to empower teams to model, edit, and{' '}
              <span className="text-foreground font-medium">
                ship content collaboratively
              </span>{' '}
              — with the flexibility of{' '}
              <a
                href="#"
                className="text-secondary font-medium hover:underline"
              >
                your favorite dev tools
              </a>
              .
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bordered-div-padding relative space-y-8">
          <div className="bg-secondary text-secondary-foreground absolute top-0 right-0 px-3 py-2.5 text-sm leading-none font-medium">
            We&apos;re hiring!
          </div>

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Users className="size-5" />
              Team
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              We’re a tiny team building Scalar with big care — balancing code,
              design, and community every day.
            </p>

            {/* Team Members */}
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
              {teamMembers.map((member) => (
                <div key={member.name} className="space-y-3">
                  {/* Desktop: Hover Card */}
                  <div className="hidden md:block">
                    <HoverCard openDelay={200} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <div className="flex cursor-pointer items-center gap-3">
                          <img
                            src={member.image}
                            alt={member.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <p className="text-sm font-medium md:text-base">
                            {member.name}
                          </p>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-94" align="start">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {member.bio}
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                          <a href={member.twitter} aria-label="Twitter">
                            <FaXTwitter className="size-4" />
                          </a>
                          <a href={member.github} aria-label="GitHub">
                            <FaGithub className="size-4" />
                          </a>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {/* Mobile: Normal Card */}
                  <div className="space-y-2 md:hidden">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.image}
                        alt={member.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <p className="text-sm font-medium">{member.name}</p>
                    </div>
                    <Card className="gap-2">
                      <CardContent className="text-muted-foreground text-sm leading-relaxed">
                        {member.bio}
                      </CardContent>
                      <CardFooter className="flex justify-end gap-3">
                        <a href={member.twitter} aria-label="Twitter">
                          <FaXTwitter className="size-4" />
                        </a>
                        <a href={member.github} aria-label="GitHub">
                          <FaGithub className="size-4" />
                        </a>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
