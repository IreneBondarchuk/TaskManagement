import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'

export default function NotFound(){
    return(
        <Segment placeholder>
            <Header icon>
                <div className='errorImgage' >
                    <img alt='err' src="/assets/404.png" style={{width: '400px', height: 'auto'}} />
                </div>
                     Ooops - we can't seems to find thing that you are looging for! 
            </Header>
            <Segment.Inline>
                <Button as={Link} to={'/tasks'} primary>
                    Return to tasks
                </Button>
            </Segment.Inline>
        </Segment>
    )
}