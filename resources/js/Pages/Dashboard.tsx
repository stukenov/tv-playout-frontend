import { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { BarChart, Bell, Edit, Plus, Settings, Trash } from "lucide-react";


export default function Dashboard() {
    const [channels, setChannels] = useState([
        { id: 1, name: "News 24/7", status: "active", viewers: "250K" },
        { id: 2, name: "Sports Central", status: "inactive", viewers: "0" },
        { id: 3, name: "Movie Mania", status: "active", viewers: "100K" },
    ]);
    return (
        <AuthenticatedLayout
            
        >

            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-gray-800">CloudPlayout</h2>
                    </div>
                    <nav className="mt-6">
                        <a
                            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-200"
                            href="#"
                        >
                            <BarChart className="w-5 h-5 mr-2" />
                            Channel Management
                        </a>
                        {/* Add other navigation items here */}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">Channel Management</h1>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" /> Create New Channel
                            </Button>
                        </div>

                        <Tabs defaultValue="overview">
                            <TabsList className="mb-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="channels">Channels</TabsTrigger>
                                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Total Channels</CardTitle>
                                            <CardDescription>Active and inactive channels</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-4xl font-bold">{channels.length}</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Active Channels</CardTitle>
                                            <CardDescription>Currently broadcasting</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-4xl font-bold">
                                                {channels.filter((ch) => ch.status === "active").length}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Total Viewers</CardTitle>
                                            <CardDescription>Across all channels</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-4xl font-bold">
                                                {channels.reduce((sum, ch) => sum + parseInt(ch.viewers.replace(/\D/g, "") || "0"), 0)}K
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            <TabsContent value="channels">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Channel List</CardTitle>
                                        <CardDescription>Manage your TV channels</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <Input className="w-64" placeholder="Search channels..." />
                                                <div className="space-x-2">
                                                    <Button variant="outline">
                                                        <Settings className="w-4 h-4 mr-2" /> Filters
                                                    </Button>
                                                    <Button variant="outline">
                                                        <Bell className="w-4 h-4 mr-2" /> Notifications
                                                    </Button>
                                                </div>
                                            </div>
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left py-2">Channel Name</th>
                                                        <th className="text-left py-2">Status</th>
                                                        <th className="text-left py-2">Viewers</th>
                                                        <th className="text-left py-2">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {channels.map((channel) => (
                                                        <tr key={channel.id} className="border-b">
                                                            <td className="py-2">{channel.name}</td>
                                                            <td className="py-2">
                                                                <span
                                                                    className={`px-2 py-1 ${
                                                                        channel.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                                    } rounded-full text-xs`}
                                                                >
                                                                    {channel.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-2">{channel.viewers}</td>
                                                            <td className="py-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <Trash className="w-4 h-4" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            
                        </Tabs>
                    </div>
                </main>

            </div>
        </AuthenticatedLayout>
    );
}
