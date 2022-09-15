import React, {useEffect, useState} from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, setToys}) {

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(r => r.json())
    .then(data => {
      // console.log(data)
      setToys(data)
    })
  }, [])

  function deleteToy(toyID) {
    console.log(toyID)
    const newArray = toys.filter(toy => {
      return toy.id !== toyID
    })
    setToys(newArray)
  }

  function updatedLikesList(updatedToy) {
    console.log(updatedToy)
    const newArray = toys.map(toy => {
      if (toy.id === updatedToy.id) {
        return updatedToy
      } else {
        return toy
      }
    })
    // console.log(newArray)
    setToys(newArray)
  }

  const listOfToys = toys.map(toy => {
    return (
      <ToyCard key={toy.id} toy={toy} name={toy.name} image={toy.image} likes={toy.likes} deleteToy={deleteToy} updatedLikesList={updatedLikesList}/>
    )
  })

  return (
    <div id="toy-collection">{listOfToys}</div>
  );
}

export default ToyContainer;
