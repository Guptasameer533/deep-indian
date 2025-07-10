"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm, submitProductEnquiry } from "./actions"
import {
  Lightbulb,
  Zap,
  Clock,
  DollarSign,
  MapPin,
  Truck,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Star,
  Wifi,
  Building2,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Award,
  Users,
  Globe,
  Send,
  AlertCircle,
} from "lucide-react"
import GoogleMap from "@/components/GoogleMap"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for fixed header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(formData.phone.replace(/\s+/g, ""))) {
      errors.phone = "Please enter a valid Indian phone number"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters long"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please fix the errors ❌",
        description: "Check the form fields and try again.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name.trim())
      formDataObj.append("email", formData.email.trim())
      formDataObj.append("phone", formData.phone.trim())
      formDataObj.append("message", formData.message.trim())

      const result = await submitContactForm(formDataObj)

      if (result.success) {
        toast({
          title: "Message Sent Successfully! ✅",
          description: result.message || "We'll get back to you within 24 hours.",
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
        setFormErrors({})
      } else {
        toast({
          title: "Failed to Send Message ❌",
          description: result.error || "Please try again or contact us directly.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error ❌",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEnquiry = async (productType: string) => {
    try {
      const result = await submitProductEnquiry(productType)

      if (result.success) {
        toast({
          title: "Enquiry Submitted! 🎉",
          description: result.message || `We'll contact you soon about ${productType}.`,
        })
      } else {
        toast({
          title: "Failed to Submit Enquiry ❌",
          description: result.error || "Please try the contact form instead.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Product enquiry error:", error)
      toast({
        title: "Error ❌",
        description: "Failed to submit enquiry. Please try the contact form.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500 animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 sm:h-10 sm:w-10 bg-orange-500/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Deep Indian
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {["Home", "About", "Products", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium relative group px-2 py-1"
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 shadow-lg">
              {["Home", "About", "Products", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors font-medium"
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/hero-bg.png)" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Enhanced Animated light effects */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-orange-400/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 sm:w-24 sm:h-24 bg-orange-300/40 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 sm:w-28 sm:h-28 bg-amber-400/30 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Deep Indian
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-2 sm:mb-4 font-light px-4">
              Lighting Up Every Indian Home,
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-400 font-semibold px-4">
              One Bulb at a Time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 px-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("products")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-10 py-3 sm:py-4 text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
              aria-label="Explore our LED products"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 sm:px-10 py-3 sm:py-4 text-lg shadow-2xl hover:shadow-orange-400/25 transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              aria-label="Contact us for inquiries"
            >
              Contact Us
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white/90 px-4">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "1M+", label: "Happy Customers" },
              { number: "500+", label: "Cities Served" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-yellow-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="text-orange-500 font-semibold text-base sm:text-lg">About Deep Indian</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4 sm:mb-6 leading-tight">
                  Illuminating India's Future
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Deep Indian is a trusted name in energy-efficient LED lighting solutions. We manufacture high-quality,
                eco-friendly, and durable LED bulbs designed for Indian households and businesses.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                With years of experience in the lighting industry, we are committed to providing innovative solutions
                that combine cutting-edge technology with affordability, ensuring every Indian home can access premium
                lighting.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">ISO</div>
                  <div className="text-sm sm:text-base text-gray-600">Certified Quality</div>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">1M+</div>
                  <div className="text-sm sm:text-base text-gray-600">Satisfied Customers</div>
                </div>
              </div>

              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                aria-label="Learn more about Deep Indian"
              >
                Learn More About Us
              </Button>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <img
                  src="/images/led-factory.png"
                  alt="Deep Indian LED Manufacturing Facility showing modern production line"
                  className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900">Made in India</div>
                <div className="text-sm sm:text-base text-gray-600">For the World</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-orange-500 font-semibold text-base sm:text-lg">Our Products</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4 sm:mb-6 leading-tight">
              Premium LED Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover our comprehensive collection of energy-efficient LED lighting solutions designed for every need
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                image: "/images/standard-led.png",
                title: "Standard LED Bulbs",
                desc: "Energy-efficient bulbs for everyday use",
                power: "3W to 15W",
                alt: "Standard LED bulbs for home and office use",
              },
              {
                image: "/images/decorative-led.png",
                title: "Decorative LED Bulbs",
                desc: "Stylish lighting for special occasions",
                power: "5W to 12W",
                alt: "Decorative LED bulbs for festive and ambient lighting",
              },
              {
                image: "/images/smart-led.png",
                title: "Smart LED Bulbs",
                desc: "Wi-Fi enabled smart lighting control",
                power: "9W to 15W",
                icon: Wifi,
                alt: "Smart LED bulbs with Wi-Fi connectivity and app control",
              },
              {
                image: "/images/commercial-led.png",
                title: "Commercial Solutions",
                desc: "High-performance lighting for businesses",
                power: "20W to 100W",
                icon: Building2,
                alt: "Commercial LED lighting solutions for offices and industries",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white border-0 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.alt}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {product.icon && (
                      <div className="absolute top-4 right-4 bg-orange-500 p-2 rounded-full">
                        <product.icon className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">{product.desc}</p>
                    <p className="text-orange-500 font-bold text-base sm:text-lg mb-4">{product.power}</p>
                    <Button
                      onClick={() => handleEnquiry(product.title)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-2 sm:py-3"
                      aria-label={`Enquire about ${product.title}`}
                    >
                      Enquire Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-yellow-50/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-orange-500 font-semibold text-base sm:text-lg">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4 sm:mb-6 leading-tight">
              The Deep Indian Advantage
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover what makes Deep Indian the preferred choice for LED lighting solutions across India
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Zap,
                title: "Energy Efficient",
                desc: "Save up to 80% on electricity bills with our LED technology",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Clock,
                title: "Long Life Span",
                desc: "Our LEDs last up to 25,000 hours with consistent performance",
                color: "from-green-500 to-green-600",
              },
              {
                icon: DollarSign,
                title: "Affordable Pricing",
                desc: "Premium quality at competitive prices for every budget",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: MapPin,
                title: "Made in India",
                desc: "Proudly manufactured in India with international quality standards",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick and reliable delivery across India",
                color: "from-red-500 to-red-600",
              },
              {
                icon: Award,
                title: "Quality Assured",
                desc: "Rigorous testing ensures every bulb meets our high standards",
                color: "from-yellow-500 to-yellow-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`bg-gradient-to-r ${feature.color} w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-orange-500 font-semibold text-base sm:text-lg">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4 sm:mb-6 leading-tight">
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Read testimonials from satisfied customers across India who trust Deep Indian for their lighting needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                image: "/images/customer1.png",
                review:
                  "Deep Indian LED bulbs have significantly reduced our electricity bills. The quality is excellent and they last much longer than other brands we've tried. Highly recommended!",
              },
              {
                name: "Priya Sharma",
                location: "Mumbai",
                image: "/images/customer2.png",
                review:
                  "Amazing smart bulbs! The Wi-Fi connectivity works perfectly and the app is very user-friendly. Great value for money and excellent customer service.",
              },
              {
                name: "Amit Patel",
                location: "Ahmedabad",
                image: "/images/customer3.png",
                review:
                  "We've been using Deep Indian LEDs in our office for 2 years now. Not a single bulb has failed. Excellent quality, service, and the team is very professional!",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-4 sm:mb-6" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed italic">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`${testimonial.name} from ${testimonial.location}`}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-3 sm:mr-4 object-cover border-4 border-orange-100"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-base sm:text-lg">{testimonial.name}</div>
                      <div className="text-orange-500 font-medium text-sm sm:text-base">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-yellow-50/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-orange-500 font-semibold text-base sm:text-lg">Contact Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4 sm:mb-6 leading-tight">
              Get in Touch
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Ready to illuminate your space? Contact us for the best LED lighting solutions and expert guidance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a Message</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className={`w-full h-12 sm:h-14 border-2 ${
                        formErrors.name ? "border-red-500" : "border-gray-200"
                      } focus:border-orange-500 rounded-xl text-base`}
                      required
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                    />
                    {formErrors.name && (
                      <div id="name-error" className="flex items-center mt-2 text-red-600 text-sm" role="alert">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full h-12 sm:h-14 border-2 ${
                        formErrors.email ? "border-red-500" : "border-gray-200"
                      } focus:border-orange-500 rounded-xl text-base`}
                      required
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                    />
                    {formErrors.email && (
                      <div id="email-error" className="flex items-center mt-2 text-red-600 text-sm" role="alert">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 80528 38300"
                      className={`w-full h-12 sm:h-14 border-2 ${
                        formErrors.phone ? "border-red-500" : "border-gray-200"
                      } focus:border-orange-500 rounded-xl text-base`}
                      required
                      aria-describedby={formErrors.phone ? "phone-error" : undefined}
                    />
                    {formErrors.phone && (
                      <div id="phone-error" className="flex items-center mt-2 text-red-600 text-sm" role="alert">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.phone}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your lighting requirements..."
                      rows={5}
                      className={`w-full border-2 ${
                        formErrors.message ? "border-red-500" : "border-gray-200"
                      } focus:border-orange-500 rounded-xl text-base resize-none`}
                      required
                      aria-describedby={formErrors.message ? "message-error" : undefined}
                    />
                    {formErrors.message && (
                      <div id="message-error" className="flex items-center mt-2 text-red-600 text-sm" role="alert">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {formErrors.message}
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message to Deep Indian"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending to work@deepindian.in...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+91 80528 38300",
                  subtitle: "Available 24/7 for support",
                  href: "tel:+918052838300",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "work@deepindian.in",
                  subtitle: "We'll respond within 24 hours",
                  href: "mailto:work@deepindian.in",
                },
                // {
                //   icon: MapPin,
                //   title: "Address",
                //   content: "Plot 14, Industrial Area, Sector 27, Bhiwadi, Rajasthan, India - 301019",
                //   subtitle: "",
                //   href: "https://maps.google.com/?q=Plot+14+Industrial+Area+Sector+27+Bhiwadi+Rajasthan+India",
                // },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                      <contact.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{contact.title}</h3>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-gray-600 text-base sm:text-lg leading-relaxed hover:text-orange-500 transition-colors"
                          target={contact.href.startsWith("http") ? "_blank" : undefined}
                          rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {contact.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{contact.content}</p>
                      )}
                      {contact.subtitle && <p className="text-sm text-gray-500 mt-1">{contact.subtitle}</p>}
                    </div>
                  </div>
                </div>
              ))}

              {/* Interactive Google Map */}
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="relative">
                  <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500" />
                  <div className="absolute inset-0 h-8 w-8 sm:h-10 sm:w-10 bg-orange-500/20 rounded-full blur-md"></div>
                </div>
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Deep Indian
                </span>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed max-w-md">
                Lighting up every Indian home with energy-efficient, high-quality LED solutions. Your trusted partner
                for sustainable lighting.
              </p>
              <div className="flex space-x-4 sm:space-x-6">
                {[
                  { Icon: Facebook, label: "Facebook", href: "#" },
                  { Icon: Instagram, label: "Instagram", href: "#" },
                  { Icon: Linkedin, label: "LinkedIn", href: "#" },
                ].map(({ Icon, label, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    aria-label={`Follow us on ${label}`}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 sm:p-3 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-orange-400">Quick Links</h3>
              <nav>
                <ul className="space-y-2 sm:space-y-3">
                  {["Home", "About", "Products", "Contact"].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-left text-base"
                        aria-label={`Navigate to ${item} section`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-orange-400">Products</h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Standard LED Bulbs", "Decorative LEDs", "Smart LED Bulbs", "Commercial Solutions"].map((item) => (
                  <li key={item}>
                    <span className="text-gray-300 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-400 text-center sm:text-left text-sm sm:text-base">
                © 2025 Deep Indian. All rights reserved. | Made with ❤️ in India
              </p>
              <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                <button className="hover:text-orange-400 cursor-pointer transition-colors">Privacy Policy</button>
                <button className="hover:text-orange-400 cursor-pointer transition-colors">Terms of Service</button>
                <button className="hover:text-orange-400 cursor-pointer transition-colors">Warranty</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
