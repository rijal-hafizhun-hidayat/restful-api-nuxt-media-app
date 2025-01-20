import fs from "fs";
import { ErrorResponse } from "../error/error-response";

export class FileUtils {
  static async destroyFile(filePath: string) {
    fs.unlink(filePath, (error) => {
      if (error) {
        throw new ErrorResponse(404, `error removing file: ${error}`);
        return;
      }
    });
  }
}
