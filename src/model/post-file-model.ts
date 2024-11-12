import type { post_file } from "@prisma/client";

export interface PostFileRequest {
  post_id: number;
}

export function toPostFileResponse(postFile: post_file): post_file {
  return {
    id: postFile.id,
    post_id: postFile.post_id,
    file: postFile.file ?? null,
    created_at: postFile.created_at,
    updated_at: postFile.updated_at,
  };
}
