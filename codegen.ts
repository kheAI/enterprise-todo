// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3333/graphql', // fetch schema from running server
  documents: ['apps/web/src/**/*.ts', 'apps/web/src/**/*.tsx'],
  generates: {
    'apps/web/src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true, // generate useQuery/useMutation hooks
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
