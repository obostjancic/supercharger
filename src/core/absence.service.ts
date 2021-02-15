import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Absence } from "./absence.entity";

@Injectable()
export class AbsenceService extends TypeOrmCrudService<Absence> {
  constructor(@InjectRepository(Absence) repo) {
    super(repo);
  }
}
