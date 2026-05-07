import { Request, Response, NextFunction } from 'express';
import * as propertyService from '../services/property.service';

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.json(properties);
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });
    
    const property = await propertyService.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await propertyService.createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

    const property = await propertyService.updateProperty(id, req.body);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

    const result = await propertyService.deleteProperty(id);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Property not found') return res.status(404).json({ message: error.message });
    next(error);
  }
};
