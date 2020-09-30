import * as Yup from 'yup';
export default class UserValidator {
    async store(schema: object) {
        const validatorSchema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          });
      
        return validatorSchema.isValid(schema);
    }

}