import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

interface InvoiceHeaderProps {
  onReset: () => void;
  isLoading: boolean;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ onReset, isLoading }) => {
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

        <Button type="submit">
          {isLoading ? <ReloadIcon className="h-6 w-6 animate-spin" /> : 'Save'}
        </Button>
      </div>
    </section>
  );
};

export default InvoiceHeader;
