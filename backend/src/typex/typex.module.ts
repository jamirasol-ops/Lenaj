import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypexService } from './typex.service';
import { TypexController } from './typex.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TypexController],
  providers: [TypexService],
  exports: [TypexService],
})

export class TypexModule {}