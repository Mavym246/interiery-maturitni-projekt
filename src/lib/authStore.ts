import { writable } from 'svelte/store';

export const isLogged = writable(false);

export function setLoggedIn(isLoggedIn: boolean) {
    isLogged.set(isLoggedIn);
  }