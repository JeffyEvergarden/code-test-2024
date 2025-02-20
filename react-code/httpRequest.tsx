import React, { useState, useEffect, useCallback } from 'react'

// 自定义 Hook: useFetchWithRetry
const useFetchWithRetry = <T,>(
  url: string,
  options: RequestInit = {},
  timeout: number = 5000, // 默认超时时间为5秒
  retries: number = 3 // 默认重试次数为3次
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    let attempt = 0

    while (attempt < retries) {
      attempt++
      setLoading(true)
      setError(null)

      try {
        // 创建一个超时 Promise
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), timeout)
        )

        // 使用 Promise.race 处理超时
        const response = await Promise.race([
          fetch(url, options),
          timeoutPromise
        ])

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: T = await response.json()
        setData(result)
        setLoading(false)
        return // 成功后退出循环
      } catch (err) {
        setError(err as Error)
        setLoading(false)
        console.error(`Attempt ${attempt} failed:`, err)
      }
    }

    // 如果所有尝试都失败了，设置最终错误状态
    setError(new Error('All retry attempts failed'))
  }

  useEffect(() => {
    fetchData()
  }, [url, options, timeout, retries])

  return { data, loading, error }
}

// 示例组件
const DataFetcher: React.FC = () => {
  const { data, loading, error } = useFetchWithRetry<{ message: string }>(
    'https://jsonplaceholder.typicode.com/todos/1',
    {},
    3000, // 超时时间设置为3秒
    3 // 最多重试3次
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Data Fetched:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const timeoutPromise = (_timeout: number) => {
  return () =>
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('超时'))
      }, _timeout * 1000)
    })
}

const myFetchWithRetry = <T,>(
  url: string,
  options: RequestInit = {},
  timeout: number = 5,
  retry: number = 3
) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const timeoutFn = useCallback(timeoutPromise(timeout), [timeout])

  const fetchData = async () => {
    let time = 0

    while (time <= retry) {
      try {
        time++
        let res = await Promise.race([fetch(url, options), timeoutFn()])

        if (res.ok) {
          setData(await res.json())
          setError(null)
          break
        }
      } catch (e) {
        setError(e)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])
}

export default DataFetcher
