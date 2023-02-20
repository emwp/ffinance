import { z } from 'zod';
import prisma from '../../../prisma/client';

const QueryInputSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().min(1),
  color: z.string().min(1),
});

const updateCategory = async (args: z.infer<typeof QueryInputSchema>) => {
  const { categoryId, color, name } = QueryInputSchema.parse(args);
  return await prisma.categories.upsert({
    include: { transactions: true },
    where: { id: categoryId },
    create: { color, name },
    update: { color, name },
  });
};

export { updateCategory };
