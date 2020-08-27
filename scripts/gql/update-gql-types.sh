yarn run apollo codegen:generate \
  --includes="src/**/*.{ts,tsx,gql,graphql}" \
  --globalTypesFile=src/types/graphql-types.ts \
  --localSchemaFile=graphql-schema.json \
  --target=typescript \
  --tagName=gql \
  --addTypename \
  --mergeInFieldsFromFragmentSpreads \
  --passthroughCustomScalars \
  --mergeInFieldsFromFragmentSpreads \
  types
