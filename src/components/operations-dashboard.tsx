"use client";

import { useMemo, useState } from "react";
import {
  buildBusinessValueSummary,
  defaultJob,
  getStageLabel,
  getStageTone,
  type JobRecord,
  type JobStage,
} from "@/lib/workflow";

const stageOptions: JobStage[] = [
  "checkedIn",
  "diagnosing",
  "awaitingApproval",
  "inProgress",
  "qualityCheck",
  "readyForPickup",
];

export function OperationsDashboard() {
  // Local state makes the portfolio demo interactive.
  // In production, this can map directly to a persisted service ticket record.
  const [job, setJob] = useState<JobRecord>(defaultJob);

  const visibleTimeline = useMemo(() => {
    const activeIndex = stageOptions.indexOf(job.activeStage);
    return job.timeline.slice(0, activeIndex + 1);
  }, [job]);

  const latestCustomerMessage = visibleTimeline.at(-1)?.customerMessage ?? "";
  const metrics = useMemo(() => buildBusinessValueSummary(job), [job]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Live job workspace
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Turn repair updates into a repeatable workflow
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            This prototype shows how a service business can centralize update
            timing, customer-facing message quality, and approval handoffs.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Business</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={job.businessName}
              onChange={(event) =>
                setJob((current) => ({ ...current, businessName: event.target.value }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Advisor / coordinator</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={job.advisorName}
              onChange={(event) =>
                setJob((current) => ({ ...current, advisorName: event.target.value }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Customer</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={job.customer.fullName}
              onChange={(event) =>
                setJob((current) => ({
                  ...current,
                  customer: { ...current.customer, fullName: event.target.value },
                }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Asset / vehicle</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={job.assetLabel}
              onChange={(event) =>
                setJob((current) => ({ ...current, assetLabel: event.target.value }))
              }
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Current stage</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={job.activeStage}
              onChange={(event) =>
                setJob((current) => ({
                  ...current,
                  activeStage: event.target.value as JobStage,
                }))
              }
            >
              {stageOptions.map((stage) => (
                <option key={stage} value={stage}>
                  {getStageLabel(stage)}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Promised time</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={job.promisedTime}
              onChange={(event) =>
                setJob((current) => ({ ...current, promisedTime: event.target.value }))
              }
            />
          </label>
        </div>

        <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-200">Latest outbound message</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cyan-300">
                {job.customer.preferredChannel.toUpperCase()} preview
              </p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getStageTone(job.activeStage)}`}>
              {getStageLabel(job.activeStage)}
            </span>
          </div>
          <p className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-4 text-sm leading-7 text-cyan-50">
            {latestCustomerMessage}
          </p>
        </article>
      </section>

      <section className="space-y-6">
        <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <h3 className="text-xl font-semibold text-white">Business impact snapshot</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Visible stages</p>
              <p className="mt-2 text-3xl font-semibold text-white">{metrics.stageCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Approval checkpoints</p>
              <p className="mt-2 text-3xl font-semibold text-white">{metrics.approvalEvents}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Call minutes saved</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {metrics.estimatedCallSavingsMinutes}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{metrics.readinessMessage}</p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <h3 className="text-xl font-semibold text-white">Customer journey timeline</h3>
          <div className="mt-4 space-y-3">
            {visibleTimeline.map((event, index) => (
              <div key={event.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Update {index + 1}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold text-white">
                      {getStageLabel(event.stage)}
                    </h4>
                  </div>
                  <div className="text-right text-sm text-slate-400">{event.occurredAt}</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{event.internalSummary}</p>
                <p className="mt-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-200">
                  {event.customerMessage}
                </p>
                {event.requiresApproval ? (
                  <div className="mt-3 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                    This update should trigger an approval request link and follow-up reminder automation.
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
