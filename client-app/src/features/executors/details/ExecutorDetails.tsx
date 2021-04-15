import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer(function ExecutorDetails(){
    const {executorStore} = useStore();
    const {selectedExecutor: executor, openForm, cancelSelectExecutor} = executorStore;

    if(!executor) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/user.png`}   size='small' wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{executor.firstName} {executor.surname}</Card.Header>
                <Card.Meta>
                   <Icon name='mail' /> {executor.email}
                </Card.Meta>
                <Card.Meta>
                   <Icon name='phone' /> {executor.phoneNumber}
                </Card.Meta>
                
                <Card.Description>{executor.job}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths= '2'>
                    <Button onClick={() => openForm(executor.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => cancelSelectExecutor()} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )

})