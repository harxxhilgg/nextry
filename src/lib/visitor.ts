export function getVisitorId() {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem("visitorId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitorId", id);
  }

  // console.log(`getVisitorId / ${id}`);

  return id;
}
