import React from 'react'
import { Button, Container, Icon, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';


export default function NavBar(){

    const {taskStore} = useStore();
    
    return(
        <Menu inverted >
            <Container>
                <Menu.Item header>
                <Icon name='tasks' />
                </Menu.Item>
                <Menu.Item name='Tasks' />
                <Menu.Item>
                    <Button onClick={() => taskStore.openForm()} positive content='Create Task' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}