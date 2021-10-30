import React, {useState, useEffect} from 'react';
import { Card } from "./Card";
import md5 from 'md5'


const t = process.env.REACT_APP_T 
    const api_key = process.env.REACT_APP_API_KEY
    const p = process.env.REACT_APP_P
    const INFO = process.env.REACT_APP_API_INFO + md5(t+p+api_key)

export const Gallery = () => {
    
    


  let [characters, setCharacters] = useState([])

    

  useEffect(() => {
    if(!navigator.onLine){
        if(localStorage.getItem("characters") !== null) {
            let text =JSON.parse(localStorage.getItem("characters"))
            setCharacters(text);
        }
    } else {

      fetch("https://gateway.marvel.com:443/v1/public/characters"+INFO)
      .then(response => response.json())
      .then(data => {
          let text = JSON.stringify(data.data.results)
          localStorage.setItem('characters', text)
          setCharacters(data.data.results)
      })
    }
  },[])

  return (
        <div className="row g-3">
            {characters.map( element => 
                <div key={element.id} className="col col-lg-3">
                    <Card key={element.id} id={element.id} image = {element.thumbnail.path+'.'+element.thumbnail.extension+INFO} name={element.name} description={element.description}></Card>
                </div>
            )}  
        </div>
    )
}
  