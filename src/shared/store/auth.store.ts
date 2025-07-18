import { createAction, createReducer, on, props } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

// Define the state interface
export interface AuthState {
  isAuthenticated: boolean;
  user: { id: number, fullName: string, email: string } | null; // Adjust the user type as needed
}

// Initial state
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Define actions
export const login = createAction(
  '[Auth] Login',
  props<{ user: any }>()
);

export const logout = createAction('[Auth] Logout');

// Create the reducer
export const authReducer = createReducer(
  initialAuthState,
  on(login, (state: AuthState, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
  })),
  on(logout, (state: AuthState) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }))
);

// Feature selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector to check if the user is authenticated
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);