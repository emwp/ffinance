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
  Date: any;
};

export type Bank = {
  __typename?: 'Bank';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  banks?: Maybe<Array<Maybe<Bank>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};


export type QueryTransactionsArgs = {
  account?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  bank?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['Date']>;
  reference?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Date']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  account?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  bank?: Maybe<Bank>;
  bankId?: Maybe<Scalars['ID']>;
  categories?: Maybe<Category>;
  categoryId?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  reference?: Maybe<Scalars['String']>;
};

export type BanksQueryVariables = Exact<{ [key: string]: never; }>;


export type BanksQuery = { __typename?: 'Query', banks?: Array<{ __typename?: 'Bank', id?: string | null, name?: string | null } | null> | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id?: string | null, name?: string | null } | null> | null };

export type TransactionsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions?: Array<{ __typename?: 'Transaction', id?: string | null, reference?: string | null, account?: string | null, currency?: string | null, date?: any | null, bank?: { __typename?: 'Bank', id?: string | null, name?: string | null } | null, categories?: { __typename?: 'Category', id?: string | null, name?: string | null } | null } | null> | null };


export const BanksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Banks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<BanksQuery, BanksQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const TransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Transactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"account"}},{"kind":"Field","name":{"kind":"Name","value":"bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<TransactionsQuery, TransactionsQueryVariables>;