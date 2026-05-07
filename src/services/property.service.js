const prisma = require('../db');

const getAllProperties = async () => {
  return await prisma.property.findMany();
};

const getPropertyById = async (id) => {
  return await prisma.property.findUnique({
    where: { id: parseInt(id) }
  });
};

const createProperty = async (propertyData) => {
  return await prisma.property.create({
    data: {
      title: propertyData.title,
      price: propertyData.price,
      location: propertyData.location,
      available: propertyData.available ?? true
    }
  });
};

const updateProperty = async (id, propertyData) => {
  return await prisma.property.update({
    where: { id: parseInt(id) },
    data: {
      title: propertyData.title,
      price: propertyData.price,
      location: propertyData.location,
      available: propertyData.available
    }
  });
};

const deleteProperty = async (id) => {
  await prisma.property.delete({
    where: { id: parseInt(id) }
  });
  return { message: 'Property deleted successfully' };
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
