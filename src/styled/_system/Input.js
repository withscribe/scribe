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

const InlineLabel = styled.label`
  label: form-label;
  /* margin-bottom: 0.25em; */
  margin-right: 0.25em;
  margin-left: 0.25em;
  display: inline
`
const InlineInput = styled.input`
  display: inline;
  padding: 0 0.5em;
  margin: 1em 0 0 0;
  height: 56px;
  border: 0;
  font-size: 1rem;
  background: #f3f3f3;
  border-radius: 3px;
  outline: 0;
`

const TextArea = styled.textarea`
  display: block;
  padding: 0 0.5em;
  margin: 1em 0 0 1em;
  width: 90vw;
  height: 100%;
  border: 0;
  font-size: 1rem;
  background: #f3f3f3;
  border-radius: 3px;
  outline: 0;
`

const Button = styled.button`
  display: block;
  padding: 0.5em;
  margin: 1em 0 0 1em;
  border: 0;
  font-size: 1rem;
  background: #f3f3f3;
  border-radius: 3px;
  outline: 0;
`

export default Input

export {
  Label, InlineLabel, InlineInput, TextArea, Button,
}
