"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Coffee,
  Utensils,
  Pizza,
  Wine,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// Define menu item interface
interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
}

// Mock menu data
const menuData = {
  breakfast: [
    {
      id: 1,
      name: "Continental Breakfast",
      price: 15,
      description: "Fresh croissants, fruits, yogurt, and coffee",
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 2,
      name: "Full English Breakfast",
      price: 18,
      description: "Eggs, bacon, sausage, beans, toast, and grilled tomato",
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 3,
      name: "Healthy Start",
      price: 12,
      description: "Avocado toast with poached eggs and fresh fruit",
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
  ],
  lunch: [
    {
      id: 4,
      name: "Grilled Chicken Salad",
      price: 14,
      description:
        "Mixed greens, grilled chicken, avocado, and balsamic dressing",
      image:
        "https://images.unsplash.com/photo-1547496502-affa22d38842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 5,
      name: "Beef Burger",
      price: 16,
      description: "Angus beef patty, cheese, lettuce, tomato, with fries",
      image:
        "https://images.unsplash.com/photo-1547496502-affa22d38842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 6,
      name: "Pasta Primavera",
      price: 13,
      description: "Fresh seasonal vegetables in a light cream sauce",
      image:
        "https://images.unsplash.com/photo-1547496502-affa22d38842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
  ],
  dinner: [
    {
      id: 7,
      name: "Grilled Salmon",
      price: 22,
      description: "Atlantic salmon with asparagus and lemon butter sauce",
      image:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 8,
      name: "Filet Mignon",
      price: 32,
      description: "Premium beef tenderloin with truffle mashed potatoes",
      image:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 9,
      name: "Vegetarian Curry",
      price: 18,
      description: "Mixed vegetables in a spicy coconut curry sauce with rice",
      image:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
  ],
  drinks: [
    {
      id: 10,
      name: "House Red Wine",
      price: 8,
      description: "Glass of premium Cabernet Sauvignon",
      image:
        "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 11,
      name: "Craft Beer Selection",
      price: 7,
      description: "Local IPA, Stout, or Lager options",
      image:
        "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
    {
      id: 12,
      name: "Signature Cocktails",
      price: 12,
      description: "Handcrafted cocktails with premium spirits",
      image:
        "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      available: true,
    },
  ],
};

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState("breakfast");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    category: "breakfast",
    image: "",
    available: true,
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your API
    console.log("Adding new menu item:", newItem);

    // Reset form and close dialog
    setNewItem({
      name: "",
      price: "",
      description: "",
      category: "breakfast",
      image: "",
      available: true,
    });
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item);
    setNewItem({
      name: item.name,
      price: String(item.price),
      description: item.description,
      category: activeTab,
      image: item.image,
      available: item.available,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would update the item in your API
    console.log("Editing menu item:", selectedItem?.id, newItem);

    // Close dialog
    setIsEditDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (item: MenuItem) => {
    // Here you would delete the item from your API
    console.log("Deleting menu item:", item.id);
    // In a real application, you'd call your API and remove the item
    // After successful deletion, you would update your local state
  };

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
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={16} />
          <span>Add New Item</span>
        </Button>
      </motion.div>

      <Separator />

      <Tabs
        defaultValue="breakfast"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="breakfast" className="flex items-center gap-2">
            <Coffee size={16} />
            <span className="hidden sm:inline">Breakfast</span>
          </TabsTrigger>
          <TabsTrigger value="lunch" className="flex items-center gap-2">
            <Utensils size={16} />
            <span className="hidden sm:inline">Lunch</span>
          </TabsTrigger>
          <TabsTrigger value="dinner" className="flex items-center gap-2">
            <Pizza size={16} />
            <span className="hidden sm:inline">Dinner</span>
          </TabsTrigger>
          <TabsTrigger value="drinks" className="flex items-center gap-2">
            <Wine size={16} />
            <span className="hidden sm:inline">Drinks</span>
          </TabsTrigger>
        </TabsList>

        {Object.entries(menuData).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className={`overflow-hidden ${
                    !item.available ? "opacity-60" : ""
                  }`}
                >
                  <div className="relative h-40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {!item.available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Badge
                          variant="destructive"
                          className="text-sm font-medium px-3 py-1"
                        >
                          Unavailable
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        {item.name}
                      </CardTitle>
                      <span className="font-bold text-primary">
                        ${item.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Badge variant="outline" className="text-xs">
                      {category}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditItem(item)}
                        className="flex items-center gap-1"
                      >
                        <Pencil size={14} />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteItem(item)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Add New Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Create a new menu item. Fill all fields for best results.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Name</Label>
                <Input
                  id="item-name"
                  required
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-price">Price ($)</Label>
                <Input
                  id="item-price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-description">Description</Label>
                <Textarea
                  id="item-description"
                  required
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, category: value })
                  }
                >
                  <SelectTrigger id="item-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-image">Image URL</Label>
                <Input
                  id="item-image"
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="item-available"
                  className="rounded border-gray-300"
                  checked={newItem.available}
                  onChange={(e) =>
                    setNewItem({ ...newItem, available: e.target.checked })
                  }
                />
                <Label htmlFor="item-available">Available for ordering</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Add Menu Item
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update this menu Items&apos; details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-item-name">Name</Label>
                <Input
                  id="edit-item-name"
                  required
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-item-price">Price ($)</Label>
                <Input
                  id="edit-item-price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-item-description">Description</Label>
                <Textarea
                  id="edit-item-description"
                  required
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-item-category">Category</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, category: value })
                  }
                >
                  <SelectTrigger id="edit-item-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-item-image">Image URL</Label>
                <Input
                  id="edit-item-image"
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-item-available"
                  className="rounded border-gray-300"
                  checked={newItem.available}
                  onChange={(e) =>
                    setNewItem({ ...newItem, available: e.target.checked })
                  }
                />
                <Label htmlFor="edit-item-available">
                  Available for ordering
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
