export enum TwoFAMethods {
  AUTHENTICATOR = "authenticator",
  EMAIL = "email",
}

export enum KnowledgeSourceTags {
  DOCUMENT = "document",
  ARTICLE = "article",
  FAQ = "faq",
  LINK = "link",
}

export enum PopupKeys {
  ADD_FAQS_MODAL = "add-faqs-modal",
  EDIT_FAQS_MODAL = "edit-faqs-modal",
  DELETE_FAQS_MODAL = "delete-faqs-modal",
  SOURCE_MODAL = "source-modal",
  LINK_MODAL = "link-modal",
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
  EDIT_ORGANISATION_INFO = "edit-organisation-info",
  INVITE_MEMBER_MODAL = "invite-member-modal",
  SENT_FEEDBACK = "sent-feedback",
  INVITE_SENT_MODAL = "sent-invite-modal",
  MANAGE_ACCESS_MODAL = "manage-access-modal",
  REMOVE_AGENT_MODAL = "remove-agent-modal",
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
export enum PermissionCodenames {
  KNOWLEDGE_BASE_VIEWER = "knowledge_base_viewer",
  KNOWLEDGE_BASE_EDITOR = "knowledge_base_editor",
  HELPDESK_VIEWER = "helpdesk_viewer",
  HELPDESK_TICKET_HANDLER = "helpdesk_ticket_handler",
  HELPDESK_TICKET_COMMENTER = "helpdesk_ticket_commenter",
  REPORT_VIEWER = "report_viewer",
  REPORT_DOWNLOADER = "report_downloader",
  ORGANISATION_INFO_MANAGER = "organisation_info_manager",
  ORGANISATION_MEMBERS_VIEWER = "organisation_members_viewer",
  ORGANISATION_MEMBERS_MANAGER = "organisation_members_manager",
  ORGANISATION_SATE_MANAGER = "organisation_sate_manager",
  ORGANISATION_INTEGRATION_MANAGER = "organisation_integration_manager",
  ORGANISATION_USAGE_BILLING_MANAGER = "organisation_usage_billing_manager",
  DEVELOPER_SPACE_MANAGER = "developer_space_manager",
}

export enum SortOrder {
  ASCEND = "asc",
  DESCEND = "desc",
}

export enum MemberInviteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum ResourceProcessStatus {
  INGESTING = "ingesting",
  INGESTED = "ingested",
  UPDATING = "updating",
  UPDATED = "updated",
  DELETING = "deleting",
  DELETED = "deleted",
}
