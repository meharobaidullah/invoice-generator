import { FieldValues, FieldPath, ControllerRenderProps } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface InputFieldProps<TFieldValues extends FieldValues> {
  name: string;
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
}

const InputField = <TFieldValues extends FieldValues>({
  name,
  field,
}: InputFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <FormLabel>{name}</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default InputField;
