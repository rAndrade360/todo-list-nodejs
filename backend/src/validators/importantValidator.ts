import * as Yup from 'yup';
export default class ImportantValidator {
    async store(schema: object) {
        const validatorSchema = Yup.object().shape({
            is_important: Yup.boolean().nullable().default(false),
          });
      
        return validatorSchema.isValid(schema);
    }

}