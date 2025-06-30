const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'time-tracker',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const addActivityLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddActivityLog', inputVars);
}
addActivityLogRef.operationName = 'AddActivityLog';
exports.addActivityLogRef = addActivityLogRef;

exports.addActivityLog = function addActivityLog(dcOrVars, vars) {
  return executeMutation(addActivityLogRef(dcOrVars, vars));
};

const listActivitiesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActivities');
}
listActivitiesRef.operationName = 'ListActivities';
exports.listActivitiesRef = listActivitiesRef;

exports.listActivities = function listActivities(dc) {
  return executeQuery(listActivitiesRef(dc));
};

const listUserActivityLogsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserActivityLogs');
}
listUserActivityLogsRef.operationName = 'ListUserActivityLogs';
exports.listUserActivityLogsRef = listUserActivityLogsRef;

exports.listUserActivityLogs = function listUserActivityLogs(dc) {
  return executeQuery(listUserActivityLogsRef(dc));
};

const getActivityLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActivityLogs', inputVars);
}
getActivityLogsRef.operationName = 'GetActivityLogs';
exports.getActivityLogsRef = getActivityLogsRef;

exports.getActivityLogs = function getActivityLogs(dcOrVars, vars) {
  return executeQuery(getActivityLogsRef(dcOrVars, vars));
};
