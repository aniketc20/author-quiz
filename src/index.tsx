import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

const reducer = (state = {}, action: any) => {
  return state
}

let store = Redux.createStore(reducer)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const authors = [
  {
    name: 'Mark Twain',
    books: [
      'The Adventures of Huckleberry Finn',
    ]
  },
  {
    name: 'Joseph Conrad',
    books: [
      'Heart of Darkness',
    ]
  },
  {
    name: 'J.K. Rowling',
    books: [
      'Harry Potter and the Sorcerers Stone'
    ]
  },
  {
    name: 'Stephen King',
    books: [
      'The Shining',
      'IT'
    ]
  },
  {
    name: 'Charles Dickens',
    books: [
      'David Copperfield',
      'A Tale of Two Cities'
    ]
  },
  {
    name: 'William Shakespeare',
    books: [
      'Hamlet',
      'Macbeth',
      'Romeo and Juliet'
    ]
  }
]


function getTurnData(authors: { name: string, books: string[] }[]) {
  const allBooks = authors.reduce((p, c) => [...p, ...c.books], [] as string[])
  const fourRandomBooks = allBooks.sort(() => 0.5 - Math.random()).slice(0, 4)
  const answer = fourRandomBooks[Math.floor(Math.random() * 3)]
  return {
    books: fourRandomBooks,
    author: authors.find((author) => author.books.some((title) => title === answer))!
  }
}


const state = {
  turnData: getTurnData(authors),
}

root.render(
  <React.StrictMode>
    <ReactRedux.Provider store={store}>
      <App {...state}/>
    </ReactRedux.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
