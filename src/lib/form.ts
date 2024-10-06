import { z } from 'zod';

const zodRequiredString = (message: string = 'Required') =>
  z.string({ required_error: message }).trim().min(1, { message });

const zodRequiredNumberString = (message: string = 'Required') =>
  z.string().regex(/^\d+$/, { message: 'Must be a number without decimal' }).min(1, { message });

const zodRequiredNumberStringWithTwoDecimals = (message: string = 'Required') =>
  z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: 'Must be a number with up to two decimal places',
    })
    .min(1, { message });

export const FormSchema = z.object({
  billingFromAttributes: z.object({
    companyName: zodRequiredString('Company Name is required.'),
    companyEmail: zodRequiredString('Company Email is required.').email({
      message: 'Invalid email address.',
    }),
    billingFromAddressAttributes: z.object({
      country: zodRequiredString('Country is required.'),
      city: zodRequiredString('City is required.'),
      postalCode: zodRequiredString('Postal Code is required.'),
      streetAddress: zodRequiredString('Street Address is required.'),
    }),
  }),
  billingToAttributes: z.object({
    clientName: zodRequiredString('Client Name is required.'),
    clientEmail: zodRequiredString('Client Email is required.').email({
      message: 'Invalid email address.',
    }),
    billingToAddressAttributes: z.object({
      country: zodRequiredString('Country is required.'),
      city: zodRequiredString('City is required.'),
      postalCode: zodRequiredString('Postal Code is required.'),
      streetAddress: zodRequiredString('Street Address is required.'),
    }),
  }),
  invoiceDate: z.date({
    required_error: 'Invoice Date is required.',
  }),
  paymentTerms: zodRequiredString('Payment Terms is required'),
  projectDescription: zodRequiredString('Project Description is required'),

  itemAttributes: z
    .array(
      z.object({
        name: zodRequiredString('Item Name is required.'),
        quantity: zodRequiredNumberString('Quantity is required.'),
        price: zodRequiredNumberStringWithTwoDecimals('Price is required.'),
      }),
    )
    .min(1, { message: 'At least one item is required.' }),
});
