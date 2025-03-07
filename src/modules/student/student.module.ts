import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentSeed } from './student.seed';
import { AppConfigService } from 'src/config/app.config.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentResolver, StudentService, StudentSeed, AppConfigService],
  exports: [StudentService],
})
export class StudentModule {}
