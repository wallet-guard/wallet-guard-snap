import { ApprovalNotification } from '../types/approvalsApi';
import { SERVER_BASE_URL } from '../utils/environment';

export const fetchApprovals = async (walletAddress: string) => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/v0/approvals/notifications?address=${walletAddress}`,
    );

    const approvalNotification: ApprovalNotification = await response.json();

    return approvalNotification;
  } catch (e) {
    return null;
  }
};
