"use client";

import { Button } from "@/components/ui/button";
import { decrement, increment, reset } from "@/lib/store/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Minus, Plus, RotateCw } from "lucide-react";
import Link from "next/link";

export default function TesthreePage() {
  const count = useAppSelector((state) => state.counter.value);
  const lastOperation = useAppSelector((state) => state.counter.lastOperation);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-6 pb-60">
      <h1 className="text-2xl tracking-tight font-medium">Testhree</h1>

      <Link href="/test/testwo" replace>
        <Button size="lg" variant="outline" className="cursor-pointer rounded-2xl w-40 h-10">
          Replace to /testwo
        </Button>
      </Link>

      <div className="flex flex-col items-center gap-8">
        <p className="text-6xl">{count}</p>

        <div className="flex gap-10">
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer rounded-2xl w-20 h-10"
            onClick={() => dispatch(decrement())}
          >
            <Minus />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer rounded-2xl w-20 h-10"
            onClick={() => dispatch(reset())}
          >
            <RotateCw />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer rounded-2xl w-20 h-10"
            onClick={() => dispatch(increment())}
          >
            <Plus />
          </Button>
        </div>

        {lastOperation && <p className="text-muted-foreground text-sm">Recent Operation: {lastOperation}</p>}
      </div>
    </div>
  );
}
