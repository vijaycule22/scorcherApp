import Player from "../models/player.js";

export default {
  createPlayer: async (req, res) => {
    try {
      const player = await Player.createPlayer(req.body);
      res.status(201).json(player);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllPlayers: async (req, res) => {
    try {
      const players = await Player.getAllPlayers();
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPlayerById: async (req, res) => {
    try {
      const player = await Player.getPlayerById(req.params.id);
      if (!player) return res.status(404).json({ error: "Player not found" });
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePlayer: async (req, res) => {
    try {
      const updatedPlayer = await Player.updatePlayer(req.params.id, req.body);
      res.json(updatedPlayer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePlayer: async (req, res) => {
    try {
      const success = await Player.deletePlayer(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
