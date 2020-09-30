import * as Yup from 'yup';
export default class TaskValidator {
    async store(schema: object) {
        const validatorSchema = Yup.object().shape({
            name: Yup.string().required(),
            is_important: Yup.boolean().nullable().default(false),
            completed: Yup.boolean().nullable().default(false),
            schedule: Yup.date().nullable(),
            project_id: Yup.number().integer().positive().nullable()
          });
      
        return validatorSchema.isValid(schema);
    }

    async update(schema: object) {
        const validateSchema = Yup.object().shape({
            name: Yup.string().required(),
          });
      
        return validateSchema.isValid(schema);
    }
}