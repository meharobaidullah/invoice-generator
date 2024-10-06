'use client';

import { z } from 'zod';
import { FormSchema } from '@/lib/form';
import { UseFormReturn } from 'react-hook-form';

import { Card } from '@/components/ui/card';
import BillFrom from '@/components/invoice/form/BillFrom';
import BillTo from '@/components/invoice/form/BillTo';
import InvoiceDetails from './form/InvoiceDetails';
import ItemsList from './form/ItemsList';

interface InvoiceFormProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ form }) => {
  return (
    <Card className="space-y-8 p-6">
      <BillFrom form={form} />

      <BillTo form={form} />

      <InvoiceDetails form={form} />

      <ItemsList form={form} />
    </Card>
  );
};

export default InvoiceForm;
