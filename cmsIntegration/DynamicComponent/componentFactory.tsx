import { componentTypes } from '../componentTypes';
import UndefinedComponent from './UndefinedComponent';

export function componentFactory(componentData: StoryblokComponent) {
  const ResultComponent = componentTypes[componentData.component] || UndefinedComponent;

  return ResultComponent;
}
