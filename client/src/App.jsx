import { useEffect, useState } from "react";
import { ItemAPI } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const response = await ItemAPI.list();
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load items:", err);
      setItems([]);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await ItemAPI.update(editingId, form);
      } else {
        await ItemAPI.create(form);
      }
      setForm({ name: "", description: "", price: "" });
      setEditingId(null);
      load();
    } catch (err) {
      console.error("Failed to submit:", err);
    }
  }

  async function handleDelete(id) {
    try {
      await ItemAPI.remove(id);
      load();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }

  // 👇 Cursor wave effect
  useEffect(() => {
    const handleMove = (e) => {
      const wave = document.createElement("span");
      wave.className = "cursor-wave";
      wave.style.left = `${e.clientX}px`;
      wave.style.top = `${e.clientY}px`;
      wave.style.transform = `translate(-50%, -50%) rotate(${
        Math.random() * 360
      }deg)`;
      document.body.appendChild(wave);
      setTimeout(() => wave.remove(), 800);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="page-bg">
      <div className="container py-5">
        <div className="card shadow p-4 animated-card-bg">
          <h1 className="text-center mb-4 text-light">Items CRUD</h1>

          <form onSubmit={submit} className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update Item" : "Add Item"}
            </button>
          </form>

          <ul className="list-group">
            {items.length > 0 ? (
              items.map((i) => (
                <li
                  key={i.id}
                  className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light"
                >
                  <div>
                    <h5>{i.name}</h5>
                    <p className="mb-1">{i.description}</p>
                    <span className="text-success fw-bold">${i.price}</span>
                  </div>
                  <div className="btn-group">
                    <button
                      onClick={() => {
                        setEditingId(i.id);
                        setForm({
                          name: i.name,
                          description: i.description,
                          price: i.price,
                        });
                      }}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center bg-dark text-light">
                No items found. Add one above 👆
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
