import axios from "axios";

const RAWG_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_API_KEY;

const getRandomGames = async (req, res) => {
    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;

      const response = await axios.get(`${RAWG_BASE_URL}/games`, {
        params: {
          key: API_KEY,
          page: randomPage,
          page_size: 15,
        },
      });

      if (!response.data || !response.data.results) {
        return res.status(502).json({
          message: "Invalid response from RAWG API",
        });
      }

      const formattedGames = response.data.results.map((game) => ({
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        genres: game.genres?.map((g) => g.name) || [],
      }));

      res.status(200).json(formattedGames);
    } catch (error) {
      console.error("getRandomGames error:", error.message);

      res.status(500).json({
        message: "Failed to fetch random games",
      });
    }
};

const searchGames = async (req, res) => {
     try {
       const { query } = req.query;

       // validation 
       if (!query || typeof query !== "string") {
         return res.status(400).json({
           message: "Search query is required",
         });
       }

       const cleanQuery = query.trim();

       if (cleanQuery.length < 2) {
         return res.status(400).json({
           message: "Search query must be at least 2 characters",
         });
       }

       if (cleanQuery.length > 50) {
         return res.status(400).json({
           message: "Search query too long",
         });
       }

       const response = await axios.get(`${RAWG_BASE_URL}/games`, {
         params: {
           key: API_KEY,
           search: cleanQuery,
           page_size: 15,
         },
       });

       const formattedGames = response.data.results.map((game) => ({
         id: game.id,
         name: game.name,
         image: game.background_image,
         rating: game.rating,
         genres: game.genres?.map((g) => g.name) || [],
       }));

       res.status(200).json(formattedGames);
     } catch (error) {
       console.error("searchGames error:", error.message);

       res.status(500).json({
         message: "Failed to search games",
       });
     }
};

const getGameDetails = async (req, res) => {};

export {
    getRandomGames,
    searchGames,
    getGameDetails
}