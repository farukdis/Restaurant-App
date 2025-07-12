// services/order-service/src/test/test.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
    @Get()
    getTest(): string {
        return 'Order Service is running!';
    }
}