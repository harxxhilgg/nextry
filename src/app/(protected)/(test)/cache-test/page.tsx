// export const dynamic = "force-dynamic";

import CurrDateTime from "@/components/cache-test/CurrDateTime";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { cacheLife, cacheTag, revalidatePath, revalidateTag } from "next/cache";


// const getTime = async () => {
//   const res = await fetch(
//     "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata",
//     {
//       // cache: "no-store", // Don't store
//       next: {
//         revalidate: 10, // Cache will be validated for 10 sec then on next refresh it will be changed
//       }
//     }
//   );

//   return res.json();
// };

async function createPost() {
  "use server";

  await prisma.cacheTest.create({
    data: {
      title: `Post ${Math.floor(Math.random() * 1000)}`,
      views: Math.floor(Math.random() * 100),
    }
  });

  revalidatePath("/cache-test"); // run-time data refresh (cache clearing)
  revalidateTag("user-posts", "max"); // Tagged cache
};

async function getPosts() {
  "use cache";

  cacheTag("user-posts"); // Adding specific tag to the cache

  // console.log("QUERYING DATABASE");

  return prisma.cacheTest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default async function CacheTestPage() {
  "use cache"; // FUNCTIONAL COMPONENT CACHE

  cacheLife("hours");

  // const data = await getTime();
  const posts = await getPosts(); // Trigger at run-time

  return (
    <div className="flex flex-col justify-between gap-6">
      <h1 className="text-xl font-semibold">Cache Test</h1>

      {/* <p className="tracking-wide">
        {data.dateTime}
      </p> */}

      <form action={createPost}>
        <Button variant="outline" className="cursor-pointer rounded-xl">
          Add Random Post
        </Button>
      </form>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="border-b rounded p-4">
            <h2>{post.title}</h2>

            <p>{post.views}</p>
          </div>
        ))}
      </div>

      <p>Page generated at: <CurrDateTime /></p>
    </div>
  );
}
