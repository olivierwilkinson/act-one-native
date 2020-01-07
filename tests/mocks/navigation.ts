import { NavigationStackProp } from "react-navigation-stack";

export type NavigationMock = {
  state: NavigationStackProp["state"];
  dispatch: jest.Mock;
  goBack: jest.Mock;
  dismiss: jest.Mock;
  navigate: jest.Mock;
  openDrawer: jest.Mock;
  closeDrawer: jest.Mock;
  toggleDrawer: jest.Mock;
  getParam: jest.Mock;
  setParams: jest.Mock;
  addListener: jest.Mock;
  push: jest.Mock;
  replace: jest.Mock;
  reset: jest.Mock;
  pop: jest.Mock;
  popToTop: jest.Mock;
  isFocused: jest.Mock;
  emit: jest.Mock;
  isFirstRouteInParent: jest.Mock;
  dangerouslyGetParent: jest.Mock;
  mockRestore: () => void;
};

const navigationMock: NavigationMock = {
  state: {
    params: {},
    key: "",
    index: -1,
    routeName: "",
    routes: [],
    isTransitioning: false
  },
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn(),
  emit: jest.fn(),
  isFirstRouteInParent: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  mockRestore: () => {
    navigationMock.dispatch.mockRestore();
    navigationMock.goBack.mockRestore();
    navigationMock.dismiss.mockRestore();
    navigationMock.navigate.mockRestore();
    navigationMock.openDrawer.mockRestore();
    navigationMock.closeDrawer.mockRestore();
    navigationMock.toggleDrawer.mockRestore();
    navigationMock.getParam.mockRestore();
    navigationMock.setParams.mockRestore();
    navigationMock.addListener.mockRestore();
    navigationMock.push.mockRestore();
    navigationMock.replace.mockRestore();
    navigationMock.reset.mockRestore();
    navigationMock.pop.mockRestore();
    navigationMock.popToTop.mockRestore();
    navigationMock.isFocused.mockRestore();
    navigationMock.emit.mockRestore();
    navigationMock.isFirstRouteInParent.mockRestore();
    navigationMock.dangerouslyGetParent.mockRestore();
  }
};

export default navigationMock;
