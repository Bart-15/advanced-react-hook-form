import type {
  FieldValues,
  SubmitHandler,
  DefaultValues,
} from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import React from 'react';

type FormProps<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  schema: ZodType<T, ZodTypeDef, T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

export function Form<T extends FieldValues>({
  defaultValues,
  schema,
  onSubmit,
  children,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    register,
    control,
  } = methods;

  console.log(getValues());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.name) {
          return (
            <Controller // Wrap the input with Controller
              name={child.props.name}
              control={control}
              render={({ field }) => {
                // Spread the field props onto the input
                return React.cloneElement(child, {
                  ...child.props,
                  ...field, // This is crucial for onChange to work
                  // Add specific error handling here if needed
                  'aria-invalid': !!errors[child.props.name as keyof T],
                });
              }}
            />
          );
        }
        return child;
      })}
      {/* Display errors below the form - For testing only */}
      {Object.keys(errors).length > 0 && (
        <div style={{ color: 'red' }}>
          {Object.entries(errors).map(([fieldName, error]) => (
            <div key={fieldName}>
              {fieldName}: {error?.message as string}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
