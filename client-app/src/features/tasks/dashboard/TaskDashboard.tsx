import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid, Header, Segment, Sticky } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import TaskDetails from '../details/TaskDetail'
import TaskForm from '../form/TaskForm'
import TaskList from './TaskList'


export default observer(function TaskDashboard(){
    const {taskStore} = useStore();
    const {selectedTask, editMode} = taskStore

    useEffect(() => {
     taskStore.loadTasks();
    }, [taskStore])
   
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
                <Sticky>
                    {selectedTask && <TaskDetails  />} 
                    {editMode && <TaskForm  />}

                </Sticky>   
            </Grid.Column>
        </Grid>
        
    )
})