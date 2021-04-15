import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer(function TaskDetails(){
    const {taskStore} = useStore();
    const {selectedTask: task, openForm,cancelSelectTask} = taskStore;

    if(!task) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header style={{marginBottom:'0.5em'}}>{task.title}</Card.Header>
                <Card.Meta>
                <Label> <Icon name='tag' /> <Label.Detail>{task.category.title}</Label.Detail> </Label>
                <Label> <Icon name='calendar alternate outline' /> <Label.Detail><span className='date'>{task.deadline}</span></Label.Detail> </Label>
                <Label> <Icon name='user' /> <Label.Detail><span className='date'>{task.executor?.firstName} {task.executor?.surname}</span></Label.Detail> </Label>
                </Card.Meta>
                <Card.Description>
                   <div>{task.description}</div>
                  
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths= '2'>
                    <Button onClick={() => openForm(task.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => cancelSelectTask()} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )

})