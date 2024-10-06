import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '@/lib/form';

import { z } from 'zod';

import { FormField } from '@/components/ui/form';
import InputField from '@/components/shared/InputField';
import SelectField from '@/components/shared/SelectField';
import DatePickerField from '@/components/shared/DatePickerField';

import { PAYMENT_TERMS } from '@/constants';

interface InvoiceDetailsProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <FormField
          control={form.control}
          name="invoiceDate"
          render={({ field }) => <DatePickerField name="Invoice Date" field={field} />}
        />
      </div>

      <div className="col-span-6">
        <FormField
          control={form.control}
          name="paymentTerms"
          render={({ field }) => (
            <SelectField
              name="Payment Terms"
              placeholder="Select Term"
              field={field}
              options={PAYMENT_TERMS}
            />
          )}
        />
      </div>

      <div className="col-span-12">
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => <InputField name="Project Description" field={field} />}
        />
      </div>
    </div>
  );
};

export default InvoiceDetails;
