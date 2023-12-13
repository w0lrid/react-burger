import { FormEvent, useState } from 'react';

export function useForm(inputValues: Record<string, string> = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
