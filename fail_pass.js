export function handle_failed_passed_projects(data){
  let data_xps = new Map(data.xps.map(item => [item.path.split("/").pop(), item.amount]))
console.log("xp data: ", data_xps)
}