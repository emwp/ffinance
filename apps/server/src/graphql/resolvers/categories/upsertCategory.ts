import { z } from 'zod';
import prisma from '../../../prisma/client';
import { MutationUpdateCategoryArgs } from '../../resolvers-types';

const QueryInputSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().min(1, { message: 'Category name is required' }),
  color: z.string().min(1, { message: 'Category color is required' }),
});

const updateCategory = async (args: MutationUpdateCategoryArgs) => {
  const { categoryId, color, name } = QueryInputSchema.parse(args);

  return await prisma.category.upsert({
    include: { transactions: true },
    where: { id: categoryId },
    create: { color, name },
    update: { color, name },
  });
};

export { updateCategory };
