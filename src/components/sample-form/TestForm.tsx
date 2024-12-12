import { Form } from '@/components/forms/Form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.string().min(1, 'You must be at least 18 years old'),
});

type FormData = z.infer<typeof schema>;

const TestForm = () => {
  const defaultValues: FormData = {
    name: '',
    email: '',
    age: '',
  };

  const onSubmit = (data: FormData) => {
    alert('hello');
    console.log('Form Data:', data);
  };

  return (
    <Form<FormData>
      defaultValues={defaultValues}
      schema={schema}
      onSubmit={onSubmit}
    >
      <input type="text" name="name" placeholder="First Name" />
      <input name="email" />
      <input name="age" />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default TestForm;
