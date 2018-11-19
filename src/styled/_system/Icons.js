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

export const WarningIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path
      fillRule="evenodd"
      d="M15.84 13.5l.01-.01-7-12-.01.01c-.17-.3-.48-.5-.85-.5s-.67.2-.85.5l-.01-.01-7 12 .01.01c-.09.15-.15.31-.15.5 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-.19-.06-.35-.15-.5zm-6.85-.51h-2v-2h2v2zm0-3h-2v-5h2v5z" />
  </svg>
)

export const CheckIcon = props => (
  <svg {...getDefaultProps(16)} {...props}>
    <path fillRule="evenodd" d="M12 5.5l-8 8-4-4L1.5 8 4 10.5 10.5 4 12 5.5z" />
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
