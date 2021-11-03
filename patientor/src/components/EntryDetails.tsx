import React from 'react';
import { Entry, EntryType } from '../types';
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from './EntryType';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
