"use client"

import { useState } from "react"
import { MapPin, ExternalLink, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GoogleMap() {
  const [mapLoaded, setMapLoaded] = useState(false)

  // Deep Indian LED address
  const address = "Babuganj, Unchahar, Raebareli"
  const encodedAddress = encodeURIComponent(address)
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d399.34107123884974!2d81.28696321808674!3d25.980030804677593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sdeep%20indian%20babuganj%20unchahar%20!5e1!3m2!1sen!2sin!4v1754819938091!5m2!1sen!2sin`
  const directionsUrl = `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d399.34107123884974!2d81.28696321808674!3d25.980030804677593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sdeep%20indian%20babuganj%20unchahar%20!5e1!3m2!1sen!2sin!4v1754819938091!5m2!1sen!2sin`

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
      <div className="relative">
        {/* Google Maps Embed */}
        <div className="relative h-64 sm:h-80 bg-gradient-to-br from-orange-100 to-orange-50">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mx-auto mb-3 sm:mb-4 animate-bounce" />
                <p className="text-gray-600 font-medium text-base sm:text-lg mb-2">Loading Interactive Map...</p>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
              </div>
            </div>
          )}

          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dw901SwHSR2E6g&q=${encodedAddress}&zoom=15&maptype=roadmap`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Deep Indian LED Manufacturing Location"
            onLoad={() => setMapLoaded(true)}
            className={`transition-opacity duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
          />

          {/* Fallback for when Google Maps API is not available */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center opacity-0 hover:opacity-95 transition-opacity duration-300">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Our Factory</h3>
              <p className="text-gray-600 text-sm mb-4 max-w-xs">{address}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  onClick={() => window.open(googleMapsUrl, "_blank")}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Maps
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(directionsUrl, "_blank")}
                  className="border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="sm"
            onClick={() => window.open(googleMapsUrl, "_blank")}
            className="bg-white/90 hover:bg-white text-orange-500 shadow-lg backdrop-blur-sm"
            title="Open in Google Maps"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => window.open(directionsUrl, "_blank")}
            className="bg-white/90 hover:bg-white text-orange-500 shadow-lg backdrop-blur-sm"
            title="Get Directions"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Address Information */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-1">Deep Indian LED Manufacturing</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{address}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                📍 Factory Location
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                🏭 Manufacturing Unit
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                🚚 Dispatch Center
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
