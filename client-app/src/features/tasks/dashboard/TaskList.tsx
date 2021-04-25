import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

interface Props{
    status: number;
}

export default observer(function TaskList({status}: Props){
    const[target, setTarget] = useState('');
    const {taskStore} = useStore();
    const {tasksByDate, deleteTask, updateTask, loading, taskRegistry} = taskStore;

    function handleTaskForce(id: string){
        const task = taskRegistry.get(id);
        if(task)  {
            task.status = task.status + 1;
            updateTask(task);
        }
    }

    function handleTaskReject(id: string){
        const task = taskRegistry.get(id);
        if(task)  {
            task.status = task.status - 1;
            updateTask(task);
        }
    }

    function handleTaskDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteTask(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {tasksByDate.filter(t => t.status === status).map(task => (
                    <Item key={task.id}>
                        <Item.Content>
                            <Item.Header as={Link} to={`/tasks/${task.id}`}>{task.title}</Item.Header>
                            <Item.Meta>{task.deadline}</Item.Meta>
                            <Item.Extra>
                                <Button size='mini' name={task.id}
                                     onClick={(e)=>handleTaskDelete(e, task.id)} 
                                     loading={loading && target === task.id} floated='right' icon> 
                                    <Icon name='delete' color='red' />  </Button>
                                { status !== 1 ?  
                                <Button size='mini' onClick={()=>handleTaskReject(task.id)}  floated='right' icon>
                                        <Icon name='thumbs down outline' />  </Button> : ''}
                                <Button size='mini' as={Link} to={`/tasks/${task.id}`}  
                                    floated='right' icon> <Icon name='edit outline' />  </Button>
                               { status !== 3 ?  
                                    <Button size='mini' onClick={()=>handleTaskForce(task.id)}  floated='right' icon>
                                   <Icon name='hand spock outline'  color='green'/>  </Button> : ''}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )
})