import { Diagnosis, Gender, EntryType, HealthCheckRating, SickLeave, Discharge, NewBaseEntry, NewEntry } from './types';

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth || !isDate(dateOfBirth))) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Invalid or missing healthcheck rating field`);
  }
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
const isArrayOfStrings = (param: unknown[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
};

export const parseToString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ''}`);
  }
  return param;
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error(`Incorrect or missing type: ${entryType || ''}`);
  }

  return entryType;
};

const parseDiagnosesCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnoses');
  }

  return diagnosisCodes;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};
const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave) {
    throw new Error(`Invalid or missing sick leave field`);
  }

  return sickLeave as SickLeave;
};
const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id: ' + id);
  }
  return id;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge) {
    throw new Error(`Invalid or missing discharge field`);
  }

  return discharge as Discharge;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

type EntryFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };
  return newEntry;
};

const toNewBaseEntry = ({ type, description, date, specialist }: EntryFields): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(type),
    description: parseToString(description, 'description'),
    date: parseDate(date, 'date'),
    specialist: parseToString(specialist, 'specialist'),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

export const toNewEntry = (object: unknown): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
      return newEntry;
    case EntryType.OccupationalHealthCare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseToString(object.employerName, 'employer name'),
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    case EntryType.Hospital:
      return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
    default:
      return assertNever(newBaseEntry);
  }
};

export { toNewPatient, parseId };
