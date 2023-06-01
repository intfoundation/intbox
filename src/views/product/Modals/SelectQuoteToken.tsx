import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ArrowDropDownIcon, Text } from '@vipswap/uikit'
import { quoteTokenOptions } from '../../../config/constants/nfts'

const DropDownHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.input};
  transition: border-radius 0.15s;
`

const DropDownListContainer = styled.div`
  min-width: 100px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.input};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 100px;
  }
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  position: relative;
  background: ${({ theme }) => theme.colors.input};
  border-radius: 6px;
  height: 40px;
  min-width: 100px;
  margin-left: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 100px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 6px 6px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 0 0 6px 6px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  &:hover {
    background: ${({ theme }) => theme.colors.inputSecondary};
  }
`

export interface SelectProps {
  options: quoteTokenOptions[]
  onChange?: (option: quoteTokenOptions) => void
}

const SelectQuoteToken: React.FunctionComponent<SelectProps> = ({ options, onChange }) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const toggling = () => setIsOpen(!isOpen)

  const onOptionClicked = (option: quoteTokenOptions) => () => {
    setSelectedOption(option)
    setIsOpen(false)

    if (onChange) {
      onChange(option)
    }
  }

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight,
    })
  }, [])

  return (
    <DropDownContainer isOpen={isOpen} ref={containerRef} {...containerSize}>
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={toggling}>
          <Text>{selectedOption.symbol}</Text>
        </DropDownHeader>
      )}
      <ArrowDropDownIcon color="text" onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option) =>
            option.address !== selectedOption.address ? (
              <ListItem onClick={onOptionClicked(option)} key={option.address}>
                <Text>{option.symbol}</Text>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default SelectQuoteToken
