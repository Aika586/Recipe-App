import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App=()=> {
  const APP_ID='7a70741a';
  const APP_KEY="d621476a2771c3c4f136414f31770148";

  const[recipes,setRecipes] =useState([]);
  const[search,setSearch]=useState('');
  const[query,setQuery] = useState('chicken')

  useEffect( ()=>{
    getRecipes();

  },[query]);

  const getRecipes= async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data= await response.json();
    setRecipes(data.hits)
    console.log(data.hits);

  };

  const updateSearch= e =>{

  setSearch(e.target.value);
  console.log(search);
  };

  const getSearch= e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  


  return (
    <div className="App">

      <header className="App-header">
        <h1 className="App-title">Recipe Search</h1>
         </header>

      <form onSubmit={getSearch} className ="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>

      <h2><strong> Your Search Results:</strong></h2>


    {recipes.map(recipe =>(
     
      <Recipe
      key={recipe.recipe.label} 
      title ={recipe.recipe.label} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
      
    ))}

    </div>
  )
};


export default App;
