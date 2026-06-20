"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Palette,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ArrowLeft,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const presetBackgrounds = [
  { name: "Transparent", value: "transparent", color: "bg-[url('/checker.svg')]" },
  { name: "White", value: "#ffffff", color: "bg-white" },
  { name: "Black", value: "#000000", color: "bg-black" },
  { name: "Blue", value: "#3b82f6", color: "bg-blue-500" },
  { name: "Red", value: "#ef4444", color: "bg-red-500" },
  { name: "Green", value: "#22c55e", color: "bg-green-500" },
  { name: "Purple", value: "#8b5cf6", color: "bg-violet-500" },
  { name: "Pink", value: "#ec4899", color: "bg-pink-500" },
];

const gradientPresets = [
  { name: "Sunset", value: "linear-gradient(135deg, #f093fb, #f5576c)", className: "bg-gradient-to-br from-fuchsia-400 to-rose-500" },
  { name: "Ocean", value: "linear-gradient(135deg, #4facfe, #00f2fe)", className: "bg-gradient-to-br from-blue-400 to-cyan-400" },
  { name: "Forest", value: "linear-gradient(135deg, #43e97b, #38f9d7)", className: "bg-gradient-to-br from-emerald-400 to-teal-300" },
  { name: "Dusk", value: "linear-gradient(135deg, #a18cd1, #fbc2eb)", className: "bg-gradient-to-br from-purple-300 to-pink-200" },
  { name: "Fire", value: "linear-gradient(135deg, #f83600, #f9d423)", className: "bg-gradient-to-br from-orange-600 to-yellow-400" },
  { name: "Night", value: "linear-gradient(135deg, #0c0c1d, #3a3a6e)", className: "bg-gradient-to-br from-slate-900 to-indigo-900" },
];

const studioBackgrounds = [
  { name: "Studio Light", type: "studio" },
  { name: "Office", type: "office" },
  { name: "Nature", type: "nature" },
  { name: "E-commerce", type: "ecommerce" },
  { name: "Blurred", type: "blur" },
  { name: "Abstract", type: "abstract" },
];

export default function EditorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compareMode, setCompareMode] = useState<"side" | "slider">("slider");
  const [sliderPosition, setSliderPosition] = useState([50]);
  const [selectedBg, setSelectedBg] = useState("transparent");
  const [zoom, setZoom] = useState(100);
  const [downloadFormat, setDownloadFormat] = useState("png");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        processImage();
      };
      reader.readAsDataURL(file);
    }
  }, []);

  function processImage() {
    setIsProcessing(true);
    setTimeout(() => {
      setProcessedImage("/demo-processed.png");
      setIsProcessing(false);
    }, 2000);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxFiles: 1,
  });

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border/40 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-indigo-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold">BackgroundAI Editor</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Undo">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Redo">
            <Redo2 className="h-4 w-4" />
          </Button>
          <div className="mx-2 h-6 w-px bg-border" />
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(25, zoom - 25))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-sm text-muted-foreground">{zoom}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 25))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="mx-2 h-6 w-px bg-border" />
          <Select value={downloadFormat} onValueChange={setDownloadFormat}>
            <SelectTrigger className="w-24 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="webp">WEBP</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="gradient" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 bg-muted/30">
          {!uploadedImage ? (
            <div
              {...getRootProps()}
              className={`w-full max-w-2xl cursor-pointer rounded-2xl border-2 border-dashed p-16 text-center transition-all ${
                isDragActive
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-border/60 hover:border-violet-500/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20">
                  <Upload className="h-10 w-10 text-violet-500" />
                </div>
                <div>
                  <p className="text-xl font-medium">Drop your image here</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    or click to browse. Supports JPG, PNG, WEBP
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-2xl">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-32"
                  >
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
                    <p className="text-lg font-medium">AI is processing your image...</p>
                    <p className="text-sm text-muted-foreground">This usually takes 3-5 seconds</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-xl border border-border/50 shadow-2xl"
                    style={{ transform: `scale(${zoom / 100})` }}
                  >
                    {compareMode === "slider" && processedImage ? (
                      <div className="relative aspect-video w-full bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="h-24 w-24 text-muted-foreground/20" />
                        </div>
                        <div className="absolute inset-0 text-center pt-8">
                          <p className="text-sm font-medium text-muted-foreground">
                            Image preview area
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload an image to see the before/after comparison
                          </p>
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                          <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs text-white backdrop-blur-sm">
                            <SlidersHorizontal className="h-3 w-3" />
                            Drag to compare
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-0.5 bg-border">
                        <div className="relative aspect-video bg-muted flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs font-medium text-muted-foreground">Original</p>
                          </div>
                        </div>
                        <div className="relative aspect-video bg-muted flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs font-medium text-muted-foreground">Processed</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {processedImage && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Button
                    variant={compareMode === "slider" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setCompareMode("slider")}
                  >
                    <SlidersHorizontal className="mr-2 h-3 w-3" />
                    Slider
                  </Button>
                  <Button
                    variant={compareMode === "side" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setCompareMode("side")}
                  >
                    <Layers className="mr-2 h-3 w-3" />
                    Side by Side
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setUploadedImage(null); setProcessedImage(null); }}>
                    <RotateCcw className="mr-2 h-3 w-3" />
                    New Image
                  </Button>
                </div>
              )}

              {compareMode === "slider" && processedImage && (
                <div className="mt-4 px-8">
                  <Slider
                    value={sliderPosition}
                    onValueChange={setSliderPosition}
                    max={100}
                    step={1}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 overflow-y-auto border-l border-border/40 bg-background">
          <Tabs defaultValue="background" className="p-4">
            <TabsList className="w-full">
              <TabsTrigger value="background" className="flex-1">
                <Palette className="mr-1 h-3 w-3" />
                Background
              </TabsTrigger>
              <TabsTrigger value="adjust" className="flex-1">
                <SlidersHorizontal className="mr-1 h-3 w-3" />
                Adjust
              </TabsTrigger>
            </TabsList>

            <TabsContent value="background" className="space-y-6 pt-4">
              {/* Solid Colors */}
              <div>
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Solid Colors
                </Label>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {presetBackgrounds.map((bg) => (
                    <button
                      key={bg.value}
                      onClick={() => setSelectedBg(bg.value)}
                      className={`group relative h-12 w-full rounded-lg border-2 transition-all ${bg.color} ${
                        selectedBg === bg.value
                          ? "border-violet-500 ring-2 ring-violet-500/20"
                          : "border-border/50 hover:border-violet-500/30"
                      }`}
                      title={bg.name}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium opacity-0 group-hover:opacity-100 bg-black/40 text-white rounded-[6px] transition-opacity">
                        {bg.name}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <Label htmlFor="custom-color" className="text-xs">Custom Color</Label>
                  <div className="mt-1 flex gap-2">
                    <input
                      id="custom-color"
                      type="color"
                      value={selectedBg.startsWith("#") ? selectedBg : "#ffffff"}
                      onChange={(e) => setSelectedBg(e.target.value)}
                      className="h-10 w-14 cursor-pointer rounded-md border border-border"
                    />
                    <input
                      type="text"
                      value={selectedBg}
                      onChange={(e) => setSelectedBg(e.target.value)}
                      className="flex-1 rounded-md border border-input bg-background px-3 text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              {/* Gradients */}
              <div>
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Gradients
                </Label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {gradientPresets.map((gradient) => (
                    <button
                      key={gradient.name}
                      onClick={() => setSelectedBg(gradient.value)}
                      className={`group relative h-16 w-full rounded-lg border-2 transition-all ${gradient.className} ${
                        selectedBg === gradient.value
                          ? "border-violet-500 ring-2 ring-violet-500/20"
                          : "border-border/50 hover:border-violet-500/30"
                      }`}
                      title={gradient.name}
                    >
                      <span className="absolute bottom-0.5 left-0 right-0 text-center text-[10px] font-medium text-white drop-shadow-sm">
                        {gradient.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Studio Backgrounds */}
              <div>
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Studio Backgrounds
                </Label>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {studioBackgrounds.map((bg) => (
                    <button
                      key={bg.name}
                      onClick={() => setSelectedBg(bg.type)}
                      className={`flex h-20 items-center justify-center rounded-lg border-2 bg-muted text-xs font-medium transition-all ${
                        selectedBg === bg.type
                          ? "border-violet-500 ring-2 ring-violet-500/20"
                          : "border-border/50 hover:border-violet-500/30"
                      }`}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Custom */}
              <div>
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Custom Background
                </Label>
                <div className="mt-3">
                  <button className="flex h-20 w-full items-center justify-center rounded-lg border-2 border-dashed border-border/60 text-sm text-muted-foreground transition-all hover:border-violet-500/50 hover:text-foreground">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Background
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="adjust" className="space-y-6 pt-4">
              <div>
                <Label className="text-xs">Brightness</Label>
                <Slider defaultValue={[100]} max={200} step={1} className="mt-2" />
              </div>
              <div>
                <Label className="text-xs">Contrast</Label>
                <Slider defaultValue={[100]} max={200} step={1} className="mt-2" />
              </div>
              <div>
                <Label className="text-xs">Saturation</Label>
                <Slider defaultValue={[100]} max={200} step={1} className="mt-2" />
              </div>
              <div>
                <Label className="text-xs">Blur Background</Label>
                <Slider defaultValue={[0]} max={20} step={1} className="mt-2" />
              </div>
              <div>
                <Label className="text-xs">Edge Refinement</Label>
                <Slider defaultValue={[5]} max={10} step={1} className="mt-2" />
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <RotateCcw className="mr-2 h-3 w-3" />
                Reset Adjustments
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
