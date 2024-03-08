import { defineCollection, z } from 'astro:content';

const lesson = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
    menu: z.object({
      title: z.string(),
      path: z.string(),
    })
	}),
});

export const collections = { lesson };
