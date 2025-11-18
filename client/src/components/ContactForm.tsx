import { useState } from "react";
import { X, CheckCircle2, User, Building, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    // Validate form
    if (!name.trim() || !company.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          message
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          className="rounded-3xl p-8 max-w-md w-full text-center animate-in zoom-in duration-300"
          style={{
            background: "hsl(200, 80%, 45%)",
            border: "1px solid white",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
          }}
          data-testid="container-contact-success"
        >
          <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2" data-testid="text-success-title">
            Message Sent!
          </h2>
          <p className="text-white/90" data-testid="text-success-message">
            We'll get back to you soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        style={{
          background: "white",
          border: "1px solid white",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
        }}
        data-testid="container-contact-form"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: "hsl(200, 80%, 45%)" }} data-testid="text-form-title">
            Connect with Circle T
          </h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8"
            style={{ color: "hsl(200, 80%, 45%)" }}
            data-testid="button-close-form"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" style={{ color: "hsl(200, 80%, 45%)" }} />
              <label className="font-semibold text-gray-700" data-testid="label-name">
                Name
              </label>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-lg p-3 text-gray-900"
              style={{
                background: "#f5f5f5",
                border: "1px solid #e0e0e0"
              }}
              data-testid="input-name"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5" style={{ color: "hsl(200, 80%, 45%)" }} />
              <label className="font-semibold text-gray-700" data-testid="label-company">
                Company
              </label>
            </div>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company name"
              className="w-full rounded-lg p-3 text-gray-900"
              style={{
                background: "#f5f5f5",
                border: "1px solid #e0e0e0"
              }}
              data-testid="input-company"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" style={{ color: "hsl(200, 80%, 45%)" }} />
              <label className="font-semibold text-gray-700" data-testid="label-email">
                Email Address
              </label>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@company.com"
              className="w-full rounded-lg p-3 text-gray-900"
              style={{
                background: "#f5f5f5",
                border: "1px solid #e0e0e0"
              }}
              data-testid="input-email"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" style={{ color: "hsl(200, 80%, 45%)" }} />
              <label className="font-semibold text-gray-700" data-testid="label-message">
                Message
              </label>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how we can help..."
              className="w-full rounded-lg p-3 text-gray-900 resize-none"
              style={{
                background: "#f5f5f5",
                border: "1px solid #e0e0e0",
                minHeight: "120px"
              }}
              data-testid="textarea-message"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 text-white font-semibold py-6 rounded-xl"
          style={{
            background: "hsl(200, 80%, 45%)",
            border: "1px solid hsl(200, 80%, 45%)"
          }}
          data-testid="button-send"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </div>
  );
}
