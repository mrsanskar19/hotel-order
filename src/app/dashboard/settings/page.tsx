'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Restaurant Details</CardTitle>
              <CardDescription>
                Manage your restaurant's public information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="restaurant-name">Name</Label>
                <Input
                  id="restaurant-name"
                  defaultValue="GastronomeOS Modern Eatery"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="A contemporary restaurant offering a fusion of classic and modern cuisine in a chic and inviting atmosphere."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contact Information</CardTitle>
              <CardDescription>
                Update your contact details for customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="(123) 456-7890" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="contact@gastronomeos.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  defaultValue="123 Culinary Lane, Foodie City, 10101"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Service Settings</CardTitle>
              <CardDescription>
                Manage service times and charges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="wait-time">Avg. Wait Time (min)</Label>
                  <Input id="wait-time" type="number" defaultValue="25" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="delivery-time">Avg. Delivery Time (min)</Label>
                  <Input id="delivery-time" type="number" defaultValue="45" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="8.5" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service-charge">Service Charge (%)</Label>
                  <Input
                    id="service-charge"
                    type="number"
                    defaultValue="15"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Status</CardTitle>
              <CardDescription>
                Control your restaurant's online status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="status" className="flex flex-col space-y-1">
                    <span>Restaurant Open</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Allow customers to place new orders.
                    </span>
                  </Label>
                  <Switch
                    id="status"
                    aria-label="Toggle restaurant status"
                    defaultChecked
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
                <Button>Save All Changes</Button>
                <Button variant="outline">Discard Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
