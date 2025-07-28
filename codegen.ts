import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const hasuraUrl = process.env.VITE_HASURA_GRAPHQL_URL;
const adminSecret = process.env.VITE_HASURA_ADMIN_SECRET;

if (!hasuraUrl) {
  throw new Error('VITE_HASURA_GRAPHQL_URL environment variable is required');
}

if (!adminSecret) {
  throw new Error('VITE_HASURA_ADMIN_SECRET environment variable is required');
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [hasuraUrl]: {
        headers: {
          'x-hasura-admin-secret': adminSecret,
        },
      },
    },
  ],
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: true,
        namingConvention: {
          typeNames: 'pascal-case#pascalCase',
          enumValues: 'upper-case#upperCase',
        },
        scalars: {
          uuid: 'string',
          timestamptz: 'string',
          jsonb: 'any',
        },
      },
    },
  },
};

export default config; 
