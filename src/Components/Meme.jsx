import React from "react"
import memesData from "../memesData.js"

export default function Meme() {
    const [memeData, setMemeData] = React.useState({
        memeImage: ' ',
        topText: ' ',
        bottomText:' '
    })

    const [allMemes , setAllMemes]=React.useState([])

    React.useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    } , [])
    
    function getMemeImage() {
        const memesArray = memesData.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)

       setMemeData(prevData =>{
           return({
               ...prevData,
               memeImage: memesArray[randomNumber].url
           })
       })

    
        
    }


    
    function handleChange(event){
        console.log(event.target.value)
        const {value , name} = event.target
            setMemeData(prevData =>{
                return({
                    ...prevData,
                    [name]: value
                    
                })
            })
        event.preventDefault()
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    name='topText'
                    value={memeData.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                    name= 'bottomText'
                    value={memeData.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new image 
                </button>
            </div>
            <div className="image--container">
                <img src={memeData.memeImage} className="meme--image" />
                <h1 className="top--text meme--text">{memeData.topText}</h1>
                <h1 className="bottom--text meme--text">{memeData.bottomText}</h1>
            </div>
        </main>
    )
}