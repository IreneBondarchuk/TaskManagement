import React from 'react'
import { Header } from 'semantic-ui-react'


export default function IconHeader(){
    return(
        <Header as='h2' icon>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: '2rem'}}/>
        </Header>
    )
}

