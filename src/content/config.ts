import { defineCollection, z } from 'astro:content';

const lesson = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
    order: z.number(),
    menu: z.array(z.object({
      title: z.string(),
      path: z.string(),      
    })).optional(),
	}),
});

export const collections = { lesson };
