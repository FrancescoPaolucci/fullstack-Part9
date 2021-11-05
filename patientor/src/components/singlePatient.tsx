import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Diagnosis, NewEntry, EntryType } from '../types';
import { Icon, Button } from 'semantic-ui-react';
import { useStateValue, setSinglePatient, setDiagnosisList, updatePatient } from '../state';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';

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
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchOnepatient = async () => {
      try {
        const { data: onePatientfromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setSinglePatient(onePatientfromApi));
      } catch (error) {
        const message = (error as Error).message;
        setError(message);
      }
    };
    void fetchOnepatient();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (error) {
        const message = (error as Error).message;
        setError(message);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);

  console.log('PAtients', patients);
  if (!patient || !patient.entries) return null;
  const submitNewEntry = async (newEntry: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, newEntry);
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (error) {
      const message = (error as Error).message;
      setError(message);
    }
  };
  const entryType: EntryType[] = patient.entries.map((entry) => entry.type);
  console.log(entryType[0]);

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
      <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} entryType={entryType[0]} />
      <Button onClick={() => openModal()}>Add New entry</Button>
    </div>
  );
};
export default SinglePatient;
