import { Bank, Category, Transaction, PrismaClient } from '@prisma/client'
import prisma from './client';

const banks: Bank[] = [
  {
    id: 1,
    name: "Santander",
  },
  {
    id: 2,
    name: "JP Morgan",
  },
  {
    id: 3,
    name: "Barclays",
  },
  {
    id: 4,
    name: "Deutsche Bank",
  },
  {
    id: 5,
    name: "LHV",
  },
  {
    id: 6,
    name: "Bank of America",
  },
];

const categories: Category[] = [
  {
    id: 1,
    name: "Payroll",
  },
  {
    id: 2,
    name: "Marketing",
  },
  {
    id: 3,
    name: "Insurance",
  },
  {
    id: 4,
    name: "Tax",
  },
  {
    id: 5,
    name: "Vendors",
  },
]

const transactions: Transaction[] = [
  {
    id: 1,
    account: "DE75512108001245126199",
    amount: 18322232,
    bankId: 13,
    categoryId: 10,
    currency: "EUR",
    date: new Date("2019-02-01"),
    reference: "Payroll - January 2019",
  },
  {
    id: 2,
    account: "DE75512108001245126199",
    amount: 19332362,
    bankId: 14,
    categoryId: 10,
    currency: "EUR",
    date: new Date("2019-03-01"),
    reference: "Payroll - February 2019",
  },
  {
    id: 3,
    account: "FR7630006000011234567890189",
    amount: 15822535,
    bankId: 15,
    categoryId: 11,
    currency: "EUR",
    date: new Date("2022-12-05"),
    reference: "Maketing and Advertisent - December 2022",
  },
  {
    id: 4,
    account: "ES7921000813610123456789",
    amount: 2652299,
    bankId: 16,
    categoryId: 12,
    currency: "USD",
    date: new Date("2023-01-05"),
    reference: "Vendors - January 2023",
  },
  {
    id: 5,
    account: "GB33BUKB20201555555555",
    amount: 31214427,
    bankId: 17,
    categoryId: 14,
    currency: "GBP",
    date: new Date("2022-06-15"),
    reference: "British Taxes 2022",
  },
]

async function main() {
  categories.forEach(async (category) => {
    await prisma.category.create({ data: { ...category } })
  })
  
  banks.forEach(async (bank) => {
    return await prisma.bank.create({ data: { ...bank } })
  })

  const bankList = await prisma.bank.findMany();
  const categoryList = await prisma.category.findMany();
  const bankIds = bankList.map(item => item.id);
  const categoryIds = categoryList.map(item => item.id);

  transactions.forEach(async (tx, index) => {
    await prisma.transaction.create({ data: { 
      account: tx.account, 
      amount: tx.amount, 
      currency: tx.currency, 
      reference: tx.reference, 
      date: tx.date,
      category: { connect: { id: categoryIds[index] }}, 
      bank: { connect: { id: bankIds[index] } }
    } })
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })