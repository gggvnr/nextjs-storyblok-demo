import Storyblok from '../storyblok';

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

export async function loadPaths(locales: string[]) {
  let links: Links = {};
  const paths:Array<string | { params: { slug: string[] | boolean }; locale?: string }> = [];

  try {
    const { data } = await Storyblok.get('cdn/links/');
    links = data.links;
  } catch {
    for (const locale of locales) {
      paths.push({ params: { slug: false }, locale });
    }
  }

  Object.keys(links).forEach((linkKey: string) => {
    if (links[linkKey].is_folder) {
      return;
    }

    // get array for slug because of catch all
    const { slug } = links[linkKey];
    let splittedSlug: string[] | boolean = slug.split('/');

    if (slug === 'home') splittedSlug = false;

    // create additional languages
    for (const locale of locales) {
      paths.push({ params: { slug: splittedSlug }, locale });
    }
  });

  return paths;
}
