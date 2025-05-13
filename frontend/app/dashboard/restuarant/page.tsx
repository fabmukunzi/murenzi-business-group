'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useAddNewMuneItemMutation,
  useUpdateMenuMutation,
  useDeleteMenuItemMutation,
} from '@/store/actions/menu';
import Loader from '@/components/common/loader';
import { handleError } from '@/lib/functions/handle-error';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import EmptyState from '@/components/common/Empty';
import { MenuItem } from '@/lib/types/menu';

const initialFormState = {
  name: '',
  price: '',
  description: '',
  categoryId: '',
  image: '',
};

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [addNewMuneItem, { isLoading: isAdding }] = useAddNewMuneItemMutation();
  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const {
    data: menuData,
    isLoading: isMenuLoading,
    error: menuError,
  } = useGetMenuItemsQuery({});
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const categories = categoriesData?.data.categories || [];
  const menuItems = menuData?.data.items || [];

  useEffect(() => {
    if (!isAddDialogOpen && !isEditDialogOpen) {
      setFormData(initialFormState);
      setSelectedItem(null);
      setPreviewImage(null);
    }
  }, [isAddDialogOpen, isEditDialogOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData({ ...formData, image: file.name }); // optionally save file name
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('description', formData.description);
    form.append('categoryId', formData.categoryId);
    const imageInput = (e.target as HTMLFormElement).image as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      form.append('image', imageInput.files[0]);
    }

    try {
      await addNewMuneItem(form).unwrap();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add item:', error);
      handleError(error);
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      price: String(item.price),
      description: item.description,
      categoryId: item.categoryId,
      image: item.image,
    });
    setPreviewImage(item.image);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem) return;

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('description', formData.description);
    form.append('categoryId', formData.categoryId);

    const imageInput = (e.target as HTMLFormElement).image as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      form.append('image', imageInput.files[0]);
    }

    try {
      await updateMenu({ id: selectedItem.id, data: form }).unwrap();
      setIsEditDialogOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeleteItem = (item: string) => {
    deleteMenuItem({ menuId: item })
      .unwrap()
      .then((response) => {
        console.log('Item deleted successfully:', response);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  if (isMenuLoading || isCategoriesLoading)
    return (
      <Loader className="!flex h-full justify-center items-center" loading />
    );
  if (menuError || categoriesError) return <p>Error loading data</p>;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Restaurant Menu Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage menu items for online display
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 flex gap-2 items-center"
          onClick={() => {
            setFormData(initialFormState);
            setIsAddDialogOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Add New Item</span>
        </Button>
      </motion.div>

      <Separator />

      <Tabs
        value={activeTab || categories[0]?.id}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            {(() => {
              const filteredItems = menuItems.filter(
                (item) => item.categoryId === category.id
              );

              if (filteredItems.length === 0) {
                return (
                  <EmptyState
                    title="No Items Found"
                    description="There are no menu items in this category yet."
                  />
                );
              }
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="p-0 pb-4 gap-2">
                      <div className="relative h-40 m-2 rounded-3xl">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <CardHeader className="px-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="font-bold text-primary">
                            ${item.price}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pt-0">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      </CardContent>
                      <CardFooter className="px-4 pt-0 flex justify-between">
                        <Badge variant="outline" className="text-xs">
                          {category.name}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditItem(item)}
                          >
                            <Pencil size={14} />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="bg-red-500"
                              >
                                <Trash2
                                  size={16}
                                  strokeWidth={3}
                                  className="text-white"
                                />{' '}
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the item.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:border-red-500 hover:border-2 hover:bg-white hover:text-red-500"
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash2 size={16} strokeWidth={3} /> Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              );
            })()}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? 'Edit Menu Item' : 'Add New Menu Item'}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen
                ? 'Update the selected menu item.'
                : 'Create a new menu item. Fill all fields for best results.'}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={isEditDialogOpen ? handleSaveEdit : handleAddItem}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Upload Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={100}
                    height={70}
                    className="rounded-lg object-cover mt-2"
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setIsEditDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isAdding || (isEditDialogOpen && isUpdating)}
                className="bg-primary hover:bg-primary/90"
              >
                {isAdding
                  ? 'Adding...'
                  : isEditDialogOpen
                  ? isUpdating
                    ? 'Saving...'
                    : 'Save Changes'
                  : 'Add Menu Item'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
