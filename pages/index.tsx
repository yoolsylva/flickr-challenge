import React, { FunctionComponent, useState, useCallback } from 'react'
import Layout from '../components/Layout'
import _ from "lodash";

type ItemSearch = {
  title: string,
  link: string,
  content: string,
  contentSnippet: string
}

const Index: FunctionComponent = () => {
  const [userQuery, setUserQuery] = useState<string>('')
  const [items, setItems] = useState<[ItemSearch] | null>(null)

  function sendQuery(url: string) {
    fetch(url)
      .then(res => res.json())
      .then(json => setItems(json.items))
      .catch(e => console.log(e.message));
  }

  const delayedQuery = useCallback(_.debounce(q => sendQuery(`/api/flickr?tag=${encodeURIComponent(q)}`), 500), []);

  const onChange = e => {
    setUserQuery(e.target.value);
    delayedQuery(e.target.value);
  };

  return (
    <Layout title="Home">
      <br/>
      <input
        placeholder="search flickr..."
        value={userQuery}
        onChange={onChange}
      />

      {items && items.map((item : ItemSearch) => (
        <div key={item.link}>
          <h4>{item.title}</h4>
          <iframe src={item.link}></iframe>
        </div>
      ))}
    </Layout>
  )
}
export default Index