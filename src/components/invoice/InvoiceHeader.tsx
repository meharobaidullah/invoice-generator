import { Button } from '@/components/ui/button';

interface InvoiceHeaderProps {
  onReset: () => void;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ onReset }) => {
  return (
    <section className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-medium">New Invoice</h1>
        <p className="text-center text-base text-muted-foreground">
          Create new invoice for your customers
        </p>
      </div>

      <div className="flex gap-x-3">
        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>

        <Button type="submit">Save</Button>
      </div>
    </section>
  );
};

export default InvoiceHeader;
