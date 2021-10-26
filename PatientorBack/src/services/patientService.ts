import patients from '../../data/patients';
import { NonSensitivePatientDetail, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientDetail[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
export default { getPatients, addPatinet };
