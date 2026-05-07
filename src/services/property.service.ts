import prisma from '../db';

export interface PropertyData {
  title: string;
  price: number;
  location: string;
  available?: boolean;
}

export const getAllProperties = async () => {
  return await prisma.property.findMany();
};

export const getPropertyById = async (id: string) => {
  return await prisma.property.findUnique({
    where: { id: parseInt(id) }
  });
};

export const createProperty = async (propertyData: PropertyData) => {
  return await prisma.property.create({
    data: {
      title: propertyData.title,
      price: propertyData.price,
      location: propertyData.location,
      available: propertyData.available ?? true
    }
  });
};

export const updateProperty = async (id: string, propertyData: PropertyData) => {
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

export const deleteProperty = async (id: string) => {
  await prisma.property.delete({
    where: { id: parseInt(id) }
  });
  return { message: 'Property deleted successfully' };
};
