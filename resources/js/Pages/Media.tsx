import { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Search, Upload, Edit, Trash2, Play, Pause, RotateCcw, Folder, ChevronRight, ChevronUp, Plus, Info, X } from 'lucide-react'
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/Components/ui/breadcrumb"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog"
import { Progress } from "@/Components/ui/progress"

type Video = {
  id: string
  title: string
  duration: string
  thumbnail: string
}

type Folder = {
  id: string
  name: string
  items: (Folder | Video)[]
}

function UploadDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (isUploading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            setIsUploading(false)
            return 100
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 100)
        })
      }, 500)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isUploading])

  const handleUpload = () => {
    setIsUploading(true)
    setProgress(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Загрузка видео</DialogTitle>
          <DialogDescription>
            Выберите видеофайл для загрузки в текущую папку.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Input id="video-file" type="file" accept="video/*" disabled={isUploading} />
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Загрузка..." : "Загрузить"}
            </Button>
          </div>
          {isUploading && (
            <div className="space-y-2">
              <Progress value={progress} max={100} />
              <p className="text-sm text-center">{Math.round(progress)}%</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Media() {
    const [rootFolder, setRootFolder] = useState<Folder>({
        id: 'root',
        name: 'Корневая папка',
        items: [
            {
                id: 'folder1',
                name: 'Рекламные ролики',
                items: [
                    { id: '1', title: 'Рекламный ролик 1', duration: '00:30', thumbnail: '/placeholder.svg?height=80&width=120' },
                    { id: '2', title: 'Рекламный ролик 2', duration: '00:45', thumbnail: '/placeholder.svg?height=80&width=120' },
                ]
            },
            {
                id: 'folder2',
                name: 'Новости',
                items: [
                    { id: '3', title: 'Новостной выпуск 1', duration: '15:00', thumbnail: '/placeholder.svg?height=80&width=120' },
                    { id: '4', title: 'Новостной выпуск 2', duration: '12:30', thumbnail: '/placeholder.svg?height=80&width=120' },
                ]
            },
            { id: '5', title: 'Интервью с экспертом', duration: '05:45', thumbnail: '/placeholder.svg?height=80&width=120' },
        ]
    })

    const [currentPath, setCurrentPath] = useState<string[]>(['root'])
    const [selectedItem, setSelectedItem] = useState<Video | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

    const getCurrentFolder = (): Folder => {
        let current: Folder = rootFolder
        for (const id of currentPath.slice(1)) {
            current = current.items.find(item => 'items' in item && item.id === id) as Folder
        }
        return current
    }

    const currentFolder = getCurrentFolder()

    const filteredItems = currentFolder.items.filter(item => 
        'title' in item ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) :
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleItemClick = (item: Folder | Video) => {
        if ('items' in item) {
            setCurrentPath([...currentPath, item.id])
            setSelectedItem(null)
        } else {
            setSelectedItem(item)
        }
    }

    const handleBreadcrumbClick = (index: number) => {
        setCurrentPath(currentPath.slice(0, index + 1))
        setSelectedItem(null)
    }

    const handleNewFolder = () => {
        const newFolder: Folder = {
            id: `folder${Date.now()}`,
            name: 'Новая папка',
            items: []
        }
        setRootFolder(prevRoot => {
            let current = {...prevRoot}
            for (const id of currentPath.slice(1)) {
                const index = current.items.findIndex(item => 'items' in item && item.id === id)
                current.items[index] = {...current.items[index] as Folder}
                current = current.items[index] as Folder
            }
            current.items = [...current.items, newFolder]
            return prevRoot
        })
    }

    const handleGoUp = () => {
        if (currentPath.length > 1) {
            setCurrentPath(currentPath.slice(0, -1))
            setSelectedItem(null)
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Media" />

            <div className="flex h-full bg-background">
                <ScrollArea className="w-1/3 p-2 border-r flex flex-col h-full">
                    <div className="mb-2">
                        <Input
                            type="search"
                            placeholder="Поиск видео..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Breadcrumb className="mb-2">
                        {currentPath.map((path, index) => (
                            <BreadcrumbItem key={path}>
                                <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
                                    {index === 0 ? 'Корневая папка' : getCurrentFolder().name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumb>
                    <ScrollArea className="flex-grow mb-2">
                        {currentPath.length > 1 && (
                            <Card 
                                className="mb-2 cursor-pointer"
                                onClick={handleGoUp}
                            >
                                <CardContent className="flex items-center p-2">
                                    <ChevronUp className="w-8 h-8 mr-3" />
                                    <div>
                                        <h3 className="font-medium">...</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {filteredItems.map(item => (
                            <Card 
                                key={item.id} 
                                className={`mb-2 cursor-pointer ${selectedItem?.id === item.id ? 'border-primary' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <CardContent className="flex items-center p-2">
                                    {'items' in item ? (
                                        <Folder className="w-8 h-8 mr-3" />
                                    ) : (
                                        <img src={item.thumbnail} alt={item.title} className="w-20 h-12 object-cover mr-3" />
                                    )}
                                    <div>
                                        <h3 className="font-medium">{'items' in item ? item.name : item.title}</h3>
                                        {'duration' in item && <p className="text-sm text-muted-foreground">{item.duration}</p>}
                                    </div>
                                    {'items' in item && <ChevronRight className="ml-auto" />}
                                </CardContent>
                            </Card>
                        ))}
                    </ScrollArea>
                    <Card>
                        <CardContent className="p-2">
                            <h3 className="font-medium mb-2 flex items-center">
                                <Info className="w-4 h-4 mr-2" />
                                Информация о текущей папке
                            </h3>
                            <p>Название: {currentFolder.name}</p>
                            <p>Количество элементов: {currentFolder.items.length}</p>
                            <p>Путь: {currentPath.join(' / ')}</p>
                        </CardContent>
                    </Card>
                </ScrollArea>
                <ScrollArea className="flex-1 p-2 flex flex-col h-full">
                    <div className="flex justify-between mb-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={handleNewFolder}>
                                        <Plus className="mr-2 h-4 w-4" /> Новая папка
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Создать новую папку</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => setIsUploadDialogOpen(true)}>
                                        <Upload className="mr-2 h-4 w-4" /> Загрузить видео
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Загрузить новое видео</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <ScrollArea className="flex-1">
                        {selectedItem ? (
                            <div className="pr-4">
                                <ScrollArea className="h-[calc(100vh-250px)]">
                                    <div className="aspect-video bg-black mb-4">
                                        <img src={selectedItem.thumbnail} alt={selectedItem.title} className="w-full h-full object-contain" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                                    <p className="text-muted-foreground mb-4">Продолжительность: {selectedItem.duration}</p>
                                    <div className="flex space-x-2 mb-4">
                                        <Button><Play className="mr-2 h-4 w-4" /> Воспроизвести</Button>
                                        <Button variant="outline"><Pause className="mr-2 h-4 w-4" /> Пауза</Button>
                                        <Button variant="outline"><RotateCcw className="mr-2 h-4 w-4" /> Перемотать</Button>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Редактировать</Button>
                                        <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Удалить</Button>
                                    </div>
                                </ScrollArea>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-muted-foreground">
                                Выберите видео для просмотра деталей
                            </div>
                        )}
                    </ScrollArea>
                </ScrollArea>
            </div>
            <UploadDialog 
                isOpen={isUploadDialogOpen} 
                onClose={() => setIsUploadDialogOpen(false)} 
            />
        </AuthenticatedLayout>
    );
}
