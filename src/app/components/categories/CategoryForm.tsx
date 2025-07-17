"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategoryStore } from "@/app/stores/category.store";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
  type: z.enum(["income", "expense"], {
    required_error: "Please select a category type",
  }),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { createCategory, isLoading } = useCategoryStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "#000000",
      type: "expense",
    },
  });

  const onSubmit = async (values: CategoryFormData) => {
    try {
      await createCategory(values);
      onSuccess?.();
    } catch (error) {
      console.error("Category creation failed:", error);
    }
  };

  // Common category icons
  const categoryIcons = [
    "🍔", "🚗", "🏠", "💊", "🎬", "👕", "✈️", "📱", "⚡", "🎓",
    "🎯", "💼", "🛒", "🎵", "🏃", "🍕", "☕", "🎮", "📚", "🚌",
    "💰", "📈", "🎁", "💵", "🏆", "💳", "🎪", "🌟", "📊", "💎"
  ];

  // Common colors
  const categoryColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
    "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
    "#8b5cf6", "#a855f7", "#c026d3", "#d946ef", "#ec4899", "#f43f5e",
    "#64748b", "#6b7280", "#374151", "#1f2937", "#111827"
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Category Name
        </label>
        <Input
          id="name"
          placeholder="Enter category name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium mb-2">
          Category Type
        </label>
        <select
          id="type"
          {...register("type")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium mb-2">
          Icon
        </label>
        <Input
          id="icon"
          placeholder="Enter emoji or icon"
          {...register("icon")}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {categoryIcons.map((icon, index) => (
            <button
              key={index}
              type="button"
              className="text-xl p-2 hover:bg-gray-100 rounded border"
              onClick={() => {
                const iconInput = document.getElementById("icon") as HTMLInputElement;
                if (iconInput) {
                  iconInput.value = icon;
                  iconInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }}
            >
              {icon}
            </button>
          ))}
        </div>
        {errors.icon && (
          <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium mb-2">
          Color
        </label>
        <Input
          id="color"
          type="color"
          {...register("color")}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {categoryColors.map((color, index) => (
            <button
              key={index}
              type="button"
              className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500"
              style={{ backgroundColor: color }}
              onClick={() => {
                const colorInput = document.getElementById("color") as HTMLInputElement;
                if (colorInput) {
                  colorInput.value = color;
                  colorInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }}
            />
          ))}
        </div>
        {errors.color && (
          <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Category"}
      </Button>
    </form>
  );
}