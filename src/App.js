import React,{useState,useEffect} from 'react';
import './App.css';
import Recipe from './Recipe'

function App() {
 const APP_ID = 'caf1b6e4'
 const APP_KEY='5060133c356e024c04b831a6aef8d67e'

  const [recipes,setRecipes] = useState([])
  const [search,setSearch] = useState('')
  const [query,setQuery] = useState('chicken')
  

  useEffect(()=>{
     getRecipes()
  },[query]) 

  const getRecipes = async() =>{
    const response = await fetch( `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)
  }
   const updateSearch = e =>{
     setSearch(e.target.value)
     
   }
   const getSearch = e =>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
         <input className = 'search-bar' type='text' value={search} onChange={updateSearch} />
         <button  className='search-button' type='submit'>search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe =>(
        <Recipe  key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
  );
}

export default App;
