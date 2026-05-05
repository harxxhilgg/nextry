import RedisTest from "@/components/redis-test/RedisTest";
import { RedisTestFooter } from "@/components/redis-test/RedisTestFooter";

export default async function RedisTestPage() {
  return (
    <div className="flex flex-col justify-between gap-20">
      <RedisTest />

      <RedisTestFooter />
    </div>
  );
}
