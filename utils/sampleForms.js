const day = 24 * 60 * 60 * 1000;
const now = Date.now();

function field(id, type, label, overrides = {}) {
  return {
    id,
    type,
    label,
    required: false,
    placeholder: "",
    validation: {},
    options: [],
    layout: { colSpan: 12 },
    ...overrides,
  };
}

export const SAMPLE_FORMS = [
  {
    id: "11111111-1111-4111-a111-111111111001",
    name: "Contact Us",
    createdAt: now - 5 * day,
    updatedAt: now - 1 * day,
    fields: [
      field("f001-0001-4111-a111-111111111001", "text", "Full Name", {
        required: true,
        placeholder: "Jane Doe",
        layout: { colSpan: 6 },
      }),
      field("f001-0002-4111-a111-111111111001", "email", "Email Address", {
        required: true,
        placeholder: "jane@example.com",
        layout: { colSpan: 6 },
      }),
      field("f001-0003-4111-a111-111111111001", "select", "Subject", {
        required: true,
        options: ["General inquiry", "Support", "Partnership", "Feedback"],
        layout: { colSpan: 12 },
      }),
      field("f001-0004-4111-a111-111111111001", "textarea", "Message", {
        required: true,
        placeholder: "How can we help you?",
        validation: { minLength: 10, maxLength: 500 },
        layout: { colSpan: 12 },
      }),
      field("f001-0005-4111-a111-111111111001", "checkbox", "Subscribe to newsletter", {
        layout: { colSpan: 12 },
      }),
    ],
  },
  {
    id: "11111111-1111-4111-a111-111111111002",
    name: "Job Application",
    createdAt: now - 3 * day,
    updatedAt: now - 2 * day,
    fields: [
      field("f002-0001-4111-a111-111111111002", "text", "Full Name", {
        required: true,
        placeholder: "Your legal name",
        layout: { colSpan: 6 },
      }),
      field("f002-0002-4111-a111-111111111002", "email", "Email", {
        required: true,
        placeholder: "you@company.com",
        layout: { colSpan: 6 },
      }),
      field("f002-0003-4111-a111-111111111002", "text", "Phone Number", {
        placeholder: "+1 (555) 000-0000",
        layout: { colSpan: 6 },
      }),
      field("f002-0004-4111-a111-111111111002", "number", "Years of Experience", {
        required: true,
        placeholder: "3",
        layout: { colSpan: 6 },
      }),
      field("f002-0005-4111-a111-111111111002", "radio", "Preferred Role", {
        required: true,
        options: ["Frontend Developer", "Backend Developer", "Full Stack", "Designer"],
        layout: { colSpan: 12 },
      }),
      field("f002-0006-4111-a111-111111111002", "textarea", "Cover Letter", {
        placeholder: "Tell us why you'd be a great fit…",
        validation: { maxLength: 1000 },
        layout: { colSpan: 12 },
      }),
    ],
  },
  {
    id: "11111111-1111-4111-a111-111111111003",
    name: "Event RSVP",
    createdAt: now - 1 * day,
    updatedAt: now,
    fields: [
      field("f003-0001-4111-a111-111111111003", "text", "Guest Name", {
        required: true,
        placeholder: "Alex Smith",
        layout: { colSpan: 6 },
      }),
      field("f003-0002-4111-a111-111111111003", "email", "Email", {
        required: true,
        placeholder: "alex@example.com",
        layout: { colSpan: 6 },
      }),
      field("f003-0003-4111-a111-111111111003", "number", "Number of Guests", {
        required: true,
        placeholder: "1",
        layout: { colSpan: 4 },
      }),
      field("f003-0004-4111-a111-111111111003", "select", "Dietary Preference", {
        options: ["No preference", "Vegetarian", "Vegan", "Gluten-free"],
        layout: { colSpan: 8 },
      }),
      field("f003-0005-4111-a111-111111111003", "radio", "Will you attend?", {
        required: true,
        options: ["Yes, I'll be there", "Maybe", "Sorry, can't make it"],
        layout: { colSpan: 12 },
      }),
      field("f003-0006-4111-a111-111111111003", "textarea", "Additional Notes", {
        placeholder: "Allergies, accessibility needs, etc.",
        layout: { colSpan: 12 },
      }),
    ],
  },
];
