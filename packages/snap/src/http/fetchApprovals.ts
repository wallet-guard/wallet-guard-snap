import { AccountDetail } from '../types/approvalsApi';
import { SERVER_BASE_URL } from '../utils/environment';

export const fetchApprovals = async (walletAddress: string) => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/v0/approvals/?address=${walletAddress}`,
    );

    const accountDetail: AccountDetail = await response.json();

    return accountDetail;
  } catch (e) {
    return null;
  }
};
