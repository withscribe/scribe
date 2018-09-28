const types = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
}

const errors = []

const addError = (error) => {
  errors.push(error)
}

const removeError = (id) => {
  errors.filter(e => e.id !== id)
}

const dismissError = (id) => {
  removeError(id)
}

export default errors

export {
  addError,
  removeError,
  dismissError,
}
