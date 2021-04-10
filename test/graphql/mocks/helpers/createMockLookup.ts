import util from "util";

export function validateMocks(
  mocks: { [key: string]: any },
  lookupKey: string
) {
  Object.values(mocks).forEach((mock, _, arr) => {
    if (!mock[lookupKey]) {
      throw new Error(
        `Mock does not have value for "${lookupKey}": ${util.inspect(mock, {
          colors: true
        })}`
      );
    }

    const otherMocks = arr.filter(otherMock => otherMock !== mock);
    const mockWithDuplicateLookup = otherMocks.find(
      otherMock => otherMock[lookupKey] === mock[lookupKey]
    );
    if (mockWithDuplicateLookup) {
      throw new Error(
        `Mocks have duplicate values for "${lookupKey}": ${util.inspect(mock, {
          colors: true
        })}\n${util.inspect(mockWithDuplicateLookup, { colors: true })}`
      );
    }
  });
}

export default function createMockLookup<T extends { [key: string]: any }>(
  mocks: { [key: string]: T },
  lookupKey = "id"
): { [key: string]: T } {
  validateMocks(mocks, lookupKey);

  return Object.values(mocks).reduce(
    (mockByLookup, mock) => ({
      ...mockByLookup,
      [mock[lookupKey]]: mock
    }),
    {}
  );
}
