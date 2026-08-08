export type IncidentType = 
  | 'POWER_OUTAGE' 
  | 'ROAD_BLOCKAGE' 
  | 'INFRASTRUCTURE_DAMAGE' 
  | 'SAFETY_ISSUE';

export type IncidentStatus = 
  | 'OPEN' 
  | 'IN_PROGRESS' 
  | 'RESOLVED';

export interface Incident {
  id: number;
  title: string;
  type: IncidentType;
  status: IncidentStatus;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export type CreateIncidentInput = Omit<Incident, 'id' | 'createdAt'>;
export type UpdateIncidentInput = Partial<CreateIncidentInput>;