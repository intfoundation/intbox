import React, { useState, useMemo } from 'react'
import { Input } from '@vipswap/uikit'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

const StyledInput = styled(Input)`
  border-radius: 6px;
  margin-left: auto;
`

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 234px;
    display: block;
  }
`

const Container = styled.div<{ toggled: boolean }>``

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputSell: React.FC<Props> = ({ onChange: onChangeCallback }) => {
  const [toggled, setToggled] = useState(false)
  const [inputText, setInputText] = useState('')

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    debouncedOnChange(e)
  }

  return (
    <Container toggled={toggled}>
      <InputWrapper>
        <StyledInput
          value={inputText}
          onChange={onChange}
          placeholder="enter price"
          onBlur={() => setToggled(false)}
        />
      </InputWrapper>
    </Container>
  )
}

export default InputSell
