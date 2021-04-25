import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import TaskFilters from './TaskFilters'
import TaskList from './TaskList'


export default observer(function TaskDashboard(){
    const {taskStore, categoryStore, executorStore} = useStore();
    const {loadTasks, taskRegistry} = taskStore;

    useEffect(() => {
     if(taskRegistry.size <= 1) loadTasks();
    }, [taskRegistry.size, loadTasks])

    useEffect(() => {
        categoryStore.loadCategories();
       }, [categoryStore])
   
       useEffect(() => {
        executorStore.loadExecutors();
       }, [executorStore])

    if(taskStore.loadingInitial) return <LoadingComponent content='Loading...' />
  
    return(
        <Grid inverted>
        
            <Grid.Column width='4'>
                <Segment inverted className='todo'>
                    <Header as='h2' icon='star half empty' content='To Do' />
                    <TaskList  status={1} />
                 </Segment>
                </Grid.Column>
   
            
            <Grid.Column width='4'>
                <Segment inverted className='process'>
                    <Header as='h2' icon='star half full' content='In process' />
                    <TaskList status={2} />
                </Segment>
               
            </Grid.Column>

            <Grid.Column width='4'>
            <Segment inverted className='done'>
                <Header as='h2' icon='star' content='Done' />
                <TaskList status={3} />
             </Segment>
            </Grid.Column>
            
            <Grid.Column width='4'>
                <TaskFilters/>
            </Grid.Column>
        </Grid>
        
    )
})