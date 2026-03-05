import { getLocations } from "@/app/actions";
import { columns } from "@/components/main/columnts";
import { DataTable } from "@/components/main/data-table";
import { MainForm } from "@/components/main/form";
import { Suspense } from "react";
import Loading from "./loading";
import { FormSkeleton } from "@/components/main/skeletons";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Suspense fallback={<FormSkeleton />}>
        <Form />
      </Suspense>

      <div className="w-full px-6 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Saved Locations</h2>

        <Suspense fallback={<Loading />}>
          <Table />
        </Suspense>
      </div>
    </div>
  );
}

async function Table() {
  const locations = await getLocations();

  return <DataTable columns={columns} data={locations} />;
}

async function Form() {
  return <MainForm />;
};