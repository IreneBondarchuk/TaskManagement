import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Icon, Menu } from 'semantic-ui-react'


export default function NavBar(){

    return(
        <Menu inverted >
            <Container>
                <Menu.Item   header>
                <Icon name='tasks'/>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/tasks' name='Tasks' />
                <Menu.Item as={NavLink} to='/executors' name='Executors' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item >
                    <Button as={NavLink} to='/createTask' positive content='Create Task' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}