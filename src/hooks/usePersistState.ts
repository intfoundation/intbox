import { useEffect, useState } from 'react'

/**
 * Same as "useState" but saves the value to local storage each time it changes
 * 与 "useState "相同，但每次改变时都会将值保存到本地存储中。
 */
const usePersistState = (initialValue: any, localStorageKey: string) => {
  const [value, setValue] = useState(() => {
    try {
      const valueFromLS = localStorage.getItem(localStorageKey)

      return valueFromLS ? JSON.parse(valueFromLS) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value, localStorageKey])

  return [value, setValue]
}

export default usePersistState
