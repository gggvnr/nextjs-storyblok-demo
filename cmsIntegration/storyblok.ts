import StoryblokClient, { StoryblokComponent, StoryData } from 'storyblok-js-client'
import { useEffect, useState } from 'react'

const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_KEY,
    cache: {
      clear: 'auto',
      type: 'memory'
    }
})

function addBridge(callback: any) {
  const existingScript = document.getElementById('storyblokBridge');

  if (!existingScript) {
    const script = document.createElement('script');

    script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
    script.id = 'storyblokBridge';
    document.body.appendChild(script);

    script.onload = () => {
      // once the script is loaded, init the event listeners
      callback();
    };
  } else {
      callback();
  }
}

function initEventListeners(story: StoryData, setStory: any, locale: string) {
  const { StoryblokBridge } = window as any;

  if (typeof StoryblokBridge !== 'undefined') {
    // initialize the bridge with your token
    const storyblokInstance = new StoryblokBridge({
      language: locale,
    });

    // reload on Next.js page on save or publish event in the Visual Editor
    storyblokInstance.on(['change', 'published'], () => window.location.reload());

    // live update the story on input events
    storyblokInstance.on('input', (event: StoryblokEventPayload) => {
      if (story && event.story.uuid === story.uuid) {
        setStory(event.story);
      }
    });

    storyblokInstance.on('enterEditmode', (event: StoryblokEventPayload) => {
      // loading the draft version on initial enter of editor
      Storyblok
        .get(`cdn/stories/${event.storyId}`, {
          version: 'draft',
          language: locale,
        })
        .then(({ data }) => {
          if (data.story) {
            setStory(data.story);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    });
  }
}

export function useStoryblok(originalStory: StoryData, enableBridge: boolean, locale: string) {
    let [story, setStory] = useState(originalStory);

    useEffect(() => {
      if (enableBridge) {
        // first load the bridge, then initialize the event listeners
        addBridge(() => initEventListeners(story, setStory, locale));
      }
    });

    return story;
  }

export default Storyblok