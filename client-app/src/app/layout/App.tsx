import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
 import TaskDashboard from '../../features/tasks/dashboard/TaskDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import ExecutorDashboard from '../../features/executors/dashboard/ExecutorDashboard';

function App() {

  return (
    <>
      <NavBar />
      <Container style={{width: '90%', marginTop:'5em'}}> 
        <Route exact path='/' component ={TaskDashboard} />
        <Route exact path='/tasks' component ={TaskDashboard} />
        <Route path='/executors' component ={ExecutorDashboard} />
      </Container>

    </>
  );
}

export default observer(App);
