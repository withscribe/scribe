import React from 'react'
import styled, { keyframes } from 'react-emotion'

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

export const colors = {
  G50: '#E3FCEF',
  G300: '#36B37E',
  G500: '#006644',
  R50: '#FFEBE6',
  R300: '#FF5630',
  R500: '#BF2600',
  Y50: '#FFFAE6',
  Y300: '#FFAB00',
  Y500: '#FF8B00',
  N400: '#505F79',
  B200: '#2684FF',
}

export const types = {
  success: {
    icon: CheckIcon,
    text: colors.G500,
    fg: colors.G300,
    bg: colors.G50,
  },
  error: {
    icon: DangerIcon,
    text: colors.R500,
    fg: colors.R300,
    bg: colors.R50,
  },
  warning: {
    icon: WarningIcon,
    text: colors.Y500,
    fg: colors.Y300,
    bg: colors.Y50,
  },
  info: {
    icon: InfoIcon,
    text: colors.N400,
    fg: colors.B200,
    bg: 'white',
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
