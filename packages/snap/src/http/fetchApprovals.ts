import { ApprovalReponse } from '../types/approvalsApi';
import { SERVER_BASE_URL } from '../utils/environment';

export const fetchApprovals = async (walletAddress: string) => {
  // todo: we should have an approvals for all chains endpoint
  const response = await fetch(
    `${SERVER_BASE_URL}/v0/approvals/eth/${walletAddress}`,
  );

  const approvals: ApprovalReponse = await response.json();

  return approvals;
};
