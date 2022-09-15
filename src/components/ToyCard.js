import React, {useState} from "react";

function ToyCard({name, image, likes, toy, deleteToy, updatedLikesList}) {
  const [likeCount, setLikeCount] = useState(likes)

  function handleDelete() {
    // console.log(toy)
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      console.log("I was deleted")
      deleteToy(toy.id)
    })
  }

  function handleLike() {
    // console.log(toy)
    setLikeCount(likeCount => likeCount + 1)
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likeCount + 1
      })
    })
    .then(r => r.json())
    .then(updatedToy => {
      console.log(updatedToy)
      updatedLikesList(updatedToy)
    })
  }


  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
