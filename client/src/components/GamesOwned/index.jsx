// import React, { useState, useEffect } from "react";
// import { getSavedGameIds, saveGameIds } from "../../utils/localStorage";

// const GamesOwned = () => {
//   // State to store the list of games owned
//   const [gamesOwned, setGamesOwned] = useState([]);

//   // State to store the selected game in the dropdown
//   const [selectedGameId, setSelectedGameId] = useState("");

//   // Load games owned from local storage on component mount
//   useEffect(() => {
//     const storedGamesOwned = getSavedGameIds();
//     console.log("Stored game IDs:", storedGamesOwned);
//     setGamesOwned(storedGamesOwned);
//   }, []);

//   // Function to handle removing a game from the games owned list
//   const handleRemoveGame = (gameId) => {
//     const updatedGamesOwned = gamesOwned.filter(
//       (savedGameId) => savedGameId !== gameId
//     );
//     console.log("Updated games owned after removal:", updatedGamesOwned);
//     setGamesOwned(updatedGamesOwned);
//     saveGameIds(updatedGamesOwned);
//   };

//   // Log selected game ID when it changes
//   useEffect(() => {
//     console.log("Selected game ID:", selectedGameId);
//   }, [selectedGameId]);

//   return (
//     <div>
//       <h2>Games Owned</h2>
//       <select
//         value={selectedGameId}
//         onChange={(e) => setSelectedGameId(e.target.value)}
//       >
//         <option value="">Select a game</option>
//         {/* Map over games owned to generate options */}
//         {gamesOwned.map((gameId, index) => (
//           <option key={index} value={gameId}>
//             {gameId}
//           </option>
//         ))}
//       </select>

//       <ul>
//         {gamesOwned.map((gameId, index) => (
//           <li key={index}>
//             {gameId} {/* Display game information here */}
//             <button onClick={() => handleRemoveGame(gameId)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GamesOwned;
