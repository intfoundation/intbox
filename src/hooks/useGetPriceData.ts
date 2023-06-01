import { useEffect, useState } from 'react'

// const api = 'https://titansexplorer.intchain.io/api/wallet/getIntPtice'
const api = 'https://api.intbox.org'

const useGetIntPriceData = () => {
  const [data, setData] = useState<string|number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/intprice`,{
          mode: 'cors',
          // credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
        const res = await response.json()
        if(res){
          setData(res)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetIntPriceData
