import SbEditable from 'storyblok-react';

import { componentFactory } from './componentFactory';

type DynamicComponentProps = {
  story: StoryblokComponent,
  folderIndex: StoryblokComponent[],
}

export default function DynamicComponent({
  story,
  folderIndex
}: DynamicComponentProps) {
  return renderComponentTree(story.body, folderIndex);
}

function renderComponentTree(rootBody: StoryblokComponent[] = [], folderIndex: StoryblokComponent[]) {
  return (
    <>
      {
        rootBody.map((bodyItem: StoryblokComponent) => {
        const ResultComponent = componentFactory(bodyItem);

          return (
            <SbEditable key={bodyItem._uid} content={bodyItem} {...bodyItem}>
              <ResultComponent {...bodyItem} folderIndex={folderIndex}>
                {
                  bodyItem.body && bodyItem.body.length && renderComponentTree(bodyItem.body, folderIndex)
                }
              </ResultComponent>
            </SbEditable>
          );
        })
      }
    </>
  )
}
