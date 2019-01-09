import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, Redirect } from 'react-router-dom'

import {
  Card, CardTitle, CardAuthor, CardWrapper, CardBadgeWrapper, CardMetaWrapper, CardMetaAction,
} from 'system/Card'
import { CardDesc } from 'system/Typography'
import Badge from 'system/Badge'

@inject('userStore')
@observer
class RevisionCard extends React.Component {
  componentDidMount() {
  }

  redirectToRevision = () => {
    const { history } = this.props
    const storyId = this.props.story.id
    const revisionId = this.props.revision.id

    history.push(`/story/revisions/${storyId}/${revisionId}`)
  }

  render() {
    const { revision, pos } = this.props
    return (
      <Card key={revision.id}>
        <CardWrapper
          onClick={() => this.redirectToRevision(revision.id)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <CardTitle>Revision {pos}</CardTitle>
            </div>
          </div>
        </CardWrapper>
      </Card>
    )
  }
}

export default RevisionCard

