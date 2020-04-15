export type NavigationMock = {
  setOptions: jest.Mock;
  dangerouslyGetState: jest.Mock;
  dispatch: jest.Mock;
  goBack: jest.Mock;
  canGoBack: jest.Mock;
  dismiss: jest.Mock;
  navigate: jest.Mock;
  openDrawer: jest.Mock;
  closeDrawer: jest.Mock;
  toggleDrawer: jest.Mock;
  getParam: jest.Mock;
  setParams: jest.Mock;
  addListener: jest.Mock;
  removeListener: jest.Mock;
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
  setOptions: jest.fn(),
  dangerouslyGetState: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  canGoBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
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
    navigationMock.setOptions.mockRestore();
    navigationMock.dangerouslyGetState.mockRestore();
    navigationMock.dispatch.mockRestore();
    navigationMock.goBack.mockRestore();
    navigationMock.canGoBack.mockRestore();
    navigationMock.dismiss.mockRestore();
    navigationMock.navigate.mockRestore();
    navigationMock.openDrawer.mockRestore();
    navigationMock.closeDrawer.mockRestore();
    navigationMock.toggleDrawer.mockRestore();
    navigationMock.getParam.mockRestore();
    navigationMock.setParams.mockRestore();
    navigationMock.addListener.mockRestore();
    navigationMock.removeListener.mockRestore();
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
