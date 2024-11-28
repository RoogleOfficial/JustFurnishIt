export interface CreateDTO {
    userId: number;
  }
  
  export interface Designer {
    designerId: number;
    userId: number;
    specialization: string;
    experienceYears: number;
    portfolioUrl: string;
    bio: string;
    isApproved: number;
    certifications?: string;
  }
  