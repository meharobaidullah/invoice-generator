import InputField from '@/components/shared/InputField';
import SelectField from '@/components/shared/SelectField';
import { FormField } from '@/components/ui/form';
import { COUNTRIES } from '@/constants';
import { FormSchema } from '@/lib/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface BillToSectionProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const BillToSection: React.FC<BillToSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="leading-9.5 text-2xl font-semibold tracking-normal">Bill To</h3>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="billingToAttributes.clientName"
            render={({ field }) => <InputField name="Client's Name" field={field} />}
          />
        </div>

        <div className="col-span-6">
          <FormField
            control={form.control}
            name="billingToAttributes.clientEmail"
            render={({ field }) => <InputField name="Client's Email" field={field} />}
          />
        </div>

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="billingToAttributes.billingToAddressAttributes.country"
            render={({ field }) => (
              <SelectField
                name="Country"
                placeholder="Select Country"
                field={field}
                options={COUNTRIES}
              />
            )}
          />
        </div>

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="billingToAttributes.billingToAddressAttributes.city"
            render={({ field }) => <InputField name="City" field={field} />}
          />
        </div>

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="billingToAttributes.billingToAddressAttributes.postalCode"
            render={({ field }) => <InputField name="Postal Code" field={field} />}
          />
        </div>

        <div className="col-span-12">
          <FormField
            control={form.control}
            name="billingToAttributes.billingToAddressAttributes.streetAddress"
            render={({ field }) => <InputField name="Street Address" field={field} />}
          />
        </div>
      </div>
    </div>
  );
};

export default BillToSection;
