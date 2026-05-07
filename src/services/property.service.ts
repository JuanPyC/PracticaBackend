import prisma from '../db';

export interface PropertyData {
  title: string;
  price: number;
  location: string;
  available?: boolean;
}

export interface PropertyFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  page: number;
  limit: number;
}

export const getAllProperties = async (filters: PropertyFilters) => {
  const { location, minPrice, maxPrice, available, page, limit } = filters;
  const skip = (page - 1) * limit;

  // Build the WHERE clause
  const where: any = {};

  if (location) {
    where.location = {
      contains: location,
      mode: 'insensitive',
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  if (available !== undefined) {
    where.available = available;
  }

  // Get data and total count in parallel
  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.property.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
  };
};

export const getPropertyById = async (id: number) => {
  return await prisma.property.findUnique({
    where: { id }
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

export const updateProperty = async (id: number, propertyData: Partial<PropertyData>) => {
  return await prisma.property.update({
    where: { id },
    data: propertyData
  });
};

export const deleteProperty = async (id: number) => {
  await prisma.property.delete({
    where: { id }
  });
  return { message: 'Property deleted successfully' };
};
