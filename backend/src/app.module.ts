import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TypexModule } from './typex/typex.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';


@Module({
imports: [DatabaseModule, UsersModule, AuthModule, TypexModule, CategoryModule, ProductModule],
})

export class AppModule {}