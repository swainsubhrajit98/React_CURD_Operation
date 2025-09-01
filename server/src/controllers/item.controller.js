import { Item } from "../models/item.model.js";

export const ItemController = {
  async list(req, res) {
    const items = await Item.findAll();
    res.json(items);
  },
  async create(req, res) {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  },
  async get(req, res) {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  },
  async update(req, res) {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    await item.update(req.body);
    res.json(item);
  },
  async remove(req, res) {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    await item.destroy();
    res.json({ message: "Deleted" });
  },
};
