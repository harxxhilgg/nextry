"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Location = {
  id: string;
  name: string;
  location: string;
  createdBy: string;
  createdAt: Date;
};

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "createdAt",
    header: "Date Added",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      return (
        <span>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      );
    },
  },
];
