import React, { FunctionComponent, useState, useCallback } from 'react'
import Layout from '../components/Layout'
import _ from "lodash"
import { ItemSearch } from '../types'


const Index: FunctionComponent = () => {
  const [userQuery, setUserQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [items, setItems] = useState<[ItemSearch] | null>(null)

  function sendQuery(url: string) {
    setLoading(true)
    setError('')

    fetch(url)
      .then(res => res.json())
      .then(json => setItems(json.items))
      .catch(e => setError(e.toString()))
      .finally(() => {
        setLoading(false)
        setUserQuery('')
      })
  }

  const delayedQuery = useCallback(_.debounce(q => sendQuery(`/api/flickr?tag=${encodeURIComponent(q)}`), 500), []);

  const onChange = e => {
    setUserQuery(e.target.value);
    delayedQuery(e.target.value);
  };

  return (
    <Layout title="Home">
      <br />
      <input
        placeholder="search flickr..."
        value={userQuery}
        onChange={onChange}
      />
      {loading && <div>loading...</div>}
      {error && <div className="error">{error}</div>}
      {items && items.map((item: ItemSearch) => (
        <div key={item.link}>
          <h4>{item.title}</h4>
          <div>{item.contentSnippet}</div>
        </div>
      ))}
    </Layout>
  )
}
export default Index