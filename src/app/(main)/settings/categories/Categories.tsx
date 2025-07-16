"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCategoryStore } from "@/app/stores/category.store";
import { CategoryForm } from "@/app/components/categories/CategoryForm";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CategoriesPage() {
  const {
    categories,
    fetchCategories,
    deleteCategory,
    defaultCategories,
  } = useCategoryStore();

  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter(
    (category) => category.type === activeTab
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold  text-gray-700">Categories</h1>
        <div className="flex gap-2">
          <Button onClick={() => defaultCategories()} className="bg-white text-gray-500 border border-[#f6dfcb] hover:bg-white cursor-pointer">
            Seed Default Categories
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-gray-500 border border-[#f6dfcb] hover:bg-white cursor-pointer">Add Category</Button>
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent>
              <CategoryForm onSuccess={() => fetchCategories()} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "expense" | "income")}
      >
        <TabsList>
          <TabsTrigger value="expense">Expense Categories</TabsTrigger>
          <TabsTrigger value="income">Income Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="expense">
          <div className="border rounded-lg mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Name</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Icon</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Color</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Type</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">{category.name}</TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <span className="text-xl">{category.icon}</span>
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <Badge
                        style={{ backgroundColor: category.color }}
                        className="text-white"
                      >
                        {category.color}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <Badge
                        variant={
                          category.type === "income" ? "default" : "destructive"
                        }
                      >
                        {category.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <Button variant="ghost">Edit</Button>
                      <Button
                        variant="ghost"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="income">
          <div className="border rounded-lg mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Name</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Icon</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Color</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Type</TableHead>
                  <TableHead className="border-r text-center text-gray-500 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">{category.name}</TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <span className="text-xl">{category.icon}</span>
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <Badge
                        style={{ backgroundColor: category.color }}
                        className="text-white"
                      >
                        {category.color}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <Badge
                        variant={
                          category.type === "income" ? "default" : "destructive"
                        }
                      >
                        {category.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-500 font-semibold">
                      <Button variant="ghost">Edit</Button>
                      <Button
                        variant="ghost"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}