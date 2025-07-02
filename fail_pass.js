export function handle_failed_passed_projects(xps){
const simplified_Xps = xps.map(item => ({
  name: item.path.split('/').pop(),
  amount: item.amount == 0 ? 0 : Math.round((item.amount / 1000) * 100) / 100,
  created_at: item.event.createdAt
}));
console.log(simplified_Xps);
}