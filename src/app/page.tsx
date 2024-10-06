'use client';

import { z } from 'zod';
import { FormSchema } from '@/lib/form';

import Header from '@/components/Header';
import { Form } from '@/components/ui/form';

import InvoiceForm from '@/components/invoice/InvoiceForm';
import InvoicePreview from '@/components/invoice/InvoicePreview';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InvoiceHeader from '@/components/invoice/InvoiceHeader';

const defaultValues = {
  billingFromAttributes: {
    companyName: '',
    companyEmail: '',
    billingFromAddressAttributes: {
      country: '',
      city: '',
      postalCode: '',
      streetAddress: '',
    },
  },
  billingToAttributes: {
    clientName: '',
    clientEmail: '',
    billingToAddressAttributes: {
      country: '',
      city: '',
      postalCode: '',
      streetAddress: '',
    },
  },
  invoiceDate: new Date(),
  paymentTerms: '',
  projectDescription: '',
  itemAttributes: [{ name: '', quantity: '', price: '' }],
};

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));

    form.reset();
  }

  function onReset() {
    form.reset();
  }

  return (
    <div>
      <Header />

      <main className="px-8 pb-16 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InvoiceHeader onReset={onReset} />

            <section className="grid grid-cols-2 justify-between gap-x-6">
              <InvoiceForm form={form} />

              <InvoicePreview form={form} />
            </section>
          </form>
        </Form>
      </main>
    </div>
  );
}
