import styled from 'react-emotion'

const Input = styled.input`
  padding: 0 0.5em;
  margin: 1em 0 0 0;
  height: 56px;
  border: 0;
  font-size: 1rem;
  max-width: 100%;
  width: 100%;
  background: #f3f3f3;
  border-radius: 3px;
  outline: 0;
`

const Label = styled.label`
  label: form-label;
  /* margin-bottom: 0.25em; */
  display: block
`

export default Input

export { Label }
