import React from "react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function Howto() {
  return (
    <div className=" flex items-center justify-center mt-10 mb-10">
      <section className="py-10 bg-slate-50 rounded-3xl">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">See how it works</h2>
        <p className="text-slate-600 mb-10">
          Discover how our platform helps you plan your next dream vacation in just a few clicks.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl lg:h-100 lg:w-150 ">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Video thumbnail"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform group-hover:scale-110">
                  <Play className="w-8 h-8 text-blue-600 fill-blue-600" />
                </div>
              </div>

            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black border-none">
            <DialogHeader className="sr-only">
              <DialogTitle>How it works video</DialogTitle>
            </DialogHeader>
            <AspectRatio ratio={16 / 9}>
              <iframe
                width="100%"
                height="100%"
                src={null}
                title="How it works"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </AspectRatio>
          </DialogContent>
        </Dialog>
      </div>
    </section>
    </div>
  )
}

export default Howto
