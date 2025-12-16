"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/core/lib/utils";

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationProps {
  id: number;
  message: string;
  type: NotificationType;
  onDismiss: (id: number) => void;
  duration?: number;
}

const notificationConfig = {
  success: { icon: CheckCircle, iconColor: "text-green-500", progressColor: "bg-green-500" },
  error: { icon: AlertTriangle, iconColor: "text-red-500", progressColor: "bg-red-500" },
  info: { icon: Info, iconColor: "text-blue-500", progressColor: "bg-blue-500" },
  warning: { icon: AlertTriangle, iconColor: "text-yellow-500", progressColor: "bg-yellow-500" },
};

export const NotificationToast = ({ id, message, type, onDismiss, duration = 5000 }: NotificationProps) => {
  const { icon: Icon, iconColor, progressColor } = notificationConfig[type];

  // Auto-dismiss after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onDismiss, duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative w-full max-w-sm overflow-hidden rounded-full border border-gray-300 bg-white p-2 pl-4 shadow-lg backdrop-blur-md text-gray-800"
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-6 h-6 shrink-0", iconColor)} />
        <p className="text-sm font-medium flex-grow">{message}</p>
        <button 
          onClick={() => onDismiss(id)} 
          className="p-1.5 rounded-full text-danger bg-danger/20 hover:bg-danger/30 cursor-pointer transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Animated Progress Bar */}
      <motion.div
        key={id} // Re-trigger animation on new notification
        className={cn("absolute bottom-0 left-0 h-1", progressColor)}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};