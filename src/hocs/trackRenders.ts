import { FunctionComponent } from 'react';

export default (component: FunctionComponent<any>) => {
  // @ts-ignore
  component.whyDidYouRender = true;
  return component;
}