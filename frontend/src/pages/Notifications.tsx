"use client"

import { useEffect, useState } from "react"
import { Bell, Check, X, User, Clock, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fetchMyNotifications, sendNotificationResponse } from "../store/notificationApi"

interface Notification {
  _id: string
  type: "patient_request" | "donor_approval" | "emergency"
  data: {
    patientName?: string
    patientPhone?: string
    hospitalName?: string
    hospitalLocation?: string
    bloodType?: string
    unitsNeeded?: string
    urgency?: string
    message?: string
    donorName?: string
    donorPhone?: string
  }
  status?: "pending" | "approved" | "denied"
  createdAt: string
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())

  const loadNotifications = async () => {
    try {
      setLoading(true)
      const data = await fetchMyNotifications()
      setNotifications(data)
    } catch (error) {
      console.error("Failed to load notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleResponse = async (notificationId: string, status: "approved" | "denied") => {
    try {
      setProcessingIds((prev) => new Set(prev).add(notificationId))
      await sendNotificationResponse(notificationId, status)
      await loadNotifications()
    } catch (error) {
      console.error("Failed to respond:", error)
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(notificationId)
        return newSet
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "patient_request":
        return <User className="h-5 w-5 text-blue-500" />
      case "donor_approval":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "emergency":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "denied":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Denied
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "Just now"
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="mb-4">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500">
              {notifications.length === 0
                ? "No notifications"
                : `${notifications.length} notification${notifications.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={loadNotifications}
          disabled={loading}
          className="flex items-center space-x-2 bg-transparent"
        >
          <Bell className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {notifications.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                <p className="text-gray-500 mt-1">You're all caught up! Check back later for new notifications.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const isProcessing = processingIds.has(notification._id)
            return (
              <Card
                key={notification._id}
                className="transition-all duration-200 hover:shadow-md border-l-4 border-l-blue-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2 mb-2">
                          {getNotificationIcon(notification.type)}
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {notification.type.replace("_", " ")}
                          </span>
                          {getStatusBadge(notification.status)}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {notification.type === "emergency" && (
                          <>
                           Emergency: <b>{notification.data.bloodType}</b> blood needed urgently at <b>{notification.data.hospitalName}</b>, 
                           {notification.data.hospitalLocation}. Urgency: <b>{notification.data.urgency}</b>, Units: <b>{notification.data.unitsNeeded}</b>.
                          </>
                        )}
                        {notification.type === "patient_request" && (
                          <>
                            Patient <b>{notification.data.patientName}</b> ({notification.data.patientPhone}) needs{" "}
                            {notification.data.bloodType}.
                          </>
                        )}
                        {notification.type === "donor_approval" && (
                          <>
                            Donor <b>{notification.data?.donorName || notification.data?.patientName || "Unknown"}</b> (
                            {notification.data?.donorPhone || notification.data?.patientPhone || "N/A"}){" "}
                            {notification.status}.
                            {notification.data?.message && (
                              <>
                                {" "}
                                Message: "<i>{notification.data.message}</i>"
                              </>
                            )}
                          </>
                        )}

                      </p>

                      {["patient_request", "emergency"].includes(notification.type) &&
                        (!notification.status || notification.status === "pending") && (
                          <>
                            <Separator className="my-4" />
                            <div className="flex items-center space-x-3">
                              <Button
                                onClick={() => handleResponse(notification._id, "approved")}
                                disabled={isProcessing}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                                size="sm"
                              >
                                <Check className="h-4 w-4" />
                                <span>Approve</span>
                              </Button>
                              <Button
                                onClick={() => handleResponse(notification._id, "denied")}
                                disabled={isProcessing}
                                variant="destructive"
                                className="flex items-center space-x-2"
                                size="sm"
                              >
                                <X className="h-4 w-4" />
                                <span>Deny</span>
                              </Button>
                              {isProcessing && (
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                                  <span>Processing...</span>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Notifications
