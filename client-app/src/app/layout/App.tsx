import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import TaskDashboard from '../../features/tasks/dashboard/TaskDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import ExecutorDashboard from '../../features/executors/dashboard/ExecutorDashboard';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import TaskForm from '../../features/tasks/form/TaskForm';
import TaskDetail from '../../features/tasks/details/TaskDetail';

function App() {
  const location = useLocation();
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
      <NavBar />
      <Container style={{width: '90%', marginTop:'5em'}}> 
      <Switch>
        <Route exact path='/' component ={TaskDashboard} />
          <Route exact path='/tasks' component ={TaskDashboard} />
          <Route path='/tasks/:id' component ={TaskDetail} />
          <Route key={location.key} path={['/createTask', '/editTask/:id']} component ={TaskForm} />
          <Route path='/executors' component ={ExecutorDashboard} />
          <Route path='/errors' component ={TestErrors} />
          <Route path='/server-error' component ={ServerError} />
          <Route component ={NotFound} />
      </Switch>

      </Container>

    </>
  );
}

export default observer(App);
