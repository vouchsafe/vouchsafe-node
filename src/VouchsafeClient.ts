import {
  authenticate,
  listVerifications,
  getVerification,
  requestVerification,
  performSmartLookup,
  searchPostcode,
  listFlows,
  getFlow,
  getArtefact,
  verifyEvisa,
  verifySupportingDocument,
} from "./openapi/endpoints" // adjust to your orval output path

import type {
  AuthenticateInput,
  RequestVerificationInput,
  SmartLookupInput,
  ListVerificationsParams,
  EvisaVerificationInput,
  VerifySupportingDocumentBody,
} from "./openapi/models"

interface VouchsafeClientOptions {
  client_id: string
  client_secret: string
}

export class VouchsafeApiError extends Error {
  constructor(
    public statusCode: number,
    public responseBody: unknown,
    message?: string
  ) {
    super(message)
    this.name = "VouchsafeApiError"
  }
}

export class VouchsafeClient {
  private token?: string
  private tokenExpiry?: Date

  constructor(private options: VouchsafeClientOptions) {}

  /**
   * PRIVATE METHODS
   */

  private getAccessToken = async (): Promise<string> => {
    const now = new Date()
    const bufferMs = 5 * 60 * 1000 // 5 minutes

    if (
      this.token &&
      this.tokenExpiry &&
      now.getTime() < this.tokenExpiry.getTime() - bufferMs
    ) {
      return this.token!
    }

    const authBody: AuthenticateInput = {
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
    }

    const response = await authenticate(authBody)

    if (response.status !== 201) {
      throw new VouchsafeApiError(response.status, response.data, "Authentication failed")
    }

    if (!response.data.access_token || !response.data.expires_at) {
      throw new VouchsafeApiError(201, response.data, "Authentication response missing token or expiry")
    }

    this.token = response.data.access_token
    this.tokenExpiry = new Date(response.data.expires_at)

    return this.token
  }

  // Build authed RequestInit for each call
  private authHeaders = async (): Promise<RequestInit> => {
    const token = await this.getAccessToken()
    return { headers: { Authorization: `Bearer ${token}` } }
  }

  // Unwrap orval responses, throw VouchsafeApiError on non-2xx, re-auth on 401
  private withErrorHandling = async <TResponse extends { status: number; data: unknown }>(
    fn: (opts: RequestInit) => Promise<TResponse>
  ): Promise<Extract<TResponse, { status: 200 | 201 }>["data"]> => {
    type TData = Extract<TResponse, { status: 200 | 201 }>["data"]

    const attempt = async (): Promise<TData> => {
      const opts = await this.authHeaders()
      const response = await fn(opts)

      if (response.status === 200 || response.status === 201) {
        return response.data as TData
      }

      throw new VouchsafeApiError(
        response.status,
        response.data,
        (response.data as any)?.message ?? `Request failed with status ${response.status}`
      )
    }

    try {
      return await attempt()
    } catch (err) {
      if (err instanceof VouchsafeApiError && err.statusCode === 401) {
        // Force token refresh and retry once
        this.token = undefined
        this.tokenExpiry = undefined
        return attempt()
      }
      throw err
    }
  }

  /**
   * PUBLIC METHODS
   */

  async getVerification({ id }: { id: string }) {
    return this.withErrorHandling((opts) => getVerification(id, opts))
  }

  async listVerifications(params?: ListVerificationsParams) {
    return this.withErrorHandling((opts) => listVerifications(params, opts))
  }

  async requestVerification(input: RequestVerificationInput) {
    return this.withErrorHandling((opts) => requestVerification(input, opts))
  }

  async performSmartLookup(input: SmartLookupInput) {
    return this.withErrorHandling((opts) => performSmartLookup(input, opts))
  }

  async searchPostcode({ postcode }: { postcode: string }) {
    return this.withErrorHandling((opts) => searchPostcode({ postcode }, opts))
  }

  async listFlows() {
    return this.withErrorHandling((opts) => listFlows(opts))
  }

  async getFlow({ id }: { id: string }) {
    return this.withErrorHandling((opts) => getFlow(id, opts))
  }

  /**
   * Exchange an artefact key for a time-limited pre-signed download URL.
   */
  async getArtefact({ artefact_key }: { artefact_key: string }) {
    return this.withErrorHandling((opts) => getArtefact(artefact_key, opts))
  }

  /**
   * Verify a UK eVisa using a Home Office share code.
   * Sandbox share codes: PASS12345, FAIL12345, ERROR1234, BADCODE12, WRONGDOB1
   */
  async verifyEvisa(input: EvisaVerificationInput) {
    return this.withErrorHandling((opts) => verifyEvisa(input, opts))
  }

  /**
   * Extract and validate a supporting document (PDF, JPG, or PNG).
   * Supported sub_types: Payslip, BankStatement, UtilityBill, etc.
   */
  async verifySupportingDocument(input: VerifySupportingDocumentBody) {
    return this.withErrorHandling((opts) => verifySupportingDocument(input, opts))
  }
}