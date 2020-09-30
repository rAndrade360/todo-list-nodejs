import * as Yup from 'yup';
export default class ProjectValidator {
    async store(schema: object) {
        const validatorSchema = Yup.object().shape({
            name: Yup.string().required(),
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