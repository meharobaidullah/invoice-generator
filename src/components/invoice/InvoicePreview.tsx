'use client';

import { z } from 'zod';
import { FormSchema } from '@/lib/form';
import { UseFormReturn } from 'react-hook-form';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface InvoicePreviewProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ form }) => {
  const formValues = {
    ...form.watch(),
    ...form.getValues(),
  };

  console.log(formValues);

  return (
    <Card className="bg-[#F5F5F5]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold leading-[38px]">Preview</CardTitle>
      </CardHeader>

      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>New Invoice</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{JSON.stringify(formValues, null, 2)}</p>
          </CardContent>

          <CardFooter>Footer</CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};

export default InvoicePreview;
