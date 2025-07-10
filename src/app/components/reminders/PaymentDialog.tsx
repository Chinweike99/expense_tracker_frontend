import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { CalendarIcon } from "lucide-react";
  import { format } from "date-fns";
  import { cn } from "@/lib/utils";
  import { Textarea } from "@/components/ui/textarea";
import { Debt } from "@/@types/types";
import { useRecordDebtPayment } from "@/app/stores/reminders.store";
import { toast } from "react-toastify";
  
  
  const formSchema = z.object({
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    date: z.date(),
    notes: z.string().optional(),
  });
  
  interface PaymentDialogProps {
    debt: Debt | null;
    onClose: () => void;
  }
  
  export function PaymentDialog({ debt, onClose }: PaymentDialogProps) {

    const recordPayment = useRecordDebtPayment();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        amount: debt?.minimumPayment || 0,
        date: new Date(),
        notes: "",
      },
    });
  
    const handleSubmit = (values: z.infer<typeof formSchema>) => {
      if (!debt) return;
  
      recordPayment.mutate(
        {
          debtId: debt.id,
          payment: {
              amount: values.amount,
              date: values.date.toISOString(),
              notes: values.notes,
              debtId: ""
          },
        },
        {
          onSuccess: () => {
            toast.success("Your payment has been recorded successfully")
            onClose();
          },
        }
      );
    };
  
    if (!debt) return null;
  
    return (
      <Dialog open={!!debt} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record Payment for {debt.name}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("2000-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={recordPayment.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={recordPayment.isPending}>
                  {recordPayment.isPending ? "Recording..." : "Record Payment"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }