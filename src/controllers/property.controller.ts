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
    const property = await propertyService.getPropertyById(req.params.id);
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
    const property = await propertyService.updateProperty(req.params.id, req.body);
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
    const result = await propertyService.deleteProperty(req.params.id);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Property not found') return res.status(404).json({ message: error.message });
    next(error);
  }
};
