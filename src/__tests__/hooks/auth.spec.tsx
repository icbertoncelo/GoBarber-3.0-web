import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';
import { useAuth, AuthProvider } from '../../contexts/auth';

const apiMock = new MockAdapter(api);
const userMock = {
  id: 'user-id-123',
  name: 'John Doe',
  email: 'johndoe@teste.com',
  avatar_url: 'profile-image.png',
};
const tokenMock = 'token-123';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Auth Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to sign in', async () => {
    const apiResponse = {
      user: userMock,
      token: tokenMock,
    };

    act(() => {
      apiMock.onPost('sessions').reply(200, apiResponse);
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signIn({
        email: 'johndoe@teste.com',
        password: '123456',
      });
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(result.current.user.email).toBe('johndoe@teste.com');
  });

  it('should restore saved data from storage when application inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:user':
          return JSON.stringify(userMock);
        case '@GoBarber:token':
          return tokenMock;
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toBe('johndoe@teste.com');
  });

  it('should be able to sign out', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:user':
          return JSON.stringify(userMock);
        case '@GoBarber:token':
          return tokenMock;
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeUndefined();
    expect(removeItemSpy).toBeCalledTimes(2);
  });

  it('should be able to update a user', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(userMock);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(userMock),
    );
    expect(result.current.user).toEqual(userMock);
  });
});
