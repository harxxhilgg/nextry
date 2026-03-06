export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/components/test-new/markdown/${slug}.mdx`);

  return <Post />;
};

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }]
};

export const dynamicParams = false;