import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

interface Props{
    status: number;
}

export default observer(function TaskList({status}: Props){
    const[target, setTarget] = useState('');
    const {taskStore} = useStore();
    const {tasksByDate, selectTask, deleteTask, loading} = taskStore;


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
                            <Item.Header as='a'>{task.title}</Item.Header>
                            <Item.Meta>{task.deadline}</Item.Meta>
                            <Item.Extra>
                                <Button 
                                    name={task.id}
                                    onClick={(e)=>handleTaskDelete(e, task.id)}
                                    loading={loading && target === task.id}
                                    floated='right'
                                    icon> 
                                 <Icon name='delete' color='red' />  </Button>
                                <Button onClick={()=>selectTask(task.id)}  floated='right' icon> <Icon name='edit outline' />  </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )
})