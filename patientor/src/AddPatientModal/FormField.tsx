import React from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { Diagnosis, Gender } from '../types';
import { EntryType } from '../types';

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

interface EntryTypeProps {
  entryType: EntryType;
}

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({ diagnoses, setFieldValue, setFieldTouched }: { diagnoses: Diagnosis[]; setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue']; setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'] }) => {
  const field = 'diagnosisCodes';
  const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown fluid multiple search selection options={stateOptions} onChange={onChange} />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const EntryTipeSelection: React.FC<EntryTypeProps> = ({ entryType }) => {
  switch (entryType) {
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field label='Employer Name' placeholder='Employer Name' name='employerName' component={TextField} />
          <p>Sick period</p>
          <Field label='Start Date' placeholder='YYYY-MM-DD' name='sickLeave.startDate' component={TextField} />
          <Field label='End Date' placeholder='YYYY-MM-DD' name='sickLeave.endDate' component={TextField} />
        </>
      );
    case EntryType.Hospital:
      console.log('Hospital');
      return (
        <>
          <Field label='Date' placeholder='YYYY-MM-DD' name='discharge.date' component={TextField} />
          <Field label='Criteria' placeholder='Criteria' name='discharge.criteria' component={TextField} />
        </>
      );
    case EntryType.HealthCheck:
      console.log(entryType);
      console.log('Healtchekc');
      return (
        <>
          <Field label='Health Check Rating' name='healthCheckRating' component={NumberField} min={0} max={3} />{' '}
        </>
      );
    default:
      return null;
  }
};
