import * as Yup from 'yup';
export default class SessionValidator {
    async store(schema: object) {
        const validatorSchema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          });
      
        return validatorSchema.isValid(schema);
    }

}