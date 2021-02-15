import { CrudController } from "@nestjsx/crud";
import { Controller } from "src/supercharger/controller.decorator";
import { Absence } from "./absence.entity";
import { AbsenceService } from "./absence.service";

@Controller(Absence)
export class AbsenceController implements CrudController<Absence> {
  constructor(public service: AbsenceService) {}
}
