
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model ProblemSolution
 * 
 */
export type ProblemSolution = $Result.DefaultSelection<Prisma.$ProblemSolutionPayload>
/**
 * Model UsageLog
 * 
 */
export type UsageLog = $Result.DefaultSelection<Prisma.$UsageLogPayload>
/**
 * Model SatisfactionRateLog
 * 
 */
export type SatisfactionRateLog = $Result.DefaultSelection<Prisma.$SatisfactionRateLogPayload>
/**
 * Model CustomerReview
 * 
 */
export type CustomerReview = $Result.DefaultSelection<Prisma.$CustomerReviewPayload>
/**
 * Model RequestHandledLog
 * 
 */
export type RequestHandledLog = $Result.DefaultSelection<Prisma.$RequestHandledLogPayload>
/**
 * Model AgentRecord
 * 
 */
export type AgentRecord = $Result.DefaultSelection<Prisma.$AgentRecordPayload>
/**
 * Model AgentModification
 * 
 */
export type AgentModification = $Result.DefaultSelection<Prisma.$AgentModificationPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OfferUsed
 * Embedded type to track individual offer usage by a user
 */
export type OfferUsed = $Result.DefaultSelection<Prisma.$OfferUsedPayload>
/**
 * Model DiscountLevel
 * DiscountLevel → embedded type for each slab/level
 */
export type DiscountLevel = $Result.DefaultSelection<Prisma.$DiscountLevelPayload>
/**
 * Model CustomerServiceAgents
 * 
 */
export type CustomerServiceAgents = $Result.DefaultSelection<Prisma.$CustomerServiceAgentsPayload>
/**
 * Model AgentUsageStatistics
 * 
 */
export type AgentUsageStatistics = $Result.DefaultSelection<Prisma.$AgentUsageStatisticsPayload>
/**
 * Model AgentRequestsHandledLogs
 * 
 */
export type AgentRequestsHandledLogs = $Result.DefaultSelection<Prisma.$AgentRequestsHandledLogsPayload>
/**
 * Model CompanyAgentsRegistered
 * 
 */
export type CompanyAgentsRegistered = $Result.DefaultSelection<Prisma.$CompanyAgentsRegisteredPayload>
/**
 * Model UserOrders
 * 
 */
export type UserOrders = $Result.DefaultSelection<Prisma.$UserOrdersPayload>
/**
 * Model Offer
 * Offer model to store promotional campaigns, discounts, and coupon codes
 */
export type Offer = $Result.DefaultSelection<Prisma.$OfferPayload>
/**
 * Model OfferUsage
 * Track which user has used which offer and how many times
 */
export type OfferUsage = $Result.DefaultSelection<Prisma.$OfferUsagePayload>
/**
 * Model baseDiscountSlab
 * BaseDiscountSlab model → stores the global base discount logic
 */
export type baseDiscountSlab = $Result.DefaultSelection<Prisma.$baseDiscountSlabPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CustomerServiceAgents
 * const customerServiceAgents = await prisma.customerServiceAgents.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CustomerServiceAgents
   * const customerServiceAgents = await prisma.customerServiceAgents.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.customerServiceAgents`: Exposes CRUD operations for the **CustomerServiceAgents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerServiceAgents
    * const customerServiceAgents = await prisma.customerServiceAgents.findMany()
    * ```
    */
  get customerServiceAgents(): Prisma.CustomerServiceAgentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentUsageStatistics`: Exposes CRUD operations for the **AgentUsageStatistics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentUsageStatistics
    * const agentUsageStatistics = await prisma.agentUsageStatistics.findMany()
    * ```
    */
  get agentUsageStatistics(): Prisma.AgentUsageStatisticsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentRequestsHandledLogs`: Exposes CRUD operations for the **AgentRequestsHandledLogs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentRequestsHandledLogs
    * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findMany()
    * ```
    */
  get agentRequestsHandledLogs(): Prisma.AgentRequestsHandledLogsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyAgentsRegistered`: Exposes CRUD operations for the **CompanyAgentsRegistered** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyAgentsRegistereds
    * const companyAgentsRegistereds = await prisma.companyAgentsRegistered.findMany()
    * ```
    */
  get companyAgentsRegistered(): Prisma.CompanyAgentsRegisteredDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userOrders`: Exposes CRUD operations for the **UserOrders** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOrders
    * const userOrders = await prisma.userOrders.findMany()
    * ```
    */
  get userOrders(): Prisma.UserOrdersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.offer`: Exposes CRUD operations for the **Offer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offers
    * const offers = await prisma.offer.findMany()
    * ```
    */
  get offer(): Prisma.OfferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.offerUsage`: Exposes CRUD operations for the **OfferUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfferUsages
    * const offerUsages = await prisma.offerUsage.findMany()
    * ```
    */
  get offerUsage(): Prisma.OfferUsageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.baseDiscountSlab`: Exposes CRUD operations for the **baseDiscountSlab** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BaseDiscountSlabs
    * const baseDiscountSlabs = await prisma.baseDiscountSlab.findMany()
    * ```
    */
  get baseDiscountSlab(): Prisma.baseDiscountSlabDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CustomerServiceAgents: 'CustomerServiceAgents',
    AgentUsageStatistics: 'AgentUsageStatistics',
    AgentRequestsHandledLogs: 'AgentRequestsHandledLogs',
    CompanyAgentsRegistered: 'CompanyAgentsRegistered',
    UserOrders: 'UserOrders',
    Offer: 'Offer',
    OfferUsage: 'OfferUsage',
    baseDiscountSlab: 'baseDiscountSlab'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "customerServiceAgents" | "agentUsageStatistics" | "agentRequestsHandledLogs" | "companyAgentsRegistered" | "userOrders" | "offer" | "offerUsage" | "baseDiscountSlab"
      txIsolationLevel: never
    }
    model: {
      CustomerServiceAgents: {
        payload: Prisma.$CustomerServiceAgentsPayload<ExtArgs>
        fields: Prisma.CustomerServiceAgentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerServiceAgentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerServiceAgentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload>
          }
          findFirst: {
            args: Prisma.CustomerServiceAgentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerServiceAgentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload>
          }
          findMany: {
            args: Prisma.CustomerServiceAgentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload>[]
          }
          create: {
            args: Prisma.CustomerServiceAgentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload>
          }
          createMany: {
            args: Prisma.CustomerServiceAgentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CustomerServiceAgentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload>
          }
          update: {
            args: Prisma.CustomerServiceAgentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload>
          }
          deleteMany: {
            args: Prisma.CustomerServiceAgentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerServiceAgentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerServiceAgentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerServiceAgentsPayload>
          }
          aggregate: {
            args: Prisma.CustomerServiceAgentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerServiceAgents>
          }
          groupBy: {
            args: Prisma.CustomerServiceAgentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerServiceAgentsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CustomerServiceAgentsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CustomerServiceAgentsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CustomerServiceAgentsCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerServiceAgentsCountAggregateOutputType> | number
          }
        }
      }
      AgentUsageStatistics: {
        payload: Prisma.$AgentUsageStatisticsPayload<ExtArgs>
        fields: Prisma.AgentUsageStatisticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentUsageStatisticsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentUsageStatisticsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload>
          }
          findFirst: {
            args: Prisma.AgentUsageStatisticsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentUsageStatisticsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload>
          }
          findMany: {
            args: Prisma.AgentUsageStatisticsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload>[]
          }
          create: {
            args: Prisma.AgentUsageStatisticsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload>
          }
          createMany: {
            args: Prisma.AgentUsageStatisticsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AgentUsageStatisticsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload>
          }
          update: {
            args: Prisma.AgentUsageStatisticsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload>
          }
          deleteMany: {
            args: Prisma.AgentUsageStatisticsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUsageStatisticsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentUsageStatisticsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentUsageStatisticsPayload>
          }
          aggregate: {
            args: Prisma.AgentUsageStatisticsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentUsageStatistics>
          }
          groupBy: {
            args: Prisma.AgentUsageStatisticsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentUsageStatisticsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AgentUsageStatisticsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AgentUsageStatisticsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AgentUsageStatisticsCountArgs<ExtArgs>
            result: $Utils.Optional<AgentUsageStatisticsCountAggregateOutputType> | number
          }
        }
      }
      AgentRequestsHandledLogs: {
        payload: Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>
        fields: Prisma.AgentRequestsHandledLogsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentRequestsHandledLogsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentRequestsHandledLogsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload>
          }
          findFirst: {
            args: Prisma.AgentRequestsHandledLogsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentRequestsHandledLogsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload>
          }
          findMany: {
            args: Prisma.AgentRequestsHandledLogsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload>[]
          }
          create: {
            args: Prisma.AgentRequestsHandledLogsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload>
          }
          createMany: {
            args: Prisma.AgentRequestsHandledLogsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AgentRequestsHandledLogsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload>
          }
          update: {
            args: Prisma.AgentRequestsHandledLogsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload>
          }
          deleteMany: {
            args: Prisma.AgentRequestsHandledLogsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentRequestsHandledLogsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentRequestsHandledLogsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRequestsHandledLogsPayload>
          }
          aggregate: {
            args: Prisma.AgentRequestsHandledLogsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentRequestsHandledLogs>
          }
          groupBy: {
            args: Prisma.AgentRequestsHandledLogsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentRequestsHandledLogsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AgentRequestsHandledLogsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AgentRequestsHandledLogsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AgentRequestsHandledLogsCountArgs<ExtArgs>
            result: $Utils.Optional<AgentRequestsHandledLogsCountAggregateOutputType> | number
          }
        }
      }
      CompanyAgentsRegistered: {
        payload: Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>
        fields: Prisma.CompanyAgentsRegisteredFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyAgentsRegisteredFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyAgentsRegisteredFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload>
          }
          findFirst: {
            args: Prisma.CompanyAgentsRegisteredFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyAgentsRegisteredFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload>
          }
          findMany: {
            args: Prisma.CompanyAgentsRegisteredFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload>[]
          }
          create: {
            args: Prisma.CompanyAgentsRegisteredCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload>
          }
          createMany: {
            args: Prisma.CompanyAgentsRegisteredCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CompanyAgentsRegisteredDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload>
          }
          update: {
            args: Prisma.CompanyAgentsRegisteredUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload>
          }
          deleteMany: {
            args: Prisma.CompanyAgentsRegisteredDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyAgentsRegisteredUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyAgentsRegisteredUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAgentsRegisteredPayload>
          }
          aggregate: {
            args: Prisma.CompanyAgentsRegisteredAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyAgentsRegistered>
          }
          groupBy: {
            args: Prisma.CompanyAgentsRegisteredGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyAgentsRegisteredGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CompanyAgentsRegisteredFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CompanyAgentsRegisteredAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CompanyAgentsRegisteredCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyAgentsRegisteredCountAggregateOutputType> | number
          }
        }
      }
      UserOrders: {
        payload: Prisma.$UserOrdersPayload<ExtArgs>
        fields: Prisma.UserOrdersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserOrdersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOrdersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload>
          }
          findFirst: {
            args: Prisma.UserOrdersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOrdersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload>
          }
          findMany: {
            args: Prisma.UserOrdersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload>[]
          }
          create: {
            args: Prisma.UserOrdersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload>
          }
          createMany: {
            args: Prisma.UserOrdersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserOrdersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload>
          }
          update: {
            args: Prisma.UserOrdersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload>
          }
          deleteMany: {
            args: Prisma.UserOrdersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserOrdersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserOrdersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrdersPayload>
          }
          aggregate: {
            args: Prisma.UserOrdersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserOrders>
          }
          groupBy: {
            args: Prisma.UserOrdersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserOrdersGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserOrdersFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserOrdersAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserOrdersCountArgs<ExtArgs>
            result: $Utils.Optional<UserOrdersCountAggregateOutputType> | number
          }
        }
      }
      Offer: {
        payload: Prisma.$OfferPayload<ExtArgs>
        fields: Prisma.OfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findFirst: {
            args: Prisma.OfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findMany: {
            args: Prisma.OfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          create: {
            args: Prisma.OfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          createMany: {
            args: Prisma.OfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          update: {
            args: Prisma.OfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          deleteMany: {
            args: Prisma.OfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          aggregate: {
            args: Prisma.OfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOffer>
          }
          groupBy: {
            args: Prisma.OfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfferGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OfferFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OfferAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OfferCountArgs<ExtArgs>
            result: $Utils.Optional<OfferCountAggregateOutputType> | number
          }
        }
      }
      OfferUsage: {
        payload: Prisma.$OfferUsagePayload<ExtArgs>
        fields: Prisma.OfferUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfferUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfferUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload>
          }
          findFirst: {
            args: Prisma.OfferUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfferUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload>
          }
          findMany: {
            args: Prisma.OfferUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload>[]
          }
          create: {
            args: Prisma.OfferUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload>
          }
          createMany: {
            args: Prisma.OfferUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OfferUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload>
          }
          update: {
            args: Prisma.OfferUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload>
          }
          deleteMany: {
            args: Prisma.OfferUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfferUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OfferUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferUsagePayload>
          }
          aggregate: {
            args: Prisma.OfferUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfferUsage>
          }
          groupBy: {
            args: Prisma.OfferUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfferUsageGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OfferUsageFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OfferUsageAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OfferUsageCountArgs<ExtArgs>
            result: $Utils.Optional<OfferUsageCountAggregateOutputType> | number
          }
        }
      }
      baseDiscountSlab: {
        payload: Prisma.$baseDiscountSlabPayload<ExtArgs>
        fields: Prisma.baseDiscountSlabFieldRefs
        operations: {
          findUnique: {
            args: Prisma.baseDiscountSlabFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.baseDiscountSlabFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload>
          }
          findFirst: {
            args: Prisma.baseDiscountSlabFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.baseDiscountSlabFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload>
          }
          findMany: {
            args: Prisma.baseDiscountSlabFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload>[]
          }
          create: {
            args: Prisma.baseDiscountSlabCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload>
          }
          createMany: {
            args: Prisma.baseDiscountSlabCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.baseDiscountSlabDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload>
          }
          update: {
            args: Prisma.baseDiscountSlabUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload>
          }
          deleteMany: {
            args: Prisma.baseDiscountSlabDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.baseDiscountSlabUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.baseDiscountSlabUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$baseDiscountSlabPayload>
          }
          aggregate: {
            args: Prisma.BaseDiscountSlabAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBaseDiscountSlab>
          }
          groupBy: {
            args: Prisma.baseDiscountSlabGroupByArgs<ExtArgs>
            result: $Utils.Optional<BaseDiscountSlabGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.baseDiscountSlabFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.baseDiscountSlabAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.baseDiscountSlabCountArgs<ExtArgs>
            result: $Utils.Optional<BaseDiscountSlabCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    customerServiceAgents?: CustomerServiceAgentsOmit
    agentUsageStatistics?: AgentUsageStatisticsOmit
    agentRequestsHandledLogs?: AgentRequestsHandledLogsOmit
    companyAgentsRegistered?: CompanyAgentsRegisteredOmit
    userOrders?: UserOrdersOmit
    offer?: OfferOmit
    offerUsage?: OfferUsageOmit
    baseDiscountSlab?: baseDiscountSlabOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Item
   */





  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    itemName?: boolean
    itemCode?: boolean
    itemInitialWorkingExplanation?: boolean
    itemRunningSteps?: boolean
    commonProblemsSolutions?: boolean | ProblemSolutionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>



  export type ItemSelectScalar = {
    itemName?: boolean
    itemCode?: boolean
    itemInitialWorkingExplanation?: boolean
    itemRunningSteps?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"itemName" | "itemCode" | "itemInitialWorkingExplanation" | "itemRunningSteps" | "commonProblemsSolutions", ExtArgs["result"]["item"]>
  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ItemPayload = {
    name: "Item"
    objects: {}
    scalars: {
      itemName: string
      itemCode: string
      itemInitialWorkingExplanation: string
      itemRunningSteps: string[]
    }
    composites: {
      commonProblemsSolutions: Prisma.$ProblemSolutionPayload[]
    }
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>





  /**
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly itemName: FieldRef<"Item", 'String'>
    readonly itemCode: FieldRef<"Item", 'String'>
    readonly itemInitialWorkingExplanation: FieldRef<"Item", 'String'>
    readonly itemRunningSteps: FieldRef<"Item", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model ProblemSolution
   */





  export type ProblemSolutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    problem?: boolean
    solution?: boolean
  }, ExtArgs["result"]["problemSolution"]>



  export type ProblemSolutionSelectScalar = {
    problem?: boolean
    solution?: boolean
  }

  export type ProblemSolutionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"problem" | "solution", ExtArgs["result"]["problemSolution"]>

  export type $ProblemSolutionPayload = {
    name: "ProblemSolution"
    objects: {}
    scalars: {
      problem: string
      solution: string
    }
    composites: {}
  }

  type ProblemSolutionGetPayload<S extends boolean | null | undefined | ProblemSolutionDefaultArgs> = $Result.GetResult<Prisma.$ProblemSolutionPayload, S>





  /**
   * Fields of the ProblemSolution model
   */
  interface ProblemSolutionFieldRefs {
    readonly problem: FieldRef<"ProblemSolution", 'String'>
    readonly solution: FieldRef<"ProblemSolution", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProblemSolution without action
   */
  export type ProblemSolutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSolution
     */
    select?: ProblemSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSolution
     */
    omit?: ProblemSolutionOmit<ExtArgs> | null
  }


  /**
   * Model UsageLog
   */





  export type UsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tokensUsed?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["usageLog"]>



  export type UsageLogSelectScalar = {
    tokensUsed?: boolean
    timestamp?: boolean
  }

  export type UsageLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tokensUsed" | "timestamp", ExtArgs["result"]["usageLog"]>

  export type $UsageLogPayload = {
    name: "UsageLog"
    objects: {}
    scalars: {
      tokensUsed: number
      timestamp: Date
    }
    composites: {}
  }

  type UsageLogGetPayload<S extends boolean | null | undefined | UsageLogDefaultArgs> = $Result.GetResult<Prisma.$UsageLogPayload, S>





  /**
   * Fields of the UsageLog model
   */
  interface UsageLogFieldRefs {
    readonly tokensUsed: FieldRef<"UsageLog", 'Int'>
    readonly timestamp: FieldRef<"UsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageLog without action
   */
  export type UsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
  }


  /**
   * Model SatisfactionRateLog
   */





  export type SatisfactionRateLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reviewStar?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["satisfactionRateLog"]>



  export type SatisfactionRateLogSelectScalar = {
    reviewStar?: boolean
    timestamp?: boolean
  }

  export type SatisfactionRateLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"reviewStar" | "timestamp", ExtArgs["result"]["satisfactionRateLog"]>

  export type $SatisfactionRateLogPayload = {
    name: "SatisfactionRateLog"
    objects: {}
    scalars: {
      reviewStar: number
      timestamp: Date
    }
    composites: {}
  }

  type SatisfactionRateLogGetPayload<S extends boolean | null | undefined | SatisfactionRateLogDefaultArgs> = $Result.GetResult<Prisma.$SatisfactionRateLogPayload, S>





  /**
   * Fields of the SatisfactionRateLog model
   */
  interface SatisfactionRateLogFieldRefs {
    readonly reviewStar: FieldRef<"SatisfactionRateLog", 'Int'>
    readonly timestamp: FieldRef<"SatisfactionRateLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SatisfactionRateLog without action
   */
  export type SatisfactionRateLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatisfactionRateLog
     */
    select?: SatisfactionRateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatisfactionRateLog
     */
    omit?: SatisfactionRateLogOmit<ExtArgs> | null
  }


  /**
   * Model CustomerReview
   */





  export type CustomerReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    comment?: boolean
    reviewStar?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["customerReview"]>



  export type CustomerReviewSelectScalar = {
    username?: boolean
    comment?: boolean
    reviewStar?: boolean
    timestamp?: boolean
  }

  export type CustomerReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"username" | "comment" | "reviewStar" | "timestamp", ExtArgs["result"]["customerReview"]>

  export type $CustomerReviewPayload = {
    name: "CustomerReview"
    objects: {}
    scalars: {
      username: string
      comment: string
      reviewStar: number
      timestamp: Date
    }
    composites: {}
  }

  type CustomerReviewGetPayload<S extends boolean | null | undefined | CustomerReviewDefaultArgs> = $Result.GetResult<Prisma.$CustomerReviewPayload, S>





  /**
   * Fields of the CustomerReview model
   */
  interface CustomerReviewFieldRefs {
    readonly username: FieldRef<"CustomerReview", 'String'>
    readonly comment: FieldRef<"CustomerReview", 'String'>
    readonly reviewStar: FieldRef<"CustomerReview", 'Int'>
    readonly timestamp: FieldRef<"CustomerReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerReview without action
   */
  export type CustomerReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
  }


  /**
   * Model RequestHandledLog
   */





  export type RequestHandledLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    timestamp?: boolean
  }, ExtArgs["result"]["requestHandledLog"]>



  export type RequestHandledLogSelectScalar = {
    timestamp?: boolean
  }

  export type RequestHandledLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"timestamp", ExtArgs["result"]["requestHandledLog"]>

  export type $RequestHandledLogPayload = {
    name: "RequestHandledLog"
    objects: {}
    scalars: {
      timestamp: Date
    }
    composites: {}
  }

  type RequestHandledLogGetPayload<S extends boolean | null | undefined | RequestHandledLogDefaultArgs> = $Result.GetResult<Prisma.$RequestHandledLogPayload, S>





  /**
   * Fields of the RequestHandledLog model
   */
  interface RequestHandledLogFieldRefs {
    readonly timestamp: FieldRef<"RequestHandledLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestHandledLog without action
   */
  export type RequestHandledLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHandledLog
     */
    select?: RequestHandledLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHandledLog
     */
    omit?: RequestHandledLogOmit<ExtArgs> | null
  }


  /**
   * Model AgentRecord
   */





  export type AgentRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    agentId?: boolean
    agentName?: boolean
  }, ExtArgs["result"]["agentRecord"]>



  export type AgentRecordSelectScalar = {
    agentId?: boolean
    agentName?: boolean
  }

  export type AgentRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"agentId" | "agentName", ExtArgs["result"]["agentRecord"]>

  export type $AgentRecordPayload = {
    name: "AgentRecord"
    objects: {}
    scalars: {
      agentId: string
      agentName: string
    }
    composites: {}
  }

  type AgentRecordGetPayload<S extends boolean | null | undefined | AgentRecordDefaultArgs> = $Result.GetResult<Prisma.$AgentRecordPayload, S>





  /**
   * Fields of the AgentRecord model
   */
  interface AgentRecordFieldRefs {
    readonly agentId: FieldRef<"AgentRecord", 'String'>
    readonly agentName: FieldRef<"AgentRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgentRecord without action
   */
  export type AgentRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRecord
     */
    select?: AgentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRecord
     */
    omit?: AgentRecordOmit<ExtArgs> | null
  }


  /**
   * Model AgentModification
   */





  export type AgentModificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    timestamp?: boolean
    items?: boolean | ItemDefaultArgs<ExtArgs>
    companyName?: boolean
    establishmentDate?: boolean
    companyOwnerName?: boolean
    companyHumanServiceNumber?: boolean
    companyEmail?: boolean
    companyDescription?: boolean
  }, ExtArgs["result"]["agentModification"]>



  export type AgentModificationSelectScalar = {
    timestamp?: boolean
    companyName?: boolean
    establishmentDate?: boolean
    companyOwnerName?: boolean
    companyHumanServiceNumber?: boolean
    companyEmail?: boolean
    companyDescription?: boolean
  }

  export type AgentModificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"timestamp" | "items" | "companyName" | "establishmentDate" | "companyOwnerName" | "companyHumanServiceNumber" | "companyEmail" | "companyDescription", ExtArgs["result"]["agentModification"]>
  export type AgentModificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentModificationPayload = {
    name: "AgentModification"
    objects: {}
    scalars: {
      timestamp: Date
      companyName: string
      establishmentDate: Date
      companyOwnerName: string
      companyHumanServiceNumber: string
      companyEmail: string
      companyDescription: string
    }
    composites: {
      items: Prisma.$ItemPayload[]
    }
  }

  type AgentModificationGetPayload<S extends boolean | null | undefined | AgentModificationDefaultArgs> = $Result.GetResult<Prisma.$AgentModificationPayload, S>





  /**
   * Fields of the AgentModification model
   */
  interface AgentModificationFieldRefs {
    readonly timestamp: FieldRef<"AgentModification", 'DateTime'>
    readonly companyName: FieldRef<"AgentModification", 'String'>
    readonly establishmentDate: FieldRef<"AgentModification", 'DateTime'>
    readonly companyOwnerName: FieldRef<"AgentModification", 'String'>
    readonly companyHumanServiceNumber: FieldRef<"AgentModification", 'String'>
    readonly companyEmail: FieldRef<"AgentModification", 'String'>
    readonly companyDescription: FieldRef<"AgentModification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgentModification without action
   */
  export type AgentModificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentModification
     */
    select?: AgentModificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentModification
     */
    omit?: AgentModificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentModificationInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */





  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    orderId?: boolean
    amount?: boolean
    paymentInfo?: boolean
    receipt?: boolean
    fulfillment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    orderId?: boolean
    amount?: boolean
    paymentInfo?: boolean
    receipt?: boolean
    fulfillment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"orderId" | "amount" | "paymentInfo" | "receipt" | "fulfillment" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>

  export type $OrderPayload = {
    name: "Order"
    objects: {}
    scalars: {
      orderId: string
      amount: number
      paymentInfo: Prisma.JsonValue
      receipt: string
      fulfillment: boolean
      createdAt: Date
      updatedAt: Date
    }
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>





  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly orderId: FieldRef<"Order", 'String'>
    readonly amount: FieldRef<"Order", 'Float'>
    readonly paymentInfo: FieldRef<"Order", 'Json'>
    readonly receipt: FieldRef<"Order", 'String'>
    readonly fulfillment: FieldRef<"Order", 'Boolean'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
  }


  /**
   * Model OfferUsed
   */





  export type OfferUsedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    offerId?: boolean
    offerType?: boolean
    usageLimit?: boolean
    usedCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["offerUsed"]>



  export type OfferUsedSelectScalar = {
    offerId?: boolean
    offerType?: boolean
    usageLimit?: boolean
    usedCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfferUsedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"offerId" | "offerType" | "usageLimit" | "usedCount" | "createdAt" | "updatedAt", ExtArgs["result"]["offerUsed"]>

  export type $OfferUsedPayload = {
    name: "OfferUsed"
    objects: {}
    scalars: {
      offerId: string
      offerType: string
      usageLimit: number
      usedCount: number
      createdAt: Date
      updatedAt: Date
    }
    composites: {}
  }

  type OfferUsedGetPayload<S extends boolean | null | undefined | OfferUsedDefaultArgs> = $Result.GetResult<Prisma.$OfferUsedPayload, S>





  /**
   * Fields of the OfferUsed model
   */
  interface OfferUsedFieldRefs {
    readonly offerId: FieldRef<"OfferUsed", 'String'>
    readonly offerType: FieldRef<"OfferUsed", 'String'>
    readonly usageLimit: FieldRef<"OfferUsed", 'Int'>
    readonly usedCount: FieldRef<"OfferUsed", 'Int'>
    readonly createdAt: FieldRef<"OfferUsed", 'DateTime'>
    readonly updatedAt: FieldRef<"OfferUsed", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OfferUsed without action
   */
  export type OfferUsedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsed
     */
    select?: OfferUsedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsed
     */
    omit?: OfferUsedOmit<ExtArgs> | null
  }


  /**
   * Model DiscountLevel
   */





  export type DiscountLevelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    minOrderValue?: boolean
    maxOrderValue?: boolean
    discountType?: boolean
    discountValue?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["discountLevel"]>



  export type DiscountLevelSelectScalar = {
    minOrderValue?: boolean
    maxOrderValue?: boolean
    discountType?: boolean
    discountValue?: boolean
    createdAt?: boolean
  }

  export type DiscountLevelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"minOrderValue" | "maxOrderValue" | "discountType" | "discountValue" | "createdAt", ExtArgs["result"]["discountLevel"]>

  export type $DiscountLevelPayload = {
    name: "DiscountLevel"
    objects: {}
    scalars: {
      minOrderValue: number
      maxOrderValue: number | null
      discountType: string
      discountValue: number
      createdAt: Date
    }
    composites: {}
  }

  type DiscountLevelGetPayload<S extends boolean | null | undefined | DiscountLevelDefaultArgs> = $Result.GetResult<Prisma.$DiscountLevelPayload, S>





  /**
   * Fields of the DiscountLevel model
   */
  interface DiscountLevelFieldRefs {
    readonly minOrderValue: FieldRef<"DiscountLevel", 'Float'>
    readonly maxOrderValue: FieldRef<"DiscountLevel", 'Float'>
    readonly discountType: FieldRef<"DiscountLevel", 'String'>
    readonly discountValue: FieldRef<"DiscountLevel", 'Float'>
    readonly createdAt: FieldRef<"DiscountLevel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DiscountLevel without action
   */
  export type DiscountLevelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountLevel
     */
    select?: DiscountLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountLevel
     */
    omit?: DiscountLevelOmit<ExtArgs> | null
  }


  /**
   * Model CustomerServiceAgents
   */

  export type AggregateCustomerServiceAgents = {
    _count: CustomerServiceAgentsCountAggregateOutputType | null
    _avg: CustomerServiceAgentsAvgAggregateOutputType | null
    _sum: CustomerServiceAgentsSumAggregateOutputType | null
    _min: CustomerServiceAgentsMinAggregateOutputType | null
    _max: CustomerServiceAgentsMaxAggregateOutputType | null
  }

  export type CustomerServiceAgentsAvgAggregateOutputType = {
    availableTokens: number | null
  }

  export type CustomerServiceAgentsSumAggregateOutputType = {
    availableTokens: number | null
  }

  export type CustomerServiceAgentsMinAggregateOutputType = {
    id: string | null
    companyName: string | null
    establishmentDate: Date | null
    companyOwnerName: string | null
    companyHumanServiceNumber: string | null
    companyEmail: string | null
    companyDescription: string | null
    agentId: string | null
    agentName: string | null
    username: string | null
    createdAt: Date | null
    availableTokens: number | null
    lastModified: Date | null
  }

  export type CustomerServiceAgentsMaxAggregateOutputType = {
    id: string | null
    companyName: string | null
    establishmentDate: Date | null
    companyOwnerName: string | null
    companyHumanServiceNumber: string | null
    companyEmail: string | null
    companyDescription: string | null
    agentId: string | null
    agentName: string | null
    username: string | null
    createdAt: Date | null
    availableTokens: number | null
    lastModified: Date | null
  }

  export type CustomerServiceAgentsCountAggregateOutputType = {
    id: number
    companyName: number
    establishmentDate: number
    companyOwnerName: number
    companyHumanServiceNumber: number
    companyEmail: number
    companyDescription: number
    agentId: number
    agentName: number
    username: number
    createdAt: number
    availableTokens: number
    lastModified: number
    _all: number
  }


  export type CustomerServiceAgentsAvgAggregateInputType = {
    availableTokens?: true
  }

  export type CustomerServiceAgentsSumAggregateInputType = {
    availableTokens?: true
  }

  export type CustomerServiceAgentsMinAggregateInputType = {
    id?: true
    companyName?: true
    establishmentDate?: true
    companyOwnerName?: true
    companyHumanServiceNumber?: true
    companyEmail?: true
    companyDescription?: true
    agentId?: true
    agentName?: true
    username?: true
    createdAt?: true
    availableTokens?: true
    lastModified?: true
  }

  export type CustomerServiceAgentsMaxAggregateInputType = {
    id?: true
    companyName?: true
    establishmentDate?: true
    companyOwnerName?: true
    companyHumanServiceNumber?: true
    companyEmail?: true
    companyDescription?: true
    agentId?: true
    agentName?: true
    username?: true
    createdAt?: true
    availableTokens?: true
    lastModified?: true
  }

  export type CustomerServiceAgentsCountAggregateInputType = {
    id?: true
    companyName?: true
    establishmentDate?: true
    companyOwnerName?: true
    companyHumanServiceNumber?: true
    companyEmail?: true
    companyDescription?: true
    agentId?: true
    agentName?: true
    username?: true
    createdAt?: true
    availableTokens?: true
    lastModified?: true
    _all?: true
  }

  export type CustomerServiceAgentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerServiceAgents to aggregate.
     */
    where?: CustomerServiceAgentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerServiceAgents to fetch.
     */
    orderBy?: CustomerServiceAgentsOrderByWithRelationInput | CustomerServiceAgentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerServiceAgentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerServiceAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerServiceAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerServiceAgents
    **/
    _count?: true | CustomerServiceAgentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerServiceAgentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerServiceAgentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerServiceAgentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerServiceAgentsMaxAggregateInputType
  }

  export type GetCustomerServiceAgentsAggregateType<T extends CustomerServiceAgentsAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerServiceAgents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerServiceAgents[P]>
      : GetScalarType<T[P], AggregateCustomerServiceAgents[P]>
  }




  export type CustomerServiceAgentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerServiceAgentsWhereInput
    orderBy?: CustomerServiceAgentsOrderByWithAggregationInput | CustomerServiceAgentsOrderByWithAggregationInput[]
    by: CustomerServiceAgentsScalarFieldEnum[] | CustomerServiceAgentsScalarFieldEnum
    having?: CustomerServiceAgentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerServiceAgentsCountAggregateInputType | true
    _avg?: CustomerServiceAgentsAvgAggregateInputType
    _sum?: CustomerServiceAgentsSumAggregateInputType
    _min?: CustomerServiceAgentsMinAggregateInputType
    _max?: CustomerServiceAgentsMaxAggregateInputType
  }

  export type CustomerServiceAgentsGroupByOutputType = {
    id: string
    companyName: string
    establishmentDate: Date
    companyOwnerName: string
    companyHumanServiceNumber: string
    companyEmail: string
    companyDescription: string
    agentId: string
    agentName: string
    username: string
    createdAt: Date
    availableTokens: number
    lastModified: Date
    _count: CustomerServiceAgentsCountAggregateOutputType | null
    _avg: CustomerServiceAgentsAvgAggregateOutputType | null
    _sum: CustomerServiceAgentsSumAggregateOutputType | null
    _min: CustomerServiceAgentsMinAggregateOutputType | null
    _max: CustomerServiceAgentsMaxAggregateOutputType | null
  }

  type GetCustomerServiceAgentsGroupByPayload<T extends CustomerServiceAgentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerServiceAgentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerServiceAgentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerServiceAgentsGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerServiceAgentsGroupByOutputType[P]>
        }
      >
    >


  export type CustomerServiceAgentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    establishmentDate?: boolean
    companyOwnerName?: boolean
    companyHumanServiceNumber?: boolean
    companyEmail?: boolean
    companyDescription?: boolean
    agentId?: boolean
    agentName?: boolean
    username?: boolean
    createdAt?: boolean
    availableTokens?: boolean
    items?: boolean | ItemDefaultArgs<ExtArgs>
    lastModified?: boolean
    modificationHistory?: boolean | AgentModificationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerServiceAgents"]>



  export type CustomerServiceAgentsSelectScalar = {
    id?: boolean
    companyName?: boolean
    establishmentDate?: boolean
    companyOwnerName?: boolean
    companyHumanServiceNumber?: boolean
    companyEmail?: boolean
    companyDescription?: boolean
    agentId?: boolean
    agentName?: boolean
    username?: boolean
    createdAt?: boolean
    availableTokens?: boolean
    lastModified?: boolean
  }

  export type CustomerServiceAgentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyName" | "establishmentDate" | "companyOwnerName" | "companyHumanServiceNumber" | "companyEmail" | "companyDescription" | "agentId" | "agentName" | "username" | "createdAt" | "availableTokens" | "items" | "lastModified" | "modificationHistory", ExtArgs["result"]["customerServiceAgents"]>
  export type CustomerServiceAgentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerServiceAgentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerServiceAgents"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyName: string
      establishmentDate: Date
      companyOwnerName: string
      companyHumanServiceNumber: string
      companyEmail: string
      companyDescription: string
      agentId: string
      agentName: string
      username: string
      createdAt: Date
      availableTokens: number
      lastModified: Date
    }, ExtArgs["result"]["customerServiceAgents"]>
    composites: {
      items: Prisma.$ItemPayload[]
      modificationHistory: Prisma.$AgentModificationPayload[]
    }
  }

  type CustomerServiceAgentsGetPayload<S extends boolean | null | undefined | CustomerServiceAgentsDefaultArgs> = $Result.GetResult<Prisma.$CustomerServiceAgentsPayload, S>

  type CustomerServiceAgentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerServiceAgentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerServiceAgentsCountAggregateInputType | true
    }

  export interface CustomerServiceAgentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerServiceAgents'], meta: { name: 'CustomerServiceAgents' } }
    /**
     * Find zero or one CustomerServiceAgents that matches the filter.
     * @param {CustomerServiceAgentsFindUniqueArgs} args - Arguments to find a CustomerServiceAgents
     * @example
     * // Get one CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerServiceAgentsFindUniqueArgs>(args: SelectSubset<T, CustomerServiceAgentsFindUniqueArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerServiceAgents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerServiceAgentsFindUniqueOrThrowArgs} args - Arguments to find a CustomerServiceAgents
     * @example
     * // Get one CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerServiceAgentsFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerServiceAgentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerServiceAgents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerServiceAgentsFindFirstArgs} args - Arguments to find a CustomerServiceAgents
     * @example
     * // Get one CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerServiceAgentsFindFirstArgs>(args?: SelectSubset<T, CustomerServiceAgentsFindFirstArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerServiceAgents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerServiceAgentsFindFirstOrThrowArgs} args - Arguments to find a CustomerServiceAgents
     * @example
     * // Get one CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerServiceAgentsFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerServiceAgentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerServiceAgents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerServiceAgentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.findMany()
     * 
     * // Get first 10 CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerServiceAgentsWithIdOnly = await prisma.customerServiceAgents.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerServiceAgentsFindManyArgs>(args?: SelectSubset<T, CustomerServiceAgentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerServiceAgents.
     * @param {CustomerServiceAgentsCreateArgs} args - Arguments to create a CustomerServiceAgents.
     * @example
     * // Create one CustomerServiceAgents
     * const CustomerServiceAgents = await prisma.customerServiceAgents.create({
     *   data: {
     *     // ... data to create a CustomerServiceAgents
     *   }
     * })
     * 
     */
    create<T extends CustomerServiceAgentsCreateArgs>(args: SelectSubset<T, CustomerServiceAgentsCreateArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerServiceAgents.
     * @param {CustomerServiceAgentsCreateManyArgs} args - Arguments to create many CustomerServiceAgents.
     * @example
     * // Create many CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerServiceAgentsCreateManyArgs>(args?: SelectSubset<T, CustomerServiceAgentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CustomerServiceAgents.
     * @param {CustomerServiceAgentsDeleteArgs} args - Arguments to delete one CustomerServiceAgents.
     * @example
     * // Delete one CustomerServiceAgents
     * const CustomerServiceAgents = await prisma.customerServiceAgents.delete({
     *   where: {
     *     // ... filter to delete one CustomerServiceAgents
     *   }
     * })
     * 
     */
    delete<T extends CustomerServiceAgentsDeleteArgs>(args: SelectSubset<T, CustomerServiceAgentsDeleteArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerServiceAgents.
     * @param {CustomerServiceAgentsUpdateArgs} args - Arguments to update one CustomerServiceAgents.
     * @example
     * // Update one CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerServiceAgentsUpdateArgs>(args: SelectSubset<T, CustomerServiceAgentsUpdateArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerServiceAgents.
     * @param {CustomerServiceAgentsDeleteManyArgs} args - Arguments to filter CustomerServiceAgents to delete.
     * @example
     * // Delete a few CustomerServiceAgents
     * const { count } = await prisma.customerServiceAgents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerServiceAgentsDeleteManyArgs>(args?: SelectSubset<T, CustomerServiceAgentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerServiceAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerServiceAgentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerServiceAgentsUpdateManyArgs>(args: SelectSubset<T, CustomerServiceAgentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomerServiceAgents.
     * @param {CustomerServiceAgentsUpsertArgs} args - Arguments to update or create a CustomerServiceAgents.
     * @example
     * // Update or create a CustomerServiceAgents
     * const customerServiceAgents = await prisma.customerServiceAgents.upsert({
     *   create: {
     *     // ... data to create a CustomerServiceAgents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerServiceAgents we want to update
     *   }
     * })
     */
    upsert<T extends CustomerServiceAgentsUpsertArgs>(args: SelectSubset<T, CustomerServiceAgentsUpsertArgs<ExtArgs>>): Prisma__CustomerServiceAgentsClient<$Result.GetResult<Prisma.$CustomerServiceAgentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerServiceAgents that matches the filter.
     * @param {CustomerServiceAgentsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const customerServiceAgents = await prisma.customerServiceAgents.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CustomerServiceAgentsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CustomerServiceAgents.
     * @param {CustomerServiceAgentsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const customerServiceAgents = await prisma.customerServiceAgents.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CustomerServiceAgentsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CustomerServiceAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerServiceAgentsCountArgs} args - Arguments to filter CustomerServiceAgents to count.
     * @example
     * // Count the number of CustomerServiceAgents
     * const count = await prisma.customerServiceAgents.count({
     *   where: {
     *     // ... the filter for the CustomerServiceAgents we want to count
     *   }
     * })
    **/
    count<T extends CustomerServiceAgentsCountArgs>(
      args?: Subset<T, CustomerServiceAgentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerServiceAgentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerServiceAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerServiceAgentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerServiceAgentsAggregateArgs>(args: Subset<T, CustomerServiceAgentsAggregateArgs>): Prisma.PrismaPromise<GetCustomerServiceAgentsAggregateType<T>>

    /**
     * Group by CustomerServiceAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerServiceAgentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerServiceAgentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerServiceAgentsGroupByArgs['orderBy'] }
        : { orderBy?: CustomerServiceAgentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerServiceAgentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerServiceAgentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerServiceAgents model
   */
  readonly fields: CustomerServiceAgentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerServiceAgents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerServiceAgentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomerServiceAgents model
   */
  interface CustomerServiceAgentsFieldRefs {
    readonly id: FieldRef<"CustomerServiceAgents", 'String'>
    readonly companyName: FieldRef<"CustomerServiceAgents", 'String'>
    readonly establishmentDate: FieldRef<"CustomerServiceAgents", 'DateTime'>
    readonly companyOwnerName: FieldRef<"CustomerServiceAgents", 'String'>
    readonly companyHumanServiceNumber: FieldRef<"CustomerServiceAgents", 'String'>
    readonly companyEmail: FieldRef<"CustomerServiceAgents", 'String'>
    readonly companyDescription: FieldRef<"CustomerServiceAgents", 'String'>
    readonly agentId: FieldRef<"CustomerServiceAgents", 'String'>
    readonly agentName: FieldRef<"CustomerServiceAgents", 'String'>
    readonly username: FieldRef<"CustomerServiceAgents", 'String'>
    readonly createdAt: FieldRef<"CustomerServiceAgents", 'DateTime'>
    readonly availableTokens: FieldRef<"CustomerServiceAgents", 'Int'>
    readonly lastModified: FieldRef<"CustomerServiceAgents", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerServiceAgents findUnique
   */
  export type CustomerServiceAgentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * Filter, which CustomerServiceAgents to fetch.
     */
    where: CustomerServiceAgentsWhereUniqueInput
  }

  /**
   * CustomerServiceAgents findUniqueOrThrow
   */
  export type CustomerServiceAgentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * Filter, which CustomerServiceAgents to fetch.
     */
    where: CustomerServiceAgentsWhereUniqueInput
  }

  /**
   * CustomerServiceAgents findFirst
   */
  export type CustomerServiceAgentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * Filter, which CustomerServiceAgents to fetch.
     */
    where?: CustomerServiceAgentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerServiceAgents to fetch.
     */
    orderBy?: CustomerServiceAgentsOrderByWithRelationInput | CustomerServiceAgentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerServiceAgents.
     */
    cursor?: CustomerServiceAgentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerServiceAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerServiceAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerServiceAgents.
     */
    distinct?: CustomerServiceAgentsScalarFieldEnum | CustomerServiceAgentsScalarFieldEnum[]
  }

  /**
   * CustomerServiceAgents findFirstOrThrow
   */
  export type CustomerServiceAgentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * Filter, which CustomerServiceAgents to fetch.
     */
    where?: CustomerServiceAgentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerServiceAgents to fetch.
     */
    orderBy?: CustomerServiceAgentsOrderByWithRelationInput | CustomerServiceAgentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerServiceAgents.
     */
    cursor?: CustomerServiceAgentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerServiceAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerServiceAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerServiceAgents.
     */
    distinct?: CustomerServiceAgentsScalarFieldEnum | CustomerServiceAgentsScalarFieldEnum[]
  }

  /**
   * CustomerServiceAgents findMany
   */
  export type CustomerServiceAgentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * Filter, which CustomerServiceAgents to fetch.
     */
    where?: CustomerServiceAgentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerServiceAgents to fetch.
     */
    orderBy?: CustomerServiceAgentsOrderByWithRelationInput | CustomerServiceAgentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerServiceAgents.
     */
    cursor?: CustomerServiceAgentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerServiceAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerServiceAgents.
     */
    skip?: number
    distinct?: CustomerServiceAgentsScalarFieldEnum | CustomerServiceAgentsScalarFieldEnum[]
  }

  /**
   * CustomerServiceAgents create
   */
  export type CustomerServiceAgentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerServiceAgents.
     */
    data: XOR<CustomerServiceAgentsCreateInput, CustomerServiceAgentsUncheckedCreateInput>
  }

  /**
   * CustomerServiceAgents createMany
   */
  export type CustomerServiceAgentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerServiceAgents.
     */
    data: CustomerServiceAgentsCreateManyInput | CustomerServiceAgentsCreateManyInput[]
  }

  /**
   * CustomerServiceAgents update
   */
  export type CustomerServiceAgentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerServiceAgents.
     */
    data: XOR<CustomerServiceAgentsUpdateInput, CustomerServiceAgentsUncheckedUpdateInput>
    /**
     * Choose, which CustomerServiceAgents to update.
     */
    where: CustomerServiceAgentsWhereUniqueInput
  }

  /**
   * CustomerServiceAgents updateMany
   */
  export type CustomerServiceAgentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerServiceAgents.
     */
    data: XOR<CustomerServiceAgentsUpdateManyMutationInput, CustomerServiceAgentsUncheckedUpdateManyInput>
    /**
     * Filter which CustomerServiceAgents to update
     */
    where?: CustomerServiceAgentsWhereInput
    /**
     * Limit how many CustomerServiceAgents to update.
     */
    limit?: number
  }

  /**
   * CustomerServiceAgents upsert
   */
  export type CustomerServiceAgentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerServiceAgents to update in case it exists.
     */
    where: CustomerServiceAgentsWhereUniqueInput
    /**
     * In case the CustomerServiceAgents found by the `where` argument doesn't exist, create a new CustomerServiceAgents with this data.
     */
    create: XOR<CustomerServiceAgentsCreateInput, CustomerServiceAgentsUncheckedCreateInput>
    /**
     * In case the CustomerServiceAgents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerServiceAgentsUpdateInput, CustomerServiceAgentsUncheckedUpdateInput>
  }

  /**
   * CustomerServiceAgents delete
   */
  export type CustomerServiceAgentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
    /**
     * Filter which CustomerServiceAgents to delete.
     */
    where: CustomerServiceAgentsWhereUniqueInput
  }

  /**
   * CustomerServiceAgents deleteMany
   */
  export type CustomerServiceAgentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerServiceAgents to delete
     */
    where?: CustomerServiceAgentsWhereInput
    /**
     * Limit how many CustomerServiceAgents to delete.
     */
    limit?: number
  }

  /**
   * CustomerServiceAgents findRaw
   */
  export type CustomerServiceAgentsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CustomerServiceAgents aggregateRaw
   */
  export type CustomerServiceAgentsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CustomerServiceAgents without action
   */
  export type CustomerServiceAgentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerServiceAgents
     */
    select?: CustomerServiceAgentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerServiceAgents
     */
    omit?: CustomerServiceAgentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerServiceAgentsInclude<ExtArgs> | null
  }


  /**
   * Model AgentUsageStatistics
   */

  export type AggregateAgentUsageStatistics = {
    _count: AgentUsageStatisticsCountAggregateOutputType | null
    _avg: AgentUsageStatisticsAvgAggregateOutputType | null
    _sum: AgentUsageStatisticsSumAggregateOutputType | null
    _min: AgentUsageStatisticsMinAggregateOutputType | null
    _max: AgentUsageStatisticsMaxAggregateOutputType | null
  }

  export type AgentUsageStatisticsAvgAggregateOutputType = {
    satisfactionRate: number | null
  }

  export type AgentUsageStatisticsSumAggregateOutputType = {
    satisfactionRate: number | null
  }

  export type AgentUsageStatisticsMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    agentName: string | null
    satisfactionRate: number | null
  }

  export type AgentUsageStatisticsMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    agentName: string | null
    satisfactionRate: number | null
  }

  export type AgentUsageStatisticsCountAggregateOutputType = {
    id: number
    agentId: number
    agentName: number
    satisfactionRate: number
    _all: number
  }


  export type AgentUsageStatisticsAvgAggregateInputType = {
    satisfactionRate?: true
  }

  export type AgentUsageStatisticsSumAggregateInputType = {
    satisfactionRate?: true
  }

  export type AgentUsageStatisticsMinAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    satisfactionRate?: true
  }

  export type AgentUsageStatisticsMaxAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    satisfactionRate?: true
  }

  export type AgentUsageStatisticsCountAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    satisfactionRate?: true
    _all?: true
  }

  export type AgentUsageStatisticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentUsageStatistics to aggregate.
     */
    where?: AgentUsageStatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentUsageStatistics to fetch.
     */
    orderBy?: AgentUsageStatisticsOrderByWithRelationInput | AgentUsageStatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentUsageStatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentUsageStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentUsageStatistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentUsageStatistics
    **/
    _count?: true | AgentUsageStatisticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentUsageStatisticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentUsageStatisticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentUsageStatisticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentUsageStatisticsMaxAggregateInputType
  }

  export type GetAgentUsageStatisticsAggregateType<T extends AgentUsageStatisticsAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentUsageStatistics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentUsageStatistics[P]>
      : GetScalarType<T[P], AggregateAgentUsageStatistics[P]>
  }




  export type AgentUsageStatisticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentUsageStatisticsWhereInput
    orderBy?: AgentUsageStatisticsOrderByWithAggregationInput | AgentUsageStatisticsOrderByWithAggregationInput[]
    by: AgentUsageStatisticsScalarFieldEnum[] | AgentUsageStatisticsScalarFieldEnum
    having?: AgentUsageStatisticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentUsageStatisticsCountAggregateInputType | true
    _avg?: AgentUsageStatisticsAvgAggregateInputType
    _sum?: AgentUsageStatisticsSumAggregateInputType
    _min?: AgentUsageStatisticsMinAggregateInputType
    _max?: AgentUsageStatisticsMaxAggregateInputType
  }

  export type AgentUsageStatisticsGroupByOutputType = {
    id: string
    agentId: string
    agentName: string
    satisfactionRate: number
    _count: AgentUsageStatisticsCountAggregateOutputType | null
    _avg: AgentUsageStatisticsAvgAggregateOutputType | null
    _sum: AgentUsageStatisticsSumAggregateOutputType | null
    _min: AgentUsageStatisticsMinAggregateOutputType | null
    _max: AgentUsageStatisticsMaxAggregateOutputType | null
  }

  type GetAgentUsageStatisticsGroupByPayload<T extends AgentUsageStatisticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentUsageStatisticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentUsageStatisticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentUsageStatisticsGroupByOutputType[P]>
            : GetScalarType<T[P], AgentUsageStatisticsGroupByOutputType[P]>
        }
      >
    >


  export type AgentUsageStatisticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    usageLogs?: boolean | UsageLogDefaultArgs<ExtArgs>
    satisfactionRate?: boolean
    satisfactionRateLogs?: boolean | SatisfactionRateLogDefaultArgs<ExtArgs>
    customerReviews?: boolean | CustomerReviewDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentUsageStatistics"]>



  export type AgentUsageStatisticsSelectScalar = {
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    satisfactionRate?: boolean
  }

  export type AgentUsageStatisticsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "agentName" | "usageLogs" | "satisfactionRate" | "satisfactionRateLogs" | "customerReviews", ExtArgs["result"]["agentUsageStatistics"]>
  export type AgentUsageStatisticsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentUsageStatisticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentUsageStatistics"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      agentName: string
      satisfactionRate: number
    }, ExtArgs["result"]["agentUsageStatistics"]>
    composites: {
      usageLogs: Prisma.$UsageLogPayload[]
      satisfactionRateLogs: Prisma.$SatisfactionRateLogPayload[]
      customerReviews: Prisma.$CustomerReviewPayload[]
    }
  }

  type AgentUsageStatisticsGetPayload<S extends boolean | null | undefined | AgentUsageStatisticsDefaultArgs> = $Result.GetResult<Prisma.$AgentUsageStatisticsPayload, S>

  type AgentUsageStatisticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentUsageStatisticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentUsageStatisticsCountAggregateInputType | true
    }

  export interface AgentUsageStatisticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentUsageStatistics'], meta: { name: 'AgentUsageStatistics' } }
    /**
     * Find zero or one AgentUsageStatistics that matches the filter.
     * @param {AgentUsageStatisticsFindUniqueArgs} args - Arguments to find a AgentUsageStatistics
     * @example
     * // Get one AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentUsageStatisticsFindUniqueArgs>(args: SelectSubset<T, AgentUsageStatisticsFindUniqueArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentUsageStatistics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentUsageStatisticsFindUniqueOrThrowArgs} args - Arguments to find a AgentUsageStatistics
     * @example
     * // Get one AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentUsageStatisticsFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentUsageStatisticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentUsageStatistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUsageStatisticsFindFirstArgs} args - Arguments to find a AgentUsageStatistics
     * @example
     * // Get one AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentUsageStatisticsFindFirstArgs>(args?: SelectSubset<T, AgentUsageStatisticsFindFirstArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentUsageStatistics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUsageStatisticsFindFirstOrThrowArgs} args - Arguments to find a AgentUsageStatistics
     * @example
     * // Get one AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentUsageStatisticsFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentUsageStatisticsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentUsageStatistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUsageStatisticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.findMany()
     * 
     * // Get first 10 AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentUsageStatisticsWithIdOnly = await prisma.agentUsageStatistics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentUsageStatisticsFindManyArgs>(args?: SelectSubset<T, AgentUsageStatisticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentUsageStatistics.
     * @param {AgentUsageStatisticsCreateArgs} args - Arguments to create a AgentUsageStatistics.
     * @example
     * // Create one AgentUsageStatistics
     * const AgentUsageStatistics = await prisma.agentUsageStatistics.create({
     *   data: {
     *     // ... data to create a AgentUsageStatistics
     *   }
     * })
     * 
     */
    create<T extends AgentUsageStatisticsCreateArgs>(args: SelectSubset<T, AgentUsageStatisticsCreateArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentUsageStatistics.
     * @param {AgentUsageStatisticsCreateManyArgs} args - Arguments to create many AgentUsageStatistics.
     * @example
     * // Create many AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentUsageStatisticsCreateManyArgs>(args?: SelectSubset<T, AgentUsageStatisticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AgentUsageStatistics.
     * @param {AgentUsageStatisticsDeleteArgs} args - Arguments to delete one AgentUsageStatistics.
     * @example
     * // Delete one AgentUsageStatistics
     * const AgentUsageStatistics = await prisma.agentUsageStatistics.delete({
     *   where: {
     *     // ... filter to delete one AgentUsageStatistics
     *   }
     * })
     * 
     */
    delete<T extends AgentUsageStatisticsDeleteArgs>(args: SelectSubset<T, AgentUsageStatisticsDeleteArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentUsageStatistics.
     * @param {AgentUsageStatisticsUpdateArgs} args - Arguments to update one AgentUsageStatistics.
     * @example
     * // Update one AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUsageStatisticsUpdateArgs>(args: SelectSubset<T, AgentUsageStatisticsUpdateArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentUsageStatistics.
     * @param {AgentUsageStatisticsDeleteManyArgs} args - Arguments to filter AgentUsageStatistics to delete.
     * @example
     * // Delete a few AgentUsageStatistics
     * const { count } = await prisma.agentUsageStatistics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentUsageStatisticsDeleteManyArgs>(args?: SelectSubset<T, AgentUsageStatisticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentUsageStatistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUsageStatisticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUsageStatisticsUpdateManyArgs>(args: SelectSubset<T, AgentUsageStatisticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentUsageStatistics.
     * @param {AgentUsageStatisticsUpsertArgs} args - Arguments to update or create a AgentUsageStatistics.
     * @example
     * // Update or create a AgentUsageStatistics
     * const agentUsageStatistics = await prisma.agentUsageStatistics.upsert({
     *   create: {
     *     // ... data to create a AgentUsageStatistics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentUsageStatistics we want to update
     *   }
     * })
     */
    upsert<T extends AgentUsageStatisticsUpsertArgs>(args: SelectSubset<T, AgentUsageStatisticsUpsertArgs<ExtArgs>>): Prisma__AgentUsageStatisticsClient<$Result.GetResult<Prisma.$AgentUsageStatisticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentUsageStatistics that matches the filter.
     * @param {AgentUsageStatisticsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const agentUsageStatistics = await prisma.agentUsageStatistics.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AgentUsageStatisticsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a AgentUsageStatistics.
     * @param {AgentUsageStatisticsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const agentUsageStatistics = await prisma.agentUsageStatistics.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AgentUsageStatisticsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of AgentUsageStatistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUsageStatisticsCountArgs} args - Arguments to filter AgentUsageStatistics to count.
     * @example
     * // Count the number of AgentUsageStatistics
     * const count = await prisma.agentUsageStatistics.count({
     *   where: {
     *     // ... the filter for the AgentUsageStatistics we want to count
     *   }
     * })
    **/
    count<T extends AgentUsageStatisticsCountArgs>(
      args?: Subset<T, AgentUsageStatisticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentUsageStatisticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentUsageStatistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUsageStatisticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentUsageStatisticsAggregateArgs>(args: Subset<T, AgentUsageStatisticsAggregateArgs>): Prisma.PrismaPromise<GetAgentUsageStatisticsAggregateType<T>>

    /**
     * Group by AgentUsageStatistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUsageStatisticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentUsageStatisticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentUsageStatisticsGroupByArgs['orderBy'] }
        : { orderBy?: AgentUsageStatisticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentUsageStatisticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentUsageStatisticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentUsageStatistics model
   */
  readonly fields: AgentUsageStatisticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentUsageStatistics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentUsageStatisticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentUsageStatistics model
   */
  interface AgentUsageStatisticsFieldRefs {
    readonly id: FieldRef<"AgentUsageStatistics", 'String'>
    readonly agentId: FieldRef<"AgentUsageStatistics", 'String'>
    readonly agentName: FieldRef<"AgentUsageStatistics", 'String'>
    readonly satisfactionRate: FieldRef<"AgentUsageStatistics", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AgentUsageStatistics findUnique
   */
  export type AgentUsageStatisticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * Filter, which AgentUsageStatistics to fetch.
     */
    where: AgentUsageStatisticsWhereUniqueInput
  }

  /**
   * AgentUsageStatistics findUniqueOrThrow
   */
  export type AgentUsageStatisticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * Filter, which AgentUsageStatistics to fetch.
     */
    where: AgentUsageStatisticsWhereUniqueInput
  }

  /**
   * AgentUsageStatistics findFirst
   */
  export type AgentUsageStatisticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * Filter, which AgentUsageStatistics to fetch.
     */
    where?: AgentUsageStatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentUsageStatistics to fetch.
     */
    orderBy?: AgentUsageStatisticsOrderByWithRelationInput | AgentUsageStatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentUsageStatistics.
     */
    cursor?: AgentUsageStatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentUsageStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentUsageStatistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentUsageStatistics.
     */
    distinct?: AgentUsageStatisticsScalarFieldEnum | AgentUsageStatisticsScalarFieldEnum[]
  }

  /**
   * AgentUsageStatistics findFirstOrThrow
   */
  export type AgentUsageStatisticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * Filter, which AgentUsageStatistics to fetch.
     */
    where?: AgentUsageStatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentUsageStatistics to fetch.
     */
    orderBy?: AgentUsageStatisticsOrderByWithRelationInput | AgentUsageStatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentUsageStatistics.
     */
    cursor?: AgentUsageStatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentUsageStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentUsageStatistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentUsageStatistics.
     */
    distinct?: AgentUsageStatisticsScalarFieldEnum | AgentUsageStatisticsScalarFieldEnum[]
  }

  /**
   * AgentUsageStatistics findMany
   */
  export type AgentUsageStatisticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * Filter, which AgentUsageStatistics to fetch.
     */
    where?: AgentUsageStatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentUsageStatistics to fetch.
     */
    orderBy?: AgentUsageStatisticsOrderByWithRelationInput | AgentUsageStatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentUsageStatistics.
     */
    cursor?: AgentUsageStatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentUsageStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentUsageStatistics.
     */
    skip?: number
    distinct?: AgentUsageStatisticsScalarFieldEnum | AgentUsageStatisticsScalarFieldEnum[]
  }

  /**
   * AgentUsageStatistics create
   */
  export type AgentUsageStatisticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentUsageStatistics.
     */
    data: XOR<AgentUsageStatisticsCreateInput, AgentUsageStatisticsUncheckedCreateInput>
  }

  /**
   * AgentUsageStatistics createMany
   */
  export type AgentUsageStatisticsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentUsageStatistics.
     */
    data: AgentUsageStatisticsCreateManyInput | AgentUsageStatisticsCreateManyInput[]
  }

  /**
   * AgentUsageStatistics update
   */
  export type AgentUsageStatisticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentUsageStatistics.
     */
    data: XOR<AgentUsageStatisticsUpdateInput, AgentUsageStatisticsUncheckedUpdateInput>
    /**
     * Choose, which AgentUsageStatistics to update.
     */
    where: AgentUsageStatisticsWhereUniqueInput
  }

  /**
   * AgentUsageStatistics updateMany
   */
  export type AgentUsageStatisticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentUsageStatistics.
     */
    data: XOR<AgentUsageStatisticsUpdateManyMutationInput, AgentUsageStatisticsUncheckedUpdateManyInput>
    /**
     * Filter which AgentUsageStatistics to update
     */
    where?: AgentUsageStatisticsWhereInput
    /**
     * Limit how many AgentUsageStatistics to update.
     */
    limit?: number
  }

  /**
   * AgentUsageStatistics upsert
   */
  export type AgentUsageStatisticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentUsageStatistics to update in case it exists.
     */
    where: AgentUsageStatisticsWhereUniqueInput
    /**
     * In case the AgentUsageStatistics found by the `where` argument doesn't exist, create a new AgentUsageStatistics with this data.
     */
    create: XOR<AgentUsageStatisticsCreateInput, AgentUsageStatisticsUncheckedCreateInput>
    /**
     * In case the AgentUsageStatistics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUsageStatisticsUpdateInput, AgentUsageStatisticsUncheckedUpdateInput>
  }

  /**
   * AgentUsageStatistics delete
   */
  export type AgentUsageStatisticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
    /**
     * Filter which AgentUsageStatistics to delete.
     */
    where: AgentUsageStatisticsWhereUniqueInput
  }

  /**
   * AgentUsageStatistics deleteMany
   */
  export type AgentUsageStatisticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentUsageStatistics to delete
     */
    where?: AgentUsageStatisticsWhereInput
    /**
     * Limit how many AgentUsageStatistics to delete.
     */
    limit?: number
  }

  /**
   * AgentUsageStatistics findRaw
   */
  export type AgentUsageStatisticsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AgentUsageStatistics aggregateRaw
   */
  export type AgentUsageStatisticsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AgentUsageStatistics without action
   */
  export type AgentUsageStatisticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentUsageStatistics
     */
    select?: AgentUsageStatisticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentUsageStatistics
     */
    omit?: AgentUsageStatisticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentUsageStatisticsInclude<ExtArgs> | null
  }


  /**
   * Model AgentRequestsHandledLogs
   */

  export type AggregateAgentRequestsHandledLogs = {
    _count: AgentRequestsHandledLogsCountAggregateOutputType | null
    _avg: AgentRequestsHandledLogsAvgAggregateOutputType | null
    _sum: AgentRequestsHandledLogsSumAggregateOutputType | null
    _min: AgentRequestsHandledLogsMinAggregateOutputType | null
    _max: AgentRequestsHandledLogsMaxAggregateOutputType | null
  }

  export type AgentRequestsHandledLogsAvgAggregateOutputType = {
    totalRequestsHandled: number | null
  }

  export type AgentRequestsHandledLogsSumAggregateOutputType = {
    totalRequestsHandled: number | null
  }

  export type AgentRequestsHandledLogsMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    agentName: string | null
    totalRequestsHandled: number | null
  }

  export type AgentRequestsHandledLogsMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    agentName: string | null
    totalRequestsHandled: number | null
  }

  export type AgentRequestsHandledLogsCountAggregateOutputType = {
    id: number
    agentId: number
    agentName: number
    totalRequestsHandled: number
    _all: number
  }


  export type AgentRequestsHandledLogsAvgAggregateInputType = {
    totalRequestsHandled?: true
  }

  export type AgentRequestsHandledLogsSumAggregateInputType = {
    totalRequestsHandled?: true
  }

  export type AgentRequestsHandledLogsMinAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    totalRequestsHandled?: true
  }

  export type AgentRequestsHandledLogsMaxAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    totalRequestsHandled?: true
  }

  export type AgentRequestsHandledLogsCountAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    totalRequestsHandled?: true
    _all?: true
  }

  export type AgentRequestsHandledLogsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRequestsHandledLogs to aggregate.
     */
    where?: AgentRequestsHandledLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRequestsHandledLogs to fetch.
     */
    orderBy?: AgentRequestsHandledLogsOrderByWithRelationInput | AgentRequestsHandledLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentRequestsHandledLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRequestsHandledLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRequestsHandledLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentRequestsHandledLogs
    **/
    _count?: true | AgentRequestsHandledLogsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentRequestsHandledLogsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentRequestsHandledLogsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentRequestsHandledLogsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentRequestsHandledLogsMaxAggregateInputType
  }

  export type GetAgentRequestsHandledLogsAggregateType<T extends AgentRequestsHandledLogsAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentRequestsHandledLogs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentRequestsHandledLogs[P]>
      : GetScalarType<T[P], AggregateAgentRequestsHandledLogs[P]>
  }




  export type AgentRequestsHandledLogsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRequestsHandledLogsWhereInput
    orderBy?: AgentRequestsHandledLogsOrderByWithAggregationInput | AgentRequestsHandledLogsOrderByWithAggregationInput[]
    by: AgentRequestsHandledLogsScalarFieldEnum[] | AgentRequestsHandledLogsScalarFieldEnum
    having?: AgentRequestsHandledLogsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentRequestsHandledLogsCountAggregateInputType | true
    _avg?: AgentRequestsHandledLogsAvgAggregateInputType
    _sum?: AgentRequestsHandledLogsSumAggregateInputType
    _min?: AgentRequestsHandledLogsMinAggregateInputType
    _max?: AgentRequestsHandledLogsMaxAggregateInputType
  }

  export type AgentRequestsHandledLogsGroupByOutputType = {
    id: string
    agentId: string
    agentName: string
    totalRequestsHandled: number
    _count: AgentRequestsHandledLogsCountAggregateOutputType | null
    _avg: AgentRequestsHandledLogsAvgAggregateOutputType | null
    _sum: AgentRequestsHandledLogsSumAggregateOutputType | null
    _min: AgentRequestsHandledLogsMinAggregateOutputType | null
    _max: AgentRequestsHandledLogsMaxAggregateOutputType | null
  }

  type GetAgentRequestsHandledLogsGroupByPayload<T extends AgentRequestsHandledLogsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentRequestsHandledLogsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentRequestsHandledLogsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentRequestsHandledLogsGroupByOutputType[P]>
            : GetScalarType<T[P], AgentRequestsHandledLogsGroupByOutputType[P]>
        }
      >
    >


  export type AgentRequestsHandledLogsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    totalRequestsHandled?: boolean
    requestLogs?: boolean | RequestHandledLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentRequestsHandledLogs"]>



  export type AgentRequestsHandledLogsSelectScalar = {
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    totalRequestsHandled?: boolean
  }

  export type AgentRequestsHandledLogsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "agentName" | "totalRequestsHandled" | "requestLogs", ExtArgs["result"]["agentRequestsHandledLogs"]>
  export type AgentRequestsHandledLogsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentRequestsHandledLogsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentRequestsHandledLogs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      agentName: string
      totalRequestsHandled: number
    }, ExtArgs["result"]["agentRequestsHandledLogs"]>
    composites: {
      requestLogs: Prisma.$RequestHandledLogPayload[]
    }
  }

  type AgentRequestsHandledLogsGetPayload<S extends boolean | null | undefined | AgentRequestsHandledLogsDefaultArgs> = $Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload, S>

  type AgentRequestsHandledLogsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentRequestsHandledLogsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentRequestsHandledLogsCountAggregateInputType | true
    }

  export interface AgentRequestsHandledLogsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentRequestsHandledLogs'], meta: { name: 'AgentRequestsHandledLogs' } }
    /**
     * Find zero or one AgentRequestsHandledLogs that matches the filter.
     * @param {AgentRequestsHandledLogsFindUniqueArgs} args - Arguments to find a AgentRequestsHandledLogs
     * @example
     * // Get one AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentRequestsHandledLogsFindUniqueArgs>(args: SelectSubset<T, AgentRequestsHandledLogsFindUniqueArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentRequestsHandledLogs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentRequestsHandledLogsFindUniqueOrThrowArgs} args - Arguments to find a AgentRequestsHandledLogs
     * @example
     * // Get one AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentRequestsHandledLogsFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentRequestsHandledLogsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRequestsHandledLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRequestsHandledLogsFindFirstArgs} args - Arguments to find a AgentRequestsHandledLogs
     * @example
     * // Get one AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentRequestsHandledLogsFindFirstArgs>(args?: SelectSubset<T, AgentRequestsHandledLogsFindFirstArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRequestsHandledLogs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRequestsHandledLogsFindFirstOrThrowArgs} args - Arguments to find a AgentRequestsHandledLogs
     * @example
     * // Get one AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentRequestsHandledLogsFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentRequestsHandledLogsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentRequestsHandledLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRequestsHandledLogsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findMany()
     * 
     * // Get first 10 AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentRequestsHandledLogsWithIdOnly = await prisma.agentRequestsHandledLogs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentRequestsHandledLogsFindManyArgs>(args?: SelectSubset<T, AgentRequestsHandledLogsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentRequestsHandledLogs.
     * @param {AgentRequestsHandledLogsCreateArgs} args - Arguments to create a AgentRequestsHandledLogs.
     * @example
     * // Create one AgentRequestsHandledLogs
     * const AgentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.create({
     *   data: {
     *     // ... data to create a AgentRequestsHandledLogs
     *   }
     * })
     * 
     */
    create<T extends AgentRequestsHandledLogsCreateArgs>(args: SelectSubset<T, AgentRequestsHandledLogsCreateArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentRequestsHandledLogs.
     * @param {AgentRequestsHandledLogsCreateManyArgs} args - Arguments to create many AgentRequestsHandledLogs.
     * @example
     * // Create many AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentRequestsHandledLogsCreateManyArgs>(args?: SelectSubset<T, AgentRequestsHandledLogsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AgentRequestsHandledLogs.
     * @param {AgentRequestsHandledLogsDeleteArgs} args - Arguments to delete one AgentRequestsHandledLogs.
     * @example
     * // Delete one AgentRequestsHandledLogs
     * const AgentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.delete({
     *   where: {
     *     // ... filter to delete one AgentRequestsHandledLogs
     *   }
     * })
     * 
     */
    delete<T extends AgentRequestsHandledLogsDeleteArgs>(args: SelectSubset<T, AgentRequestsHandledLogsDeleteArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentRequestsHandledLogs.
     * @param {AgentRequestsHandledLogsUpdateArgs} args - Arguments to update one AgentRequestsHandledLogs.
     * @example
     * // Update one AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentRequestsHandledLogsUpdateArgs>(args: SelectSubset<T, AgentRequestsHandledLogsUpdateArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentRequestsHandledLogs.
     * @param {AgentRequestsHandledLogsDeleteManyArgs} args - Arguments to filter AgentRequestsHandledLogs to delete.
     * @example
     * // Delete a few AgentRequestsHandledLogs
     * const { count } = await prisma.agentRequestsHandledLogs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentRequestsHandledLogsDeleteManyArgs>(args?: SelectSubset<T, AgentRequestsHandledLogsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentRequestsHandledLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRequestsHandledLogsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentRequestsHandledLogsUpdateManyArgs>(args: SelectSubset<T, AgentRequestsHandledLogsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentRequestsHandledLogs.
     * @param {AgentRequestsHandledLogsUpsertArgs} args - Arguments to update or create a AgentRequestsHandledLogs.
     * @example
     * // Update or create a AgentRequestsHandledLogs
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.upsert({
     *   create: {
     *     // ... data to create a AgentRequestsHandledLogs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentRequestsHandledLogs we want to update
     *   }
     * })
     */
    upsert<T extends AgentRequestsHandledLogsUpsertArgs>(args: SelectSubset<T, AgentRequestsHandledLogsUpsertArgs<ExtArgs>>): Prisma__AgentRequestsHandledLogsClient<$Result.GetResult<Prisma.$AgentRequestsHandledLogsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentRequestsHandledLogs that matches the filter.
     * @param {AgentRequestsHandledLogsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AgentRequestsHandledLogsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a AgentRequestsHandledLogs.
     * @param {AgentRequestsHandledLogsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const agentRequestsHandledLogs = await prisma.agentRequestsHandledLogs.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AgentRequestsHandledLogsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of AgentRequestsHandledLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRequestsHandledLogsCountArgs} args - Arguments to filter AgentRequestsHandledLogs to count.
     * @example
     * // Count the number of AgentRequestsHandledLogs
     * const count = await prisma.agentRequestsHandledLogs.count({
     *   where: {
     *     // ... the filter for the AgentRequestsHandledLogs we want to count
     *   }
     * })
    **/
    count<T extends AgentRequestsHandledLogsCountArgs>(
      args?: Subset<T, AgentRequestsHandledLogsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentRequestsHandledLogsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentRequestsHandledLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRequestsHandledLogsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentRequestsHandledLogsAggregateArgs>(args: Subset<T, AgentRequestsHandledLogsAggregateArgs>): Prisma.PrismaPromise<GetAgentRequestsHandledLogsAggregateType<T>>

    /**
     * Group by AgentRequestsHandledLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRequestsHandledLogsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentRequestsHandledLogsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentRequestsHandledLogsGroupByArgs['orderBy'] }
        : { orderBy?: AgentRequestsHandledLogsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentRequestsHandledLogsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentRequestsHandledLogsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentRequestsHandledLogs model
   */
  readonly fields: AgentRequestsHandledLogsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentRequestsHandledLogs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentRequestsHandledLogsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentRequestsHandledLogs model
   */
  interface AgentRequestsHandledLogsFieldRefs {
    readonly id: FieldRef<"AgentRequestsHandledLogs", 'String'>
    readonly agentId: FieldRef<"AgentRequestsHandledLogs", 'String'>
    readonly agentName: FieldRef<"AgentRequestsHandledLogs", 'String'>
    readonly totalRequestsHandled: FieldRef<"AgentRequestsHandledLogs", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AgentRequestsHandledLogs findUnique
   */
  export type AgentRequestsHandledLogsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * Filter, which AgentRequestsHandledLogs to fetch.
     */
    where: AgentRequestsHandledLogsWhereUniqueInput
  }

  /**
   * AgentRequestsHandledLogs findUniqueOrThrow
   */
  export type AgentRequestsHandledLogsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * Filter, which AgentRequestsHandledLogs to fetch.
     */
    where: AgentRequestsHandledLogsWhereUniqueInput
  }

  /**
   * AgentRequestsHandledLogs findFirst
   */
  export type AgentRequestsHandledLogsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * Filter, which AgentRequestsHandledLogs to fetch.
     */
    where?: AgentRequestsHandledLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRequestsHandledLogs to fetch.
     */
    orderBy?: AgentRequestsHandledLogsOrderByWithRelationInput | AgentRequestsHandledLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRequestsHandledLogs.
     */
    cursor?: AgentRequestsHandledLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRequestsHandledLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRequestsHandledLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRequestsHandledLogs.
     */
    distinct?: AgentRequestsHandledLogsScalarFieldEnum | AgentRequestsHandledLogsScalarFieldEnum[]
  }

  /**
   * AgentRequestsHandledLogs findFirstOrThrow
   */
  export type AgentRequestsHandledLogsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * Filter, which AgentRequestsHandledLogs to fetch.
     */
    where?: AgentRequestsHandledLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRequestsHandledLogs to fetch.
     */
    orderBy?: AgentRequestsHandledLogsOrderByWithRelationInput | AgentRequestsHandledLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRequestsHandledLogs.
     */
    cursor?: AgentRequestsHandledLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRequestsHandledLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRequestsHandledLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRequestsHandledLogs.
     */
    distinct?: AgentRequestsHandledLogsScalarFieldEnum | AgentRequestsHandledLogsScalarFieldEnum[]
  }

  /**
   * AgentRequestsHandledLogs findMany
   */
  export type AgentRequestsHandledLogsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * Filter, which AgentRequestsHandledLogs to fetch.
     */
    where?: AgentRequestsHandledLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRequestsHandledLogs to fetch.
     */
    orderBy?: AgentRequestsHandledLogsOrderByWithRelationInput | AgentRequestsHandledLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentRequestsHandledLogs.
     */
    cursor?: AgentRequestsHandledLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRequestsHandledLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRequestsHandledLogs.
     */
    skip?: number
    distinct?: AgentRequestsHandledLogsScalarFieldEnum | AgentRequestsHandledLogsScalarFieldEnum[]
  }

  /**
   * AgentRequestsHandledLogs create
   */
  export type AgentRequestsHandledLogsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentRequestsHandledLogs.
     */
    data: XOR<AgentRequestsHandledLogsCreateInput, AgentRequestsHandledLogsUncheckedCreateInput>
  }

  /**
   * AgentRequestsHandledLogs createMany
   */
  export type AgentRequestsHandledLogsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentRequestsHandledLogs.
     */
    data: AgentRequestsHandledLogsCreateManyInput | AgentRequestsHandledLogsCreateManyInput[]
  }

  /**
   * AgentRequestsHandledLogs update
   */
  export type AgentRequestsHandledLogsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentRequestsHandledLogs.
     */
    data: XOR<AgentRequestsHandledLogsUpdateInput, AgentRequestsHandledLogsUncheckedUpdateInput>
    /**
     * Choose, which AgentRequestsHandledLogs to update.
     */
    where: AgentRequestsHandledLogsWhereUniqueInput
  }

  /**
   * AgentRequestsHandledLogs updateMany
   */
  export type AgentRequestsHandledLogsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentRequestsHandledLogs.
     */
    data: XOR<AgentRequestsHandledLogsUpdateManyMutationInput, AgentRequestsHandledLogsUncheckedUpdateManyInput>
    /**
     * Filter which AgentRequestsHandledLogs to update
     */
    where?: AgentRequestsHandledLogsWhereInput
    /**
     * Limit how many AgentRequestsHandledLogs to update.
     */
    limit?: number
  }

  /**
   * AgentRequestsHandledLogs upsert
   */
  export type AgentRequestsHandledLogsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentRequestsHandledLogs to update in case it exists.
     */
    where: AgentRequestsHandledLogsWhereUniqueInput
    /**
     * In case the AgentRequestsHandledLogs found by the `where` argument doesn't exist, create a new AgentRequestsHandledLogs with this data.
     */
    create: XOR<AgentRequestsHandledLogsCreateInput, AgentRequestsHandledLogsUncheckedCreateInput>
    /**
     * In case the AgentRequestsHandledLogs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentRequestsHandledLogsUpdateInput, AgentRequestsHandledLogsUncheckedUpdateInput>
  }

  /**
   * AgentRequestsHandledLogs delete
   */
  export type AgentRequestsHandledLogsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
    /**
     * Filter which AgentRequestsHandledLogs to delete.
     */
    where: AgentRequestsHandledLogsWhereUniqueInput
  }

  /**
   * AgentRequestsHandledLogs deleteMany
   */
  export type AgentRequestsHandledLogsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRequestsHandledLogs to delete
     */
    where?: AgentRequestsHandledLogsWhereInput
    /**
     * Limit how many AgentRequestsHandledLogs to delete.
     */
    limit?: number
  }

  /**
   * AgentRequestsHandledLogs findRaw
   */
  export type AgentRequestsHandledLogsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AgentRequestsHandledLogs aggregateRaw
   */
  export type AgentRequestsHandledLogsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AgentRequestsHandledLogs without action
   */
  export type AgentRequestsHandledLogsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRequestsHandledLogs
     */
    select?: AgentRequestsHandledLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRequestsHandledLogs
     */
    omit?: AgentRequestsHandledLogsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRequestsHandledLogsInclude<ExtArgs> | null
  }


  /**
   * Model CompanyAgentsRegistered
   */

  export type AggregateCompanyAgentsRegistered = {
    _count: CompanyAgentsRegisteredCountAggregateOutputType | null
    _avg: CompanyAgentsRegisteredAvgAggregateOutputType | null
    _sum: CompanyAgentsRegisteredSumAggregateOutputType | null
    _min: CompanyAgentsRegisteredMinAggregateOutputType | null
    _max: CompanyAgentsRegisteredMaxAggregateOutputType | null
  }

  export type CompanyAgentsRegisteredAvgAggregateOutputType = {
    totalAgents: number | null
  }

  export type CompanyAgentsRegisteredSumAggregateOutputType = {
    totalAgents: number | null
  }

  export type CompanyAgentsRegisteredMinAggregateOutputType = {
    id: string | null
    username: string | null
    totalAgents: number | null
  }

  export type CompanyAgentsRegisteredMaxAggregateOutputType = {
    id: string | null
    username: string | null
    totalAgents: number | null
  }

  export type CompanyAgentsRegisteredCountAggregateOutputType = {
    id: number
    username: number
    totalAgents: number
    _all: number
  }


  export type CompanyAgentsRegisteredAvgAggregateInputType = {
    totalAgents?: true
  }

  export type CompanyAgentsRegisteredSumAggregateInputType = {
    totalAgents?: true
  }

  export type CompanyAgentsRegisteredMinAggregateInputType = {
    id?: true
    username?: true
    totalAgents?: true
  }

  export type CompanyAgentsRegisteredMaxAggregateInputType = {
    id?: true
    username?: true
    totalAgents?: true
  }

  export type CompanyAgentsRegisteredCountAggregateInputType = {
    id?: true
    username?: true
    totalAgents?: true
    _all?: true
  }

  export type CompanyAgentsRegisteredAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyAgentsRegistered to aggregate.
     */
    where?: CompanyAgentsRegisteredWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAgentsRegistereds to fetch.
     */
    orderBy?: CompanyAgentsRegisteredOrderByWithRelationInput | CompanyAgentsRegisteredOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyAgentsRegisteredWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAgentsRegistereds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAgentsRegistereds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyAgentsRegistereds
    **/
    _count?: true | CompanyAgentsRegisteredCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAgentsRegisteredAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyAgentsRegisteredSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyAgentsRegisteredMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyAgentsRegisteredMaxAggregateInputType
  }

  export type GetCompanyAgentsRegisteredAggregateType<T extends CompanyAgentsRegisteredAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyAgentsRegistered]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyAgentsRegistered[P]>
      : GetScalarType<T[P], AggregateCompanyAgentsRegistered[P]>
  }




  export type CompanyAgentsRegisteredGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyAgentsRegisteredWhereInput
    orderBy?: CompanyAgentsRegisteredOrderByWithAggregationInput | CompanyAgentsRegisteredOrderByWithAggregationInput[]
    by: CompanyAgentsRegisteredScalarFieldEnum[] | CompanyAgentsRegisteredScalarFieldEnum
    having?: CompanyAgentsRegisteredScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyAgentsRegisteredCountAggregateInputType | true
    _avg?: CompanyAgentsRegisteredAvgAggregateInputType
    _sum?: CompanyAgentsRegisteredSumAggregateInputType
    _min?: CompanyAgentsRegisteredMinAggregateInputType
    _max?: CompanyAgentsRegisteredMaxAggregateInputType
  }

  export type CompanyAgentsRegisteredGroupByOutputType = {
    id: string
    username: string
    totalAgents: number
    _count: CompanyAgentsRegisteredCountAggregateOutputType | null
    _avg: CompanyAgentsRegisteredAvgAggregateOutputType | null
    _sum: CompanyAgentsRegisteredSumAggregateOutputType | null
    _min: CompanyAgentsRegisteredMinAggregateOutputType | null
    _max: CompanyAgentsRegisteredMaxAggregateOutputType | null
  }

  type GetCompanyAgentsRegisteredGroupByPayload<T extends CompanyAgentsRegisteredGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyAgentsRegisteredGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyAgentsRegisteredGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyAgentsRegisteredGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyAgentsRegisteredGroupByOutputType[P]>
        }
      >
    >


  export type CompanyAgentsRegisteredSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    totalAgents?: boolean
    agents?: boolean | AgentRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyAgentsRegistered"]>



  export type CompanyAgentsRegisteredSelectScalar = {
    id?: boolean
    username?: boolean
    totalAgents?: boolean
  }

  export type CompanyAgentsRegisteredOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "totalAgents" | "agents", ExtArgs["result"]["companyAgentsRegistered"]>
  export type CompanyAgentsRegisteredInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyAgentsRegisteredPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyAgentsRegistered"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      totalAgents: number
    }, ExtArgs["result"]["companyAgentsRegistered"]>
    composites: {
      agents: Prisma.$AgentRecordPayload[]
    }
  }

  type CompanyAgentsRegisteredGetPayload<S extends boolean | null | undefined | CompanyAgentsRegisteredDefaultArgs> = $Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload, S>

  type CompanyAgentsRegisteredCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyAgentsRegisteredFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyAgentsRegisteredCountAggregateInputType | true
    }

  export interface CompanyAgentsRegisteredDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyAgentsRegistered'], meta: { name: 'CompanyAgentsRegistered' } }
    /**
     * Find zero or one CompanyAgentsRegistered that matches the filter.
     * @param {CompanyAgentsRegisteredFindUniqueArgs} args - Arguments to find a CompanyAgentsRegistered
     * @example
     * // Get one CompanyAgentsRegistered
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyAgentsRegisteredFindUniqueArgs>(args: SelectSubset<T, CompanyAgentsRegisteredFindUniqueArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyAgentsRegistered that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyAgentsRegisteredFindUniqueOrThrowArgs} args - Arguments to find a CompanyAgentsRegistered
     * @example
     * // Get one CompanyAgentsRegistered
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyAgentsRegisteredFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyAgentsRegisteredFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyAgentsRegistered that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAgentsRegisteredFindFirstArgs} args - Arguments to find a CompanyAgentsRegistered
     * @example
     * // Get one CompanyAgentsRegistered
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyAgentsRegisteredFindFirstArgs>(args?: SelectSubset<T, CompanyAgentsRegisteredFindFirstArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyAgentsRegistered that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAgentsRegisteredFindFirstOrThrowArgs} args - Arguments to find a CompanyAgentsRegistered
     * @example
     * // Get one CompanyAgentsRegistered
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyAgentsRegisteredFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyAgentsRegisteredFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyAgentsRegistereds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAgentsRegisteredFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyAgentsRegistereds
     * const companyAgentsRegistereds = await prisma.companyAgentsRegistered.findMany()
     * 
     * // Get first 10 CompanyAgentsRegistereds
     * const companyAgentsRegistereds = await prisma.companyAgentsRegistered.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyAgentsRegisteredWithIdOnly = await prisma.companyAgentsRegistered.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyAgentsRegisteredFindManyArgs>(args?: SelectSubset<T, CompanyAgentsRegisteredFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyAgentsRegistered.
     * @param {CompanyAgentsRegisteredCreateArgs} args - Arguments to create a CompanyAgentsRegistered.
     * @example
     * // Create one CompanyAgentsRegistered
     * const CompanyAgentsRegistered = await prisma.companyAgentsRegistered.create({
     *   data: {
     *     // ... data to create a CompanyAgentsRegistered
     *   }
     * })
     * 
     */
    create<T extends CompanyAgentsRegisteredCreateArgs>(args: SelectSubset<T, CompanyAgentsRegisteredCreateArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyAgentsRegistereds.
     * @param {CompanyAgentsRegisteredCreateManyArgs} args - Arguments to create many CompanyAgentsRegistereds.
     * @example
     * // Create many CompanyAgentsRegistereds
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyAgentsRegisteredCreateManyArgs>(args?: SelectSubset<T, CompanyAgentsRegisteredCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CompanyAgentsRegistered.
     * @param {CompanyAgentsRegisteredDeleteArgs} args - Arguments to delete one CompanyAgentsRegistered.
     * @example
     * // Delete one CompanyAgentsRegistered
     * const CompanyAgentsRegistered = await prisma.companyAgentsRegistered.delete({
     *   where: {
     *     // ... filter to delete one CompanyAgentsRegistered
     *   }
     * })
     * 
     */
    delete<T extends CompanyAgentsRegisteredDeleteArgs>(args: SelectSubset<T, CompanyAgentsRegisteredDeleteArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyAgentsRegistered.
     * @param {CompanyAgentsRegisteredUpdateArgs} args - Arguments to update one CompanyAgentsRegistered.
     * @example
     * // Update one CompanyAgentsRegistered
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyAgentsRegisteredUpdateArgs>(args: SelectSubset<T, CompanyAgentsRegisteredUpdateArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyAgentsRegistereds.
     * @param {CompanyAgentsRegisteredDeleteManyArgs} args - Arguments to filter CompanyAgentsRegistereds to delete.
     * @example
     * // Delete a few CompanyAgentsRegistereds
     * const { count } = await prisma.companyAgentsRegistered.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyAgentsRegisteredDeleteManyArgs>(args?: SelectSubset<T, CompanyAgentsRegisteredDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyAgentsRegistereds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAgentsRegisteredUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyAgentsRegistereds
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyAgentsRegisteredUpdateManyArgs>(args: SelectSubset<T, CompanyAgentsRegisteredUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanyAgentsRegistered.
     * @param {CompanyAgentsRegisteredUpsertArgs} args - Arguments to update or create a CompanyAgentsRegistered.
     * @example
     * // Update or create a CompanyAgentsRegistered
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.upsert({
     *   create: {
     *     // ... data to create a CompanyAgentsRegistered
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyAgentsRegistered we want to update
     *   }
     * })
     */
    upsert<T extends CompanyAgentsRegisteredUpsertArgs>(args: SelectSubset<T, CompanyAgentsRegisteredUpsertArgs<ExtArgs>>): Prisma__CompanyAgentsRegisteredClient<$Result.GetResult<Prisma.$CompanyAgentsRegisteredPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyAgentsRegistereds that matches the filter.
     * @param {CompanyAgentsRegisteredFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CompanyAgentsRegisteredFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CompanyAgentsRegistered.
     * @param {CompanyAgentsRegisteredAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const companyAgentsRegistered = await prisma.companyAgentsRegistered.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CompanyAgentsRegisteredAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CompanyAgentsRegistereds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAgentsRegisteredCountArgs} args - Arguments to filter CompanyAgentsRegistereds to count.
     * @example
     * // Count the number of CompanyAgentsRegistereds
     * const count = await prisma.companyAgentsRegistered.count({
     *   where: {
     *     // ... the filter for the CompanyAgentsRegistereds we want to count
     *   }
     * })
    **/
    count<T extends CompanyAgentsRegisteredCountArgs>(
      args?: Subset<T, CompanyAgentsRegisteredCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyAgentsRegisteredCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyAgentsRegistered.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAgentsRegisteredAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAgentsRegisteredAggregateArgs>(args: Subset<T, CompanyAgentsRegisteredAggregateArgs>): Prisma.PrismaPromise<GetCompanyAgentsRegisteredAggregateType<T>>

    /**
     * Group by CompanyAgentsRegistered.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAgentsRegisteredGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyAgentsRegisteredGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyAgentsRegisteredGroupByArgs['orderBy'] }
        : { orderBy?: CompanyAgentsRegisteredGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyAgentsRegisteredGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyAgentsRegisteredGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyAgentsRegistered model
   */
  readonly fields: CompanyAgentsRegisteredFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyAgentsRegistered.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyAgentsRegisteredClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyAgentsRegistered model
   */
  interface CompanyAgentsRegisteredFieldRefs {
    readonly id: FieldRef<"CompanyAgentsRegistered", 'String'>
    readonly username: FieldRef<"CompanyAgentsRegistered", 'String'>
    readonly totalAgents: FieldRef<"CompanyAgentsRegistered", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CompanyAgentsRegistered findUnique
   */
  export type CompanyAgentsRegisteredFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * Filter, which CompanyAgentsRegistered to fetch.
     */
    where: CompanyAgentsRegisteredWhereUniqueInput
  }

  /**
   * CompanyAgentsRegistered findUniqueOrThrow
   */
  export type CompanyAgentsRegisteredFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * Filter, which CompanyAgentsRegistered to fetch.
     */
    where: CompanyAgentsRegisteredWhereUniqueInput
  }

  /**
   * CompanyAgentsRegistered findFirst
   */
  export type CompanyAgentsRegisteredFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * Filter, which CompanyAgentsRegistered to fetch.
     */
    where?: CompanyAgentsRegisteredWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAgentsRegistereds to fetch.
     */
    orderBy?: CompanyAgentsRegisteredOrderByWithRelationInput | CompanyAgentsRegisteredOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyAgentsRegistereds.
     */
    cursor?: CompanyAgentsRegisteredWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAgentsRegistereds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAgentsRegistereds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyAgentsRegistereds.
     */
    distinct?: CompanyAgentsRegisteredScalarFieldEnum | CompanyAgentsRegisteredScalarFieldEnum[]
  }

  /**
   * CompanyAgentsRegistered findFirstOrThrow
   */
  export type CompanyAgentsRegisteredFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * Filter, which CompanyAgentsRegistered to fetch.
     */
    where?: CompanyAgentsRegisteredWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAgentsRegistereds to fetch.
     */
    orderBy?: CompanyAgentsRegisteredOrderByWithRelationInput | CompanyAgentsRegisteredOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyAgentsRegistereds.
     */
    cursor?: CompanyAgentsRegisteredWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAgentsRegistereds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAgentsRegistereds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyAgentsRegistereds.
     */
    distinct?: CompanyAgentsRegisteredScalarFieldEnum | CompanyAgentsRegisteredScalarFieldEnum[]
  }

  /**
   * CompanyAgentsRegistered findMany
   */
  export type CompanyAgentsRegisteredFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * Filter, which CompanyAgentsRegistereds to fetch.
     */
    where?: CompanyAgentsRegisteredWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAgentsRegistereds to fetch.
     */
    orderBy?: CompanyAgentsRegisteredOrderByWithRelationInput | CompanyAgentsRegisteredOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyAgentsRegistereds.
     */
    cursor?: CompanyAgentsRegisteredWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAgentsRegistereds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAgentsRegistereds.
     */
    skip?: number
    distinct?: CompanyAgentsRegisteredScalarFieldEnum | CompanyAgentsRegisteredScalarFieldEnum[]
  }

  /**
   * CompanyAgentsRegistered create
   */
  export type CompanyAgentsRegisteredCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyAgentsRegistered.
     */
    data: XOR<CompanyAgentsRegisteredCreateInput, CompanyAgentsRegisteredUncheckedCreateInput>
  }

  /**
   * CompanyAgentsRegistered createMany
   */
  export type CompanyAgentsRegisteredCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyAgentsRegistereds.
     */
    data: CompanyAgentsRegisteredCreateManyInput | CompanyAgentsRegisteredCreateManyInput[]
  }

  /**
   * CompanyAgentsRegistered update
   */
  export type CompanyAgentsRegisteredUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyAgentsRegistered.
     */
    data: XOR<CompanyAgentsRegisteredUpdateInput, CompanyAgentsRegisteredUncheckedUpdateInput>
    /**
     * Choose, which CompanyAgentsRegistered to update.
     */
    where: CompanyAgentsRegisteredWhereUniqueInput
  }

  /**
   * CompanyAgentsRegistered updateMany
   */
  export type CompanyAgentsRegisteredUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyAgentsRegistereds.
     */
    data: XOR<CompanyAgentsRegisteredUpdateManyMutationInput, CompanyAgentsRegisteredUncheckedUpdateManyInput>
    /**
     * Filter which CompanyAgentsRegistereds to update
     */
    where?: CompanyAgentsRegisteredWhereInput
    /**
     * Limit how many CompanyAgentsRegistereds to update.
     */
    limit?: number
  }

  /**
   * CompanyAgentsRegistered upsert
   */
  export type CompanyAgentsRegisteredUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyAgentsRegistered to update in case it exists.
     */
    where: CompanyAgentsRegisteredWhereUniqueInput
    /**
     * In case the CompanyAgentsRegistered found by the `where` argument doesn't exist, create a new CompanyAgentsRegistered with this data.
     */
    create: XOR<CompanyAgentsRegisteredCreateInput, CompanyAgentsRegisteredUncheckedCreateInput>
    /**
     * In case the CompanyAgentsRegistered was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyAgentsRegisteredUpdateInput, CompanyAgentsRegisteredUncheckedUpdateInput>
  }

  /**
   * CompanyAgentsRegistered delete
   */
  export type CompanyAgentsRegisteredDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
    /**
     * Filter which CompanyAgentsRegistered to delete.
     */
    where: CompanyAgentsRegisteredWhereUniqueInput
  }

  /**
   * CompanyAgentsRegistered deleteMany
   */
  export type CompanyAgentsRegisteredDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyAgentsRegistereds to delete
     */
    where?: CompanyAgentsRegisteredWhereInput
    /**
     * Limit how many CompanyAgentsRegistereds to delete.
     */
    limit?: number
  }

  /**
   * CompanyAgentsRegistered findRaw
   */
  export type CompanyAgentsRegisteredFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CompanyAgentsRegistered aggregateRaw
   */
  export type CompanyAgentsRegisteredAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CompanyAgentsRegistered without action
   */
  export type CompanyAgentsRegisteredDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAgentsRegistered
     */
    select?: CompanyAgentsRegisteredSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyAgentsRegistered
     */
    omit?: CompanyAgentsRegisteredOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyAgentsRegisteredInclude<ExtArgs> | null
  }


  /**
   * Model UserOrders
   */

  export type AggregateUserOrders = {
    _count: UserOrdersCountAggregateOutputType | null
    _min: UserOrdersMinAggregateOutputType | null
    _max: UserOrdersMaxAggregateOutputType | null
  }

  export type UserOrdersMinAggregateOutputType = {
    id: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserOrdersMaxAggregateOutputType = {
    id: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserOrdersCountAggregateOutputType = {
    id: number
    username: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserOrdersMinAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserOrdersMaxAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserOrdersCountAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserOrdersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOrders to aggregate.
     */
    where?: UserOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrders to fetch.
     */
    orderBy?: UserOrdersOrderByWithRelationInput | UserOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOrders
    **/
    _count?: true | UserOrdersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOrdersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOrdersMaxAggregateInputType
  }

  export type GetUserOrdersAggregateType<T extends UserOrdersAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOrders]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOrders[P]>
      : GetScalarType<T[P], AggregateUserOrders[P]>
  }




  export type UserOrdersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOrdersWhereInput
    orderBy?: UserOrdersOrderByWithAggregationInput | UserOrdersOrderByWithAggregationInput[]
    by: UserOrdersScalarFieldEnum[] | UserOrdersScalarFieldEnum
    having?: UserOrdersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOrdersCountAggregateInputType | true
    _min?: UserOrdersMinAggregateInputType
    _max?: UserOrdersMaxAggregateInputType
  }

  export type UserOrdersGroupByOutputType = {
    id: string
    username: string
    createdAt: Date
    updatedAt: Date
    _count: UserOrdersCountAggregateOutputType | null
    _min: UserOrdersMinAggregateOutputType | null
    _max: UserOrdersMaxAggregateOutputType | null
  }

  type GetUserOrdersGroupByPayload<T extends UserOrdersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserOrdersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOrdersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOrdersGroupByOutputType[P]>
            : GetScalarType<T[P], UserOrdersGroupByOutputType[P]>
        }
      >
    >


  export type UserOrdersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    orders?: boolean | OrderDefaultArgs<ExtArgs>
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userOrders"]>



  export type UserOrdersSelectScalar = {
    id?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOrdersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "orders" | "createdAt" | "updatedAt", ExtArgs["result"]["userOrders"]>
  export type UserOrdersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserOrdersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserOrders"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userOrders"]>
    composites: {
      orders: Prisma.$OrderPayload[]
    }
  }

  type UserOrdersGetPayload<S extends boolean | null | undefined | UserOrdersDefaultArgs> = $Result.GetResult<Prisma.$UserOrdersPayload, S>

  type UserOrdersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserOrdersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserOrdersCountAggregateInputType | true
    }

  export interface UserOrdersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOrders'], meta: { name: 'UserOrders' } }
    /**
     * Find zero or one UserOrders that matches the filter.
     * @param {UserOrdersFindUniqueArgs} args - Arguments to find a UserOrders
     * @example
     * // Get one UserOrders
     * const userOrders = await prisma.userOrders.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserOrdersFindUniqueArgs>(args: SelectSubset<T, UserOrdersFindUniqueArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserOrders that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserOrdersFindUniqueOrThrowArgs} args - Arguments to find a UserOrders
     * @example
     * // Get one UserOrders
     * const userOrders = await prisma.userOrders.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserOrdersFindUniqueOrThrowArgs>(args: SelectSubset<T, UserOrdersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrdersFindFirstArgs} args - Arguments to find a UserOrders
     * @example
     * // Get one UserOrders
     * const userOrders = await prisma.userOrders.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserOrdersFindFirstArgs>(args?: SelectSubset<T, UserOrdersFindFirstArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOrders that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrdersFindFirstOrThrowArgs} args - Arguments to find a UserOrders
     * @example
     * // Get one UserOrders
     * const userOrders = await prisma.userOrders.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserOrdersFindFirstOrThrowArgs>(args?: SelectSubset<T, UserOrdersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrdersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOrders
     * const userOrders = await prisma.userOrders.findMany()
     * 
     * // Get first 10 UserOrders
     * const userOrders = await prisma.userOrders.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userOrdersWithIdOnly = await prisma.userOrders.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserOrdersFindManyArgs>(args?: SelectSubset<T, UserOrdersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserOrders.
     * @param {UserOrdersCreateArgs} args - Arguments to create a UserOrders.
     * @example
     * // Create one UserOrders
     * const UserOrders = await prisma.userOrders.create({
     *   data: {
     *     // ... data to create a UserOrders
     *   }
     * })
     * 
     */
    create<T extends UserOrdersCreateArgs>(args: SelectSubset<T, UserOrdersCreateArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserOrders.
     * @param {UserOrdersCreateManyArgs} args - Arguments to create many UserOrders.
     * @example
     * // Create many UserOrders
     * const userOrders = await prisma.userOrders.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserOrdersCreateManyArgs>(args?: SelectSubset<T, UserOrdersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserOrders.
     * @param {UserOrdersDeleteArgs} args - Arguments to delete one UserOrders.
     * @example
     * // Delete one UserOrders
     * const UserOrders = await prisma.userOrders.delete({
     *   where: {
     *     // ... filter to delete one UserOrders
     *   }
     * })
     * 
     */
    delete<T extends UserOrdersDeleteArgs>(args: SelectSubset<T, UserOrdersDeleteArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserOrders.
     * @param {UserOrdersUpdateArgs} args - Arguments to update one UserOrders.
     * @example
     * // Update one UserOrders
     * const userOrders = await prisma.userOrders.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserOrdersUpdateArgs>(args: SelectSubset<T, UserOrdersUpdateArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserOrders.
     * @param {UserOrdersDeleteManyArgs} args - Arguments to filter UserOrders to delete.
     * @example
     * // Delete a few UserOrders
     * const { count } = await prisma.userOrders.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserOrdersDeleteManyArgs>(args?: SelectSubset<T, UserOrdersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrdersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOrders
     * const userOrders = await prisma.userOrders.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserOrdersUpdateManyArgs>(args: SelectSubset<T, UserOrdersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserOrders.
     * @param {UserOrdersUpsertArgs} args - Arguments to update or create a UserOrders.
     * @example
     * // Update or create a UserOrders
     * const userOrders = await prisma.userOrders.upsert({
     *   create: {
     *     // ... data to create a UserOrders
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOrders we want to update
     *   }
     * })
     */
    upsert<T extends UserOrdersUpsertArgs>(args: SelectSubset<T, UserOrdersUpsertArgs<ExtArgs>>): Prisma__UserOrdersClient<$Result.GetResult<Prisma.$UserOrdersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserOrders that matches the filter.
     * @param {UserOrdersFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userOrders = await prisma.userOrders.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserOrdersFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserOrders.
     * @param {UserOrdersAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userOrders = await prisma.userOrders.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserOrdersAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of UserOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrdersCountArgs} args - Arguments to filter UserOrders to count.
     * @example
     * // Count the number of UserOrders
     * const count = await prisma.userOrders.count({
     *   where: {
     *     // ... the filter for the UserOrders we want to count
     *   }
     * })
    **/
    count<T extends UserOrdersCountArgs>(
      args?: Subset<T, UserOrdersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOrdersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrdersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserOrdersAggregateArgs>(args: Subset<T, UserOrdersAggregateArgs>): Prisma.PrismaPromise<GetUserOrdersAggregateType<T>>

    /**
     * Group by UserOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrdersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserOrdersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOrdersGroupByArgs['orderBy'] }
        : { orderBy?: UserOrdersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserOrdersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOrdersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserOrders model
   */
  readonly fields: UserOrdersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOrders.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserOrdersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserOrders model
   */
  interface UserOrdersFieldRefs {
    readonly id: FieldRef<"UserOrders", 'String'>
    readonly username: FieldRef<"UserOrders", 'String'>
    readonly createdAt: FieldRef<"UserOrders", 'DateTime'>
    readonly updatedAt: FieldRef<"UserOrders", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserOrders findUnique
   */
  export type UserOrdersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * Filter, which UserOrders to fetch.
     */
    where: UserOrdersWhereUniqueInput
  }

  /**
   * UserOrders findUniqueOrThrow
   */
  export type UserOrdersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * Filter, which UserOrders to fetch.
     */
    where: UserOrdersWhereUniqueInput
  }

  /**
   * UserOrders findFirst
   */
  export type UserOrdersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * Filter, which UserOrders to fetch.
     */
    where?: UserOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrders to fetch.
     */
    orderBy?: UserOrdersOrderByWithRelationInput | UserOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOrders.
     */
    cursor?: UserOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOrders.
     */
    distinct?: UserOrdersScalarFieldEnum | UserOrdersScalarFieldEnum[]
  }

  /**
   * UserOrders findFirstOrThrow
   */
  export type UserOrdersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * Filter, which UserOrders to fetch.
     */
    where?: UserOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrders to fetch.
     */
    orderBy?: UserOrdersOrderByWithRelationInput | UserOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOrders.
     */
    cursor?: UserOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOrders.
     */
    distinct?: UserOrdersScalarFieldEnum | UserOrdersScalarFieldEnum[]
  }

  /**
   * UserOrders findMany
   */
  export type UserOrdersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * Filter, which UserOrders to fetch.
     */
    where?: UserOrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrders to fetch.
     */
    orderBy?: UserOrdersOrderByWithRelationInput | UserOrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOrders.
     */
    cursor?: UserOrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrders.
     */
    skip?: number
    distinct?: UserOrdersScalarFieldEnum | UserOrdersScalarFieldEnum[]
  }

  /**
   * UserOrders create
   */
  export type UserOrdersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOrders.
     */
    data: XOR<UserOrdersCreateInput, UserOrdersUncheckedCreateInput>
  }

  /**
   * UserOrders createMany
   */
  export type UserOrdersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOrders.
     */
    data: UserOrdersCreateManyInput | UserOrdersCreateManyInput[]
  }

  /**
   * UserOrders update
   */
  export type UserOrdersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOrders.
     */
    data: XOR<UserOrdersUpdateInput, UserOrdersUncheckedUpdateInput>
    /**
     * Choose, which UserOrders to update.
     */
    where: UserOrdersWhereUniqueInput
  }

  /**
   * UserOrders updateMany
   */
  export type UserOrdersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOrders.
     */
    data: XOR<UserOrdersUpdateManyMutationInput, UserOrdersUncheckedUpdateManyInput>
    /**
     * Filter which UserOrders to update
     */
    where?: UserOrdersWhereInput
    /**
     * Limit how many UserOrders to update.
     */
    limit?: number
  }

  /**
   * UserOrders upsert
   */
  export type UserOrdersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOrders to update in case it exists.
     */
    where: UserOrdersWhereUniqueInput
    /**
     * In case the UserOrders found by the `where` argument doesn't exist, create a new UserOrders with this data.
     */
    create: XOR<UserOrdersCreateInput, UserOrdersUncheckedCreateInput>
    /**
     * In case the UserOrders was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOrdersUpdateInput, UserOrdersUncheckedUpdateInput>
  }

  /**
   * UserOrders delete
   */
  export type UserOrdersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
    /**
     * Filter which UserOrders to delete.
     */
    where: UserOrdersWhereUniqueInput
  }

  /**
   * UserOrders deleteMany
   */
  export type UserOrdersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOrders to delete
     */
    where?: UserOrdersWhereInput
    /**
     * Limit how many UserOrders to delete.
     */
    limit?: number
  }

  /**
   * UserOrders findRaw
   */
  export type UserOrdersFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserOrders aggregateRaw
   */
  export type UserOrdersAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * UserOrders without action
   */
  export type UserOrdersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrders
     */
    select?: UserOrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOrders
     */
    omit?: UserOrdersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrdersInclude<ExtArgs> | null
  }


  /**
   * Model Offer
   */

  export type AggregateOffer = {
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  export type OfferAvgAggregateOutputType = {
    discountValue: number | null
    maxDiscountAmount: number | null
    minPurchaseAmount: number | null
    usageLimit: number | null
    usageLimitPerUser: number | null
    globalUsedCount: number | null
  }

  export type OfferSumAggregateOutputType = {
    discountValue: number | null
    maxDiscountAmount: number | null
    minPurchaseAmount: number | null
    usageLimit: number | null
    usageLimitPerUser: number | null
    globalUsedCount: number | null
  }

  export type OfferMinAggregateOutputType = {
    id: string | null
    offerId: string | null
    title: string | null
    description: string | null
    offerCode: string | null
    discountType: string | null
    discountValue: number | null
    maxDiscountAmount: number | null
    offerType: string | null
    minPurchaseAmount: number | null
    usageLimit: number | null
    usageLimitPerUser: number | null
    globalUsedCount: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferMaxAggregateOutputType = {
    id: string | null
    offerId: string | null
    title: string | null
    description: string | null
    offerCode: string | null
    discountType: string | null
    discountValue: number | null
    maxDiscountAmount: number | null
    offerType: string | null
    minPurchaseAmount: number | null
    usageLimit: number | null
    usageLimitPerUser: number | null
    globalUsedCount: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferCountAggregateOutputType = {
    id: number
    offerId: number
    title: number
    description: number
    offerCode: number
    discountType: number
    discountValue: number
    maxDiscountAmount: number
    offerType: number
    applicableTo: number
    minPurchaseAmount: number
    applicableProducts: number
    usageLimit: number
    usageLimitPerUser: number
    globalUsedCount: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OfferAvgAggregateInputType = {
    discountValue?: true
    maxDiscountAmount?: true
    minPurchaseAmount?: true
    usageLimit?: true
    usageLimitPerUser?: true
    globalUsedCount?: true
  }

  export type OfferSumAggregateInputType = {
    discountValue?: true
    maxDiscountAmount?: true
    minPurchaseAmount?: true
    usageLimit?: true
    usageLimitPerUser?: true
    globalUsedCount?: true
  }

  export type OfferMinAggregateInputType = {
    id?: true
    offerId?: true
    title?: true
    description?: true
    offerCode?: true
    discountType?: true
    discountValue?: true
    maxDiscountAmount?: true
    offerType?: true
    minPurchaseAmount?: true
    usageLimit?: true
    usageLimitPerUser?: true
    globalUsedCount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferMaxAggregateInputType = {
    id?: true
    offerId?: true
    title?: true
    description?: true
    offerCode?: true
    discountType?: true
    discountValue?: true
    maxDiscountAmount?: true
    offerType?: true
    minPurchaseAmount?: true
    usageLimit?: true
    usageLimitPerUser?: true
    globalUsedCount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferCountAggregateInputType = {
    id?: true
    offerId?: true
    title?: true
    description?: true
    offerCode?: true
    discountType?: true
    discountValue?: true
    maxDiscountAmount?: true
    offerType?: true
    applicableTo?: true
    minPurchaseAmount?: true
    applicableProducts?: true
    usageLimit?: true
    usageLimitPerUser?: true
    globalUsedCount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offer to aggregate.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Offers
    **/
    _count?: true | OfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferMaxAggregateInputType
  }

  export type GetOfferAggregateType<T extends OfferAggregateArgs> = {
        [P in keyof T & keyof AggregateOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffer[P]>
      : GetScalarType<T[P], AggregateOffer[P]>
  }




  export type OfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithAggregationInput | OfferOrderByWithAggregationInput[]
    by: OfferScalarFieldEnum[] | OfferScalarFieldEnum
    having?: OfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferCountAggregateInputType | true
    _avg?: OfferAvgAggregateInputType
    _sum?: OfferSumAggregateInputType
    _min?: OfferMinAggregateInputType
    _max?: OfferMaxAggregateInputType
  }

  export type OfferGroupByOutputType = {
    id: string
    offerId: string
    title: string
    description: string | null
    offerCode: string | null
    discountType: string
    discountValue: number
    maxDiscountAmount: number | null
    offerType: string
    applicableTo: string[]
    minPurchaseAmount: number | null
    applicableProducts: string[]
    usageLimit: number | null
    usageLimitPerUser: number | null
    globalUsedCount: number
    startDate: Date
    endDate: Date
    status: string
    createdAt: Date
    updatedAt: Date
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  type GetOfferGroupByPayload<T extends OfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferGroupByOutputType[P]>
            : GetScalarType<T[P], OfferGroupByOutputType[P]>
        }
      >
    >


  export type OfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offerId?: boolean
    title?: boolean
    description?: boolean
    offerCode?: boolean
    discountType?: boolean
    discountValue?: boolean
    maxDiscountAmount?: boolean
    offerType?: boolean
    applicableTo?: boolean
    minPurchaseAmount?: boolean
    applicableProducts?: boolean
    usageLimit?: boolean
    usageLimitPerUser?: boolean
    globalUsedCount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["offer"]>



  export type OfferSelectScalar = {
    id?: boolean
    offerId?: boolean
    title?: boolean
    description?: boolean
    offerCode?: boolean
    discountType?: boolean
    discountValue?: boolean
    maxDiscountAmount?: boolean
    offerType?: boolean
    applicableTo?: boolean
    minPurchaseAmount?: boolean
    applicableProducts?: boolean
    usageLimit?: boolean
    usageLimitPerUser?: boolean
    globalUsedCount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "offerId" | "title" | "description" | "offerCode" | "discountType" | "discountValue" | "maxDiscountAmount" | "offerType" | "applicableTo" | "minPurchaseAmount" | "applicableProducts" | "usageLimit" | "usageLimitPerUser" | "globalUsedCount" | "startDate" | "endDate" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["offer"]>

  export type $OfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Offer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      offerId: string
      title: string
      description: string | null
      offerCode: string | null
      discountType: string
      discountValue: number
      maxDiscountAmount: number | null
      offerType: string
      applicableTo: string[]
      minPurchaseAmount: number | null
      applicableProducts: string[]
      usageLimit: number | null
      usageLimitPerUser: number | null
      globalUsedCount: number
      startDate: Date
      endDate: Date
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["offer"]>
    composites: {}
  }

  type OfferGetPayload<S extends boolean | null | undefined | OfferDefaultArgs> = $Result.GetResult<Prisma.$OfferPayload, S>

  type OfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfferCountAggregateInputType | true
    }

  export interface OfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Offer'], meta: { name: 'Offer' } }
    /**
     * Find zero or one Offer that matches the filter.
     * @param {OfferFindUniqueArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfferFindUniqueArgs>(args: SelectSubset<T, OfferFindUniqueArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Offer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfferFindUniqueOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfferFindUniqueOrThrowArgs>(args: SelectSubset<T, OfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfferFindFirstArgs>(args?: SelectSubset<T, OfferFindFirstArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfferFindFirstOrThrowArgs>(args?: SelectSubset<T, OfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Offers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Offers
     * const offers = await prisma.offer.findMany()
     * 
     * // Get first 10 Offers
     * const offers = await prisma.offer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offerWithIdOnly = await prisma.offer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfferFindManyArgs>(args?: SelectSubset<T, OfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Offer.
     * @param {OfferCreateArgs} args - Arguments to create a Offer.
     * @example
     * // Create one Offer
     * const Offer = await prisma.offer.create({
     *   data: {
     *     // ... data to create a Offer
     *   }
     * })
     * 
     */
    create<T extends OfferCreateArgs>(args: SelectSubset<T, OfferCreateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Offers.
     * @param {OfferCreateManyArgs} args - Arguments to create many Offers.
     * @example
     * // Create many Offers
     * const offer = await prisma.offer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfferCreateManyArgs>(args?: SelectSubset<T, OfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Offer.
     * @param {OfferDeleteArgs} args - Arguments to delete one Offer.
     * @example
     * // Delete one Offer
     * const Offer = await prisma.offer.delete({
     *   where: {
     *     // ... filter to delete one Offer
     *   }
     * })
     * 
     */
    delete<T extends OfferDeleteArgs>(args: SelectSubset<T, OfferDeleteArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Offer.
     * @param {OfferUpdateArgs} args - Arguments to update one Offer.
     * @example
     * // Update one Offer
     * const offer = await prisma.offer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfferUpdateArgs>(args: SelectSubset<T, OfferUpdateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Offers.
     * @param {OfferDeleteManyArgs} args - Arguments to filter Offers to delete.
     * @example
     * // Delete a few Offers
     * const { count } = await prisma.offer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfferDeleteManyArgs>(args?: SelectSubset<T, OfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfferUpdateManyArgs>(args: SelectSubset<T, OfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Offer.
     * @param {OfferUpsertArgs} args - Arguments to update or create a Offer.
     * @example
     * // Update or create a Offer
     * const offer = await prisma.offer.upsert({
     *   create: {
     *     // ... data to create a Offer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Offer we want to update
     *   }
     * })
     */
    upsert<T extends OfferUpsertArgs>(args: SelectSubset<T, OfferUpsertArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Offers that matches the filter.
     * @param {OfferFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const offer = await prisma.offer.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OfferFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Offer.
     * @param {OfferAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const offer = await prisma.offer.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OfferAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferCountArgs} args - Arguments to filter Offers to count.
     * @example
     * // Count the number of Offers
     * const count = await prisma.offer.count({
     *   where: {
     *     // ... the filter for the Offers we want to count
     *   }
     * })
    **/
    count<T extends OfferCountArgs>(
      args?: Subset<T, OfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferAggregateArgs>(args: Subset<T, OfferAggregateArgs>): Prisma.PrismaPromise<GetOfferAggregateType<T>>

    /**
     * Group by Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferGroupByArgs['orderBy'] }
        : { orderBy?: OfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Offer model
   */
  readonly fields: OfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Offer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Offer model
   */
  interface OfferFieldRefs {
    readonly id: FieldRef<"Offer", 'String'>
    readonly offerId: FieldRef<"Offer", 'String'>
    readonly title: FieldRef<"Offer", 'String'>
    readonly description: FieldRef<"Offer", 'String'>
    readonly offerCode: FieldRef<"Offer", 'String'>
    readonly discountType: FieldRef<"Offer", 'String'>
    readonly discountValue: FieldRef<"Offer", 'Float'>
    readonly maxDiscountAmount: FieldRef<"Offer", 'Float'>
    readonly offerType: FieldRef<"Offer", 'String'>
    readonly applicableTo: FieldRef<"Offer", 'String[]'>
    readonly minPurchaseAmount: FieldRef<"Offer", 'Float'>
    readonly applicableProducts: FieldRef<"Offer", 'String[]'>
    readonly usageLimit: FieldRef<"Offer", 'Int'>
    readonly usageLimitPerUser: FieldRef<"Offer", 'Int'>
    readonly globalUsedCount: FieldRef<"Offer", 'Int'>
    readonly startDate: FieldRef<"Offer", 'DateTime'>
    readonly endDate: FieldRef<"Offer", 'DateTime'>
    readonly status: FieldRef<"Offer", 'String'>
    readonly createdAt: FieldRef<"Offer", 'DateTime'>
    readonly updatedAt: FieldRef<"Offer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Offer findUnique
   */
  export type OfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findUniqueOrThrow
   */
  export type OfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findFirst
   */
  export type OfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findFirstOrThrow
   */
  export type OfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findMany
   */
  export type OfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Filter, which Offers to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer create
   */
  export type OfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data needed to create a Offer.
     */
    data: XOR<OfferCreateInput, OfferUncheckedCreateInput>
  }

  /**
   * Offer createMany
   */
  export type OfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Offers.
     */
    data: OfferCreateManyInput | OfferCreateManyInput[]
  }

  /**
   * Offer update
   */
  export type OfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data needed to update a Offer.
     */
    data: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
    /**
     * Choose, which Offer to update.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer updateMany
   */
  export type OfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Offers.
     */
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    /**
     * Filter which Offers to update
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to update.
     */
    limit?: number
  }

  /**
   * Offer upsert
   */
  export type OfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The filter to search for the Offer to update in case it exists.
     */
    where: OfferWhereUniqueInput
    /**
     * In case the Offer found by the `where` argument doesn't exist, create a new Offer with this data.
     */
    create: XOR<OfferCreateInput, OfferUncheckedCreateInput>
    /**
     * In case the Offer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
  }

  /**
   * Offer delete
   */
  export type OfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Filter which Offer to delete.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer deleteMany
   */
  export type OfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offers to delete
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to delete.
     */
    limit?: number
  }

  /**
   * Offer findRaw
   */
  export type OfferFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Offer aggregateRaw
   */
  export type OfferAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Offer without action
   */
  export type OfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
  }


  /**
   * Model OfferUsage
   */

  export type AggregateOfferUsage = {
    _count: OfferUsageCountAggregateOutputType | null
    _min: OfferUsageMinAggregateOutputType | null
    _max: OfferUsageMaxAggregateOutputType | null
  }

  export type OfferUsageMinAggregateOutputType = {
    id: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferUsageMaxAggregateOutputType = {
    id: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferUsageCountAggregateOutputType = {
    id: number
    username: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OfferUsageMinAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferUsageMaxAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferUsageCountAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OfferUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfferUsage to aggregate.
     */
    where?: OfferUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferUsages to fetch.
     */
    orderBy?: OfferUsageOrderByWithRelationInput | OfferUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfferUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfferUsages
    **/
    _count?: true | OfferUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferUsageMaxAggregateInputType
  }

  export type GetOfferUsageAggregateType<T extends OfferUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateOfferUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfferUsage[P]>
      : GetScalarType<T[P], AggregateOfferUsage[P]>
  }




  export type OfferUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferUsageWhereInput
    orderBy?: OfferUsageOrderByWithAggregationInput | OfferUsageOrderByWithAggregationInput[]
    by: OfferUsageScalarFieldEnum[] | OfferUsageScalarFieldEnum
    having?: OfferUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferUsageCountAggregateInputType | true
    _min?: OfferUsageMinAggregateInputType
    _max?: OfferUsageMaxAggregateInputType
  }

  export type OfferUsageGroupByOutputType = {
    id: string
    username: string
    createdAt: Date
    updatedAt: Date
    _count: OfferUsageCountAggregateOutputType | null
    _min: OfferUsageMinAggregateOutputType | null
    _max: OfferUsageMaxAggregateOutputType | null
  }

  type GetOfferUsageGroupByPayload<T extends OfferUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfferUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferUsageGroupByOutputType[P]>
            : GetScalarType<T[P], OfferUsageGroupByOutputType[P]>
        }
      >
    >


  export type OfferUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    offersUsed?: boolean | OfferUsedDefaultArgs<ExtArgs>
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["offerUsage"]>



  export type OfferUsageSelectScalar = {
    id?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfferUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "offersUsed" | "createdAt" | "updatedAt", ExtArgs["result"]["offerUsage"]>
  export type OfferUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OfferUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OfferUsage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["offerUsage"]>
    composites: {
      offersUsed: Prisma.$OfferUsedPayload[]
    }
  }

  type OfferUsageGetPayload<S extends boolean | null | undefined | OfferUsageDefaultArgs> = $Result.GetResult<Prisma.$OfferUsagePayload, S>

  type OfferUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfferUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfferUsageCountAggregateInputType | true
    }

  export interface OfferUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OfferUsage'], meta: { name: 'OfferUsage' } }
    /**
     * Find zero or one OfferUsage that matches the filter.
     * @param {OfferUsageFindUniqueArgs} args - Arguments to find a OfferUsage
     * @example
     * // Get one OfferUsage
     * const offerUsage = await prisma.offerUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfferUsageFindUniqueArgs>(args: SelectSubset<T, OfferUsageFindUniqueArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OfferUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfferUsageFindUniqueOrThrowArgs} args - Arguments to find a OfferUsage
     * @example
     * // Get one OfferUsage
     * const offerUsage = await prisma.offerUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfferUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, OfferUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfferUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUsageFindFirstArgs} args - Arguments to find a OfferUsage
     * @example
     * // Get one OfferUsage
     * const offerUsage = await prisma.offerUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfferUsageFindFirstArgs>(args?: SelectSubset<T, OfferUsageFindFirstArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfferUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUsageFindFirstOrThrowArgs} args - Arguments to find a OfferUsage
     * @example
     * // Get one OfferUsage
     * const offerUsage = await prisma.offerUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfferUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, OfferUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OfferUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfferUsages
     * const offerUsages = await prisma.offerUsage.findMany()
     * 
     * // Get first 10 OfferUsages
     * const offerUsages = await prisma.offerUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offerUsageWithIdOnly = await prisma.offerUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfferUsageFindManyArgs>(args?: SelectSubset<T, OfferUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OfferUsage.
     * @param {OfferUsageCreateArgs} args - Arguments to create a OfferUsage.
     * @example
     * // Create one OfferUsage
     * const OfferUsage = await prisma.offerUsage.create({
     *   data: {
     *     // ... data to create a OfferUsage
     *   }
     * })
     * 
     */
    create<T extends OfferUsageCreateArgs>(args: SelectSubset<T, OfferUsageCreateArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OfferUsages.
     * @param {OfferUsageCreateManyArgs} args - Arguments to create many OfferUsages.
     * @example
     * // Create many OfferUsages
     * const offerUsage = await prisma.offerUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfferUsageCreateManyArgs>(args?: SelectSubset<T, OfferUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OfferUsage.
     * @param {OfferUsageDeleteArgs} args - Arguments to delete one OfferUsage.
     * @example
     * // Delete one OfferUsage
     * const OfferUsage = await prisma.offerUsage.delete({
     *   where: {
     *     // ... filter to delete one OfferUsage
     *   }
     * })
     * 
     */
    delete<T extends OfferUsageDeleteArgs>(args: SelectSubset<T, OfferUsageDeleteArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OfferUsage.
     * @param {OfferUsageUpdateArgs} args - Arguments to update one OfferUsage.
     * @example
     * // Update one OfferUsage
     * const offerUsage = await prisma.offerUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfferUsageUpdateArgs>(args: SelectSubset<T, OfferUsageUpdateArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OfferUsages.
     * @param {OfferUsageDeleteManyArgs} args - Arguments to filter OfferUsages to delete.
     * @example
     * // Delete a few OfferUsages
     * const { count } = await prisma.offerUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfferUsageDeleteManyArgs>(args?: SelectSubset<T, OfferUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfferUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfferUsages
     * const offerUsage = await prisma.offerUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfferUsageUpdateManyArgs>(args: SelectSubset<T, OfferUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OfferUsage.
     * @param {OfferUsageUpsertArgs} args - Arguments to update or create a OfferUsage.
     * @example
     * // Update or create a OfferUsage
     * const offerUsage = await prisma.offerUsage.upsert({
     *   create: {
     *     // ... data to create a OfferUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfferUsage we want to update
     *   }
     * })
     */
    upsert<T extends OfferUsageUpsertArgs>(args: SelectSubset<T, OfferUsageUpsertArgs<ExtArgs>>): Prisma__OfferUsageClient<$Result.GetResult<Prisma.$OfferUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OfferUsages that matches the filter.
     * @param {OfferUsageFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const offerUsage = await prisma.offerUsage.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OfferUsageFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a OfferUsage.
     * @param {OfferUsageAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const offerUsage = await prisma.offerUsage.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OfferUsageAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of OfferUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUsageCountArgs} args - Arguments to filter OfferUsages to count.
     * @example
     * // Count the number of OfferUsages
     * const count = await prisma.offerUsage.count({
     *   where: {
     *     // ... the filter for the OfferUsages we want to count
     *   }
     * })
    **/
    count<T extends OfferUsageCountArgs>(
      args?: Subset<T, OfferUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfferUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferUsageAggregateArgs>(args: Subset<T, OfferUsageAggregateArgs>): Prisma.PrismaPromise<GetOfferUsageAggregateType<T>>

    /**
     * Group by OfferUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferUsageGroupByArgs['orderBy'] }
        : { orderBy?: OfferUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OfferUsage model
   */
  readonly fields: OfferUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OfferUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfferUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OfferUsage model
   */
  interface OfferUsageFieldRefs {
    readonly id: FieldRef<"OfferUsage", 'String'>
    readonly username: FieldRef<"OfferUsage", 'String'>
    readonly createdAt: FieldRef<"OfferUsage", 'DateTime'>
    readonly updatedAt: FieldRef<"OfferUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OfferUsage findUnique
   */
  export type OfferUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * Filter, which OfferUsage to fetch.
     */
    where: OfferUsageWhereUniqueInput
  }

  /**
   * OfferUsage findUniqueOrThrow
   */
  export type OfferUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * Filter, which OfferUsage to fetch.
     */
    where: OfferUsageWhereUniqueInput
  }

  /**
   * OfferUsage findFirst
   */
  export type OfferUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * Filter, which OfferUsage to fetch.
     */
    where?: OfferUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferUsages to fetch.
     */
    orderBy?: OfferUsageOrderByWithRelationInput | OfferUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfferUsages.
     */
    cursor?: OfferUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfferUsages.
     */
    distinct?: OfferUsageScalarFieldEnum | OfferUsageScalarFieldEnum[]
  }

  /**
   * OfferUsage findFirstOrThrow
   */
  export type OfferUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * Filter, which OfferUsage to fetch.
     */
    where?: OfferUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferUsages to fetch.
     */
    orderBy?: OfferUsageOrderByWithRelationInput | OfferUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfferUsages.
     */
    cursor?: OfferUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfferUsages.
     */
    distinct?: OfferUsageScalarFieldEnum | OfferUsageScalarFieldEnum[]
  }

  /**
   * OfferUsage findMany
   */
  export type OfferUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * Filter, which OfferUsages to fetch.
     */
    where?: OfferUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferUsages to fetch.
     */
    orderBy?: OfferUsageOrderByWithRelationInput | OfferUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfferUsages.
     */
    cursor?: OfferUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferUsages.
     */
    skip?: number
    distinct?: OfferUsageScalarFieldEnum | OfferUsageScalarFieldEnum[]
  }

  /**
   * OfferUsage create
   */
  export type OfferUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a OfferUsage.
     */
    data: XOR<OfferUsageCreateInput, OfferUsageUncheckedCreateInput>
  }

  /**
   * OfferUsage createMany
   */
  export type OfferUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfferUsages.
     */
    data: OfferUsageCreateManyInput | OfferUsageCreateManyInput[]
  }

  /**
   * OfferUsage update
   */
  export type OfferUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a OfferUsage.
     */
    data: XOR<OfferUsageUpdateInput, OfferUsageUncheckedUpdateInput>
    /**
     * Choose, which OfferUsage to update.
     */
    where: OfferUsageWhereUniqueInput
  }

  /**
   * OfferUsage updateMany
   */
  export type OfferUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OfferUsages.
     */
    data: XOR<OfferUsageUpdateManyMutationInput, OfferUsageUncheckedUpdateManyInput>
    /**
     * Filter which OfferUsages to update
     */
    where?: OfferUsageWhereInput
    /**
     * Limit how many OfferUsages to update.
     */
    limit?: number
  }

  /**
   * OfferUsage upsert
   */
  export type OfferUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the OfferUsage to update in case it exists.
     */
    where: OfferUsageWhereUniqueInput
    /**
     * In case the OfferUsage found by the `where` argument doesn't exist, create a new OfferUsage with this data.
     */
    create: XOR<OfferUsageCreateInput, OfferUsageUncheckedCreateInput>
    /**
     * In case the OfferUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfferUsageUpdateInput, OfferUsageUncheckedUpdateInput>
  }

  /**
   * OfferUsage delete
   */
  export type OfferUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
    /**
     * Filter which OfferUsage to delete.
     */
    where: OfferUsageWhereUniqueInput
  }

  /**
   * OfferUsage deleteMany
   */
  export type OfferUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfferUsages to delete
     */
    where?: OfferUsageWhereInput
    /**
     * Limit how many OfferUsages to delete.
     */
    limit?: number
  }

  /**
   * OfferUsage findRaw
   */
  export type OfferUsageFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OfferUsage aggregateRaw
   */
  export type OfferUsageAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OfferUsage without action
   */
  export type OfferUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferUsage
     */
    select?: OfferUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfferUsage
     */
    omit?: OfferUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferUsageInclude<ExtArgs> | null
  }


  /**
   * Model baseDiscountSlab
   */

  export type AggregateBaseDiscountSlab = {
    _count: BaseDiscountSlabCountAggregateOutputType | null
    _min: BaseDiscountSlabMinAggregateOutputType | null
    _max: BaseDiscountSlabMaxAggregateOutputType | null
  }

  export type BaseDiscountSlabMinAggregateOutputType = {
    id: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BaseDiscountSlabMaxAggregateOutputType = {
    id: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BaseDiscountSlabCountAggregateOutputType = {
    id: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BaseDiscountSlabMinAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BaseDiscountSlabMaxAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BaseDiscountSlabCountAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BaseDiscountSlabAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which baseDiscountSlab to aggregate.
     */
    where?: baseDiscountSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of baseDiscountSlabs to fetch.
     */
    orderBy?: baseDiscountSlabOrderByWithRelationInput | baseDiscountSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: baseDiscountSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` baseDiscountSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` baseDiscountSlabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned baseDiscountSlabs
    **/
    _count?: true | BaseDiscountSlabCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BaseDiscountSlabMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BaseDiscountSlabMaxAggregateInputType
  }

  export type GetBaseDiscountSlabAggregateType<T extends BaseDiscountSlabAggregateArgs> = {
        [P in keyof T & keyof AggregateBaseDiscountSlab]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBaseDiscountSlab[P]>
      : GetScalarType<T[P], AggregateBaseDiscountSlab[P]>
  }




  export type baseDiscountSlabGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: baseDiscountSlabWhereInput
    orderBy?: baseDiscountSlabOrderByWithAggregationInput | baseDiscountSlabOrderByWithAggregationInput[]
    by: BaseDiscountSlabScalarFieldEnum[] | BaseDiscountSlabScalarFieldEnum
    having?: baseDiscountSlabScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BaseDiscountSlabCountAggregateInputType | true
    _min?: BaseDiscountSlabMinAggregateInputType
    _max?: BaseDiscountSlabMaxAggregateInputType
  }

  export type BaseDiscountSlabGroupByOutputType = {
    id: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: BaseDiscountSlabCountAggregateOutputType | null
    _min: BaseDiscountSlabMinAggregateOutputType | null
    _max: BaseDiscountSlabMaxAggregateOutputType | null
  }

  type GetBaseDiscountSlabGroupByPayload<T extends baseDiscountSlabGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BaseDiscountSlabGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BaseDiscountSlabGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BaseDiscountSlabGroupByOutputType[P]>
            : GetScalarType<T[P], BaseDiscountSlabGroupByOutputType[P]>
        }
      >
    >


  export type baseDiscountSlabSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    levels?: boolean | DiscountLevelDefaultArgs<ExtArgs>
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["baseDiscountSlab"]>



  export type baseDiscountSlabSelectScalar = {
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type baseDiscountSlabOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "levels" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["baseDiscountSlab"]>
  export type baseDiscountSlabInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $baseDiscountSlabPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "baseDiscountSlab"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["baseDiscountSlab"]>
    composites: {
      levels: Prisma.$DiscountLevelPayload[]
    }
  }

  type baseDiscountSlabGetPayload<S extends boolean | null | undefined | baseDiscountSlabDefaultArgs> = $Result.GetResult<Prisma.$baseDiscountSlabPayload, S>

  type baseDiscountSlabCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<baseDiscountSlabFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BaseDiscountSlabCountAggregateInputType | true
    }

  export interface baseDiscountSlabDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['baseDiscountSlab'], meta: { name: 'baseDiscountSlab' } }
    /**
     * Find zero or one BaseDiscountSlab that matches the filter.
     * @param {baseDiscountSlabFindUniqueArgs} args - Arguments to find a BaseDiscountSlab
     * @example
     * // Get one BaseDiscountSlab
     * const baseDiscountSlab = await prisma.baseDiscountSlab.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends baseDiscountSlabFindUniqueArgs>(args: SelectSubset<T, baseDiscountSlabFindUniqueArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BaseDiscountSlab that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {baseDiscountSlabFindUniqueOrThrowArgs} args - Arguments to find a BaseDiscountSlab
     * @example
     * // Get one BaseDiscountSlab
     * const baseDiscountSlab = await prisma.baseDiscountSlab.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends baseDiscountSlabFindUniqueOrThrowArgs>(args: SelectSubset<T, baseDiscountSlabFindUniqueOrThrowArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BaseDiscountSlab that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {baseDiscountSlabFindFirstArgs} args - Arguments to find a BaseDiscountSlab
     * @example
     * // Get one BaseDiscountSlab
     * const baseDiscountSlab = await prisma.baseDiscountSlab.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends baseDiscountSlabFindFirstArgs>(args?: SelectSubset<T, baseDiscountSlabFindFirstArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BaseDiscountSlab that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {baseDiscountSlabFindFirstOrThrowArgs} args - Arguments to find a BaseDiscountSlab
     * @example
     * // Get one BaseDiscountSlab
     * const baseDiscountSlab = await prisma.baseDiscountSlab.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends baseDiscountSlabFindFirstOrThrowArgs>(args?: SelectSubset<T, baseDiscountSlabFindFirstOrThrowArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BaseDiscountSlabs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {baseDiscountSlabFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BaseDiscountSlabs
     * const baseDiscountSlabs = await prisma.baseDiscountSlab.findMany()
     * 
     * // Get first 10 BaseDiscountSlabs
     * const baseDiscountSlabs = await prisma.baseDiscountSlab.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const baseDiscountSlabWithIdOnly = await prisma.baseDiscountSlab.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends baseDiscountSlabFindManyArgs>(args?: SelectSubset<T, baseDiscountSlabFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BaseDiscountSlab.
     * @param {baseDiscountSlabCreateArgs} args - Arguments to create a BaseDiscountSlab.
     * @example
     * // Create one BaseDiscountSlab
     * const BaseDiscountSlab = await prisma.baseDiscountSlab.create({
     *   data: {
     *     // ... data to create a BaseDiscountSlab
     *   }
     * })
     * 
     */
    create<T extends baseDiscountSlabCreateArgs>(args: SelectSubset<T, baseDiscountSlabCreateArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BaseDiscountSlabs.
     * @param {baseDiscountSlabCreateManyArgs} args - Arguments to create many BaseDiscountSlabs.
     * @example
     * // Create many BaseDiscountSlabs
     * const baseDiscountSlab = await prisma.baseDiscountSlab.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends baseDiscountSlabCreateManyArgs>(args?: SelectSubset<T, baseDiscountSlabCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BaseDiscountSlab.
     * @param {baseDiscountSlabDeleteArgs} args - Arguments to delete one BaseDiscountSlab.
     * @example
     * // Delete one BaseDiscountSlab
     * const BaseDiscountSlab = await prisma.baseDiscountSlab.delete({
     *   where: {
     *     // ... filter to delete one BaseDiscountSlab
     *   }
     * })
     * 
     */
    delete<T extends baseDiscountSlabDeleteArgs>(args: SelectSubset<T, baseDiscountSlabDeleteArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BaseDiscountSlab.
     * @param {baseDiscountSlabUpdateArgs} args - Arguments to update one BaseDiscountSlab.
     * @example
     * // Update one BaseDiscountSlab
     * const baseDiscountSlab = await prisma.baseDiscountSlab.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends baseDiscountSlabUpdateArgs>(args: SelectSubset<T, baseDiscountSlabUpdateArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BaseDiscountSlabs.
     * @param {baseDiscountSlabDeleteManyArgs} args - Arguments to filter BaseDiscountSlabs to delete.
     * @example
     * // Delete a few BaseDiscountSlabs
     * const { count } = await prisma.baseDiscountSlab.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends baseDiscountSlabDeleteManyArgs>(args?: SelectSubset<T, baseDiscountSlabDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BaseDiscountSlabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {baseDiscountSlabUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BaseDiscountSlabs
     * const baseDiscountSlab = await prisma.baseDiscountSlab.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends baseDiscountSlabUpdateManyArgs>(args: SelectSubset<T, baseDiscountSlabUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BaseDiscountSlab.
     * @param {baseDiscountSlabUpsertArgs} args - Arguments to update or create a BaseDiscountSlab.
     * @example
     * // Update or create a BaseDiscountSlab
     * const baseDiscountSlab = await prisma.baseDiscountSlab.upsert({
     *   create: {
     *     // ... data to create a BaseDiscountSlab
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BaseDiscountSlab we want to update
     *   }
     * })
     */
    upsert<T extends baseDiscountSlabUpsertArgs>(args: SelectSubset<T, baseDiscountSlabUpsertArgs<ExtArgs>>): Prisma__baseDiscountSlabClient<$Result.GetResult<Prisma.$baseDiscountSlabPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BaseDiscountSlabs that matches the filter.
     * @param {baseDiscountSlabFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const baseDiscountSlab = await prisma.baseDiscountSlab.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: baseDiscountSlabFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a BaseDiscountSlab.
     * @param {baseDiscountSlabAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const baseDiscountSlab = await prisma.baseDiscountSlab.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: baseDiscountSlabAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of BaseDiscountSlabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {baseDiscountSlabCountArgs} args - Arguments to filter BaseDiscountSlabs to count.
     * @example
     * // Count the number of BaseDiscountSlabs
     * const count = await prisma.baseDiscountSlab.count({
     *   where: {
     *     // ... the filter for the BaseDiscountSlabs we want to count
     *   }
     * })
    **/
    count<T extends baseDiscountSlabCountArgs>(
      args?: Subset<T, baseDiscountSlabCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BaseDiscountSlabCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BaseDiscountSlab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaseDiscountSlabAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BaseDiscountSlabAggregateArgs>(args: Subset<T, BaseDiscountSlabAggregateArgs>): Prisma.PrismaPromise<GetBaseDiscountSlabAggregateType<T>>

    /**
     * Group by BaseDiscountSlab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {baseDiscountSlabGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends baseDiscountSlabGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: baseDiscountSlabGroupByArgs['orderBy'] }
        : { orderBy?: baseDiscountSlabGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, baseDiscountSlabGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBaseDiscountSlabGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the baseDiscountSlab model
   */
  readonly fields: baseDiscountSlabFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for baseDiscountSlab.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__baseDiscountSlabClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the baseDiscountSlab model
   */
  interface baseDiscountSlabFieldRefs {
    readonly id: FieldRef<"baseDiscountSlab", 'String'>
    readonly status: FieldRef<"baseDiscountSlab", 'String'>
    readonly createdAt: FieldRef<"baseDiscountSlab", 'DateTime'>
    readonly updatedAt: FieldRef<"baseDiscountSlab", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * baseDiscountSlab findUnique
   */
  export type baseDiscountSlabFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * Filter, which baseDiscountSlab to fetch.
     */
    where: baseDiscountSlabWhereUniqueInput
  }

  /**
   * baseDiscountSlab findUniqueOrThrow
   */
  export type baseDiscountSlabFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * Filter, which baseDiscountSlab to fetch.
     */
    where: baseDiscountSlabWhereUniqueInput
  }

  /**
   * baseDiscountSlab findFirst
   */
  export type baseDiscountSlabFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * Filter, which baseDiscountSlab to fetch.
     */
    where?: baseDiscountSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of baseDiscountSlabs to fetch.
     */
    orderBy?: baseDiscountSlabOrderByWithRelationInput | baseDiscountSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for baseDiscountSlabs.
     */
    cursor?: baseDiscountSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` baseDiscountSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` baseDiscountSlabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of baseDiscountSlabs.
     */
    distinct?: BaseDiscountSlabScalarFieldEnum | BaseDiscountSlabScalarFieldEnum[]
  }

  /**
   * baseDiscountSlab findFirstOrThrow
   */
  export type baseDiscountSlabFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * Filter, which baseDiscountSlab to fetch.
     */
    where?: baseDiscountSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of baseDiscountSlabs to fetch.
     */
    orderBy?: baseDiscountSlabOrderByWithRelationInput | baseDiscountSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for baseDiscountSlabs.
     */
    cursor?: baseDiscountSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` baseDiscountSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` baseDiscountSlabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of baseDiscountSlabs.
     */
    distinct?: BaseDiscountSlabScalarFieldEnum | BaseDiscountSlabScalarFieldEnum[]
  }

  /**
   * baseDiscountSlab findMany
   */
  export type baseDiscountSlabFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * Filter, which baseDiscountSlabs to fetch.
     */
    where?: baseDiscountSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of baseDiscountSlabs to fetch.
     */
    orderBy?: baseDiscountSlabOrderByWithRelationInput | baseDiscountSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing baseDiscountSlabs.
     */
    cursor?: baseDiscountSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` baseDiscountSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` baseDiscountSlabs.
     */
    skip?: number
    distinct?: BaseDiscountSlabScalarFieldEnum | BaseDiscountSlabScalarFieldEnum[]
  }

  /**
   * baseDiscountSlab create
   */
  export type baseDiscountSlabCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * The data needed to create a baseDiscountSlab.
     */
    data: XOR<baseDiscountSlabCreateInput, baseDiscountSlabUncheckedCreateInput>
  }

  /**
   * baseDiscountSlab createMany
   */
  export type baseDiscountSlabCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many baseDiscountSlabs.
     */
    data: baseDiscountSlabCreateManyInput | baseDiscountSlabCreateManyInput[]
  }

  /**
   * baseDiscountSlab update
   */
  export type baseDiscountSlabUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * The data needed to update a baseDiscountSlab.
     */
    data: XOR<baseDiscountSlabUpdateInput, baseDiscountSlabUncheckedUpdateInput>
    /**
     * Choose, which baseDiscountSlab to update.
     */
    where: baseDiscountSlabWhereUniqueInput
  }

  /**
   * baseDiscountSlab updateMany
   */
  export type baseDiscountSlabUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update baseDiscountSlabs.
     */
    data: XOR<baseDiscountSlabUpdateManyMutationInput, baseDiscountSlabUncheckedUpdateManyInput>
    /**
     * Filter which baseDiscountSlabs to update
     */
    where?: baseDiscountSlabWhereInput
    /**
     * Limit how many baseDiscountSlabs to update.
     */
    limit?: number
  }

  /**
   * baseDiscountSlab upsert
   */
  export type baseDiscountSlabUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * The filter to search for the baseDiscountSlab to update in case it exists.
     */
    where: baseDiscountSlabWhereUniqueInput
    /**
     * In case the baseDiscountSlab found by the `where` argument doesn't exist, create a new baseDiscountSlab with this data.
     */
    create: XOR<baseDiscountSlabCreateInput, baseDiscountSlabUncheckedCreateInput>
    /**
     * In case the baseDiscountSlab was found with the provided `where` argument, update it with this data.
     */
    update: XOR<baseDiscountSlabUpdateInput, baseDiscountSlabUncheckedUpdateInput>
  }

  /**
   * baseDiscountSlab delete
   */
  export type baseDiscountSlabDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
    /**
     * Filter which baseDiscountSlab to delete.
     */
    where: baseDiscountSlabWhereUniqueInput
  }

  /**
   * baseDiscountSlab deleteMany
   */
  export type baseDiscountSlabDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which baseDiscountSlabs to delete
     */
    where?: baseDiscountSlabWhereInput
    /**
     * Limit how many baseDiscountSlabs to delete.
     */
    limit?: number
  }

  /**
   * baseDiscountSlab findRaw
   */
  export type baseDiscountSlabFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * baseDiscountSlab aggregateRaw
   */
  export type baseDiscountSlabAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * baseDiscountSlab without action
   */
  export type baseDiscountSlabDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the baseDiscountSlab
     */
    select?: baseDiscountSlabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the baseDiscountSlab
     */
    omit?: baseDiscountSlabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: baseDiscountSlabInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const CustomerServiceAgentsScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    establishmentDate: 'establishmentDate',
    companyOwnerName: 'companyOwnerName',
    companyHumanServiceNumber: 'companyHumanServiceNumber',
    companyEmail: 'companyEmail',
    companyDescription: 'companyDescription',
    agentId: 'agentId',
    agentName: 'agentName',
    username: 'username',
    createdAt: 'createdAt',
    availableTokens: 'availableTokens',
    lastModified: 'lastModified'
  };

  export type CustomerServiceAgentsScalarFieldEnum = (typeof CustomerServiceAgentsScalarFieldEnum)[keyof typeof CustomerServiceAgentsScalarFieldEnum]


  export const AgentUsageStatisticsScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    agentName: 'agentName',
    satisfactionRate: 'satisfactionRate'
  };

  export type AgentUsageStatisticsScalarFieldEnum = (typeof AgentUsageStatisticsScalarFieldEnum)[keyof typeof AgentUsageStatisticsScalarFieldEnum]


  export const AgentRequestsHandledLogsScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    agentName: 'agentName',
    totalRequestsHandled: 'totalRequestsHandled'
  };

  export type AgentRequestsHandledLogsScalarFieldEnum = (typeof AgentRequestsHandledLogsScalarFieldEnum)[keyof typeof AgentRequestsHandledLogsScalarFieldEnum]


  export const CompanyAgentsRegisteredScalarFieldEnum: {
    id: 'id',
    username: 'username',
    totalAgents: 'totalAgents'
  };

  export type CompanyAgentsRegisteredScalarFieldEnum = (typeof CompanyAgentsRegisteredScalarFieldEnum)[keyof typeof CompanyAgentsRegisteredScalarFieldEnum]


  export const UserOrdersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserOrdersScalarFieldEnum = (typeof UserOrdersScalarFieldEnum)[keyof typeof UserOrdersScalarFieldEnum]


  export const OfferScalarFieldEnum: {
    id: 'id',
    offerId: 'offerId',
    title: 'title',
    description: 'description',
    offerCode: 'offerCode',
    discountType: 'discountType',
    discountValue: 'discountValue',
    maxDiscountAmount: 'maxDiscountAmount',
    offerType: 'offerType',
    applicableTo: 'applicableTo',
    minPurchaseAmount: 'minPurchaseAmount',
    applicableProducts: 'applicableProducts',
    usageLimit: 'usageLimit',
    usageLimitPerUser: 'usageLimitPerUser',
    globalUsedCount: 'globalUsedCount',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OfferScalarFieldEnum = (typeof OfferScalarFieldEnum)[keyof typeof OfferScalarFieldEnum]


  export const OfferUsageScalarFieldEnum: {
    id: 'id',
    username: 'username',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OfferUsageScalarFieldEnum = (typeof OfferUsageScalarFieldEnum)[keyof typeof OfferUsageScalarFieldEnum]


  export const BaseDiscountSlabScalarFieldEnum: {
    id: 'id',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BaseDiscountSlabScalarFieldEnum = (typeof BaseDiscountSlabScalarFieldEnum)[keyof typeof BaseDiscountSlabScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type CustomerServiceAgentsWhereInput = {
    AND?: CustomerServiceAgentsWhereInput | CustomerServiceAgentsWhereInput[]
    OR?: CustomerServiceAgentsWhereInput[]
    NOT?: CustomerServiceAgentsWhereInput | CustomerServiceAgentsWhereInput[]
    id?: StringFilter<"CustomerServiceAgents"> | string
    companyName?: StringFilter<"CustomerServiceAgents"> | string
    establishmentDate?: DateTimeFilter<"CustomerServiceAgents"> | Date | string
    companyOwnerName?: StringFilter<"CustomerServiceAgents"> | string
    companyHumanServiceNumber?: StringFilter<"CustomerServiceAgents"> | string
    companyEmail?: StringFilter<"CustomerServiceAgents"> | string
    companyDescription?: StringFilter<"CustomerServiceAgents"> | string
    agentId?: StringFilter<"CustomerServiceAgents"> | string
    agentName?: StringFilter<"CustomerServiceAgents"> | string
    username?: StringFilter<"CustomerServiceAgents"> | string
    createdAt?: DateTimeFilter<"CustomerServiceAgents"> | Date | string
    availableTokens?: IntFilter<"CustomerServiceAgents"> | number
    items?: ItemCompositeListFilter | ItemObjectEqualityInput[]
    lastModified?: DateTimeFilter<"CustomerServiceAgents"> | Date | string
    modificationHistory?: AgentModificationCompositeListFilter | AgentModificationObjectEqualityInput[]
  }

  export type CustomerServiceAgentsOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    establishmentDate?: SortOrder
    companyOwnerName?: SortOrder
    companyHumanServiceNumber?: SortOrder
    companyEmail?: SortOrder
    companyDescription?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    availableTokens?: SortOrder
    items?: ItemOrderByCompositeAggregateInput
    lastModified?: SortOrder
    modificationHistory?: AgentModificationOrderByCompositeAggregateInput
  }

  export type CustomerServiceAgentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId?: string
    username?: string
    AND?: CustomerServiceAgentsWhereInput | CustomerServiceAgentsWhereInput[]
    OR?: CustomerServiceAgentsWhereInput[]
    NOT?: CustomerServiceAgentsWhereInput | CustomerServiceAgentsWhereInput[]
    companyName?: StringFilter<"CustomerServiceAgents"> | string
    establishmentDate?: DateTimeFilter<"CustomerServiceAgents"> | Date | string
    companyOwnerName?: StringFilter<"CustomerServiceAgents"> | string
    companyHumanServiceNumber?: StringFilter<"CustomerServiceAgents"> | string
    companyEmail?: StringFilter<"CustomerServiceAgents"> | string
    companyDescription?: StringFilter<"CustomerServiceAgents"> | string
    agentName?: StringFilter<"CustomerServiceAgents"> | string
    createdAt?: DateTimeFilter<"CustomerServiceAgents"> | Date | string
    availableTokens?: IntFilter<"CustomerServiceAgents"> | number
    items?: ItemCompositeListFilter | ItemObjectEqualityInput[]
    lastModified?: DateTimeFilter<"CustomerServiceAgents"> | Date | string
    modificationHistory?: AgentModificationCompositeListFilter | AgentModificationObjectEqualityInput[]
  }, "id" | "agentId" | "username">

  export type CustomerServiceAgentsOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    establishmentDate?: SortOrder
    companyOwnerName?: SortOrder
    companyHumanServiceNumber?: SortOrder
    companyEmail?: SortOrder
    companyDescription?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    availableTokens?: SortOrder
    lastModified?: SortOrder
    _count?: CustomerServiceAgentsCountOrderByAggregateInput
    _avg?: CustomerServiceAgentsAvgOrderByAggregateInput
    _max?: CustomerServiceAgentsMaxOrderByAggregateInput
    _min?: CustomerServiceAgentsMinOrderByAggregateInput
    _sum?: CustomerServiceAgentsSumOrderByAggregateInput
  }

  export type CustomerServiceAgentsScalarWhereWithAggregatesInput = {
    AND?: CustomerServiceAgentsScalarWhereWithAggregatesInput | CustomerServiceAgentsScalarWhereWithAggregatesInput[]
    OR?: CustomerServiceAgentsScalarWhereWithAggregatesInput[]
    NOT?: CustomerServiceAgentsScalarWhereWithAggregatesInput | CustomerServiceAgentsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    companyName?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    establishmentDate?: DateTimeWithAggregatesFilter<"CustomerServiceAgents"> | Date | string
    companyOwnerName?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    companyHumanServiceNumber?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    companyEmail?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    companyDescription?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    agentId?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    agentName?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    username?: StringWithAggregatesFilter<"CustomerServiceAgents"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CustomerServiceAgents"> | Date | string
    availableTokens?: IntWithAggregatesFilter<"CustomerServiceAgents"> | number
    lastModified?: DateTimeWithAggregatesFilter<"CustomerServiceAgents"> | Date | string
  }

  export type AgentUsageStatisticsWhereInput = {
    AND?: AgentUsageStatisticsWhereInput | AgentUsageStatisticsWhereInput[]
    OR?: AgentUsageStatisticsWhereInput[]
    NOT?: AgentUsageStatisticsWhereInput | AgentUsageStatisticsWhereInput[]
    id?: StringFilter<"AgentUsageStatistics"> | string
    agentId?: StringFilter<"AgentUsageStatistics"> | string
    agentName?: StringFilter<"AgentUsageStatistics"> | string
    usageLogs?: UsageLogCompositeListFilter | UsageLogObjectEqualityInput[]
    satisfactionRate?: IntFilter<"AgentUsageStatistics"> | number
    satisfactionRateLogs?: SatisfactionRateLogCompositeListFilter | SatisfactionRateLogObjectEqualityInput[]
    customerReviews?: CustomerReviewCompositeListFilter | CustomerReviewObjectEqualityInput[]
  }

  export type AgentUsageStatisticsOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    usageLogs?: UsageLogOrderByCompositeAggregateInput
    satisfactionRate?: SortOrder
    satisfactionRateLogs?: SatisfactionRateLogOrderByCompositeAggregateInput
    customerReviews?: CustomerReviewOrderByCompositeAggregateInput
  }

  export type AgentUsageStatisticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId?: string
    AND?: AgentUsageStatisticsWhereInput | AgentUsageStatisticsWhereInput[]
    OR?: AgentUsageStatisticsWhereInput[]
    NOT?: AgentUsageStatisticsWhereInput | AgentUsageStatisticsWhereInput[]
    agentName?: StringFilter<"AgentUsageStatistics"> | string
    usageLogs?: UsageLogCompositeListFilter | UsageLogObjectEqualityInput[]
    satisfactionRate?: IntFilter<"AgentUsageStatistics"> | number
    satisfactionRateLogs?: SatisfactionRateLogCompositeListFilter | SatisfactionRateLogObjectEqualityInput[]
    customerReviews?: CustomerReviewCompositeListFilter | CustomerReviewObjectEqualityInput[]
  }, "id" | "agentId">

  export type AgentUsageStatisticsOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    satisfactionRate?: SortOrder
    _count?: AgentUsageStatisticsCountOrderByAggregateInput
    _avg?: AgentUsageStatisticsAvgOrderByAggregateInput
    _max?: AgentUsageStatisticsMaxOrderByAggregateInput
    _min?: AgentUsageStatisticsMinOrderByAggregateInput
    _sum?: AgentUsageStatisticsSumOrderByAggregateInput
  }

  export type AgentUsageStatisticsScalarWhereWithAggregatesInput = {
    AND?: AgentUsageStatisticsScalarWhereWithAggregatesInput | AgentUsageStatisticsScalarWhereWithAggregatesInput[]
    OR?: AgentUsageStatisticsScalarWhereWithAggregatesInput[]
    NOT?: AgentUsageStatisticsScalarWhereWithAggregatesInput | AgentUsageStatisticsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentUsageStatistics"> | string
    agentId?: StringWithAggregatesFilter<"AgentUsageStatistics"> | string
    agentName?: StringWithAggregatesFilter<"AgentUsageStatistics"> | string
    satisfactionRate?: IntWithAggregatesFilter<"AgentUsageStatistics"> | number
  }

  export type AgentRequestsHandledLogsWhereInput = {
    AND?: AgentRequestsHandledLogsWhereInput | AgentRequestsHandledLogsWhereInput[]
    OR?: AgentRequestsHandledLogsWhereInput[]
    NOT?: AgentRequestsHandledLogsWhereInput | AgentRequestsHandledLogsWhereInput[]
    id?: StringFilter<"AgentRequestsHandledLogs"> | string
    agentId?: StringFilter<"AgentRequestsHandledLogs"> | string
    agentName?: StringFilter<"AgentRequestsHandledLogs"> | string
    totalRequestsHandled?: IntFilter<"AgentRequestsHandledLogs"> | number
    requestLogs?: RequestHandledLogCompositeListFilter | RequestHandledLogObjectEqualityInput[]
  }

  export type AgentRequestsHandledLogsOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalRequestsHandled?: SortOrder
    requestLogs?: RequestHandledLogOrderByCompositeAggregateInput
  }

  export type AgentRequestsHandledLogsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId?: string
    AND?: AgentRequestsHandledLogsWhereInput | AgentRequestsHandledLogsWhereInput[]
    OR?: AgentRequestsHandledLogsWhereInput[]
    NOT?: AgentRequestsHandledLogsWhereInput | AgentRequestsHandledLogsWhereInput[]
    agentName?: StringFilter<"AgentRequestsHandledLogs"> | string
    totalRequestsHandled?: IntFilter<"AgentRequestsHandledLogs"> | number
    requestLogs?: RequestHandledLogCompositeListFilter | RequestHandledLogObjectEqualityInput[]
  }, "id" | "agentId">

  export type AgentRequestsHandledLogsOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalRequestsHandled?: SortOrder
    _count?: AgentRequestsHandledLogsCountOrderByAggregateInput
    _avg?: AgentRequestsHandledLogsAvgOrderByAggregateInput
    _max?: AgentRequestsHandledLogsMaxOrderByAggregateInput
    _min?: AgentRequestsHandledLogsMinOrderByAggregateInput
    _sum?: AgentRequestsHandledLogsSumOrderByAggregateInput
  }

  export type AgentRequestsHandledLogsScalarWhereWithAggregatesInput = {
    AND?: AgentRequestsHandledLogsScalarWhereWithAggregatesInput | AgentRequestsHandledLogsScalarWhereWithAggregatesInput[]
    OR?: AgentRequestsHandledLogsScalarWhereWithAggregatesInput[]
    NOT?: AgentRequestsHandledLogsScalarWhereWithAggregatesInput | AgentRequestsHandledLogsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentRequestsHandledLogs"> | string
    agentId?: StringWithAggregatesFilter<"AgentRequestsHandledLogs"> | string
    agentName?: StringWithAggregatesFilter<"AgentRequestsHandledLogs"> | string
    totalRequestsHandled?: IntWithAggregatesFilter<"AgentRequestsHandledLogs"> | number
  }

  export type CompanyAgentsRegisteredWhereInput = {
    AND?: CompanyAgentsRegisteredWhereInput | CompanyAgentsRegisteredWhereInput[]
    OR?: CompanyAgentsRegisteredWhereInput[]
    NOT?: CompanyAgentsRegisteredWhereInput | CompanyAgentsRegisteredWhereInput[]
    id?: StringFilter<"CompanyAgentsRegistered"> | string
    username?: StringFilter<"CompanyAgentsRegistered"> | string
    totalAgents?: IntFilter<"CompanyAgentsRegistered"> | number
    agents?: AgentRecordCompositeListFilter | AgentRecordObjectEqualityInput[]
  }

  export type CompanyAgentsRegisteredOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    totalAgents?: SortOrder
    agents?: AgentRecordOrderByCompositeAggregateInput
  }

  export type CompanyAgentsRegisteredWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: CompanyAgentsRegisteredWhereInput | CompanyAgentsRegisteredWhereInput[]
    OR?: CompanyAgentsRegisteredWhereInput[]
    NOT?: CompanyAgentsRegisteredWhereInput | CompanyAgentsRegisteredWhereInput[]
    totalAgents?: IntFilter<"CompanyAgentsRegistered"> | number
    agents?: AgentRecordCompositeListFilter | AgentRecordObjectEqualityInput[]
  }, "id" | "username">

  export type CompanyAgentsRegisteredOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    totalAgents?: SortOrder
    _count?: CompanyAgentsRegisteredCountOrderByAggregateInput
    _avg?: CompanyAgentsRegisteredAvgOrderByAggregateInput
    _max?: CompanyAgentsRegisteredMaxOrderByAggregateInput
    _min?: CompanyAgentsRegisteredMinOrderByAggregateInput
    _sum?: CompanyAgentsRegisteredSumOrderByAggregateInput
  }

  export type CompanyAgentsRegisteredScalarWhereWithAggregatesInput = {
    AND?: CompanyAgentsRegisteredScalarWhereWithAggregatesInput | CompanyAgentsRegisteredScalarWhereWithAggregatesInput[]
    OR?: CompanyAgentsRegisteredScalarWhereWithAggregatesInput[]
    NOT?: CompanyAgentsRegisteredScalarWhereWithAggregatesInput | CompanyAgentsRegisteredScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanyAgentsRegistered"> | string
    username?: StringWithAggregatesFilter<"CompanyAgentsRegistered"> | string
    totalAgents?: IntWithAggregatesFilter<"CompanyAgentsRegistered"> | number
  }

  export type UserOrdersWhereInput = {
    AND?: UserOrdersWhereInput | UserOrdersWhereInput[]
    OR?: UserOrdersWhereInput[]
    NOT?: UserOrdersWhereInput | UserOrdersWhereInput[]
    id?: StringFilter<"UserOrders"> | string
    username?: StringFilter<"UserOrders"> | string
    orders?: OrderCompositeListFilter | OrderObjectEqualityInput[]
    createdAt?: DateTimeFilter<"UserOrders"> | Date | string
    updatedAt?: DateTimeFilter<"UserOrders"> | Date | string
  }

  export type UserOrdersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    orders?: OrderOrderByCompositeAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOrdersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserOrdersWhereInput | UserOrdersWhereInput[]
    OR?: UserOrdersWhereInput[]
    NOT?: UserOrdersWhereInput | UserOrdersWhereInput[]
    orders?: OrderCompositeListFilter | OrderObjectEqualityInput[]
    createdAt?: DateTimeFilter<"UserOrders"> | Date | string
    updatedAt?: DateTimeFilter<"UserOrders"> | Date | string
  }, "id" | "username">

  export type UserOrdersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserOrdersCountOrderByAggregateInput
    _max?: UserOrdersMaxOrderByAggregateInput
    _min?: UserOrdersMinOrderByAggregateInput
  }

  export type UserOrdersScalarWhereWithAggregatesInput = {
    AND?: UserOrdersScalarWhereWithAggregatesInput | UserOrdersScalarWhereWithAggregatesInput[]
    OR?: UserOrdersScalarWhereWithAggregatesInput[]
    NOT?: UserOrdersScalarWhereWithAggregatesInput | UserOrdersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserOrders"> | string
    username?: StringWithAggregatesFilter<"UserOrders"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserOrders"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserOrders"> | Date | string
  }

  export type OfferWhereInput = {
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    id?: StringFilter<"Offer"> | string
    offerId?: StringFilter<"Offer"> | string
    title?: StringFilter<"Offer"> | string
    description?: StringNullableFilter<"Offer"> | string | null
    offerCode?: StringNullableFilter<"Offer"> | string | null
    discountType?: StringFilter<"Offer"> | string
    discountValue?: FloatFilter<"Offer"> | number
    maxDiscountAmount?: FloatNullableFilter<"Offer"> | number | null
    offerType?: StringFilter<"Offer"> | string
    applicableTo?: StringNullableListFilter<"Offer">
    minPurchaseAmount?: FloatNullableFilter<"Offer"> | number | null
    applicableProducts?: StringNullableListFilter<"Offer">
    usageLimit?: IntNullableFilter<"Offer"> | number | null
    usageLimitPerUser?: IntNullableFilter<"Offer"> | number | null
    globalUsedCount?: IntFilter<"Offer"> | number
    startDate?: DateTimeFilter<"Offer"> | Date | string
    endDate?: DateTimeFilter<"Offer"> | Date | string
    status?: StringFilter<"Offer"> | string
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
  }

  export type OfferOrderByWithRelationInput = {
    id?: SortOrder
    offerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    offerCode?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    maxDiscountAmount?: SortOrder
    offerType?: SortOrder
    applicableTo?: SortOrder
    minPurchaseAmount?: SortOrder
    applicableProducts?: SortOrder
    usageLimit?: SortOrder
    usageLimitPerUser?: SortOrder
    globalUsedCount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    offerId?: string
    offerCode?: string
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    title?: StringFilter<"Offer"> | string
    description?: StringNullableFilter<"Offer"> | string | null
    discountType?: StringFilter<"Offer"> | string
    discountValue?: FloatFilter<"Offer"> | number
    maxDiscountAmount?: FloatNullableFilter<"Offer"> | number | null
    offerType?: StringFilter<"Offer"> | string
    applicableTo?: StringNullableListFilter<"Offer">
    minPurchaseAmount?: FloatNullableFilter<"Offer"> | number | null
    applicableProducts?: StringNullableListFilter<"Offer">
    usageLimit?: IntNullableFilter<"Offer"> | number | null
    usageLimitPerUser?: IntNullableFilter<"Offer"> | number | null
    globalUsedCount?: IntFilter<"Offer"> | number
    startDate?: DateTimeFilter<"Offer"> | Date | string
    endDate?: DateTimeFilter<"Offer"> | Date | string
    status?: StringFilter<"Offer"> | string
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
  }, "id" | "offerId" | "offerCode">

  export type OfferOrderByWithAggregationInput = {
    id?: SortOrder
    offerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    offerCode?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    maxDiscountAmount?: SortOrder
    offerType?: SortOrder
    applicableTo?: SortOrder
    minPurchaseAmount?: SortOrder
    applicableProducts?: SortOrder
    usageLimit?: SortOrder
    usageLimitPerUser?: SortOrder
    globalUsedCount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OfferCountOrderByAggregateInput
    _avg?: OfferAvgOrderByAggregateInput
    _max?: OfferMaxOrderByAggregateInput
    _min?: OfferMinOrderByAggregateInput
    _sum?: OfferSumOrderByAggregateInput
  }

  export type OfferScalarWhereWithAggregatesInput = {
    AND?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    OR?: OfferScalarWhereWithAggregatesInput[]
    NOT?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Offer"> | string
    offerId?: StringWithAggregatesFilter<"Offer"> | string
    title?: StringWithAggregatesFilter<"Offer"> | string
    description?: StringNullableWithAggregatesFilter<"Offer"> | string | null
    offerCode?: StringNullableWithAggregatesFilter<"Offer"> | string | null
    discountType?: StringWithAggregatesFilter<"Offer"> | string
    discountValue?: FloatWithAggregatesFilter<"Offer"> | number
    maxDiscountAmount?: FloatNullableWithAggregatesFilter<"Offer"> | number | null
    offerType?: StringWithAggregatesFilter<"Offer"> | string
    applicableTo?: StringNullableListFilter<"Offer">
    minPurchaseAmount?: FloatNullableWithAggregatesFilter<"Offer"> | number | null
    applicableProducts?: StringNullableListFilter<"Offer">
    usageLimit?: IntNullableWithAggregatesFilter<"Offer"> | number | null
    usageLimitPerUser?: IntNullableWithAggregatesFilter<"Offer"> | number | null
    globalUsedCount?: IntWithAggregatesFilter<"Offer"> | number
    startDate?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
    status?: StringWithAggregatesFilter<"Offer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
  }

  export type OfferUsageWhereInput = {
    AND?: OfferUsageWhereInput | OfferUsageWhereInput[]
    OR?: OfferUsageWhereInput[]
    NOT?: OfferUsageWhereInput | OfferUsageWhereInput[]
    id?: StringFilter<"OfferUsage"> | string
    username?: StringFilter<"OfferUsage"> | string
    offersUsed?: OfferUsedCompositeListFilter | OfferUsedObjectEqualityInput[]
    createdAt?: DateTimeFilter<"OfferUsage"> | Date | string
    updatedAt?: DateTimeFilter<"OfferUsage"> | Date | string
  }

  export type OfferUsageOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    offersUsed?: OfferUsedOrderByCompositeAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: OfferUsageWhereInput | OfferUsageWhereInput[]
    OR?: OfferUsageWhereInput[]
    NOT?: OfferUsageWhereInput | OfferUsageWhereInput[]
    offersUsed?: OfferUsedCompositeListFilter | OfferUsedObjectEqualityInput[]
    createdAt?: DateTimeFilter<"OfferUsage"> | Date | string
    updatedAt?: DateTimeFilter<"OfferUsage"> | Date | string
  }, "id" | "username">

  export type OfferUsageOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OfferUsageCountOrderByAggregateInput
    _max?: OfferUsageMaxOrderByAggregateInput
    _min?: OfferUsageMinOrderByAggregateInput
  }

  export type OfferUsageScalarWhereWithAggregatesInput = {
    AND?: OfferUsageScalarWhereWithAggregatesInput | OfferUsageScalarWhereWithAggregatesInput[]
    OR?: OfferUsageScalarWhereWithAggregatesInput[]
    NOT?: OfferUsageScalarWhereWithAggregatesInput | OfferUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OfferUsage"> | string
    username?: StringWithAggregatesFilter<"OfferUsage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OfferUsage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OfferUsage"> | Date | string
  }

  export type baseDiscountSlabWhereInput = {
    AND?: baseDiscountSlabWhereInput | baseDiscountSlabWhereInput[]
    OR?: baseDiscountSlabWhereInput[]
    NOT?: baseDiscountSlabWhereInput | baseDiscountSlabWhereInput[]
    id?: StringFilter<"baseDiscountSlab"> | string
    levels?: DiscountLevelCompositeListFilter | DiscountLevelObjectEqualityInput[]
    status?: StringFilter<"baseDiscountSlab"> | string
    createdAt?: DateTimeFilter<"baseDiscountSlab"> | Date | string
    updatedAt?: DateTimeFilter<"baseDiscountSlab"> | Date | string
  }

  export type baseDiscountSlabOrderByWithRelationInput = {
    id?: SortOrder
    levels?: DiscountLevelOrderByCompositeAggregateInput
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type baseDiscountSlabWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: baseDiscountSlabWhereInput | baseDiscountSlabWhereInput[]
    OR?: baseDiscountSlabWhereInput[]
    NOT?: baseDiscountSlabWhereInput | baseDiscountSlabWhereInput[]
    levels?: DiscountLevelCompositeListFilter | DiscountLevelObjectEqualityInput[]
    status?: StringFilter<"baseDiscountSlab"> | string
    createdAt?: DateTimeFilter<"baseDiscountSlab"> | Date | string
    updatedAt?: DateTimeFilter<"baseDiscountSlab"> | Date | string
  }, "id">

  export type baseDiscountSlabOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: baseDiscountSlabCountOrderByAggregateInput
    _max?: baseDiscountSlabMaxOrderByAggregateInput
    _min?: baseDiscountSlabMinOrderByAggregateInput
  }

  export type baseDiscountSlabScalarWhereWithAggregatesInput = {
    AND?: baseDiscountSlabScalarWhereWithAggregatesInput | baseDiscountSlabScalarWhereWithAggregatesInput[]
    OR?: baseDiscountSlabScalarWhereWithAggregatesInput[]
    NOT?: baseDiscountSlabScalarWhereWithAggregatesInput | baseDiscountSlabScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"baseDiscountSlab"> | string
    status?: StringWithAggregatesFilter<"baseDiscountSlab"> | string
    createdAt?: DateTimeWithAggregatesFilter<"baseDiscountSlab"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"baseDiscountSlab"> | Date | string
  }

  export type CustomerServiceAgentsCreateInput = {
    id?: string
    companyName: string
    establishmentDate: Date | string
    companyOwnerName: string
    companyHumanServiceNumber: string
    companyEmail: string
    companyDescription: string
    agentId: string
    agentName: string
    username: string
    createdAt?: Date | string
    availableTokens?: number
    items?: XOR<ItemListCreateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    lastModified?: Date | string
    modificationHistory?: XOR<AgentModificationListCreateEnvelopeInput, AgentModificationCreateInput> | AgentModificationCreateInput[]
  }

  export type CustomerServiceAgentsUncheckedCreateInput = {
    id?: string
    companyName: string
    establishmentDate: Date | string
    companyOwnerName: string
    companyHumanServiceNumber: string
    companyEmail: string
    companyDescription: string
    agentId: string
    agentName: string
    username: string
    createdAt?: Date | string
    availableTokens?: number
    items?: XOR<ItemListCreateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    lastModified?: Date | string
    modificationHistory?: XOR<AgentModificationListCreateEnvelopeInput, AgentModificationCreateInput> | AgentModificationCreateInput[]
  }

  export type CustomerServiceAgentsUpdateInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    establishmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyOwnerName?: StringFieldUpdateOperationsInput | string
    companyHumanServiceNumber?: StringFieldUpdateOperationsInput | string
    companyEmail?: StringFieldUpdateOperationsInput | string
    companyDescription?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTokens?: IntFieldUpdateOperationsInput | number
    items?: XOR<ItemListUpdateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    modificationHistory?: XOR<AgentModificationListUpdateEnvelopeInput, AgentModificationCreateInput> | AgentModificationCreateInput[]
  }

  export type CustomerServiceAgentsUncheckedUpdateInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    establishmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyOwnerName?: StringFieldUpdateOperationsInput | string
    companyHumanServiceNumber?: StringFieldUpdateOperationsInput | string
    companyEmail?: StringFieldUpdateOperationsInput | string
    companyDescription?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTokens?: IntFieldUpdateOperationsInput | number
    items?: XOR<ItemListUpdateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    modificationHistory?: XOR<AgentModificationListUpdateEnvelopeInput, AgentModificationCreateInput> | AgentModificationCreateInput[]
  }

  export type CustomerServiceAgentsCreateManyInput = {
    id?: string
    companyName: string
    establishmentDate: Date | string
    companyOwnerName: string
    companyHumanServiceNumber: string
    companyEmail: string
    companyDescription: string
    agentId: string
    agentName: string
    username: string
    createdAt?: Date | string
    availableTokens?: number
    items?: XOR<ItemListCreateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    lastModified?: Date | string
    modificationHistory?: XOR<AgentModificationListCreateEnvelopeInput, AgentModificationCreateInput> | AgentModificationCreateInput[]
  }

  export type CustomerServiceAgentsUpdateManyMutationInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    establishmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyOwnerName?: StringFieldUpdateOperationsInput | string
    companyHumanServiceNumber?: StringFieldUpdateOperationsInput | string
    companyEmail?: StringFieldUpdateOperationsInput | string
    companyDescription?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTokens?: IntFieldUpdateOperationsInput | number
    items?: XOR<ItemListUpdateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    modificationHistory?: XOR<AgentModificationListUpdateEnvelopeInput, AgentModificationCreateInput> | AgentModificationCreateInput[]
  }

  export type CustomerServiceAgentsUncheckedUpdateManyInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    establishmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyOwnerName?: StringFieldUpdateOperationsInput | string
    companyHumanServiceNumber?: StringFieldUpdateOperationsInput | string
    companyEmail?: StringFieldUpdateOperationsInput | string
    companyDescription?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTokens?: IntFieldUpdateOperationsInput | number
    items?: XOR<ItemListUpdateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    modificationHistory?: XOR<AgentModificationListUpdateEnvelopeInput, AgentModificationCreateInput> | AgentModificationCreateInput[]
  }

  export type AgentUsageStatisticsCreateInput = {
    id?: string
    agentId: string
    agentName: string
    usageLogs?: XOR<UsageLogListCreateEnvelopeInput, UsageLogCreateInput> | UsageLogCreateInput[]
    satisfactionRate?: number
    satisfactionRateLogs?: XOR<SatisfactionRateLogListCreateEnvelopeInput, SatisfactionRateLogCreateInput> | SatisfactionRateLogCreateInput[]
    customerReviews?: XOR<CustomerReviewListCreateEnvelopeInput, CustomerReviewCreateInput> | CustomerReviewCreateInput[]
  }

  export type AgentUsageStatisticsUncheckedCreateInput = {
    id?: string
    agentId: string
    agentName: string
    usageLogs?: XOR<UsageLogListCreateEnvelopeInput, UsageLogCreateInput> | UsageLogCreateInput[]
    satisfactionRate?: number
    satisfactionRateLogs?: XOR<SatisfactionRateLogListCreateEnvelopeInput, SatisfactionRateLogCreateInput> | SatisfactionRateLogCreateInput[]
    customerReviews?: XOR<CustomerReviewListCreateEnvelopeInput, CustomerReviewCreateInput> | CustomerReviewCreateInput[]
  }

  export type AgentUsageStatisticsUpdateInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    usageLogs?: XOR<UsageLogListUpdateEnvelopeInput, UsageLogCreateInput> | UsageLogCreateInput[]
    satisfactionRate?: IntFieldUpdateOperationsInput | number
    satisfactionRateLogs?: XOR<SatisfactionRateLogListUpdateEnvelopeInput, SatisfactionRateLogCreateInput> | SatisfactionRateLogCreateInput[]
    customerReviews?: XOR<CustomerReviewListUpdateEnvelopeInput, CustomerReviewCreateInput> | CustomerReviewCreateInput[]
  }

  export type AgentUsageStatisticsUncheckedUpdateInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    usageLogs?: XOR<UsageLogListUpdateEnvelopeInput, UsageLogCreateInput> | UsageLogCreateInput[]
    satisfactionRate?: IntFieldUpdateOperationsInput | number
    satisfactionRateLogs?: XOR<SatisfactionRateLogListUpdateEnvelopeInput, SatisfactionRateLogCreateInput> | SatisfactionRateLogCreateInput[]
    customerReviews?: XOR<CustomerReviewListUpdateEnvelopeInput, CustomerReviewCreateInput> | CustomerReviewCreateInput[]
  }

  export type AgentUsageStatisticsCreateManyInput = {
    id?: string
    agentId: string
    agentName: string
    usageLogs?: XOR<UsageLogListCreateEnvelopeInput, UsageLogCreateInput> | UsageLogCreateInput[]
    satisfactionRate?: number
    satisfactionRateLogs?: XOR<SatisfactionRateLogListCreateEnvelopeInput, SatisfactionRateLogCreateInput> | SatisfactionRateLogCreateInput[]
    customerReviews?: XOR<CustomerReviewListCreateEnvelopeInput, CustomerReviewCreateInput> | CustomerReviewCreateInput[]
  }

  export type AgentUsageStatisticsUpdateManyMutationInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    usageLogs?: XOR<UsageLogListUpdateEnvelopeInput, UsageLogCreateInput> | UsageLogCreateInput[]
    satisfactionRate?: IntFieldUpdateOperationsInput | number
    satisfactionRateLogs?: XOR<SatisfactionRateLogListUpdateEnvelopeInput, SatisfactionRateLogCreateInput> | SatisfactionRateLogCreateInput[]
    customerReviews?: XOR<CustomerReviewListUpdateEnvelopeInput, CustomerReviewCreateInput> | CustomerReviewCreateInput[]
  }

  export type AgentUsageStatisticsUncheckedUpdateManyInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    usageLogs?: XOR<UsageLogListUpdateEnvelopeInput, UsageLogCreateInput> | UsageLogCreateInput[]
    satisfactionRate?: IntFieldUpdateOperationsInput | number
    satisfactionRateLogs?: XOR<SatisfactionRateLogListUpdateEnvelopeInput, SatisfactionRateLogCreateInput> | SatisfactionRateLogCreateInput[]
    customerReviews?: XOR<CustomerReviewListUpdateEnvelopeInput, CustomerReviewCreateInput> | CustomerReviewCreateInput[]
  }

  export type AgentRequestsHandledLogsCreateInput = {
    id?: string
    agentId: string
    agentName: string
    totalRequestsHandled?: number
    requestLogs?: XOR<RequestHandledLogListCreateEnvelopeInput, RequestHandledLogCreateInput> | RequestHandledLogCreateInput[]
  }

  export type AgentRequestsHandledLogsUncheckedCreateInput = {
    id?: string
    agentId: string
    agentName: string
    totalRequestsHandled?: number
    requestLogs?: XOR<RequestHandledLogListCreateEnvelopeInput, RequestHandledLogCreateInput> | RequestHandledLogCreateInput[]
  }

  export type AgentRequestsHandledLogsUpdateInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalRequestsHandled?: IntFieldUpdateOperationsInput | number
    requestLogs?: XOR<RequestHandledLogListUpdateEnvelopeInput, RequestHandledLogCreateInput> | RequestHandledLogCreateInput[]
  }

  export type AgentRequestsHandledLogsUncheckedUpdateInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalRequestsHandled?: IntFieldUpdateOperationsInput | number
    requestLogs?: XOR<RequestHandledLogListUpdateEnvelopeInput, RequestHandledLogCreateInput> | RequestHandledLogCreateInput[]
  }

  export type AgentRequestsHandledLogsCreateManyInput = {
    id?: string
    agentId: string
    agentName: string
    totalRequestsHandled?: number
    requestLogs?: XOR<RequestHandledLogListCreateEnvelopeInput, RequestHandledLogCreateInput> | RequestHandledLogCreateInput[]
  }

  export type AgentRequestsHandledLogsUpdateManyMutationInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalRequestsHandled?: IntFieldUpdateOperationsInput | number
    requestLogs?: XOR<RequestHandledLogListUpdateEnvelopeInput, RequestHandledLogCreateInput> | RequestHandledLogCreateInput[]
  }

  export type AgentRequestsHandledLogsUncheckedUpdateManyInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalRequestsHandled?: IntFieldUpdateOperationsInput | number
    requestLogs?: XOR<RequestHandledLogListUpdateEnvelopeInput, RequestHandledLogCreateInput> | RequestHandledLogCreateInput[]
  }

  export type CompanyAgentsRegisteredCreateInput = {
    id?: string
    username: string
    totalAgents?: number
    agents?: XOR<AgentRecordListCreateEnvelopeInput, AgentRecordCreateInput> | AgentRecordCreateInput[]
  }

  export type CompanyAgentsRegisteredUncheckedCreateInput = {
    id?: string
    username: string
    totalAgents?: number
    agents?: XOR<AgentRecordListCreateEnvelopeInput, AgentRecordCreateInput> | AgentRecordCreateInput[]
  }

  export type CompanyAgentsRegisteredUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    totalAgents?: IntFieldUpdateOperationsInput | number
    agents?: XOR<AgentRecordListUpdateEnvelopeInput, AgentRecordCreateInput> | AgentRecordCreateInput[]
  }

  export type CompanyAgentsRegisteredUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    totalAgents?: IntFieldUpdateOperationsInput | number
    agents?: XOR<AgentRecordListUpdateEnvelopeInput, AgentRecordCreateInput> | AgentRecordCreateInput[]
  }

  export type CompanyAgentsRegisteredCreateManyInput = {
    id?: string
    username: string
    totalAgents?: number
    agents?: XOR<AgentRecordListCreateEnvelopeInput, AgentRecordCreateInput> | AgentRecordCreateInput[]
  }

  export type CompanyAgentsRegisteredUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    totalAgents?: IntFieldUpdateOperationsInput | number
    agents?: XOR<AgentRecordListUpdateEnvelopeInput, AgentRecordCreateInput> | AgentRecordCreateInput[]
  }

  export type CompanyAgentsRegisteredUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    totalAgents?: IntFieldUpdateOperationsInput | number
    agents?: XOR<AgentRecordListUpdateEnvelopeInput, AgentRecordCreateInput> | AgentRecordCreateInput[]
  }

  export type UserOrdersCreateInput = {
    id?: string
    username: string
    orders?: XOR<OrderListCreateEnvelopeInput, OrderCreateInput> | OrderCreateInput[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOrdersUncheckedCreateInput = {
    id?: string
    username: string
    orders?: XOR<OrderListCreateEnvelopeInput, OrderCreateInput> | OrderCreateInput[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOrdersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    orders?: XOR<OrderListUpdateEnvelopeInput, OrderCreateInput> | OrderCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrdersUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    orders?: XOR<OrderListUpdateEnvelopeInput, OrderCreateInput> | OrderCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrdersCreateManyInput = {
    id?: string
    username: string
    orders?: XOR<OrderListCreateEnvelopeInput, OrderCreateInput> | OrderCreateInput[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOrdersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    orders?: XOR<OrderListUpdateEnvelopeInput, OrderCreateInput> | OrderCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrdersUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    orders?: XOR<OrderListUpdateEnvelopeInput, OrderCreateInput> | OrderCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferCreateInput = {
    id?: string
    offerId: string
    title: string
    description?: string | null
    offerCode?: string | null
    discountType: string
    discountValue: number
    maxDiscountAmount?: number | null
    offerType: string
    applicableTo?: OfferCreateapplicableToInput | string[]
    minPurchaseAmount?: number | null
    applicableProducts?: OfferCreateapplicableProductsInput | string[]
    usageLimit?: number | null
    usageLimitPerUser?: number | null
    globalUsedCount?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUncheckedCreateInput = {
    id?: string
    offerId: string
    title: string
    description?: string | null
    offerCode?: string | null
    discountType: string
    discountValue: number
    maxDiscountAmount?: number | null
    offerType: string
    applicableTo?: OfferCreateapplicableToInput | string[]
    minPurchaseAmount?: number | null
    applicableProducts?: OfferCreateapplicableProductsInput | string[]
    usageLimit?: number | null
    usageLimitPerUser?: number | null
    globalUsedCount?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUpdateInput = {
    offerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    offerCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    offerType?: StringFieldUpdateOperationsInput | string
    applicableTo?: OfferUpdateapplicableToInput | string[]
    minPurchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    applicableProducts?: OfferUpdateapplicableProductsInput | string[]
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageLimitPerUser?: NullableIntFieldUpdateOperationsInput | number | null
    globalUsedCount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateInput = {
    offerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    offerCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    offerType?: StringFieldUpdateOperationsInput | string
    applicableTo?: OfferUpdateapplicableToInput | string[]
    minPurchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    applicableProducts?: OfferUpdateapplicableProductsInput | string[]
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageLimitPerUser?: NullableIntFieldUpdateOperationsInput | number | null
    globalUsedCount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferCreateManyInput = {
    id?: string
    offerId: string
    title: string
    description?: string | null
    offerCode?: string | null
    discountType: string
    discountValue: number
    maxDiscountAmount?: number | null
    offerType: string
    applicableTo?: OfferCreateapplicableToInput | string[]
    minPurchaseAmount?: number | null
    applicableProducts?: OfferCreateapplicableProductsInput | string[]
    usageLimit?: number | null
    usageLimitPerUser?: number | null
    globalUsedCount?: number
    startDate: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUpdateManyMutationInput = {
    offerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    offerCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    offerType?: StringFieldUpdateOperationsInput | string
    applicableTo?: OfferUpdateapplicableToInput | string[]
    minPurchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    applicableProducts?: OfferUpdateapplicableProductsInput | string[]
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageLimitPerUser?: NullableIntFieldUpdateOperationsInput | number | null
    globalUsedCount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyInput = {
    offerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    offerCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    offerType?: StringFieldUpdateOperationsInput | string
    applicableTo?: OfferUpdateapplicableToInput | string[]
    minPurchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    applicableProducts?: OfferUpdateapplicableProductsInput | string[]
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    usageLimitPerUser?: NullableIntFieldUpdateOperationsInput | number | null
    globalUsedCount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUsageCreateInput = {
    id?: string
    username: string
    offersUsed?: XOR<OfferUsedListCreateEnvelopeInput, OfferUsedCreateInput> | OfferUsedCreateInput[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUsageUncheckedCreateInput = {
    id?: string
    username: string
    offersUsed?: XOR<OfferUsedListCreateEnvelopeInput, OfferUsedCreateInput> | OfferUsedCreateInput[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUsageUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    offersUsed?: XOR<OfferUsedListUpdateEnvelopeInput, OfferUsedCreateInput> | OfferUsedCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUsageUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    offersUsed?: XOR<OfferUsedListUpdateEnvelopeInput, OfferUsedCreateInput> | OfferUsedCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUsageCreateManyInput = {
    id?: string
    username: string
    offersUsed?: XOR<OfferUsedListCreateEnvelopeInput, OfferUsedCreateInput> | OfferUsedCreateInput[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUsageUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    offersUsed?: XOR<OfferUsedListUpdateEnvelopeInput, OfferUsedCreateInput> | OfferUsedCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUsageUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    offersUsed?: XOR<OfferUsedListUpdateEnvelopeInput, OfferUsedCreateInput> | OfferUsedCreateInput[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type baseDiscountSlabCreateInput = {
    id?: string
    levels?: XOR<DiscountLevelListCreateEnvelopeInput, DiscountLevelCreateInput> | DiscountLevelCreateInput[]
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type baseDiscountSlabUncheckedCreateInput = {
    id?: string
    levels?: XOR<DiscountLevelListCreateEnvelopeInput, DiscountLevelCreateInput> | DiscountLevelCreateInput[]
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type baseDiscountSlabUpdateInput = {
    levels?: XOR<DiscountLevelListUpdateEnvelopeInput, DiscountLevelCreateInput> | DiscountLevelCreateInput[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type baseDiscountSlabUncheckedUpdateInput = {
    levels?: XOR<DiscountLevelListUpdateEnvelopeInput, DiscountLevelCreateInput> | DiscountLevelCreateInput[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type baseDiscountSlabCreateManyInput = {
    id?: string
    levels?: XOR<DiscountLevelListCreateEnvelopeInput, DiscountLevelCreateInput> | DiscountLevelCreateInput[]
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type baseDiscountSlabUpdateManyMutationInput = {
    levels?: XOR<DiscountLevelListUpdateEnvelopeInput, DiscountLevelCreateInput> | DiscountLevelCreateInput[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type baseDiscountSlabUncheckedUpdateManyInput = {
    levels?: XOR<DiscountLevelListUpdateEnvelopeInput, DiscountLevelCreateInput> | DiscountLevelCreateInput[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ItemCompositeListFilter = {
    equals?: ItemObjectEqualityInput[]
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type ItemObjectEqualityInput = {
    itemName: string
    itemCode: string
    itemInitialWorkingExplanation: string
    itemRunningSteps?: string[]
    commonProblemsSolutions?: ProblemSolutionObjectEqualityInput[]
  }

  export type AgentModificationCompositeListFilter = {
    equals?: AgentModificationObjectEqualityInput[]
    every?: AgentModificationWhereInput
    some?: AgentModificationWhereInput
    none?: AgentModificationWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type AgentModificationObjectEqualityInput = {
    timestamp: Date | string
    items?: ItemObjectEqualityInput[]
    companyName: string
    establishmentDate: Date | string
    companyOwnerName: string
    companyHumanServiceNumber: string
    companyEmail: string
    companyDescription: string
  }

  export type ItemOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type AgentModificationOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerServiceAgentsCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    establishmentDate?: SortOrder
    companyOwnerName?: SortOrder
    companyHumanServiceNumber?: SortOrder
    companyEmail?: SortOrder
    companyDescription?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    availableTokens?: SortOrder
    lastModified?: SortOrder
  }

  export type CustomerServiceAgentsAvgOrderByAggregateInput = {
    availableTokens?: SortOrder
  }

  export type CustomerServiceAgentsMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    establishmentDate?: SortOrder
    companyOwnerName?: SortOrder
    companyHumanServiceNumber?: SortOrder
    companyEmail?: SortOrder
    companyDescription?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    availableTokens?: SortOrder
    lastModified?: SortOrder
  }

  export type CustomerServiceAgentsMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    establishmentDate?: SortOrder
    companyOwnerName?: SortOrder
    companyHumanServiceNumber?: SortOrder
    companyEmail?: SortOrder
    companyDescription?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    availableTokens?: SortOrder
    lastModified?: SortOrder
  }

  export type CustomerServiceAgentsSumOrderByAggregateInput = {
    availableTokens?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UsageLogCompositeListFilter = {
    equals?: UsageLogObjectEqualityInput[]
    every?: UsageLogWhereInput
    some?: UsageLogWhereInput
    none?: UsageLogWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type UsageLogObjectEqualityInput = {
    tokensUsed: number
    timestamp: Date | string
  }

  export type SatisfactionRateLogCompositeListFilter = {
    equals?: SatisfactionRateLogObjectEqualityInput[]
    every?: SatisfactionRateLogWhereInput
    some?: SatisfactionRateLogWhereInput
    none?: SatisfactionRateLogWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type SatisfactionRateLogObjectEqualityInput = {
    reviewStar: number
    timestamp: Date | string
  }

  export type CustomerReviewCompositeListFilter = {
    equals?: CustomerReviewObjectEqualityInput[]
    every?: CustomerReviewWhereInput
    some?: CustomerReviewWhereInput
    none?: CustomerReviewWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type CustomerReviewObjectEqualityInput = {
    username: string
    comment: string
    reviewStar: number
    timestamp: Date | string
  }

  export type UsageLogOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type SatisfactionRateLogOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerReviewOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type AgentUsageStatisticsCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    satisfactionRate?: SortOrder
  }

  export type AgentUsageStatisticsAvgOrderByAggregateInput = {
    satisfactionRate?: SortOrder
  }

  export type AgentUsageStatisticsMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    satisfactionRate?: SortOrder
  }

  export type AgentUsageStatisticsMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    satisfactionRate?: SortOrder
  }

  export type AgentUsageStatisticsSumOrderByAggregateInput = {
    satisfactionRate?: SortOrder
  }

  export type RequestHandledLogCompositeListFilter = {
    equals?: RequestHandledLogObjectEqualityInput[]
    every?: RequestHandledLogWhereInput
    some?: RequestHandledLogWhereInput
    none?: RequestHandledLogWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type RequestHandledLogObjectEqualityInput = {
    timestamp: Date | string
  }

  export type RequestHandledLogOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type AgentRequestsHandledLogsCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalRequestsHandled?: SortOrder
  }

  export type AgentRequestsHandledLogsAvgOrderByAggregateInput = {
    totalRequestsHandled?: SortOrder
  }

  export type AgentRequestsHandledLogsMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalRequestsHandled?: SortOrder
  }

  export type AgentRequestsHandledLogsMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalRequestsHandled?: SortOrder
  }

  export type AgentRequestsHandledLogsSumOrderByAggregateInput = {
    totalRequestsHandled?: SortOrder
  }

  export type AgentRecordCompositeListFilter = {
    equals?: AgentRecordObjectEqualityInput[]
    every?: AgentRecordWhereInput
    some?: AgentRecordWhereInput
    none?: AgentRecordWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type AgentRecordObjectEqualityInput = {
    agentId: string
    agentName: string
  }

  export type AgentRecordOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyAgentsRegisteredCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    totalAgents?: SortOrder
  }

  export type CompanyAgentsRegisteredAvgOrderByAggregateInput = {
    totalAgents?: SortOrder
  }

  export type CompanyAgentsRegisteredMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    totalAgents?: SortOrder
  }

  export type CompanyAgentsRegisteredMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    totalAgents?: SortOrder
  }

  export type CompanyAgentsRegisteredSumOrderByAggregateInput = {
    totalAgents?: SortOrder
  }

  export type OrderCompositeListFilter = {
    equals?: OrderObjectEqualityInput[]
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type OrderObjectEqualityInput = {
    orderId: string
    amount: number
    paymentInfo: InputJsonValue
    receipt: string
    fulfillment: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type OrderOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrdersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOrdersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOrdersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type OfferCountOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    offerCode?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    maxDiscountAmount?: SortOrder
    offerType?: SortOrder
    applicableTo?: SortOrder
    minPurchaseAmount?: SortOrder
    applicableProducts?: SortOrder
    usageLimit?: SortOrder
    usageLimitPerUser?: SortOrder
    globalUsedCount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferAvgOrderByAggregateInput = {
    discountValue?: SortOrder
    maxDiscountAmount?: SortOrder
    minPurchaseAmount?: SortOrder
    usageLimit?: SortOrder
    usageLimitPerUser?: SortOrder
    globalUsedCount?: SortOrder
  }

  export type OfferMaxOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    offerCode?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    maxDiscountAmount?: SortOrder
    offerType?: SortOrder
    minPurchaseAmount?: SortOrder
    usageLimit?: SortOrder
    usageLimitPerUser?: SortOrder
    globalUsedCount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferMinOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    offerCode?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    maxDiscountAmount?: SortOrder
    offerType?: SortOrder
    minPurchaseAmount?: SortOrder
    usageLimit?: SortOrder
    usageLimitPerUser?: SortOrder
    globalUsedCount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferSumOrderByAggregateInput = {
    discountValue?: SortOrder
    maxDiscountAmount?: SortOrder
    minPurchaseAmount?: SortOrder
    usageLimit?: SortOrder
    usageLimitPerUser?: SortOrder
    globalUsedCount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type OfferUsedCompositeListFilter = {
    equals?: OfferUsedObjectEqualityInput[]
    every?: OfferUsedWhereInput
    some?: OfferUsedWhereInput
    none?: OfferUsedWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type OfferUsedObjectEqualityInput = {
    offerId: string
    offerType: string
    usageLimit: number
    usedCount: number
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type OfferUsedOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type OfferUsageCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferUsageMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscountLevelCompositeListFilter = {
    equals?: DiscountLevelObjectEqualityInput[]
    every?: DiscountLevelWhereInput
    some?: DiscountLevelWhereInput
    none?: DiscountLevelWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type DiscountLevelObjectEqualityInput = {
    minOrderValue: number
    maxOrderValue?: number | null
    discountType: string
    discountValue: number
    createdAt: Date | string
  }

  export type DiscountLevelOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type baseDiscountSlabCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type baseDiscountSlabMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type baseDiscountSlabMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemListCreateEnvelopeInput = {
    set?: ItemCreateInput | ItemCreateInput[]
  }

  export type ItemCreateInput = {
    itemName: string
    itemCode: string
    itemInitialWorkingExplanation: string
    itemRunningSteps?: ItemCreateitemRunningStepsInput | string[]
    commonProblemsSolutions?: ProblemSolutionCreateInput | ProblemSolutionCreateInput[]
  }

  export type AgentModificationListCreateEnvelopeInput = {
    set?: AgentModificationCreateInput | AgentModificationCreateInput[]
  }

  export type AgentModificationCreateInput = {
    timestamp?: Date | string
    items?: ItemCreateInput | ItemCreateInput[]
    companyName: string
    establishmentDate: Date | string
    companyOwnerName: string
    companyHumanServiceNumber: string
    companyEmail: string
    companyDescription: string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ItemListUpdateEnvelopeInput = {
    set?: ItemCreateInput | ItemCreateInput[]
    push?: ItemCreateInput | ItemCreateInput[]
    updateMany?: ItemUpdateManyInput
    deleteMany?: ItemDeleteManyInput
  }

  export type AgentModificationListUpdateEnvelopeInput = {
    set?: AgentModificationCreateInput | AgentModificationCreateInput[]
    push?: AgentModificationCreateInput | AgentModificationCreateInput[]
    updateMany?: AgentModificationUpdateManyInput
    deleteMany?: AgentModificationDeleteManyInput
  }

  export type UsageLogListCreateEnvelopeInput = {
    set?: UsageLogCreateInput | UsageLogCreateInput[]
  }

  export type UsageLogCreateInput = {
    tokensUsed: number
    timestamp?: Date | string
  }

  export type SatisfactionRateLogListCreateEnvelopeInput = {
    set?: SatisfactionRateLogCreateInput | SatisfactionRateLogCreateInput[]
  }

  export type SatisfactionRateLogCreateInput = {
    reviewStar: number
    timestamp?: Date | string
  }

  export type CustomerReviewListCreateEnvelopeInput = {
    set?: CustomerReviewCreateInput | CustomerReviewCreateInput[]
  }

  export type CustomerReviewCreateInput = {
    username: string
    comment: string
    reviewStar: number
    timestamp?: Date | string
  }

  export type UsageLogListUpdateEnvelopeInput = {
    set?: UsageLogCreateInput | UsageLogCreateInput[]
    push?: UsageLogCreateInput | UsageLogCreateInput[]
    updateMany?: UsageLogUpdateManyInput
    deleteMany?: UsageLogDeleteManyInput
  }

  export type SatisfactionRateLogListUpdateEnvelopeInput = {
    set?: SatisfactionRateLogCreateInput | SatisfactionRateLogCreateInput[]
    push?: SatisfactionRateLogCreateInput | SatisfactionRateLogCreateInput[]
    updateMany?: SatisfactionRateLogUpdateManyInput
    deleteMany?: SatisfactionRateLogDeleteManyInput
  }

  export type CustomerReviewListUpdateEnvelopeInput = {
    set?: CustomerReviewCreateInput | CustomerReviewCreateInput[]
    push?: CustomerReviewCreateInput | CustomerReviewCreateInput[]
    updateMany?: CustomerReviewUpdateManyInput
    deleteMany?: CustomerReviewDeleteManyInput
  }

  export type RequestHandledLogListCreateEnvelopeInput = {
    set?: RequestHandledLogCreateInput | RequestHandledLogCreateInput[]
  }

  export type RequestHandledLogCreateInput = {
    timestamp?: Date | string
  }

  export type RequestHandledLogListUpdateEnvelopeInput = {
    set?: RequestHandledLogCreateInput | RequestHandledLogCreateInput[]
    push?: RequestHandledLogCreateInput | RequestHandledLogCreateInput[]
    updateMany?: RequestHandledLogUpdateManyInput
    deleteMany?: RequestHandledLogDeleteManyInput
  }

  export type AgentRecordListCreateEnvelopeInput = {
    set?: AgentRecordCreateInput | AgentRecordCreateInput[]
  }

  export type AgentRecordCreateInput = {
    agentId: string
    agentName: string
  }

  export type AgentRecordListUpdateEnvelopeInput = {
    set?: AgentRecordCreateInput | AgentRecordCreateInput[]
    push?: AgentRecordCreateInput | AgentRecordCreateInput[]
    updateMany?: AgentRecordUpdateManyInput
    deleteMany?: AgentRecordDeleteManyInput
  }

  export type OrderListCreateEnvelopeInput = {
    set?: OrderCreateInput | OrderCreateInput[]
  }

  export type OrderCreateInput = {
    orderId: string
    amount: number
    paymentInfo: InputJsonValue
    receipt: string
    fulfillment?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type OrderListUpdateEnvelopeInput = {
    set?: OrderCreateInput | OrderCreateInput[]
    push?: OrderCreateInput | OrderCreateInput[]
    updateMany?: OrderUpdateManyInput
    deleteMany?: OrderDeleteManyInput
  }

  export type OfferCreateapplicableToInput = {
    set: string[]
  }

  export type OfferCreateapplicableProductsInput = {
    set: string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type OfferUpdateapplicableToInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OfferUpdateapplicableProductsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type OfferUsedListCreateEnvelopeInput = {
    set?: OfferUsedCreateInput | OfferUsedCreateInput[]
  }

  export type OfferUsedCreateInput = {
    offerId: string
    offerType: string
    usageLimit: number
    usedCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUsedListUpdateEnvelopeInput = {
    set?: OfferUsedCreateInput | OfferUsedCreateInput[]
    push?: OfferUsedCreateInput | OfferUsedCreateInput[]
    updateMany?: OfferUsedUpdateManyInput
    deleteMany?: OfferUsedDeleteManyInput
  }

  export type DiscountLevelListCreateEnvelopeInput = {
    set?: DiscountLevelCreateInput | DiscountLevelCreateInput[]
  }

  export type DiscountLevelCreateInput = {
    minOrderValue: number
    maxOrderValue?: number | null
    discountType: string
    discountValue: number
    createdAt?: Date | string
  }

  export type DiscountLevelListUpdateEnvelopeInput = {
    set?: DiscountLevelCreateInput | DiscountLevelCreateInput[]
    push?: DiscountLevelCreateInput | DiscountLevelCreateInput[]
    updateMany?: DiscountLevelUpdateManyInput
    deleteMany?: DiscountLevelDeleteManyInput
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    itemName?: StringFilter<"Item"> | string
    itemCode?: StringFilter<"Item"> | string
    itemInitialWorkingExplanation?: StringFilter<"Item"> | string
    itemRunningSteps?: StringNullableListFilter<"Item">
    commonProblemsSolutions?: ProblemSolutionCompositeListFilter | ProblemSolutionObjectEqualityInput[]
  }

  export type ProblemSolutionObjectEqualityInput = {
    problem: string
    solution: string
  }

  export type AgentModificationWhereInput = {
    AND?: AgentModificationWhereInput | AgentModificationWhereInput[]
    OR?: AgentModificationWhereInput[]
    NOT?: AgentModificationWhereInput | AgentModificationWhereInput[]
    timestamp?: DateTimeFilter<"AgentModification"> | Date | string
    items?: ItemCompositeListFilter | ItemObjectEqualityInput[]
    companyName?: StringFilter<"AgentModification"> | string
    establishmentDate?: DateTimeFilter<"AgentModification"> | Date | string
    companyOwnerName?: StringFilter<"AgentModification"> | string
    companyHumanServiceNumber?: StringFilter<"AgentModification"> | string
    companyEmail?: StringFilter<"AgentModification"> | string
    companyDescription?: StringFilter<"AgentModification"> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UsageLogWhereInput = {
    AND?: UsageLogWhereInput | UsageLogWhereInput[]
    OR?: UsageLogWhereInput[]
    NOT?: UsageLogWhereInput | UsageLogWhereInput[]
    tokensUsed?: IntFilter<"UsageLog"> | number
    timestamp?: DateTimeFilter<"UsageLog"> | Date | string
  }

  export type SatisfactionRateLogWhereInput = {
    AND?: SatisfactionRateLogWhereInput | SatisfactionRateLogWhereInput[]
    OR?: SatisfactionRateLogWhereInput[]
    NOT?: SatisfactionRateLogWhereInput | SatisfactionRateLogWhereInput[]
    reviewStar?: IntFilter<"SatisfactionRateLog"> | number
    timestamp?: DateTimeFilter<"SatisfactionRateLog"> | Date | string
  }

  export type CustomerReviewWhereInput = {
    AND?: CustomerReviewWhereInput | CustomerReviewWhereInput[]
    OR?: CustomerReviewWhereInput[]
    NOT?: CustomerReviewWhereInput | CustomerReviewWhereInput[]
    username?: StringFilter<"CustomerReview"> | string
    comment?: StringFilter<"CustomerReview"> | string
    reviewStar?: IntFilter<"CustomerReview"> | number
    timestamp?: DateTimeFilter<"CustomerReview"> | Date | string
  }

  export type RequestHandledLogWhereInput = {
    AND?: RequestHandledLogWhereInput | RequestHandledLogWhereInput[]
    OR?: RequestHandledLogWhereInput[]
    NOT?: RequestHandledLogWhereInput | RequestHandledLogWhereInput[]
    timestamp?: DateTimeFilter<"RequestHandledLog"> | Date | string
  }

  export type AgentRecordWhereInput = {
    AND?: AgentRecordWhereInput | AgentRecordWhereInput[]
    OR?: AgentRecordWhereInput[]
    NOT?: AgentRecordWhereInput | AgentRecordWhereInput[]
    agentId?: StringFilter<"AgentRecord"> | string
    agentName?: StringFilter<"AgentRecord"> | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    orderId?: StringFilter<"Order"> | string
    amount?: FloatFilter<"Order"> | number
    paymentInfo?: JsonFilter<"Order">
    receipt?: StringFilter<"Order"> | string
    fulfillment?: BoolFilter<"Order"> | boolean
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type OfferUsedWhereInput = {
    AND?: OfferUsedWhereInput | OfferUsedWhereInput[]
    OR?: OfferUsedWhereInput[]
    NOT?: OfferUsedWhereInput | OfferUsedWhereInput[]
    offerId?: StringFilter<"OfferUsed"> | string
    offerType?: StringFilter<"OfferUsed"> | string
    usageLimit?: IntFilter<"OfferUsed"> | number
    usedCount?: IntFilter<"OfferUsed"> | number
    createdAt?: DateTimeFilter<"OfferUsed"> | Date | string
    updatedAt?: DateTimeFilter<"OfferUsed"> | Date | string
  }

  export type DiscountLevelWhereInput = {
    AND?: DiscountLevelWhereInput | DiscountLevelWhereInput[]
    OR?: DiscountLevelWhereInput[]
    NOT?: DiscountLevelWhereInput | DiscountLevelWhereInput[]
    minOrderValue?: FloatFilter<"DiscountLevel"> | number
    maxOrderValue?: FloatNullableFilter<"DiscountLevel"> | number | null
    discountType?: StringFilter<"DiscountLevel"> | string
    discountValue?: FloatFilter<"DiscountLevel"> | number
    createdAt?: DateTimeFilter<"DiscountLevel"> | Date | string
  }

  export type ItemCreateitemRunningStepsInput = {
    set: string[]
  }

  export type ProblemSolutionCreateInput = {
    problem: string
    solution: string
  }

  export type ItemUpdateManyInput = {
    where: ItemWhereInput
    data: ItemUpdateInput
  }

  export type ItemDeleteManyInput = {
    where: ItemWhereInput
  }

  export type AgentModificationUpdateManyInput = {
    where: AgentModificationWhereInput
    data: AgentModificationUpdateInput
  }

  export type AgentModificationDeleteManyInput = {
    where: AgentModificationWhereInput
  }

  export type UsageLogUpdateManyInput = {
    where: UsageLogWhereInput
    data: UsageLogUpdateInput
  }

  export type UsageLogDeleteManyInput = {
    where: UsageLogWhereInput
  }

  export type SatisfactionRateLogUpdateManyInput = {
    where: SatisfactionRateLogWhereInput
    data: SatisfactionRateLogUpdateInput
  }

  export type SatisfactionRateLogDeleteManyInput = {
    where: SatisfactionRateLogWhereInput
  }

  export type CustomerReviewUpdateManyInput = {
    where: CustomerReviewWhereInput
    data: CustomerReviewUpdateInput
  }

  export type CustomerReviewDeleteManyInput = {
    where: CustomerReviewWhereInput
  }

  export type RequestHandledLogUpdateManyInput = {
    where: RequestHandledLogWhereInput
    data: RequestHandledLogUpdateInput
  }

  export type RequestHandledLogDeleteManyInput = {
    where: RequestHandledLogWhereInput
  }

  export type AgentRecordUpdateManyInput = {
    where: AgentRecordWhereInput
    data: AgentRecordUpdateInput
  }

  export type AgentRecordDeleteManyInput = {
    where: AgentRecordWhereInput
  }

  export type OrderUpdateManyInput = {
    where: OrderWhereInput
    data: OrderUpdateInput
  }

  export type OrderDeleteManyInput = {
    where: OrderWhereInput
  }

  export type OfferUsedUpdateManyInput = {
    where: OfferUsedWhereInput
    data: OfferUsedUpdateInput
  }

  export type OfferUsedDeleteManyInput = {
    where: OfferUsedWhereInput
  }

  export type DiscountLevelUpdateManyInput = {
    where: DiscountLevelWhereInput
    data: DiscountLevelUpdateInput
  }

  export type DiscountLevelDeleteManyInput = {
    where: DiscountLevelWhereInput
  }

  export type ProblemSolutionCompositeListFilter = {
    equals?: ProblemSolutionObjectEqualityInput[]
    every?: ProblemSolutionWhereInput
    some?: ProblemSolutionWhereInput
    none?: ProblemSolutionWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ItemUpdateInput = {
    itemName?: StringFieldUpdateOperationsInput | string
    itemCode?: StringFieldUpdateOperationsInput | string
    itemInitialWorkingExplanation?: StringFieldUpdateOperationsInput | string
    itemRunningSteps?: ItemUpdateitemRunningStepsInput | string[]
    commonProblemsSolutions?: XOR<ProblemSolutionListUpdateEnvelopeInput, ProblemSolutionCreateInput> | ProblemSolutionCreateInput[]
  }

  export type AgentModificationUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: XOR<ItemListUpdateEnvelopeInput, ItemCreateInput> | ItemCreateInput[]
    companyName?: StringFieldUpdateOperationsInput | string
    establishmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyOwnerName?: StringFieldUpdateOperationsInput | string
    companyHumanServiceNumber?: StringFieldUpdateOperationsInput | string
    companyEmail?: StringFieldUpdateOperationsInput | string
    companyDescription?: StringFieldUpdateOperationsInput | string
  }

  export type UsageLogUpdateInput = {
    tokensUsed?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatisfactionRateLogUpdateInput = {
    reviewStar?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerReviewUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    reviewStar?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHandledLogUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRecordUpdateInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUpdateInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentInfo?: InputJsonValue | InputJsonValue
    receipt?: StringFieldUpdateOperationsInput | string
    fulfillment?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUsedUpdateInput = {
    offerId?: StringFieldUpdateOperationsInput | string
    offerType?: StringFieldUpdateOperationsInput | string
    usageLimit?: IntFieldUpdateOperationsInput | number
    usedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscountLevelUpdateInput = {
    minOrderValue?: FloatFieldUpdateOperationsInput | number
    maxOrderValue?: NullableFloatFieldUpdateOperationsInput | number | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSolutionWhereInput = {
    AND?: ProblemSolutionWhereInput | ProblemSolutionWhereInput[]
    OR?: ProblemSolutionWhereInput[]
    NOT?: ProblemSolutionWhereInput | ProblemSolutionWhereInput[]
    problem?: StringFilter<"ProblemSolution"> | string
    solution?: StringFilter<"ProblemSolution"> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ItemUpdateitemRunningStepsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProblemSolutionListUpdateEnvelopeInput = {
    set?: ProblemSolutionCreateInput | ProblemSolutionCreateInput[]
    push?: ProblemSolutionCreateInput | ProblemSolutionCreateInput[]
    updateMany?: ProblemSolutionUpdateManyInput
    deleteMany?: ProblemSolutionDeleteManyInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProblemSolutionUpdateManyInput = {
    where: ProblemSolutionWhereInput
    data: ProblemSolutionUpdateInput
  }

  export type ProblemSolutionDeleteManyInput = {
    where: ProblemSolutionWhereInput
  }

  export type ProblemSolutionUpdateInput = {
    problem?: StringFieldUpdateOperationsInput | string
    solution?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}