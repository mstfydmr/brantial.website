export function LeaderboardHero({
  title = 'AI Authority Index',
  description = 'View the top 100 most visible brands in AI search, organized by industry and updated weekly. Powered by 3M+ daily prompts sent to all major answer engines.',
  badgeHref = '/ai-authority-index',
  badgeLabel = 'Brantial',
}: {
  title?: string;
  description?: string;
  badgeHref?: string;
  badgeLabel?: string;
} = {}) {
  return (
    <section className="overflow-x-clip">
      <div className="container">
        <div className="bordered-div-padding relative flex flex-col items-center gap-6 border-x text-center md:gap-8 lg:gap-12 lg:!py-25">
          <a href={badgeHref} className="text-secondary text-sm font-medium">
            {badgeLabel}
          </a>
          <div className="max-w-4xl space-y-6 md:space-y-8 lg:space-y-12">
            <h1 className="font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[760px] text-sm leading-relaxed md:text-lg lg:text-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
