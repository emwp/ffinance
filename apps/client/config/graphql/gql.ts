/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n      query Banks {\n        banks {\n          id\n          name\n        }\n      }\n    ": types.BanksDocument,
    "\n      query Categories {\n        categories {\n          id\n          name\n        }\n      }\n    ": types.CategoriesDocument,
    "\n      query Transactions($search: String, $category: String, $bank: String, $account: String, $from: Date, $to: Date) {\n        transactions(search: $search, category: $category, bank: $bank, account: $account, from: $from, to: $to) {\n          id\n          reference\n          account\n          amount\n          currency\n          bank {\n            name\n          }\n          categories {\n            name\n          }\n        }\n      }\n    ": types.TransactionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Banks {\n        banks {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      query Banks {\n        banks {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Categories {\n        categories {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      query Categories {\n        categories {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Transactions($search: String, $category: String, $bank: String, $account: String, $from: Date, $to: Date) {\n        transactions(search: $search, category: $category, bank: $bank, account: $account, from: $from, to: $to) {\n          id\n          reference\n          account\n          amount\n          currency\n          bank {\n            name\n          }\n          categories {\n            name\n          }\n        }\n      }\n    "): (typeof documents)["\n      query Transactions($search: String, $category: String, $bank: String, $account: String, $from: Date, $to: Date) {\n        transactions(search: $search, category: $category, bank: $bank, account: $account, from: $from, to: $to) {\n          id\n          reference\n          account\n          amount\n          currency\n          bank {\n            name\n          }\n          categories {\n            name\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;