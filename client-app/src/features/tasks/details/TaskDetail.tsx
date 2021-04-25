import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer(function TaskDetails(){
    const {taskStore} = useStore();
    const {selectedTask: task, loadTask, loadingInitial} = taskStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadTask(id);
    },[id, loadTask]);

    if(loadingInitial || !task) return <LoadingComponent />;

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
                    <Button as={Link} to={`/editTask/${task.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/tasks' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )

})