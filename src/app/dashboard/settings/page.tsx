"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/hooks/useAppData";
import { getData, postData } from "@/lib/api";

type HotelData = {
  is_active: boolean;
  name?: string;
  hotel_id?: number;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  active_time?: string;
  parcel_available?: boolean;
  username?: string;
  password?: string;
};

export default function SettingsPage() {
  const { hotelId } = useAppData();
  const [data, setData] = useState<HotelData | null>(null);
  const [editedData, setEditedData] = useState<HotelData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEditedData(data);
    setHasChanges(false);
  }, [data]);

  const handleChange = (field: keyof HotelData, value: any) => {
    setEditedData((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [field]: value };
      setHasChanges(JSON.stringify(updated) !== JSON.stringify(data));
      return updated;
    });
  };

  const handleSave = async () => {
    if (!hotelId || !editedData) return;
    setSaving(true);
    try {
      await postData(`hotel/${hotelId}`, editedData);
      setData(editedData);
      setHasChanges(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setEditedData(data);
    setHasChanges(false);
  };

  useEffect(() => {
    if (!hotelId) return;
    getData(`hotel/${hotelId}`)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [hotelId]);

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Restaurant Details
              </CardTitle>
              <CardDescription>
                Manage your restaurant's public information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="restaurant-name">Name</Label>
                <Input
                  id="restaurant-name"
                  value={editedData ? editedData.name || "" : ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedData ? editedData.description || "" : ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Contact Information
              </CardTitle>
              <CardDescription>
                Update your contact details for customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editedData ? editedData.phone || "" : ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedData ? editedData.email || "" : ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editedData ? editedData.address || "" : ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Service Settings</CardTitle>
              <CardDescription>
                Manage service times and charges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="active-time">Active Time</Label>
                  <Input
                    id="active-time"
                    placeholder="09:00 AM - 10:00 PM"
                    value={
                      editedData ? editedData.active_time || "" : ""
                    }
                    onChange={(e) => handleChange("active_time", e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="parcel-available">Parcel Available</Label>
                  <Switch
                    id="parcel-available"
                    checked={!!(editedData && editedData.parcel_available)}
                    onCheckedChange={(val) =>
                      handleChange("parcel_available", val)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-active">Is Active</Label>
                  <Switch
                    id="is-active"
                    checked={!!(editedData && editedData.is_active)}
                    onCheckedChange={(val) => handleChange("is_active", val)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={editedData ? editedData.username || "" : ""}
                    onChange={(e) => handleChange("username", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={editedData ? editedData.password || "" : ""}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {hasChanges && (
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save All Changes"}
                </Button>
              )}
              <Button variant="outline" onClick={handleDiscard} disabled={saving || !hasChanges}>
                Discard Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}