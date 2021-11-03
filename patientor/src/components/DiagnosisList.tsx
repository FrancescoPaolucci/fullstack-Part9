import React from 'react';

import { useStateValue } from '../state';
import { Diagnosis } from '../types';
import { List } from 'semantic-ui-react';

interface DiagnosesDetailsProps {
  diagnosesCodes: Array<Diagnosis['code']>;
}
const DiagnosisList: React.FC<DiagnosesDetailsProps> = ({ diagnosesCodes }) => {
  const [{ diagnoses }] = useStateValue();
  console.log('swww', diagnoses);
  return (
    <List>
      <List.Item>
        <List.Header>{diagnosesCodes.length > 1 ? 'Diagnoses' : 'Diagnosis'}</List.Header>
      </List.Item>
      {diagnosesCodes.map((code) => (
        // eslint-disable-next-line react/jsx-key
        <List.Item>
          <List.Content>
            <List.Description>
              <strong>{code} - </strong>
              {diagnoses[code] && diagnoses[code].name}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default DiagnosisList;
