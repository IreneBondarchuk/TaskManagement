import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Icon, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';


export default function NavBar(){

    const {taskStore} = useStore();
    
    return(
        <Menu inverted >
            <Container>
                <Menu.Item   header>
                <Icon name='tasks'/>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/tasks' name='Tasks' />
                <Menu.Item as={NavLink} to='/executors' name='Executors' />
                <Menu.Item >
                    <Button as={Link} to='/tasks' onClick={() => taskStore.openForm()} positive content='Create Task' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}