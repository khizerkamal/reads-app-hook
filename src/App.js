import React, {useState, useEffect} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Main from './MainPage'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'

function App() {
  const [ books,setBooks ] = useState([])
  
  useEffect(() => {
    BooksAPI.getAll().then((book) => {
      setBooks(book);
    });
  }, []);

  function moveShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((book) => {
        setBooks(book);
      });
    });
  }
  

  return (
    <div className="app">
      <Route path="/" exact>
        <Main books={books} moveShelf={moveShelf}/>
      </Route>
      <Route path="/search" exact>
        <SearchPage moveShelf={moveShelf} books={books}/>
      </Route>   
  </div>
  )
}

export default App;
