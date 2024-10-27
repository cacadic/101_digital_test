import type { User as AuthUser } from "next-auth";

type CustomField = {
  customFieldId: string;
  customKey: string;
  customValue: string;
};

type Membership = {
  membershipId: string;
  organisationId: string;
  organisationName: string;
  roleName: string;
  token: string;
  organisationNumber: string;
};

type App = {
  appName: string;
  onboardingAt?: string;
};

type KycDetails = {
  documents: unknown[];
};

export type Profile = {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  isUSCitizen: boolean;
  status: string;
  lastLoginAt: string;
  contacts: unknown[];
  addresses: unknown[];
  listCustomFields: CustomField[];
  employmentDetails: unknown[];
  taxDetails: unknown[];
  memberships: Membership[];
  kycDetails: KycDetails;
  apps: App[];
  listRoles: string[];
  permissions: unknown[];
  segments: unknown[];
  creditDetails: unknown[];
  createdAt: string;
  passwordExpired: boolean;
  updatedAt: string;
  cif: string;
  devices: unknown[];
};

export type User = AuthUser & {
  username: string;
  accessToken: string;
  refreshToken: string;
  expires_in: number;
  profile: Profile;
};
