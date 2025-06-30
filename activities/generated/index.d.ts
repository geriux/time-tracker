import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface ActivityLog_Key {
  id: string;
  __typename?: 'ActivityLog_Key';
}

export interface Activity_Key {
  id: UUIDString;
  __typename?: 'Activity_Key';
}

export interface AddActivityLogData {
  activityLog_insert: ActivityLog_Key;
}

export interface AddActivityLogVariables {
  activityId: UUIDString;
  duration: number;
  startTime: TimestampString;
  endTime: TimestampString;
}

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

export interface GetActivityLogsVariables {
  start?: TimestampString | null;
  end?: TimestampString | null;
}

export interface ListActivitiesData {
  activities: ({
    id: UUIDString;
    name: string;
    slug: string;
    icon: string;
    color: string;
  } & Activity_Key)[];
}

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

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface AddActivityLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddActivityLogVariables): MutationRef<AddActivityLogData, AddActivityLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddActivityLogVariables): MutationRef<AddActivityLogData, AddActivityLogVariables>;
  operationName: string;
}
export const addActivityLogRef: AddActivityLogRef;

export function addActivityLog(vars: AddActivityLogVariables): MutationPromise<AddActivityLogData, AddActivityLogVariables>;
export function addActivityLog(dc: DataConnect, vars: AddActivityLogVariables): MutationPromise<AddActivityLogData, AddActivityLogVariables>;

interface ListActivitiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActivitiesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListActivitiesData, undefined>;
  operationName: string;
}
export const listActivitiesRef: ListActivitiesRef;

export function listActivities(): QueryPromise<ListActivitiesData, undefined>;
export function listActivities(dc: DataConnect): QueryPromise<ListActivitiesData, undefined>;

interface ListUserActivityLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserActivityLogsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserActivityLogsData, undefined>;
  operationName: string;
}
export const listUserActivityLogsRef: ListUserActivityLogsRef;

export function listUserActivityLogs(): QueryPromise<ListUserActivityLogsData, undefined>;
export function listUserActivityLogs(dc: DataConnect): QueryPromise<ListUserActivityLogsData, undefined>;

interface GetActivityLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetActivityLogsVariables): QueryRef<GetActivityLogsData, GetActivityLogsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetActivityLogsVariables): QueryRef<GetActivityLogsData, GetActivityLogsVariables>;
  operationName: string;
}
export const getActivityLogsRef: GetActivityLogsRef;

export function getActivityLogs(vars?: GetActivityLogsVariables): QueryPromise<GetActivityLogsData, GetActivityLogsVariables>;
export function getActivityLogs(dc: DataConnect, vars?: GetActivityLogsVariables): QueryPromise<GetActivityLogsData, GetActivityLogsVariables>;

