import { ObjectData } from "@shared/schema";

export const OBJECT_DATABASE: Record<string, ObjectData> = {
  "waste-bin": {
    type: "waste-bin",
    name: "Waste Bin",
    icon: "🗑️",
    accentColor: "hsl(142, 70%, 45%)",
    greeting: "Waste bin detected. How can I help you today?",
    quickActions: [
      {
        id: "disposal",
        label: "What do I do?",
        response: "This is a general waste bin. Empty contents into the collection truck. Check for contamination before disposal. Ensure lid is secure after emptying."
      },
      {
        id: "location",
        label: "Collection schedule",
        response: "General waste bins are collected on Tuesdays and Fridays. Collection time: 6:00 AM - 2:00 PM. Ensure bins are placed at the curb by 6:00 AM on collection day."
      },
      {
        id: "safety",
        label: "Safety info",
        response: "Always wear gloves when handling waste bins. Watch for sharp objects. If you notice hazardous materials, do not empty the bin and report to supervisor immediately."
      },
      {
        id: "damaged",
        label: "Damaged bin",
        response: "For damaged bins: Tag the bin with a repair notice. Take a photo for records. Schedule replacement through the depot. Leave a collection notice for the resident."
      }
    ],
    responses: {
      "full": "If bin is overfilled, leave a notice for the resident. Do not force lid closed. Report persistent issues to route supervisor.",
      "contamination": "Common contaminants: batteries, electronics, liquids. Leave educational tag on bin. Take photo for records if severe.",
      "repairs": "Minor repairs can be done on-site. For major damage, schedule replacement. Always document with photos."
    }
  },
  "syringe": {
    type: "syringe",
    name: "Syringe",
    icon: "💉",
    accentColor: "hsl(24, 80%, 50%)",
    greeting: "Syringe detected. Important safety information below.",
    quickActions: [
      {
        id: "disposal",
        label: "What do I do?",
        response: "DO NOT TOUCH with bare hands. Use approved sharps pickup tool. Place in designated sharps container immediately. Never attempt to recap or bend the needle."
      },
      {
        id: "safety",
        label: "Safety protocol",
        response: "CRITICAL: Always wear puncture-resistant gloves. Use tongs or sharps pickup tool. Maintain safe distance. If pricked, seek immediate medical attention and report incident to supervisor."
      },
      {
        id: "container",
        label: "Container full",
        response: "When sharps container is 3/4 full, seal and label it. Call biohazard disposal service (1800-SHARPS). Do not compact or shake container. Store in secure location until pickup."
      },
      {
        id: "location",
        label: "Report location",
        response: "Mark GPS coordinates in app. Take photo from safe distance. Place warning cone if in public area. Complete incident report form before leaving site."
      }
    ],
    responses: {
      "emergency": "Needle stick injury: Wash wound immediately. Squeeze to promote bleeding. Seek medical attention within 2 hours. Report to supervisor and complete incident form.",
      "public": "Found in public area: Secure perimeter. Never let children or public approach. Use proper collection tools. Complete full documentation.",
      "multiple": "Multiple syringes: Call for backup. Establish safe zone. Use systematic collection method. Consider requesting police presence if necessary."
    }
  },
  "dog-poop": {
    type: "dog-poop",
    name: "Dog Waste",
    icon: "🐕",
    accentColor: "hsl(30, 60%, 45%)",
    greeting: "Dog waste identified. See disposal guidelines below.",
    quickActions: [
      {
        id: "disposal",
        label: "What do I do?",
        response: "Use long-handled scoop and bag. Dispose in general waste bin or designated dog waste bin. Always wear gloves. Clean tools with disinfectant after use."
      },
      {
        id: "location",
        label: "Report issue",
        response: "Document location with GPS and photo. If on public property, collect and dispose. If on private property, leave notice for owner. Repeat offenses should be reported to compliance team."
      },
      {
        id: "safety",
        label: "Health & safety",
        response: "Dog waste carries harmful bacteria. Always wear gloves. Wash hands thoroughly after handling. If waste is in contact with skin, wash immediately with soap and water."
      },
      {
        id: "bins",
        label: "Dog waste bins",
        response: "Dog waste bins should be emptied twice weekly. Use separate bags for dog waste. Check for bag supply and report if low. Clean bin exterior monthly."
      }
    ],
    responses: {
      "park": "In parks: Check designated dog areas first. Empty dog waste bins before general bins. Report areas with excessive waste to parks department.",
      "complaint": "Resident complaint: Document location and frequency. Issue warning notice to property owner. Schedule follow-up inspection in 7 days.",
      "education": "Leave educational flyer about responsible pet ownership. Include information about free bag dispensers. List nearby designated dog waste bins."
    }
  }
};

export function getObjectByQRCode(qrCode: string): ObjectData | null {
  const objectType = qrCode.toLowerCase().replace(/[^a-z-]/g, "");
  return OBJECT_DATABASE[objectType] || null;
}
