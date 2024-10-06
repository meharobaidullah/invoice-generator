import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface SelectFieldProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

const SelectField = <TFieldValues extends FieldValues>({
  field,
  name,
  placeholder,
  options,
}: SelectFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <FormLabel>{name}</FormLabel>
      <FormControl>
        <Select value={field.value} onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            {options.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SelectField;
