import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  generates: {
    './src/graphql/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
        scalars: { Date: 'Date' },
      },
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: 
            '// ⚠️⚠️⚠️ DO NOT EDIT ⚠️⚠️⚠️ \n// This file was automatically generated, run yarn generate to update it \n/* eslint-disable */ \n',
          },
        },
      ],
    },
  },
};

export default config;
