/**
 * Returns a stable placeholder avatar photo URL for a given person.
 * The same seed (e.g. an email or name) always resolves to the same
 * face, so avatars stay consistent for a given user across the app.
 */
export function avatarUrl(seed: string, size = 128) {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}

/** Seed for the currently signed-in user shown in the sidebar/topbar/profile. */
export const CURRENT_USER_SEED = "salpribadi.dev@gmail.com";
