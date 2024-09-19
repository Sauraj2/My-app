import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [books,setBooks] = useState();
  const [title,setTitle]=useState("");
  const [releaseYear,setReleaseYear]=useState(0);
  const [newTitle,setNewTitle]=useState("");
  useEffect(()=>{
    fetchBooks();
  },[])
  const fetchBooks= async()=>{
    try{
      const res = await fetch("http://127.0.0.1:8000/api/books/");
      const data=await res.json();
      setBooks(data);
    }catch(err){
      console.log(err)
    }
  }
const addBook = async ()=> {
  const bookData= {
    title,
    year:releaseYear,
  }
  try{
    const response=await fetch("http://127.0.0.1:8000/api/books/create/",{method:"POST",headers:{'Content-Type': 'application/json'}, body:JSON.stringify(bookData)});
    const data=await response.json()
    setBooks((prev)=>[...prev,data]);
  }
  catch(err){
    console.log(err)
  }
};
const updateTitle=async(pk,releaseYear)=>{
  const bookData= {
    title:newTitle,
    year:releaseYear
  }
  try{
    const response=await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{method:"PUT",headers:{'Content-Type': 'application/json'}, body:JSON.stringify(bookData)});
    const data=await response.json()
    setBooks((prev)=>{
      prev.map((book) =>{
        if (book.id===pk){
          return data;
        }
        else{
          return book;
        }
      })
    });
  }
  catch(err){
    console.log(err)
  }
}
const deleteBook=async(pk)=>{
  const bookData= {
    title:newTitle,
    year:releaseYear
  }
  try{
    const response=await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{method:"DELETE"});
    await response.json()
    setBooks((prev)=> prev.filter((book)=> book.id !== pk))
  }
  catch(err){
    console.log(err)
  }
}


  return (
    <>
      <div className="App-header"> 
        <h1>Book Website</h1>
        <div>
          <input type="text" placeholder="Booktitle.." onChange={(e)=>setTitle(e.target.value)}/>
          <input type="number" placeholder="Release Year.." onChange={(e)=>setReleaseYear(e.target.value)}/>
          <button onClick={addBook}>Add book</button>
        </div>
        {books?.map((book)=>(
      <div>
        <p>Title:{book.title}</p>
        <p>Year:{book.year}</p>
        <input type='text' placeholder='NewTitle...' 
        onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={()=>updateTitle(book.id,book.year)}>Change title</button>
        <button onClick={()=>deleteBook(book.id)}>Delete</button>
      </div>
    ))}
      </div>
    </>
    
  );
}

export default App;
