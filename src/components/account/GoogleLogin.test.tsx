import { render, screen, fireEvent } from '@testing-library/react';
import Component from './GoogleLogin';
import { useSession, signIn, signOut } from 'next-auth/react';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');

describe('Component', () => {
  // mock the useSession hook in next auth
  const mockUseSession = useSession as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "Signed in" UI when there is an active session', () => {
    // return required session for testing
    mockUseSession.mockReturnValue({ data: { user: { name: 'John' } } });
    render(<Component />);
    expect(screen.getByText('Signed in as John')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Sign out' })
    ).toBeInTheDocument();
  });

  test('renders "Signed in" UI when there is an active session but no user', () => {
    mockUseSession.mockReturnValue({ data: { user: null } });
    render(<Component />);
    expect(screen.getByText('Signed in as _blank')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Sign out' })
    ).toBeInTheDocument();
  });

  test('renders "Not signed in" UI when there is no active session', () => {
    mockUseSession.mockReturnValue({ data: null });
    render(<Component />);
    expect(screen.getByText('Not signed in')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  test('calls signOut when "Sign out" button is clicked', () => {
    mockUseSession.mockReturnValue({ data: { user: { name: 'John' } } });
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(signOut).toHaveBeenCalled();
  });

  test('calls signIn when "Sign in" button is clicked', () => {
    mockUseSession.mockReturnValue({ data: null });
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(signIn).toHaveBeenCalled();
  });
});
