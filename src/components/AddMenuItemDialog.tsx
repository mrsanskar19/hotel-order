'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { postData,getData,putData } from "@/lib/api";

type AddMenuItemDialogProps = {
  itemId?: number;
  onSave: () => void;
  triggerText?: string;
};

export function AddMenuItemDialog({ itemId, onSave, triggerText }: AddMenuItemDialogProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState<number>(0);
  const [foodType, setFoodType] = React.useState("veg");
  const [images, setImages] = React.useState<File[]>([]);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [categoryId, setCategoryId] = React.useState<number | null>(null);

  const { hotelIdAdmin  } = useAppData();

  // Fetch categories
  React.useEffect(() => {
    if (!hotelIdAdmin) return;
    (async () => {
      try {
        const data = await getData(`hotel/${hotelIdAdmin}/categories`);
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    })();
  }, [hotelIdAdmin]);

  // Fetch item data if editing
  React.useEffect(() => {
    if (!itemId || !hotelIdAdmin) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getData(`hotel/${hotelIdAdmin}/items/${itemId}`);
        console.log(data,"djhkjs")
        setName(data.name || "");
        const [type, ...descParts] = (data.description || "").split(":");
        if (descParts.length > 0 && ["veg", "non-veg"].includes(type)) {
          setFoodType(type);
          setDescription(descParts.join(":").trim());
        } else {
          setDescription(data.description || "");
        }
        setPrice(data.price || 0);
        setImageUrls(data.images || []);
        setCategoryId(data.category_id || null);
      } catch (err) {
        console.error("Failed to load item", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [itemId, hotelIdAdmin]);

  // Upload to Cloudinary
  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    const cloudName = "djowkrpwk";
    const uploadPreset = "Foodslinkx";
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) uploadedUrls.push(data.secure_url);
    }
    return uploadedUrls;
  };

  const handleSave = async () => {
    try {
      if (!hotelIdAdmin) throw new Error("No hotelId set");
      if (!categoryId) throw new Error("No category selected");

      setLoading(true);

      let uploadedUrls;
      if (images.length > 0) {
        uploadedUrls = await uploadImages(images);
      }

      console.log(uploadedUrls)

      const payload = {
        category_id: categoryId,
        hotel_id: hotelIdAdmin,
        name,
        description: `${foodType}: ${description}`,
        price,
        img:uploadedUrls[0],
        available: true,
      };

      const url = itemId ? `hotel/${hotelIdAdmin}/items/${itemId}` : `hotel/${hotelIdAdmin}/items`;
      const method = itemId ? await putData(url, payload) : await postData(url, payload);
      console.log(method)
      onSave();

      if (!itemId) {
        setName("");
        setDescription("");
        setPrice(0);
        setFoodType("veg");
        setImages([]);
        setImageUrls([]);
        setCategoryId(null);
      }
    } catch (err) {
      console.error("Failed to save item", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant={itemId ? "outline" : "destructive"} className={`gap-1`}>
          {itemId ? "" : <PlusCircle className="h-3.5 w-3.5" />}
          {triggerText || (itemId ? 'Edit Item' : 'Add Item')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{itemId ? "Edit Item" : "Add New Item"}</DialogTitle>
          <DialogDescription>
            {itemId ? "Update the menu item details below." : "Fill in details to add a new item."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Category Selector */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Category</Label>
            <Select value={categoryId?.toString() || ""} onValueChange={(val) => setCategoryId(parseInt(val))}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.category_id} value={cat.category_id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} disabled={loading} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>

          {/* Food Type */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="foodType" className="text-right">
              Type
            </Label>
            <RadioGroup defaultValue="veg" value={foodType} onValueChange={setFoodType} className="flex items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="veg" id="veg" />
                <Label htmlFor="veg">Veg</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-veg" id="non-veg" />
                <Label htmlFor="non-veg">Non-Veg</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" value={description} disabled={loading} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" type="number" value={price} disabled={loading} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} className="col-span-3" />
          </div>

          {/* Images */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Images
            </Label>
            <Input id="images" type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files || []))} className="col-span-3" />
          </div>
        </div>

        {imageUrls.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt="uploaded" className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export function AddCategoryDialog({ itemId, onSave, triggerText }: AddMenuItemDialogProps) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { hotelIdAdmin  } = useAppData();

  React.useEffect(() => {
    if (!itemId) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getData(`hotel/${hotelIdAdmin}/categories/${itemId}`);
        setName(data.name || '');
        setDescription(data.description || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [itemId, hotelIdAdmin]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        name,
        description,
      };

      if (!hotelIdAdmin) throw new Error('No hotelId set');

      const url = itemId ? `hotel/${hotelIdAdmin}/categories/${itemId}` : `hotel/${hotelIdAdmin}/categories`;
      const method = itemId ? await putData(url, payload) : await postData(url, payload);
      onSave();

      if (!itemId) {
        setName('');
        setDescription('');
      }
    } catch (err) {
      console.error('Failed to save item', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant={itemId ? "outline" : "destructive"} className={`gap-1`}>
          {itemId ? "" : <PlusCircle className="h-3.5 w-3.5" />}
          {triggerText || (itemId ? 'Edit Category' : 'Add Category')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{itemId ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {itemId ? 'Update the category details below.' : 'Fill in details to add a new category.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} disabled={loading} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={description} disabled={loading} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*
Cloudinary Configuration:

To enable image uploads, you need to set up a Cloudinary account and configure the following environment variables in your .env.local file:

NEXT_PUBLIC_CLOUDINARY_CLOUD="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_PRESET="your_upload_preset"

Replace "your_cloud_name" and "your_upload_preset" with your actual Cloudinary credentials.
*/
