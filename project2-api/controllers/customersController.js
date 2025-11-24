import fs from "fs-extra";

const DB_PATH = "./db.json";

// Read DB
const loadDB = async () => {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
};

// Save DB
const saveDB = async (data) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};

// GET ALL
export const getCustomers = async (req, res) => {
  const db = await loadDB();
  res.json(db.customers);
};

// GET BY ID
export const getCustomerById = async (req, res) => {
  const db = await loadDB();
  const item = db.customers.find(c => c.id == req.params.id);

  if (!item) return res.status(404).json({ message: "Customer not found" });

  res.json(item);
};

// CREATE
export const createCustomer = async (req, res) => {
  const db = await loadDB();
  const newId = db.customers.length ? db.customers.at(-1).id + 1 : 1;

  const newData = { id: newId, ...req.body };
  db.customers.push(newData);

  await saveDB(db);
  res.status(201).json(newData);
};

// UPDATE
export const updateCustomer = async (req, res) => {
  const db = await loadDB();
  const index = db.customers.findIndex(c => c.id == req.params.id);

  if (index === -1) return res.status(404).json({ message: "Customer not found" });

  db.customers[index] = { ...db.customers[index], ...req.body };

  await saveDB(db);
  res.json(db.customers[index]);
};

// DELETE
export const deleteCustomer = async (req, res) => {
  const db = await loadDB();
  const newList = db.customers.filter(c => c.id != req.params.id);

  db.customers = newList;
  await saveDB(db);

  res.json({ message: "Customer deleted" });
};
