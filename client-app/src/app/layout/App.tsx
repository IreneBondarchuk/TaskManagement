import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
 import TaskDashboard from '../../features/tasks/dashboard/TaskDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import ExecutorDashboard from '../../features/executors/dashboard/ExecutorDashboard';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';

function App() {

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
      <NavBar />
      <Container style={{width: '90%', marginTop:'5em'}}> 
      <Switch>
        <Route exact path='/' component ={TaskDashboard} />
          <Route exact path='/tasks' component ={TaskDashboard} />
          <Route path='/executors' component ={ExecutorDashboard} />
          {/* <Route path='/errors' component ={TestErrors} /> */}
          <Route component ={NotFound} />
      </Switch>

      </Container>

    </>
  );
}

export default observer(App);
