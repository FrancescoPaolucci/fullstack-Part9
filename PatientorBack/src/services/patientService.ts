import patients from '../../data/patients';
import { NonSensitivePatientDetail, NewPatientEntry, Patient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

let patients1 = [...patients];

const getPatients = (): NonSensitivePatientDetail[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientByid = (id: string): Patient | undefined => {
  const returnedPatient = patients.find((p) => p.id === id);
  console.log(returnedPatient);
  return returnedPatient;
};

const addPatinet = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: String(uuid()),
    ...entry,
  };
  patients.push(newPatient);
  console.log('patiend added', newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry = { id: String(uuid()), ...newEntry };
  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(entry),
  };
  patients1 = patients1.map((p) => (p.id === updatedPatient.id ? updatedPatient : p));

  return updatedPatient;
};
export default { getPatients, addPatinet, getPatientByid, addEntry };
