export interface NavbarResponse {
  notification_count: number;
}

export function toNavbarResponse(navbar: NavbarResponse): NavbarResponse {
  return {
    notification_count: navbar.notification_count,
  };
}
