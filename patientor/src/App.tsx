import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';
import PatientListPage from './PatientListPage';
import SinglePatient from './components/singlePatient';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>
          <Button as={Link} to='/home' primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path='/home'>
              <PatientListPage />
            </Route>
            <Route path='/patients/:id'>
              <SinglePatient />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
