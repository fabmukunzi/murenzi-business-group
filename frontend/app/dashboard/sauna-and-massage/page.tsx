"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Clock, X, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

// Define service interfaces
interface SpaService {
  id: number;
  name: string;
  duration: number;
  price: number;
  description: string;
  image: string;
  availability: string[];
}

// Mock service data
const services = {
  massage: [
    {
      id: 1,
      name: "Swedish Massage",
      duration: 60,
      price: 75,
      description:
        "A gentle full body massage designed to reduce tension and induce relaxation.",
      image:
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["09:00", "11:00", "14:00", "16:00"],
    },
    {
      id: 2,
      name: "Deep Tissue Massage",
      duration: 60,
      price: 90,
      description:
        "Focuses on the deeper layers of muscle tissue to release chronic muscle tension.",
      image:
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["10:00", "13:00", "15:00", "17:00"],
    },
    {
      id: 3,
      name: "Hot Stone Massage",
      duration: 90,
      price: 110,
      description:
        "Uses smooth, heated stones placed on specific points of the body to warm and loosen tight muscles.",
      image:
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["11:00", "14:00", "16:00"],
    },
  ],
  sauna: [
    {
      id: 4,
      name: "Traditional Sauna",
      duration: 45,
      price: 35,
      description: "Traditional Finnish sauna experience with dry heat.",
      image:
        "https://images.unsplash.com/photo-1554188572-9f21c18dab38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
    },
    {
      id: 5,
      name: "Steam Room",
      duration: 30,
      price: 30,
      description:
        "Wet heat therapy in a tiled, vapor-filled room to promote relaxation and detoxification.",
      image:
        "https://images.unsplash.com/photo-1554188572-9f21c18dab38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["09:30", "10:30", "11:30", "14:30", "15:30", "16:30"],
    },
    {
      id: 6,
      name: "Infrared Sauna",
      duration: 45,
      price: 40,
      description:
        "Uses infrared lamps to directly warm your body without heating the air around you.",
      image:
        "https://images.unsplash.com/photo-1554188572-9f21c18dab38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["10:00", "12:00", "14:00", "16:00"],
    },
  ],
  packages: [
    {
      id: 7,
      name: "Relaxation Package",
      duration: 120,
      price: 150,
      description: "Swedish massage followed by traditional sauna session.",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["10:00", "13:00", "15:00"],
    },
    {
      id: 8,
      name: "Deluxe Spa Package",
      duration: 180,
      price: 220,
      description: "Deep tissue massage, steam room, and facial treatment.",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["09:00", "13:00"],
    },
    {
      id: 9,
      name: "Couples Package",
      duration: 150,
      price: 280,
      description:
        "Side-by-side Swedish massages followed by private sauna time.",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      availability: ["11:00", "14:00", "16:00"],
    },
  ],
};

export default function SaunaMassagePage() {
  const [activeTab, setActiveTab] = useState("massage");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<SpaService | null>(
    null
  );
  const [newService, setNewService] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
    category: "massage",
    image: "",
    availability: [] as string[],
    availabilityInput: "",
  });

  const handleEditService = (service: SpaService) => {
    setSelectedService(service);
    setNewService({
      name: service.name,
      duration: String(service.duration),
      price: String(service.price),
      description: service.description,
      category: activeTab,
      image: service.image,
      availability: [...service.availability],
      availabilityInput: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would update the service in your API
    console.log("Editing service:", selectedService?.id, newService);

    // Close dialog
    setIsEditDialogOpen(false);
    setSelectedService(null);
  };

  const handleDeleteService = (service: SpaService) => {
    // Here you would delete the service from your API
    console.log("Deleting service:", service.id);
    // In a real application, you'd call your API and remove the item
    // After successful deletion, you would update your local state
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your API
    console.log("Adding new service:", newService);

    // Reset form and close dialog
    setNewService({
      name: "",
      duration: "",
      price: "",
      description: "",
      category: "massage",
      image: "",
      availability: [],
      availabilityInput: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleAddAvailability = () => {
    if (
      newService.availabilityInput &&
      !newService.availability.includes(newService.availabilityInput)
    ) {
      setNewService({
        ...newService,
        availability: [
          ...newService.availability,
          newService.availabilityInput,
        ],
        availabilityInput: "",
      });
    }
  };

  const handleRemoveAvailability = (time: string) => {
    setNewService({
      ...newService,
      availability: newService.availability.filter((t) => t !== time),
    });
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
            Sauna & Massage Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage spa services for online display
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 flex gap-2 items-center"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={16} />
          <span>Add New Service</span>
        </Button>
      </motion.div>

      <Separator />

      <Tabs
        defaultValue="massage"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="massage">Massage Services</TabsTrigger>
          <TabsTrigger value="sauna">Sauna Services</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
        </TabsList>

        {Object.entries(services).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-white">
                        ${service.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        {service.name}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{service.duration} min</span>
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.availability.map((time, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Badge variant="outline" className="text-xs capitalize">
                      {category}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditService(service)}
                        className="flex items-center gap-1"
                      >
                        <Pencil size={14} />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteService(service)}
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

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update this services&apos; details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-service-name">Service Name</Label>
                <Input
                  id="edit-service-name"
                  required
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-service-duration">Duration (min)</Label>
                  <Input
                    id="edit-service-duration"
                    type="number"
                    min="15"
                    step="15"
                    required
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService({ ...newService, duration: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-service-price">Price ($)</Label>
                  <Input
                    id="edit-service-price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({ ...newService, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-service-description">Description</Label>
                <Textarea
                  id="edit-service-description"
                  required
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-service-category">Category</Label>
                <Select
                  value={newService.category}
                  onValueChange={(value) =>
                    setNewService({ ...newService, category: value })
                  }
                >
                  <SelectTrigger id="edit-service-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="massage">Massage</SelectItem>
                    <SelectItem value="sauna">Sauna</SelectItem>
                    <SelectItem value="packages">Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-service-image">Image URL</Label>
                <Input
                  id="edit-service-image"
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={newService.image}
                  onChange={(e) =>
                    setNewService({ ...newService, image: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Available Times</Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={newService.availabilityInput}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        availabilityInput: e.target.value,
                      })
                    }
                    placeholder="Add available times"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddAvailability}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {newService.availability.map((time, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="pr-1 flex items-center gap-1"
                    >
                      {time}
                      <button
                        type="button"
                        className="ml-1 rounded-full hover:bg-gray-200 p-1"
                        onClick={() => handleRemoveAvailability(time)}
                      >
                        <X size={10} />
                      </button>
                    </Badge>
                  ))}
                  {newService.availability.length === 0 && (
                    <span className="text-xs text-gray-500">
                      No times added yet
                    </span>
                  )}
                </div>
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

      {/* Add New Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new spa or massage service. Fill all fields for best
              results.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddService} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  required
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-duration">Duration (min)</Label>
                  <Input
                    id="service-duration"
                    type="number"
                    min="15"
                    step="15"
                    required
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService({ ...newService, duration: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-price">Price ($)</Label>
                  <Input
                    id="service-price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({ ...newService, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  required
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-category">Category</Label>
                <Select
                  value={newService.category}
                  onValueChange={(value) =>
                    setNewService({ ...newService, category: value })
                  }
                >
                  <SelectTrigger id="service-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="massage">Massage</SelectItem>
                    <SelectItem value="sauna">Sauna</SelectItem>
                    <SelectItem value="packages">Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-image">Image URL</Label>
                <Input
                  id="service-image"
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={newService.image}
                  onChange={(e) =>
                    setNewService({ ...newService, image: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Available Times</Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={newService.availabilityInput}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        availabilityInput: e.target.value,
                      })
                    }
                    placeholder="Add available times"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddAvailability}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {newService.availability.map((time, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="pr-1 flex items-center gap-1"
                    >
                      {time}
                      <button
                        type="button"
                        className="ml-1 rounded-full hover:bg-gray-200 p-1"
                        onClick={() => handleRemoveAvailability(time)}
                      >
                        <X size={10} />
                      </button>
                    </Badge>
                  ))}
                  {newService.availability.length === 0 && (
                    <span className="text-xs text-gray-500">
                      No times added yet
                    </span>
                  )}
                </div>
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
                Create Service
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
