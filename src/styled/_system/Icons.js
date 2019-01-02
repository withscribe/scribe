import React from 'react'

function getDefaultProps(width) {
  return {
    'aria-hidden': true,
    height: 16,
    width: `${width}`,
    viewBox: `0 0 ${width} 16`,
    style: {
      display: 'inline-block',
      verticalAlign: 'text-top',
      fill: 'currentColor',
    },
  }
}

export const CaretDownIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 0 0-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z" />
  </svg>
)

export const HistoryIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M8 3c-.55 0-1 .45-1 1v4c0 .28.11.53.29.71l2 2a1.003 1.003 0 0 0 1.42-1.42L9 7.59V4c0-.55-.45-1-1-1zm0-3a7.95 7.95 0 0 0-6 2.74V1c0-.55-.45-1-1-1S0 .45 0 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1H3.54C4.64 2.78 6.23 2 8 2c3.31 0 6 2.69 6 6 0 2.61-1.67 4.81-4 5.63v-.01c-.63.23-1.29.38-2 .38-3.31 0-6-2.69-6-6 0-.55-.45-1-1-1s-1 .45-1 1c0 4.42 3.58 8 8 8 .34 0 .67-.03 1-.07.02 0 .04-.01.06-.01C12.98 15.4 16 12.06 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

export const EditIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M3.25 10.26l2.47 2.47 6.69-6.69-2.46-2.48-6.7 6.7zM.99 14.99l3.86-1.39-2.46-2.44-1.4 3.83zm12.25-14c-.48 0-.92.2-1.24.51l-1.44 1.44 2.47 2.47 1.44-1.44c.32-.32.51-.75.51-1.24.01-.95-.77-1.74-1.74-1.74z" />
  </svg>
)

export const ContributeIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M9.12 11.07l2-2.02.71.71 4-4.04L10.17 0l-4 4.04.71.71-2 2.02 4.24 4.3zM2 12.97h4c.28 0 .53-.11.71-.3l1-1.01-3.42-3.45-3 3.03c-.18.18-.29.44-.29.72 0 .55.45 1.01 1 1.01zm13 1.01H1c-.55 0-1 .45-1 1.01S.45 16 1 16h14c.55 0 1-.45 1-1.01s-.45-1.01-1-1.01z" />
  </svg>
)

export const BookmarkIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M2 1v14c0 .55.45 1 1 1h1V0H3c-.55 0-1 .45-1 1zm11-1h-1v7l-2-2-2 2V0H5v16h8c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1z" />
  </svg>
)

export const HeartIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M16 5.095c0-2.255-1.88-4.083-4.2-4.083-1.682 0-3.13.964-3.8 2.352a4.206 4.206 0 0 0-3.8-2.352C1.88 1.012 0 2.84 0 5.095c0 .066.007.13.01.194H.004c.001.047.01.096.014.143l.013.142c.07.8.321 1.663.824 2.573C2.073 10.354 4.232 12.018 8 15c3.767-2.982 5.926-4.647 7.144-6.854.501-.905.752-1.766.823-2.562.007-.055.012-.11.016-.164.003-.043.012-.088.013-.13h-.006c.003-.066.01-.13.01-.195z" />
  </svg>
)

export const WarningIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M15.84 13.5l.01-.01-7-12-.01.01c-.17-.3-.48-.5-.85-.5s-.67.2-.85.5l-.01-.01-7 12 .01.01c-.09.15-.15.31-.15.5 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-.19-.06-.35-.15-.5zm-6.85-.51h-2v-2h2v2zm0-3h-2v-5h2v5z" />
  </svg>
)

export const CheckIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M12 5.5l-8 8-4-4L1.5 8 4 10.5 10.5 4 12 5.5z" />
  </svg>
)

export const DangerIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M7.99-.01c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13h-2v-2h2v2zm0-3h-2v-7h2v7z" />
  </svg>
)

export const InfoIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM7 3h2v2H7V3zm3 10H6v-1h1V7H6V6h3v6h1v1z" />
  </svg>
)

export const CloseIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" />
  </svg>
)
