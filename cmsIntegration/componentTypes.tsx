import Container from '../components/Container/Container';
import Column from '../components/Grid/Column';
import Grid from '../components/Grid/Grid';
import FolderIndex from '../components/FolderIndex/FolderIndex';

interface IComponents {
  [key: string]: React.ElementType,
}

export const componentTypes: IComponents = {
  container: Container,
  grid: Grid,
  column: Column,
  folderIndex: FolderIndex,
};
