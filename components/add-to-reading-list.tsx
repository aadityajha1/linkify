"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddToReadingListProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    content: string;
  };
}

export default function AddToReadingListComponent({
  isOpen,
  onClose,
  post,
}: AddToReadingListProps) {
  const [listName, setListName] = useState("My Reading List");

  const handleAdd = () => {
    // In a real application, you would add the post to the reading list here
    console.log(`Adding post ${post.id} to reading list: ${listName}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle>Add to Reading List</DialogTitle>
          <DialogDescription>
            Choose a reading list to add this post to, or create a new one.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="list-name" className="text-right">
              List Name
            </Label>
            <Input
              id="list-name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add to List</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
