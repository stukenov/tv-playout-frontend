import { useState } from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Play, Pause, Settings, Activity, AlertTriangle, BarChart } from 'lucide-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

// Имитация данных о стримах
const streams = [
  { id: 1, name: 'Основной поток', status: 'active', resolution: '1080p', bitrate: '5000 kbps', fps: 30, delay: 2 },
  { id: 2, name: 'Резервный поток', status: 'standby', resolution: '720p', bitrate: '3000 kbps', fps: 30, delay: 1.5 },
  { id: 3, name: 'Тестовый поток', status: 'error', resolution: '480p', bitrate: '1500 kbps', fps: 24, delay: 3 },
]

const statusColors = {
  active: 'bg-green-500',
  standby: 'bg-yellow-500',
  error: 'bg-red-500',
}

export default function Live() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedStream, setSelectedStream] = useState(null)

  const openSettingsDialog = (stream) => {
    setSelectedStream(stream)
  }

  return (
    <AuthenticatedLayout>
      <Head title="Live Streaming" />

      <div className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Панель управления</TabsTrigger>
            <TabsTrigger value="quickstart">Быстрый старт</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {streams.map((stream) => (
                <Card key={stream.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stream.name}
                    </CardTitle>
                    <div className={`w-3 h-3 rounded-full ${statusColors[stream.status]}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stream.resolution}</div>
                    <p className="text-xs text-muted-foreground">
                      Битрейт: {stream.bitrate} | FPS: {stream.fps} | Задержка: {stream.delay}с
                    </p>
                    <div className="flex mt-4 space-x-2">
                      <Button size="sm">
                        {stream.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => openSettingsDialog(stream)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Настройки потока: {stream.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="resolution" className="text-right">
                                Разрешение
                              </Label>
                              <Input id="resolution" value={stream.resolution} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="bitrate" className="text-right">
                                Битрейт
                              </Label>
                              <Input id="bitrate" value={stream.bitrate} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="fps" className="text-right">
                                FPS
                              </Label>
                              <Input id="fps" value={stream.fps} className="col-span-3" />
                            </div>
                          </div>
                          <Button className="w-full">Сохранить настройки</Button>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Activity className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Аналитика потока: {stream.name}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Битрейт (последние 24 часа)</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="h-[200px] bg-muted flex items-center justify-center">
                                  <BarChart className="h-16 w-16 text-muted-foreground" />
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Задержка (последние 24 часа)</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="h-[200px] bg-muted flex items-center justify-center">
                                  <BarChart className="h-16 w-16 text-muted-foreground" />
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Общая статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Активные потоки</p>
                    <p className="text-2xl font-bold">1 / 3</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Подключенные пользователи</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Средняя задержка</p>
                    <p className="text-2xl font-bold">2.2с</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quickstart">
            <Card>
              <CardHeader>
                <CardTitle>Быстрый старт трансляции</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="source">Источник</Label>
                    <select id="source" className="w-full p-2 border rounded">
                      <option>RTMP</option>
                      <option>SRT</option>
                      <option>WebRTC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL источника</Label>
                    <Input id="url" placeholder="rtmp://example.com/live" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key">Ключ потока</Label>
                    <Input id="key" placeholder="stream-key" />
                  </div>
                  <Button className="w-full">Начать трансляцию</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки кодирования</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile">Профиль кодирования</Label>
                    <select id="profile" className="w-full p-2 border rounded">
                      <option>SD (480p)</option>
                      <option>HD (720p)</option>
                      <option>Full HD (1080p)</option>
                      <option>4K</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bitrate">Битрейт (kbps)</Label>
                    <Input id="bitrate" type="number" placeholder="5000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fps">Кадры в секунду (FPS)</Label>
                    <Input id="fps" type="number" placeholder="30" />
                  </div>
                  <Button className="w-full">Сохранить настройки</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Card className="mt-4">
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Уведомления</CardTitle>
            <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Тестовый поток: обнаружен низкий битрейт. Рекомендуется проверить качество входящего сигнала.</p>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}
