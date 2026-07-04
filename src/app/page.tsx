import { OperationsDashboard } from "@/components/operations-dashboard";

const featureCards = [
  {
    title: "Proactive status messaging",
    description:
      "Stop relying on advisors or coordinators to remember every outbound update. Trigger customer communication from defined workflow stages.",
  },
  {
    title: "Approval-driven routing",
    description:
      "When extra work is needed, convert the update into an approval checkpoint with message templates and response tracking.",
  },
  {
    title: "Vertical SaaS foundation",
    description:
      "This starter works for dealerships first, but the workflow can also serve repair shops, field services, install crews, and other appointment-based businesses.",
  },
];

const productionRoadmap = [
  "Add auth, multi-tenant accounts, and business settings.",
  "Connect SMS, email, and voice providers with delivery tracking.",
  "Store ticket history, approvals, and message audit logs in PostgreSQL.",
  "Add webhook and DMS/service-platform integrations for automatic stage changes.",
];

export default function Home() {
  // Keep top-level page content declarative so the product story stays easy to extend.
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.18),_transparent_40%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)] px-6 py-10 text-white md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-950/65 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              FC Developments • vertical SaaS
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Customer Update Hub
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              A production-leaning communication layer for service businesses
              that need better customer updates, fewer inbound status calls, and
              cleaner approval handoffs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              {[
                "Next.js 15",
                "TypeScript",
                "Tailwind CSS",
                "Service workflow communication",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              Built for daily operations
            </p>
            <div className="mt-5 space-y-5">
              {featureCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OperationsDashboard />

        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/65 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Production roadmap
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              One step away from a paid service business product
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              The current version is intentionally lightweight, but the repo is
              organized to grow into a real system with channel delivery,
              persistence, approval history, and integrations.
            </p>
          </div>
          <div className="space-y-3">
            {productionRoadmap.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm leading-6 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
