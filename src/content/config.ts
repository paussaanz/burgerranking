import { defineCollection, z } from 'astro:content';

const burgers = defineCollection({
  type: 'content',
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
    direccion: z.string(),
    barrio: z.string(),
    precio_rango: z.enum(['€', '€€', '€€€']),
    web: z.string().url().optional(),
    instagram: z.string().optional(),
    foto_portada: z.string(),
    fotos_galeria: z.array(z.string()).optional(),
    rating_general: z.number().min(0).max(10),
    rating_carne: z.number().min(0).max(10),
    rating_pan: z.number().min(0).max(10),
    rating_salsa: z.number().min(0).max(10),
    rating_precio_calidad: z.number().min(0).max(10),
    rating_ambiente: z.number().min(0).max(10),
    hamburguesa_estrella: z.string(),
    fecha_visita: z.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = { burgers };
