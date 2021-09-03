import { StoryblokComponent } from '../types';
import { componentTypes, UndefinedComponent } from '../componentTypes';

export function componentFactory(componentData: StoryblokComponent) {
  const ResultComponent = componentTypes[componentData.component] || UndefinedComponent;

  return ResultComponent;
}
