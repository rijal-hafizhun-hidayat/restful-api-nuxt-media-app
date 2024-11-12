import type { post_file } from "@prisma/client";
import { prisma } from "../app/database";
import {
  toPostFileResponse,
  type PostFileRequest,
} from "../model/post-file-model";

export class PostFileService {
  static async storePostFile(request: PostFileRequest): Promise<post_file> {
    const [storedPostFile] = await prisma.$transaction([
      prisma.post_file.create({
        data: {
          post_id: request.post_id,
        },
      }),
    ]);

    return toPostFileResponse(storedPostFile);
  }
}
