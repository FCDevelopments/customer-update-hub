export type JobStage =
  | "checkedIn"
  | "diagnosing"
  | "awaitingApproval"
  | "inProgress"
  | "qualityCheck"
  | "readyForPickup";

export interface CustomerRecord {
  fullName: string;
  phone: string;
  preferredChannel: "sms" | "email" | "voice";
}

export interface TimelineEvent {
  id: string;
  stage: JobStage;
  occurredAt: string;
  internalSummary: string;
  customerMessage: string;
  requiresApproval?: boolean;
}

export interface JobRecord {
  ticketNumber: string;
  businessName: string;
  advisorName: string;
  customer: CustomerRecord;
  assetLabel: string;
  promisedTime: string;
  activeStage: JobStage;
  timeline: TimelineEvent[];
}

export const defaultJob: JobRecord = {
  ticketNumber: "CUH-22041",
  businessName: "FC Service Operations",
  advisorName: "Naomi Tran",
  customer: {
    fullName: "Jordan Lewis",
    phone: "(555) 881-1477",
    preferredChannel: "sms",
  },
  assetLabel: "2020 Honda CR-V EX",
  promisedTime: "Today by 5:30 PM",
  activeStage: "awaitingApproval",
  timeline: [
    {
      id: "checkin",
      stage: "checkedIn",
      occurredAt: "9:02 AM",
      internalSummary: "Vehicle checked in. Customer requested noise inspection and same-day status updates.",
      customerMessage:
        "We have your vehicle checked in and our team is getting started. We'll keep you updated as soon as inspection begins.",
    },
    {
      id: "diagnostic",
      stage: "diagnosing",
      occurredAt: "10:11 AM",
      internalSummary: "Technician verified front brake vibration and noted rear pads near service limit.",
      customerMessage:
        "We've completed the first inspection and found brake wear that explains the vibration you mentioned. We're preparing the next recommendation now.",
    },
    {
      id: "approval",
      stage: "awaitingApproval",
      occurredAt: "11:08 AM",
      internalSummary: "Waiting on customer approval for front brake service and rotor machining.",
      customerMessage:
        "Your estimate is ready. Once you approve the brake service, we'll move straight into repair and keep the promised pickup time on track.",
      requiresApproval: true,
    },
    {
      id: "repair",
      stage: "inProgress",
      occurredAt: "12:22 PM",
      internalSummary: "Front brake service started after approval. Parts are already on site.",
      customerMessage:
        "Thanks for approving the work. Repairs are in progress now and parts are already here, so there should be no added delay.",
    },
    {
      id: "qc",
      stage: "qualityCheck",
      occurredAt: "2:36 PM",
      internalSummary: "Road test passed. Waiting on final wash and advisor review.",
      customerMessage:
        "The repair is complete and we're finishing the final quality check before pickup.",
    },
    {
      id: "pickup",
      stage: "readyForPickup",
      occurredAt: "3:05 PM",
      internalSummary: "Vehicle ready. Final invoice sent and pickup instructions prepared.",
      customerMessage:
        "Good news — your vehicle is ready for pickup. Your final invoice and pickup details are available now.",
    },
  ],
};

export function getStageLabel(stage: JobStage) {
  switch (stage) {
    case "checkedIn":
      return "Checked in";
    case "diagnosing":
      return "Diagnosing";
    case "awaitingApproval":
      return "Awaiting approval";
    case "inProgress":
      return "In progress";
    case "qualityCheck":
      return "Quality check";
    case "readyForPickup":
      return "Ready for pickup";
    default:
      return stage;
  }
}

export function getStageTone(stage: JobStage) {
  switch (stage) {
    case "checkedIn":
      return "bg-slate-500/15 text-slate-200 border-slate-400/20";
    case "diagnosing":
      return "bg-sky-500/15 text-sky-200 border-sky-400/20";
    case "awaitingApproval":
      return "bg-amber-500/15 text-amber-200 border-amber-400/20";
    case "inProgress":
      return "bg-indigo-500/15 text-indigo-200 border-indigo-400/20";
    case "qualityCheck":
      return "bg-violet-500/15 text-violet-200 border-violet-400/20";
    case "readyForPickup":
      return "bg-emerald-500/15 text-emerald-200 border-emerald-400/20";
    default:
      return "bg-slate-500/15 text-slate-200 border-slate-400/20";
  }
}

export function buildBusinessValueSummary(job: JobRecord) {
  const approvalEvents = job.timeline.filter((event) => event.requiresApproval).length;

  return {
    stageCount: job.timeline.length,
    approvalEvents,
    estimatedCallSavingsMinutes: approvalEvents * 6 + 12,
    readinessMessage:
      job.activeStage === "readyForPickup"
        ? "The customer can be notified automatically with pickup instructions and a payment link."
        : "The customer should continue receiving proactive updates without waiting for inbound calls.",
  };
}
