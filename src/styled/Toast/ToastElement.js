import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

import { colors } from 'System/Theme'
import {
  WarningIcon,
  CheckIcon,
  DangerIcon,
  InfoIcon,
} from 'System/Icons'

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
  danger: {
    icon: DangerIcon,
    text: colors.r400,
    fg: colors.r300,
    bg: colors.white,
  },
  warning: {
    icon: WarningIcon,
    text: colors.o400,
    fg: colors.o300,
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
  padding: .8em;
  transition: opacity 150ms;
  &:hover {
    opacity: 1;
  }
`

const Content = styled.div`
  flex-grow: 1;
  font-size: 14px;
  padding: 1em;
  color: ${colors.n300};
  font-family: Theinhardt-Bold;
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
      style={{
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
        backgroundColor: meta.fg,
        color: meta.bg,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        width: 30,
        height: '46px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Countdown />
      <Glyph />
    </div>
  )
}

const ToastElement = styled.div(
  ({ appearance }) => ({
    // backgroundColor: types[appearance].bg,
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: 'rgba(67, 90, 111, 0.3) 0px 0px 1px, rgba(67, 90, 111, 0.47) 0px 8px 10px -4px',
    color: types[appearance].text,
    display: 'flex',
    marginBottom: '8px',
    alignItems: 'center',
    zIndex: 100,
  }),
)

export {
  Button,
  Content,
  Countdown,
  Icon,
  ToastElement,
}
