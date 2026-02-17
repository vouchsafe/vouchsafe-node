import { Configuration } from "./openapi"
import { AuthenticationApi } from "./openapi/apis/AuthenticationApi"
import { VerificationsApi } from "./openapi/apis/VerificationsApi"
import { SmartLookupsApi } from "./openapi/apis/SmartLookupsApi"
import { FlowsApi } from "./openapi/apis/FlowsApi"
import { ArtefactsApi } from "./openapi/apis/ArtefactsApi"
import { EVisaVerificationApi } from "./openapi/apis/EVisaVerificationApi"
import { SupportingDocumentVerificationApi } from "./openapi/apis/SupportingDocumentVerificationApi"
import {
  AuthenticateInput,
  RequestVerificationInput,
  SmartLookupInput,
  Status,
  EvisaVerificationInput,
  SupportingDocumentVerificationResponse,
} from "./openapi/models"
// Above are all generated files from openapi-generator

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
  private config: Configuration

  private authenticationApi: AuthenticationApi
  private verificationsApi: VerificationsApi
  private smartLookupsApi: SmartLookupsApi
  private flowsApi: FlowsApi
  private artefactsApi: ArtefactsApi
  private eVisaVerificationApi: EVisaVerificationApi
  private supportingDocumentVerificationApi: SupportingDocumentVerificationApi

  constructor(private options: VouchsafeClientOptions) {
    const basePath = "https://app.vouchsafe.id/api/v1"

    this.config = new Configuration({
      basePath,
      accessToken: this.getAccessToken,
    })

    this.authenticationApi = new AuthenticationApi(this.config)
    this.verificationsApi = new VerificationsApi(this.config)
    this.smartLookupsApi = new SmartLookupsApi(this.config)
    this.flowsApi = new FlowsApi(this.config)
    this.artefactsApi = new ArtefactsApi(this.config)
    this.eVisaVerificationApi = new EVisaVerificationApi(this.config)
    this.supportingDocumentVerificationApi = new SupportingDocumentVerificationApi(this.config)
  }

  /**
   * PRIVATE METHODS
   *
   * To simplify interacting with the API
   */

  // Handle token expiration and pass into every request
  private getAccessToken = async (): Promise<string> => {
    const now = new Date()
    const bufferMs = 5 * 60 * 1000 // 5 minutes

    if (
      this.token &&
      this.tokenExpiry &&
      now.getTime() < this.tokenExpiry.getTime() - bufferMs
    ) {
      return this.token
    }

    const authBody: AuthenticateInput = {
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
    }

    const response = await this.authenticationApi.authenticate({
      authenticateInput: authBody,
    })

    this.token = response.access_token
    this.tokenExpiry = new Date(response.expires_at)

    return this.token
  }

  // Wrap raw fetch response errors and provide something cleaner, and re-auth on 401 errors
  private withErrorHandling = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      return await fn()
    } catch (err: any) {
      if (err.name === "ResponseError" && err.response instanceof Response) {
        if (err.response.status === 401) {
          // Force a token refresh and retry once
          this.token = undefined
          this.tokenExpiry = undefined
          await this.getAccessToken()

          return fn()
        }

        const body = await err.response.json().catch(() => ({}))
        const message = body?.message ?? err.response.statusText
        throw new VouchsafeApiError(err.response.status, body, message)
      }

      throw err
    }
  }

  /**
   * PUBLIC METHODS
   *
   * One for every endpoint we expose
   */

  async getVerification({ id }: { id: string }) {
    return this.withErrorHandling(() =>
      this.verificationsApi.getVerification({ id })
    )
  }

  async listVerifications({ status }: { status?: Status } = {}) {
    return this.withErrorHandling(() =>
      this.verificationsApi.listVerifications({ status })
    )
  }

  async requestVerification(input: RequestVerificationInput) {
    return this.withErrorHandling(() =>
      this.verificationsApi.requestVerification({
        requestVerificationInput: input,
      })
    )
  }

  async performSmartLookup(input: SmartLookupInput) {
    return this.withErrorHandling(() =>
      this.smartLookupsApi.performSmartLookup({
        smartLookupInput: input,
      })
    )
  }

  async searchPostcode({ postcode }: { postcode: string }) {
    return this.withErrorHandling(() =>
      this.smartLookupsApi.searchPostcode({ postcode })
    )
  }

  async listFlows() {
    return this.withErrorHandling(() =>
      this.withErrorHandling(() => this.flowsApi.listFlows())
    )
  }

  async getFlow({ id }: { id: string }) {
    return this.withErrorHandling(() =>
      this.withErrorHandling(() => this.flowsApi.getFlow({ id }))
    )
  }

  /**
   * Get a pre-signed download URL for an artefact.
   * 
   * Exchange an artefact key (returned from other endpoints) for a time-limited
   * pre-signed URL that can be used to download the file.
   * 
   * @param artefact_key - The artefact key from verification response
   * @returns Object with download_url, artefact_key, and expires_at
   */
  async getArtefact({ artefact_key }: { artefact_key: string }) {
    return this.withErrorHandling(() =>
      this.artefactsApi.getArtefacts({ artefactKey: artefact_key })
    )
  }

  /**
   * Verify a person's UK immigration status using their Home Office share code.
   * 
   * Supported verification types:
   * - ImmigrationStatus - Check immigration status (e.g., Settled, Skilled Worker)
   * - RightToWork - Verify right to work in the UK
   * - RightToRent - Verify right to rent property in the UK
   * 
   * Sandbox testing: Use these share codes in sandbox mode:
   * - PASS12345 - Returns successful verification with "Pass" outcome
   * - FAIL12345 - Returns failed verification (e.g. expired status)
   * - ERROR1234 - Returns error response
   * 
   * @param input - eVisa verification input with share_code, date_of_birth, and check_type
   */
  async verifyEvisa(input: EvisaVerificationInput) {
    return this.withErrorHandling(() =>
      this.eVisaVerificationApi.verifyEvisa({ evisaVerificationInput: input })
    )
  }

  /**
   * Extract and validate a supporting document.
   * 
   * Accepts a document file (PDF, JPG, or PNG) and extracts personal identity
   * information and address details.
   * 
   * Supported document types (sub_type):
   * - Payslip, PensionAnnualStatement, BenefitsLetter
   * - HMPPSLetter, NHSLetter
   * - BankStatement, CreditCardStatement, MortgageStatement
   * - UtilityBill, MobilePhoneBill
   * 
   * @param params - Document file, sub_type, and optional minimum_document_length
   * @returns Verification response with extracted details and validations
   */
  async verifySupportingDocument(params: {
    document: Blob | File
    sub_type: string
    minimum_document_length?: number
  }): Promise<SupportingDocumentVerificationResponse> {
    return this.withErrorHandling(() =>
      this.supportingDocumentVerificationApi.verifySupportingDocument({
        document: params.document,
        subType: params.sub_type,
        minimumDocumentLength: params.minimum_document_length?.toString()
      })
    )
  }
}
