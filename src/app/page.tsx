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
import { gql, useMutation } from '@apollo/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import CheckIcon from '@/assets/CheckIcon';

const TOAST_DURATION = 2500;

const CREATE_INVOICE = gql`
  mutation createInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
    }
  }
`;

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
  const { toast } = useToast();

  const [createInvoice, { loading }] = useMutation(CREATE_INVOICE);

  const invoiceDataFormatter = (data: any) => {
    return {
      ...data,
      itemAttributes: data.itemAttributes.map((item: any) => ({
        ...item,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
      })),
    };
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await createInvoice({
        variables: {
          input: {
            createInvoiceAttributes: invoiceDataFormatter(data),
          },
        },
      });

      if (response.data?.createInvoice.id) {
        toast({
          title: (
            <div className="flex items-center">
              <CheckIcon className="mr-2" />
              <span className="text-base font-medium text-neutral-600">
                Invoice created successfully!
              </span>
            </div>
          ),
          description: (
            <div className="mt-1 flex items-center">
              <span className="ml-8 text-sm font-normal text-neutral-600">
                Your invoice has been created.
              </span>
            </div>
          ),
          duration: TOAST_DURATION,
          className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: (error as Error).message,
        duration: TOAST_DURATION,
        className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
      });
    }

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
            <InvoiceHeader onReset={onReset} isLoading={loading} />

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
