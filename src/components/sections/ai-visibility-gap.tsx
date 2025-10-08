import { Button } from '@/components/ui/button';
import { SITE_SIGNUP_URL } from '@/consts';

export function AIVisibilityGap() {
  return (
    <section className="bg-muted/30 py-0">
      <div className="container">
        <div className="bordered-div-padding border border-t-0">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <h2 className="text-foreground font-weight-display text-3xl leading-tight md:text-4xl">
              Filling the Gap in AI Search Visibility
            </h2>
            <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
              <p>
                AI Search has created a blind spot for brands: we don’t know
                how, where, or when we appear in generative answers. Traditional
                analytics can’t capture this, leaving teams without clear
                visibility.
              </p>
              <p>
                Brantial solves this challenge with unique features built for
                the generative era. Through AEO (Answer Engine Optimization) and
                advanced artificial intelligence visibility monitoring, the
                platform delivers a complete picture of brand presence in
                AI-driven environments. With AI visibility monitoring at its
                core, Brantial makes the invisible measurable and turns it into
                a clear path for growth.
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild>
                <a
                  href={SITE_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Free Trial
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
