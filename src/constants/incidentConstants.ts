import type { IncidentType, IncidentStatus } from '../types/incident';

export type LabeledOption<T extends string> = { label: string; value: T };

export const INCIDENT_TYPES: LabeledOption<IncidentType | 'ALL'>[] = [
  { label: 'All Types', value: 'ALL' },
  { label: 'Power Outage', value: 'POWER_OUTAGE' },
  { label: 'Road Blockage', value: 'ROAD_BLOCKAGE' },
  { label: 'Infrastructure Damage', value: 'INFRASTRUCTURE_DAMAGE' },
  { label: 'Safety Issue', value: 'SAFETY_ISSUE' },
];

export const INCIDENT_STATUSES: LabeledOption<IncidentStatus | 'ALL'>[] = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Resolved', value: 'RESOLVED' },
];

export const FORM_INCIDENT_TYPES: LabeledOption<IncidentType>[] = INCIDENT_TYPES.filter(
  (t): t is LabeledOption<IncidentType> => t.value !== 'ALL',
);

export const FORM_INCIDENT_STATUSES: LabeledOption<IncidentStatus>[] = INCIDENT_STATUSES.filter(
  (s): s is LabeledOption<IncidentStatus> => s.value !== 'ALL',
);

export const STATUS_STYLES: Record<IncidentStatus, string> = {
  OPEN: 'bg-red-100 text-red-700 border-red-200',
  IN_PROGRESS: 'bg-amber-100 text-amber-700 border-amber-200',
  RESOLVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};