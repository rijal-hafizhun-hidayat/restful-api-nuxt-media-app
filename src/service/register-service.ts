import type { RegisterRequest } from "../model/register-model";
import { RegisterValidation } from "../validation/register-validation";
import { Validation } from "../validation/validation";

export class RegisterService {
  static async register(request: RegisterRequest): Promise<any> {
    const requestBody: RegisterRequest = Validation.validate(
      RegisterValidation.registerRequest,
      request
    );
  }
}
