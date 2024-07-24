import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['sessionToken','userId','expires','createdAt','updatedAt']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const ExerciseScalarFieldEnumSchema = z.enum(['slug','name','force','level','mechanic','equipment','primaryMuscles','secondaryMuscles','instructions','category','images']);

export const LoggedExerciseScalarFieldEnumSchema = z.enum(['id','exerciseSlug','logId']);

export const TypedSetScalarFieldEnumSchema = z.enum(['id','type','loggedExerciseId','weight','reps','distance','minutes','seconds']);

export const LogScalarFieldEnumSchema = z.enum(['id','date','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const SetTypeSchema = z.enum(['WEIGHT_REPS','TIME_DISTANCE']);

export type SetTypeType = `${z.infer<typeof SetTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// EXERCISE SCHEMA
/////////////////////////////////////////

export const ExerciseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  force: z.string().nullable(),
  level: z.string(),
  mechanic: z.string().nullable(),
  equipment: z.string().nullable(),
  primaryMuscles: z.string().array(),
  secondaryMuscles: z.string().array(),
  instructions: z.string().array(),
  category: z.string(),
  images: z.string().array(),
})

export type Exercise = z.infer<typeof ExerciseSchema>

/////////////////////////////////////////
// LOGGED EXERCISE SCHEMA
/////////////////////////////////////////

export const LoggedExerciseSchema = z.object({
  id: z.string().uuid(),
  exerciseSlug: z.string(),
  logId: z.string().nullable(),
})

export type LoggedExercise = z.infer<typeof LoggedExerciseSchema>

/////////////////////////////////////////
// TYPED SET SCHEMA
/////////////////////////////////////////

export const TypedSetSchema = z.object({
  type: SetTypeSchema,
  id: z.string().uuid(),
  loggedExerciseId: z.string().nullable(),
  weight: z.number().int(),
  reps: z.number().int(),
  distance: z.string(),
  minutes: z.number().int(),
  seconds: z.number().int(),
})

export type TypedSet = z.infer<typeof TypedSetSchema>

/////////////////////////////////////////
// LOG SCHEMA
/////////////////////////////////////////

export const LogSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  userId: z.string(),
})

export type Log = z.infer<typeof LogSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  logs: z.union([z.boolean(),z.lazy(() => LogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  logs: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  logs: z.union([z.boolean(),z.lazy(() => LogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// EXERCISE
//------------------------------------------------------

export const ExerciseIncludeSchema: z.ZodType<Prisma.ExerciseInclude> = z.object({
  LoggedExercise: z.union([z.boolean(),z.lazy(() => LoggedExerciseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ExerciseArgsSchema: z.ZodType<Prisma.ExerciseDefaultArgs> = z.object({
  select: z.lazy(() => ExerciseSelectSchema).optional(),
  include: z.lazy(() => ExerciseIncludeSchema).optional(),
}).strict();

export const ExerciseCountOutputTypeArgsSchema: z.ZodType<Prisma.ExerciseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ExerciseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ExerciseCountOutputTypeSelectSchema: z.ZodType<Prisma.ExerciseCountOutputTypeSelect> = z.object({
  LoggedExercise: z.boolean().optional(),
}).strict();

export const ExerciseSelectSchema: z.ZodType<Prisma.ExerciseSelect> = z.object({
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  force: z.boolean().optional(),
  level: z.boolean().optional(),
  mechanic: z.boolean().optional(),
  equipment: z.boolean().optional(),
  primaryMuscles: z.boolean().optional(),
  secondaryMuscles: z.boolean().optional(),
  instructions: z.boolean().optional(),
  category: z.boolean().optional(),
  images: z.boolean().optional(),
  LoggedExercise: z.union([z.boolean(),z.lazy(() => LoggedExerciseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOGGED EXERCISE
//------------------------------------------------------

export const LoggedExerciseIncludeSchema: z.ZodType<Prisma.LoggedExerciseInclude> = z.object({
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
  log: z.union([z.boolean(),z.lazy(() => LogArgsSchema)]).optional(),
  sets: z.union([z.boolean(),z.lazy(() => TypedSetFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LoggedExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LoggedExerciseArgsSchema: z.ZodType<Prisma.LoggedExerciseDefaultArgs> = z.object({
  select: z.lazy(() => LoggedExerciseSelectSchema).optional(),
  include: z.lazy(() => LoggedExerciseIncludeSchema).optional(),
}).strict();

export const LoggedExerciseCountOutputTypeArgsSchema: z.ZodType<Prisma.LoggedExerciseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LoggedExerciseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LoggedExerciseCountOutputTypeSelectSchema: z.ZodType<Prisma.LoggedExerciseCountOutputTypeSelect> = z.object({
  sets: z.boolean().optional(),
}).strict();

export const LoggedExerciseSelectSchema: z.ZodType<Prisma.LoggedExerciseSelect> = z.object({
  id: z.boolean().optional(),
  exerciseSlug: z.boolean().optional(),
  logId: z.boolean().optional(),
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
  log: z.union([z.boolean(),z.lazy(() => LogArgsSchema)]).optional(),
  sets: z.union([z.boolean(),z.lazy(() => TypedSetFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LoggedExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TYPED SET
//------------------------------------------------------

export const TypedSetIncludeSchema: z.ZodType<Prisma.TypedSetInclude> = z.object({
  loggedExercise: z.union([z.boolean(),z.lazy(() => LoggedExerciseArgsSchema)]).optional(),
}).strict()

export const TypedSetArgsSchema: z.ZodType<Prisma.TypedSetDefaultArgs> = z.object({
  select: z.lazy(() => TypedSetSelectSchema).optional(),
  include: z.lazy(() => TypedSetIncludeSchema).optional(),
}).strict();

export const TypedSetSelectSchema: z.ZodType<Prisma.TypedSetSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  loggedExerciseId: z.boolean().optional(),
  weight: z.boolean().optional(),
  reps: z.boolean().optional(),
  distance: z.boolean().optional(),
  minutes: z.boolean().optional(),
  seconds: z.boolean().optional(),
  loggedExercise: z.union([z.boolean(),z.lazy(() => LoggedExerciseArgsSchema)]).optional(),
}).strict()

// LOG
//------------------------------------------------------

export const LogIncludeSchema: z.ZodType<Prisma.LogInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  exercises: z.union([z.boolean(),z.lazy(() => LoggedExerciseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LogCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LogArgsSchema: z.ZodType<Prisma.LogDefaultArgs> = z.object({
  select: z.lazy(() => LogSelectSchema).optional(),
  include: z.lazy(() => LogIncludeSchema).optional(),
}).strict();

export const LogCountOutputTypeArgsSchema: z.ZodType<Prisma.LogCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LogCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LogCountOutputTypeSelectSchema: z.ZodType<Prisma.LogCountOutputTypeSelect> = z.object({
  exercises: z.boolean().optional(),
}).strict();

export const LogSelectSchema: z.ZodType<Prisma.LogSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  exercises: z.union([z.boolean(),z.lazy(() => LoggedExerciseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LogCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  logs: z.lazy(() => LogListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  logs: z.lazy(() => LogOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  logs: z.lazy(() => LogListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
})
.and(z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  sessionToken: z.string()
})
.and(z.object({
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
})
.and(z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ExerciseWhereInputSchema: z.ZodType<Prisma.ExerciseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  force: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mechanic: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  equipment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  primaryMuscles: z.lazy(() => StringNullableListFilterSchema).optional(),
  secondaryMuscles: z.lazy(() => StringNullableListFilterSchema).optional(),
  instructions: z.lazy(() => StringNullableListFilterSchema).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  LoggedExercise: z.lazy(() => LoggedExerciseListRelationFilterSchema).optional()
}).strict();

export const ExerciseOrderByWithRelationInputSchema: z.ZodType<Prisma.ExerciseOrderByWithRelationInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  force: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  mechanic: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  equipment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  primaryMuscles: z.lazy(() => SortOrderSchema).optional(),
  secondaryMuscles: z.lazy(() => SortOrderSchema).optional(),
  instructions: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  LoggedExercise: z.lazy(() => LoggedExerciseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ExerciseWhereUniqueInputSchema: z.ZodType<Prisma.ExerciseWhereUniqueInput> = z.object({
  slug: z.string()
})
.and(z.object({
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  force: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mechanic: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  equipment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  primaryMuscles: z.lazy(() => StringNullableListFilterSchema).optional(),
  secondaryMuscles: z.lazy(() => StringNullableListFilterSchema).optional(),
  instructions: z.lazy(() => StringNullableListFilterSchema).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  LoggedExercise: z.lazy(() => LoggedExerciseListRelationFilterSchema).optional()
}).strict());

export const ExerciseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExerciseOrderByWithAggregationInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  force: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  mechanic: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  equipment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  primaryMuscles: z.lazy(() => SortOrderSchema).optional(),
  secondaryMuscles: z.lazy(() => SortOrderSchema).optional(),
  instructions: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExerciseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExerciseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExerciseMinOrderByAggregateInputSchema).optional()
}).strict();

export const ExerciseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExerciseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  force: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  level: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mechanic: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  equipment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  primaryMuscles: z.lazy(() => StringNullableListFilterSchema).optional(),
  secondaryMuscles: z.lazy(() => StringNullableListFilterSchema).optional(),
  instructions: z.lazy(() => StringNullableListFilterSchema).optional(),
  category: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const LoggedExerciseWhereInputSchema: z.ZodType<Prisma.LoggedExerciseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LoggedExerciseWhereInputSchema),z.lazy(() => LoggedExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoggedExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoggedExerciseWhereInputSchema),z.lazy(() => LoggedExerciseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseSlug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  exercise: z.union([ z.lazy(() => ExerciseNullableRelationFilterSchema),z.lazy(() => ExerciseWhereInputSchema) ]).optional().nullable(),
  log: z.union([ z.lazy(() => LogNullableRelationFilterSchema),z.lazy(() => LogWhereInputSchema) ]).optional().nullable(),
  sets: z.lazy(() => TypedSetListRelationFilterSchema).optional()
}).strict();

export const LoggedExerciseOrderByWithRelationInputSchema: z.ZodType<Prisma.LoggedExerciseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  exerciseSlug: z.lazy(() => SortOrderSchema).optional(),
  logId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  exercise: z.lazy(() => ExerciseOrderByWithRelationInputSchema).optional(),
  log: z.lazy(() => LogOrderByWithRelationInputSchema).optional(),
  sets: z.lazy(() => TypedSetOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LoggedExerciseWhereUniqueInputSchema: z.ZodType<Prisma.LoggedExerciseWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => LoggedExerciseWhereInputSchema),z.lazy(() => LoggedExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoggedExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoggedExerciseWhereInputSchema),z.lazy(() => LoggedExerciseWhereInputSchema).array() ]).optional(),
  exerciseSlug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  exercise: z.union([ z.lazy(() => ExerciseNullableRelationFilterSchema),z.lazy(() => ExerciseWhereInputSchema) ]).optional().nullable(),
  log: z.union([ z.lazy(() => LogNullableRelationFilterSchema),z.lazy(() => LogWhereInputSchema) ]).optional().nullable(),
  sets: z.lazy(() => TypedSetListRelationFilterSchema).optional()
}).strict());

export const LoggedExerciseOrderByWithAggregationInputSchema: z.ZodType<Prisma.LoggedExerciseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  exerciseSlug: z.lazy(() => SortOrderSchema).optional(),
  logId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LoggedExerciseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LoggedExerciseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LoggedExerciseMinOrderByAggregateInputSchema).optional()
}).strict();

export const LoggedExerciseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LoggedExerciseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LoggedExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => LoggedExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoggedExerciseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoggedExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => LoggedExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  exerciseSlug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  logId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TypedSetWhereInputSchema: z.ZodType<Prisma.TypedSetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TypedSetWhereInputSchema),z.lazy(() => TypedSetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TypedSetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TypedSetWhereInputSchema),z.lazy(() => TypedSetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSetTypeFilterSchema),z.lazy(() => SetTypeSchema) ]).optional(),
  loggedExerciseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  distance: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  minutes: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  seconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  loggedExercise: z.union([ z.lazy(() => LoggedExerciseNullableRelationFilterSchema),z.lazy(() => LoggedExerciseWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TypedSetOrderByWithRelationInputSchema: z.ZodType<Prisma.TypedSetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  loggedExerciseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  minutes: z.lazy(() => SortOrderSchema).optional(),
  seconds: z.lazy(() => SortOrderSchema).optional(),
  loggedExercise: z.lazy(() => LoggedExerciseOrderByWithRelationInputSchema).optional()
}).strict();

export const TypedSetWhereUniqueInputSchema: z.ZodType<Prisma.TypedSetWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => TypedSetWhereInputSchema),z.lazy(() => TypedSetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TypedSetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TypedSetWhereInputSchema),z.lazy(() => TypedSetWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumSetTypeFilterSchema),z.lazy(() => SetTypeSchema) ]).optional(),
  loggedExerciseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  distance: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  minutes: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  seconds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  loggedExercise: z.union([ z.lazy(() => LoggedExerciseNullableRelationFilterSchema),z.lazy(() => LoggedExerciseWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TypedSetOrderByWithAggregationInputSchema: z.ZodType<Prisma.TypedSetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  loggedExerciseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  minutes: z.lazy(() => SortOrderSchema).optional(),
  seconds: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TypedSetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TypedSetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TypedSetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TypedSetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TypedSetSumOrderByAggregateInputSchema).optional()
}).strict();

export const TypedSetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TypedSetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TypedSetScalarWhereWithAggregatesInputSchema),z.lazy(() => TypedSetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TypedSetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TypedSetScalarWhereWithAggregatesInputSchema),z.lazy(() => TypedSetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSetTypeWithAggregatesFilterSchema),z.lazy(() => SetTypeSchema) ]).optional(),
  loggedExerciseId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  distance: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  minutes: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  seconds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const LogWhereInputSchema: z.ZodType<Prisma.LogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  exercises: z.lazy(() => LoggedExerciseListRelationFilterSchema).optional()
}).strict();

export const LogOrderByWithRelationInputSchema: z.ZodType<Prisma.LogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  exercises: z.lazy(() => LoggedExerciseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LogWhereUniqueInputSchema: z.ZodType<Prisma.LogWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    date: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    date: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  date: z.string().optional(),
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  exercises: z.lazy(() => LoggedExerciseListRelationFilterSchema).optional()
}).strict());

export const LogOrderByWithAggregationInputSchema: z.ZodType<Prisma.LogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LogMinOrderByAggregateInputSchema).optional()
}).strict();

export const LogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  logs: z.lazy(() => LogCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  logs: z.lazy(() => LogUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  logs: z.lazy(() => LogUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  logs: z.lazy(() => LogUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseCreateInputSchema: z.ZodType<Prisma.ExerciseCreateInput> = z.object({
  slug: z.string(),
  name: z.string(),
  force: z.string().optional().nullable(),
  level: z.string(),
  mechanic: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseCreateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseCreatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseCreateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.string(),
  images: z.union([ z.lazy(() => ExerciseCreateimagesInputSchema),z.string().array() ]).optional(),
  LoggedExercise: z.lazy(() => LoggedExerciseCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseUncheckedCreateInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateInput> = z.object({
  slug: z.string(),
  name: z.string(),
  force: z.string().optional().nullable(),
  level: z.string(),
  mechanic: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseCreateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseCreatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseCreateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.string(),
  images: z.union([ z.lazy(() => ExerciseCreateimagesInputSchema),z.string().array() ]).optional(),
  LoggedExercise: z.lazy(() => LoggedExerciseUncheckedCreateNestedManyWithoutExerciseInputSchema).optional()
}).strict();

export const ExerciseUpdateInputSchema: z.ZodType<Prisma.ExerciseUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  force: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mechanic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseUpdateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseUpdatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseUpdateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ExerciseUpdateimagesInputSchema),z.string().array() ]).optional(),
  LoggedExercise: z.lazy(() => LoggedExerciseUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseUncheckedUpdateInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  force: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mechanic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseUpdateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseUpdatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseUpdateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ExerciseUpdateimagesInputSchema),z.string().array() ]).optional(),
  LoggedExercise: z.lazy(() => LoggedExerciseUncheckedUpdateManyWithoutExerciseNestedInputSchema).optional()
}).strict();

export const ExerciseCreateManyInputSchema: z.ZodType<Prisma.ExerciseCreateManyInput> = z.object({
  slug: z.string(),
  name: z.string(),
  force: z.string().optional().nullable(),
  level: z.string(),
  mechanic: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseCreateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseCreatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseCreateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.string(),
  images: z.union([ z.lazy(() => ExerciseCreateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ExerciseUpdateManyMutationInputSchema: z.ZodType<Prisma.ExerciseUpdateManyMutationInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  force: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mechanic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseUpdateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseUpdatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseUpdateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ExerciseUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  force: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mechanic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseUpdateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseUpdatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseUpdateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ExerciseUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const LoggedExerciseCreateInputSchema: z.ZodType<Prisma.LoggedExerciseCreateInput> = z.object({
  id: z.string().uuid().optional(),
  exercise: z.lazy(() => ExerciseCreateNestedOneWithoutLoggedExerciseInputSchema).optional(),
  log: z.lazy(() => LogCreateNestedOneWithoutExercisesInputSchema).optional(),
  sets: z.lazy(() => TypedSetCreateNestedManyWithoutLoggedExerciseInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedCreateInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  exerciseSlug: z.string(),
  logId: z.string().optional().nullable(),
  sets: z.lazy(() => TypedSetUncheckedCreateNestedManyWithoutLoggedExerciseInputSchema).optional()
}).strict();

export const LoggedExerciseUpdateInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercise: z.lazy(() => ExerciseUpdateOneWithoutLoggedExerciseNestedInputSchema).optional(),
  log: z.lazy(() => LogUpdateOneWithoutExercisesNestedInputSchema).optional(),
  sets: z.lazy(() => TypedSetUpdateManyWithoutLoggedExerciseNestedInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedUpdateInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseSlug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sets: z.lazy(() => TypedSetUncheckedUpdateManyWithoutLoggedExerciseNestedInputSchema).optional()
}).strict();

export const LoggedExerciseCreateManyInputSchema: z.ZodType<Prisma.LoggedExerciseCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  exerciseSlug: z.string(),
  logId: z.string().optional().nullable()
}).strict();

export const LoggedExerciseUpdateManyMutationInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoggedExerciseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseSlug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TypedSetCreateInputSchema: z.ZodType<Prisma.TypedSetCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => SetTypeSchema).optional(),
  weight: z.number().int(),
  reps: z.number().int(),
  distance: z.string(),
  minutes: z.number().int(),
  seconds: z.number().int(),
  loggedExercise: z.lazy(() => LoggedExerciseCreateNestedOneWithoutSetsInputSchema).optional()
}).strict();

export const TypedSetUncheckedCreateInputSchema: z.ZodType<Prisma.TypedSetUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => SetTypeSchema).optional(),
  loggedExerciseId: z.string().optional().nullable(),
  weight: z.number().int(),
  reps: z.number().int(),
  distance: z.string(),
  minutes: z.number().int(),
  seconds: z.number().int()
}).strict();

export const TypedSetUpdateInputSchema: z.ZodType<Prisma.TypedSetUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => EnumSetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  seconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loggedExercise: z.lazy(() => LoggedExerciseUpdateOneWithoutSetsNestedInputSchema).optional()
}).strict();

export const TypedSetUncheckedUpdateInputSchema: z.ZodType<Prisma.TypedSetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => EnumSetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  loggedExerciseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  seconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypedSetCreateManyInputSchema: z.ZodType<Prisma.TypedSetCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => SetTypeSchema).optional(),
  loggedExerciseId: z.string().optional().nullable(),
  weight: z.number().int(),
  reps: z.number().int(),
  distance: z.string(),
  minutes: z.number().int(),
  seconds: z.number().int()
}).strict();

export const TypedSetUpdateManyMutationInputSchema: z.ZodType<Prisma.TypedSetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => EnumSetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  seconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypedSetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TypedSetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => EnumSetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  loggedExerciseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  seconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogCreateInputSchema: z.ZodType<Prisma.LogCreateInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutLogsInputSchema),
  exercises: z.lazy(() => LoggedExerciseCreateNestedManyWithoutLogInputSchema).optional()
}).strict();

export const LogUncheckedCreateInputSchema: z.ZodType<Prisma.LogUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  userId: z.string(),
  exercises: z.lazy(() => LoggedExerciseUncheckedCreateNestedManyWithoutLogInputSchema).optional()
}).strict();

export const LogUpdateInputSchema: z.ZodType<Prisma.LogUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLogsNestedInputSchema).optional(),
  exercises: z.lazy(() => LoggedExerciseUpdateManyWithoutLogNestedInputSchema).optional()
}).strict();

export const LogUncheckedUpdateInputSchema: z.ZodType<Prisma.LogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => LoggedExerciseUncheckedUpdateManyWithoutLogNestedInputSchema).optional()
}).strict();

export const LogCreateManyInputSchema: z.ZodType<Prisma.LogCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  userId: z.string()
}).strict();

export const LogUpdateManyMutationInputSchema: z.ZodType<Prisma.LogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const LogListRelationFilterSchema: z.ZodType<Prisma.LogListRelationFilter> = z.object({
  every: z.lazy(() => LogWhereInputSchema).optional(),
  some: z.lazy(() => LogWhereInputSchema).optional(),
  none: z.lazy(() => LogWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const LoggedExerciseListRelationFilterSchema: z.ZodType<Prisma.LoggedExerciseListRelationFilter> = z.object({
  every: z.lazy(() => LoggedExerciseWhereInputSchema).optional(),
  some: z.lazy(() => LoggedExerciseWhereInputSchema).optional(),
  none: z.lazy(() => LoggedExerciseWhereInputSchema).optional()
}).strict();

export const LoggedExerciseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LoggedExerciseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseCountOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  force: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  mechanic: z.lazy(() => SortOrderSchema).optional(),
  equipment: z.lazy(() => SortOrderSchema).optional(),
  primaryMuscles: z.lazy(() => SortOrderSchema).optional(),
  secondaryMuscles: z.lazy(() => SortOrderSchema).optional(),
  instructions: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseMaxOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  force: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  mechanic: z.lazy(() => SortOrderSchema).optional(),
  equipment: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseMinOrderByAggregateInput> = z.object({
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  force: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  mechanic: z.lazy(() => SortOrderSchema).optional(),
  equipment: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseNullableRelationFilterSchema: z.ZodType<Prisma.ExerciseNullableRelationFilter> = z.object({
  is: z.lazy(() => ExerciseWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ExerciseWhereInputSchema).optional().nullable()
}).strict();

export const LogNullableRelationFilterSchema: z.ZodType<Prisma.LogNullableRelationFilter> = z.object({
  is: z.lazy(() => LogWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LogWhereInputSchema).optional().nullable()
}).strict();

export const TypedSetListRelationFilterSchema: z.ZodType<Prisma.TypedSetListRelationFilter> = z.object({
  every: z.lazy(() => TypedSetWhereInputSchema).optional(),
  some: z.lazy(() => TypedSetWhereInputSchema).optional(),
  none: z.lazy(() => TypedSetWhereInputSchema).optional()
}).strict();

export const TypedSetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TypedSetOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LoggedExerciseCountOrderByAggregateInputSchema: z.ZodType<Prisma.LoggedExerciseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  exerciseSlug: z.lazy(() => SortOrderSchema).optional(),
  logId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LoggedExerciseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LoggedExerciseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  exerciseSlug: z.lazy(() => SortOrderSchema).optional(),
  logId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LoggedExerciseMinOrderByAggregateInputSchema: z.ZodType<Prisma.LoggedExerciseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  exerciseSlug: z.lazy(() => SortOrderSchema).optional(),
  logId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSetTypeFilterSchema: z.ZodType<Prisma.EnumSetTypeFilter> = z.object({
  equals: z.lazy(() => SetTypeSchema).optional(),
  in: z.lazy(() => SetTypeSchema).array().optional(),
  notIn: z.lazy(() => SetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => NestedEnumSetTypeFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const LoggedExerciseNullableRelationFilterSchema: z.ZodType<Prisma.LoggedExerciseNullableRelationFilter> = z.object({
  is: z.lazy(() => LoggedExerciseWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LoggedExerciseWhereInputSchema).optional().nullable()
}).strict();

export const TypedSetCountOrderByAggregateInputSchema: z.ZodType<Prisma.TypedSetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  loggedExerciseId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  minutes: z.lazy(() => SortOrderSchema).optional(),
  seconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypedSetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TypedSetAvgOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  minutes: z.lazy(() => SortOrderSchema).optional(),
  seconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypedSetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TypedSetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  loggedExerciseId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  minutes: z.lazy(() => SortOrderSchema).optional(),
  seconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypedSetMinOrderByAggregateInputSchema: z.ZodType<Prisma.TypedSetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  loggedExerciseId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  minutes: z.lazy(() => SortOrderSchema).optional(),
  seconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TypedSetSumOrderByAggregateInputSchema: z.ZodType<Prisma.TypedSetSumOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  minutes: z.lazy(() => SortOrderSchema).optional(),
  seconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SetTypeSchema).optional(),
  in: z.lazy(() => SetTypeSchema).array().optional(),
  notIn: z.lazy(() => SetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => NestedEnumSetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSetTypeFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const LogCountOrderByAggregateInputSchema: z.ZodType<Prisma.LogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogMinOrderByAggregateInputSchema: z.ZodType<Prisma.LogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LogCreateWithoutUserInputSchema),z.lazy(() => LogCreateWithoutUserInputSchema).array(),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogCreateOrConnectWithoutUserInputSchema),z.lazy(() => LogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LogUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LogCreateWithoutUserInputSchema),z.lazy(() => LogCreateWithoutUserInputSchema).array(),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogCreateOrConnectWithoutUserInputSchema),z.lazy(() => LogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LogUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LogCreateWithoutUserInputSchema),z.lazy(() => LogCreateWithoutUserInputSchema).array(),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogCreateOrConnectWithoutUserInputSchema),z.lazy(() => LogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LogScalarWhereInputSchema),z.lazy(() => LogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LogUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LogCreateWithoutUserInputSchema),z.lazy(() => LogCreateWithoutUserInputSchema).array(),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogCreateOrConnectWithoutUserInputSchema),z.lazy(() => LogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LogWhereUniqueInputSchema),z.lazy(() => LogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LogScalarWhereInputSchema),z.lazy(() => LogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const ExerciseCreateprimaryMusclesInputSchema: z.ZodType<Prisma.ExerciseCreateprimaryMusclesInput> = z.object({
  set: z.string().array()
}).strict();

export const ExerciseCreatesecondaryMusclesInputSchema: z.ZodType<Prisma.ExerciseCreatesecondaryMusclesInput> = z.object({
  set: z.string().array()
}).strict();

export const ExerciseCreateinstructionsInputSchema: z.ZodType<Prisma.ExerciseCreateinstructionsInput> = z.object({
  set: z.string().array()
}).strict();

export const ExerciseCreateimagesInputSchema: z.ZodType<Prisma.ExerciseCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const LoggedExerciseCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LoggedExerciseUncheckedCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExerciseUpdateprimaryMusclesInputSchema: z.ZodType<Prisma.ExerciseUpdateprimaryMusclesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ExerciseUpdatesecondaryMusclesInputSchema: z.ZodType<Prisma.ExerciseUpdatesecondaryMusclesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ExerciseUpdateinstructionsInputSchema: z.ZodType<Prisma.ExerciseUpdateinstructionsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ExerciseUpdateimagesInputSchema: z.ZodType<Prisma.ExerciseUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const LoggedExerciseUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LoggedExerciseScalarWhereInputSchema),z.lazy(() => LoggedExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LoggedExerciseUncheckedUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LoggedExerciseScalarWhereInputSchema),z.lazy(() => LoggedExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExerciseCreateNestedOneWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseCreateNestedOneWithoutLoggedExerciseInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutLoggedExerciseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutLoggedExerciseInputSchema).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional()
}).strict();

export const LogCreateNestedOneWithoutExercisesInputSchema: z.ZodType<Prisma.LogCreateNestedOneWithoutExercisesInput> = z.object({
  create: z.union([ z.lazy(() => LogCreateWithoutExercisesInputSchema),z.lazy(() => LogUncheckedCreateWithoutExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LogCreateOrConnectWithoutExercisesInputSchema).optional(),
  connect: z.lazy(() => LogWhereUniqueInputSchema).optional()
}).strict();

export const TypedSetCreateNestedManyWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetCreateNestedManyWithoutLoggedExerciseInput> = z.object({
  create: z.union([ z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema).array(),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TypedSetCreateManyLoggedExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TypedSetUncheckedCreateNestedManyWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUncheckedCreateNestedManyWithoutLoggedExerciseInput> = z.object({
  create: z.union([ z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema).array(),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TypedSetCreateManyLoggedExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExerciseUpdateOneWithoutLoggedExerciseNestedInputSchema: z.ZodType<Prisma.ExerciseUpdateOneWithoutLoggedExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutLoggedExerciseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutLoggedExerciseInputSchema).optional(),
  upsert: z.lazy(() => ExerciseUpsertWithoutLoggedExerciseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateToOneWithWhereWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUpdateWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutLoggedExerciseInputSchema) ]).optional(),
}).strict();

export const LogUpdateOneWithoutExercisesNestedInputSchema: z.ZodType<Prisma.LogUpdateOneWithoutExercisesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LogCreateWithoutExercisesInputSchema),z.lazy(() => LogUncheckedCreateWithoutExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LogCreateOrConnectWithoutExercisesInputSchema).optional(),
  upsert: z.lazy(() => LogUpsertWithoutExercisesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LogWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LogWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LogUpdateToOneWithWhereWithoutExercisesInputSchema),z.lazy(() => LogUpdateWithoutExercisesInputSchema),z.lazy(() => LogUncheckedUpdateWithoutExercisesInputSchema) ]).optional(),
}).strict();

export const TypedSetUpdateManyWithoutLoggedExerciseNestedInputSchema: z.ZodType<Prisma.TypedSetUpdateManyWithoutLoggedExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema).array(),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TypedSetUpsertWithWhereUniqueWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUpsertWithWhereUniqueWithoutLoggedExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TypedSetCreateManyLoggedExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TypedSetUpdateWithWhereUniqueWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUpdateWithWhereUniqueWithoutLoggedExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TypedSetUpdateManyWithWhereWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUpdateManyWithWhereWithoutLoggedExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TypedSetScalarWhereInputSchema),z.lazy(() => TypedSetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TypedSetUncheckedUpdateManyWithoutLoggedExerciseNestedInputSchema: z.ZodType<Prisma.TypedSetUncheckedUpdateManyWithoutLoggedExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema).array(),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TypedSetUpsertWithWhereUniqueWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUpsertWithWhereUniqueWithoutLoggedExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TypedSetCreateManyLoggedExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TypedSetWhereUniqueInputSchema),z.lazy(() => TypedSetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TypedSetUpdateWithWhereUniqueWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUpdateWithWhereUniqueWithoutLoggedExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TypedSetUpdateManyWithWhereWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUpdateManyWithWhereWithoutLoggedExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TypedSetScalarWhereInputSchema),z.lazy(() => TypedSetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LoggedExerciseCreateNestedOneWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseCreateNestedOneWithoutSetsInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutSetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LoggedExerciseCreateOrConnectWithoutSetsInputSchema).optional(),
  connect: z.lazy(() => LoggedExerciseWhereUniqueInputSchema).optional()
}).strict();

export const EnumSetTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSetTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SetTypeSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const LoggedExerciseUpdateOneWithoutSetsNestedInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateOneWithoutSetsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutSetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LoggedExerciseCreateOrConnectWithoutSetsInputSchema).optional(),
  upsert: z.lazy(() => LoggedExerciseUpsertWithoutSetsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LoggedExerciseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LoggedExerciseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LoggedExerciseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LoggedExerciseUpdateToOneWithWhereWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUpdateWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateWithoutSetsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const LoggedExerciseCreateNestedManyWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseCreateNestedManyWithoutLogInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyLogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LoggedExerciseUncheckedCreateNestedManyWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedCreateNestedManyWithoutLogInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyLogInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLogsInputSchema),z.lazy(() => UserUpdateWithoutLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLogsInputSchema) ]).optional(),
}).strict();

export const LoggedExerciseUpdateManyWithoutLogNestedInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateManyWithoutLogNestedInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutLogInputSchema),z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutLogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyLogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutLogInputSchema),z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutLogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutLogInputSchema),z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutLogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LoggedExerciseScalarWhereInputSchema),z.lazy(() => LoggedExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LoggedExerciseUncheckedUpdateManyWithoutLogNestedInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateManyWithoutLogNestedInput> = z.object({
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema).array(),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema),z.lazy(() => LoggedExerciseCreateOrConnectWithoutLogInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutLogInputSchema),z.lazy(() => LoggedExerciseUpsertWithWhereUniqueWithoutLogInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LoggedExerciseCreateManyLogInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LoggedExerciseWhereUniqueInputSchema),z.lazy(() => LoggedExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutLogInputSchema),z.lazy(() => LoggedExerciseUpdateWithWhereUniqueWithoutLogInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutLogInputSchema),z.lazy(() => LoggedExerciseUpdateManyWithWhereWithoutLogInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LoggedExerciseScalarWhereInputSchema),z.lazy(() => LoggedExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumSetTypeFilterSchema: z.ZodType<Prisma.NestedEnumSetTypeFilter> = z.object({
  equals: z.lazy(() => SetTypeSchema).optional(),
  in: z.lazy(() => SetTypeSchema).array().optional(),
  notIn: z.lazy(() => SetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => NestedEnumSetTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SetTypeSchema).optional(),
  in: z.lazy(() => SetTypeSchema).array().optional(),
  notIn: z.lazy(() => SetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => NestedEnumSetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSetTypeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LogCreateWithoutUserInputSchema: z.ZodType<Prisma.LogCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  exercises: z.lazy(() => LoggedExerciseCreateNestedManyWithoutLogInputSchema).optional()
}).strict();

export const LogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LogUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  exercises: z.lazy(() => LoggedExerciseUncheckedCreateNestedManyWithoutLogInputSchema).optional()
}).strict();

export const LogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LogCreateWithoutUserInputSchema),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LogCreateManyUserInputSchema),z.lazy(() => LogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LogUpdateWithoutUserInputSchema),z.lazy(() => LogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LogCreateWithoutUserInputSchema),z.lazy(() => LogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LogUpdateWithoutUserInputSchema),z.lazy(() => LogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LogUpdateManyMutationInputSchema),z.lazy(() => LogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const LogScalarWhereInputSchema: z.ZodType<Prisma.LogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LogScalarWhereInputSchema),z.lazy(() => LogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogScalarWhereInputSchema),z.lazy(() => LogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  logs: z.lazy(() => LogCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  logs: z.lazy(() => LogUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  logs: z.lazy(() => LogUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  logs: z.lazy(() => LogUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  logs: z.lazy(() => LogCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  logs: z.lazy(() => LogUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  logs: z.lazy(() => LogUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  logs: z.lazy(() => LogUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const LoggedExerciseCreateWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseCreateWithoutExerciseInput> = z.object({
  id: z.string().uuid().optional(),
  log: z.lazy(() => LogCreateNestedOneWithoutExercisesInputSchema).optional(),
  sets: z.lazy(() => TypedSetCreateNestedManyWithoutLoggedExerciseInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedCreateWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedCreateWithoutExerciseInput> = z.object({
  id: z.string().uuid().optional(),
  logId: z.string().optional().nullable(),
  sets: z.lazy(() => TypedSetUncheckedCreateNestedManyWithoutLoggedExerciseInputSchema).optional()
}).strict();

export const LoggedExerciseCreateOrConnectWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseCreateOrConnectWithoutExerciseInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export const LoggedExerciseCreateManyExerciseInputEnvelopeSchema: z.ZodType<Prisma.LoggedExerciseCreateManyExerciseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LoggedExerciseCreateManyExerciseInputSchema),z.lazy(() => LoggedExerciseCreateManyExerciseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LoggedExerciseUpsertWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUpsertWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LoggedExerciseUpdateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateWithoutExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export const LoggedExerciseUpdateWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LoggedExerciseUpdateWithoutExerciseInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateWithoutExerciseInputSchema) ]),
}).strict();

export const LoggedExerciseUpdateManyWithWhereWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateManyWithWhereWithoutExerciseInput> = z.object({
  where: z.lazy(() => LoggedExerciseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LoggedExerciseUpdateManyMutationInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateManyWithoutExerciseInputSchema) ]),
}).strict();

export const LoggedExerciseScalarWhereInputSchema: z.ZodType<Prisma.LoggedExerciseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LoggedExerciseScalarWhereInputSchema),z.lazy(() => LoggedExerciseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LoggedExerciseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LoggedExerciseScalarWhereInputSchema),z.lazy(() => LoggedExerciseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  exerciseSlug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ExerciseCreateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseCreateWithoutLoggedExerciseInput> = z.object({
  slug: z.string(),
  name: z.string(),
  force: z.string().optional().nullable(),
  level: z.string(),
  mechanic: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseCreateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseCreatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseCreateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.string(),
  images: z.union([ z.lazy(() => ExerciseCreateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ExerciseUncheckedCreateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateWithoutLoggedExerciseInput> = z.object({
  slug: z.string(),
  name: z.string(),
  force: z.string().optional().nullable(),
  level: z.string(),
  mechanic: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseCreateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseCreatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseCreateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.string(),
  images: z.union([ z.lazy(() => ExerciseCreateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ExerciseCreateOrConnectWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutLoggedExerciseInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutLoggedExerciseInputSchema) ]),
}).strict();

export const LogCreateWithoutExercisesInputSchema: z.ZodType<Prisma.LogCreateWithoutExercisesInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutLogsInputSchema)
}).strict();

export const LogUncheckedCreateWithoutExercisesInputSchema: z.ZodType<Prisma.LogUncheckedCreateWithoutExercisesInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  userId: z.string()
}).strict();

export const LogCreateOrConnectWithoutExercisesInputSchema: z.ZodType<Prisma.LogCreateOrConnectWithoutExercisesInput> = z.object({
  where: z.lazy(() => LogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LogCreateWithoutExercisesInputSchema),z.lazy(() => LogUncheckedCreateWithoutExercisesInputSchema) ]),
}).strict();

export const TypedSetCreateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetCreateWithoutLoggedExerciseInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => SetTypeSchema).optional(),
  weight: z.number().int(),
  reps: z.number().int(),
  distance: z.string(),
  minutes: z.number().int(),
  seconds: z.number().int()
}).strict();

export const TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUncheckedCreateWithoutLoggedExerciseInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => SetTypeSchema).optional(),
  weight: z.number().int(),
  reps: z.number().int(),
  distance: z.string(),
  minutes: z.number().int(),
  seconds: z.number().int()
}).strict();

export const TypedSetCreateOrConnectWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetCreateOrConnectWithoutLoggedExerciseInput> = z.object({
  where: z.lazy(() => TypedSetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema) ]),
}).strict();

export const TypedSetCreateManyLoggedExerciseInputEnvelopeSchema: z.ZodType<Prisma.TypedSetCreateManyLoggedExerciseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TypedSetCreateManyLoggedExerciseInputSchema),z.lazy(() => TypedSetCreateManyLoggedExerciseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExerciseUpsertWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseUpsertWithoutLoggedExerciseInput> = z.object({
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutLoggedExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutLoggedExerciseInputSchema) ]),
  where: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export const ExerciseUpdateToOneWithWhereWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseUpdateToOneWithWhereWithoutLoggedExerciseInput> = z.object({
  where: z.lazy(() => ExerciseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutLoggedExerciseInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutLoggedExerciseInputSchema) ]),
}).strict();

export const ExerciseUpdateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseUpdateWithoutLoggedExerciseInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  force: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mechanic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseUpdateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseUpdatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseUpdateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ExerciseUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateWithoutLoggedExerciseInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  force: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mechanic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryMuscles: z.union([ z.lazy(() => ExerciseUpdateprimaryMusclesInputSchema),z.string().array() ]).optional(),
  secondaryMuscles: z.union([ z.lazy(() => ExerciseUpdatesecondaryMusclesInputSchema),z.string().array() ]).optional(),
  instructions: z.union([ z.lazy(() => ExerciseUpdateinstructionsInputSchema),z.string().array() ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ExerciseUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const LogUpsertWithoutExercisesInputSchema: z.ZodType<Prisma.LogUpsertWithoutExercisesInput> = z.object({
  update: z.union([ z.lazy(() => LogUpdateWithoutExercisesInputSchema),z.lazy(() => LogUncheckedUpdateWithoutExercisesInputSchema) ]),
  create: z.union([ z.lazy(() => LogCreateWithoutExercisesInputSchema),z.lazy(() => LogUncheckedCreateWithoutExercisesInputSchema) ]),
  where: z.lazy(() => LogWhereInputSchema).optional()
}).strict();

export const LogUpdateToOneWithWhereWithoutExercisesInputSchema: z.ZodType<Prisma.LogUpdateToOneWithWhereWithoutExercisesInput> = z.object({
  where: z.lazy(() => LogWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LogUpdateWithoutExercisesInputSchema),z.lazy(() => LogUncheckedUpdateWithoutExercisesInputSchema) ]),
}).strict();

export const LogUpdateWithoutExercisesInputSchema: z.ZodType<Prisma.LogUpdateWithoutExercisesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLogsNestedInputSchema).optional()
}).strict();

export const LogUncheckedUpdateWithoutExercisesInputSchema: z.ZodType<Prisma.LogUncheckedUpdateWithoutExercisesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypedSetUpsertWithWhereUniqueWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUpsertWithWhereUniqueWithoutLoggedExerciseInput> = z.object({
  where: z.lazy(() => TypedSetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TypedSetUpdateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedUpdateWithoutLoggedExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => TypedSetCreateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedCreateWithoutLoggedExerciseInputSchema) ]),
}).strict();

export const TypedSetUpdateWithWhereUniqueWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUpdateWithWhereUniqueWithoutLoggedExerciseInput> = z.object({
  where: z.lazy(() => TypedSetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TypedSetUpdateWithoutLoggedExerciseInputSchema),z.lazy(() => TypedSetUncheckedUpdateWithoutLoggedExerciseInputSchema) ]),
}).strict();

export const TypedSetUpdateManyWithWhereWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUpdateManyWithWhereWithoutLoggedExerciseInput> = z.object({
  where: z.lazy(() => TypedSetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TypedSetUpdateManyMutationInputSchema),z.lazy(() => TypedSetUncheckedUpdateManyWithoutLoggedExerciseInputSchema) ]),
}).strict();

export const TypedSetScalarWhereInputSchema: z.ZodType<Prisma.TypedSetScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TypedSetScalarWhereInputSchema),z.lazy(() => TypedSetScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TypedSetScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TypedSetScalarWhereInputSchema),z.lazy(() => TypedSetScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSetTypeFilterSchema),z.lazy(() => SetTypeSchema) ]).optional(),
  loggedExerciseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weight: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  distance: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  minutes: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  seconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const LoggedExerciseCreateWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseCreateWithoutSetsInput> = z.object({
  id: z.string().uuid().optional(),
  exercise: z.lazy(() => ExerciseCreateNestedOneWithoutLoggedExerciseInputSchema).optional(),
  log: z.lazy(() => LogCreateNestedOneWithoutExercisesInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedCreateWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedCreateWithoutSetsInput> = z.object({
  id: z.string().uuid().optional(),
  exerciseSlug: z.string(),
  logId: z.string().optional().nullable()
}).strict();

export const LoggedExerciseCreateOrConnectWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseCreateOrConnectWithoutSetsInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutSetsInputSchema) ]),
}).strict();

export const LoggedExerciseUpsertWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseUpsertWithoutSetsInput> = z.object({
  update: z.union([ z.lazy(() => LoggedExerciseUpdateWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateWithoutSetsInputSchema) ]),
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutSetsInputSchema) ]),
  where: z.lazy(() => LoggedExerciseWhereInputSchema).optional()
}).strict();

export const LoggedExerciseUpdateToOneWithWhereWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateToOneWithWhereWithoutSetsInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LoggedExerciseUpdateWithoutSetsInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateWithoutSetsInputSchema) ]),
}).strict();

export const LoggedExerciseUpdateWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateWithoutSetsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercise: z.lazy(() => ExerciseUpdateOneWithoutLoggedExerciseNestedInputSchema).optional(),
  log: z.lazy(() => LogUpdateOneWithoutExercisesNestedInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedUpdateWithoutSetsInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateWithoutSetsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseSlug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutLogsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLogsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogsInputSchema) ]),
}).strict();

export const LoggedExerciseCreateWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseCreateWithoutLogInput> = z.object({
  id: z.string().uuid().optional(),
  exercise: z.lazy(() => ExerciseCreateNestedOneWithoutLoggedExerciseInputSchema).optional(),
  sets: z.lazy(() => TypedSetCreateNestedManyWithoutLoggedExerciseInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedCreateWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedCreateWithoutLogInput> = z.object({
  id: z.string().uuid().optional(),
  exerciseSlug: z.string(),
  sets: z.lazy(() => TypedSetUncheckedCreateNestedManyWithoutLoggedExerciseInputSchema).optional()
}).strict();

export const LoggedExerciseCreateOrConnectWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseCreateOrConnectWithoutLogInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema) ]),
}).strict();

export const LoggedExerciseCreateManyLogInputEnvelopeSchema: z.ZodType<Prisma.LoggedExerciseCreateManyLogInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LoggedExerciseCreateManyLogInputSchema),z.lazy(() => LoggedExerciseCreateManyLogInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLogsInputSchema) ]),
}).strict();

export const UserUpdateWithoutLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLogsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const LoggedExerciseUpsertWithWhereUniqueWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUpsertWithWhereUniqueWithoutLogInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LoggedExerciseUpdateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateWithoutLogInputSchema) ]),
  create: z.union([ z.lazy(() => LoggedExerciseCreateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedCreateWithoutLogInputSchema) ]),
}).strict();

export const LoggedExerciseUpdateWithWhereUniqueWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateWithWhereUniqueWithoutLogInput> = z.object({
  where: z.lazy(() => LoggedExerciseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LoggedExerciseUpdateWithoutLogInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateWithoutLogInputSchema) ]),
}).strict();

export const LoggedExerciseUpdateManyWithWhereWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateManyWithWhereWithoutLogInput> = z.object({
  where: z.lazy(() => LoggedExerciseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LoggedExerciseUpdateManyMutationInputSchema),z.lazy(() => LoggedExerciseUncheckedUpdateManyWithoutLogInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LogCreateManyUserInputSchema: z.ZodType<Prisma.LogCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.string()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogUpdateWithoutUserInputSchema: z.ZodType<Prisma.LogUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => LoggedExerciseUpdateManyWithoutLogNestedInputSchema).optional()
}).strict();

export const LogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LogUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => LoggedExerciseUncheckedUpdateManyWithoutLogNestedInputSchema).optional()
}).strict();

export const LogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LogUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoggedExerciseCreateManyExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseCreateManyExerciseInput> = z.object({
  id: z.string().uuid().optional(),
  logId: z.string().optional().nullable()
}).strict();

export const LoggedExerciseUpdateWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateWithoutExerciseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log: z.lazy(() => LogUpdateOneWithoutExercisesNestedInputSchema).optional(),
  sets: z.lazy(() => TypedSetUpdateManyWithoutLoggedExerciseNestedInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedUpdateWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateWithoutExerciseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sets: z.lazy(() => TypedSetUncheckedUpdateManyWithoutLoggedExerciseNestedInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedUpdateManyWithoutExerciseInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateManyWithoutExerciseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TypedSetCreateManyLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetCreateManyLoggedExerciseInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.lazy(() => SetTypeSchema).optional(),
  weight: z.number().int(),
  reps: z.number().int(),
  distance: z.string(),
  minutes: z.number().int(),
  seconds: z.number().int()
}).strict();

export const TypedSetUpdateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUpdateWithoutLoggedExerciseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => EnumSetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  seconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypedSetUncheckedUpdateWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUncheckedUpdateWithoutLoggedExerciseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => EnumSetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  seconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TypedSetUncheckedUpdateManyWithoutLoggedExerciseInputSchema: z.ZodType<Prisma.TypedSetUncheckedUpdateManyWithoutLoggedExerciseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SetTypeSchema),z.lazy(() => EnumSetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  minutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  seconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LoggedExerciseCreateManyLogInputSchema: z.ZodType<Prisma.LoggedExerciseCreateManyLogInput> = z.object({
  id: z.string().uuid().optional(),
  exerciseSlug: z.string()
}).strict();

export const LoggedExerciseUpdateWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUpdateWithoutLogInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercise: z.lazy(() => ExerciseUpdateOneWithoutLoggedExerciseNestedInputSchema).optional(),
  sets: z.lazy(() => TypedSetUpdateManyWithoutLoggedExerciseNestedInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedUpdateWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateWithoutLogInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseSlug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.lazy(() => TypedSetUncheckedUpdateManyWithoutLoggedExerciseNestedInputSchema).optional()
}).strict();

export const LoggedExerciseUncheckedUpdateManyWithoutLogInputSchema: z.ZodType<Prisma.LoggedExerciseUncheckedUpdateManyWithoutLogInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseSlug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const ExerciseFindFirstArgsSchema: z.ZodType<Prisma.ExerciseFindFirstArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExerciseFindFirstOrThrowArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseFindManyArgsSchema: z.ZodType<Prisma.ExerciseFindManyArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseAggregateArgsSchema: z.ZodType<Prisma.ExerciseAggregateArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExerciseGroupByArgsSchema: z.ZodType<Prisma.ExerciseGroupByArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithAggregationInputSchema.array(),ExerciseOrderByWithAggregationInputSchema ]).optional(),
  by: ExerciseScalarFieldEnumSchema.array(),
  having: ExerciseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExerciseFindUniqueArgsSchema: z.ZodType<Prisma.ExerciseFindUniqueArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExerciseFindUniqueOrThrowArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const LoggedExerciseFindFirstArgsSchema: z.ZodType<Prisma.LoggedExerciseFindFirstArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  where: LoggedExerciseWhereInputSchema.optional(),
  orderBy: z.union([ LoggedExerciseOrderByWithRelationInputSchema.array(),LoggedExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: LoggedExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LoggedExerciseScalarFieldEnumSchema,LoggedExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LoggedExerciseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LoggedExerciseFindFirstOrThrowArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  where: LoggedExerciseWhereInputSchema.optional(),
  orderBy: z.union([ LoggedExerciseOrderByWithRelationInputSchema.array(),LoggedExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: LoggedExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LoggedExerciseScalarFieldEnumSchema,LoggedExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LoggedExerciseFindManyArgsSchema: z.ZodType<Prisma.LoggedExerciseFindManyArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  where: LoggedExerciseWhereInputSchema.optional(),
  orderBy: z.union([ LoggedExerciseOrderByWithRelationInputSchema.array(),LoggedExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: LoggedExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LoggedExerciseScalarFieldEnumSchema,LoggedExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LoggedExerciseAggregateArgsSchema: z.ZodType<Prisma.LoggedExerciseAggregateArgs> = z.object({
  where: LoggedExerciseWhereInputSchema.optional(),
  orderBy: z.union([ LoggedExerciseOrderByWithRelationInputSchema.array(),LoggedExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: LoggedExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LoggedExerciseGroupByArgsSchema: z.ZodType<Prisma.LoggedExerciseGroupByArgs> = z.object({
  where: LoggedExerciseWhereInputSchema.optional(),
  orderBy: z.union([ LoggedExerciseOrderByWithAggregationInputSchema.array(),LoggedExerciseOrderByWithAggregationInputSchema ]).optional(),
  by: LoggedExerciseScalarFieldEnumSchema.array(),
  having: LoggedExerciseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LoggedExerciseFindUniqueArgsSchema: z.ZodType<Prisma.LoggedExerciseFindUniqueArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  where: LoggedExerciseWhereUniqueInputSchema,
}).strict() ;

export const LoggedExerciseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LoggedExerciseFindUniqueOrThrowArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  where: LoggedExerciseWhereUniqueInputSchema,
}).strict() ;

export const TypedSetFindFirstArgsSchema: z.ZodType<Prisma.TypedSetFindFirstArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  where: TypedSetWhereInputSchema.optional(),
  orderBy: z.union([ TypedSetOrderByWithRelationInputSchema.array(),TypedSetOrderByWithRelationInputSchema ]).optional(),
  cursor: TypedSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TypedSetScalarFieldEnumSchema,TypedSetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TypedSetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TypedSetFindFirstOrThrowArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  where: TypedSetWhereInputSchema.optional(),
  orderBy: z.union([ TypedSetOrderByWithRelationInputSchema.array(),TypedSetOrderByWithRelationInputSchema ]).optional(),
  cursor: TypedSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TypedSetScalarFieldEnumSchema,TypedSetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TypedSetFindManyArgsSchema: z.ZodType<Prisma.TypedSetFindManyArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  where: TypedSetWhereInputSchema.optional(),
  orderBy: z.union([ TypedSetOrderByWithRelationInputSchema.array(),TypedSetOrderByWithRelationInputSchema ]).optional(),
  cursor: TypedSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TypedSetScalarFieldEnumSchema,TypedSetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TypedSetAggregateArgsSchema: z.ZodType<Prisma.TypedSetAggregateArgs> = z.object({
  where: TypedSetWhereInputSchema.optional(),
  orderBy: z.union([ TypedSetOrderByWithRelationInputSchema.array(),TypedSetOrderByWithRelationInputSchema ]).optional(),
  cursor: TypedSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TypedSetGroupByArgsSchema: z.ZodType<Prisma.TypedSetGroupByArgs> = z.object({
  where: TypedSetWhereInputSchema.optional(),
  orderBy: z.union([ TypedSetOrderByWithAggregationInputSchema.array(),TypedSetOrderByWithAggregationInputSchema ]).optional(),
  by: TypedSetScalarFieldEnumSchema.array(),
  having: TypedSetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TypedSetFindUniqueArgsSchema: z.ZodType<Prisma.TypedSetFindUniqueArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  where: TypedSetWhereUniqueInputSchema,
}).strict() ;

export const TypedSetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TypedSetFindUniqueOrThrowArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  where: TypedSetWhereUniqueInputSchema,
}).strict() ;

export const LogFindFirstArgsSchema: z.ZodType<Prisma.LogFindFirstArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LogFindFirstOrThrowArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogFindManyArgsSchema: z.ZodType<Prisma.LogFindManyArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogAggregateArgsSchema: z.ZodType<Prisma.LogAggregateArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LogGroupByArgsSchema: z.ZodType<Prisma.LogGroupByArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithAggregationInputSchema.array(),LogOrderByWithAggregationInputSchema ]).optional(),
  by: LogScalarFieldEnumSchema.array(),
  having: LogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LogFindUniqueArgsSchema: z.ZodType<Prisma.LogFindUniqueArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LogFindUniqueOrThrowArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const ExerciseCreateArgsSchema: z.ZodType<Prisma.ExerciseCreateArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  data: z.union([ ExerciseCreateInputSchema,ExerciseUncheckedCreateInputSchema ]),
}).strict() ;

export const ExerciseUpsertArgsSchema: z.ZodType<Prisma.ExerciseUpsertArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
  create: z.union([ ExerciseCreateInputSchema,ExerciseUncheckedCreateInputSchema ]),
  update: z.union([ ExerciseUpdateInputSchema,ExerciseUncheckedUpdateInputSchema ]),
}).strict() ;

export const ExerciseCreateManyArgsSchema: z.ZodType<Prisma.ExerciseCreateManyArgs> = z.object({
  data: z.union([ ExerciseCreateManyInputSchema,ExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExerciseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ExerciseCreateManyAndReturnArgs> = z.object({
  data: z.union([ ExerciseCreateManyInputSchema,ExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExerciseDeleteArgsSchema: z.ZodType<Prisma.ExerciseDeleteArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseUpdateArgsSchema: z.ZodType<Prisma.ExerciseUpdateArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  data: z.union([ ExerciseUpdateInputSchema,ExerciseUncheckedUpdateInputSchema ]),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseUpdateManyArgsSchema: z.ZodType<Prisma.ExerciseUpdateManyArgs> = z.object({
  data: z.union([ ExerciseUpdateManyMutationInputSchema,ExerciseUncheckedUpdateManyInputSchema ]),
  where: ExerciseWhereInputSchema.optional(),
}).strict() ;

export const ExerciseDeleteManyArgsSchema: z.ZodType<Prisma.ExerciseDeleteManyArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
}).strict() ;

export const LoggedExerciseCreateArgsSchema: z.ZodType<Prisma.LoggedExerciseCreateArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  data: z.union([ LoggedExerciseCreateInputSchema,LoggedExerciseUncheckedCreateInputSchema ]),
}).strict() ;

export const LoggedExerciseUpsertArgsSchema: z.ZodType<Prisma.LoggedExerciseUpsertArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  where: LoggedExerciseWhereUniqueInputSchema,
  create: z.union([ LoggedExerciseCreateInputSchema,LoggedExerciseUncheckedCreateInputSchema ]),
  update: z.union([ LoggedExerciseUpdateInputSchema,LoggedExerciseUncheckedUpdateInputSchema ]),
}).strict() ;

export const LoggedExerciseCreateManyArgsSchema: z.ZodType<Prisma.LoggedExerciseCreateManyArgs> = z.object({
  data: z.union([ LoggedExerciseCreateManyInputSchema,LoggedExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LoggedExerciseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LoggedExerciseCreateManyAndReturnArgs> = z.object({
  data: z.union([ LoggedExerciseCreateManyInputSchema,LoggedExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LoggedExerciseDeleteArgsSchema: z.ZodType<Prisma.LoggedExerciseDeleteArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  where: LoggedExerciseWhereUniqueInputSchema,
}).strict() ;

export const LoggedExerciseUpdateArgsSchema: z.ZodType<Prisma.LoggedExerciseUpdateArgs> = z.object({
  select: LoggedExerciseSelectSchema.optional(),
  include: LoggedExerciseIncludeSchema.optional(),
  data: z.union([ LoggedExerciseUpdateInputSchema,LoggedExerciseUncheckedUpdateInputSchema ]),
  where: LoggedExerciseWhereUniqueInputSchema,
}).strict() ;

export const LoggedExerciseUpdateManyArgsSchema: z.ZodType<Prisma.LoggedExerciseUpdateManyArgs> = z.object({
  data: z.union([ LoggedExerciseUpdateManyMutationInputSchema,LoggedExerciseUncheckedUpdateManyInputSchema ]),
  where: LoggedExerciseWhereInputSchema.optional(),
}).strict() ;

export const LoggedExerciseDeleteManyArgsSchema: z.ZodType<Prisma.LoggedExerciseDeleteManyArgs> = z.object({
  where: LoggedExerciseWhereInputSchema.optional(),
}).strict() ;

export const TypedSetCreateArgsSchema: z.ZodType<Prisma.TypedSetCreateArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  data: z.union([ TypedSetCreateInputSchema,TypedSetUncheckedCreateInputSchema ]),
}).strict() ;

export const TypedSetUpsertArgsSchema: z.ZodType<Prisma.TypedSetUpsertArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  where: TypedSetWhereUniqueInputSchema,
  create: z.union([ TypedSetCreateInputSchema,TypedSetUncheckedCreateInputSchema ]),
  update: z.union([ TypedSetUpdateInputSchema,TypedSetUncheckedUpdateInputSchema ]),
}).strict() ;

export const TypedSetCreateManyArgsSchema: z.ZodType<Prisma.TypedSetCreateManyArgs> = z.object({
  data: z.union([ TypedSetCreateManyInputSchema,TypedSetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TypedSetCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TypedSetCreateManyAndReturnArgs> = z.object({
  data: z.union([ TypedSetCreateManyInputSchema,TypedSetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TypedSetDeleteArgsSchema: z.ZodType<Prisma.TypedSetDeleteArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  where: TypedSetWhereUniqueInputSchema,
}).strict() ;

export const TypedSetUpdateArgsSchema: z.ZodType<Prisma.TypedSetUpdateArgs> = z.object({
  select: TypedSetSelectSchema.optional(),
  include: TypedSetIncludeSchema.optional(),
  data: z.union([ TypedSetUpdateInputSchema,TypedSetUncheckedUpdateInputSchema ]),
  where: TypedSetWhereUniqueInputSchema,
}).strict() ;

export const TypedSetUpdateManyArgsSchema: z.ZodType<Prisma.TypedSetUpdateManyArgs> = z.object({
  data: z.union([ TypedSetUpdateManyMutationInputSchema,TypedSetUncheckedUpdateManyInputSchema ]),
  where: TypedSetWhereInputSchema.optional(),
}).strict() ;

export const TypedSetDeleteManyArgsSchema: z.ZodType<Prisma.TypedSetDeleteManyArgs> = z.object({
  where: TypedSetWhereInputSchema.optional(),
}).strict() ;

export const LogCreateArgsSchema: z.ZodType<Prisma.LogCreateArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  data: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
}).strict() ;

export const LogUpsertArgsSchema: z.ZodType<Prisma.LogUpsertArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  where: LogWhereUniqueInputSchema,
  create: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
  update: z.union([ LogUpdateInputSchema,LogUncheckedUpdateInputSchema ]),
}).strict() ;

export const LogCreateManyArgsSchema: z.ZodType<Prisma.LogCreateManyArgs> = z.object({
  data: z.union([ LogCreateManyInputSchema,LogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LogCreateManyAndReturnArgs> = z.object({
  data: z.union([ LogCreateManyInputSchema,LogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LogDeleteArgsSchema: z.ZodType<Prisma.LogDeleteArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogUpdateArgsSchema: z.ZodType<Prisma.LogUpdateArgs> = z.object({
  select: LogSelectSchema.optional(),
  include: LogIncludeSchema.optional(),
  data: z.union([ LogUpdateInputSchema,LogUncheckedUpdateInputSchema ]),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogUpdateManyArgsSchema: z.ZodType<Prisma.LogUpdateManyArgs> = z.object({
  data: z.union([ LogUpdateManyMutationInputSchema,LogUncheckedUpdateManyInputSchema ]),
  where: LogWhereInputSchema.optional(),
}).strict() ;

export const LogDeleteManyArgsSchema: z.ZodType<Prisma.LogDeleteManyArgs> = z.object({
  where: LogWhereInputSchema.optional(),
}).strict() ;