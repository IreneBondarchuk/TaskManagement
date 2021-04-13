import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
// import TaskDashboard from '../../features/tasks/dashboard/TaskDashboard';
import { observer } from 'mobx-react-lite';
 import ExecutorDashboard from '../../features/executors/dashboard/ExecutorDashboard';


function App() {

  return (
    <>
      <NavBar />
      <Container style={{width: '90%', marginTop:'5em'}}> 
      <ExecutorDashboard />
        {/* <TaskDashboard /> */}
      </Container>

    </>
  );
}

export default observer(App);
