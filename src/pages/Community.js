import React from 'react'
import { inject, observer } from 'mobx-react'

import { Button } from '_system/Button'
import Input, {
  Label, InlineLabel, InlineInput, TextArea,
} from '_system/Input'
import { HomeGrid } from '_system/Grid'
import { TitleText, TitleSecondary } from '_system/Typography'
import { ProfileStoryCard } from 'Components/StoryCard'

@inject('communityStore')
@observer
class Community extends React.Component {
  render() {
    return (
      <>
        welcome to communities
      </>
    )
  }
}

export default Community
