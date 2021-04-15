import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Header, Icon, Table, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store'


export default observer( function ExecutorList(){
        const {executorStore} = useStore();
        const {executors, selectExecutor} = executorStore;
 
        return(
            
<Table basic='very' celled collapsing>
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell >Executor</Table.HeaderCell>
            <Table.HeaderCell>Active Tasks</Table.HeaderCell>
            <Table.HeaderCell>Finished Tasks</Table.HeaderCell>
            <Table.HeaderCell> </Table.HeaderCell>
        </Table.Row>
     </Table.Header>
        <Table.Body>
            {executors.map(executor => (
                <Table.Row key={executor.id}>
                    <Table.Cell width='10'>
                        <Header as='h4' image>
                        <Image src={`/assets/user.png`} rounded size='mini'/>
                        <Header.Content>
                            {executor.firstName} {executor.surname}
                            <Header.Subheader>{executor.job}</Header.Subheader>
                        </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{executor.tasks?.filter(t => t.status === 2)?.length ?? 0}</Table.Cell>
                    <Table.Cell  textAlign='center'>{executor.tasks?.filter(t => t.status === 3)?.length ?? 0}</Table.Cell>
                    <Table.Cell><Button onClick={() => selectExecutor(executor.id)} floated='right' icon> <Icon name='edit outline' /> </Button></Table.Cell>
                </Table.Row>
            ))}
               
        </Table.Body>

</Table>



        )
    } 
)