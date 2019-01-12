import React from 'react'
import PropTypes from 'prop-types'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const getRange = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

class Pagination extends React.Component {
  state = {
    currentPage: 1,
  }

  componentDidMount() {
    this.gotoPage(1)
  }

  pageLimit = this.props.pageLimit

  totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit)

  totalRecords = this.props.totalRecords

  pageNeighbours = Math.max(0, Math.min(this.props.pageNeighbours, 2))


  gotoPage = (page) => {
    const { onPageChanged } = this.props

    const currentPage = Math.max(0, Math.min(page, this.totalPages))

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    }

    this.setState({ currentPage }, () => onPageChanged(paginationData))
  }

  handleClick = page => (e) => {
    e.preventDefault()
    this.gotoPage(page)
  }

  handleMoveLeft = (e) => {
    const { currentPage } = this.state

    e.preventDefault()
    this.gotoPage(currentPage - (this.pageNeighbours * 2) - 1)
  }

  handleMoveRight = (e) => {
    const { currentPage } = this.state

    e.preventDefault()
    this.gotoPage(currentPage + (this.pageNeighbours * 2) + 1)
  }

  fetchPageNumbers = () => {
    const { currentPage } = this.state

    const totalPages = this.totalPages
    const pageNeighbours = this.pageNeighbours

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = getRange(startPage, endPage)

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = (totalPages - endPage) > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case (hasLeftSpill && !hasRightSpill): {
        const extraPages = getRange(startPage - spillOffset, startPage - 1)
        pages = [LEFT_PAGE, ...extraPages, ...pages]
        break
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case (!hasLeftSpill && hasRightSpill): {
        const extraPages = getRange(endPage + 1, endPage + spillOffset)
        pages = [...pages, ...extraPages, RIGHT_PAGE]
        break
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case (hasLeftSpill && hasRightSpill):
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
        break
      }
      }

      return [1, ...pages, totalPages]
    }

    return getRange(1, totalPages)
  }

  render() {
    const { currentPage } = this.state
    const pages = this.fetchPageNumbers()
    if (!this.totalRecords || this.totalPages === 1) return null

    return (
      <>
        <nav>
          <ul>
            {pages.map((page, idx) => {
              if (page === LEFT_PAGE) {
                return (
                  <li key={idx}>
                    <a onClick={this.handleMoveLeft}>
                      <span>&laquo;</span>
                      <span>Previous</span>
                    </a>
                  </li>
                )
              }

              if (page === RIGHT_PAGE) {
                return (
                  <li key={idx}>
                    <a onClick={this.handleMoveRight}>
                      <span>&raquo;</span>
                      <span>Next</span>
                    </a>
                  </li>
                )
              }
              return (
                <li key={idx}>
                  <a onClick={this.handleClick(page)}>
                    { page }
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </>
    )
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
}

Pagination.defaultProps = {
  pageLimit: 10,
  pageNeighbours: 2,
}

export default Pagination
