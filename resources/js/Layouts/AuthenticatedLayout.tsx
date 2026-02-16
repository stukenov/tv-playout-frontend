import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { Tv, ChevronDown, Building, Menu } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link className="mr-6 flex items-center space-x-2" href="/">
                            <Tv className="h-6 w-6" />
                            <span className="hidden font-bold sm:inline-block">TV Playout</span>
                        </Link>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button variant="outline" size="sm">
                                    Select Channel <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href="#">Channel 1</Dropdown.Link>
                                <Dropdown.Link href="#">Channel 2</Dropdown.Link>
                                <Dropdown.Link href="#">Channel 3</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center space-x-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button variant="ghost" size="sm">
                                        Scheduling <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('schedule')}>Program Guide</Dropdown.Link>
                                    <Dropdown.Link href="#">Content Library</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button variant="ghost" size="sm">
                                        Playout <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href="#">Live Control</Dropdown.Link>
                                    <Dropdown.Link href="#">Automation</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button variant="ghost" size="sm">
                                        Analytics <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href="#">Viewership</Dropdown.Link>
                                    <Dropdown.Link href="#">Performance</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button variant="ghost" size="sm">
                                        <Building className="mr-2 h-4 w-4" />
                                        Company
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href="#">Company A</Dropdown.Link>
                                    <Dropdown.Link href="#">Company B</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href="#">Settings</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 container py-6">{children}</main>

            <footer className="border-t py-4 bg-muted">
                <div className="container flex flex-col gap-2 sm:flex-row items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <div className={`h-2 w-2 rounded-full ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span>{Math.random() > 0.5 ? 'Connected' : 'Disconnected'}</span>
                        </div>
                        <span>Server Status: {Math.random() > 0.5 ? 'Operational' : 'Maintenance'}</span>
                    </div>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link className="hover:underline" href="#">
                            Terms of Service
                        </Link>
                        <Link className="hover:underline" href="#">
                            Privacy Policy
                        </Link>
                        <Link className="hover:underline" href="#">
                            Contact Support
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
