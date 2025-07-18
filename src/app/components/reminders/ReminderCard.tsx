import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Bell, Check, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Reminder } from "@/@types/types";
import {
  useDeleteReminder,
  useUpdateReminder,
} from "@/app/stores/reminders.store";
import { toast } from "react-toastify";

interface ReminderCardProps {
  reminder: Reminder;
  onEdit: (reminder: Reminder) => void;
}

export function ReminderCard({ reminder, onEdit }: ReminderCardProps) {
  const updateReminder = useUpdateReminder();
  const deleteReminder = useDeleteReminder();

  const handleComplete = () => {
    updateReminder.mutate(
      { ...reminder, isCompleted: true },
      {
        onSuccess: () => {
          toast.success("Your reminder has been marked as completed");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteReminder.mutate(reminder._id, {
      onSuccess: () => {
        toast.error("Your reminder has been deleted successfully");
      },
    });
  };

  const isOverdue =
    new Date(reminder.dueDate) < new Date() && !reminder.isCompleted;

  return (
    <Card className={isOverdue ? "border-red-500" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {reminder.isCompleted ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : isOverdue ? (
            <AlertTriangle className="h-4 w-4 text-red-500" />
          ) : (
            <Bell className="h-4 w-4 text-yellow-500" />
          )}
          <CardTitle className="text-sm font-medium text-gray-600">
            {reminder.name}
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(reminder)}>
              Edit
            </DropdownMenuItem>
            {!reminder.isCompleted && (
              <DropdownMenuItem onClick={handleComplete}>
                {/* Mark as Complete */}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-red-500"
              onClick={handleDelete}
              disabled={deleteReminder.isPending}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            {reminder.notes && (
              <p className="text-xs text-muted-foreground">
                Description: {reminder.notes}
              </p>
            )}
            {reminder.amount && (
              <p className="text-sm font-medium">
                Amount: ${reminder.amount.toFixed(2)}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm">
              {/* Due: {format(new Date(reminder.dueDate as string), "MMM dd, yyyy")} */}
              Due:{" "}
              {reminder.dueDate && !isNaN(Date.parse(reminder.dueDate))
                ? format(new Date(reminder.dueDate), "MMM dd, yyyy")
                : "No due date"}
            </p>
            <Badge variant="outline" className="mt-1">
              {reminder.type}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
