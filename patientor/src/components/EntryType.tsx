import React from 'react';
import DiagnosisList from './DiagnosisList';
import { Icon, Divider } from 'semantic-ui-react';
import HealthRatingBar from '../components/HealthRatingBar';
import { HealthCheckEntry as HealthCheck, HospitalEntry as Hospital, OccupationalHealthcareEntry as OccupationalHealthcare } from '../types';

export const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  return (
    <div>
      <h3>
        {entry.date}
        <Icon name='doctor' />
      </h3>
      <p>{entry.specialist}</p>
      <Divider />
      <p>{entry.description}</p>
      {entry.diagnosisCodes && <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />}
      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
    </div>
  );
};

export const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <div>
      <h3>
        {entry.date}
        <Icon name='hospital symbol' />
      </h3>
      <p>{entry.specialist}</p>
      <Divider />
      <p>{entry.description}</p>
      {entry.diagnosisCodes && <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />}
      <div>
        <p>Discharged on {entry.discharge.date}</p>
        <p>{entry.discharge.criteria}</p>
      </div>
    </div>
  );
};

export const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcare }> = ({ entry }) => {
  return (
    <div>
      <h3>
        {entry.date} <Icon color='purple' name='cog' />
      </h3>
      <p>{entry.specialist}</p>
      <Divider />
      <p>{entry.description}</p>
      {entry.diagnosisCodes && <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />}
      <div>
        <p>{entry.employerName}</p>
        {entry.sickLeave && (
          <p>
            {' '}
            Sick: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </p>
        )}
      </div>
    </div>
  );
};
