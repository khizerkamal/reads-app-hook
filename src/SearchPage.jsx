import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

const SearchPage = ({books, moveShelf}) => {
    const [ keyword,setKeyword ] = useState('')
    const [ booksFound,setBooksFound ] = useState([])

    function updateStateKeyword(keyword) {
        setKeyword(keyword)
        updateStateBooks(keyword)
      }
    
    function updateStateBooks(keyword) {
        if (keyword) {
          BooksAPI.search(keyword).then((booksFound) => {
            if (booksFound.error) {
                setBooksFound([])
            } else {
                setBooksFound(booksFound)
            }
          })
        } else {
            setBooksFound([])
        }
      }
    
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={keyword}
              onChange={(e) => updateStateKeyword(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              booksFound.map(searchedbook => {
                let shelf = "none";
                books.map(book => book.id === searchedbook.id ? shelf = book.shelf : '')
                return (
                  <li key={searchedbook.id}>
                    <Book book={searchedbook} moveShelf={moveShelf} currentShelf={shelf}/>
                  </li>
                )
              })  
            }
          </ol>
        </div>
      </div>
    )
}

export default SearchPage
