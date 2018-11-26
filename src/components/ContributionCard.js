import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'timeago-react'
import PropTypes from 'prop-types'

import { Card, CardTitle, CardWrapper } from '_system/Card'
import { CardDesc } from '_system/Typography'

class ContributionCard extends React.Component {
  state = {
  }

  componentDidMount() {
  }

  redirectToContribution = () => {
    const { history, contribution: { id } } = this.props
    history.push(`/profile/contributions/diff/${id}`)
  }

  render() {
    const { contribution, story } = this.props

    return (
      <Card key={contribution.id}>
        <CardWrapper
          onClick={() => this.redirectToContribution(contribution.id)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <Link to={`/profile/contributions/diff/${contribution.id}`}>
                <CardTitle>{story.title || 'Title Here'}</CardTitle>
              </Link>
              <CardDesc>{contribution.contributorName || 'Contributor Here'}</CardDesc>
            </div>
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <CardDesc>
                <TimeAgo datetime={contribution.createdAt} />
              </CardDesc>
            </div>
          </div>
        </CardWrapper>
      </Card>
    )
  }
}

ContributionCard.propTypes = {
  history: PropTypes.object.isRequired,
  contribution: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired,
}


export default ContributionCard
