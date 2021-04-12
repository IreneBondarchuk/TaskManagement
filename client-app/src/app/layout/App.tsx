import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import TaskDashboard from '../../features/tasks/dashboard/TaskDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
const {taskStore} = useStore();


useEffect(() => {
 taskStore.loadTasks();
}, [taskStore])


 
if(taskStore.loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <>
      <NavBar />
      <Container style={{width: '90%', marginTop:'5em'}}> 
        <TaskDashboard />
      </Container>

    </>
  );
}

export default observer(App);
