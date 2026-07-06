import { useUserService } from "@/services/user.service";
import { userApi } from "@/services/api/user.api";

const pushMock = jest.fn();
const requestMock = jest.fn();

/**
 * Mock Nuxt auto-imports (#imports)
 */
jest.mock("#imports", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useApi: () => ({
    request: requestMock,
  }),
}));

/**
 * IMPORTANT:
 * Prevent real composable from being executed
 */
jest.mock("@/composables/useApi", () => ({
  useApi: () => ({
    request: requestMock,
  }),
}));

/**
 * Mock API layer
 */
jest.mock("@/services/api/user.api", () => ({
  userApi: {
    create: jest.fn(),
    list: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useUserService", () => {
  it("should create user and redirect", async () => {
    (userApi.create as jest.Mock).mockResolvedValue(undefined);

    const service = useUserService();

    service.form.name = "John";
    service.form.email = "john@test.com";
    service.form.password = "123456";

    await service.submitForm();

    expect(userApi.create).toHaveBeenCalledWith(requestMock, {
      name: "John",
      email: "john@test.com",
      password: "123456",
    });

    expect(pushMock).toHaveBeenCalledWith("/auth/user");
  });

  it("should fetch users", async () => {
    const users = [{ id: 1, name: "John" }];

    (userApi.list as jest.Mock).mockResolvedValue(users);

    const service = useUserService();

    await service.fetchUsers();

    expect(service.items.value).toEqual(users);
    expect(service.loading.value).toBe(false);
  });
});