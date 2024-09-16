'use client'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircle, ThumbsUp, MapPin, Link as LinkIcon, Calendar } from "lucide-react"

export function ProfilePageComponent() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">@johndoe</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Software Engineer passionate about creating innovative solutions.</p>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <LinkIcon className="h-4 w-4" />
                  <a href="#" className="hover:underline">johndoe.com</a>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined March 2020</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <div>
                  <p className="font-bold">1,234</p>
                  <p className="text-muted-foreground">Following</p>
                </div>
                <div>
                  <p className="font-bold">5,678</p>
                  <p className="text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="font-bold">9,101</p>
                  <p className="text-muted-foreground">Posts</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
          {[1, 2, 3].map((post) => (
            <Card key={post}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Just finished working on an exciting new project! Can't wait to share more details soon. 
                  #CodingLife #Innovation
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    42
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    5
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}