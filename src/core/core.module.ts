import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceController } from './absence.controller';
import { StudentController } from './student.controller';
import { Absence } from './absence.entity';
import { AbsenceService } from './absence.service';
import { SuperchargerModule } from 'src/supercharger/supercharger.module';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Module({
  imports: [SuperchargerModule, TypeOrmModule.forFeature([Absence, Student])],
  controllers: [AbsenceController, StudentController],
  providers: [AbsenceService, StudentService],
})
export class CoreModule {}
