"use client";

import { trpc } from "@/server/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Spellbook() {
  const spellbooks = trpc.spellbooks.get.useQuery();
  const addSpellbook = trpc.spellbooks.create.useMutation();
  const delSpellbook = trpc.spellbooks.delete.useMutation();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addNewSpellbook = () => {
    addSpellbook.mutate({
      title,
      description,
    },
    {
      onSettled: () => spellbooks.refetch(),
    });

    setTitle("");
    setDescription("");
  };

  const deleteSpellBook= (id: number) => {
    delSpellbook.mutate(
      {
        id,
      },
      {
        onSettled: () => spellbooks.refetch(),
      }
    );
  };

  return (
    <div className="grid grid-cols-4 gap-5 whitespace-nowrap overflow-x-hidden">
      {spellbooks.data?.map((spellbook) => (
        <Link key={spellbook.id} href={`/spellbook/${spellbook.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{spellbook.title}</CardTitle>
              <CardDescription>{spellbook.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
              {spellbook.spells.map((spell) => (
                <Image
                  key={spell.id}
                  src={spell.image ?? ""}
                  width={30}
                  height={30}
                  alt={spell.title}
                />
              ))}
              </div>
              <div className="flex justify-between items-center mt-2">
              <Button onClick={(e) =>{
                e.stopPropagation();
                e.preventDefault();
                deleteSpellBook(spellbook.id)}}>Delete</Button>
                </div>
            </CardContent>
          </Card>
        </Link>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex justify-center items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your spellbook</DialogTitle>
            <DialogDescription>
              Create your collection of spells.
            </DialogDescription>
            <div className="flex flex-col gap-3">
              <p>Title:</p>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <p>Description:</p>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button onClick={addNewSpellbook}>Save</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}