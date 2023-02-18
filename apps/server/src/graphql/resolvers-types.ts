// ⚠️⚠️⚠️ DO NOT EDIT ⚠️⚠️⚠️ 
// This file was automatically generated, run yarn generate to update it 
/* eslint-disable */ 

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  Date: Date;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Bank: ResolverTypeWrapper<Bank>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Transaction: ResolverTypeWrapper<Transaction>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Bank: Bank;
  Boolean: Scalars['Boolean'];
  Category: Category;
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Query: {};
  String: Scalars['String'];
  Transaction: Transaction;
}>;

export type BankResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bank'] = ResolversParentTypes['Bank']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  banks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bank']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  transactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Transaction']>>>, ParentType, ContextType, Partial<QueryTransactionsArgs>>;
}>;

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  account?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bank?: Resolver<Maybe<ResolversTypes['Bank']>, ParentType, ContextType>;
  bankId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  reference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Bank?: BankResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
}>;

