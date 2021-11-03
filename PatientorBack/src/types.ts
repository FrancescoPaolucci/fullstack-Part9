export enum Gender {
  Male = 'male',
  Female = 'female',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  sickLeave?: SickLeave;
  employerName: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}
export type NewPatientEntry = Omit<Patient, 'id'>;

export type NonSensitivePatientDetail = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
