export interface StudNameEmailPass {
    "name": string,
  "email": string,
  "password": string
}

export interface StudEmailPass {
  "email": string,
  "password": string
}

export interface LoginResponse {
    token: string
}

export interface MentorItem {
    "id": number,
      "name": string,
      "specialty": string,
      "modality": string,
      "availableSlots": number,
      "description": string
}

export interface MentorPage {
    "items": MentorItem[ ],
  "page": number,
  "size": number,
  "totalItems": number,
  "totalPages": number
}

export interface MentorRequest {
    "topic": string
}

export interface Request {
    "id": number,
    "resourceId": number,
    "resourceName": string,
    "topic": string,
    "status": string
}

export interface OwnRequestPage {
  "requests": Request[]
}

export interface ApiError {
  "code": string,
  "message": string
}
