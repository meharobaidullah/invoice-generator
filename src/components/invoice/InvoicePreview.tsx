'use client';

import { z } from 'zod';
import { FormSchema } from '@/lib/form';
import { UseFormReturn } from 'react-hook-form';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { PAYMENT_TERMS } from '@/constants';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { TypographyHeading, TypographyText } from '@/components/invoice/preview/Typography';

interface InvoicePreviewProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

type Item = {
  quantity: number | string;
  price: number | string;
};

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ form }) => {
  const {
    invoiceDate,
    paymentTerms,
    projectDescription,
    billingFromAttributes: {
      companyEmail,
      companyName,
      billingFromAddressAttributes: { city, country, postalCode, streetAddress },
    },
    billingToAttributes: {
      clientEmail,
      clientName,
      billingToAddressAttributes: {
        city: billingToCity,
        country: billingToCountry,
        postalCode: billingToPostalCode,
        streetAddress: billingToStreetAddress,
      },
    },
    itemAttributes,
  } = {
    ...form.watch(),
    ...form.getValues(),
  };

  const paymentTermsLabel = PAYMENT_TERMS.find((term) => term.value === paymentTerms)?.label;
  const items = itemAttributes.filter((item) => item.name || item.quantity || item.price);

  const calculateItemTotal = (item: Item): number => {
    const total = Number(item.quantity) * Number(item.price);
    return parseFloat(total.toFixed(2));
  };

  const calculateTotal = (items: Item[]): number => {
    const total = items.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0);
    return parseFloat(total.toFixed(2));
  };

  // Function to calculate tax (assumed tax rate is 10%)
  const calculateTax = (total: number, taxRate: number = 0.1): number => {
    const tax = total * taxRate;
    return parseFloat(tax.toFixed(2));
  };

  return (
    <Card className="bg-[#F5F5F5]">
      <CardHeader>
        <CardTitle className="text-2xl">Preview</CardTitle>
      </CardHeader>

      <CardContent>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New Invoice</CardTitle>
          </CardHeader>

          <div className="mx-6 mb-4 border-b" />

          <CardContent className="space-y-4">
            <div>
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <TypographyHeading> Invoice Date </TypographyHeading>
                  <TypographyText>{format(invoiceDate, 'dd MMM, yyyy')}</TypographyText>
                </div>

                <div>
                  <TypographyHeading>Payment Terms</TypographyHeading>
                  <TypographyText>{paymentTermsLabel}</TypographyText>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <TypographyHeading>Bill From</TypographyHeading>

                <div>
                  <TypographyText>{companyName}</TypographyText>
                  <TypographyText>{companyEmail}</TypographyText>
                  <TypographyText>{streetAddress}</TypographyText>
                  <TypographyText>
                    {city}
                    {postalCode ? `, ${postalCode}` : ''}
                  </TypographyText>
                  <TypographyText>{country}</TypographyText>
                </div>
              </div>

              <div>
                <TypographyHeading>Bill To</TypographyHeading>

                <div>
                  <TypographyText>{clientName}</TypographyText>
                  <TypographyText>{clientEmail}</TypographyText>
                  <TypographyText>{billingToStreetAddress}</TypographyText>
                  <TypographyText>
                    {billingToCity}
                    {billingToPostalCode ? `, ${billingToPostalCode}` : ''}
                  </TypographyText>
                  <TypographyText>{billingToCountry}</TypographyText>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1">
              <TypographyHeading>Project Description</TypographyHeading>
              <TypographyText>{projectDescription}</TypographyText>
            </div>

            <div className="grid grid-cols-1">
              <Table>
                <TableHeader className="bg-[#F5F5F5]">
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Qty.</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price ? `$ ${item.price}` : ''}</TableCell>
                      <TableCell className="text-right">
                        $ {calculateItemTotal(item).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <div className="mx-6 mb-4 border-b" />

          <CardFooter>
            <div className="grid w-full grid-cols-12">
              <div className="col-start-8 col-end-13">
                <div className="flex justify-between gap-x-4">
                  <h3 className="leading-9.5 text-base font-semibold text-[#101828]">Subtotal</h3>
                  <p className="leading-9.5 text-base font-semibold text-[#101828]">
                    $ {calculateTotal(items).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between gap-x-4">
                  <h3 className="leading-9.5 text-base font-semibold text-[#101828]">Tax</h3>
                  <p className="leading-9.5 text-base font-semibold text-[#101828]">10%</p>
                </div>

                <div className="flex justify-between gap-x-4">
                  <h3 className="leading-9.5 text-xl font-bold text-[#101828]">Total</h3>
                  <p className="leading-9.5 text-xl font-bold text-[#101828]">
                    $ {(calculateTotal(items) + calculateTax(calculateTotal(items))).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};

export default InvoicePreview;
