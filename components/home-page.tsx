import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Home,
  Link,
  MessageCircle,
  Search,
  ThumbsUp,
  User,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-2 h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Linkify</span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Messages</span>
              </Button>
            </nav>
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-muted pl-8 md:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <Button variant="ghost" size="icon" className="w-9 px-0">
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 mx-5">
        <div className="container grid gap-12 md:grid-cols-[1fr_300px] py-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Textarea placeholder="What's on your mind?" />
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Add Image
                </Button>
                <Button size="sm">Post</Button>
              </CardFooter>
            </Card>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt="@johndoe"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-sm text-muted-foreground">@johndoe</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Just had an amazing brainstorming session with the team.
                    Exciting things coming soon! 🚀 #Innovation #Teamwork
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <Button variant="ghost" size="icon">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      24
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-4 w-4 mr-2" />5
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt="@janedoe"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Jane Doe
                      </p>
                      <p className="text-sm text-muted-foreground">@janedoe</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Just finished reading an incredible book on AI and its
                    impact on society. Highly recommend! 📚🤖 #AIEthics
                    #FutureOfTech
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <Button variant="ghost" size="icon">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      42
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      12
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Trending Topics</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      #TechInnovation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      #SustainableLiving
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      #DigitalArtRevolution
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Suggested Connections</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt="@techguru"
                      />
                      <AvatarFallback>TG</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Tech Guru
                      </p>
                      <p className="text-sm text-muted-foreground">@techguru</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Connect
                    </Button>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt="@designpro"
                      />
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Design Pro
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @designpro
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Connect
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
