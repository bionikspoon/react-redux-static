// declare module "react-router" {
//   export function createMemoryHistory(options?): HistoryModule.History;
// }

declare module 'fbjs/lib/ExecutionEnvironment' {
  export let canUseDOM: boolean;
}
