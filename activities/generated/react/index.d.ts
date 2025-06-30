import { AddActivityLogData, AddActivityLogVariables, ListActivitiesData, ListUserActivityLogsData, GetActivityLogsData, GetActivityLogsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddActivityLog(options?: useDataConnectMutationOptions<AddActivityLogData, FirebaseError, AddActivityLogVariables>): UseDataConnectMutationResult<AddActivityLogData, AddActivityLogVariables>;
export function useAddActivityLog(dc: DataConnect, options?: useDataConnectMutationOptions<AddActivityLogData, FirebaseError, AddActivityLogVariables>): UseDataConnectMutationResult<AddActivityLogData, AddActivityLogVariables>;

export function useListActivities(options?: useDataConnectQueryOptions<ListActivitiesData>): UseDataConnectQueryResult<ListActivitiesData, undefined>;
export function useListActivities(dc: DataConnect, options?: useDataConnectQueryOptions<ListActivitiesData>): UseDataConnectQueryResult<ListActivitiesData, undefined>;

export function useListUserActivityLogs(options?: useDataConnectQueryOptions<ListUserActivityLogsData>): UseDataConnectQueryResult<ListUserActivityLogsData, undefined>;
export function useListUserActivityLogs(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserActivityLogsData>): UseDataConnectQueryResult<ListUserActivityLogsData, undefined>;

export function useGetActivityLogs(vars?: GetActivityLogsVariables, options?: useDataConnectQueryOptions<GetActivityLogsData>): UseDataConnectQueryResult<GetActivityLogsData, GetActivityLogsVariables>;
export function useGetActivityLogs(dc: DataConnect, vars?: GetActivityLogsVariables, options?: useDataConnectQueryOptions<GetActivityLogsData>): UseDataConnectQueryResult<GetActivityLogsData, GetActivityLogsVariables>;
