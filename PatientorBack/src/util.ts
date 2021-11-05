/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Diagnose, Gender, EntryType, HealthCheckRating, SickLeave, Discharge, NewBaseEntry, NewEntry, NewPatientEntry } from './types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};
const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};
const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

//************ */

export const parseString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ''}`);
  }
  return param;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing entry date ' + date);
  }
  return date;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnose['code']> => {
  if (!Array.isArray(codes) || !codes.every((code) => isString(code))) {
    throw new Error('Invalid diagnosis codes ' + codes);
  }
  return codes as Array<Diagnose['code']>;
};

const parseEntryType = (type: any): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Invalid or missing entry type ' + type);
  }

  return type;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error(' missing discharge field ' + discharge);
  }

  return discharge as Discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error('missing sick leave field ' + sickLeave);
  }

  return sickLeave as SickLeave;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating) || healthCheckRating === null) {
    throw new Error('Invalid or missing healthcheck rating field ' + healthCheckRating);
  }

  return healthCheckRating;
};

export const toNewPatient = (object: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseString(object.name, 'name'),
    gender: parseGender(object.gender),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseString(object.occupation, 'occupation'),
    ssn: parseString(object.ssn, 'ssn'),
    entries: [],
  };

  return newPatient;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    specialist: parseString(object.specialist, 'specialist'),
    type: parseEntryType(object.type),
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

//--->

export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;
  switch (newBaseEntry.type) {
    case EntryType.Hospital:
      newBaseEntry.discharge = parseDischarge(object.discharge);
      return newBaseEntry;

    case EntryType.HealthCheck:
      newBaseEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
      return newBaseEntry;

    case EntryType.OccupationalHealthcare:
      newBaseEntry.employerName = parseString(object.employerName, 'employer name');

      if (object.sickLeave) {
        newBaseEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return newBaseEntry;

    default:
      return assertNever(newBaseEntry);
  }
};
