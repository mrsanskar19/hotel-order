'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';
import { postData } from '@/lib/api';
import { Switch } from '@/components/ui/switch';
import { useAppData } from '@/hooks/useAppData';

interface AddMenuItemDialogProps {
  itemId?: string;
  onSave: () => void;
  triggerText?: string;
}

export function AddMenuItemDialog({ itemId, onSave, triggerText }: AddMenuItemDialogProps) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState<number>(0);
  const [discount, setDiscount] = React.useState<number>(0);
  const [isCustomized, setIsCustomized] = React.useState(false);
  const [inStock, setInStock] = React.useState(true);
  const [images, setImages] = React.useState<File[]>([]);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { hotelId } = useAppData();

  // fetch existing item for edit
  React.useEffect(() => {
    if (!itemId) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`hotel/${hotelId}/items/${itemId}`);
        const data = await res.json();
        setName(data.name || '');
        setDescription(data.description || '');
        setPrice(data.price || 0);
        setDiscount(data.discount || 0);
        setIsCustomized(data.isCustomized || false);
        setInStock(data.inStock ?? true);
        setImageUrls(data.images || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [itemId]);

  // upload to cloudinary
  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!); // configure in .env

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) uploadedUrls.push(data.secure_url);
    }
    return uploadedUrls;
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // upload any new images
      let uploadedUrls: string[] = [];
      if (images.length > 0) {
        uploadedUrls = await uploadImages(images);
      }

      // prepare payload
      const payload = {
        category_id: 1, 
        hotel_id: hotelId!,
        name,
        description,
        price,
        
        available:true,
      };

      if (!hotelId) throw new Error('No hotelId set');

      const savedItem = await postData(`hotel/${hotelId}/items`, payload);
      onSave();
      console.log('Saved item:', savedItem);

      if (!itemId) {
        setName('');
        setDescription('');
        setPrice(0);
        setDiscount(0);
        setIsCustomized(false);
        setInStock(true);
        setImages([]);
        setImageUrls([]);
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
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          {triggerText || (itemId ? 'Edit Item' : 'Add Item')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{itemId ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          <DialogDescription>
            {itemId ? 'Update the menu item details below.' : 'Fill in details to add a new item.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} disabled={loading} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>

          {/* description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={description} disabled={loading} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>

          {/* price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" type="number" value={price} disabled={loading} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} className="col-span-3" />
          </div>

          {/* discount */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discount" className="text-right">Discount (%)</Label>
            <Input id="discount" type="number" value={discount} disabled={loading} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} className="col-span-3" />
          </div>

          {/* isCustomized */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isCustomized" className="text-right">Customizable</Label>
            <Switch checked={isCustomized} onCheckedChange={setIsCustomized} />
          </div>

          {/* inStock */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inStock" className="text-right">In Stock</Label>
            <Switch checked={inStock} onCheckedChange={setInStock} />
          </div>

          {/* images */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">Images</Label>
            <Input id="images" type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files || []))} className="col-span-3" />
          </div>
        </div>

        {/* preview uploaded images */}
        {imageUrls.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt="uploaded" className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export function AddCategroyDialog({ itemId, onSave, triggerText }: AddMenuItemDialogProps) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { hotelId } = useAppData();

  // fetch existing item for edit 
  React.useEffect(() => {
    if (!itemId) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`hotel/${hotelId}/categories/${itemId}`);
        const data = await res.json();
        setName(data.name || '');
        setDescription(data.description || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [itemId]);

  const handleSave = async () => {
    try {
      setLoading(true);

      // prepare payload
      const payload = {
        hotel_id: hotelId!,
        name,
        description,
      };

      if (!hotelId) throw new Error('No hotelId set');

      const savedItem = await postData(`hotel/${hotelId}/categories`, payload);
      onSave();
      console.log('Saved item:', savedItem);

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
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
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
          {/* name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} disabled={loading} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          
          {/* description */}
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