import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './config/graphql/schema/schema.graphql',
  documents: [
    './{pages,components,graphql,layout}/**/*.graphql',
    './{pages,components,graphql,layout}/**/*.ts',
    './{pages,components,graphql,layout}/**/*.vue',
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './config/graphql/': {
      plugins: [
        {
          add: {
            content:
              '// ⚠️⚠️⚠️ DO NOT EDIT ⚠️⚠️⚠️ \n// This file was automatically generated, run yarn generate to update it \n/* eslint-disable */ \n',
          },
        },
      ],
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
