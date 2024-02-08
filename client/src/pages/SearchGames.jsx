// remove this once we have game api going
import React from 'react';



const SearchGames = () => {
  return (
    <div>
      <h1>Welcome to the Search Games Page</h1>
     
    </div>
  );
};


// To be used and adjusted once we have game api going
// import React from "react";
// import { useState, useEffect } from "react";
// // Need to change to AntDesign
// import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

// import Auth from "../utils/auth";
// // adjust for gameboard api
// // import { searchGoogleBooks } from '../utils/API';
// import { saveGameIds, getSavedGameIds } from "../utils/localStorage";

// import { useMutation } from "@apollo/client"; // Import useMutation hook
// import { SAVE_GAME } from "../utils/mutations"; // Import the SAVE_GAME mutation

// const SearchGames = () => {
//   const [searchedGames, setSearchedGames] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

//   useEffect(() => {
//     return () => saveGameIds(savedGameIds);
//   });

//   // Define the useMutation hook for the SAVE_GAME mutation
//   const [saveGameMutation] = useMutation(SAVE_GAME);

//   // create method to search for games and set state on form submit
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     if (!searchInput) {
//       return false;
//     }

//     try {
//       // adjust for gameboard api
//       // const response = await searchGoogleBooks(searchInput);

//       if (!response.ok) {
//         throw new Error("something went wrong!");
//       }

//       const { items } = await response.json();

//       // need to douible check this
//       const gameData = items.map((game) => ({
//         gameId: game.id,
//         gameName: game.volumeInfo.title,
//         creators: game.volumeInfo.authors || ["No author to display"],
//         category: game.volumeInfo.categories || ["No category to display"],
//         players: game.volumeInfo.pageCount || 0,
//         description: game.volumeInfo.description || "No description to display",
//         gameImage: game.volumeInfo.imageLinks.thumbnail || "",
//       }));

//       setSearchedGames(gameData);
//       setSearchInput("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // create function to handle saving a game to our database
//   const handleSaveGame = async (gameId) => {
//     // find the game in `searchedGames` state by the matching id
//     const gameToSave = searchedGames.find((game) => game.gameId === gameId);

//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       // Execute the SAVE_GAMEmutation
//       const { data } = await saveGameMutation({
//         variables: { game: gameToSave },
//       });

//       if (!data) {
//         throw new Error("something went wrong!");
//       }

//       // if book successfully saves to user's account, save game id to state
//       setSavedGameIds([...savedGameIds, gameToSave.gameId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to the Search Games Page</h1>
//       <>
//         <div className="text-light bg-dark p-5">
//           <Container>
//             <h1>Search for Books!</h1>
//             <Form onSubmit={handleFormSubmit}>
//               <Row>
//                 <Col xs={12} md={8}>
//                   <Form.Control
//                     name="searchInput"
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                     type="text"
//                     size="lg"
//                     placeholder="Search for a book"
//                   />
//                 </Col>
//                 <Col xs={12} md={4}>
//                   <Button type="submit" variant="success" size="lg">
//                     Submit Search
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </Container>
//         </div>

//         <Container>
//           <h2 className="pt-5">
//             {searchedGames.length
//               ? `Viewing ${searchedGames.length} results:`
//               : "Search for a game to begin"}
//           </h2>
//           <Row>
//             {searchedGames.map((game) => {
//               return (
//                 <Col md="4" key={game.gameId}>
//                   <Card border="dark">
//                     {game.gameImage ? (
//                       <Card.Img
//                         src={game.gameImage}
//                         alt={`The cover for ${game.gameName}`}
//                         variant="top"
//                       />
//                     ) : null}
//                     <Card.Body>
//                       <Card.Title>{game.gameName}</Card.Title>
//                       <p className="small">
//                         <a>Creators: {game.creators}</a>
//                         <a>Category: {game.category}</a>
//                         <a>Players: {game.players}</a>
//                         </p>
//                       <Card.Text>{game.description}</Card.Text>
//                       {Auth.loggedIn() && (
//                         <Button
//                           disabled={savedGameIds?.some(
//                             (savedGameId) => savedGameId === game.gameId
//                           )}
//                           className="btn-block btn-info"
//                           onClick={() => handleSaveGame(game.gameId)}
//                         >
//                           {savedGameIds?.some(
//                             (savedGameId) => savedGameId === game.gameId
//                           )
//                             ? "This game has already been saved!"
//                             : "Save this Game!"}
//                         </Button>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               );
//             })}
//           </Row>
//         </Container>
//       </>
//     </div>
//   );
// };

export default SearchGames;
