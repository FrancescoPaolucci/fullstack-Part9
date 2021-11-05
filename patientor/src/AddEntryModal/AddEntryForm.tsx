import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { TextField, DiagnosisSelection, EntryTipeSelection } from '../AddPatientModal/FormField';
import { EntryType, NewEntry, HealthCheckRating } from '../types';
import { useStateValue } from '../state';
import { isDate, toNewEntry } from '../utils';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  entryType: EntryType;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, entryType }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{ type: EntryType.HealthCheck, date: '', description: '', specialist: '', diagnosisCodes: [], healthCheckRating: HealthCheckRating.Healthy, employerName: '', sickLeaveStartDate: '', sickLeaveEndDate: '', dischargeDate: '', dischargeCriteria: '' }}
      onSubmit={(values) => onSubmit(toNewEntry(values))}
      validate={(values) => {
        const requiredError = 'Field is required';
        const invalidError = 'Invalid input';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = invalidError;
        }
        if (values.type === EntryType.Hospital) {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          } else if (!isDate(values.dischargeDate)) {
            errors.dischargeDate = invalidError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = requiredError;
          } else if (!isDate(values.sickLeaveStartDate)) {
            errors.sickLeaveStartDate = invalidError;
          }
          if (!values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = requiredError;
          } else if (!isDate(values.sickLeaveEndDate)) {
            errors.sickLeaveEndDate = invalidError;
          }
        }
        if (values.type === EntryType.HealthCheck) {
          if (!values.healthCheckRating && values.healthCheckRating !== 0) {
            errors.healthCheckRating = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field label='Description' placeholder='Description' name='description' component={TextField} />
            <Field label='Date' placeholder='YYYY-MM-DD' name='date' component={TextField} />
            <Field label='Specialist' placeholder='Specialist' name='specialist' component={TextField} />
            <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnoses)} />
            <EntryTipeSelection entryType={entryType} />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button type='submit' floated='right' color='green' disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
