import { AccountDetail } from '../types/approvalsApi';
import { SERVER_BASE_URL } from '../utils/environment';

export const fetchApprovals = async (walletAddress: string) => {
  try {
    // todo: we should have an approvals for all chains endpoint
    const response = await fetch(
      `${SERVER_BASE_URL}/v0/approvals/?address=${walletAddress}&chainId=eth,polygon`,
    );

    const accountDetail: AccountDetail = await response.json();

    return accountDetail;
  } catch (e) {
    return null;
  }
};
