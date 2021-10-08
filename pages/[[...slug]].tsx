import { GetStaticPathsContext, GetStaticPropsContext } from 'next';

import { StoryData } from 'storyblok-js-client';
import DynamicComponent from '../cmsIntegration/DynamicComponent/DynamicComponent';
import Layout from '../components/Layout/Layout';
import PageHead from '../components/PageHead/PageHead';

import { useStoryblok } from '../cmsIntegration/storyblok';

import { loadPaths } from '../cmsIntegration/pageLoaders/loadPaths';
import { loadStories, loadLinks } from '../cmsIntegration/pageLoaders/loadStories';

type PageProps = {
  routes: [],
  story: StoryData,
  folderStories: StoryblokComponent[],
  preview?: boolean,
  locale: string,
  locales: string[],
};

export default function Page({
  routes,
  story,
  folderStories,
  preview,
  locale,
  locales,
}: PageProps) {
  story = useStoryblok(story, !!preview, locale);

  return (
    <>
      <PageHead seoData={story.content} locale={locale} locales={locales} />

      <Layout routes={routes} locale={locale} locales={locales}>
        <DynamicComponent story={story.content} folderIndex={folderStories} />
      </Layout>
    </>
  );
}

export async function getStaticProps({
  locale,
  locales = [],
  params,
  preview = false,
}: GetStaticPropsContext<{ slug: string[] }>) {
  const stories = await loadStories({
    locale,
    locales,
    params,
    preview,
  });

  const routes = await loadLinks();

  return {
    props: {
      ...stories,
      routes,
      preview,
      locale,
      locales,
    },
  };
}

export async function getStaticPaths({ locales = [] }: GetStaticPathsContext) {
  const paths = await loadPaths(locales);

  return {
    paths,
    fallback: false,
  };
}
