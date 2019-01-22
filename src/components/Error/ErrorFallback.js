import React from 'react'

import Button from 'System/Button'
import { Error, Heading, SubHeading } from 'Styled/ErrorFallback'

const ErrorFallback = () => (
  <Error>
    <Heading>
      <span
        role="img"
        aria-label="robot emoji">
        🤖
      </span>
      {' '}
      Looks like something went wrong!
    </Heading>
    <SubHeading>
      There was an error loading this page that we couldn't recover from.
      Our team has been alerted and will fix this as soon as possible.
    </SubHeading>
    <Button
      intent="success"
      appearance="default"
      onClick={() => window.location.reload(true)}>
        Reload the page
    </Button>
  </Error>
)

export default ErrorFallback
