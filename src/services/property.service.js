const db = require('../db');

const getAllProperties = async () => {
  const result = await db.query('SELECT id, title, price, location, available, created_at as "createdAt" FROM properties');
  return result.rows;
};

const getPropertyById = async (id) => {
  const result = await db.query('SELECT id, title, price, location, available, created_at as "createdAt" FROM properties WHERE id = $1', [id]);
  return result.rows[0];
};

const createProperty = async (propertyData) => {
  const { title, price, location, available = true } = propertyData;
  const result = await db.query(
    'INSERT INTO properties (title, price, location, available) VALUES ($1, $2, $3, $4) RETURNING id, title, price, location, available, created_at as "createdAt"',
    [title, price, location, available]
  );
  return result.rows[0];
};

const updateProperty = async (id, propertyData) => {
  const { title, price, location, available } = propertyData;
  const result = await db.query(
    'UPDATE properties SET title = $1, price = $2, location = $3, available = $4 WHERE id = $5 RETURNING id, title, price, location, available, created_at as "createdAt"',
    [title, price, location, available, id]
  );
  return result.rows[0];
};

const deleteProperty = async (id) => {
  const result = await db.query('DELETE FROM properties WHERE id = $1', [id]);
  if (result.rowCount === 0) throw new Error('Property not found');
  return { message: 'Property deleted successfully' };
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
