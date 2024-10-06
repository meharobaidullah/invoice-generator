import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';

interface DatePickerFieldProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
  name: string;
}

const DatePickerField = <TFieldValues extends FieldValues>({
  field,
  name,
}: DatePickerFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <FormLabel>{name}</FormLabel>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !field.value && 'text-muted-foreground',
                )}
              >
                {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <FormMessage />
    </FormItem>
  );
};

export default DatePickerField;
