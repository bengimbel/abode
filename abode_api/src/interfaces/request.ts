import { Request } from '@nestjs/common';
interface CustomRequest extends Request {
  user: object;
}

export default CustomRequest;
