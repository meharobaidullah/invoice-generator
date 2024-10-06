import InputField from '@/components/shared/InputField';
import SelectField from '@/components/shared/SelectField';
import { FormField } from '@/components/ui/form';
import { COUNTRIES } from '@/constants';
import { FormSchema } from '@/lib/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface BillFromSectionProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const BillFromSection: React.FC<BillFromSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="leading-9.5 text-2xl font-semibold tracking-normal">Bill From</h3>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="billingFromAttributes.companyName"
            render={({ field }) => <InputField name="Company Name" field={field} />}
          />
        </div>

        <div className="col-span-6">
          <FormField
            control={form.control}
            name="billingFromAttributes.companyEmail"
            render={({ field }) => <InputField name="Company Email" field={field} />}
          />
        </div>

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="billingFromAttributes.billingFromAddressAttributes.country"
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
            name="billingFromAttributes.billingFromAddressAttributes.city"
            render={({ field }) => <InputField name="City" field={field} />}
          />
        </div>

        <div className="col-span-4">
          <FormField
            control={form.control}
            name="billingFromAttributes.billingFromAddressAttributes.postalCode"
            render={({ field }) => <InputField name="Postal Code" field={field} />}
          />
        </div>

        <div className="col-span-12">
          <FormField
            control={form.control}
            name="billingFromAttributes.billingFromAddressAttributes.streetAddress"
            render={({ field }) => <InputField name="Street Address" field={field} />}
          />
        </div>
      </div>
    </div>
  );
};

export default BillFromSection;
