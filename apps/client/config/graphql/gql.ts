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
    "\n      mutation UpdateCategory($categoryId: ID, $name: String!, $color: String!) {\n        updateCategory(categoryId: $categoryId, name: $name, color: $color) {\n          color\n          id\n          name\n        }\n      }\n    ": types.UpdateCategoryDocument,
    "\n      query Accounts {\n        accounts {\n          name\n        }\n      }\n    ": types.AccountsDocument,
    "\n      query Categories {\n        categories {\n          name\n        }\n      }\n    ": types.CategoriesDocument,
    "\n      query FindTransactionById($txId: ID) {\n        findTransactionById(txId: $txId) {\n          id\n          date\n          category {\n            id\n            name\n            color\n          }\n          amount\n          account {\n            id\n            name\n            bank\n          }\n          currency\n          reference\n        }\n      }\n    ": types.FindTransactionByIdDocument,
    "\n      query Transactions(\n        $bank: String\n        $account: String\n        $first: Int\n        $search: String\n        $category: String\n        $from: Date\n        $to: Date\n        $orderBy: String\n        $cursor: String\n      ) {\n        transactions(\n          bank: $bank\n          account: $account\n          first: $first\n          search: $search\n          category: $category\n          from: $from\n          to: $to\n          orderBy: $orderBy\n          cursor: $cursor\n        ) {\n          id\n          reference\n          amount\n          currency\n          date\n          account {\n            id\n            name\n            bank\n          }\n          category {\n            id\n            name\n            color\n          }\n        }\n      }\n    ": types.TransactionsDocument,
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
export function graphql(source: "\n      mutation UpdateCategory($categoryId: ID, $name: String!, $color: String!) {\n        updateCategory(categoryId: $categoryId, name: $name, color: $color) {\n          color\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCategory($categoryId: ID, $name: String!, $color: String!) {\n        updateCategory(categoryId: $categoryId, name: $name, color: $color) {\n          color\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Accounts {\n        accounts {\n          name\n        }\n      }\n    "): (typeof documents)["\n      query Accounts {\n        accounts {\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Categories {\n        categories {\n          name\n        }\n      }\n    "): (typeof documents)["\n      query Categories {\n        categories {\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query FindTransactionById($txId: ID) {\n        findTransactionById(txId: $txId) {\n          id\n          date\n          category {\n            id\n            name\n            color\n          }\n          amount\n          account {\n            id\n            name\n            bank\n          }\n          currency\n          reference\n        }\n      }\n    "): (typeof documents)["\n      query FindTransactionById($txId: ID) {\n        findTransactionById(txId: $txId) {\n          id\n          date\n          category {\n            id\n            name\n            color\n          }\n          amount\n          account {\n            id\n            name\n            bank\n          }\n          currency\n          reference\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Transactions(\n        $bank: String\n        $account: String\n        $first: Int\n        $search: String\n        $category: String\n        $from: Date\n        $to: Date\n        $orderBy: String\n        $cursor: String\n      ) {\n        transactions(\n          bank: $bank\n          account: $account\n          first: $first\n          search: $search\n          category: $category\n          from: $from\n          to: $to\n          orderBy: $orderBy\n          cursor: $cursor\n        ) {\n          id\n          reference\n          amount\n          currency\n          date\n          account {\n            id\n            name\n            bank\n          }\n          category {\n            id\n            name\n            color\n          }\n        }\n      }\n    "): (typeof documents)["\n      query Transactions(\n        $bank: String\n        $account: String\n        $first: Int\n        $search: String\n        $category: String\n        $from: Date\n        $to: Date\n        $orderBy: String\n        $cursor: String\n      ) {\n        transactions(\n          bank: $bank\n          account: $account\n          first: $first\n          search: $search\n          category: $category\n          from: $from\n          to: $to\n          orderBy: $orderBy\n          cursor: $cursor\n        ) {\n          id\n          reference\n          amount\n          currency\n          date\n          account {\n            id\n            name\n            bank\n          }\n          category {\n            id\n            name\n            color\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;