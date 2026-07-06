import { authService } from '@/services/auth.service';

describe('authService', () => {
  it('returns the normalized login response', async () => {
    const request = jest.fn().mockResolvedValue({
      token: 'abc123',
      ttl: '2026-07-04 12:00:00',
      user: { id: 1, name: 'Ada', email: 'ada@example.com' },
    });

    const result = await authService.login(request, {
      email: 'ada@example.com',
      password: 'secret123',
    });

    expect(request).toHaveBeenCalledWith('/auth/login', {
      method: 'POST',
      body: {
        email: 'ada@example.com',
        password: 'secret123',
      },
    });

    expect(result).toEqual({
      token: 'abc123',
      ttl: '2026-07-04 12:00:00',
      user: { id: 1, name: 'Ada', email: 'ada@example.com' },
    });
  });
});
