import InputField from '@/components/shared/InputField';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormSchema } from '@/lib/form';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface ItemsListProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const ItemsList: React.FC<ItemsListProps> = ({ form }) => {
  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    name: 'itemAttributes',
    control: form.control,
  });

  function appendItem() {
    append({
      name: '',
      quantity: '',
      price: '',
    });
  }

  function removeItem(index: number) {
    remove(index);
  }

  function getItemTotal(quantity: string, price: string) {
    const qty = parseFloat(quantity as string);
    const prc = parseFloat(price as string);

    if (isNaN(qty) || isNaN(prc)) {
      return '';
    }

    return (qty * prc).toFixed(2);
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <h3 className="text-2xl font-semibold leading-[38px] tracking-normal">Items List</h3>

      <div className="flex flex-col space-y-4">
        {itemFields.map((field, index) => (
          <div key={index} className="grid grid-cols-12 gap-x-4">
            <div className="col-span-5">
              <FormField
                key={field.id}
                control={form.control}
                name={`itemAttributes.${index}.name`}
                render={({ field }) => <InputField name="Item Name" field={field} />}
              />
            </div>

            <div className="col-span-2">
              <FormField
                key={field.id}
                control={form.control}
                name={`itemAttributes.${index}.quantity`}
                render={({ field }) => <InputField name="Qty." field={field} />}
              />
            </div>

            <div className="col-span-2">
              <FormField
                key={field.id}
                control={form.control}
                name={`itemAttributes.${index}.price`}
                render={({ field }) => <InputField name="Price" field={field} />}
              />
            </div>

            <div className="col-span-2">
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    readOnly
                    value={getItemTotal(
                      form.watch(`itemAttributes.${index}.quantity`),
                      form.watch(`itemAttributes.${index}.price`),
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>

            <div className="col-span-1 mt-8 flex justify-end">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                <TrashIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ))}

        <Button type="button" onClick={appendItem}>
          <PlusIcon className="mr-2 h-5 w-5" /> Add New Item
        </Button>

        {form.formState.errors.itemAttributes?.root && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {form.formState.errors.itemAttributes?.root?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemsList;
