import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Student } from "./student.entity";

@Injectable()
export class StudentService extends TypeOrmCrudService<Student> {
  constructor(@InjectRepository(Student) repo) {
    super(repo);
  }
}
