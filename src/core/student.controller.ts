import { CrudController } from "@nestjsx/crud";
import { Controller } from "src/supercharger/controller.decorator";
import { Student } from "./student.entity";
import { StudentService } from "./student.service";

@Controller(Student)
export class StudentController implements CrudController<Student> {
  constructor(public service: StudentService) {}
}
