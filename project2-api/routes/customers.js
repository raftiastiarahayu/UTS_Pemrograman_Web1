import express from "express";

const router = express.Router();

// --- Dummy Data (bisa disesuaikan dengan Project 1) ---
let customers = [
  { id: 1, name: "Rafli", phone: "08123456789", service: "Service Laptop" },
  { id: 2, name: "Aulia", phone: "08999888777", service: "Install Software" }
];

// READ all
router.get("/", (req, res) => {
  res.json(customers);
});

// READ detail
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = customers.find(c => c.id === id);
  if (!item) return res.status(404).json({ error: "Customer not found" });
  res.json(item);
});

// CREATE
router.post("/", (req, res) => {
  const { name, phone, service } = req.body;
  const newCust = {
    id: Date.now(),
    name,
    phone,
    service
  };
  customers.push(newCust);
  res.json(newCust);
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = customers.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  customers[idx] = { ...customers[idx], ...req.body };
  res.json(customers[idx]);
});

// DELETE
router.delete("/:id", (req, res) => {
  customers = customers.filter(c => c.id !== Number(req.params.id));
  res.json({ success: true });
});

export default router;
