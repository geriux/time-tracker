# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListActivities*](#listactivities)
  - [*ListUserActivityLogs*](#listuseractivitylogs)
  - [*GetActivityLogs*](#getactivitylogs)
- [**Mutations**](#mutations)
  - [*AddActivityLog*](#addactivitylog)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@time-tracker/activities` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@time-tracker/activities';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@time-tracker/activities';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListActivities
You can execute the `ListActivities` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
listActivities(): QueryPromise<ListActivitiesData, undefined>;

interface ListActivitiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActivitiesData, undefined>;
}
export const listActivitiesRef: ListActivitiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listActivities(dc: DataConnect): QueryPromise<ListActivitiesData, undefined>;

interface ListActivitiesRef {
  ...
  (dc: DataConnect): QueryRef<ListActivitiesData, undefined>;
}
export const listActivitiesRef: ListActivitiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listActivitiesRef:
```typescript
const name = listActivitiesRef.operationName;
console.log(name);
```

### Variables
The `ListActivities` query has no variables.
### Return Type
Recall that executing the `ListActivities` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListActivitiesData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListActivitiesData {
  activities: ({
    id: UUIDString;
    name: string;
    slug: string;
    icon: string;
    color: string;
  } & Activity_Key)[];
}
```
### Using `ListActivities`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listActivities } from '@time-tracker/activities';


// Call the `listActivities()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listActivities();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listActivities(dataConnect);

console.log(data.activities);

// Or, you can use the `Promise` API.
listActivities().then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

### Using `ListActivities`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listActivitiesRef } from '@time-tracker/activities';


// Call the `listActivitiesRef()` function to get a reference to the query.
const ref = listActivitiesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listActivitiesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

## ListUserActivityLogs
You can execute the `ListUserActivityLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
listUserActivityLogs(): QueryPromise<ListUserActivityLogsData, undefined>;

interface ListUserActivityLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserActivityLogsData, undefined>;
}
export const listUserActivityLogsRef: ListUserActivityLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserActivityLogs(dc: DataConnect): QueryPromise<ListUserActivityLogsData, undefined>;

interface ListUserActivityLogsRef {
  ...
  (dc: DataConnect): QueryRef<ListUserActivityLogsData, undefined>;
}
export const listUserActivityLogsRef: ListUserActivityLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserActivityLogsRef:
```typescript
const name = listUserActivityLogsRef.operationName;
console.log(name);
```

### Variables
The `ListUserActivityLogs` query has no variables.
### Return Type
Recall that executing the `ListUserActivityLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserActivityLogsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserActivityLogsData {
  user?: {
    id: string;
    logs: ({
      activity: {
        id: UUIDString;
      } & Activity_Key;
        startTime: TimestampString;
        endTime: TimestampString;
        duration: number;
    })[];
  } & User_Key;
}
```
### Using `ListUserActivityLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserActivityLogs } from '@time-tracker/activities';


// Call the `listUserActivityLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserActivityLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserActivityLogs(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
listUserActivityLogs().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `ListUserActivityLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserActivityLogsRef } from '@time-tracker/activities';


// Call the `listUserActivityLogsRef()` function to get a reference to the query.
const ref = listUserActivityLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserActivityLogsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetActivityLogs
You can execute the `GetActivityLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getActivityLogs(vars?: GetActivityLogsVariables): QueryPromise<GetActivityLogsData, GetActivityLogsVariables>;

interface GetActivityLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetActivityLogsVariables): QueryRef<GetActivityLogsData, GetActivityLogsVariables>;
}
export const getActivityLogsRef: GetActivityLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getActivityLogs(dc: DataConnect, vars?: GetActivityLogsVariables): QueryPromise<GetActivityLogsData, GetActivityLogsVariables>;

interface GetActivityLogsRef {
  ...
  (dc: DataConnect, vars?: GetActivityLogsVariables): QueryRef<GetActivityLogsData, GetActivityLogsVariables>;
}
export const getActivityLogsRef: GetActivityLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getActivityLogsRef:
```typescript
const name = getActivityLogsRef.operationName;
console.log(name);
```

### Variables
The `GetActivityLogs` query has an optional argument of type `GetActivityLogsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetActivityLogsVariables {
  start?: TimestampString | null;
  end?: TimestampString | null;
}
```
### Return Type
Recall that executing the `GetActivityLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetActivityLogsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetActivityLogsData {
  user?: {
    id: string;
    logs: ({
      startTime: TimestampString;
      endTime: TimestampString;
      duration: number;
      activity: {
        id: UUIDString;
        name: string;
        slug: string;
        icon: string;
        color: string;
      } & Activity_Key;
    })[];
  } & User_Key;
}
```
### Using `GetActivityLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getActivityLogs, GetActivityLogsVariables } from '@time-tracker/activities';

// The `GetActivityLogs` query has an optional argument of type `GetActivityLogsVariables`:
const getActivityLogsVars: GetActivityLogsVariables = {
  start: ..., // optional
  end: ..., // optional
};

// Call the `getActivityLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getActivityLogs(getActivityLogsVars);
// Variables can be defined inline as well.
const { data } = await getActivityLogs({ start: ..., end: ..., });
// Since all variables are optional for this query, you can omit the `GetActivityLogsVariables` argument.
const { data } = await getActivityLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getActivityLogs(dataConnect, getActivityLogsVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getActivityLogs(getActivityLogsVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetActivityLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getActivityLogsRef, GetActivityLogsVariables } from '@time-tracker/activities';

// The `GetActivityLogs` query has an optional argument of type `GetActivityLogsVariables`:
const getActivityLogsVars: GetActivityLogsVariables = {
  start: ..., // optional
  end: ..., // optional
};

// Call the `getActivityLogsRef()` function to get a reference to the query.
const ref = getActivityLogsRef(getActivityLogsVars);
// Variables can be defined inline as well.
const ref = getActivityLogsRef({ start: ..., end: ..., });
// Since all variables are optional for this query, you can omit the `GetActivityLogsVariables` argument.
const ref = getActivityLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getActivityLogsRef(dataConnect, getActivityLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddActivityLog
You can execute the `AddActivityLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
addActivityLog(vars: AddActivityLogVariables): MutationPromise<AddActivityLogData, AddActivityLogVariables>;

interface AddActivityLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddActivityLogVariables): MutationRef<AddActivityLogData, AddActivityLogVariables>;
}
export const addActivityLogRef: AddActivityLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addActivityLog(dc: DataConnect, vars: AddActivityLogVariables): MutationPromise<AddActivityLogData, AddActivityLogVariables>;

interface AddActivityLogRef {
  ...
  (dc: DataConnect, vars: AddActivityLogVariables): MutationRef<AddActivityLogData, AddActivityLogVariables>;
}
export const addActivityLogRef: AddActivityLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addActivityLogRef:
```typescript
const name = addActivityLogRef.operationName;
console.log(name);
```

### Variables
The `AddActivityLog` mutation requires an argument of type `AddActivityLogVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddActivityLogVariables {
  activityId: UUIDString;
  duration: number;
  startTime: TimestampString;
  endTime: TimestampString;
}
```
### Return Type
Recall that executing the `AddActivityLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddActivityLogData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddActivityLogData {
  activityLog_insert: ActivityLog_Key;
}
```
### Using `AddActivityLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addActivityLog, AddActivityLogVariables } from '@time-tracker/activities';

// The `AddActivityLog` mutation requires an argument of type `AddActivityLogVariables`:
const addActivityLogVars: AddActivityLogVariables = {
  activityId: ..., 
  duration: ..., 
  startTime: ..., 
  endTime: ..., 
};

// Call the `addActivityLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addActivityLog(addActivityLogVars);
// Variables can be defined inline as well.
const { data } = await addActivityLog({ activityId: ..., duration: ..., startTime: ..., endTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addActivityLog(dataConnect, addActivityLogVars);

console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
addActivityLog(addActivityLogVars).then((response) => {
  const data = response.data;
  console.log(data.activityLog_insert);
});
```

### Using `AddActivityLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addActivityLogRef, AddActivityLogVariables } from '@time-tracker/activities';

// The `AddActivityLog` mutation requires an argument of type `AddActivityLogVariables`:
const addActivityLogVars: AddActivityLogVariables = {
  activityId: ..., 
  duration: ..., 
  startTime: ..., 
  endTime: ..., 
};

// Call the `addActivityLogRef()` function to get a reference to the mutation.
const ref = addActivityLogRef(addActivityLogVars);
// Variables can be defined inline as well.
const ref = addActivityLogRef({ activityId: ..., duration: ..., startTime: ..., endTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addActivityLogRef(dataConnect, addActivityLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activityLog_insert);
});
```

