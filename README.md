# Customer Update Hub

A production-leaning starter for service businesses that need better customer communication during active work.

This project is designed around a common, monetizable operational pain:
- customers asking for status repeatedly
- advisors/coordinators forgetting to send updates
- approvals getting delayed because communication is inconsistent
- teams losing time to phone-tag and manual follow-ups

## What this repo demonstrates

- A modern Next.js + TypeScript vertical SaaS foundation
- A workflow-oriented customer update dashboard
- Clear separation between business logic and UI code
- A structure that can evolve into a real multi-tenant communication platform

## Features in this version

- Interactive service job dashboard
- Stage-based workflow progression
- Customer-facing message preview by active stage
- Timeline view of internal vs. external communication
- Basic business impact metrics for the current job
- Production-minded code organization

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Local development

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    operations-dashboard.tsx
  lib/
    workflow.ts
```

## Why this is a good business

This can become a real SaaS for:
- dealership service departments
- independent repair shops
- field service teams
- equipment maintenance businesses
- home-service operators

The pain is simple and expensive: customers want updates, staff forget or get overloaded, and every missed update creates more inbound calls and more friction.

## Notes for future engineers

### 1. Business logic is isolated
`src/lib/workflow.ts` owns:
- workflow stages
- sample job record modeling
- timeline interpretation
- business value calculations

That makes it easier to reuse the same logic in:
- API routes
- analytics jobs
- message automation workers
- future mobile views

### 2. Suggested next production steps
To push this toward a real revenue-generating product:

- add auth and account management
- persist jobs, customers, and message history in PostgreSQL
- connect Twilio / email provider APIs
- create workflow automation rules
- add approval link flows
- add role-based access for owners, managers, and staff
- add webhook integrations for CRMs, DMSs, or field service platforms
- store delivery and read-status events for reporting

### 3. Strong next architecture
A realistic next version would include:
- PostgreSQL
- Prisma or Drizzle ORM
- Auth0 / Clerk / NextAuth
- Twilio + SendGrid / Postmark
- background jobs for scheduled reminders and follow-ups
- audit logs for every outbound customer message

## Production roadmap

### Phase 1
- Persist job records
- Create message templates per stage
- Add manual send + resend actions
- Add account settings

### Phase 2
- Add automatic stage-triggered updates
- Add approval request links
- Add delivery status tracking
- Add reporting dashboard

### Phase 3
- Integrate with dealership DMS or service platforms
- Add AI message drafting
- Add customer self-service portal
- Add multi-location team management

## License

MIT
