import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Executor } from '../../../app/models/executor'

interface Props{
    executors: Executor[]
}

export default function EmployeeDashboard({executors}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <List>
                {executors.map(empl => (
                    <List.Item key={empl.id}>
                        {empl.firstName} {empl.surname}
                    </List.Item>
                ))}
            </List>
            </Grid.Column>
        </Grid>
    )
}