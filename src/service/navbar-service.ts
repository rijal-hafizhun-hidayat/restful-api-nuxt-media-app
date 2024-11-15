import { prisma } from "../app/database";
import type { CurrentUser } from "../model/auth-model";
import { toNavbarResponse, type NavbarResponse } from "../model/navbar-model";

export class NavbarService {
  static async getCount(currentUser: CurrentUser): Promise<NavbarResponse> {
    const notificationCount = await prisma.notification.count({
      where: {
        to_user_id: currentUser.id,
        is_read: false,
      },
    });

    const formatNavbar = {
      notification_count: notificationCount,
    };

    return toNavbarResponse(formatNavbar);
  }
}
