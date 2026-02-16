import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { ChevronLeft, ChevronRight, Plus, Clock, Calendar as CalendarIcon, Eye, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { format, addMinutes, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type ScheduleItem = {
    id: number
    title: string
    type: 'program' | 'ad' | 'announcement' | 'live'
    startTime: string
    duration: number // in minutes
    status: 'past' | 'current' | 'upcoming'
}

type ScheduleBlock = {
    id: number
    title: string
    items: ScheduleItem[]
}

export default function Schedule() {
    const [date, setDate] = useState<Date>(new Date());
    const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
    const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>([
        {
            id: 1,
            title: "Утреннее шоу",
            items: [
                { id: 1, title: "Анонс", type: "announcement", startTime: "06:55", duration: 5, status: "past" },
                { id: 2, title: "Утреннее шоу", type: "program", startTime: "07:00", duration: 120, status: "current" },
                { id: 3, title: "Рекламная пауза", type: "ad", startTime: "07:30", duration: 5, status: "upcoming" },
                { id: 4, title: "Утреннее шоу (продолжение)", type: "program", startTime: "07:35", duration: 85, status: "upcoming" },
                { id: 5, title: "Рекламная пауза", type: "ad", startTime: "09:00", duration: 5, status: "upcoming" },
            ]
        },
        {
            id: 2,
            title: "Новости",
            items: [
                { id: 6, title: "Анонс новостей", type: "announcement", startTime: "09:55", duration: 5, status: "upcoming" },
                { id: 7, title: "Новости", type: "program", startTime: "10:00", duration: 30, status: "upcoming" },
                { id: 8, title: "Рекламная пауза", type: "ad", startTime: "10:30", duration: 5, status: "upcoming" },
            ]
        },
        {
            id: 3,
            title: "Прямой эфир: Интервью",
            items: [
                { id: 9, title: "Анонс интервью", type: "announcement", startTime: "10:55", duration: 5, status: "upcoming" },
                { id: 10, title: "Прямой эфир: Интервью", type: "live", startTime: "11:00", duration: 60, status: "upcoming" },
                { id: 11, title: "Рекламная пауза", type: "ad", startTime: "12:00", duration: 5, status: "upcoming" },
            ]
        },
    ]);

    const addBlock = (newBlock: Omit<ScheduleBlock, 'id'>) => {
        const id = Math.max(...scheduleBlocks.map(block => block.id)) + 1;
        setScheduleBlocks([...scheduleBlocks, { ...newBlock, id }]);
    };

    const deleteBlock = (id: number) => {
        setScheduleBlocks(scheduleBlocks.filter(block => block.id !== id));
        if (selectedBlockId === id) {
            setSelectedBlockId(null);
        }
    };

    const getTypeColor = (type: ScheduleItem['type']) => {
        switch (type) {
            case 'program':
                return 'bg-blue-500';
            case 'ad':
                return 'bg-yellow-500';
            case 'announcement':
                return 'bg-green-500';
            case 'live':
                return 'bg-red-500';
        }
    };

    const getStatusColor = (status: ScheduleItem['status']) => {
        switch (status) {
            case 'past':
                return 'bg-gray-500';
            case 'current':
                return 'bg-green-500';
            case 'upcoming':
                return 'bg-blue-500';
        }
    };

    const getBlockInfo = (block: ScheduleBlock) => {
        const startTime = block.items[0]?.startTime || '';
        const totalDuration = block.items.reduce((sum, item) => sum + item.duration, 0);
        const endTimeDate = addMinutes(parseISO(`2000-01-01T${startTime}`), totalDuration);
        const endTime = format(endTimeDate, 'HH:mm');
        return { startTime, endTime, totalDuration };
    };

    const selectedBlock = scheduleBlocks.find(block => block.id === selectedBlockId);

    const viewItem = (item: ScheduleItem) => {
        // Implement view functionality
        console.log("Viewing item:", item);
    };

    const editItem = (item: ScheduleItem) => {
        // Implement edit functionality
        console.log("Editing item:", item);
    };

    const deleteItem = (itemId: number) => {
        if (selectedBlock) {
            const updatedItems = selectedBlock.items.filter(item => item.id !== itemId);
            const updatedBlock = { ...selectedBlock, items: updatedItems };
            setScheduleBlocks(scheduleBlocks.map(block => 
                block.id === selectedBlock.id ? updatedBlock : block
            ));
        }
    };

    const onDragEnd = (result: any) => {
        if (!result.destination || !selectedBlock) {
            return;
        }

        const items = Array.from(selectedBlock.items);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedBlock = { ...selectedBlock, items };
        setScheduleBlocks(scheduleBlocks.map(block => 
            block.id === selectedBlock.id ? updatedBlock : block
        ));
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (!selectedBlock) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= selectedBlock.items.length) return;

        const items = Array.from(selectedBlock.items);
        [items[index], items[newIndex]] = [items[newIndex], items[index]];

        const updatedBlock = { ...selectedBlock, items };
        setScheduleBlocks(scheduleBlocks.map(block => 
            block.id === selectedBlock.id ? updatedBlock : block
        ));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= scheduleBlocks.length) return;

        const blocks = Array.from(scheduleBlocks);
        [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];

        setScheduleBlocks(blocks);
    };

    const editBlock = (blockId: number) => {
        // Implement edit block functionality
        console.log("Editing block:", blockId);
    };

    const saveChanges = () => {
        // Implement save changes functionality
        console.log("Changes saved");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Schedule" />
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Расписание трансляций</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" onClick={() => setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)))}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(date, 'd MMMM yyyy', { locale: ru })}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(newDate) => newDate && setDate(newDate)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Button variant="outline" size="icon" onClick={() => setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 1)))}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button><Plus className="mr-2 h-4 w-4" /> Добавить блок</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Добавить новый блок расписания</DialogTitle>
                            </DialogHeader>
                            <AddBlockForm onAdd={addBlock} />
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="md:col-span-1">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Блоки расписания</h2>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm"><Plus className="h-4 w-4" /></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Добавить новый блок расписания</DialogTitle>
                                        </DialogHeader>
                                        <AddBlockForm onAdd={addBlock} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <ScrollArea className="h-[calc(100vh-300px)]">
                                <div className="space-y-2">
                                    {scheduleBlocks.map((block, index) => {
                                        const { startTime, endTime, totalDuration } = getBlockInfo(block);
                                        return (
                                            <div key={block.id} className="flex items-center justify-between">
                                                <Button
                                                    variant={selectedBlockId === block.id ? "default" : "outline"}
                                                    className="w-full justify-start flex-col items-start p-4 h-auto"
                                                    onClick={() => setSelectedBlockId(block.id)}
                                                >
                                                    <div className="flex justify-between w-full">
                                                        <span className="font-medium">{block.title}</span>
                                                        <Badge variant="secondary" className="ml-2">
                                                            {block.items.length} элем.
                                                        </Badge>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mt-1">
                                                        {startTime} - {endTime} ({totalDuration} мин)
                                                    </div>
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    {selectedBlock ? `Элементы блока: ${selectedBlock.title}` : 'Выберите блок'}
                                </h2>
                                {selectedBlock && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm"><Plus className="h-4 w-4" /> Добавить элемент</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Добавление нового элемента блока</DialogTitle>
                                            </DialogHeader>
                                            <AddItemForm onAdd={(item) => {
                                                const updatedBlock = { 
                                                    ...selectedBlock, 
                                                    items: [
                                                        ...selectedBlock.items, 
                                                        { 
                                                            ...item, 
                                                            id: Math.max(...selectedBlock.items.map(i => i.id)) + 1, 
                                                            status: 'upcoming' as 'current' | 'past' | 'upcoming' 
                                                        }
                                                    ] 
                                                };
                                                setScheduleBlocks(scheduleBlocks.map(block => 
                                                    block.id === selectedBlock.id ? updatedBlock : block
                                                ));
                                            }} />
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                            {selectedBlock && (
                                <>
                                    <ScrollArea className="h-[calc(100vh-300px)]">
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId="list">
                                                {(provided) => (
                                                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                                        {selectedBlock.items.map((item, index) => (
                                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                                {(provided) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="flex items-center justify-between p-2 bg-secondary rounded-md"
                                                                    >
                                                                        <div className="flex items-center space-x-2">
                                                                            <Badge variant="secondary" className={`${getTypeColor(item.type)} text-white`}>
                                                                                {item.type}
                                                                            </Badge>
                                                                            <span className="font-medium">{item.title}</span>
                                                                            <span className="text-sm text-muted-foreground">{item.startTime}</span>
                                                                            <span className="text-sm text-muted-foreground">{item.duration}м</span>
                                                                            <Badge variant="outline" className={`${getStatusColor(item.status)} text-white`}>
                                                                                {item.status}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <Button size="sm" variant="ghost" onClick={() => moveItem(index, 'up')} disabled={index === 0}>
                                                                                <ChevronUp className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button size="sm" variant="ghost" onClick={() => moveItem(index, 'down')} disabled={index === selectedBlock.items.length - 1}>
                                                                                <ChevronDown className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button size="sm" variant="ghost" onClick={() => viewItem(item)}>
                                                                                <Eye className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button size="sm" variant="ghost" onClick={() => editItem(item)}>
                                                                                <Edit className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button size="sm" variant="ghost" onClick={() => deleteItem(item.id)}>
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </ScrollArea>
                                    <div className="flex justify-end items-center mt-4 space-x-2">
                                        <Button size="sm" variant="ghost" onClick={() => moveBlock(scheduleBlocks.findIndex(block => block.id === selectedBlock.id), 'up')} disabled={scheduleBlocks.findIndex(block => block.id === selectedBlock.id) === 0}>
                                            <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={() => moveBlock(scheduleBlocks.findIndex(block => block.id === selectedBlock.id), 'down')} disabled={scheduleBlocks.findIndex(block => block.id === selectedBlock.id) === scheduleBlocks.length - 1}>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={() => editBlock(selectedBlock.id)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={() => deleteBlock(selectedBlock.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={saveChanges}>
                                            Сохранить изменения
                                        </Button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function AddBlockForm({ onAdd }: { onAdd: (block: Omit<ScheduleBlock, 'id'>) => void }) {
    const [title, setTitle] = useState('');
    const [items, setItems] = useState<Omit<ScheduleItem, 'id' | 'status'>[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ title, items: items as ScheduleItem[] });
        setTitle('');
        setItems([]);
    };

    const addItem = (item: Omit<ScheduleItem, 'id' | 'status'>) => {
        setItems([...items, item]);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Название блока</label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-700">Элементы блока</h3>
                <ul className="mt-2 space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="text-sm">
                            {item.startTime} - {item.title} ({item.duration}м)
                        </li>
                    ))}
                </ul>
                <AddItemForm onAdd={addItem} />
            </div>
            <Button type="submit">Добавить блок</Button>
        </form>
    );
}

function AddItemForm({ onAdd }: { onAdd: (item: Omit<ScheduleItem, 'id' | 'status'>) => void }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<ScheduleItem['type']>('program');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ title, type, startTime, duration: parseInt(duration) });
        setTitle('');
        setType('program');
        setStartTime('');
        setDuration('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                <label htmlFor="itemTitle" className="block text-sm font-medium text-gray-700">Название</label>
                <Input
                    id="itemTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="itemType" className="block text-sm font-medium text-gray-700">Тип</label>
                <Select value={type} onValueChange={(value: ScheduleItem['type']) => setType(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="program">Программа</SelectItem>
                        <SelectItem value="ad">Реклама</SelectItem>
                        <SelectItem value="announcement">Анонс</SelectItem>
                        <SelectItem value="live">Прямой эфир</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="itemStartTime" className="block text-sm font-medium text-gray-700">Время начала</label>
                <Input
                    type="time"
                    id="itemStartTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="itemDuration" className="block text-sm font-medium text-gray-700">Длительность (в минутах)</label>
                <Input
                    type="number"
                    id="itemDuration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Добавить элемент</Button>
        </form>
    );
}
