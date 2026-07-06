export const pushMock = jest.fn();
export const requestMock = jest.fn();

export const useRouter = () => ({
  push: pushMock,
});

export const useApi = () => ({
  request: requestMock,
});