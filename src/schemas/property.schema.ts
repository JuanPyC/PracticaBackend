import { z } from 'zod';

// Body Validation Schema
export const createPropertySchema = z.object({
  body: z.object({
    title: z.string({
      message: 'title is required',
    }).min(1, 'title cannot be empty'),
    price: z.number({
      message: 'price must be a number',
    }),
    location: z.string({
      message: 'location is required',
    }).min(1, 'location cannot be empty'),
    available: z.boolean({
      message: 'available must be a boolean',
    }),
  }),
});

// Params Validation Schema
export const getPropertySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'id must be a valid number').transform(Number),
  }),
});

// Update Schema (Body + Params)
export const updatePropertySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'id must be a valid number').transform(Number),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    price: z.number().optional(),
    location: z.string().min(1).optional(),
    available: z.boolean().optional(),
  }),
});

// Query Params Validation Schema
export const queryPropertySchema = z.object({
  query: z.object({
    location: z.string().optional(),
    minPrice: z.string().optional().transform((val) => val ? Number(val) : undefined),
    maxPrice: z.string().optional().transform((val) => val ? Number(val) : undefined),
    available: z.string().optional().transform((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    }),
    page: z.string().optional().default('1').transform(Number),
    limit: z.string().optional().default('10').transform(Number),
  }),
});
