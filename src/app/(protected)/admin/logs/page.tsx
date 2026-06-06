import { redirect } from "next/navigation";

export default async function LogsPage() {
  redirect("/admin/logs/access");
};
