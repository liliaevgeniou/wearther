export function getDate() {
  const today = new Date();
  return [today.getFullYear(), today.getMonth(), today.getDate()].join("-");
}