import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewEntry, EntryType } from '../types';

import AddEntryForm from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
  entryType: EntryType;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, entryType }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} entryType={entryType} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
