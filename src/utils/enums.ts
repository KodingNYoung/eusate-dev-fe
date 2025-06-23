export enum TwoFAMethods {
  AUTHENTICATOR = "authenticator",
  EMAIL = "email",
}

export enum KnowledgeSourceTags {
  DOCUMENT = "document",
  ARTICLE = "article",
  FAQ = "faq",
  WEBSITE = "website",
}

export enum PopupKeys {
  ADD_FAQS_MODAL = "add-faqs-modal",
  EDIT_FAQS_MODAL = "edit-faqs-modal",
  DELETE_FAQS_MODAL = "delete-faqs-modal",
  SOURCE_MODAL = "source-modal",
  WEBSITE_MODAL = "website-modal",
  ARTICLE_MODAL = "article-modal",
  DOCUMENT_MODAL = "document-modal",
  DELETE_SOURCE_MODAL = "delete-source-modal",
  TOGGLE_PUBLISH_SOURCE_MODAL = "toggle-publish-source-modal",
  BULK_TOGGLE_PUBLISH_SOURCE_MODAL = "bulk-toggle-publish-source-modal",
  BULK_DELETE_SOURCE_MODAL = "bulk-delete-source-modal",
  //   PLAYGROUND
  PLAYGROUND_PREFERENCES_MODAL = "playground-preferences-modal",
  PLAYGROUND_LIKE_MODAL = "playground-like-modal",
  PLAYGROUND_DISLIKE_MODAL = "playground-dislike-modal",
  PLAYGROUND_CLEAR_CONVO_MODAL = "playground-clear-convo-modal",
  //   DEV_SPACE
  ADD_FUNCTION_MODAL = "add-function-modal",
  EDIT_FUNCTION_MODAL = "edit-function-modal",
  DELETE_FUNCTION_MODAL = "delete-function-modal",
  ADD_AUTH_CONFIG_MODAL = "add-auth-config-modal",
  EDIT_AUTH_CONFIG_MODAL = "edit-auth-config-modal",
  DELETE_AUTH_CONFIG_MODAL = "delete-auth-config-modal",
  // HELPDESK
  VIEW_TICKET_DRAWER = "view-ticket-drawer",
  // TICKET CHAT
  OPEN_CHAT_WITH_AI = "open-chat-with-ai",
  // SETTINGS
  TWOFA = "twofa",
  EDIT_PROFILE = "edit-profile",
  EDIT_ORGANIZATION_INFO = "edit-organization-info",
  INVITE_MEMBER = "invite-member",
  SENT_FEEDBACK = "sent-feedback",
  COMPLETED_INVITE_MEMBER = "completed-invite-member",
  GENERATE_API_KEY = "generate-api-keys",
  DELETE_API_KEY = "delete-api-keys",
  REVOKE_API_KEY = "revoke-api-keys",
}

export enum PopupModes {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}

export enum ResourceSources {
  EXTERNAL = "external",
  INTERNAL = "internal",
}

export enum AiTones {
  NORMAL = "normal",
  PROFESSIONAL = "professional",
  FRIENDLY = "friendly",
}

export enum MessageSenders {
  CUSTOMER = "customer",
  SATE = "sate",
  AGENT = "agent",
}
