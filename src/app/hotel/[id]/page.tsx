"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Star, PlusCircle, Settings2, Leaf, Beef } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";

import { ItemDetailsSheet } from "@/components/item-details-sheet";
import { CartSheet } from "@/components/cart-sheet";
import { ReviewDialog } from "@/components/review-dialog";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/bottom-nav";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AdBanner } from "@/components/ad-banner";

import { getData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export type DietFilter = "all" | "veg" | "non-veg";
interface HotelPageProps {
  params: {
    id: string;
  };
}

export default function Home({ params }: HotelPageProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isItemSheetOpen, setIsItemSheetOpen] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>("All");
  const [dietFilter, setDietFilter] = useState<DietFilter>("all");
  const [hotel, setHotel] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cat, setCat] = useState([]);
  const [item, setItem] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id } = useParams();
  const searchParams = useSearchParams();
  const tableId = searchParams.get('table_id');
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleItemClick = (item: MenuItem) => {
    if (!item.available) return;
    setSelectedItem(item);
    setIsItemSheetOpen(true);
  };

  const handleAddToCart = (
    item: MenuItem,
    quantity: number = 1,
    notes?: string,
    fromSheet: boolean = false
  ) => {
    addToCart(item, quantity, tableId);
    if (fromSheet) {
      setIsItemSheetOpen(false);
    }
    toast({
      variant: "success",
      title: "Added to cart!",
      description: `${quantity} x ${item.name} is waiting for you.`,
      duration: 3000,
    });
    if (fromSheet) {
      setTimeout(() => setSelectedItem(null), 300);
    }
  };

  const handleOrderPlaced = () => {
    toast({
      title: "Order Placed!",
      description: "Your order is now active. Click to view.",
      duration: 5000,
      onClick: () => router.push("/orders"),
    });
  };

  const filteredMenuItems = useMemo(() => {
    let itemsToFilter = item;
    if (selectedCategory !== "All") {
        itemsToFilter = itemsToFilter.filter(item => item.category_id === selectedCategory);
    }
    return itemsToFilter.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }, [searchTerm, selectedCategory, item]);

  const handleReviewSubmit = () => {
    toast({
      title: "Review Submitted!",
      description: "Thanks for your feedback.",
      variant: "success",
      duration: 3000,
    });
  };

  useEffect(() => {
    async function fetchHotelData() {
      setLoading(true);
      try {
        const [hotelData, categoriesData, menuData] = await Promise.all([
          getData(`hotel/${id}`),
          getData(`hotel/${id}/categories`),
          getData(`hotel/${id}/items`)
        ]);
        setHotel(hotelData);
        setCat([{ category_id: "All", name: "All" }, ...categoriesData]);
        setItem(menuData);
      } catch (error) {
        console.error("Failed to fetch hotel data:", error);
        toast({ variant: "destructive", title: "Failed to load hotel data." });
      } finally {
        setLoading(false);
      }
    }
    fetchHotelData();
  }, [id, toast]);


  if (loading) {
    return (
        <div className="flex min-h-screen bg-secondary/20">
            <AppSidebar.Skeleton />
            <div className="flex-1 w-full md:pl-[250px]">
                <AppHeader.Skeleton />
                <main className="flex-1 pb-24 md:pb-0">
                    <div className="container py-8">
                        <div className="space-y-8">
                            <Skeleton className="h-10 w-1/4" />
                            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
                            </div>
                             <Skeleton className="h-8 w-1/3 mb-4" />
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-4 bg-card p-3 rounded-lg shadow-sm">
                                        <Skeleton className="h-20 w-20 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                            <Skeleton className="h-4 w-1/4" />
                                        </div>
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
  }

  if (!hotel) {
    return <div className="p-6 text-red-500">Hotel not found</div>;
  }

  return (
    <>
      <div className="flex min-h-screen bg-secondary/20">
        <AppSidebar
          onOpenCart={() => setIsCartSheetOpen(true)}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          name={hotel.name}
          id={hotel.hotel_id}
          tableId={tableId}
        />
        <div className="flex-1 w-full md:pl-[250px]">
          <AppHeader
            onOpenCart={() => setIsCartSheetOpen(true)}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            name={hotel.name}
            tableId={tableId}
          />
          <main className="flex-1 pb-24 md:pb-0">
            <div className="container py-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold font-headline mb-4">
                    Categories
                  </h2>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                    {cat.map((category) => (
                      <Button
                        key={category?.category_id}
                        variant={
                          selectedCategory === category.category_id
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setSelectedCategory(category.category_id)
                        }
                        className="shrink-0 rounded-full"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <AdBanner adSlot="leaderboard_atf" />

                <section>
                  <h2 className="text-3xl font-bold font-headline mb-4">
                    {selectedCategory === "All" ? "Full Menu" : cat.find(c => c.category_id === selectedCategory)?.name}
                  </h2>
                  {filteredMenuItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredMenuItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <div
                            className={cn(
                              "flex items-start gap-4 bg-card p-3 rounded-lg shadow-sm transition-all duration-300 group",
                              item.available
                                ? "hover:shadow-md hover:bg-secondary/40 cursor-pointer"
                                : "opacity-60 cursor-not-allowed"
                            )}
                            onClick={() => handleItemClick(item)}
                          >
                           <div className="relative h-20 w-20 flex-shrink-0">
                              <Image
                                src={item?.img || '/placeholder.svg'}
                                alt={item.name}
                                fill
                                style={{objectFit:"cover"}}
                                className={cn("rounded-full", !item.available && "grayscale")}
                                data-ai-hint="food meal"
                              />
                              {!item.available && (
                                <Badge
                                  variant="destructive"
                                  className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4"
                                >
                                  Unavailable
                                </Badge>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-headline text-base truncate">
                                {item?.name}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  <span>{item?.rating || "4.5"}</span>
                                </div>
                                <span>·</span>
                                <p className="font-bold">
                                  ₹{item?.price?.toFixed(2)}
                                </p>
                                {item?.customizable && (
                                  <>
                                    <span>·</span>
                                    <div className="flex items-center gap-1 text-blue-500">
                                      <Settings2 className="w-3 h-3" />
                                      <span>Customizable</span>
                                    </div>
                                  </>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 truncate hidden sm:block">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex-shrink-0 self-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 rounded-full group-hover:bg-green-500/20 bg-green-500/10 disabled:bg-muted disabled:pointer-events-none"
                                disabled={!item.available}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(item);
                                }}
                              >
                                <PlusCircle className="w-7 h-7 text-green-500 transition-transform group-hover:scale-110" />
                              </Button>
                            </div>
                          </div>
                          {(index + 1) % 8 === 0 && (
                            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                              <AdBanner adSlot="in_feed_banner" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            No items found in this category.
                        </div>
                    )}
                </section>
              </div>
            </div>
          </main>
        </div>

        <ItemDetailsSheet
          item={selectedItem}
          isOpen={isItemSheetOpen}
          onOpenChange={(isOpen) => {
            setIsItemSheetOpen(isOpen);
            if (!isOpen) {
              setTimeout(() => setSelectedItem(null), 300);
            }
          }}
          onAddToCart={(item, quantity, notes) =>
            handleAddToCart(item, quantity, notes, true)
          }
          onWriteReview={() => {
            setIsItemSheetOpen(false);
            setTimeout(() => setIsReviewDialogOpen(true), 300);
          }}
        />

        <CartSheet
          isOpen={isCartSheetOpen}
          onOpenChange={setIsCartSheetOpen}
          onOrderPlaced={handleOrderPlaced}
          tableId={tableId}
        />

        <ReviewDialog
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          itemId={selectedItem?.id}
          onSubmit={handleReviewSubmit}
        />

        <BottomNav onOpenCart={() => setIsCartSheetOpen(true)} />
      </div>
    </>
  );
}
