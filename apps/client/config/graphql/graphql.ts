/* eslint-disable */
// ⚠️⚠️⚠️ DO NOT EDIT ⚠️⚠️⚠️ 
// This file was automatically generated, run yarn generate to update it 
/* eslint-disable */ 

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};

export type Account = {
  __typename?: 'Account';
  name: Scalars['String'];
};

export type Bank = {
  __typename?: 'Bank';
  bank: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  name: Scalars['String'];
};

export type FullAccount = {
  __typename?: 'FullAccount';
  bank: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type FullCategory = {
  __typename?: 'FullCategory';
  color: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateCategory?: Maybe<FullCategory>;
};


export type MutationUpdateCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
  color: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  accounts?: Maybe<Array<Maybe<Account>>>;
  banks?: Maybe<Array<Maybe<Bank>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  findTransactionById?: Maybe<Transaction>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};


export type QueryFindTransactionByIdArgs = {
  txId?: InputMaybe<Scalars['ID']>;
};


export type QueryTransactionsArgs = {
  account?: InputMaybe<Scalars['String']>;
  bank?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Scalars['Date']>;
  orderBy?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Date']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  account: FullAccount;
  accountId: Scalars['ID'];
  amount: Scalars['Float'];
  category: FullCategory;
  categoryId: Scalars['ID'];
  currency: Scalars['String'];
  date: Scalars['Date'];
  id: Scalars['ID'];
  reference: Scalars['String'];
};

export type UpdateCategoryMutationVariables = Exact<{
  categoryId?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  color: Scalars['String'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'FullCategory', color: string, id: string, name: string } | null };

export type AccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountsQuery = { __typename?: 'Query', accounts?: Array<{ __typename?: 'Account', name: string } | null> | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', name: string } | null> | null };

export type FindTransactionByIdQueryVariables = Exact<{
  txId?: InputMaybe<Scalars['ID']>;
}>;


export type FindTransactionByIdQuery = { __typename?: 'Query', findTransactionById?: { __typename?: 'Transaction', id: string, date: any, amount: number, currency: string, reference: string, category: { __typename?: 'FullCategory', id: string, name: string, color: string }, account: { __typename?: 'FullAccount', id: string, name: string, bank: string } } | null };

export type TransactionsQueryVariables = Exact<{
  bank?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['Date']>;
  to?: InputMaybe<Scalars['Date']>;
  orderBy?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions?: Array<{ __typename?: 'Transaction', id: string, reference: string, amount: number, currency: string, date: any, account: { __typename?: 'FullAccount', id: string, name: string, bank: string }, category: { __typename?: 'FullCategory', id: string, name: string, color: string } } | null> | null };


export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const AccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AccountsQuery, AccountsQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const FindTransactionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindTransactionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"txId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findTransactionById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"txId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"txId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bank"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<FindTransactionByIdQuery, FindTransactionByIdQueryVariables>;
export const TransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Transactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bank"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bank"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bank"}}},{"kind":"Argument","name":{"kind":"Name","value":"account"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bank"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<TransactionsQuery, TransactionsQueryVariables>;