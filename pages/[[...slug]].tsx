import { GetStaticPathsContext, GetStaticPropsContext } from 'next';

import DynamicComponent from '../cmsIntegration/DynamicComponent/DynamicComponent';
import Layout from '../components/Layout/Layout';
import PageHead from '../components/PageHead/PageHead';

import Storyblok, { useStoryblok } from '../cmsIntegration/storyblok';
import { StoryData } from 'storyblok-js-client';

type PageProps = {
  routes: [],
  story: StoryData,
  folderStories: StoryblokComponent[],
  preview?: boolean,
  locale: string,
  locales: string[],
}

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
  const slug = params?.slug ? params.slug.join('/') : 'home';

  const sbParams = {
    version: 'published',
    language: locale,
    starts_with: slug,
    cv: 0,
  };

  if (preview) {
    sbParams.version = 'draft';
    sbParams.cv = Date.now();
  }

  const { data } = await Storyblok.get('cdn/stories', sbParams);
  const { data: { links } } = await Storyblok.get('cdn/links/');

  return {
    props: {
      ...getActualStory(data),
      routes: adaptLinks(links) || [],
      preview,
      locale,
      locales,
    },
  };
}

export async function getStaticPaths({ locales = [] }: GetStaticPathsContext) {
  const { data } = await Storyblok.get('cdn/links/');

  const paths:Array<string | { params: {slug: string}; locale?: string }> = [];

  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    // get array for slug because of catch all
    const { slug } = data.links[linkKey];
    let splittedSlug = slug.split('/');
    if (slug === 'home') splittedSlug = false;

    // create additional languages
    for (const locale of locales) {
      paths.push({ params: { slug: splittedSlug }, locale });
    }
  });

  return {
    paths,
    fallback: false,
  };
}

type ActualStoryData = {
  stories: StoryData[],
}

function getActualStory(data: ActualStoryData) {
  if (!data) {
    return {
      story: false,
      folderStories: [],
    };
  }

  if (data.stories.length <= 1) {
    return {
      story: data.stories[0],
      folderStories: [],
    };
  }

  return {
    story: data.stories.find((story) => story.is_startpage),
    folderStories: data.stories.filter((story) => !story.is_startpage),
  };
}


type Link = {
  slug: string,
  id: string,
  is_folder: boolean,
  uuid: string,
  name: string,
  real_path: string,
  parent_id: string,
}

type Links = {
  [key: number]: Link,
};

type Route = {
  id: string,
  uuid: string,
  isFolder: boolean,
  name: string,
  path: string,
  slug: string,
  routes: Route[],
}

function adaptLinks(links: Links) {
  const routes: Route[] = [];

  Object.values(links)
    .filter((link) => link.slug !== 'home')
    .forEach((link) => {
      const resultRoute = {
        id: link.id,
        uuid: link.uuid,
        isFolder: link.is_folder,
        name: link.name,
        path: link.real_path,
        slug: link.slug,
        routes: [],
      };

      if (!link.parent_id) {
        routes.push(resultRoute);
      } else {
        const targetParent = findRouteById(routes, link.parent_id);

        if (targetParent) {
          targetParent.routes.push(resultRoute);
        }
      }
    });

  return routes;
}

function findRouteById(routes: Route[], id: string): Route | null {
  let resultRoute = null;

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].id === id) {
      resultRoute = routes[i];
      break;
    } else {
      const nestedResultRoute = findRouteById(routes[i].routes, id);

      if (nestedResultRoute) {
        resultRoute = nestedResultRoute;
        break;
      }
    }
  }

  return resultRoute;
}
