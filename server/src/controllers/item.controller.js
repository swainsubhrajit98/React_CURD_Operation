import { Item } from "../models/item.model.js";

export const ItemController = {
  async list(req, res) {
    try {
      const items = await Item.findAll();
      res.json({
        success: true,
        message: "Items fetched successfully",
        data: items,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch items",
        error: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const item = await Item.create(req.body);
      res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: item,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to create item",
        error: error.message,
      });
    }
  },

  async get(req, res) {
    try {
      const item = await Item.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }
      res.json({
        success: true,
        message: "Item fetched successfully",
        data: item,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch item",
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const item = await Item.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }
      await item.update(req.body);
      res.json({
        success: true,
        message: "Item updated successfully",
        data: item,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to update item",
        error: error.message,
      });
    }
  },

  async remove(req, res) {
    try {
      const item = await Item.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }
      await item.destroy();
      res.json({
        success: true,
        message: "Item deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete item",
        error: error.message,
      });
    }
  },
};
