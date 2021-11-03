import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, parseId, toNewEntry } from '../util';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(patientService.getPatientByid(parseId(req.params.id)));
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewPatient(req.body);
    const addedPatient = patientService.addPatinet(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newpatient = patientService.getPatientByid(req.params.id);
    if (!newpatient) {
      throw new Error('Patient not found');
    }
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(newpatient, newEntry);
    res.json(updatedPatient);
  } catch (error) {
    const message = (error as Error).message;
    res.status(400).send({ error: message });
  }
});

export default router;
