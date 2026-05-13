import axios from "axios";
import { getIGDBToken } from "../config/igdb.js";

const RAWG_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_API_KEY;
const DEFAULT_GAME_IMAGE ="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60";

const getRandomGames = async (req, res) => {
    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;

      const response = await axios.get(`${RAWG_BASE_URL}/games`, {
        params: {
          key: API_KEY,
          page: randomPage,
          // cantidad de juegos por request
          page_size: 15,
        },
      });

      if (!response.data.results) {
        return res.status(502).json({
          message: "Invalid response from RAWG API",
        });
      }

      // limpieza de datos
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

       // validación
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
         image: game.background_image || DEFAULT_GAME_IMAGE,
         rating: game.rating || 0,
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

const getGameDetails = async (req, res) => {
    try {
      const { id } = req.params;

      // Validation
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          message: "Invalid game ID",
        });
      }

      const response = await axios.get(`${RAWG_BASE_URL}/games/${id}`, {
        params: {
          key: API_KEY,
        },
      });

      if (!response.data || !response.data.id) {
        return res.status(404).json({
          message: "Game not found",
        });
      }

      const game = response.data;

      // Llamada a IGDB para screenshots y videos
    let screenshots = []
    let videos = []

    try {
      const token = await getIGDBToken();
      const igdbResponse = await axios.post(
        "https://api.igdb.com/v4/games",
        `search "${game.name}"; fields screenshots.url, videos.video_id; limit 1;`,
        {
          headers: {
            "Client-ID": process.env.IGDB_CLIENT_ID,
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
          },
        },
      );

      if (igdbResponse.data.length > 0) {
        const igdbGame = igdbResponse.data[0];
        screenshots =
          igdbGame.screenshots
            ?.slice(0, 4)
            .map((s) => s.url.replace("t_thumb", "t_screenshot_big")) || [];
        videos =
          igdbGame.videos
            ?.slice(0, 1)
            .map((v) => `https://www.youtube.com/embed/${v.video_id}`) || [];
      }
    } catch (igdbError) {
      console.error("IGDB error:", igdbError.message);
    }

      const formattedGame = {
        id: game.id,
        name: game.name,
        description: game.description_raw,
        rating: game.rating,
        genres: game.genres?.map((g) => g.name) || [],
        platforms: game.platforms?.map((p) => p.platform.name) || [],
        released: game.released,
        website: game.website,
        image: game.background_image || DEFAULT_GAME_IMAGE,
        screenshots,
        videos,
      };

      res.status(200).json(formattedGame);
    } catch (error) {
      console.error("getGameDetails error:", error.message);

      res.status(500).json({
        message: "Failed to fetch game details",
      });
    }
};

export {
    getRandomGames,
    searchGames,
    getGameDetails
}