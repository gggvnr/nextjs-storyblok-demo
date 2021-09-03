type Route = {
  id: string,
  uuid: string,
  name: string,
  path: string,
  external?: boolean,
  isFolder?: boolean,
  excludeFromHeader?: boolean,
  routes: Route[],
}