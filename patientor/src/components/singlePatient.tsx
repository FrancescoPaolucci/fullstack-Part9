import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Diagnosis } from '../types';
import { Icon } from 'semantic-ui-react';
import { useStateValue, setSinglePatient, setDiagnosisList } from '../state';
import EntryDetails from './EntryDetails';

type QuizParams = {
  id: string;
};

const genderIcons = {
  male: { name: 'mars' as const, color: 'blue' as const },
  female: { name: 'venus' as const, color: 'pink' as const },
  other: { name: 'genderless' as const, color: 'grey' as const },
};

const SinglePatient = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<QuizParams>();
  const patient = patients[id];

  useEffect(() => {
    const fetchOnepatient = async () => {
      try {
        const { data: onePatientfromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setSinglePatient(onePatientfromApi));
      } catch (e) {
        console.log(e);
      }
    };
    void fetchOnepatient();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);

  console.log('sss', patients);
  if (!patient || !patient.entries) return null;
  return (
    <div>
      <h1>
        Patient: <Icon {...genderIcons[patient.gender]} />{' '}
      </h1>
      <h2>{patient.name}</h2>
      <h3>SSN:{patient.ssn}</h3>
      <h3>Occupation: {patient.occupation}</h3>
      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <EntryDetails key={entry.id} entry={entry} />
        </div>
      ))}
    </div>
  );
};
export default SinglePatient;
