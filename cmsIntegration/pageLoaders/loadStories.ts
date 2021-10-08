import { GetStaticPropsContext } from 'next';
import { StoryData } from 'storyblok-js-client';

import Storyblok from '../storyblok';

import { staticRoutes } from '../../common/staticRoutes';

export async function loadStories({
  locale,
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

  let response;

  try {
    response = await Storyblok.get('cdn/stories', sbParams);
  } catch {
    return getActualStory(undefined);
  }

  const { data } = response;

  return getActualStory(data);
}

export async function loadLinks() {
  let response;

  try {
    response = await Storyblok.get('cdn/links/');
  } catch {
    return staticRoutes;
  }

  const { data: { links } } = response;

  return adaptLinks(links);
}

type ActualStoryData = {
  stories: StoryData[],
};

function getActualStory(data: ActualStoryData | undefined) {
  if (!data) {
    return {
      story: { content: {} },
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
};

type Links = {
  [key: string]: Link,
};

function adaptLinks(links: Links = {}) {
  const routes: Route[] = [];

  Object.values(links)
    .filter((link) => link.slug !== 'home')
    .sort((a, b) => Number(b.is_folder) - Number(a.is_folder))
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

  return routes.concat(staticRoutes);
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
