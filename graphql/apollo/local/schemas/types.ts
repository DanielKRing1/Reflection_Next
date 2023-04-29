import { Dict } from "../../../../types/data";

type GqlTypeDefs = string;
type FieldPolicies = Dict<FieldPolicy>;
type FieldPolicy = {
    read: () => any;
};

export type SchemaFragment = {
    typeDefs: GqlTypeDefs;
    fieldPolicies: FieldPolicies;
};
