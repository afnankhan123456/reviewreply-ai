"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Star,
  MessageSquare,
  Bell,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Send,
  Eye,
} from "lucide-react";

export default function AlertsDashboard() {
  const [activeTab, setActiveTab] = useState("new-reviews");
  const [emailNotifications, setEmailNotifications] = useState({
    newReviews: true,
    reviewRequests: true,
    lowRatings: true,
    weeklyDigest: false,
  });

  const [ratingThreshold, setRatingThreshold] = useState("3");

  // Sample data
  const newReviews = [
    {
      id: 1,
      customer: "John Doe",
      rating: 2,
      comment: "Service was slow, but food was okay.",
      date: "2024-01-15",
      status: "unread",
      source: "Google",
    },
    {
      id: 2,
      customer: "Jane Smith",
      rating: 5,
      comment: "Amazing experience! Will come back again.",
      date: "2024-01-14",
      status: "read",
      source: "Yelp",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      rating: 1,
      comment: "Terrible customer service. Very disappointed.",
      date: "2024-01-14",
      status: "unread",
      source: "Facebook",
    },
  ];

  const ratingStats = {
    total: 245,
    average: 4.2,
    distribution: [
      { stars: 5, count: 150, percentage: 61 },
      { stars: 4, count: 50, percentage: 20 },
      { stars: 3, count: 20, percentage: 8 },
      { stars: 2, count: 15, percentage: 6 },
      { stars: 1, count: 10, percentage: 4 },
    ],
    trend: "+12% this month",
  };

  const lowRatingAlerts = [
    {
      id: 1,
      customer: "Sarah Wilson",
      rating: 1,
      comment: "Worst experience ever!",
      date: "2 hours ago",
      platform: "Google",
    },
    {
      id: 2,
      customer: "Tom Brown",
      rating: 2,
      comment: "Not worth the price",
      date: "5 hours ago",
      platform: "Yelp",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Review Alerts Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your review notifications and alerts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Alert Rule
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="new-reviews">
            <Mail className="mr-2 h-4 w-4" />
            New Review Email Alerts
          </TabsTrigger>
          <TabsTrigger value="review-requests">
            <Send className="mr-2 h-4 w-4" />
            Email Review Requests
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Email Notifications
          </TabsTrigger>
          <TabsTrigger value="low-rating">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Low Rating Alerts
          </TabsTrigger>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Rating Overview
          </TabsTrigger>
        </TabsList>

        {/* New Review Email Alerts */}
        <TabsContent value="new-reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>New Review Email Alerts</CardTitle>
                <Badge variant="secondary">
                  {newReviews.filter((r) => r.status === "unread").length} unread
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Instant Email Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified immediately when new reviews are posted
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications.newReviews}
                    onCheckedChange={(checked) =>
                      setEmailNotifications((prev) => ({
                        ...prev,
                        newReviews: checked,
                      }))
                    }
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Review</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableHead>
                          <Badge
                            variant={
                              review.status === "unread"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {review.status}
                          </Badge>
                        </TableHead>
                        <TableCell>{review.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {review.rating}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {review.comment}
                        </TableCell>
                        <TableCell>{review.source}</TableCell>
                        <TableCell>{review.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Review Requests */}
        <TabsContent value="review-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Review Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <Send className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Automated Review Requests</h3>
                      <p className="text-sm text-muted-foreground">
                        Send automated emails to customers requesting reviews
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications.reviewRequests}
                    onCheckedChange={(checked) =>
                      setEmailNotifications((prev) => ({
                        ...prev,
                        reviewRequests: checked,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Send Request After</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour after purchase</SelectItem>
                        <SelectItem value="24">24 hours after purchase</SelectItem>
                        <SelectItem value="48">48 hours after purchase</SelectItem>
                        <SelectItem value="72">3 days after purchase</SelectItem>
                        <SelectItem value="168">1 week after purchase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Template</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Template</SelectItem>
                        <SelectItem value="friendly">Friendly Template</SelectItem>
                        <SelectItem value="professional">Professional Template</SelectItem>
                        <SelectItem value="casual">Casual Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Preview & Test Email</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    icon: Bell,
                    title: "Push Notifications",
                    description: "Receive push notifications for new reviews",
                    key: "newReviews",
                  },
                  {
                    icon: Mail,
                    title: "Email Digest",
                    description: "Weekly summary of all reviews and ratings",
                    key: "weeklyDigest",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Alert Notifications",
                    description: "Get notified for critical reviews",
                    key: "lowRatings",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={
                        emailNotifications[
                          item.key as keyof typeof emailNotifications
                        ]
                      }
                      onCheckedChange={(checked) =>
                        setEmailNotifications((prev) => ({
                          ...prev,
                          [item.key]: checked,
                        }))
                      }
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    defaultValue="admin@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Low Rating Alerts */}
        <TabsContent value="low-rating" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Rating Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold text-red-700">
                        Critical Alerts
                      </h3>
                      <p className="text-sm text-red-600">
                        {lowRatingAlerts.length} low rating reviews need attention
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive">View All Alerts</Button>
                </div>

                <div className="space-y-2">
                  <Label>Alert Threshold</Label>
                  <Select
                    value={ratingThreshold}
                    onValueChange={setRatingThreshold}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Star & Below</SelectItem>
                      <SelectItem value="2">2 Stars & Below</SelectItem>
                      <SelectItem value="3">3 Stars & Below</SelectItem>
                      <SelectItem value="4">4 Stars & Below</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {lowRatingAlerts.map((alert) => (
                    <Card key={alert.id} className="border-red-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="destructive">
                                {alert.rating} Stars
                              </Badge>
                              <span className="font-semibold">
                                {alert.customer}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                on {alert.platform}
                              </span>
                            </div>
                            <p className="text-sm">{alert.comment}</p>
                            <p className="text-xs text-muted-foreground">
                              {alert.date}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Respond
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rating Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Reviews
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ratingStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  +20 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ratingStats.average}
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-green-500">{ratingStats.trend}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Response Rate
                </CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Alerts
                </CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-red-500">2 need attention</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ratingStats.distribution.map((item) => (
                  <div key={item.stars} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {item.stars} Stars
                        </span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.count} reviews
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
