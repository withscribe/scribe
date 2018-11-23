import React from 'react'
import styled, { keyframes } from 'react-emotion'

import { colors } from '_system/Theme'
import {
  WarningIcon,
  CheckIcon,
  DangerIcon,
  InfoIcon,
} from '_system/Icons'

const shrink = keyframes`
  from {
    height: 100%;
  }
  to {
    height: 0%;
  }
`

export const types = {
  success: {
    icon: CheckIcon,
    text: colors.g400,
    fg: colors.g300,
    bg: colors.white,
  },
  error: {
    icon: DangerIcon,
    text: colors.r400,
    fg: colors.r300,
    bg: colors.white,
  },
  warning: {
    icon: WarningIcon,
    text: colors.y400,
    fg: colors.y300,
    bg: colors.white,
  },
  info: {
    icon: InfoIcon,
    text: colors.b400,
    fg: colors.b200,
    bg: colors.white,
  },
}

const Button = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.5;
  padding: 1em;
  transition: opacity 150ms;
  &:hover {
    opacity: 1;
  }
`

const Content = styled.div`
  flex-grow: 1;
  font-size: 14px;
  line-height: 1.4;
  min-height: 40px;
  padding: 1em;
`

const Countdown = styled.div`
  animation: ${shrink} 5000ms linear;
  background-color: rgba(0, 0, 0, .1);
  bottom: 0;
  height: 0;
  left: 0;
  position: absolute;
  width: 100%;
`

const Icon = ({ appearance }) => {
  const meta = types[appearance]
  const Glyph = meta.icon
  return (
    <div
      css={{
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
        backgroundColor: meta.fg,
        color: meta.bg,
        flexShrink: 0,
        paddingBottom: '8px',
        paddingTop: '8px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        width: 30,
      }}>
      <Countdown />
      <Glyph css={{ position: 'relative', zIndex: 1 }} />
    </div>
  )
}

const ToastElement = styled('div')(
  ({ appearance }) => ({
    // backgroundColor: types[appearance].bg,
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: 'rgba(67, 90, 111, 0.3) 0px 0px 1px, rgba(67, 90, 111, 0.47) 0px 8px 10px -4px',
    color: types[appearance].text,
    display: 'flex',
    marginBottom: '8px',
    width: '360px',
  }),
)

export {
  Button,
  Content,
  Countdown,
  Icon,
  ToastElement,
}
