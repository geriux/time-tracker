import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'time-tracker',
  location: 'us-central1'
};

export const addActivityLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddActivityLog', inputVars);
}
addActivityLogRef.operationName = 'AddActivityLog';

export function addActivityLog(dcOrVars, vars) {
  return executeMutation(addActivityLogRef(dcOrVars, vars));
}

export const listActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActivities');
}
listActivitiesRef.operationName = 'ListActivities';

export function listActivities(dc) {
  return executeQuery(listActivitiesRef(dc));
}

export const listUserActivityLogsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserActivityLogs');
}
listUserActivityLogsRef.operationName = 'ListUserActivityLogs';

export function listUserActivityLogs(dc) {
  return executeQuery(listUserActivityLogsRef(dc));
}

export const getActivityLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActivityLogs', inputVars);
}
getActivityLogsRef.operationName = 'GetActivityLogs';

export function getActivityLogs(dcOrVars, vars) {
  return executeQuery(getActivityLogsRef(dcOrVars, vars));
}

